import { useCallback } from 'react';

const useThrottle = (fn, delay) => {
  let inputs = null;
  let called = null;

  const throttle = useCallback((...args) => {
    const wait = () => {
      if (inputs) {
        fn.apply(this, inputs);
        inputs = null; // eslint-disable-line
        called = setTimeout(wait, delay); // eslint-disable-line
      } else {
        called = null;
      }
    };

    if (!called) {
      fn.apply(this, args);
      called = setTimeout(wait, delay);
    } else {
      inputs = args;
    }
  }, [fn, delay]);

  return throttle;
};

export default useThrottle;
