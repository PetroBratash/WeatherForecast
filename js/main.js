import {ForecastListView} from './forecastListView.js'
import {Forecast} from './forecast.js'
import {dataService, dataCities, setForecastListView} from './openWeatherData.js'

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded')

    const forecastListView = new ForecastListView('#tableBody')

    // Set the forecastListView reference for unit toggle refreshing
    setForecastListView(forecastListView)

    dataCities.cities.forEach(async (cityId) => {
        const forecast = await dataService.getWeatherForecast(cityId)
        console.log(forecast)
        const currentForecast = new Forecast(forecast)

        forecastListView.showForecast(currentForecast)
    })
})