//Binds elements on HTML page to dynamic variables in game.js
const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

//Stores items owned and opinions of character for future events
let state = {
    medPack: false,
}

//Starts game, sets default state, and immediately picks textNodes object with ID of 1
function startGame() {
    state = { medPack: false };
    showTextNode(1);
}

//Building the current event on HTML
function showTextNode(textNodeIndex) {
    //Finds the HTML element with ID of 'text' and fills it with the text for that event
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    textElement.innerText = textNode.text;

    //Gets rid of old buttons from previous event
    while(optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    //Creates a new button for each option available in that event
    textNode.options.forEach(option => {
        if(showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            //This is listening to clicks and will launch the selectOption function
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.appendChild(button);
        }
    });
}

//This will show options based on State. Exe: Will show an option only if state { medkit: true }
function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

//When the event listener hears a click it launches the next textNode
function selectOption(option) {
    const nextTextNodeId = option.nextText;
    state = Object.assign(state, option.setState); /* Object.assign(target, source) AKA this is updating the state with
    the setState from the event */
    showTextNode(nextTextNodeId);
}

//Events stored as objects
const textNodes = [
    {
        id: 1,
        text: "This should be the first text event",
        options: [
            {
                text: "Grab the medPack",
                setState: { medPack: true },
                nextText: 2
            },
            {
                text: "Option 2",
                nextText: 2
            },
            {
                text: "Option 3",
                nextText: 2
            },
            {
                text: "Option 4",
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "This should be the second text event",
        options: [
            {
                text: "This option should require a state of medPack: true to be True to show up",
                nextText: 3,
                requiredState: (currentState) => currentState.medPack
            },
            {
                text: "Option 2",
                nextText: 3
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
    },
    {
        id: 4,
        text: "This should be the fourth event",
        options: [
            {
                text: "Option 1",
                nextText: 5
            },
            {
                text: "Option 2",
                nextText: 5
            }
        ]
    }
];

startGame();