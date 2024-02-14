import { useState, useEffect } from 'react';

const useDebounce = (initValue, delay) => {
  const [value, setValue] = useState(initValue);

  // debounces the new value for 'delay' time
  useEffect(() => {
    const delayedValue = setTimeout(() => {
      setValue(initValue);
    }, delay);

    // clean up to prevent multiple timeouts
    return () => clearTimeout(delayedValue);
  }, [initValue, delay]);

  return value;
};

export default useDebounce;
