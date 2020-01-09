(function(){
"use strict";
$(document).ready(function(){

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
    state = { medPack: false,
              badge: false,
              politeCop: false,
              rudeCop: false,
              ski : false,
              hairspray: false,
              lighter: false,
              nailFile : false,
            };
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
    // Object.assign(target, source) AKA this is updating the state with the setState from the event
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

//random number generator for chance encounter
var randomNumber = Math.floor(Math.random() * 6) + 1;
function rollResult() {
    if (randomNumber <= 3) {
        return 26
    } else {
        return 27
    }
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
        //Currently attempting to set state so that the "Next" option that appears in id: 17 is linked to the setState of the selection in id: 4. Currently both "Next" options are still appearing in id: 17
        text: "You shout out to the impound cop…",
        image: "img/john-angry.gif",
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
        image: "img/tow-truck-scene.gif",
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
        image: "img/john-thinking.png",
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
        image: "img/dieharderbruce.jpg",
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
        image: "img/john-surprised.png",
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
        image: "img/badge.png",
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
        image: "img/john-angry.gif",
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
        image: "img/pager.jpeg",
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
        image: "img/game-over.jpeg",
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
        text: '“Saw what?” The bored cop seems to have already forgotten about your earlier encounter...',
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
                text: "Convince him with your authority and show him your [BADGE]",
                requiredState: (currentState) => currentState.badge,
                nextText: 28
            },
            {
                text: 'Tell the truth: "If you don\'t let me in right now we\'re all gonna be screwed."', //go to CHANCE encounter, need to create function for random roll
                nextText: 23
            },
        ]
    },
    {
        id: 23,
        text: 'The worker\'s face twists in confusion. “I\'m working in the airport at Christmas, man. I\'m already screwed. Keep it moving.”',
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
        id: 24,
        text: '[TUTORIAL] Occasionally you will be faced with chance encounters when there was a previous selection that could have lead to a better outcome. The game will auto-roll to decide your fate...',
        image: "img/dice.gif",
        options: [
            {
                text: "Next", //go to CHANCE encounter
                nextText: 25
            },
        ]
    },
    {
        id: 25,
        text: 'YOU ROLLED: ' + randomNumber, // variable from function for random roll 1-10; if 1-5 GAME OVER nextText: 26, else nextText: 27.
        image: "img/" + randomNumber + ".png",
        options: [
            {
                text: "Next",
                nextText: rollResult() //function determines number of next text node
            },
        ]
    },
    {
        id: 26,
        text: '“Forget it, I don’t have time to argue with you.” You run through the crowd to search for another entrance, but can’t find one. As you come to this realization, you hear a building-shattering bang...',
        image: "img/game-over.jpeg",
        options: [
            {
                text: "GAME OVER. Click to try again.",
                nextText: 21
            },
        ]
    },
    {
        id: 27,
        text: 'You decide to attempt one final appeal. “Look pal, you let me in this door or we all die in a terrorist attack. Either way you better call the police.”',
        options: [
            {
                text: "Next",
                nextText: 28
            },
        ]
    },
    {
        id: 28,
        text: 'The worker reluctantly opens the door to the dark, cluttered room, holding a web of conveyor belts within. You make your way through the machinery until you see two figures.',
        options: [
            {
                text: "Next",
                nextText: 29
            },
        ]
    },
    {
        id: 29,
        text: '“Hey, this is a restricted area” you shout, [BADGE] on display.',
        options: [
            {
                text: "Next",
                nextText: 30
            },
        ]
    },
    {
        id: 30,
        text: '“We work for the airline,” one of the men replies, almost too quickly. “Yeah? Well then, let’s see some ID’s —“',
        options: [
            {
                text: "Next",
                nextText: 31
            },
        ]
    },
    //This is the first fight scene. Only the correct path and one game over are written. We can determine diverging paths/GAME OVER scenarios after the intro scene is tested in the JS code
    {
        id: 31,
        text: 'Suddenly, the two men jump aside and draw guns. They’re shooting!',
        options: [
            {
                text: "Jump out of the way onto the conveyor belt",
                nextText: 32
            },
            // {
            //     text: "Take cover behind the conveyor belt",
            //     nextText: 31
            // },
        ]
    },
    {
        id: 32,
        text: 'You jump out of the way onto a luggage conveyor belt that transports you above the men. As you aim your gun to shoot, they fire rounds in your direction.',
        options: [
            {
                text: "Next",
                nextText: 33
            },
        ]
    },
    {
        id: 33,
        text: 'As you’re firing your gun, a suitcase falls and knocks it out of your hands! You lose track of the men as they split up amid the chaos. ',
        options: [
            {
                text: "Next",
                nextText: 34
            },
        ]
    },
    {
        id: 33,
        text: 'As you’re firing your gun, a suitcase falls and knocks it out of your hands! You lose track of the men as they split up amid the chaos.',
        options: [
            {
                text: "Next",
                nextText: 34
            },
        ]
    },
    {
        id: 34,
        text: 'You frantically look for your gun as luggage passes on the conveyor belt. One of the men is approaching your hiding place.',
        options: [
            // {
            //     text: "Continue looking for your gun, you saw it fall nearby.", //Chance scenario to find the gun or get caught
            //     nextText: 3
            // },
            {
                text: "Grab an item off the conveyor belt to use as a weapon",
                setState: { ski : true},
                nextText: 35
            },
        ]
    },
    {
        id: 35,
        text: 'You grab a [SKI] from the conveyor belt. You use it whack the gun out of his hand. You both land a few punches before toppling over onto another belt, causing a pile of suitcases to open.',
        options: [
            {
                text: "Next",
                nextText: 36
            },
        ]
    },
    {
        id: 36,
        text: 'As you regain your footing, you see the man searching for his gun among the contents of the spilled suitcases.',
        options: [
            // {
            //     text: "Stop him with force by attacking him from behind",
            //     nextText: 3
            // },
            {
                text: "Distract him with something from the suitcase",
                setState: { hairspray : true},
                nextText: 37
            },
        ]
    },
    {
        id: 37,
        text: 'The nearest item to you is a can of [HAIRSPRAY]. Just as he finds his gun and turns to aim at you, you blind him with a stream of spray… that suddenly explodes?',
        options: [
            {
                text: "Next",
                nextText: 38
            },
        ]
    },
    {
        id: 38,
        text: 'His partner appears, shooting the can right out of your hand! Reflexively, you jump up to the belt above you to move out of the line of fire.',
        options: [
            {
                text: "Next",
                nextText: 39
            },
        ]
    },
    {
        id: 39,
        text: 'The partner starts heading up to your perch. Fortunately you have the high ground, but you better think carefully about your next move.',
        options: [
            {
                text: "Surprise him by jumping down from above",
                nextText: 40
            },
            // {
            //     text: "Distract him by throwing an item", //select item from inventory to throw?
            //     nextText: 40
            // },
        ]
    },
    {
        id: 40,
        text: 'After you jump down from above, you grab him by the collar and attempt to throw him off the ledge. But he reacts so quickly that he pulls you down with him onto another moving belt below!',
        options: [
            {
                text: "Next",
                nextText: 41
            },
        ]
    },
    {
        id: 40,
        text: 'Both of you have lost your guns. You find yourself in a power struggle on the belt that moves ever closer towards a small hatch that is not meant to fit a person, let alone two.',
        options: [
            {
                text: "Next",
                nextText: 41
            },
        ]
    },
    {
        id: 41,
        text: 'The belt is now too high to jump down. You punch him enough to finally gain control. He is now pinned underneath you as you both approach the end, him headfirst.',
        options: [
            {
                text: "Next",
                nextText: 42
            },
        ]
    },
    {
        id: 42,
        text: 'You better make a move before you end up crushed, too.', //both events lead to same resolution, the only difference is option 1 is canon
        options: [
            {
                text: "Jump off the belt and grab onto the ledge",
                setState: { lighter: true },
                nextText: 43
            },
            {
                text: "Jump down into a pile of luggage below",
                setState: { nailFile: true },
                nextText: 43
            },
        ]
    },
    {
        id: 43,
        text: 'His head starts getting crushed in the narrow hatch, splattering blood all over you. The machine smokes as the less lucky culprit twitches in the now jammed machine.',
        options: [
            {
                text: "Next",
                requiredState: (currentState) => currentState.nailFile,
                nextText: 47
            },
            {
                text: "Next",
                requiredState: (currentState) => currentState.lighter,
                nextText: 44
            },
        ]
    },
    {
        id: 44,
        text: 'You wince, but there’s no time to react— you jump off the belt and grab onto a nearby pipe.',
        options: [
            {
                text: "Next",
                nextText: 45
            },
        ]
    },
    {
        id: 45,
        text: 'The pipe you grabbed onto bursts, letting out steam onto your hands that cause you to instantly let go. The wind gets knocked out of you as you slam into a pile of luggage below.',
        options: [
            {
                text: "Next",
                nextText: 46
            },
        ]
    },
    {
        id: 45,
        text: 'The pipe you grabbed onto bursts, letting out steam onto your hands that cause you to instantly let go. The wind gets knocked out of you as you slam into a pile of luggage below.',
        options: [
            {
                text: "Next",
                nextText: 46
            },
        ]
    },
    {
        id: 46,
        text: 'The wind gets knocked out of you as you slam into the hard suitcases. Something jabbed you especially hard— a [LIGHTER]? It could be useful later…',
        options: [
            {
                text: "Next",
                nextText: 49
            },
        ]
    },
    {
        id: 47,
        text: 'You wince, but there’s no time to react— you jump off the belt and into a pile of luggage below.',
        options: [
            {
                text: "Next",
                nextText: 48
            },
        ]
    },
    {
        id: 48,
        text: 'The wind gets knocked out of you as you slam into the hard suitcases. Something jabbed you especially hard— the blunt end of a [METAL NAIL FILE]? It could be useful later… ',
        options: [
            {
                text: "Next",
                nextText: 49
            },
        ]
    },
    {
        id: 49,
        text: 'You look up to see the surviving member of the pair making a run for it! It seems almost hopeless until you look around and see… oh you’ve gotta be kidding me…',
        options: [
            {
                text: "Next",
                nextText: 50
            },
        ]
    },
    {
        id: 50,
        text: 'You hop onto a bike that was checked into luggage and ride after him. Just as you’re about to catch him, you hit a ledge that sends you flying into a bin full of bags!',
        options: [
            {
                text: "Next",
                nextText: 51
            },
        ]
    },
    {
        id: 51,
        text: 'When you look up you see…',
        options: [
            {
                text: "Next",
                nextText: 52
            },
        ]
    },
    {
        id: 52,
        text: '“Freeze!” The police holding a gun to your head… and the suspect escaping.',
        options: [
            {
                text: "Next",
                nextText: 53
            },
        ]
    },
    {
        id: 53,
        text: '“Great job, asshole,” you sigh. “I’m a cop... you let the bad guy get away!”',
        image: ("img/tbc.jpg"),
        options: [
            {
                text: "Thanks for playing our demo!",
            },
        ]
    },
];

startGame();

});
})();