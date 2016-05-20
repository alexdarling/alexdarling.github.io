function setupSRTConverter() {
	var sRTButton = document.getElementById("sRTButton");
	sRTButton.addEventListener("click", convertSRTToText);
}

function convertSRTToText() {
	var sRTTextArea = document.getElementById("sRTTextArea");
	var sRTContent = sRTTextArea.value;
	digestSRT(sRTContent);
}

function digestSRT(sRTContent) {
	var sRTsplit = sRTContent.split(/\n{2,}/);
	var sRTValid = true;
	for (var i = 0; i < sRTsplit.length; i++) {
		if (i == sRTsplit.length - 1) {
			sRTsplit[i] = sRTsplit[i].replace(/\n+$/, "");
		}
		if (!checkSRTBlockValidity(sRTsplit[i])) {
			sRTValid = false;
			console.log(sRTValid)
		}
	}
	errorMessage = document.getElementById("errorMessage");
	if (sRTValid) {
		errorMessage.hidden = true;
		errorMessage.textContent = "";
	} else {
		errorMessage.hidden = false;
		errorMessage.textContent = "SubRip content is invalid. Please check the content and try again.";
	}
}

function checkSRTBlockValidity(sRTBlock) {
	sRTLines = sRTBlock.split("\n");
	// sRTTests should all return true
	sRTTests = [
				!/^\n+$/.test(sRTBlock),
				sRTLines.length >= 3,
				/^\d+$/.test(sRTLines[0]),
				/^\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3} ?(X1:\d+ X2:\d+ Y1:\d+ Y2:\d+)?$/.test(sRTLines[1])
				];
	return sRTTests.every(function(element, index, array){return element});
}

window.onload = setupSRTConverter;