import {useState, useEffect} from 'react'
import axios from "axios"
import './App.css';


const Form = ({value, handler}) => {
  return (
    <p>find countries: <input value={value} onChange={handler}/></p>
  )
}

const Button = ({text, country, showInfo}) => <button type="submit" onClick={()=>showInfo(country)}>{text}</button>


const Country = ({value, showInfo}) => {
  return (
    <p>{value.name.common} <Button text="show" country={value} showInfo={showInfo}/></p>
  );
};

const Countries = ({ countries, showInfo }) => {
  return countries.map((country) => <Country key={country.name.common} value={country} showInfo={showInfo}/> );
}


const CountryDetails = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
  const icon = 'https://openweathermap.org/img/wn/'
  const [weather, setWeather] = useState({temp: ''})
  if (country.name === '') {
    return null
  } else {
    axios
    .get(`${weatherUrl}${country.capital}&appid=${api_key}`)
    .then((response) => {
      setWeather({temp: response.data.main.temp, wind: response.data.wind.speed, icon: response.data.weather[0].icon})
    })
    .catch((error) => console.log(error))
    return (
      <>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <>Languages: {Object.values(country.languages).join(", ").toLowerCase()}</>
        <p><img src={country.flag}/></p>
        <h2>Weather in {country.capital}</h2>
<p>Temperature: {Math.floor(weather.temp - 273.15)} Celcius</p>
<img src={`${icon}${weather.icon}@2x.png`}/>
<p>Wind: {weather.wind} m/s</p>
      </>
    )
  }
  
}

const Notification = ({message}) => <p>{message}</p>

function App() {

  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState(null)
  const [countryInfo, setCountryInfo] = useState({name: ''});

  const showInfo = (country) => {
    setCountryInfo({name: country.name.common, capital: country.capital, area: country.area, languages: country.languages, flag: country.flags.png});
    setCountries([])
    setMessage(null)
}

  const filterCountries = (response) => {
    const countryList = input === ""
    ?  []
    : response.data.filter((country) => {
      return country.name.common.toLowerCase().includes(input.toLowerCase())
    })
    if (countryList.length > 10) {
      setMessage('Too many matches, specify another filter')
      setCountries([])
      setCountryInfo({name: ''})
    } else if (countryList.length !== 1) {
      setMessage(null)
      setCountries(countryList)
      setCountryInfo({name: ''})
    } else {
      setCountries([])
      const country = countryList[0]
      setCountryInfo({name: country.name.common, capital: country.capital, area: country.area, languages: country.languages, flag: country.flags.png});
    }
  }

  const baseUrl = "https://restcountries.com/v3.1/all"

  useEffect(() => {
      axios
      .get(baseUrl)
      .then((response) => {
      filterCountries(response)
      })
  
  }, [input])

  const onChangeHandler = (event) => {
    setInput(event.target.value)
  }



  return (
    <div className="App">
      <Form value={input} handler={onChangeHandler}/>
      <Notification message={message} />
      <Countries countries={countries} showInfo={showInfo}/>
      <CountryDetails country={countryInfo} />
    </div>
  );
}

export default App;
