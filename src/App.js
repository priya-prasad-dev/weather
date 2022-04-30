import React from 'react';
import Forecast from './component/forecast';
import Form from './component/form';
import Heading from './component/heading';

const api_key = "0eff8d7a963ffeb99b664d67b56212e4";

class App extends React.Component {
   state = {
    temperature: "",
    city: "",
    country: "",
    humidity: "",
    pressure: "",
    icon: "",
    description: "",
    error: ""
  }
  getWeather = async (e) => {
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperical&appid=${api_key}`);

    const response = await api_call.json();
    console.log(response);
    if (city && country) {
      this.setState({
        temperature: response.main.temp,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        pressure: response.main.pressure,
        icon: response.weather[0].icon,
        description: response.weather[0].description,
        error: ""
      })
    }
    else {
      this.setState({
        error: "Please fill out input fields..."
      })
    }
  }
  render() {
    return (
      <div>

        <Heading />
        <Form loadWeather={this.getWeather} />
        <Forecast
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          pressure={this.state.pressure}
          icon={this.state.icon}
          description={this.state.description}
          error={this.state.error}/>
      </div>
    )
  }

}

export default App;
