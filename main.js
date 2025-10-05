const burgerIcon = document.getElementById('burger-icon')
const burgerMenu = document.getElementById('burger-menu')
const burgerLine1 = document.getElementById('line1')
const burgerLine2 = document.getElementById('line2')
const burgerLine3 = document.getElementById('line3')

burgerIcon.addEventListener('click', () => {
    console.log('icon')
    burgerMenu.classList.toggle('hidden');

    const isMenuHidden = burgerMenu.classList.contains('hidden')

    if (!isMenuHidden) {
        burgerLine2.style.opacity = 0
        burgerLine1.style.transform = 'rotate(45deg) translate(10px, 3px)'
        burgerLine3.style.transform = 'rotate(-45deg) translate(10px, -3px)'
    }
    else {
        burgerLine2.style.opacity = '100%'
        burgerLine1.style.transform = 'initial'
        burgerLine3.style.transform = 'initial'
    }
})

const leftMonthYearEl = document.getElementById('left-month-year')
const rightMonthYearEl = document.getElementById('right-month-year')
const prevMonthBtn = document.getElementById('prev-month-btn')
const nextMonthBtn = document.getElementById('next-month-btn')
const currMonthDatesEl = document.getElementById('curr-month-dates')
const nextMonthDatesEl = document.getElementById('next-month-dates')

class Calendar {
    #currentDate = new Date()
    #nextDate = new Date()
    #leftMonthYearEl
    #rightMonthYearEl
    #prevMonthBtn
    #nextMonthBtn
    #currMonthDatesEl
    #nextMonthDatesEl

    constructor(leftMonthYearEl, rightMonthYearEl, prevMonthBtn, nextMonthBtn, currMonthDatesEl, nextMonthDatesEl) {
        this.#leftMonthYearEl = leftMonthYearEl
        this.#rightMonthYearEl = rightMonthYearEl
        this.#prevMonthBtn = prevMonthBtn
        this.#nextMonthBtn = nextMonthBtn
        this.#currMonthDatesEl = currMonthDatesEl
        this.#nextMonthDatesEl = nextMonthDatesEl
    }

    init() {
        this.#nextDate.setMonth(this.#currentDate.getMonth() + 1)
        this.#render()

        this.#prevMonthBtn.addEventListener('click', function () {
           
            this.#goPrevMonth()
            this.#render()
        }.bind(this))
        this.#nextMonthBtn.addEventListener('click', function () {
           
            this.#goNextMonth()
            this.#render()
        }.bind(this))
    }

    #goPrevMonth() {
        this.#currentDate.setMonth(this.#currentDate.getMonth() - 1) 
        this.#nextDate.setMonth(this.#nextDate.getMonth() - 1) 
    }

    #goNextMonth() {
        this.#currentDate.setMonth(this.#currentDate.getMonth() + 1)
        this.#nextDate.setMonth(this.#nextDate.getMonth() + 1)
    }

    #getMonthMatrix(dateObj) {
    const year = dateObj.getFullYear() 
    const month = dateObj.getMonth() 
    const daysInMonth = new Date(year, month + 1, 0).getDate() 
    const firstDay = new Date(year, month, 1)
    const firstDayWeekIndex = (firstDay.getDay() + 6) % 7

    const matrix = []
    
    const firstWeek = new Array(7).fill(null) 
    let dayCounter = 1

    for (let i = firstDayWeekIndex; i < 7; i++) { 
        firstWeek[i] = dayCounter
        dayCounter++
    }
    
    matrix.push(firstWeek)

    while (dayCounter <= daysInMonth) { 
        const newWeek = new Array(7).fill(null)
        for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) { 
            newWeek[i] = dayCounter
            dayCounter++
        }

        matrix.push(newWeek)
    }

    return matrix
}

    #render() {
        this.#leftMonthYearEl.innerText = this.#currentDate.toLocaleString('en', { month: 'long', year: 'numeric' })
        this.#rightMonthYearEl.innerText = this.#nextDate.toLocaleString('en', { month: 'long', year: 'numeric' })

        const currentMonthMatrix = this.#getMonthMatrix(this.#currentDate) 
        const nextMonthMatrix = this.#getMonthMatrix(this.#nextDate) 

        this.#currMonthDatesEl.innerHTML = ''
        this.#nextMonthDatesEl.innerHTML = ''

        currentMonthMatrix.forEach((week) => {
            week.forEach((day) => {
                if (!day) {
                    this.#currMonthDatesEl.innerHTML += `<span class="empty"></span>`
                }
                else {
                    this.#currMonthDatesEl.innerHTML += `<button class="date">${day}</button>`
                }
            })
        })

        nextMonthMatrix.forEach((week) => {
            week.forEach((day) => {
                if (!day) {
                    this.#nextMonthDatesEl.innerHTML += `<span class="empty"></span>`
                }
                else {
                    this.#nextMonthDatesEl.innerHTML += `<button class="date">${day}</button>`
                }
            })
        })
    }
}

const calendar = new Calendar(leftMonthYearEl, rightMonthYearEl, prevMonthBtn, nextMonthBtn, currMonthDatesEl, nextMonthDatesEl)
calendar.init()


const departInput = document.getElementById('depart')
const returnInput = document.getElementById('return')
const calendarEl = document.querySelector('.calendar')

departInput.onclick = (click) => {
    click.stopPropagation()
    calendarEl.classList.add('active')
}

returnInput.onclick = (click) => {
    click.stopPropagation()
    calendarEl.classList.add('active')
}

document.onclick = () => calendarEl.classList.remove('active')

calendarEl.onclick = (click) => click.stopPropagation()

