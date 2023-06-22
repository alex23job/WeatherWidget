import { fetchForecastAPI, fetchWeatherAPI } from "./APIservice.js";
import { renderWidgetForecast, renderWidgetOther, renderWidgetToday, showError } from "./render.js";

export const startWidget = async () => {
    const city = 'Темрюк';
    const widget = document.createElement('div');
    widget.classList.add('widget');

    const dataWeather = await fetchWeatherAPI(city);
    console.log('dataWeather: ', dataWeather);

    if (dataWeather.success) {
        renderWidgetToday(widget, dataWeather.data);
        renderWidgetOther(widget, dataWeather.data);
    }
    else showError(widget, dataWeather.error);

    const dataForecast = await fetchForecastAPI(city);
    console.log('dataForecast: ', dataForecast);

    if (dataForecast.success) {
        renderWidgetForecast(widget, dataForecast.data);
    }
    else showError(widget, dataForecast.error);
    

    return widget;
} 