import { useEffect, useState } from "react";
import axios from "axios";
import CountriesData from "./CountriesData";
import Search from "./Search";

const App = () => {
  const [data, setData] = useState([]);
  const [inputCountry, setInputCountry] = useState("");

  const handleInputCountry = (event) => {
    setInputCountry(event.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setData(response.data);
    });
  }, []);

  const filteredCountries =
    inputCountry === "" ? [] : Search(data, inputCountry);

  return (
    <div className="App">
      Find Countries:
      <input value={inputCountry} onChange={handleInputCountry} />
      <CountriesData filteredCountries={filteredCountries} />
    </div>
  );
};

export default App;
