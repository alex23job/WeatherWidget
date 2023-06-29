const API_KEY = '680d20e76d4c40faed2c6b1c4ca897bb';
const API_URL = 'https://api.openweathermap.org/data/2.5/';

export const fetchWeatherAPI = async (city) => {
    try
    {
        const response = await fetch(`${API_URL}forecast?q=${city}&appid=${API_KEY}&lang=ru`);

        const data = await response.json();

        //console.log(`data = `, data);

        return { success: true, data};
    }
    catch (error) 
    {
        return { success: false, error};
    }
}

export const fetchForecastAPI = async (city) => {
    try
    {
        const response = await fetch(`${API_URL}forecast?q=${city}&appid=${API_KEY}&lang=ru`);

        const data = await response.json();

        //console.log(`data = `, data);

        return { success: true, data };
    }
    catch (error) 
    {
        return { success: false, error };
    }
}

export const getCity = async () => {
    const url = 'https://ipapi.co/city/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Ошибка получения города');
        }

        const cityData = await response.text();
        console.log('CityData : ', cityData);

        return {succes: true, cityData };
    } catch (error) {
        console.error(error);
        return { succes: false, error };
    }
}