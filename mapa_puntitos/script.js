const mapaFetch = d3.json('barrios-caba.geojson')
const dataFetch = d3.dsv(';', 'malestacionados.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
      scheme: 'ylorrd',
    },
    marks: [
      Plot.geo(barrios, {
        stroke: '#ddd',
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
      }),
      Plot.dot(data, {
        x: 'lon',
        y: 'lat',
        r: 2,
        stroke: 'none',
        fill: 'red',
        opacity: 0.5
      }),
    ],
    
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart').append(() => chartMap)
})
