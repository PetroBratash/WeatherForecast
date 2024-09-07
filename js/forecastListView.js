import { getElem } from "./helepers.js"

export class ForecastListView {
    #forecastTableBody
    constructor(tableBodyId) {
        this.#forecastTableBody = getElem(tableBodyId)
    }

    showForecast(item) {
        this.#forecastTableBody.append(item.createElement())
    }
}