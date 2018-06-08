var random = require("geojson-random");
var downloadjs = require("downloadjs");
var $ = require("jquery");

const data2csv = rows => rows.map(row => row.join(",")).join("\n");

$("#downloadBtn").on("click", () => {
  const numbers = parseInt($("#polygonNumbers")[0].value);
  const randomRawData = random.polygon(numbers).features;
  console.log(JSON.stringify(randomRawData));
  const formatDataForCsv = [["name", "lat", "lon"]].concat(
    randomRawData.map(d => {
      const row = [`name${(Math.random() * 1000000).toFixed(0)}`];
      const coordinates = d.geometry.coordinates[0];
      coordinates.forEach(c => {
        let lat = c[0];
        let lon = c[1];
        if (lat > 90) lat = 89 + Math.random();
        if (lat < -90) lat = -89 - Math.random();
        if (lon > 180) lon = 179 + Math.random();
        if (lon < -180) lon = -179 - Math.random();
        row.push(lat);
        row.push(lon);
      });
      return row;
    })
  );
  downloadjs(data2csv(formatDataForCsv), `sample_${numbers}.csv`);
});
