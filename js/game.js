const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

let state = {


}

function startGame() {
    state = { medPack: false };
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    textElement.innerText = textNode.text;
    while(optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    textNode.options.forEach(option => {
        if(showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.appendChild(button);
        }
    });
}

function showOption(option) {
    return true;
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    showTextNode(nextTextNodeId);
}

const textNodes = [
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
                nextText: 3
            },
            {
                text: "Option 2",
                nextText: 4
            }
        ]
    },
    {
        id: 3,
        text: "This should be the third event",
        options: [
            {
                text: "Option 1",
                nextText: 4
            },
            {
                text: "Option 2",
                nextText: 4
            }
        ]
    }
];

startGame();