const addBody = () => {
  const keys = Object.keys(snake)
  const box_snake_body = document.createElement('div')

  const rotate = {
    [string_values.RIGHT]: '0',
    [string_values.LEFT]: '180',
    [string_values.UP]: '-90',
    [string_values.DOWN]: '90'
  }

  snake[keys.length] = {
    x: snake[keys.at(-1)].x,
    y: snake[keys.at(-1)].y,
    direction: snake[keys.at(-1)].direction
  }

  box_snake_body.setAttribute('key', `snk-${keys.length}`)
  box_snake_body.classList.add('snake-body')
  
  box_game.appendChild(box_snake_body)
}

const moveApple = () => {
  const box_apple = document.querySelector('div#apple')

  let [x, y] = [Math.round(Math.random() * 19), Math.round(Math.random() * 19)]

  while (Object.values(snake).find(part => part.x === x && part.y === y)) {
    x = Math.round(Math.random() * 19)
    y = Math.round(Math.random() * 19)
  }

  apple.x = x
  apple.y = y

  box_apple.style.gridColumn = `${x + 1}`
  box_apple.style.gridRow = `${y + 1}`
}

const initGame = () => {
  move_timer = setInterval(() => {
    const keys = Object.keys(snake)
    const move = {
      [string_values.RIGHT]: () => snake[0].x += 1,
      [string_values.LEFT]: () => snake[0].x -= 1,
      [string_values.UP]: () => snake[0].y -= 1,
      [string_values.DOWN]: () => snake[0].y += 1
    }
    const rotate = {
      [string_values.RIGHT]: '0',
      [string_values.LEFT]: '180',
      [string_values.UP]: '-90',
      [string_values.DOWN]: '90'
    }

    let itGrow = false

    snake[0].direction = direction

    for (let i = keys.length - 1; i > 0; i--) {
      snake[keys[i]].x = snake[keys[i - 1]].x
      snake[keys[i]].y = snake[keys[i - 1]].y
      snake[keys[i]].direction = snake[keys[i - 1]].direction
    }

    move[direction]()

    if (snake[0].x > 19 || snake[0].x < 0 || snake[0].y > 19 || snake[0].y < 0) {
      clearInterval(move_timer)
      box_mask.classList.toggle('hidden')

      return alert('you lose')
    }

    if (snake[0].x === apple.x && snake[0].y === apple.y) {
      addBody()
      itGrow = true
    }

    Object.entries(snake).forEach(([key, value]) => {
      const snake_part = document.querySelector(`div[key="snk-${key}"]`)

      snake_part.style.gridColumn = `${value.x + 1}`
      snake_part.style.gridRow = `${value.y + 1}`
      snake_part.style.transform = `rotate(${rotate[value.direction]}deg)`
    })

    if (itGrow)
      moveApple()
  }, 250)
}
const handleButtonRestart = () => {
  box_mask.classList.toggle('hidden')

  clearInterval(move_timer)

  ;[...document.querySelectorAll('div#snake-head, div.snake-body, div#apple')].forEach(part => box_game.removeChild(part))

  const box_snake_head = document.createElement('div')
  const box_snake_body = document.createElement('div')
  const box_apple = document.createElement('div')

  box_snake_head.id = 'snake-head'
  box_snake_body.classList.add('snake-body')

  snake = {
    0: {x: 4, y: 9, direction: string_values.RIGHT},
    1: {x: 3, y: 9, direction: string_values.RIGHT}
  }
  apple = {
    x: 14,
    y: 9
  }

  initGame()

  const temp = [box_snake_head, box_snake_body]

  Object.entries(snake).forEach(([key, value]) => {
    temp[key].style.gridColumn = `${value.x + 1}`
    temp[key].style.gridRow = `${value.y + 1}`
    temp[key].setAttribute('key', `snk-${key}`)
  })

  box_apple.id = 'apple'
  box_apple.style.gridColumn = `${apple.x + 1}`
  box_apple.style.gridRow = `${apple.y + 1}`

  direction = string_values.RIGHT

  box_game.appendChild(box_apple)
  box_game.appendChild(box_snake_head)
  box_game.appendChild(box_snake_body)
}

const string_values = {
  UP: 'up',
  RIGHT: 'right',
  DOWN: 'down',
  LEFT: 'left'
}

Object.freeze(string_values)

const button_restart = document.querySelector('button#restart')
const box_mask = document.querySelector('div.mask')
const box_game = document.querySelector('section#game')

let snake = {}
let apple = {
  x: 0,
  y: 0
}
let direction = string_values.RIGHT
let move_timer = undefined

button_restart.addEventListener('click', handleButtonRestart)

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' && snake[1].x !== snake[0].x - 1)
    direction = string_values.LEFT

  if (e.key === 'ArrowRight' && snake[1].x !== snake[0].x + 1)
    direction = string_values.RIGHT

  if (e.key === 'ArrowUp' && snake[1].y !== snake[0].y - 1)
    direction = string_values.UP

  if (e.key === 'ArrowDown' && snake[1].y !== snake[0].y + 1)
    direction = string_values.DOWN
})