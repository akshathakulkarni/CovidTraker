import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

class App extends React.Component {
  //define state object to pass down data to other components
  state = {
    data: {}, //initial state
    country: ''
  }
  async componentDidMount() {
    //fetch the data from api
    const fetchedData = await fetchData();
    //set the state with fetchedData setState({data: fetchedData})
    this.setState({data: fetchedData});
  }

  handleCountryChange = async (country) => {
    console.log(country);
    //fetch the country
    const fetchedcountryData = await fetchData(country);
    console.log(fetchedcountryData);
    //set the state with received country name
    this.setState({ data: fetchedcountryData, country: country });

  }

  render() {
    const { data } = this.state;
    return (
      <div className={styles.container}>
        <h1>Covid Traker</h1>
        <Cards data={data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart />
        
      </div>
    );
  } 
}

export default App;