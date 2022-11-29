import { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { formatLocationCoords, getGeocodingDataFromCoordinates } from '../../libs/helpers';

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
  callback(results);
}

const useMarkers = (coordinate) => {
  const [ markers, setMarkers ] = useState([]);

  const handleChangeMarkers = useCallback((coordinate) => {
    const coordinateArray = coordinate.map(coord => formatLocationCoords(coord));
    if(coordinateArray?.length > 0) {
      const newMarkers  = coordinateArray.map(coord => ({
        lat: parseFloat(coord[0]), lng: parseFloat(coord[1])
      }));

      setMarkers(newMarkers);
    }
  }, []);

  useEffect(() => {
    if(coordinate) {
      handleChangeMarkers(coordinate);
    }
  }, [coordinate]);

  return [ markers, handleChangeMarkers ];
}

// Fit bounds function
const fitBounds = (markers, mapRef) => {
  const bounds = new window.google.maps.LatLngBounds();
  markers.map(item => {
    bounds.extend(item);
    return item.id
  });
  
  mapRef.current.fitBounds(bounds);
};

// Main component -----------------------------------------------------------------------------------------------------------------------------
export default function MultipleMarkersMap({
  coordinate = [],
  onClick = (location) => console.log("Basic onClick on <MultipleMarkersMap />", location)
}) {
  const [ markers, setMarkers ] = useMarkers(coordinate);
  const mapRef = useRef(null);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    if(coordinate) {
      // mapRef.current.panTo({ lat: parseFloat(lat), lng: parseFloat(lng) });
      mapRef.current.setZoom(parseInt(12));
      setMarkers(coordinate);
    } else {
      mapRef.current?.panTo(center);
      mapRef.current?.setZoom(parseInt(4));
      setMarkers([])
    }
  }, [mapRef?.current, coordinate]);

  useEffect(() => {
  if(mapRef && markers?.length > 0) {
      fitBounds(markers, mapRef);
    }
  }, [mapRef, markers])

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle} 
      zoom={zoom} 
      center={center}
      options={options}
      onLoad={onMapLoad}
      onClick={ev => reverseGeocodeByClick({
        coordinate: { lat: ev.latLng.lat(), lng: ev.latLng.lng() },
        callback: onClick,
      })}
    >
      { markers.map((marker, index) => (
        <Marker 
          key={`${index}-${marker.lat}-${marker.lng}`} 
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