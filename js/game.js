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
        text: "You run out of the terminal doors towards the impound cop standing next to your mother-in-law’s new car, which is being hoisted up by a tow truck.",
        options: [
            {
                text: "Next",
                nextText: 4
            },
        ]
    },
    {
        id: 4, //choice 1, has impact after choice 4 option 1
        text: "You shout out to the impound cop…",
        options: [
            {
                text: '“Hey! You better put my car down right now or else there will be                         hell to pay!”', //officer has negative opinion,
                nextText: 5
            },
            {
                text: '“Wait, I’m here! You can put the car down!”',
                nextText: 5
            }
        ]
    },
    {
        id: 5,
        text: "As if expecting you, he responds just before you finish your sentence, “Yeah, yeah. Read the sign.” The tow truck lifts the car higher, putting strain on the plastic bumper.",
        options: [
            {
                text: "Next",
                nextText: 6
            },
        ]
    },
    {
        id: 6,
        text: "Maybe you have something on you that could convince him to listen…",
        options: [
            {
                text: "Next",
                nextText: 7
            },
        ]
    },
    {
        id: 7,
        text: "[TUTORIAL] Throughout the story, you may come across KEY ITEMS that may help you during your adventure.",
        options: [
            {
                text: "Next",
                nextText: 8
            },
        ]
    },
    {
        id: 8, // choice 2
        text: '“Hey, hey, wait!”',
        options: [
            {
                text: "Pull out your [BADGE] to show to the officer", //only one choice for tutorial purposes
                setState: { badge: true },
                nextText: 9
            },
        ]
    },
    {
        id: 9,
        text: '“See? I’m a cop too. LAPD. C’mon, it’s Christmas.”',
        options: [
            {
                text: "Next",
                nextText: 10
            },
        ]
    },
    {
        id: 10,
        text: '““Sounds like you’re gonna be asking Santa for another car, Mr. LAPD.” The impound cop hands you a ticket and gives the okay for the truck driver to take off with your vehicle.',
        options: [
            {
                text: "Next",
                nextText: 11
            },
        ]
    },
    {
        id: 11, // choice 3, first diverging plot point
        text: "Before you have a chance to respond, your pager starts going off.",
        options: [
            {
                text: "Ignore it",
                nextText: 12
            },
            {
                text: "Head to the nearest pay phone to call the number.",
                nextText: 13
            },
        ]
    },
];

startGame();