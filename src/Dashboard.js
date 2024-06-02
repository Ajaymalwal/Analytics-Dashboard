import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the JSON data
    fetch('./fixed-eve.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const processData = (data) => {
    const timestamps = data.map(d => new Date(d.timestamp));
    const severityCounts = data.reduce((acc, cur) => {
      const severity = cur.alert?.severity || 'unknown';
      acc[severity] = (acc[severity] || 0) + 1;
      return acc;
    }, {});

    return { timestamps, severityCounts };
  };

  const { timestamps, severityCounts } = processData(data);

  return (
    <div className="dashboard">
      <div className="plot-container">
        <Plot
          data={[
            {
              x: timestamps,
              type: 'histogram',
              marker: {
                color: '#4CB140'
              }
            },
          ]}
          layout={{ 
            title: 'Number of Alerts Over Time',
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { color: '#fff' },
            xaxis: {
              title: 'Time',
              titlefont: {
                size: 14,
                color: '#fff'
              }
            },
            yaxis: {
              title: 'Count',
              titlefont: {
                size: 14,
                color: '#fff'
              }
            },
            autosize: true,
            responsive: true
          }}
          useResizeHandler={true}
          style={{ width: '100%', height: '100%' }}
          className="plotly"
        />
      </div>
      <div className="plot-container">
        <Plot
          data={[
            {
              x: Object.keys(severityCounts),
              y: Object.values(severityCounts),
              type: 'bar',
              marker: {
                color: '#8481DD'
              }
            },
          ]}
          layout={{ 
            title: 'Alert Severity Distribution',
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { color: '#fff' },
            xaxis: {
              title: 'Severity',
              titlefont: {
                size: 14,
                color: '#fff'
              }
            },
            yaxis: {
              title: 'Count',
              titlefont: {
                size: 14,
                color: '#fff'
              }
            },
            autosize: true,
            responsive: true
          }}
          useResizeHandler={true}
          style={{ width: '100%', height: '100%' }}
          className="plotly"
        />
      </div>
    </div>
  );
};

export default Dashboard;
