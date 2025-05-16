const dataCities = {
    cities: [
        703448,
        2643743,
        5128638,
    ]
}
// toggle event

// let unit = document.getElementById('toggle-button2').checked ? 'imperial' : 'metric'


class DataService {
    #baseUrl = 'https://api.openweathermap.org/data/2.5/';
    #appId = 'aa30222d1e6315a79fdb74174663269d'
    #unit = 'metric'

    // #unit = unit

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

export {dataService, dataCities}