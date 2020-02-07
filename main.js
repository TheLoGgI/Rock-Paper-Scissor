
/**
 * Single Player mode
 * True for single player, false for muliplayer
 * @type {boolean}
 */
let isSingle
let singlepick, secoundPick
let timerDone = false
let gameOn = false

const timer = document.getElementById('timer')
const playerOne = document.querySelector(".player-one")
const playerOneLabel = playerOne.children[1]
const playerOneImg = playerOne.children[0]

const playerTwo = document.querySelector(".player-two")
const playerTwoLabel = playerTwo.children[1]
const playerTwoImg = playerTwo.children[0]

const winNote = document.querySelector('.start h3')
const scorePlayerOne = document.getElementById('first')
const scorePlayerTwo = document.getElementById('secound')

// Choosing Multi or single player mode
const choosePlayer = document.querySelector(".choose-player")
choosePlayer.addEventListener('click', function(e) {
    const choise = e.path[1].id 

    if (choise === 'single'){
        isSingle = true
    } else {
        isSingle = false
    }
    
    choosePlayer.remove()
})

function imageRoll(imageNode) {
    const actionsArray = ['rock.svg','paper.svg', 'scissor.svg']
    let randomImage = randomPick(actionsArray)
    imageNode.src = `actions/${randomImage}`
}

function setImageAction(imageNode, action) {
    imageNode.src = `actions/${action.toLowerCase()}.svg`
}

function updateLabel() {
    if (singlepick) {
        playerOneLabel.innerHTML = singlepick
    }
    if (secoundPick) {
        playerTwoLabel.innerHTML = secoundPick
    }
    
}

function updateScore(label) {
    label.innerHTML = Number(label.textContent) + 1
}

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


function waitForCountDown() {
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

function countDown(waitTime, timerElement){
       waitTime = waitTime - 1

       const changeImage = setInterval(() => {
        imageRoll(playerTwoImg)
        imageRoll(playerOneImg)
        }, 300)
       
        const interval = setInterval(function() {
            timerElement.innerHTML = Number(waitTime--)
            
            
            
            if (waitTime < 0){
                clearInterval(interval);
                clearInterval(changeImage)
            }

            if (waitTime === -1) {
                timerDone = true
                waitForCountDown()
            }
            
        }, 1000)

}


// When clicking start
document.querySelector('.start button').addEventListener('click', async e => {
    gameOn = true
    countDown(5,timer)
})


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
            setImageAction(playerTwoImg, 'papir')
            break;
        
        case 'SCISSOR':
            index = 2
            setImageAction(playerTwoImg, 'scissor')
            break;
    }  
    
    switch (player1) {
        case 'ROCK':
            winner = winStaues(winTable[0][index])
            setImageAction(playerOneImg, 'rock')
            break;
        case 'PAPER':
            winner = winStaues(winTable[1][index])
            setImageAction(playerOneImg, 'paper')
            break;
    
        case 'SCISSOR':
            winner = winStaues(winTable[2][index])
            setImageAction(playerOneImg, 'scissor')
            break;
        
    }    
    console.log(winner);
    
    return winner
}


function winStaues(winStaus) {
    if (winStaus == 0) return 'TIE'
        else if (winStaus == 1) return 'WON'
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









