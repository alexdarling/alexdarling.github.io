var hand = new Array();
var deck = new Array();
var trash = new Array();
var stack = new Array();
var revealed = new Array();

function Card(image) {
	this.image = image;
	// this.name = name;
}

function opaque() {
	document.getElementById('personalBoardState').style.opacity = 0.5;
	document.getElementById('hand').style.opacity = 0.5;
}

function nopaque() {
	document.getElementById('personalBoardState').style.opacity = 1;
	document.getElementById('hand').style.opacity = 1;
}

function draw() {
	hand.push(deck.pop());
	displayHand();
	displayDeck();
}

function mill() {
	trash.push(deck.pop())
	displayTrash();
	displayDeck();
}

// Thank you StackOverflow
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        deck[i - 1] = a[j];
        deck[j] = x;
    }
}

function displayHand() {
	handHTML = document.getElementById('hand');
	handHTML.innerHTML = '';
	for (var i = 0; i < hand.length; i++) {
		cardImage = document.createElement('img');
		cardImage.src = hand[i].image;
		cardImage.className = 'handCards';
		handHTML.appendChild(cardImage);
	}
}

function displayDeck() {
	deckHTML = document.getElementById('deck');
	deckHTML.innerHTML = deck.length;
}

function displayDeckContextMenu() {
	deckContextMenu = document.getElementById('deckContextMenu');
	deckContainer = document.getElementById('deckContainer');
	rect = deckContainer.getBoundingClientRect();
	deckContextMenu.style.top = rect.bottom + 'px';
	deckContextMenu.style.left = rect.left  +'px';
	deckContextMenu.style.visibility = 'visible';
	deckContainer.removeEventListener('click', displayDeckContextMenu);
	deckContainer.addEventListener('click', function() {
		deckContextMenu.style.visibility = 'hidden';
		deckContainer.addEventListener('click', displayDeckContextMenu);
	});
}

function displayTrashContextMenu() {
	// TODO:
	// 1. Look inside
	// dldldldldldld
}

function displayHPContextMenu() {
	// TODO:
	// 1. Gain HP
	// 2. Lose HP
}

function deckRevealOps() {
	opaque();
	document.getElementById('closeNumCards').addEventListener('click', function () {
		document.getElementById('revealTopDeck').style.visibility = 'hidden';
		nopaque();
	});
	document.getElementById('submitNumCards').addEventListener('click', function() {
		document.getElementById('revealTopDeck').style.visibility = 'hidden';
		revealedCards = document.getElementById('revealedCards');
		revealedCardList = document.getElementById('revealedCardList');
		numCards = Number(document.getElementById('numCards').value);
		revealedCards.style.visibility = 'visible';
		for (var i = 0; i < numCards; i++) {
			revealed.push(deck.pop());
		}
		for (var i = 0; i < numCards; i++) {
			// li = document.createElement('li');
			// li.appendChild(document.createTextNode(revealed[i].image));
			// b1 = document.createElement('input');
			// b2 = document.createElement('input');
			// b3 = document.createElement('input');
			// b4 = document.createElement('input');
			// b1.type = 'button';
			// b2.type = 'button';
			// b3.type = 'button';
			// b4.type = 'button';
			// b1.value = 'Top';
			// b2.value = 'Bottom';
			// b3.value = 'Trash';
			// b4.value = 'Hand';
			// b1.id = 'top' + i.toString();
			// b2.id = 'revealToBottom';
			// b3.id = 'revealToTrash';
			// b4.id = 'revealToHand';
		}

		// update deck, trash, hand
	});
}

function deckMillOps() {
	//
}

function setUpGameState() {
	// Adding the character card.
	heroCard = document.getElementById('heroCard');
	heroCard.src = 'baccarat-cards/baccarat-char-front.jpg';

	// TODO: Add stack listener

	// Deck Context Menu Listeners
	deckContainer = document.getElementById('deckContainer');
	deckDraw = document.getElementById('deckDraw');
	deckReveal = document.getElementById('deckReveal');
	deckMill = document.getElementById('deckMill');
	deckContainer.addEventListener('click', displayDeckContextMenu);
	deckDraw.addEventListener('click', function () {
		draw();
		deckContextMenu.style.visibility = 'hidden';
		deckContainer.addEventListener('click', displayDeckContextMenu);
	});
	deckReveal.addEventListener('click', deckRevealOps);
	deckMill.addEventListener('click', deckMillOps);

	// Trash Context Menu Listeners
	trashContainer = document.getElementById('trashContainer');
	trashContainer.addEventListener('click', displayTrashContextMenu);

	// HP Context Menu Listeners
	hpContainer = document.getElementById('hpContainer');
	hpContainer.addEventListener('click', displayHPContextMenu);

	// Creating the deck list so we can populate the deck.
	decklist = new Array();
	decklist['ace-of-saints'] = 2;
	decklist['ace-of-sinners'] = 2;
	decklist['afterlife-euchre'] = 4;
	decklist['underworld-hold-em'] = 4;
	decklist['abyssal-solitaire'] = 3;
	decklist['graveyard-bridge'] = 3;
	decklist['cheap-trick'] = 4;
	decklist['card-toss'] = 4;
	decklist['bring-down-the-house'] = 2;
	decklist['ace-in-the-hole'] = 4;
	decklist['i-fold'] = 4;
	decklist['all-in'] = 4;

	// Creating the deck from the deck list.
	// Game setup. Shuffle & draw.
	cardSlugs = Object.keys(decklist);
	for (var newCardIndex = 0; newCardIndex < cardSlugs.length; newCardIndex++) {
		cardSlug = cardSlugs[newCardIndex];
		cardQuant = decklist[cardSlug];
		for (var i = 0; i < cardQuant; i++) {
			deck.push(new Card('baccarat-cards/' + cardSlug + '.jpg'));
		}
	}
	shuffle(deck);
	for (var i = 0; i < 4; i++) {
		draw();
	}
}

window.onload = setUpGameState;