import { useEffect, useState, useRef } from 'react';

// NOTE: Be careful of difference in spelling of 'colour'.
export default function useColourScheme(hex = '0047AB', mode = 'analogic') {
  const [isLoading, setIsLoading] = useState('true');
  const [error, setError] = useState(null);
  const [scheme, setScheme] = useState(null);
  const schemeURL = useRef(`https://www.thecolorapi.com/scheme?hex=${hex}&format=json&mode=${mode}&count=6`);

  useEffect(() => {
    fetch(schemeURL.current, { mode: 'cors' })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error(`Error Code: ${response.status} - ${response.statusText}}`);
        }
        return response.json();
      })
      .then((json) => {
        const arr = json.colors;
        const obj = Object.fromEntries(
          arr.map((colour) => [colour.hex.value, {
            hex: colour.hex.value,
            name: colour.name.value,
            isClicked: false,
          }]),
        );
        setScheme(obj);
      })
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));
  }, []);

  return { scheme, isLoading, error };
}
