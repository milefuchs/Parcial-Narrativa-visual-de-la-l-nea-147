const locale = {
    decimal: ',',
    thousands: '.',
    grouping: [3],
  }
  d3.formatDefaultLocale(locale)
  
  d3.dsv(';', 'malestacionados.csv', d3.autoType).then(data => {
    console.log(data)
    // Guardamos el svg generado en la variable chart
    let chart = Plot.plot({
      x: {
        grid: true,
        tickFormat: d3.format(',.0f'),
      },
      y: {
        label: '',
      },
      marks: [
        Plot.barX(
          data,
          Plot.groupY(
            { x: 'count', title: d => JSON.stringify(d) },
            {
              y: 'domicilio_barrio',
              // sort: { y: 'x', reverse: true },
            },
          ),
        ),
        Plot.text(
          data,
          Plot.groupY(
            { x: 'count', text: 'count' },
            {
              y: 'domicilio_barrio',
              // sort: { y: 'x', reverse: true },
              textAnchor: 'start',
              dx: 5,
            },
          ),
        ),
      ],
      marginLeft: 200,
      marginRight: 100,
    })
    // Agregamos chart al div#chart de index.html
    d3.select('#chart').append(() => chart)
  })
  