export const getWeather = async () => {
  const weatherApiRequest = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=Dallas&days=1&aqi=yes&alerts=yes`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const weather = await weatherApiRequest.json();

  return weather;
};
