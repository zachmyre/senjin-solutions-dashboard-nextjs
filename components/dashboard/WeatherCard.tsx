import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { WeatherCard } from "../../types/Cards";

const WeatherCard = ({ className, weather }: WeatherCard) => {
  const weatherMap = {
    location: weather.location.name,
    condition: weather.current.condition.text,
    conditionIconUrl: weather.current.condition.icon,
    time: new Date(weather.location.localtime).toLocaleString(),
    temp: weather.current.temp_f,
    feelsLike: weather.current.feelslike_f,
    humidity: weather.current.humidity,
  };
  console.log(weather);
  return (
    <Card
      className={`${className} p-6 pb-0`}
      style={{
        backgroundImage: `url("${weatherMap.conditionIconUrl}")`,
        backgroundPosition: "right",
        backgroundSize: "35%",
        backgroundRepeat: "no-repeat",
        imageRendering: "crisp-edges",
      }}
    >
      <CardContent className="space-y-4 p-0 m-0">
        <div className="space-y-2">
          <p className="text-sm">{weatherMap.time}</p>
          <p className="text-2xl">{weatherMap.location}</p>
          <p className="text-6xl">
            {weatherMap.temp}
            <small>°F</small>
          </p>
        </div>
        <div className="flex items-end justify-between w-full">
          <p className="text-lg mt-2 mb-0 w-1/2 text-left">
            Feels like {weatherMap.feelsLike}
            <small>°F</small>
          </p>
          <p className="text-lg mt-2 mb-0 w-1/2 text-right">
            {weatherMap.condition}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
