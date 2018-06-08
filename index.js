var random = require("geojson-random");
var downloadjs = require("downloadjs");
var $ = require("jquery");

const data2csv = rows => rows.map(row => row.join(",")).join("\n");

$("#downloadBtn1").on("click", () => {
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
  downloadjs(data2csv(formatDataForCsv), `sample_${numbers}_polygon.csv`);
});

$("#downloadBtn2").on("click", () => {
  const numbers = parseInt($("#circleNumbers")[0].value);
  const randomRawData = random.point(numbers, [
    21.970391,
    119.879572,
    25.327096,
    122.571706
  ]).features;
  console.log(randomRawData);
  // console.log(JSON.stringify(randomRawData));
  const formatDataForCsv = [["name", "radius(m)", "lat", "lon"]].concat(
    randomRawData.map(d => {
      const row = [`name${(Math.random() * 1000000).toFixed(0)}`];
      const randomRaidus = Math.floor(Math.random() * 10000 + 1000);
      const coordinate = d.geometry.coordinates;
      let lat = coordinate[0];
      let lon = coordinate[1];
      if (lat > 90) lat = 89 + Math.random();
      if (lat < -90) lat = -89 - Math.random();
      if (lon > 180) lon = 179 + Math.random();
      if (lon < -180) lon = -179 - Math.random();

      row.push(randomRaidus);
      row.push(lat);
      row.push(lon);
      return row;
    })
  );
  console.log(formatDataForCsv);
  downloadjs(data2csv(formatDataForCsv), `sample_${numbers}_circle.csv`);
});
