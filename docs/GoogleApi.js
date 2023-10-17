let map;
let movingPointer; // Custom moving pointer marker

async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };

  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  // The map, centered at Uluru
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
    streetViewControl: false
  });

  // Create a marker at the initial position (moving pointer)
  movingPointer = new google.maps.Marker({
    position: position,
    map: map,
    title: "Area seleccionada",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      scaledSize: new google.maps.Size(32, 32) 
    }
  });

  // Add an event listener to the map to update the moving pointer position
  map.addListener("center_changed", () => {
    updateMovingPointer();
  });
  map.addListener("click", (event) => {
    updateLocationInputs();
  });
}

function updateMovingPointer() {
  const center = map.getCenter();
  updateLocationInputs();
  movingPointer.setPosition(center);
}

function forecast() {
  let lat= document.getElementById("lat");
  let lon=document.getElementById("lon");
    const center = map.getCenter();
    const lat_txt = center.lat().toFixed(2);
    const lng_txt = center.lng().toFixed(2);
  fetchWeatherForecast(lat_txt, lng_txt);
}

initMap();
