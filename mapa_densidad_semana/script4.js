d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

const mapaFetch = d3.json('barrios-caba.geojson')
const dataFetch = d3.dsv(';', 'malestacionados.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
  // Mapa Coroplético 
  let chartMap = Plot.plot({
    projection: {
      type: 'mercator',
      domain: barrios, 
      width: 5000,
      heigth: 500,
    },
    color: {
      scheme: 'ylorrd',
    },
    marks: [
      Plot.density(data, { x: 'lon', y: 'lat', fill: 'density',bandwidth: 2, thresholds: 30, width: 5000, heigth: 500 }),
      Plot.geo(barrios, {
        stroke: 'gray',
        opacity:0.4,
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
        width: 5000,
        heigth: 500,
      }),
    ],
    facet: {
      data: data,
      x: d => d3.timeFormat('%a')(d3.timeParse('%d/%m/%Y')(d.fecha_ingreso)),
    },
    fx: {
      domain: ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'],
    },
    width: 1500,
  })
  d3.select('#chart').append(() => chartMap)
})
