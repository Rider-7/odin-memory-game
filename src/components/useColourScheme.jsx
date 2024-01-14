import { useEffect, useState, useRef } from 'react';
import distinctColours from '../distinct-colours.json';

// NOTE: Be careful of difference in spelling of 'colour' and 'color'.
export default function useColourScheme(useAPI, hex, mode, count, JSONProcessor) {
  const [isLoading, setIsLoading] = useState('true');
  const [error, setError] = useState(null);
  const [nextScheme, setNextScheme] = useState(null);
  const schemeURL = useRef(`https://www.thecolorapi.com/scheme?hex=${hex}&format=json&mode=${mode}&count=${count}`);

  function responseHandler(response) {
    if (response.status >= 400) {
      throw new Error(`Error Code: ${response.status} - ${response.statusText}}`);
    }
    return response.json();
  }

  useEffect(() => {
    console.log('Effect Runs.');
    if (useAPI) {
      fetch(schemeURL.current, { mode: 'cors' })
        .then((response) => responseHandler(response))
        .then((json) => {
          const obj = JSONProcessor(useAPI, json);
          setNextScheme(obj);
        })
        .catch((e) => setError(e))
        .finally(() => setIsLoading(false));
    } else {
      const obj = JSONProcessor(useAPI, distinctColours);
      setNextScheme(obj);
      setIsLoading(false);
    }
  }, [JSONProcessor, useAPI]);

  return { nextScheme, isLoading, error };
}
