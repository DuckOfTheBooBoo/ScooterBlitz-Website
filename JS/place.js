import data from "../JS/store.js";

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

// Area = earth_radius^2 / 2 * |sum_{i=1}^n(long_i - long_{i-1}) * (sin(lat_i) + sin(lat_{i-1}))|
function calculateAreaFromPolygonCoordinates(coordinates) {
  if (coordinates.length < 3) return 0;

  const first = coordinates[0];
  const last = coordinates[coordinates.length - 1];
  const closedCoords = [...coordinates];

  if (first[0] !== last [0] || first[1] !== last[1]) {
    closedCoords.push(first);
  }

  const R = 6371e3; // Earth's radius in meters
  let sum = 0;

  // Convert coordinates to radians as well as reverse the order of the coordinates biar ga kek tai
  const radCoords = closedCoords.map(coord => [degreesToRadians(coord[1]), degreesToRadians(coord[0])]);
  for (let i = 1; i < radCoords.length; i++) {
    const prev = radCoords[i - 1];
    const curr = radCoords[i];

    const [lambda1, phi1] = prev;
    const [lambda2, phi2] = curr;

    const deltaLambda = lambda2 - lambda1;
    const sumSinPhi = Math.sin(phi1) + Math.sin(phi2);
    sum += deltaLambda * sumSinPhi;
  }

  return Math.abs(sum) * R * R / 2;
}

$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);

  if (!urlParams.has("location")) {
    alert("No location specified!");
    window.location.href = "/";
  }

  console.log(urlParams);

  // Load data from store.js
  const locationData = data.find(
    (location) => location.slug === urlParams.get("location")
  );

  console.log(locationData);
  // Populate the page with data
  $("#jumbotron").css("background-image", `url(${locationData.imagePath})`);
  $("#place-name").text(locationData.title);
  $("#place-address").text(locationData.address);
  $("#av_unit_val").text(locationData.markers.length);
  $("#op_area_val").text((calculateAreaFromPolygonCoordinates(locationData.opAreaCoor) / 100000).toFixed(2));

  const customIcon = L.icon({
    iconUrl: "/assets/svg/marker.svg",
    iconSize: [40, 40],
    iconAnchor: [20, 30],
    popupAnchor: [0, -50],
  });

  // Initialize Leaflet map
  const map = L.map("map", {
    center: locationData.center,
    zoom: locationData.zoom,
    noWrap: true,
    maxZoom: 50,
  });

  L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
    // attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  }).addTo(map);

  
  // Initialize scooter marker
  locationData.markers.forEach((coor) => {
    // Add validation to check if coordinates are valid numbers
    if (
      coor &&
      coor.length >= 2 &&
      !isNaN(coor[1]) &&
      !isNaN(coor[0]) &&
      Math.abs(coor[1]) <= 90 &&
      Math.abs(coor[0]) <= 180
    ) {
      L.marker([coor[1], coor[0]], { icon: customIcon }).addTo(map);
    } else {
      console.error("Invalid coordinates:", coor);
    }
  });
  

  // Initialize operational area polygon
  // Flip the coordinates from (long, lat) to (lat, long) because GeoJSON decides to be a bitch by using easting-northing instead of northing-easting order. Long, lat?! Bajingan bajingan. Kenapa ga ikutin standar lat, long coba? Astaghfirullah hal adzhim cobaan saat bulan ramadhan. Berjam-jam gue double check value di polygon maker. Sumpah pengen gue tabok.
  const coordinates = locationData.opAreaCoor.map((v) => [v[1], v[0]]);
  const opArea = L.polygon(coordinates, { color: "#00afef" }).addTo(map);
  map.fitBounds(opArea.getBounds());
});
