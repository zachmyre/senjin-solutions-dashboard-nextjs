export interface CardContainer {
  className: string;
  props?: any;
}

export interface WeatherCard extends CardContainer {
  weather: any;
}
