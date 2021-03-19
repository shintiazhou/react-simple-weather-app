import './App.css';
import React, { useState } from "react"

function App() {
  const [query, setQuery] = useState("")
  const [weather, setWeather] = useState("")

  const api = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: "084716664087ee465d49b291058b597e"
  }

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
        .then(res => res.json())
        .then(res => {
          setWeather(res)
          setQuery("")
        })
    }
  }

  const getDate = d => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]
    let month = months[d.getMonth()]
    let date = d.getDate()
    let year = d.getFullYear()

    return `${day}, ${date} ${month} ${year}`
  }

  return (
    <div className="App">
      <div className={weather.main ? (
        (weather.weather[0].icon.slice(2, 3) === "d") ? "container day" : "container night"
      ) : "container"}>
        <div className="search-box">
          <input
            type="search"
            placeholder="search..."
            onKeyPress={search}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        {weather.main ?
          <main>
            <div className="city">{weather.name}</div>
            <div className="date">{getDate(new Date())}</div>
            <div className="icon">
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            </div>
            <div class="description">
              {weather.weather[0].description}
            </div>
            <div class="temperature">{Math.floor(weather.main.temp - 273.15)}&#8451;</div>
          </main>
          :
          (weather.cod === "404" ?
            <div className="message">{weather.message} </div>
            :
            <div className="message">
              Get current weather from different cities
      </div>)
        }
      </div>
    </div>
  );
}

export default App;
