//Initialized variables
let is_game_running = false
let score = 0
let points = 0
let countdown_seconds = 10

//Declared variables
let end
let start
let boundaries
let status_display
let coins
let win_sound
let collect_sound
let loose_sound

document.addEventListener('DOMContentLoaded', loadPage)

function displayScore(message) {
  if (message != '')
    status_display.innerHTML =
      message + '<br>' + 'Your Score is: ' + score + ' Points: ' + points
}

function resetBounderies() {
  for (let i = 0; i < boundaries.length; i++)
    boundaries[i].style.backgroundColor = '#eeeeee'
}

function resetCoins() {
  for (let i = 0; i < coins.length; i++) {
    coins[i].style.visibility = 'visible'
  }
}

function gameOver() {
  if (is_game_running) {
    for (let i = 0; i < boundaries.length; i++)
      boundaries[i].style.backgroundColor = 'rgb(243, 159, 159)'
    if (score > 0) score = score - 1
    displayScore('Game Over!')
    loose_sound.currentTime = 0
    loose_sound.play()
  }
  is_game_running = false
}
function start_countdown() {
  if (is_game_running) {
    status_display.innerHTML = `${countdown_seconds} seconds remaining <br><br>`
    let timer = setInterval(function () {
      if (!is_game_running) {
        return clearInterval(timer)
      }
      countdown_seconds--
      status_display.innerHTML = `${countdown_seconds} seconds remaining <br><br>`

      if (countdown_seconds <= 0) {
        clearInterval(timer)
        gameOver()
      }
    }, 1000)
  }
}

function startGame() {
  if (is_game_running) return
  is_game_running = true
  countdown_seconds = 10
  start_countdown()
  displayScore('')
  resetBounderies()
  resetCoins()
}

function endGame() {
  if (is_game_running) {
    for (let i = 0; i < boundaries.length; i++)
      boundaries[i].style.backgroundColor = 'rgb(113 225 141)'
    score = score + 5
    win_sound.currentTime = 0
    win_sound.play()
    displayScore('You Won!')
    is_game_running = false
  }
}

function resetGame() {
  score = 0
  points = 0
  status_display.innerHTML =
    'Begin by clicking over the "S" green square. <br> You have 10 seconds only'
  is_game_running = false
  resetBounderies()
  resetCoins()
}

function addPoint(e) {
  if (is_game_running) {
    collect_sound.currentTime = 0
    collect_sound.play()
    points++
    e.target.style.visibility = 'hidden'
  }
}

function loadPage() {
  end = document.getElementById('end')
  start = document.getElementById('start')
  boundaries = document.getElementsByClassName('boundary')
  status_display = document.getElementById('status')
  coins = document.getElementsByClassName('coin')
  win_sound = document.getElementById('win_audio')
  loose_sound = document.getElementById('loose_audio')
  collect_sound = document.getElementById('collect_audio')
  end.addEventListener('mouseover', endGame)
  start.addEventListener('click', startGame)

  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].addEventListener('mouseover', gameOver)
  }
  for (let i = 0; i < coins.length; i++) {
    coins[i].addEventListener('mouseover', addPoint)
  }
}
