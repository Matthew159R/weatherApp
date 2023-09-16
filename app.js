const form = document.querySelector('form')
const weather = document.querySelector('.weather')
const hours = document.querySelectorAll('.hour')
const weatherForecasts = document.querySelectorAll('.weather-forecast')
const weatherCards = document.querySelectorAll('.weather-card')
const conditionTag = document.querySelector('.condition')
const iconConditionTag = document.querySelector('.icon-condition')
const windSpeedTag = document.querySelector('.wind-speed')
const conditionImgForecastTags = document.querySelectorAll('.condition-img-forecast')
const countryTag = document.querySelector('.country')
const stateTag = document.querySelector('.state')
const cityTag = document.querySelector('.city')
const windImg = document.querySelector('wind-img')
const container = document.querySelector('.container')
const isDayText = document.querySelector('.is-day-text')
const isDayIcon = document.querySelector('.is-day-img')


form.addEventListener('submit', event => {
    event.preventDefault()

    const inputValue = event.target.search.value

    console.log(inputValue)
        getWeatherData(inputValue)
            .then(data => {
                console.log(data)
                const temperature = data.current.temp_c
    
                weather.textContent = `${temperature}°C`
    
                const condition = data.current.condition.text

                conditionTag.textContent = condition

                const conditionIcon = data.current.condition.icon

                iconConditionTag.src = conditionIcon

                const windSpeed = data.current.wind_kph

                windSpeedTag.querySelector('p').textContent = `${windSpeed}km/h`

                const isDay = data.current.is_day

                if (isDay === 0) {
                    container.style.backgroundImage = 'url("/imgs/img-night.jpeg")'
                    isDayText.textContent = 'Noite'
                    isDayIcon.src = '/imgs/isDayFalse.png'
                }else {
                    container.style.backgroundImage = 'url("/imgs/img-day.jpeg")'
                    isDayText.textContent = 'Dia'
                    isDayIcon.src = '/imgs/isDayTrue.png'
                }

                const forecastDay = data.forecast.forecastday[0].hour.slice(9, 19)

                weatherCards.forEach(weatherCard => {
                    weatherCard.classList.add('weather-card-animation')
                })
                    
                hours.forEach((hour, index) => {
                    hour.textContent = forecastDay[index].time.slice(11, 16)
                })

                weatherForecasts.forEach((weatherForecast, index) => {
                    weatherForecast.textContent = `${Math.floor(forecastDay[index].temp_c)}°C`
                })

                conditionImgForecastTags.forEach((conditionImgForecastTag, index) => {
                    conditionImgForecastTag.src = forecastDay[index].condition.icon
                })


                const dataAtual = new Date()
                const meses = [
                'janeiro',
                'fevereiro',
                'março',
                'abril',
                'maio',
                'junho',
                'julho',
                'agosto',
                'setembro',
                'outubro',
                'novembro',
                'dezembro'
                ]
                const dia = dataAtual.getDate()
                const mes = meses[dataAtual.getMonth()]
                const ano = dataAtual.getFullYear()

                const hora = ('0' + dataAtual.getHours()).slice(-2)
                const minutos = ('0' + dataAtual.getMinutes()).slice(-2)

                document.querySelector('p').textContent = `${dia} ${mes} ${ano}`
                document.querySelectorAll('p')[1].textContent = `${hora}:${minutos}`

                const country = data.location.country

                countryTag.textContent = country
                
                const cityName = data.location.name

                cityTag.textContent = cityName

                const state = data.location.region

                stateTag.textContent = state

                document.querySelector('.date').style.opacity = '1'

            })
            .catch(error => {
                console.log(error)
            })

})

// Carrossel do background image
/*
const contentLeft = document.querySelector('.content-left')
const imgs = [
    '/imgsCarousel/img1.jpeg',
    '/imgsCarousel/img2.jpeg',
    '/imgsCarousel/img3.jpeg',
    '/imgsCarousel/img4.jpeg',
    '/imgsCarousel/img5.jpeg',
    '/imgsCarousel/img6.jpeg',
    '/imgsCarousel/img6.jpeg',
    '/imgsCarousel/img7.jpeg',
    '/imgsCarousel/img8.jpeg',
    '/imgsCarousel/img9.jpeg',
    '/imgsCarousel/img10.jpeg',
    '/imgsCarousel/img11.jpeg'
]
let currentIndex = 0

const changeBackgroundImage = () => {
    contentLeft.style.animation = 'none'
    contentLeft.offsetWidth
    // O offset força um reflow, pois o navegador precisa ler o elemento de novo para medir sua dimensão
    contentLeft.style.animation = 'content-left-animation 1s'
    if (currentIndex > imgs.length - 1) {
        currentIndex = 0
    }
  container.style.backgroundImage = `url("${imgs[currentIndex]}")`
  currentIndex = (currentIndex + 1) % imgs.length

}

setInterval(changeBackgroundImage, 7000)
*/