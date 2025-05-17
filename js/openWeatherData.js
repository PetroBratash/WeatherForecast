import {Forecast} from './forecast.js';

const dataCities = {
    cities: [
        703448,
        2643743,
        5128638,
    ]
}
// toggle event
let unit = 'metric'
let forecastListView;

const toggleButton = document.getElementById('toggle-button');
toggleButton.addEventListener('change', () => {
    unit = toggleButton.checked ? 'imperial' : 'metric';
    console.log(unit);
    refreshForecasts()
})

class DataService {
    #baseUrl = 'https://api.openweathermap.org/data/2.5/';
    #appId = 'aa30222d1e6315a79fdb74174663269d';

    get #unit() {
        return unit;
    }

    async getWeatherForecast(citiId) {
        const url = `${this.#baseUrl}weather?id=${citiId}&appid=${this.#appId}&units=${this.#unit}`
        const response = await fetch(url)

        if (response.ok) {
            return await response.json()
        } else {
            console.warn(`[Error] Something wrong getting weather for city with id ${citiId}`)
            return null
        }
    }
}

const dataService = new DataService()

// Refresh forecasts when the unit changes
const refreshForecasts = () => {
    if (forecastListView) {
        forecastListView.clearForecasts();
        dataCities.cities.forEach(async (cityId) => {
            const forecast = await dataService.getWeatherForecast(cityId);
            if (forecast) {
                const currentForecast = new Forecast(forecast);
                forecastListView.showForecast(currentForecast);
            }
        })
    }
}

// Set up the forecastListView reference
const setForecastListView = (view) => {
    forecastListView = view;
}

export {dataService, dataCities, setForecastListView}