import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import { ArrowUp } from 'lucide-react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart: React.FC = () => {
    const data = {
        labels: ['JAN', 'FEB', 'MAR', 'APR'],
        datasets: [
            {
                label: 'Profit',
                data: [12000, 15000, 20000, 18000],
                backgroundColor: 'rgb(74 222 128)',
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {

                    font: {
                        size: 14, // Change font size
                        weight: 'bold', // Change font weight
                    },
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
                ticks: {
                    display: false, // Hide y-axis labels
                },

            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="p-4 bg-white shadow rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <div >
                    <h2 className="text-medium font-medium">Revenue increase</h2>
                    <p className="text-lg font-bold">$47,927</p>
                </div>
                <div className="flex items-center space-x-2 text-green-500 bg-green-100 rounded p-1">
                    <ArrowUp className="w-6 h-6" />
                    <span className="font-bold">62%</span>
                </div>
            </div>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
