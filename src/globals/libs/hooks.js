import { useState, useEffect, useRef, useContext, useCallback } from  'react';
// import { useQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { Storage } from "aws-amplify";
import { CognitoContext } from './context';
import queryString from 'query-string';
import { getUrlDataParameters } from '../../checks/libs/helpers';
import { selectCompanyInfo, selectTenant } from '../../company/slices/companyInfoSlice';
import { selectCurrentCompany } from '../../company/slices/companySlice';


// Hook that alerts clicks outside of the passed ref
export function useClickOutside(ref, cb) {
  useEffect(() => {
    // if clicked on outside of element
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        cb();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cb]);
}


// Dark mode
export const useDarkModeTailwind = () => {
  const [theme, setTheme] = useState(localStorage.theme);
  const colorTheme = theme === 'dark' ? 'light' : 'dark';
  
  useEffect(() => {
    const rootElement = window.document.documentElement;
    rootElement.classList.remove(colorTheme);
    rootElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [colorTheme, theme]);

  return [ colorTheme, setTheme ]
}

// Get role from cognito
export const useRole = () => {
  const [ role, setRole ] = useState(null);
  const cognitoUser = useContext(CognitoContext);

  useEffect(() => {
    if(cognitoUser) {
      setRole(() => {
        return cognitoUser.attributes["custom:role"].split('@')[1];
      })
    }
  }, [cognitoUser]);

  return role;
}

// A custom hook that builds on useLocation to parse
// the query string for you.
export function useQueryStringStatusFrom() {
  const [ queryFrom, setQueryFrom ] = useState(null);
  const [ queryStatus, setQueryStatus ] = useState(null);
  const { id: companyId } = useSelector(selectCurrentCompany);
  const { search } = useLocation();

  const getUrlParams = useCallback((search) => {
    getUrlDataParameters(search, (origin, status) => {
      setQueryFrom(origin);
      setQueryStatus(status);
    });
  }, []);

  useEffect(() => {
    getUrlParams(search);
  }, [search, companyId, getUrlParams]);

  return { queryFrom, queryStatus }
}



export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useQueryStringId(param = "id") {
  const query = new URLSearchParams(useLocation().search);
  return query.get(param);
}

// A custom hook used to retrive data from store or if it is not present, query that data on database
export function useDataFinder({ queryStringKey, selector, query, primaryKey }) {
  const queryString = useQuery();
  const dataId = queryString.get(queryStringKey);
  const dataFromStore = useSelector((store) => selector(dataId, store));
  const [ dataFromDb, setDataFromDb ] = useState(null);
  const [ status, setStatus ] = useState(dataFromStore ? "success" : "loading");

  const searchDataById = useCallback(async () => {
    console.log('Hook: data not found - run search on db', dataId, primaryKey);
    const result = await query({ [primaryKey]: dataId });
    setDataFromDb(result);
    setStatus("success");
  }, [dataId, primaryKey, query]);

  useEffect(() => {
    if(!dataFromStore && dataId) searchDataById()
  }, [dataFromStore, dataId, searchDataById])

  return [((dataFromStore || dataFromDb) || null), status ]
}

// Ref for cleanup useEffect for subscriptions and async functions
export function useIsMountedRef(){
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => isMountedRef.current = false;
  });

  return isMountedRef;
}

// Get provenience path by 'from' key in the query string URL
export function useFromPath() {
  const [fromValue, setFromValue] = useState(null);
  const { search } = useLocation();

  useEffect(() => {
    if(search) {
      setFromValue(() => queryString.parse(search).from);
    } else {
      setFromValue(null);
    }
  }, [search]);

  return fromValue;
}

// Calculate loading meter hook by specifing slot and size of the support 
export function useLoadingMeter(inputSlot = 1, inputSize = [80, 120]) {
  const [ loadingMeter, setLoadingMeter ] = useState(0);

  const calculate = useCallback((slot, size) => {
    const calculateLoadingMeter = parseFloat((size.reduce((acc, val) => ((acc / 100) * (val / 100))/2.4) * slot).toFixed(2));
    console.log("Calcolato calculateLoadingMeter", calculateLoadingMeter);
    setLoadingMeter(calculateLoadingMeter);
  }, []);

  // Initial value
  useEffect(() => {
    if(inputSlot && inputSize?.length === 2) {
      console.log("Calcolo in useEffect? Probabile init", { inputSlot, inputSize });
      calculate(inputSlot, inputSize);
    }
  }, [inputSlot, inputSize, calculate]);

  return [ loadingMeter, (inputSlot = 1, inputSize = [ 80, 120 ]) => {
    if(inputSlot  && inputSize?.length === 2) {
      console.log("Ricalcolo attivo", { inputSlot, inputSize });
      calculate(inputSlot, inputSize);
    }
  }];
}

