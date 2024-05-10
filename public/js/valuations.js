document.addEventListener("DOMContentLoaded", function () {
  try {
    showLoadingModal()
  } catch (e) {
    console.log("error", e)
  }
  fetch("/api/bank-valuation-chart-data").then(res => res.json()).then(data => {
    const labels = data.banks.map(d => d.stringDay)
    hideLoadingModal()
    const myChart = new Chart("myChart", {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: 'Banks',
            data: data.banks.map(d => d.value),
            borderColor: "#9c27b0",
            fill: false
          },
          {
            label: 'S and P 500',
            data: data.spy.map(d => d.value),
            borderColor: "#ee0000",
            fill: false
          },
        ]

      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          },
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              const datasetIndex = tooltipItem.datasetIndex
              const currentDataset = data.datasets[datasetIndex]
              const currentValue = tooltipItem.yLabel
              let label = currentDataset.label || ''
              label = label + ': ' + "$" + currentValue.toFixed(2)
              return label
            },
            afterLabel: function (tooltipItem, data) {
              const datasetIndex = tooltipItem.datasetIndex
              const currentDataset = data.datasets[datasetIndex]
              const initialValue = currentDataset.data[0]
              const currentValue = tooltipItem.yLabel
              const totalReturn = ((currentValue - initialValue) / initialValue)

              const labels = data.labels
              const initialLabel = labels[0]
              const currentLabel = labels[tooltipItem.index]
              const initialDate = new Date(initialLabel)
              const currentDate = new Date(currentLabel)

              const difference = currentDate - initialDate
              const days = difference / (1000 * 3600 * 24)
              const annualizedReturn = Math.pow((1 + totalReturn), (365 / days)) - 1
              return ["Total Return: " + (totalReturn * 100).toFixed(2) + "%",
              "Annualized Return: " + (annualizedReturn * 100).toFixed(2) + "%"]
            }

          }
        },
        elements: {
          line: {
            tension: 0.5
          }
        },

        scales: {
          yAxes: [{
            ticks: {
              callback: function (value) {
                return '$' + value.toFixed(0); // Modify to format as currency
              }
            }
          }],
          xAxes: [{
            ticks: {
              callback: function (value, index) {
                const date = new Date(labels[index]);
                return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
              }
            }
          }]
        }
      }
    });
  })
})