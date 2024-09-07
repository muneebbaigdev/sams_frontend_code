import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const ChartComponent = ({ chartId, chartData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Strength", "Present", "Absent", "Leave", "Late"],
        datasets: [{
          label: chartData.label,
          data: chartData.data,
          backgroundColor: [
            '#ec407a',
            '#00a40e',
            'red',
            '#00acc1',
            'orange'
          ],
          borderColor: [
            '#ec407a',
            '#00a40e',
            'red',
            '#00acc1',
            'orange'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }
    });
  }, [chartData]);

  return <canvas id={chartId} ref={chartRef} />;
};

export default ChartComponent;
