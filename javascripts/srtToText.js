function setupSRTConverter() {
	var sRTButton = document.getElementById("sRTButton");
	var resetButton = document.getElementById("resetButton");
	sRTButton.addEventListener("click", convertSRTToText);
	resetButton.addEventListener("click", reset);
}

function convertSRTToText() {
	var sRTTextArea = document.getElementById("sRTTextArea");
	var sRTContent = sRTTextArea.value;
	digestSRT(sRTContent);
}

function digestSRT(sRTContent) {
	var sRTSplit = sRTContent.split(/\n{2,}/);
	var sRTValid = true;
	errorMessage = document.getElementById("errorMessage");
	for (var i = 0; i < sRTSplit.length; i++) {
		if (i == sRTSplit.length - 1) {
			sRTSplit[i] = sRTSplit[i].replace(/\n+$/, "");
		}
		if (!checkSRTBlockValidity(sRTSplit[i])) {
			sRTValid = false;
			errorMessage.hidden = false;
			errorMessage.textContent = "SubRip content is invalid. Please check the content and try again.";
			return false;
		}
	}
	errorMessage.hidden = true;
	errorMessage.textContent = "";
	allSRTCaptionLines = new Array();
	for (var i = 0; i < sRTSplit.length; i++) {
		sRTCaptions = sRTSplit[i].split("\n").splice(2);
		for (var j = 0; j < sRTCaptions.length; j++) {
			allSRTCaptionLines.push(sRTCaptions[j]);
		}
	}
	var textOutput = '';
	makeTitleCheckbox = document.getElementById("makeTitleCheckbox");
	if (makeTitleCheckbox.checked) {
		textOutput += allSRTCaptionLines[0] + "\r\n\r\n";
		allSRTCaptionLines = allSRTCaptionLines.splice(1);
	}
		textOutput += allSRTCaptionLines.join(' ');
		var outputArea = document.getElementById("outputArea");
		outputArea.textContent = textOutput;
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

function reset() {
	var sRTTextArea = document.getElementById("sRTTextArea");
	var outputArea = document.getElementById("outputArea");
	sRTTextArea.value = '';
	outputArea.textContent = "The converted transcript will appear here.";
}

window.onload = setupSRTConverter;