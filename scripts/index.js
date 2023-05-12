const handleButtonRestart = () => {
  box_mask.classList.toggle('hidden')

  const box_snake_head = document.createElement('div')
  const box_snake_body = document.createElement('div')

  box_snake_head.id = 'snake-head'
  box_snake_body.classList.add('snake-body')

  snake = {
    0: {x: 4, y: 9, direction: string_values.RIGHT},
    1: {x: 3, y: 9, direction: string_values.RIGHT}
  }
1
  const temp = [box_snake_head, box_snake_body]

  Object.entries(snake).forEach(([key, value]) => {
    temp[key].style.gridColumn = `${value.x + 1}`
    temp[key].style.gridRow = `${value.y + 1}`
    temp[key].setAttribute('key', `snk-${key}`)
  })

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
const apple = document.querySelector('div#apple')

let snake = {}
let direction = string_values.RIGHT

button_restart.addEventListener('click', handleButtonRestart)