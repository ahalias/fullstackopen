import {useState, useEffect} from 'react'
import axios from "axios"
import './App.css';


const Form = ({value, handler}) => {
  return (
    <p>find countries: <input value={value} onChange={handler}/></p>
  )
}

const Countries = ({ countries }) => {
  return countries.map((country) => <Country key={country.name.common} value={country.name.common}/>);
}


const Language = ({ language }) => (
  <p>{language}</p>
)

const CountryDetails = ({ country }) => {
  if (country.name === '') {
    return null
  } else {
    return (
      <>
        <p><b>{country.name}</b></p>
        <p>capital: {country.capital}</p>
        <p>area: {country.area}</p>
        <p>languages: {Object.values(country.languages).map((language) => (
          <Language key={language} language={language} />
        ))}</p>
        <p><img src={country.flag}/></p>
      </>
    )
  }
  
}

const Notification = ({message}) => <p>{message}</p>

const Country = ({value}) => {
  return (
    <p>{value}</p>
  );
};

function App() {

  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState(null)
  const [countryInfo, setCountryInfo] = useState({name: ''});

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
    } else if (countryList.length != 1) {
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
      <Countries countries={countries}/>
      <CountryDetails country={countryInfo} />
    </div>
  );
}

export default App;
