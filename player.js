const settingTime = (t, all, width) => {
    let inner = e('.last')
    let now_miao = parseInt(t % 60)
    let now_miao_1 = parseInt(now_miao / 10)
    let now_miao_2 = parseInt(now_miao % 10)

    let now_min = parseInt(t / 60)
    let now_min_1 = parseInt(now_min / 10)
    let now_min_2 = parseInt(now_min %10)

    let all_miao = parseInt(all % 60)

    let all_min = parseInt(all / 60)
    let all_min_1 = parseInt(all_min / 10)
    let all_min_2 = parseInt(all_min % 10)
    inner.style.width = String(width) + '%'
    if (all_miao < 10) {
        time.innerHTML = `
        <span id="id-span-now">${now_min_1}${now_min_2}:${now_miao_1}${now_miao_2}</span>/<span class="span" id="id-span-all">${all_min_1}${all_min_2}:0${all_miao}</span>
                     `
    } else {
        time.innerHTML = `
        <span id="id-span-now">${now_min_1}${now_min_2}:${now_miao_1}${now_miao_2}</span>/<span class="span" id="id-span-all">${all_min_1}${all_min_2}:${all_miao}</span>
                     `
    }

}

//进度条控制
const Contorl = (audio) => {
    let inner = e('.last')
    let outer = e('.timer')
    let dot = e('.dot')
    let all = (audio.duration).toFixed(0)
    let max = outer.offsetWidth
    // 用开关来表示是否可以移动, 可以按下开关的时候才能移动
    let moving = false
    let offset = 0


    dot.addEventListener('mousedown', (event) => {
        log('event', event.clientX, dot.offsetLeft, event.clientX - dot.offsetLeft)
        // event.clientX 是浏览器窗口边缘到鼠标的距离
        // dot.offsetLeft 是 dot 元素左上角到父元素左上角的距离
        // offset 就是父元素距离浏览器窗口边缘的距离, 注意这个值基本上是不变的
        offset = event.clientX - dot.offsetLeft
        moving = true
        audio.pause()
    })

    document.addEventListener('mouseup', (event) => {
        moving = false
        audio.play()
    })

    document.addEventListener('mousemove', (event) => {
        if (moving) {
            // 离浏览器左侧窗口当前距离减去父元素距离浏览器左侧窗口距离就是
            // dot 移动的距离
            let x = event.clientX - offset
            // dot 距离有一个范围, 即 0 < x < max
            if (x > max) {
                x = max
            }
            if (x < 0) {
                x = 0
            }
            let width = (x / max) * 100
            //inner.style.width = String(width) + '%'
            //百分比控制歌曲播放
            let now = (x / max) * all
            let t = (now).toFixed(0)
            let time = e('.time')
            log('shijian', all)
            audio.currentTime = all * (x / max).toFixed(2)
            inner.style.width = String(width) + '%'
            audio.dataset.play = 'T'
            let button = e('#id-button-play')
            button.innerHTML = '|'
            settingTime(t, all, width)
        }
    })
}

const TimeNow = (audio) => {
    let now = audio.currentTime
    let all = (audio.duration).toFixed(0)
    let t = (now).toFixed(0)
    let time = e('.time')
    let inner = e('.last')
    let width = (t / all) * 100

    settingTime(t, all, width)
}

const TimeShow = function(audio) {
    //1s = 1000ms
    let interval = 1000
    let clockId = setInterval(function() {
        TimeNow(audio)
    }, interval)
}

//音乐列表
const songs = [
    '盛夏的微风.mp3',
    'Everything Be Alright.mp3',
    'Fly into sky.mp3',
    'Trouble Maker.mp3',

]

const nextSong = function(index) {
    index = (index + 1) % songs.length
    return songs[index]
}

//传songs数组，得到随机歌曲编号
const choice = function(array) {
    let a = Math.random()
    let i = (array.length * a).toFixed(0)
log('random', i, a)
    if (i > (array.length - 1)) {
        return (array.length - 1)
    } else {
        return i
    }

}

const ChooseEnd = (audio) => {
    let button = e('#id-button-play')
    let name = e ('.title')
    name.innerHTML = `${audio.dataset.name}`
    button.innerHTML = ''
    audio.play()
    setTimeout(function() {
        button.innerHTML = '|'
        audio.dataset.play = 'T'
    }, 100)
}

const PassSet = (audio, song, index) => {
    audio.src = `audio/${song}`
    audio.dataset.name = `${song}`
    audio.dataset.path = `${index}`
}

const LastMusic = function(audio) {
    let last = e('#id-button-last')

    last.addEventListener('click', function() {
        let index = Number(audio.dataset.path)
        audio.pause()
        if (index === 0) {
            let i = Number((songs.length - 1))
            index = i
            let song = songs[i]
            PassSet(audio, song, i)
        } else {
            index -= 1
            let song = songs[index]
            PassSet(audio, song, index)
        }
        ChooseEnd(audio)
    })

}

const ChooseMusic = function(audio) {
    let next = e('#id-button-next')

    next.addEventListener('click', function() {
        let index = Number(audio.dataset.path)
        audio.pause()
        if (index < Number((songs.length - 1))) {
            let i = (index + 1)
            log('index', i)
            let song = songs[i]
            PassSet(audio, song, i)
        }
        if (index === Number((songs.length - 1))) {
            let song = songs[0]
            log('0000')
            PassSet(audio, song, 0)
        }

        ChooseEnd(audio)
    })
}

const RandomMusic = function(audio) {
    let next = e('#id-button-random')
    next.addEventListener('click', function() {
        audio.pause()
        let i = choice(songs)
        let song = songs[i]
        PassSet(audio, song, i)
        ChooseEnd(audio)
    })
}

const ReplayMusic = function(audio) {
    let next = e('#id-button-replay')
    /*let index = Number(audio.dataset.path)*/
    next.addEventListener('click', function() {
        audio.pause()
        audio.currentTime = 0
        ChooseEnd(audio)
    })
}

const bindEventEnded = function(audio) {
    audio.addEventListener('ended', function() {
        log('播放完毕')
        let index = Number(audio.dataset.path)
        if (index === (songs.length - 1)) {
            let song = songs[0]
            PassSet(audio, song, 0)
        } else {
            index += 1
            let song = songs[index]
            PassSet(audio, song, index)
        }
        setTimeout(function() {
            audio.play()
            audio.dataset.play = 'T'
        }, 1000)
        // 这里刚设置完 src 就去 log duration
        // 只能得到 NaN(Not a Number)
        // 因为这个时候音乐文件还没有加载进来
        // 必须在 canplay 事件中才能获取到 duration

    })
}

const bindEventPlay = function(audio) {
    let button = e('#id-button-play')
    let name = e ('.title')
    //let play = true
    audio.addEventListener('canplay', function() {
        Contorl(audio)
        name.innerHTML = `${audio.dataset.name}`
        TimeShow(audio)
    })
    ReplayMusic(audio)
    RandomMusic(audio)
    LastMusic(audio)
    ChooseMusic(audio)
    bindEventEnded(audio)
    button.addEventListener('click', function() {
        if (audio.dataset.play === 'F') {
            audio.play()
            audio.dataset.play = 'T'
            button.innerHTML = '|'
        } else {
            audio.pause()
            audio.dataset.play = 'F'
            button.innerHTML = ''
        }
    })
}





const bindEvents = function() {
    let audio = e('#id-audio-player')
    bindEventPlay(audio)
}

const __main = function() {
    bindEvents()
}

__main()