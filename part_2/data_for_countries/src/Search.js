let Search = (data, inputCountry) => {
  let filteredCountries = data.filter(
    (country) =>
      country.name.common.toLowerCase().includes(inputCountry.toLowerCase()) ===
      true
  );
  return filteredCountries;
};

export default Search;
