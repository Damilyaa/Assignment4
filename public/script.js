let chartInstance = null; 
async function fetchData() {
    const startDate = document.getElementById('start_date').value;
    const endDate = document.getElementById('end_date').value;

    const response = await fetch(`http://localhost:5001/api/measurements?start_date=${startDate}&end_date=${endDate}`);
    const data = await response.json();

    renderChart(data);
    fetchMetrics();
}

async function fetchMetrics() {
    const response = await fetch("http://localhost:5001/api/measurements/metrics?field=field1");
    const metrics = await response.json();

    document.getElementById("metrics").innerHTML = `<h3>Metrics</h3>
        <p>Average: ${metrics.avg.toFixed(2)}</p>
        <p>Min: ${metrics.min}</p>
        <p>Max: ${metrics.max}</p>
        <p>Std Dev: ${metrics.stdDev.toFixed(2)}</p>`;
}

function renderChart(data) {
    const ctx = document.getElementById('dataChart').getContext('2d');

    // Destroy the previous chart instance if it exists
    if (chartInstance) {
        chartInstance.destroy();
    }

    const chartData = {
        labels: data.map(d => new Date(d.timestamp).toLocaleDateString()),
        datasets: [{
            label: "Field 1",
            data: data.map(d => d.field1),
            borderColor: "#ff69b4",
            backgroundColor: "rgba(255, 105, 180, 0.5)", 
            pointBackgroundColor: "#ff1493", 
            pointBorderColor: "#fff", 
            pointBorderWidth: 2,
            pointRadius: 5, 
            fill: true
        }]
    };

    chartInstance = new Chart(ctx, { 
        type: "line",
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: "#ff69b4", 
                    }
                },
                tooltip: {
                    backgroundColor: "#ff69b4",
                    titleColor: "#fff", 
                    bodyColor: "#fff", 
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: "#ff69b4", 
                    },
                    grid: {
                        color: "rgba(255, 105, 180, 0.3)"
                    }
                },
                y: {
                    ticks: {
                        color: "#ff69b4", 
                    },
                    grid: {
                        color: "rgba(255, 105, 180, 0.3)" 
                    }
                }
            }
        }
    });
}