const data = [
  { user: 'baker khoder', label: 'week1', revenue: 100000 },
  { user: 'baker khoder', label: 'week2', revenue: 200000 },
  { user: 'baker khoder', label: 'week3', revenue: 400000 },
  { user: 'baker khoder', label: 'week4', revenue: 600000 },
]

const config = {
  type: 'line',
  options: {
    tension: 0.4,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#323246',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#323246',
        },
      },
    },
  },
}

const converDataToArray = (data, labels, revenues) => {
  data.forEach((record) => {
    labels.push(record.label)
    revenues.push(record.revenue)
  })
}

const createLineChart = (title, convas, data) => {
  let labels = [],
    revenues = []
  converDataToArray(data, labels, revenues)

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `${title} - ${data[0].user}`,
        backgroundColor: '#64C5B1',
        borderColor: '#64C5B1',
        data: revenues,
      },
    ],
  }

  config['data'] = chartData

  new Chart(convas, config)
}

const best_seller_convas = document.querySelector('#seller-chart')
const top_client_convas = document.querySelector('#client-chart')
createLineChart('Best Seller', best_seller_convas, data)
createLineChart('Top Client', top_client_convas, data)
