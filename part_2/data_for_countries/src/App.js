import { useEffect, useState } from "react";
import axios from "axios";
import CountriesData from "./CountriesData";

const App = () => {
  const [data, setData] = useState([]);
  const [inputCountry, setInputCountry] = useState("");
  const [filterCountries, setFilterCountries] = useState("");

  const handleInputCountry = (event) => {
    setInputCountry(event.target.value);
    const allCountries = data.map((country) => country);
    setFilterCountries(
      allCountries.filter((country) =>
        country.name.common.includes(event.target.value)
      )
    );
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div className="App">
      Find Countries
      <input value={inputCountry} onChange={handleInputCountry} />
      {filterCountries.length >= 10 ? (
        <p>Too many results, please narrow your search</p>
      ) : (
        <CountriesData filterCountries={filterCountries} />
      )}
    </div>
  );
};

export default App;
