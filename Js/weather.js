const apiKey = '8f25ed2b16174c8984b175855230106'
const endPoint = inputValue => {
    return `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${inputValue}`
}

const getWeatherData = async inputValue => {
    try {
        const response = await fetch(endPoint(inputValue))

        if(response.ok) {
            const data =  await response.json()
            return data
        }

    }catch(error) {
        console.log(error)
    }
}








// Temperatura nas próximas horas do dia: data.forecast.forecastday[0].hour[0].temp_c

/*

O que exibir na tela:

Temperatura
Chuva
Dia ou noite
Velocidade do vento: data.forecast.forecastday.forEach(day => day.day.maxwind_kph)
Temperatura nos próximos 5 dias
Temperatura e chuva nas próximas horas do dia

*/