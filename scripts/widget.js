//import { fetchWeatherAPI } from "./modules/APIservice.js";
import { startWidget } from "./modules/widgetService.js";

const init = async (app) => {
    const widget = await startWidget();

    app.append(widget);

    //fetchWeatherAPI('Калининград');

}

init(document.querySelector('#app'));