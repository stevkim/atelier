const rotatingSlice = (arr, initialIndex, theta) => {
  const slice = arr.slice(initialIndex, Math.min(initialIndex + theta, arr.length));
  for (let i = 0; slice.length < Math.min(theta, arr.length); i++) {
    slice.push(arr[i]);
  }
  return slice;
};

export default rotatingSlice;
