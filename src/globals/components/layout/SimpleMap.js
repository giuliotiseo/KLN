import { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { getGeocodingDataFromCoordinates } from '../../libs/helpers';

// Constants -----------------------------------------------------------------------------------------------------------------------------
const mapContainerStyle = {
  width: '100%',
  height: '100%',
}

const options = {
  disableDefaultUI: true,
  zoomControl: true,
}

const zoom = 4;
const center = {
  lat: 41.4908,
  lng: 13.8334
};

// Helpers -----------------------------------------------------------------------------------------------------------------------------
const reverseGeocodeByClick = async ({ coordinate, callback }) => {
  const results = await getGeocodingDataFromCoordinates(coordinate);
  console.log("Results", results);
  callback(results);
}

// Main component -----------------------------------------------------------------------------------------------------------------------------
export default function SimpleMap({
  lat,
  lng,
  onClick = (location) => console.log("Basic onClick on <SimpleMap />", location)
}) {
  const [ markers, setMarkers ] = useState([]);
  const mapRef = useRef(null);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    if(lat && lng) {
      mapRef.current.panTo({ lat: parseFloat(lat), lng: parseFloat(lng) });
      mapRef.current.setZoom(parseInt(12));
      setMarkers(() => [{
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        time: new Date()
      }])
    } else {
      mapRef.current?.panTo(center);
      mapRef.current?.setZoom(parseInt(4));
      setMarkers([])
    }
  }, [mapRef?.current, lat, lng]);

  // Trigger for changes
  useEffect(() => {
    if(mapRef.current && (lat && lng)) {
      mapRef.current.panTo({ lat: parseFloat(lat), lng: parseFloat(lng) });
      mapRef.current.setZoom(parseInt(12));
      setMarkers(() => [{
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        time: new Date()
      }])
    } else {
      mapRef.current?.panTo(center);
      mapRef.current?.setZoom(parseInt(4));
      setMarkers([]);
    }
  }, [mapRef.current, lat, lng]);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle} 
      zoom={zoom} 
      center={lat && lng ? { lat, lng } : center}
      options={options}
      onLoad={onMapLoad}
      onClick={ev => reverseGeocodeByClick({
        coordinate: { lat: ev.latLng.lat(), lng: ev.latLng.lng() },
        callback: onClick,
      })}
    >
      { markers.map(marker => (
        <Marker 
          key={marker.time.toISOString()} 
          position={{ lat: marker.lat, lng:marker.lng }} 
        />
      ))}
    </GoogleMap>
  )
}

export {
  mapContainerStyle,
  options,
  zoom,
  center
};