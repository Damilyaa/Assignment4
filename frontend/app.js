document.getElementById('filterForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const field = document.getElementById('field').value;
    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;
  
    // Fetch data from backend
    const response = await fetch(`/api/measurements?field=${field}&start_date=${start_date}&end_date=${end_date}`);
    const data = await response.json();
  
    // Render chart
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((d) => new Date(d.timestamp).toLocaleString()),
        datasets: [{
          label: field,
          data: data.map((d) => d[field]),
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
        }],
      },
    });
  });