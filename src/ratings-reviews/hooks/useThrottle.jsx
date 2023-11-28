import { useCallback } from 'react';

const useThrottle = (fn, delay) => {
  let inputs = null;
  let called = null;

  const throttle = useCallback((...args) => {
    const wait = () => {
      if (inputs) {
        fn.apply(this, inputs);
        inputs = null;
        called = setTimeout(wait, delay);
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
