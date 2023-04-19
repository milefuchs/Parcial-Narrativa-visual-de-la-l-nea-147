// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

d3.dsv(';', 'malestacionados.csv', d3.autoType).then(data => {
  console.log(data)

  // Guardamos el svg generado en la variable chart
  let chart = Plot.plot({

    x: {
      tickFormat: d3.timeFormat('%H'), 
    },
    y: {
      grid: true,
      label: 'Cantidad de denuncias',
    },
    color: {
      legend: true,
    },
    marks: [
      Plot.rectY( 
        data,
        Plot.binX( 
          
          { y: 'count', title: d => d[0].hora_ingreso, },
          {
            x: d => d3.timeParse('%H:%M:%S')(d.hora_ingreso),
            // Agrupamos en intervalo de horas
            thresholds: d3.timeHour,
            fill: 'genero'
          },
        ),
      ),
    ],

  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})
