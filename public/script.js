let chartInstance = null; // Store the chart instance globally

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
            borderColor: "#007bff",
            backgroundColor: "rgba(0, 123, 255, 0.5)",
            fill: true
        }]
    };

    chartInstance = new Chart(ctx, { // Assign new chart instance to global variable
        type: "line",
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: "#333" } }
            },
            scales: {
                x: { ticks: { color: "#333" } },
                y: { ticks: { color: "#333" } }
            }
        }
    });
}