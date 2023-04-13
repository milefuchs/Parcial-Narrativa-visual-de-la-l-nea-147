// config. números español
const locale = {
  decimal: ',',
  thousands: '.',
  grouping: [3],
}
d3.formatDefaultLocale(locale)

d3.dsv(';', 'malestacionados.csv', d3.autoType).then(data => {
  data = data.filter(d => {
    return (
      d.categoria == 'TRÁNSITO' &&
      d.prestacion.split(' ').includes('VEHÍCULO MAL ESTACIONADO')
    )
  })

  let chart = Plot.plot({
    marks: [
      Plot.dot(
        data,
        Plot.dodgeY({
          // https://github.com/d3/d3-time-format
          x: d => d3.timeParse('%H:%M:%S')(d.hora_ingreso),
          r: 10,
          fill: 'orange',
        }),
      ),
      Plot.image(
        data,
        Plot.dodgeY({
          // https://github.com/d3/d3-time-format
          x: d => d3.timeParse('%H:%M:%S')(d.hora_ingreso),
          r: 10,
          src: './iconmonstr-audio-5.svg',
        }),
      ),
    ],
    x: {
      grid: true,
      tickFormat: d3.timeFormat('%H'),
      label: 'horas',
    },
    width: 600,
    height: 800,
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})
