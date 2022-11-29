import { useCallback, useRef, useState } from 'react';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { mapContainerStyle, options, zoom, center } from "../../globals/components/layout/SimpleMap";

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function TravelMap({ trip, directions }) {
  const [ info, showInfo ] = useState(false);
  const markers = trip?.length > 0
    ? trip
      .filter(milestone => milestone?.coordinate)
      .map(milestone => ({ lat: milestone?.coordinate?.lat || milestone.coordinate[0], lng: milestone?.coordinate?.lng || milestone.coordinate[1]}))
    : [];
  const mapRef = useRef(null);

  // On first load
  const onLoad = useCallback((map) => {
    mapRef.current = map;
    mapRef.current?.panTo(center);
    mapRef.current?.setZoom(parseInt(4));
  }, []);

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
        { !directions && marker?.lat && marker?.lng && (
          <Marker
            label={{
              text: (index + 1).toString(),
              className: 'font-bold',
              color: 'white',
            }}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => showInfo(index + 1)}
          >

            {/* { info && info === index + 1  && <InfoWindow onCloseClick={() => showInfo(false)}>
              { markers?.length <= 2
                ? <span>{ index === 0 
                    ? `Ritiro: ${pickup?.location.address}` 
                    : `Consegna: ${delivery?.location.address}`}
                  </span>
                : <div>
                  {index === 0 && info === index + 1 && <span>Ritiro {pickup.location.address}</span>}
                  {index === 1 && info === index + 1 && <span>Deposito {depot.location.address}</span>}
                  {index === 2 && info === index + 1 && <span>Consegna {delivery.location.address}</span>}
                </div>
              }
            </InfoWindow> } */}
          </Marker>
        )}
        
        { directions && <DirectionsRenderer directions={directions} />}
      </div>
    ))}
  </GoogleMap>
  )
}