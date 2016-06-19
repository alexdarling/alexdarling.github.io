var hand = new Array();
var deck = new Array();
var trash = new Array();
var stack = new Array();

function Card(image) {
	this.image = image;
}

function draw() {
	hand.push(deck.pop());
	displayHand();
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

function setUpGameState() {
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