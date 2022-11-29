import { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { mapContainerStyle, options, zoom, center } from "../../globals/components/layout/SimpleMap";
import { formatLocationCoords } from '../../warehouses/libs/helpers';

// Custom hook ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function useMarkers({ pickup, delivery, depot }) { 
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    let coordinates = [];
    const formatPickupCoordinates = pickup ? formatLocationCoords(pickup?.location?.coordinate) : null;
    const formatDepotCoordinates = depot ? formatLocationCoords(depot?.location?.coordinate) : null;
    const formatDeliveryCoordinates = delivery ? formatLocationCoords(delivery?.location?.coordinate) : null;

    if(pickup) {
      coordinates[0] = {
        lat: formatPickupCoordinates[0], 
        lng: formatPickupCoordinates[1]
      }
    }

    if(depot) {
      coordinates[1] = {
        lat: formatDepotCoordinates[0], 
        lng: formatDepotCoordinates[1]
      }
    }

    if(delivery) {
      coordinates[2] = {
        lat: formatDeliveryCoordinates[0], 
        lng: formatDeliveryCoordinates[1]
      }
    }

    if (coordinates?.length > 0) {
      const newMarkers = coordinates.map(coord => ({
        lat: parseFloat(coord.lat), lng: parseFloat(coord.lng), time: new Date()
      }));

      setMarkers(newMarkers);
    } else {
      setMarkers([])
    }
  }, [pickup?.location?.address,  depot?.location?.address, delivery?.location?.address]);

  return markers;
} 


// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function PickupDeliveryMap({ pickup, depot, delivery }) {
  const [ info, showInfo ] = useState(false);
  const markers = useMarkers({ pickup, delivery, depot });
  const mapRef = useRef(null);

  // On first load
  const onLoad = useCallback((map) => {
    mapRef.current = map;
    mapRef.current?.panTo(center);
    mapRef.current?.setZoom(parseInt(4));
  }, []);

  // When changing markers
  useEffect(() => {
    if (mapRef.current && markers?.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.map(marker => {
        bounds.extend({
          lat: marker.lat,
          lng: marker.lng,
        });
      });

      mapRef.current.fitBounds(bounds);
      mapRef.current.setZoom(mapRef.current.getZoom() - 1);
    } else {
      mapRef.current?.panTo(center);
      mapRef.current?.setZoom(parseInt(4));
    }
  }, [mapRef.current, markers]);
  
  return (
    <GoogleMap 
      mapContainerStyle={mapContainerStyle} 
      zoom={zoom} 
      center={center}
      options={options}
      onLoad={onLoad}
    >
      { markers?.length > 0 && markers.map((marker, index) => (
        <div key={index}>
          <Marker
            label={{
              text: (index + 1).toString(),
              className: 'font-bold',
              color: 'white',
            }}
            // icon={{
            //   url: index === 0 ? pickupSvg : deliverySvg,
            //   anchor: new window.google.maps.Point(16, 46),
            //   scaledSize: new window.google.maps.Size(37, 37)
            // }}
            position={{ lat: marker.lat, lng:marker.lng }}
            onClick={() => showInfo(index + 1)}
          >

            { info && info === index + 1  && <InfoWindow onCloseClick={() => showInfo(false)}>
              { markers?.length <= 3 && (
                <span>
                  { index === 0 && `Ritiro: ${pickup?.location.address}`}
                  { index === 1 && `Deposito: ${depot?.location.address}`}
                  { index === 2 && `Consegna: ${delivery?.location.address}`}
                  </span>
              )}
            </InfoWindow> }
          </Marker>
        </div>
      ))}
    </GoogleMap>
  )
}