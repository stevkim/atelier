import { useState, useEffect } from 'react';

const useDebounce = (initValue, delay) => {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    const delayedValue = setTimeout(() => {
      setValue(initValue);
    }, delay);

    return () => clearTimeout(delayedValue);
  }, [initValue, delay]);

  return value;
};

export default useDebounce;
