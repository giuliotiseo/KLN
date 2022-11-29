import { useState, useRef, useEffect } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete';
// Custom components
import Scrollbar from './../layout/Scrollbar';
// Styles
import { FiDelete, FiSearch } from 'react-icons/fi';
// Helpers
import { useClickOutside } from '../../libs/hooks';

const type = 'bg-primary-200 w-9 h-9 ml-1 p-2 rounded-md text-light-100';

// Sub Components ---------------------------------------------------------------------------------------
function PlacesListItem({ description, place_id, index, onClick, focusIndex }) {
  return (
    <li
      className={`p-2 text-xs cursor-pointer hover:bg-light-200 dark:hover:bg-dark-200 border border-transparent rounded-md ${index === focusIndex ? 'border border-secondary-200 dark:border-secondary-200 border-opacity-50 dark:border-opacity-50 bg-light-200 dark:bg-dark-200' : ''}`}
      onClick={() => onClick(description)}
      key={place_id}
    >
      { description }
    </li>
  )
}

function PlacesList({ data, onSelect, focusIndex }) {
  return (
    <div className="absolute bg-light-100 dark:bg-dark-300 text-dark-300 dark:text-light-100 h-32 top-full  w-full shadow-lg p-2 rounded-md z-10">
      <Scrollbar styles={{ maxHeight: 120 }}>
          <ul>
            { data.map(({ description, place_id }, index) => (
              <PlacesListItem 
                key={place_id}
                onClick={onSelect}
                description={description}
                index={index}
                focusIndex={focusIndex}
              />
            ))}
          </ul>
      </Scrollbar>
    </div>
  )
}

// Main Component ---------------------------------------------------------------------------------------
export default function SearchPlaces({ inputAddress, onClick, labelWeight, label, placeholder, styles = "m-0", clearAfterClick = false }) {
  const [ searchInput, setSearchInput ] = useState('')
  const [ disabledInput, setDisabledInput ] = useState(false);
  const [ focusItem, setFocusItem ] = useState(null);
  const [ optionsVisibility, setOptionsVisibility ] = useState(false);
  const { ready, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete();
  const searchRef = useRef();

  // In case of pre-selected address from parent component
  useEffect(() => {
    if(inputAddress) { 
      setSearchInput(inputAddress);
    }

    return () => {
      setSearchInput('');
      setDisabledInput(false);
      setFocusItem(false);
      setOptionsVisibility(false);
    }
  }, [inputAddress]);

  // Clear suggestions if the user delete searchInput in searchbar by using backspace
  if(searchInput === '' && status === 'OK') {
    clearSuggestions();
  }

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      let city = '', region = '', province = '', route = '', street_number = '', postal_code = '', country = '';
      const length = results[0].address_components.length;

      for(let i = 0; i < length; i++) {
        const target = results[0].address_components[i].types[0];
        if(target === 'administrative_area_level_1') region = results[0].address_components[i].long_name;
        if(target === 'administrative_area_level_2') province = results[0].address_components[i].short_name;
        if(target === 'administrative_area_level_3') city = results[0].address_components[i].long_name;
        if(target === 'country') country = results[0].address_components[i].long_name;
        if(target === 'postal_code') postal_code = results[0].address_components[i].long_name;
        if(target === 'route') route = results[0].address_components[i].long_name;
        if(target === 'street_number') street_number = results[0].address_components[i].long_name;
      }

      const formatted_address = [route, street_number, city, province, postal_code, region, country].filter(item => item !== '').join(', ')
      
      onClick({
        city,
        region,
        province,
        address: formatted_address,
        place_id:  results[0].place_id,
        coordinate: { lat, lng }
      });

      clearAfterClick
        ? setSearchInput('')
        : setSearchInput(formatted_address);

      clearAfterClick
        ? setDisabledInput(false)
        : setDisabledInput(true);
    } catch(error) {
      console.error('Errore!', error)
    }
  }

  const runEnter = () => {
    // If using arrow keys + enter to select the address result
    if(searchInput && optionsVisibility && focusItem !== null) {
      handleSelect(data[focusItem].description);
      setFocusItem(null);
    }

    if(searchInput !== '') {
      setValue(searchInput);
    }
  }

  const handleClear = () => {
    setSearchInput('');
    setValue(false, false);
    setDisabledInput(false);
    onClick({ coordinate: { lat: null, lng: null }});
  }

  function handleKeyDown(key) {
    if(key === 'ArrowDown') {
      setFocusItem(prev => prev === null ? 0 : prev + 1);
    }
  
    if(key === 'ArrowUp') {
      setFocusItem(prev => prev <= 0 ? null : prev - 1);
    }
  }

  useClickOutside(searchRef, () => {
    setOptionsVisibility(false)
  });

  return (
    <div ref={searchRef} className={`relative ${styles}`}>
      { label && (
        <label style={{ fontWeight: labelWeight || 'normal' }} className="block mb-2 w-full opacity-70 text-sm">
          {label}
        </label>
      )}

      <div className="flex flex-row items-center my-1">
        <input
          type="text"
          className="input w-full"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          disabled={!ready || disabledInput }
          placeholder={placeholder || 'es. Via Enrico De Nicola 61 Cassino'}
          onKeyPress={(e) => e.key === 'Enter' && runEnter()}
          onKeyDown={(e) => handleKeyDown(e.key)}
          onFocus={() => setOptionsVisibility(true)}
          // onBlur={() => setOptionsVisibility(false) }
        />

        { disabledInput
          ? <button className={type} onClick={() => handleClear()}><FiDelete className="text-xl" /></button>
          : <button className={type} onClick={() => setValue(searchInput)}><FiSearch className="text-xl" /></button>
        }
        
        { optionsVisibility && status === 'OK' && data.length !== 0 && (
          <PlacesList
            data={data}
            onSelect={handleSelect}
            focusIndex={focusItem}
          />
        )}
      </div>
    </div>
  )
}