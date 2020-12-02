//随机生成数据
const random01 = function() {
    if (Math.random() > 0.85) {
        return 1
    }
    return 0
}

const randomLine01 = function(n) {
    let s = []
    for (let i = 0; i < n; i++) {
        s.push(random01())
    }
    return s
}

const randomLine = function(n) {
    let s = randomLine01(n)
    let result = []
    for (let i = 0; i < s.length; i++) {
        if (s[i] == 1) {
            result.push(9)
        } else {
            result.push(0)
        }
    }
    return result
}

const randomArray = function(n) {
    let result = []
    for (let i = 0; i < n; i++) {
        result.push(randomLine(n))
    }
    return result
}

//复制数组
const clonedSquare = function(array) {
    let l = []
    for (let i = 0; i < array.length; i++) {
        let line = array[i]
        let c = line.slice(0)
        l.push(c)
    }
    return l
}

//标记
const plus1 = function(array, x, y) {
    let n = array.length
    if (x >= 0 && x < n && y >= 0 && y < n) {
        if (array[x][y] !== 9) {
            array[x][y] += 1
        }
    }
}

const markAround = function(array, x, y) {
    if (Number(array[x][y]) === 9) {
        //标记所有数字 9 （雷）
        plus1(array, x - 1, y - 1)
        plus1(array, x, y - 1)
        plus1(array, x + 1, y - 1)
        plus1(array, x - 1, y)
        plus1(array, x + 1, y)
        plus1(array, x - 1, y + 1)
        plus1(array, x, y + 1)
        plus1(array, x + 1, y + 1)
    }
    return array
}

const markedSquare = function(array) {
    let square = clonedSquare(array)
    for (let i = 0; i < square.length; i++) {
        let line = square[i]
        for (let j = 0; j < line.length; j++) {
            square = markAround(square, i, j)
        }
    }
    return square
}

const templateCell = function(line, x) {
    let result = ''
    for (let i = 0; i < line.length; i++) {
        result += line[i]
    }
    return result
}

const templateRow = function(square) {
    let result = ''
    for (let i = 0; i < square.length; i++) {
        result += templateCell(square[i],i)
    }
    return result
}

const renderSquare = function(square, j, safe) {
    let s = templateRow(square)
    let t = ''
    for (let i = 0; i < j; i++) {
        t += '<div class="row clearfix">'
        for (let n = 0; n < j; n++) {
            t += `<div class="cell" data-type="" data-number="${s[i * 9 + n]}" data-safe="${safe}" data-x="${i}" data-y="${n}">${s[i * 9 + n]}</div>`
        }
        t += '</div>'
    }
    t += '</div>'
    let inside = e('.border')
    inside.innerHTML = '<div id="id-div-mime" class="9 "></div>\n' +
        '        <div id="id-div-mime2" class="12 "></div>\n' +
        '        <div id="id-div-mime3" class="16"></div>'
    if (square.length === 9) {
        let insert = e('#id-div-mime')
        insert.insertAdjacentHTML('beforeend', t)
    }
    if (square.length === 12) {
        let insert = e('#id-div-mime2')
        insert.insertAdjacentHTML('beforeend', t)
    }
    if (square.length === 14) {
        let insert = e('#id-div-mime3')
        insert.insertAdjacentHTML('beforeend', t)
    }
}

const countGeZi = function (length) {
    let count = 0
    //计算多少格子被翻开
    for (let i = 0; i < length; i++) {
        for (let n = 0; n < length; n++) {
            let index = `[data-x="${i}"][data-y="${n}"]`
            let event = e(index)
            if (Number(event.dataset.number) === 0) {
                event.classList.add('opened0')
            }
            if (Number(event.dataset.number) === 9) {
                event.classList.add('opened9')
                event.innerHTML = '☠'
            }
            if (event.classList.contains('opened')) {
                count += 1
            }

        }
    }
    return count
}

