// making a map and tiles
const mymap = L.map('map').setView([10, 5], 13);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileURL, { attribution });
tiles.addTo(mymap);

// making a marker with a custom icon
const issIcon = L.icon({
  iconUrl: 'satellite.png',
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

let firstTime = true;

async function getISS() {
  const url = 'https://api.wheretheiss.at/v1/satellites/25544';
  const response = await fetch(url);
  const data = await response.json();

  const latitude = data.latitude;
  const longitude = data.longitude;

  marker.setLatLng([latitude, longitude]);

  if (firstTime) {
    mymap.setView([latitude, longitude], 3);
    firstTime = false;
  }

  document.getElementById('lat').textContent = latitude.toFixed(2);
  document.getElementById('long').textContent = longitude.toFixed(2);
}

getISS();

window.setInterval(getISS, 1000);
