// Get DOM elements
const clockEl = document.querySelector("#time")
const greetingEl = document.querySelector("#greeting")
const nameEl = document.querySelector("#name")
const quoteEl = document.querySelector("#quote")

//Add time to DOM
function addTime () {

    function checkTime(n) {
        return (n<10) ? "0" + n : n
       }

    let time = new Date()
    let hoursFull = time.getHours()
    let amOrPm = (hoursFull < 12) ? "AM" : "PM"
    let hours = (hoursFull !== 12) ? hoursFull % 12 : 12
    let minutes = checkTime(time.getMinutes())
    let seconds = checkTime(time.getSeconds())
   

        clockEl.innerHTML = `${hours}:${minutes}:${seconds} ${amOrPm}`
        setTimeout(addTime, 1000);
}


function changeGreeting() {
    let time = new Date()
    let hoursFull = time.getHours()
    
    if(hoursFull < 12) {
        greetingEl.textContent = "Good Morning"
        document.body.style.backgroundImage = "url('img/morning.jpg')";
    } else if (hoursFull < 18) {
        greetingEl.textContent = "Good Afternoon"
        document.body.style.backgroundImage = "url('img/afternoon.jpg')"
    }else {
        greetingEl.textContent = "Good Evening"
        document.body.style.backgroundImage = "url('img/evening.jpg')"
        document.body.style.color = "white"
    }
}

nameEl.addEventListener("keyup", function(e){
    localStorage.setItem("name", e.target.innerText)
})

function getName(){
    if(localStorage.getItem("name") === null){
        nameEl.textContent = "[Your Name]"
    }else {
        nameEl.textContent = localStorage.getItem("name")
    }
}

//Quote 
const getQuote = async() => {
    const response = await fetch("https://quotes.rest/qod?category=inspire")
    if (response.status === 200) {
       const data = await response.json()
       return data
    } else {
        throw new Error("unable to get puzzle")
    }
}

//Display quote
const displayQuote = () => {
    getQuote().then((quote) => {
        quoteEl.textContent = quote.contents.quotes[0].quote
    }).catch ((err) => {
        console.log(err)
    })
}

//Run
addTime()
changeGreeting()
getName()
displayQuote()