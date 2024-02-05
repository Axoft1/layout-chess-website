
/////////======== sliders ========////////////

const sliders = document.querySelectorAll('.slider')
const buttonSlidePrev = document.querySelector('.slider_left')
const buttonSlideNext = document.querySelector('.slider_right')
const buttonsDot = document.querySelector('.buttons__dot')


let visibleSlide = 0

const dot = () => {
    const span = document.createElement('span')
    span.className = 'dot'
    return span
}
const createDots = () => {
    for (let i = 0; i < sliders.length; i++) {
        buttonsDot.append(dot())
    }
}
const displayNon = () => {
    if (document.querySelectorAll('.dot').length == 0) {
        createDots()
    }
    for (let i = 0; i < sliders.length; i++) {
        sliders[i].classList.add('none')
    }
}
const createSlider = () => {
    sliders[visibleSlide].classList.remove('none')
    document.querySelectorAll('.dot')[visibleSlide].classList.add('active')
    validButtonSlide()
}
const delSlider = (id) => {
    sliders[id].classList.add('none')
    document.querySelectorAll('.dot')[visibleSlide].classList.remove('active')
}

const nextSlider = () => {
    delSlider(visibleSlide)
    visibleSlide++
    createSlider()
}
const prevSlider = () => {
    delSlider(visibleSlide)
    visibleSlide--
    createSlider()
}
const validButtonSlide = () => {
    if (visibleSlide >= sliders.length - 1) {
        buttonSlideNext.disabled = true
    } else if (visibleSlide === 0) {
        buttonSlidePrev.disabled = true
    } else if (visibleSlide < sliders.length - 1 && visibleSlide !== 0) {
        buttonSlideNext.disabled = false
        buttonSlidePrev.disabled = false
    }
}
const sliderInit = () => {
    let w = window.innerWidth
    if (w < 768) {
        displayNon()
        createSlider()
    }
}
buttonSlidePrev.addEventListener('click', prevSlider)
buttonSlideNext.addEventListener('click', nextSlider)
window.addEventListener('resize', function () {
    sliderInit()
})
sliderInit()



/////////======== carousel ========////////////

const carousel = document.querySelector('.carousel')
const buttonLeft = document.querySelector('.carousel_left')
const buttonRight = document.querySelector('.carousel_right')
const participantsAll = document.querySelector('.participants__all')
const participantsVisible = document.querySelector('.participants__visible')

const participants = [
    { name: 'Хозе-Рауль Капабланка', title: 'Чемпион мира по шахматам', img: './assets/images/participant.png' },
    { name: 'Эммануил Ласкер', title: 'Чемпион мира по шахматам', img: './assets/images/participant.png' },
    { name: 'Александр Алехин', title: 'Чемпион мира по шахматам', img: './assets/images/participant.png' },
    { name: 'Арон Нимцович', title: 'Чемпион мира по шахматам', img: './assets/images/participant.png' },
    { name: 'Рихард Рети', title: 'Чемпион мира по шахматам', img: './assets/images/participant.png' },
    { name: 'Остап Бендер', title: 'Гроссмейстер', img: './assets/images/participant.png' },
]

participantsAll.innerHTML = `${participants.length}`

let flag = true
let active = 1
let step = 0
let offset = 0

const createElement = (id) => {
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.alt = participants[id].name
    img.src = participants[id].img
    let p = document.createElement("p");
    p.innerHTML = participants[id].name
    let pTitle = document.createElement("p");
    pTitle.innerHTML = participants[id].title
    let button = document.createElement("button");
    button.innerHTML = 'Подробнее'
    div.className = 'carousel__item'
    button.className = 'carousel__item_button'
    div.append(img, p, pTitle, button)
    return div
}
const initial = () => {
    carousel.append(createElement(active))
    nextCreateElement()
    prevCreateElement()
    participantsVisible.innerHTML = valid(active)
}
const nextCreateElement = () => {
    carousel.append(createElement(valid(active + 1)))
}
const prevCreateElement = () => {

    carousel.prepend(createElement(valid(active - 1)))
}

function valid(number) {
    if (number >= participants.length) {
        return 0
    }
    if (number < 0) {
        return participants.length - 1
    }
    return number
}

const nextCarusel = () => {
    participantsVisible.innerHTML = active + 1
    if (!flag) return
    flag = !flag
    active = valid(active + 1)
    animate({
        duration: 500,
        draw: function (progress) {
            document.querySelector('.carousel__item').style.width = (widthOffset * (1 - progress)) + 'px'
            document.querySelector('.carousel__item').style.padding = 0 + 'px'
        },
        removeElement: document.querySelector('.carousel__item')
    })
    nextCreateElement()
}
const prevCarusel = () => {
    if (!flag) return
    flag = !flag
    active = valid(active - 1)
    participantsVisible.innerHTML = active === 0 ? 6 : active
    animate({
        duration: 500,
        draw: function (progress) {
            document.querySelector('.carousel__item').style.width = (widthOffset * progress) + 'px'
            document.querySelector('.carousel__item').style.padding = 0 + 'px'
        },
        removeElement: document.querySelector('.carousel__item:last-child')
    })
    prevCreateElement()
}

buttonRight.addEventListener('click', nextCarusel)
buttonLeft.addEventListener('click', prevCarusel)

const animate = ({ duration, draw, removeElement }) => {
    const start = performance.now()

    requestAnimationFrame(function animate(time) {
        let step = (time - start) / duration;
        if (step > 1) {
            step = 1
        }
        draw(step)
        if (step < 1) {
            requestAnimationFrame(animate)
        } else {
            removeElement.remove()
            flag = true
        }
    })
}

initial()
setInterval(() => {
    nextCarusel()
}, 4000)

const widthOffset = document.querySelector('.carousel__item').clientWidth
