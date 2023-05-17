// const map = L.map("map").setView([-36.847166770156186, 174.762972903701],
//     4);
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     maxZoom: 19,
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);

// let routeControl = null;
// function showRoute(iteniary.startLocationCoordinate, iteniary.returnLocationCoordinate) {
//   // if old route exists, remove old route
//   if (routeControl) {
//     map.removeControl(routeControl);
//     routeControl = null;
//   }
//   routeControl = L.Routing.control({
//     waypoints: [
//       L.latLng(iteniary.startLocationCoordinate[0], iteniary.startLocationCoordinate[1]),
//       L.latLng(iteniary.returnLocationCoordinate[0], iteniary.returnLocationCoordinate[1]),
//     ],
//     show: false,
//     draggableWaypoints: false,
//     lineOptions: {
//       addWaypoints: false,
//     },
//   }).on('routesfound', function(e){
//     console.log(e.routes[0].summary.totalDistance);
//   }).addTo(map);
// }
// showRoute(
//   { lat: -36.845063565218865, lng: 174.74949146368513 },
//   { lat: -36.86106592965733, lng: 174.7676875681643 }
// );

// /////

// const map = L.map("map").setView([-36.847166770156186, 174.762972903701],
//     4);
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     maxZoom: 19,
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);

//   let routeControl = null;

// function showRoute(startCoordinate, returnCoordinate) {
//   // if old route exists, remove old route
//   if (routeControl) {
//     map.removeControl(routeControl);
//     routeControl = null;
//   }
//   routeControl = L.Routing.control({
//     waypoints: [
//       L.latLng(startCoordinate[0], startCoordinate[1]),
//       L.latLng(returnCoordinate[0], returnCoordinate[1]),
//     ],
//     show: false,
//     draggableWaypoints: false,
//     lineOptions: {
//       addWaypoints: false,
//     },
//   }).on('routesfound', function(e){
//     console.log(e.routes[0].summary.totalDistance);
//   }).addTo(map);
// }
// showRoute(
//   { lat: -36.845063565218865, lng: 174.74949146368513 },
//   { lat: -36.86106592965733, lng: 174.7676875681643 }
// );