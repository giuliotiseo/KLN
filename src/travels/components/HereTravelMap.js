// import { useRef, useLayoutEffect } from 'react';

// const HereTravelMap = ({
//   start = [41.4927165, 13.8292387],
//   end = [41.0043563, 14.2337493],
//   waypoints = ""
// }) => {
//   // Create a reference to the HTML element we want to put the map on
//   const mapRef = useRef(null);

//   /**
//    * Create the map instance
//    * While `useEffect` could also be used here, `useLayoutEffect` will render
//    * the map sooner
//    */
//   useLayoutEffect(() => {
//     // `mapRef.current` will be `undefined` when this hook first runs; edge case that
//     if (!mapRef.current) return;
//     const H = window.H;
//     const platform = new H.service.Platform({
//       apikey: process.env.REACT_APP_HERE_API_KEY
//     });

//     const defaultLayers = platform.createDefaultLayers();
//     const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
//       center: { lat: 50, lng: 5 },
//       zoom: 4,
//       pixelRatio: window.devicePixelRatio || 1
//     });

//     if(start?.length === 2 && end?.length === 2) {
//       // Create the parameters for the routing request:
//       const routingParameters = {
//         'routingMode': 'fast',
//         'transportMode': 'car',
//         // The start point of the route:
//         'origin': start.join(","),
//         // The end point of the route:
//         'destination': end.join(","),
//         // Include the route shape in the response
//         'return': 'polyline'
//       };

//       // Define a callback function to process the routing response:
//       const onResult = function(result) {
//         // ensure that at least one route was found
//         if (result.routes.length) {
//           result.routes[0].sections.forEach((section) => {
//             // Create a linestring to use as a point source for the route line
//             let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

//             var routeOutline = new H.map.Polyline(linestring, {
//               style: {
//                 lineWidth: 10,
//                 strokeColor: 'rgba(0, 128, 255, 0.7)',
//                 lineTailCap: 'arrow-tail',
//                 lineHeadCap: 'arrow-head'
//               }
//             });

//             // Create a patterned polyline:
//             var routeArrows = new H.map.Polyline(linestring, {
//               style: {
//                 lineWidth: 10,
//                 fillColor: 'white',
//                 strokeColor: 'rgba(255, 255, 255, 1)',
//                 lineDash: [0, 2],
//                 lineTailCap: 'arrow-tail',
//                 lineHeadCap: 'arrow-head' }
//               }
//             );
  
//             // Create a polyline to display the route:
//             let routeLine = new H.map.Group();
//             routeLine.addObjects([routeOutline, routeArrows]);

//             // Create a marker for the start point:
//             let startMarker = new H.map.Marker(section.departure.place.location);
  
//             // Create a marker for the end point:
//             let endMarker = new H.map.Marker(section.arrival.place.location);
  
//             // Add the route polyline and the two markers to the map:
//             hMap.addObjects([routeLine, startMarker, endMarker]);
  
//             // Set the map's viewport to make the whole route visible:
//             hMap.getViewModel().setLookAtData({
//               bounds: routeLine.getBoundingBox()
//             });
//           });
//         }
//       };
  
//       // Get an instance of the routing service version 8:
//       let router = platform.getRoutingService(null, 8);
  
//       // Call calculateRoute() with the routing parameters,
//       // the callback and an error callback function (called if a
//       // communication error occurs):
//       router.calculateRoute(routingParameters, onResult,
//         function(error) {
//           alert(error.message);
//         });
//     }

//     const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
//     const ui = H.ui.UI.createDefault(hMap, defaultLayers);

//     // This will act as a cleanup to run once this hook runs again.
//     // This includes when the component un-mounts
//     return () => {
//       hMap.dispose();
//     };
//   }, [mapRef]); // This will run this hook every time this ref is updated


//   console.log("mapref", mapRef.current);

//   return <div className="map" ref={mapRef} style={{ height: "800px" }} />;
// };

// export default HereTravelMap;