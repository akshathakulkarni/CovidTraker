import React, {useState, useEffect} from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

import styles from './Chart.module.css';

//register all components before use
Chart.register(...registerables);

const Charts = () => {
  const [ dailyData, setDailyData ] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    console.log(dailyData);
    fetchAPI();
  }, []);

  const lineChart = (
    dailyData.length 
    ? (
      <Line 
      data={{
        // loop over dailyData and return date as labels
        labels: dailyData.map(({ date }) => date),
        datasets: [{
          label: 'Infected',
          data: dailyData.map(({ confirmed }) => confirmed),
          borderColor: '#3333ff',
          fill: true
        }, {
          label: 'Deaths',
          data: dailyData.map(({ deaths }) => deaths),
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0, 0.5)',
          fill: true
        }]
      }}
    />
    ) : null

  );

  return (
    <div className={styles.container}>
      {lineChart}
    </div>
  );
};

export default Charts;