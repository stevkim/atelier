import React, { useState, useEffect } from 'react';

const useDebounce = (initValue, delay) => {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    let delayedValue = setTimeout(() => {
      setValue(initValue);
    }, delay);

    return () => clearTimeout(delayedValue);
  }, [initValue])

  return value;
}

export default useDebounce;