const ifShow = function() {
    let cell = e('.cell')
    let safe = cell.dataset.safe
    //显示游戏成功
    if (Number(count) === Number(safe)) {
        alert('YOU WIN!!!')
        let number_9 = es('.cell')
        for (let numberN of number_9) {
            numberN.classList.add('opened')
        }
    }
}

const ifEnd = function() {
    let div = e('#id-div-mime')
    let div1 = e('#id-div-mime2')
    let div2 = e('#id-div-mime3')
    div.addEventListener('click', function(event) {
        let self = event.target
        if (self.classList.contains('opened') === false) {
            vjkl(self, 9)
            let count = countGeZi(9)
            ifShow()
        }
    })
    div1.addEventListener('click', function(event) {
        let self = event.target
        if (self.classList.contains('opened') === false) {
            vjkl(self, 12)
            let count = countGeZi(12)
            ifShow()
        }
    })
    div2.addEventListener('click', function(event) {
        let self = event.target
        //let x =
        if (self.classList.contains('opened') === false) {
            vjkl(self, 14)
            let count = countGeZi(14)
            ifShow()
        }
    })
}

const bindEventDelegate = function(square, number) {
    let lei = 0
    let safe = 0
    for (let i = 0; i < number; i++) {
        //计算雷有多少
        log('gezilei jisuan', square.length, square[0].length)
        for (let n = 0; n < number; n++) {
            if (Number(square[i][n]) === 9) {
                lei += 1
            } else {
                safe += 1
            }
        }
    }
    alert(`注意！一共有${lei}个雷！`)
    return safe
}

const vjkl = function(event, number) {
    let pick = event
    if (Number(pick.dataset.number) === 9) {
        alert('GAME OVER, please press start')
        pick.classList.add('click_opened9')
        let number_9 = es('.cell')
        for (let numberN of number_9) {
            numberN.classList.add('opened')
        }
    }
    if (Number(pick.dataset.number) === 0) {
        pick.classList.add('opened0')
        pick.classList.add('opened')
        let x = Number(pick.dataset.x)
        let y = Number(pick.dataset.y)
        vjklAround(number, x, y)
    }
    pick.classList.add('opened')
}

const vjklAround = function(number, x, y) {
    vjkl1(number, x - 1, y - 1)
    vjkl1(number, x, y - 1)
    vjkl1(number, x + 1, y - 1)

    vjkl1(number, x - 1, y)
    vjkl1(number, x + 1, y)

    vjkl1(number, x - 1, y + 1)
    vjkl1(number, x, y + 1)
    vjkl1(number, x + 1, y + 1)
}

const vjkl1 = function(number, x, y) {
    log('sssss', number)

    if (x >= 0 && x < number && y >= 0 && y < number) {
        let index = `[data-x="${x}"][data-y="${y}"]`
        let event = e(`${index}`)
        if (event.classList.contains('opened') === false) {
            if (Number(event.dataset.number) !== 9) {
                if (Number(event.dataset.number) === 0) {
                    event.classList.add('opened')
                    event.classList.add('opened0')
                    vjklAround(number, x, y)
                } else {
                    event.classList.add('opened')
                }
            }
        }
    }
}

const NewStart = function(number) {
    let array = randomArray(number)
    let square = markedSquare(array)
    let safe = bindEventDelegate(square, number)
    renderSquare(square, number, safe)
}

const StartGame = function() {
    let button = e('#id-button-start')
    let button1 = e('#id-button-middle')
    let button2 = e('#id-button-hard')
    let button3 = e('#id-button-restart')
    let type = e('#id-type')
    sessionStorage.clear()

    button.addEventListener('click', function() {
        NewStart(9)
        type.dataset.type = '9'
        ifEnd()
    })

    button1.addEventListener('click', function() {
        NewStart(12)
        type.dataset.type = '12'
        ifEnd()
    })

    button2.addEventListener('click', function() {
        NewStart(14)
        type.dataset.type = '14'
        ifEnd()
    })

    button3.addEventListener('click', function() {
        let num = Number(type.dataset.type)
        NewStart(num)
        ifEnd()
    })

}


const __main = function() {
    StartGame()
}

__main()