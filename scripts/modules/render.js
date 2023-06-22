import { calcDewPoint, convertPressure, getCurrentDateTime, getForecastData, getWindDirection } from "./utils.js";

export const renderWidgetToday = (widget, data) => {
    const currentDateTime = getCurrentDateTime();

    //console.log(`rWT_data: ${data.city.name}`);   // ok
    //console.log(`rWT_data: ${data.list[0].weather[0].icon}`); // ok

    widget.insertAdjacentHTML(
        'beforeend',
        `
        <div class="widget__today">
            <div class="widget__date-block">
            <p class="widget__date">${currentDateTime.dayOfMonth} ${currentDateTime.month} ${currentDateTime.year}</p>
            <p class="widget__time">${currentDateTime.hours}:${currentDateTime.minutes}</p>
            <p class="widget__day">${currentDateTime.dayOfWeek}</p>
            </div>
            <div class="widget__icon">
            <img class="widget__img" src="./icon/${data.list[0].weather[0].icon}.svg" alt="Погода">
            </div>
            <div class="widget__wheather">
            <div class="widget__city">
                <p>${data.city.name}</p>
                <button class="widget__change-city" aria-label="Изменить город"></button>
            </div>
            <p class="widget__temp-big">${(data.list[0].main.temp - 273.15).toFixed(2)} °C</p>
            <p class="widget__felt">ощущается</p>
            <p class="widget__temp-small">${(data.list[0].main.feels_like - 273.15).toFixed(2)} °C</p>
            </div>
        </div>
        `
    );
}

export const renderWidgetOther = (widget, data) => {
    widget.insertAdjacentHTML(
        'beforeend',
        `
            <div class="widget__other">
            <div class="widget__wind">
            <p class="widget__wind-title">Ветер</p>
            <p class="widget__wind-speed">${data.list[0].wind.speed} м/с</p>
            <p class="widget__wind-text">${getWindDirection(data.list[0].wind.deg)}</p>    
            </div>
            <div class="widget__humidity">
            <p class="widget__humidity-title">Влажность</p>
            <p class="widget__humidity-value">${data.list[0].main.humidity}%</p>
            <p class="widget__humidity-text">Т.Р: ${calcDewPoint(data.list[0].main.temp, data.list[0].main.humidity)} °C</p>
            </div>
            <div class="widget__pressure">
            <p class="widget__pressure-title">Давление</p>
            <p class="widget__pressure-value">${convertPressure(data.list[0].main.pressure)}</p>
            <p class="widget__pressure-text">мм рт.ст.</p>
            </div>
        </div>
        `
        )
}

export const renderWidgetForecast = (widget, data) => {
    const widgetForecast = document.createElement('ul');
    widgetForecast.className = 'widget__forecast';
    widget.append(widgetForecast);

    const forecastData = getForecastData(data);

    const items = forecastData.map((item) => {
        const widgetDayTime = document.createElement('li');
        widgetDayTime.className = 'widget__day-item';

        widgetDayTime.insertAdjacentHTML('beforeend',
        `
            <p class="widget__day-text">${item.dayOfWeek}</p>
            <img class="widget__day-img" src="./icon/${item.icon}.svg" alt="Погода">
            <p class="widget__day-temp">${item.maxTemp}°/${item.minTemp}°</p>
        `);

        return widgetDayTime;
    });

    widgetForecast.append(...items);       
}

export const showError = (widget, error) => {
    widget.textContent = error.toString();
}