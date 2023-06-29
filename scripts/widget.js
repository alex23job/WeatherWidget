//import { fetchWeatherAPI } from "./modules/APIservice.js";
import { cityServiceSearch } from "./modules/cityServiceSearch.js";
import { startWidget } from "./modules/widgetService.js";

const init = async (app) => {
    //const city = 'Темрюк';
    const widget = await startWidget();

    app.append(widget);

    //fetchWeatherAPI('Калининград');
    cityServiceSearch(widget);

}

init(document.querySelector('#app'));