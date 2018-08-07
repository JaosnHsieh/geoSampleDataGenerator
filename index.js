var random = require("geojson-random");
// var downloadjs = require("downloadjs");
var $ = require("jquery");

// const data2csv = rows => rows.map(row => row.join(",")).join("\n");
$("#btn").on("click", () => {
  var randomPoints = random.point(4, [121.234217, 25.032969, 121.565418, 25.079651]);
  $( "#content" ).html("");
randomPoints['features'].forEach(p=>{
  
  $( "#content" ).append(`<ul>
  <li>${p.geometry.coordinates[0]}</li>
  <li>${p.geometry.coordinates[1]}</li>
  </ul>`);

});
});
