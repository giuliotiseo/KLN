import { useState } from 'react'
import SignUpCompanyMap from '../../../auth-user/components/signup/SignUpCompanyMap';
import Button from '../../../globals/components/buttons_v2/Button';
import SearchPlaces from '../../../globals/components/dataEntry_v2/SearchPlaces';
import LocationItem from '../../../globals/components/layout/LocationItem';

function CompanyLocationFields({
  updateFormLocation,
  location,
  address,
  showMap = true
}) {
  const [ mapVisibility, setMapVisibility ] = useState(showMap);
  return (
    <div className="mt-2 mb-4">
      { address 
        ? <div className="input bg-base-100 p-2 rounded-md">
            <p className="text-base">Indirizzo selezionato: </p>
            <LocationItem
              location={location}
              clearLocation={() => updateFormLocation(null)}
            />
          </div>
        : <SearchPlaces
            label={"Cerca il nome della tua attività o l'indirizzo *"}
            showIcon={true}
            onClick={value => updateFormLocation(value)}
            className="w-full text-base"
            inputClassName="input"
          />
      }
      
      { showMap && <Button
        icon={null}
        text={mapVisibility ? 'Nascondi mappa' : 'Mostra mappa'}
        className="btn-ghost mt-2 pt-0"
        onClick={() => setMapVisibility(prev => !prev)}
      /> }

      { mapVisibility && showMap &&
        <SignUpCompanyMap
          lat={location?.coordinate?.lat}
          lng={location?.coordinate?.lng}
          className="mt-0 h-[360px]"
          onClick={(value) => updateFormLocation(value)}
        />
      }
    </div>
  )
}

export default CompanyLocationFields
