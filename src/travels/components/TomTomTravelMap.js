import { useRef, useEffect, useState } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import * as ttapi from '@tomtom-international/web-sdk-services'
import '@tomtom-international/web-sdk-maps/dist/maps.css'


function TomTomTravelMap({
  // start = { lng: 18.0577679, lat: 40.0971616 }
}) {
  const mapElement = useRef()
  const [map, setMap] = useState({})
  const [longitude, setLongitude] = useState(-0.112869)
  const [latitude, setLatitude] = useState(51.504)

  useEffect(() => {
    let map = tt.map({
      key: process.env.REACT_APP_TOMTOM_API_KEY,
      container: mapElement.current,
      center: [longitude, latitude],
      zoom: 14
    })

    setMap(map)

    return () => map.remove()
  }, [longitude, latitude])


  return (
    <>
      {map && (
        <div className="h-full">
          <div ref={mapElement} className="map h-full" />
          {/* <div className="search-bar">
            <h1>Where to?</h1>
            <input
              type="text"
              id="longitude"
              className="longitude"
              placeholder="Put in Longitude"
              onChange={(e) => {
                setLongitude(e.target.value)
              }}
            />
            <input
              type="text"
              id="latitude"
              className="latitude"
              placeholder="Put in latitude"
              onChange={(e) => {
                setLatitude(e.target.value)
              }}
            />
          </div> */}
        </div>
      )}
    </>
  )
}

export default TomTomTravelMap