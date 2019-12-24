//Binds elements on HTML page to dynamic variables in game.js
const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");
const imgElement = document.getElementById("event-image");

//Stores items owned and opinions of character for future events
let state = {
    medPack: false,
    badge: false
};

//Starts game, sets default state, and immediately picks textNodes object with ID of 1
function startGame() {
    showTextNode(1);
}

//Building the current event on HTML
function showTextNode(textNodeIndex) {
    //Finds the textNode objects with the Id passed into this function as textNodeIndex
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);

    //Loads text for the event
    textElement.innerText = textNode.text;

    //Loads image for the event.
    imgElement.src = textNode.image;

    //Gets rid of old buttons from previous event
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    //Creates a new button for each option available in that event
    textNode.options.forEach(option => {
        if (showOption(option)) {
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
    // Object.assign(target, source) AKA this is updating the state with the setState from the event
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

//Events stored as objects
const textNodes = [
    {
        id: 1,
        text: "This should be the first text event",
        image: "img/dieharderbruce.jpg",
        options: [
            {
                text: "Grab the [Med Pack]",
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
        image: "img/badguy.jpeg",
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
        image: "img/john-move-neutral.gif",
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
                text: '“Hey! You better put my car down right now or else there will be hell to pay!”',
                setState: {rudeCop: true},
                nextText: 5
            },
            {
                text: '“Wait, I’m here! You can put the car down!”',
                setState: {politeCop: true},
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
                setState: {badge: true},
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
    {
        id: 12, // GAME OVER scenario
        text: "You ignore the pager. The impound cop and the tow truck are gone. You decide to wait in the terminal for Holly. You hear loud bangs from the other side of the airport...",
        options: [
            {
                text: "GAME OVER. Click to try again.",
                nextText: 11
            },
        ]
    },
    {
        id: 13, // choice 3, first diverging plot point
        text: "You call the number from your pager. It’s Holly calling from the plane via airphone. She lets you know that she’ll land 30 minutes later than expected.",
        options: [
            {
                text: "Next",
                nextText: 14
            },
        ]
    },
    {
        id: 14,
        text: "You decide to head over to the bar to await Holly’s arrival.",
        options: [
            {
                text: "Next",
                nextText: 15
            },
        ]
    },
    {
        id: 15, // choice 4
        text: "While sitting at the bar, you witness two men behaving strangely. They synchronize watches before picking up a wrapped package. One might’ve had a holster inside his jacket.",
        options: [
            {
                text: "Alert the police", //will be affected by how the impound cop was addressed earlier
                nextText: 16
            },
            {
                text: "Follow the suspicious men",
                nextText: 21
            },
        ]
    },
    {
        id: 16, // choice 4, option 1 divergence
        text: "You approach the nearest officers to report what you had witnessed. “Excuse me officers, I think I just saw —“",
        options: [
            {
                text: "Next",
                nextText: 17
            },
        ]
    },
    {
        id: 17,
        text: "One of the officers turns around. It’s the cop from earlier that impounded your car!",
        options: [ //current states not working, need to debug
            {
                text: "Next",
                requiredState: (currentState) => currentState.rudeCop,
                nextText: 18
            },
            {
                text: "Next",
                requiredState: (currentState) => currentState.politeCop,
                nextText: 19
            },
        ]
    },
    {
        id: 18,
        text: '"Oh, it’s the wise guy again. What did you see, Santa Claus bringing you a new car?” He and the other officer chortled too loudly for them to hear anything else you would say.',
        options: [
            {
                text: "Next",
                nextText: 20
            },
        ]
    },
    {
        id: 19,
        text: '“Saw what?” The bored cop seems to have already forgotten your earlier exchange...',
        options: [
            {
                text: "Next",
                nextText: 20
            },
        ]
    },
    {
        id: 20,
        text: '“It’s nothing,” you mumble before taking off.',
        options: [
            {
                text: "Next",
                nextText: 21
            },
        ]
    },
    {
        id: 21,
        text: 'You follow the men through the crowd until they pass through a door labeled “NO ADMITTANCE” in the luggage area. The door is now locked.',
        options: [
            {
                text: "Next",
                nextText: 22
            },
        ]
    },
    {
        id: 22,
        text: 'You see a worker near the door.',
        options: [
            {
                text: "Use item: [BADGE]",
                requiredState: (currentState) => currentState.badge,
                nextText: 28
            },
            {
                text: '“Hey you, open the door. Urgent police business”', //go to CHANCE encounter, need to create function for random roll
                nextText: 23
            },
        ]
    },
    {
        id: 23, //We will need to make a rollResult function for chance encounter
        text: 'The worker\'s face twists in confusion. “Urgent police business? Yeah right, keep it moving.”',
        options: [
            {
                text: "[chance] Try to convince him to let you in",
                nextText: 24
            },
            {
                text: 'Find another way in', // there is no other way in, terrorists get away,
                nextText: 26
            },
        ]
    },
    {
        id: 26,
        text: '“Forget it, I don’t have time to argue with you” you spit before looking for another way in. You run through the crowd to search for another entrance, but can’t find one.',
        options: [
            {
                text: "GAME OVER. Click to try again.",
                nextText: 21
            },
        ]
    },
    {
        id: 27,
        text: '“Forget it, I don’t have time to argue with you” you spit before looking for another way in. You run through the crowd to search for another entrance, but can’t find one.',
        options: [
            {
                text: "GAME OVER. Click to try again.",
                nextText: 28
            },
        ]
    },
];

startGame();