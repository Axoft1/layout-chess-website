let carousel = document.querySelector('.carousel')
let buttonLeft = document.querySelector('.participants__button_left')
let buttonRight = document.querySelector('.participants__button_right')
let participantsAll = document.querySelector('.participants__all')
let participantsVisible = document.querySelector('.participants__visible')

let participants = [
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

const nextSlider = () => {
    participantsVisible.innerHTML = active +1
    if (!flag) return
    flag = !flag
    active = valid(active + 1)
    animate({
        duration: 500,
        draw: function (progress) {
            document.querySelector('.carousel__item').style.opacity = 0
        },
        removeElement: document.querySelector('.carousel__item')
    })
    nextCreateElement()
}
const prevSlider = () => {
    if (!flag) return
    flag = !flag
    active = valid(active - 1)
    participantsVisible.innerHTML = active ===0? 6: active
    animate({
        duration: 500,
        draw: function (progress) {
            document.querySelector('.carousel__item:last-child').style.opacity = 0
        },
        removeElement: document.querySelector('.carousel__item:last-child')
    })
    prevCreateElement()
}

buttonRight.addEventListener('click', nextSlider)
buttonLeft.addEventListener('click', prevSlider)

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
    // nextSlider()
}, 4000)

const widthOffset = document.querySelector('.carousel__item').clientWidth
