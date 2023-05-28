import './style.css';
import Knight from './knight.png'

let dir = [-1, 2, 1, -2, 1, 2, -1, -2, -1]

function Node(pos, path) {
    if (pos[0] < 1 || pos[1] < 1 || pos[0] > 8 || pos[1] > 8)
        return null;

    return {pos, path}
}

function knightMoves([x, y], [a, b]) {
    if (x < 1 || y < 1 || a < 1 || b < 1 || x > 8 || y > 8 || a > 8 || b > 8) {
        displayError()
        return []
    }
    let q = [Node([x,y], [[x,y]])]

    while (q.length) {
        let cur = q.shift()

        if (cur.pos[0] === a && cur.pos[1] === b) {
            return cur.path;
        }

        for (let d = 0; d <= 8; d++) {
            let move = [cur.pos[0]+dir[d], cur.pos[1]+dir[d+1]]

            let node = Node(move, cur.path.concat([move]))
            if (node)
                q.push(node)
        }
    }
}


function createGrid() {
    let grid = document.querySelector('.grid')
    let black = false
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const div = document.createElement('div');
            div.classList.add('cell')

            if (i === 0 && j === 0) {
                div.classList.add('black')
            } else if (i === 0) {
                div.classList.add('header')
                div.textContent = j
            } else if (j === 0) {
                div.classList.add('header')
                div.textContent = i
            } else {
                if (black)
                    div.classList.add('black')
                else
                    div.classList.add('white')
                black = !black

                let img = new Image()
                img.src = Knight
                img.classList.add(`cell_${i}_${j}`);
                div.appendChild(img)
    
                const count = document.createElement('div');
                count.classList.add('count')
                count.classList.add(`count_${i}_${j}`)
                div.appendChild(count)
            }

            grid.appendChild(div);
        }
        black = !black
    }
}

function addEventListeners() {
    const find = document.querySelector('.find')

    find.addEventListener('click', findPath)
}

function displayError() {
    const error = document.querySelector('.error')
    error.textContent = 'Invalid coordinates'
    error.classList.add('active')
}

function findPath() {
    const error = document.querySelector('.error')
    error.classList.remove('active')

    const start_x = document.querySelector('.start_x').value
    const end_x = document.querySelector('.end_x').value
    const start_y = document.querySelector('.start_y').value
    const end_y = document.querySelector('.end_y').value

    if (start_x === '' || end_x === '' ||
        start_y === '' || end_y === '' ) {
        displayError()
        return
    }

    updateGrid(knightMoves([parseInt(start_x), parseInt(start_y)],
     [parseInt(end_x), parseInt(end_y)]))

}

function clearGrid() {
    let images = document.querySelectorAll('img')
    for (let img of images) {
        img.classList.remove('active')
    }


    let counts = document.querySelectorAll('.count')
    for (let cnt of counts) {
        cnt.textContent = ''
    }
}

function updateGrid(moves) {
    clearGrid()
    let i = 1
    for (let move of moves) {
        let cell = document.querySelector(`.cell_${move[0]}_${move[1]}`)
        cell.classList.add('active')

        let cnt = document.querySelector(`.count_${move[0]}_${move[1]}`)
        cnt.textContent = i
        i++
    }
}

createGrid() 
addEventListeners()