// Hook to retrive data from S3
export function useGetUrlFile (initialData = null) {
  const [ loading, setLoading ] = useState(true);
  const [ data, setData ] = useState(initialData);
  const [ signedUrl, setSignedUrl ] = useState(null);

  const getFileUrlData = useCallback(() => {
    if(!data) {
      setLoading(false);
      setSignedUrl(null);
      return null
    };

    // Fetch signed document url from S3 Storage
    const identityId = data?.authorIdentityId || data.identityId;
    const key = data.key;
    const bucket = data.bucket;
    const filename = data?.filename || data.key;

    // Exit early on missing parameters
    if (!identityId || !key || !bucket || !filename) return;
    // Storage config object
    const configs = {
      level: 'protected',       // level
      identityId: identityId,   // identityId
      download: false           // download
    };
    // Get file from S3 Storage
    Storage.get(key, configs).then(url => {
      setSignedUrl(url);
      setLoading(false);
    }).catch(e => {
      console.error('Error during Storege.get hook', e);
      setLoading(false);
    });
  }, [data?.authorIdentityId, data?.key, data?.bucket, data?.filename, data?.identityId]);

  useEffect(() => {
    getFileUrlData();
  }, [getFileUrlData]);

  return { fileUrl: signedUrl, setData, isLoading: loading };
}

export function useGetDownload (initialData = null) {
  const [ loading, setLoading ] = useState(true);
  const [ data, setData ] = useState(initialData);
  const [ signedUrl, setSignedUrl ] = useState(null);

  const getFileUrlData = useCallback(() => {
    if(!data) {
      setLoading(false);
      return null
    };

    // Fetch signed document url from S3 Storage
    const identityId = data?.authorIdentityId || data.identityId;
    const key = data.key;
    const bucket = data.bucket;
    const filename = data?.filename || data.key;
    // Exit early on missing parameters
    if (!identityId || !key || !bucket || !filename) return;
    // Storage config object
    const configs = {
      level: 'protected',       // level
      identityId: identityId,   // identityId
      download: true           // download
    };
    // Get file from S3 Storage
    Storage.get(key, configs).then(url => {
      setSignedUrl(url)
    });
    
    setLoading(false);
  }, [data?.authorIdentityId, data?.key, data?.bucket, data?.filename, data?.identityId]);

  useEffect(() => {
    getFileUrlData();
  }, [getFileUrlData]);

  return { blob: signedUrl?.Body, setData, isLoading: loading };
}

// Di seguito un hook non funzionate / mai testato:
export function useGetUrlFiles (initialData = []) {
  const [ loading, setLoading ] = useState(true);
  const [ data, setData ] = useState(initialData);
  const [ signedUrl, setSignedUrl ] = useState(null);
  let file_stack = [];

  const getFileUrlData = useCallback(() => {
    if(!data || data?.length <= 0) {
      setLoading(false);
      setSignedUrl(null);
      return null
    };

    for(let item of data) {
      // Fetch signed document url from S3 Storage
      const identityId = item?.authorIdentityId || item.identityId;
      const key = item.key;
      const bucket = item.bucket;
      const filename = item.filename || item.key;

      // Exit early on missing parameters
      if (!identityId || !key || !bucket || !filename) return;

      // Storage config object
      const configs = {
        level: 'protected',       // level
        identityId: identityId,   // identityId
        download: false           // download
      };

      // Get file from S3 Storage
      Storage.get(key, configs).then(url => {
        // setSignedUrl(url)
        file_stack.push({ ...item, url });
      });
    }

    if(file_stack?.length > 0) {
      setSignedUrl(file_stack);
    }

    setLoading(false);
  }, [data]);

  useEffect(() => {
    getFileUrlData();
  }, [getFileUrlData]);

  return { fileUrl: signedUrl, setData, isLoading: loading };
}

// Use infinite scroll
export const isValidNotEmptyArray = (array) => {
  return !!(array && array?.length && array?.length > 0)
};

const useInfiniteScroll = (useGetDataListQuery, { ...queryParameters }) => {
  const [ localPage, setLocalPage ] = useState(1);
  const [ combinedData, setCombinedData ] = useState({});
  const queryResponse = useGetDataListQuery({
    nextToken: localPage === 1 ? undefined : localPage,
    ...queryParameters
  });

  const {
    ids: fetchIds = [],
    entities: fetchEntities = {},
    nextToken: remotePage = 1,
  } = queryResponse?.data || {}

  useEffect(() => {
    if (isValidNotEmptyArray(fetchIds)) {
      if (localPage === 1) setCombinedData({ ids: fetchIds, entities: fetchEntities });
      else if (localPage !== remotePage) {
        setCombinedData((previousData) => ({
          ids: previousData.ids.concat(fetchIds),
          entities: {...previousData.entities, ...fetchEntities }}
        ))
      }
    }
  }, [fetchIds]);

  const refresh = useCallback(() => {
    setLocalPage(1);
  }, []);

  const readMore = () => {
    if (remotePage && (localPage !== remotePage)) {
      setLocalPage(remotePage);
    }
  };

  const isNext = remotePage && remotePage !== 1 && remotePage !== localPage;

  return {
    combinedData,
    localPage,
    readMore,
    refresh,
    isLoading: queryResponse?.isLoading,
    isFetching: queryResponse?.isFetching,
    isNext
  };
};

export default useInfiniteScroll;