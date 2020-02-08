
/**
 * Single Player mode
 * True for single player, false for muliplayer
 * @type {Boolean}
 */
let isSingle
/**
 * Player or players choosing action
 * @type {String}
 */
let singlepick 
/**
 * Secound player choosing action
 * @type {String}
 */
let secoundPick

/**
 * Determens when timer has reached 0
 * @type {Boolean}
 */
let timerDone = false
/**
 * Player or players choosing action
 * @type {Boolean}
 */
let gameOn = false

/**
 * Timer Element
 * @type {HTMLElement}
 */
const timer = document.getElementById('timer')
/**
 * Player one Element
 * @type {HTMLElement}
 */
const playerOne = document.querySelector(".player-one")
const playerOneLabel = playerOne.children[1]
/**
 * Player one image element
 * @type {HTMLImageElement}
 * @property {object} defaults.src
 */
// @ts-ignore
const playerOneImg = playerOne.children[0]

/**
 * Player Two Element or bot
 * @type {HTMLElement}
 */
const playerTwo = document.querySelector(".player-two")
const playerTwoLabel = playerTwo.children[1]
/**
 * Player two image element
 * @type {HTMLImageElement}
 */
// @ts-ignore
const playerTwoImg = playerTwo.children[0] 

/**
 * Win label
 * @type {HTMLElement}
 */
const winNote = document.querySelector('.start h3')
const scorePlayerOne = document.getElementById('first')
const scorePlayerTwo = document.getElementById('secound')



/**
 * Timer Element
 * Changes the image source of image node passed to the funtion
 * @param {HTMLImageElement} imageNode - swiches random between rock, paper, scissor images
 */
function imageRoll(imageNode) {
    const actionsArray = ['rock.svg','paper.svg', 'scissor.svg']
    let randomImage = randomPick(actionsArray)
    imageNode.src = `actions/${randomImage}`
}

/**
 * Timer Element
 * Changes the image source of image node passed to the funtion
 * @param {HTMLImageElement} imageNode - swiches random between rock, paper, scissor images
 */
function setImageAction(imageNode, action) {
    imageNode.src = `actions/${action.toLowerCase()}.svg`
}

/**
 * Updates label
 * Updates seleted action
 * @function updateLabel
 * @returns {void}
 */
function updateLabel() {
    if (singlepick) {
        playerOneLabel.innerHTML = singlepick
    }
    if (secoundPick) {
        playerTwoLabel.innerHTML = secoundPick
    }
    
}


/**
 * Updates score label
 * @function updateScore
 * @returns {void}
 */
function updateScore(label) {
    label.innerHTML = Number(label.textContent) + 1
}

/**
 * Player action state
 * @typedef {Enumerator} playerState
 * @property {String} 
 * @param {*} winState 
 */

/**
 * Win Label
 * Updates or sets the win label, to show the winner of the match.
 * @function updateWinLabel
 * @param {String} winState
 * @returns {void}
 */
function updateWinLabel(winState) {
    if (winState === 'WON') {
        winNote.innerHTML = 'Player 1 WON'
        updateScore(scorePlayerOne)
    } else if(winState === 'LOST'){
        winNote.innerHTML = 'Player 2 WON'
        updateScore(scorePlayerTwo)
    } else {
        winNote.innerHTML = 'TIE'
    }
    gameOn = false
}
/**
 * Game loop
 * Checks for multi- or singleplayer, executes game loop
 * @function gameLoop
 * @returns {void}
 */
function gameLoop() {
    let winner
    const choises = ['ROCK', 'PAPER', 'SCISSOR']
    if (timerDone) {
        if (isSingle) {
            // Single Player
  
            secoundPick = randomPick(choises)
            updateLabel()
            winner = isWinner(singlepick, secoundPick)
        } else {
            // Multiplayer
            winner = isWinner(singlepick, secoundPick)
            updateLabel()
        }

        timerDone = false
    }
    updateWinLabel(winner)
}

/**
 * Count Down Timer
 * @function countDown
 * @param {Number} waitTime 
 * @param {HTMLElement} timerElement 
 * @returnes {void}
 */
