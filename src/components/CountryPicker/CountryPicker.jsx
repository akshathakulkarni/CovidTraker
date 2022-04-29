import React, {useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';

const CountryPicker = ({ handleCountryChange }) => {
  const [ fetchedCountries, setFetchedCountries ] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    };
    fetchAPI();
  }, [setFetchedCountries]);

  return (
    <FormControl className={styles.formControl}>
      {/* Add an onChange handler and pass down the name of the country using target value to handleCountryChange function */}
      <NativeSelect defaultValue='' onChange={(event) => handleCountryChange(event.target.value)}>
        <option value='global'>Global</option>
        {fetchedCountries.map((country, index) => <option key={index} value={country}>{country}</option> )}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;