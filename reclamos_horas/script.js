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
      scheme: 'ylorrd',
      range:[0.1,1.1],
      legend: true,
      legendFormat: "Denuncias",
    },
    marks: [
      Plot.rectY( 
        data,
        Plot.binX( 
          
          { y: 'count', fill: 'count', title: d => d[0].hora_ingreso,
          },
          {
            x: d => d3.timeParse('%H:%M:%S')(d.hora_ingreso),
            // Agrupamos en intervalo de horas
            thresholds: d3.timeHour,        
            
            
          },
        ),
      ),
      Plot.frame({ stroke: "#d3d3d3" })
    ],
    facet: {
      data: data,
      x: d => d3.timeFormat('%a')(d3.timeParse('%d/%m/%Y')(d.fecha_ingreso)),
      marginRight: 0,
      marginLeft: 0
    },
    fx: {
      domain: ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'],
      padding: 0.1,
      insetLeft: 0,
      insetRight: 0
    },
    style: {
      fontSize: "15px",
    },

    width: 5000,
  })

  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
  
})