function countDown(waitTime, timerElement){
       waitTime = waitTime - 1

       const changeImage = setInterval(() => {
        imageRoll(playerTwoImg)
        imageRoll(playerOneImg)
        }, 300)
       
        const interval = setInterval(function() {
            // @ts-ignore
            timerElement.innerHTML = Number(waitTime--)
            
            
            
            if (waitTime < 0){
                clearInterval(interval);
                clearInterval(changeImage)
            }

            if (waitTime === -1) {
                timerDone = true
                gameLoop()
            }
            
        }, 1000)

}





function randomPick(array) {
    const randomInt = Math.floor(Math.random() * array.length)
    return array[randomInt]
}

function isWinner(player1, player2) {
/*  +----------+-------+-------+--------+
    | winTable | Rock  | Paper |Scissors|
    +----------+-------+-------+--------+
    | Rock     |   0   |   1   |   -1   |
    | Paper    |  -1   |   0   |    1   |
    | Scissors |   1   |  -1   |    0   |
    +----------+-------+-------+--------+ */

    /**
     * Win table
     * @type {Array|Array|number}
     */
    const winTable = [[0,-1,1], [1,0,-1], [-1,1,0]]
    let winner
    let index = 0

    switch (player2) {
        case 'ROCK':
            index = 0
            setImageAction(playerTwoImg, 'rock')
            break;
        case 'PAPER':
            index = 1
            setImageAction(playerTwoImg, 'paper')
            break;
    
        case 'SCISSOR':
            index = 2
            setImageAction(playerTwoImg, 'scissor')
            break;
    }  
    
    switch (player1) {
        case 'ROCK':
            winner = winStatus(winTable[0][index])
            setImageAction(playerOneImg, 'rock')
            break;
        case 'PAPER':
            winner = winStatus(winTable[1][index])
            setImageAction(playerOneImg, 'paper')
            break;
    
        case 'SCISSOR':
            winner = winStatus(winTable[2][index])
            setImageAction(playerOneImg, 'scissor')
            break;
        
    }    
    console.log(winner);
    
    return winner
}

/**
 * Win status
 * @function winStatues
 * @param {Number} winState - index for win(1), lose(-1) or tie(0) 
 * @returns Status of index converted to text WON, LOST, TIE
 */
function winStatus(winState) {
    if (winState == 0) return 'TIE'
        else if (winState == 1) return 'WON'
        else return 'LOST'
}


// player controls
document.addEventListener('keydown', function (event) {
    // console.log(event.keyCode);
    
    if (gameOn){

        if (event.keyCode === 81 ){
            // Q - ROCK
            singlepick = 'ROCK'
        } else if(event.keyCode === 87) {
            // W - Paper
            singlepick = 'PAPER'
        } else if(event.keyCode === 69) {
            // E - SCISSOR
            singlepick = 'SCISSOR'
        }
    
        // If its multiplayer
        if (!isSingle) {
            if (event.keyCode === 37 ){
                // LEFT ARROW - ROCK
                secoundPick = 'ROCK'
            } else if(event.keyCode === 40) {
                // DOWN ARROW - Paper
                secoundPick = 'PAPER'
            } else if(event.keyCode === 39) {
                // RIGHT ARROW - SCISSOR
                secoundPick = 'SCISSOR'
            }
        }
    }
    updateLabel()
    
    
})


// Choosing Multi or single player mode

/**
 * Player option to one or two players
 * @type {HTMLElement}
 */
const choosePlayer = document.querySelector(".choose-player")

/**
 * Settings function
 * @event .choose-player#click
 * @listens click
 * @callback When choosing a player mode (multi or single) choise is set isSingle set to true or false
 * @property {event} e - event object from click event
 */
choosePlayer.addEventListener('click', function(e) {
    const choise = e.path[1].id 
    
    if (choise === 'single'){
        isSingle = true
    } else {
        isSingle = false
    }
    
    choosePlayer.remove()
})

// When clicking start
document.querySelector('.start button').addEventListener('click', async e => {
    gameOn = true
    countDown(5,timer)
})









