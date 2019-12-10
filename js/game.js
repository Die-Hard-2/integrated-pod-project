const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-button");

let state = {


}

function startGame() {
    state = {};
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    var textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    textElement.innerText = textNode.text;
    while(optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }
}

function selectOption(option) {

}

var textNodes = [
    {
        id: 1,
        text: "This should be the first text event",
        options: [
            {
                text: "Option 1",
                setState: { medPack: true },
                nextText: 2
            },
            {
                text: "Option 2",
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "This should be the second text event",
        options: [
            {
                text: "Option 1",
            },
            {
                text: "Option 2",
            }
        ]
    }

];

startGame();