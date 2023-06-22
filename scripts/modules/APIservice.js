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
    catch (err) 
    {
        return { success: false, err};
    }
}