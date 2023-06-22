export const getCurrentDateTime = () => {
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн',
        'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const weekdays = ['воскресенье', 'понедельник', 'вторник',
        'среда', 'четверг', 'пятница', 'суббота',
    ];

    const date = new Date();
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const dayOfWeek = weekdays[date.getDay()];

    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;

    return { dayOfMonth, month, year, dayOfWeek, hours, minutes};
}

export const getWindDirection = (deg) => {
    const direction = ['&#8595', '&#8601','&#8592','&#8598','&#8593','&#8599','&#8594','&#8600'];

    const i = Math.round((deg + 22) / 45) % 8;

    return direction[i];
}

export const calcDewPoint = (temp, humidity) => {
    const a = 17.27;
    const b = 237.7;
    const t = temp - 273.15;
    const ft = (a * t) / (b + t) + Math.log(humidity / 100);
    const dewPoint = (b * ft) / (a - ft);
    return dewPoint.toFixed(1);
}

export const convertPressure = (pressure) => {
    return (0.75 * pressure).toFixed(2);
}

export const getForecastData = (data) => {
    const curDate = new Date();
    const myData = data.list.filter((item) => 
    {
        const dt = new Date(item.dt_txt);
        return dt.getDate() > curDate.getDate() && (dt.getHours() === 12 || dt.getHours() === 3);
    });

    let maxTemp = 20;
    let minTemp = 10;
    const weekDaysShort = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    const myWeathers = myData.map((item) => {
        const dt = new Date(item.dt_txt);

        if (dt.getHours() === 3) minTemp = (item.main.temp - 273.15).toFixed(1);
        if (dt.getHours() === 12) {
            const dayOfWeek = weekDaysShort[dt.getDay()];
            const icon = item.weather[0].icon;
            maxTemp = (item.main.temp - 273.15).toFixed(1);
            return {dayOfWeek, icon, minTemp, maxTemp};
        }
    });

    //console.log('myWeathers : ', myWeathers);

    const weather5 = myWeathers.filter((item) => item);
    return weather5;
}