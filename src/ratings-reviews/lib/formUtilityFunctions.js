export const convertFile = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    resolve(reader.result);
  };
  reader.onerror = (err) => {
    reject(err);
  };
});

export const convertFilesToDataURL = async (files) => {
  const listOfFiles = Array.from(files);
  if (listOfFiles.length > 5) {
    throw new Error('Maximum of 5 pictures!');
  }
  const results = await Promise.all(listOfFiles.map((file) => convertFile(file)));
  return results;
};

export const postRequirements = (data) => {
  const values = Object.values(data);
  for (let i = 0; i < values.length; i++) {
    if (!!values[i] === false) {
      return false;
    }
  }
  return true;
};
