import CheckboxGroup from './CheckboxGroup';
import { italyZones, italyZonesRegions } from '../../libs/api';
import ItalyAreasForRegions from '../dataDisplay/ItalyAreasForRegions';
import ActionButton from '../buttons/ActionButton';
import { FiX } from 'react-icons/fi';
import { SmallTitle } from '../typography/titles';
import { getKeyByValue } from '../../libs/helpers';
import { toast } from 'react-toastify';

export default function DeliveryAreasPicker({ areas, onChangeAreas, regions, onChangeRegions }) {
  const handleChangeAreas = (vals) => {
    let newRegionsList = [];
    const isRemovedArea = areas.length > vals.length ? true : false;
    if(isRemovedArea) {
      const removedArea = areas.filter(area => !vals.includes(area))[0];
      console.log('Removed area', removedArea);
      console.log('newRegionsList', regions.filter(region => !italyZonesRegions[removedArea].includes(region)));
      newRegionsList = regions.filter(region => !italyZonesRegions[removedArea].includes(region));
    } else {
      const addedArea = vals.filter(val => !areas.includes(val))[0];
      newRegionsList = regions.concat(...italyZonesRegions[addedArea]);
    }

    onChangeRegions(newRegionsList);
    onChangeAreas(vals);
  }

  const handleRemoveRegion = (removedRegion) => {
    const newRegionsList = regions.filter(region => region !== removedRegion);
    const ownArea = getKeyByValue(italyZonesRegions, removedRegion);

    const controlsForRemoval = newRegionsList.filter(reg => italyZonesRegions[ownArea].includes(reg));
    if(controlsForRemoval.length > 0) {
      onChangeRegions(newRegionsList);
    } else {
      // Se nelle aree selezionate non vi sono i valori regioni occorre deselezionare anche l'area
      toast.error(`Per rimuovere ${removedRegion} togli la spunta a ${italyZones[ownArea]}`);
    }
  }
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1">
        <CheckboxGroup
          label="Seleziona le zone di consegna"
          optionsType="object"
          options={italyZones}
          values={areas}
          onChange={(vals) => handleChangeAreas(vals)}
          styles="mt-1"
          optionStyle="text-lg"
          capitalizeText={true}
        />

        {  regions.length !== 0 && (
          <>        
            <SmallTitle styles="mt-4 mb-2">Le regioni interessate sono: </SmallTitle>
            <ul>{regions.map(region => (
              <li className="flex mb-2" key={region}>
                <ActionButton onClick={() => handleRemoveRegion(region)} styles="btn-danger btn--center mr-2" icon={() => <FiX /> } />
                <span className="text-lg">{region}</span>
              </li>)
            )}</ul>
          </>
        )}

      </div>
      <div className="col-span-2">
        <ItalyAreasForRegions selectedRegions={regions} />
      </div>
    </div>
  )
}