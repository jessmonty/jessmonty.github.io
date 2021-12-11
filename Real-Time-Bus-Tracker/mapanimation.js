
mapboxgl.accessToken = "pk.eyJ1IjoiamVzc21vbnR5IiwiYSI6ImNrd2wxNzFqNzBicTQyeHRiMjlwbzBjaXIifQ.KGg2Q0W-uMm2_UjesQEN1A";

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v11',
    center: [-71.104081, 42.365554],
    zoom: 12,
});

map.addControl(new mapboxgl.NavigationControl());

async function run(){
    // get bus data    
	const locations = await getBusLocations();
	newMarker(locations);

	// timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}


let busStops = [];

function newMarker(locations) {
	for (let i=0; i <= locations.length-1; i++){
	var marker = new mapboxgl.Marker()
	.setLngLat([
		locations[i].attributes.longitude,
		locations[i].attributes.latitude,
	])
	.addTo(map);
	busStops.push(marker);
}
return busStops;
}
run();
