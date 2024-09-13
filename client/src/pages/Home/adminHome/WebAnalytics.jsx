/* eslint-disable no-unused-vars */
import  { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the necessary components from Chart.js
Chart.register(...registerables);

export const WebAnalyticsDashboard = () => {
  const [visitors, setVisitors] = useState(25738);
  const [pageViews, setPageViews] = useState(93454);
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [lineChartData, setLineChartData] = useState({
    labels: [], // Labels for the x-axis
    datasets: [{
      label: 'Visitors Over Time',
      data: [], // Data points for the chart
      borderColor: '#4a90e2',
      backgroundColor: 'rgba(74, 144, 226, 0.2)',
      fill: true,
    }]
  });

  // Function to generate mock data for the chart
  const generateMockData = (range) => {
    const labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
    const data = labels.map(() => Math.floor(Math.random() * 1000) + 100);
    return { labels, datasets: [{ ...lineChartData.datasets[0], data }] };
  };

  useEffect(() => {
    // Update chart data based on date range
    const newData = generateMockData(dateRange);
    setLineChartData(newData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  return (
    <div className="web-analytics-dashboard p-6 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-4">Web Analytics Dashboard</h1>
      <p className="text-gray-400 mb-6">E Commerce Website | Online | Production</p>
      <div className="metrics grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
          <h2 className="text-lg font-semibold mb-2">Visitors</h2>
          <p className="text-3xl font-bold">{visitors}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
          <h2 className="text-lg font-semibold mb-2">Page Views</h2>
          <p className="text-3xl font-bold">{pageViews}</p>
        </div>
      </div>
      <div className="chart-container bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Visitors Over Time ({dateRange})</h2>
        <Line data={lineChartData} options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += `${context.parsed.y}`;
                  }
                  return label;
                }
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: '#fff'
              },
              grid: {
                color: '#333'
              }
            },
            y: {
              ticks: {
                color: '#fff'
              },
              grid: {
                color: '#333'
              }
            }
          }
        }} />
      </div>
      <div className="date-range-selector mb-6">
        <select
          className="p-2 rounded-lg bg-gray-800 text-white"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last 30 Days">Last 30 Days</option>
          <option value="Last 90 Days">Last 90 Days</option>
        </select>
      </div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 text-white p-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
      >
        Explore Web Analytics
      </a>
    </div>
  );
};

