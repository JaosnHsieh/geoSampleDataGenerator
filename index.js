var random = require("geojson-random");
var downloadjs = require("downloadjs");
var $ = require("jquery");

const data2csv = rows => rows.map(row => row.join(",")).join("\n");

$("#downloadBtn").on("click", () => {
  const numbers = parseInt($("#polygonNumbers")[0].value);
  const randomRawData = random.polygon(numbers).features;
  const formatDataForCsv = [["name", "lat", "lon"]].concat(
    randomRawData.map(d => {
      const row = [`name${(Math.random() * 1000000).toFixed(0)}`];
      const coordinates = d.geometry.coordinates[0];
      coordinates.forEach(c => {
        row.push(c[1]);
        row.push(c[0]);
      });
      return row;
    })
  );
  downloadjs(data2csv(formatDataForCsv), `sample_${numbers}.csv`);
});
