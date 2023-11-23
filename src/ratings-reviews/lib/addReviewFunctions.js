export const convertFilesToDataURL = async(files) => {
  let listOfFiles = Array.from(files.target.files);
  if (listOfFiles.length > 5) {
    files.target.value = '';
    return alert('Maximum of 5 pictures!');
  }
  const results = await Promise.all(listOfFiles.map(file => {
    return convertFile(file);
  }));
  return await results;
}

const convertFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      resolve(reader.result);
    }
    reader.onerror = function(err) {
      console.log(err)
      reject(err);
    }
  })
}

export const postRequirements = (data) => {
  for (let key in data) {
    if (!!data[key] === false) {
      return false;
    }
  }
  return true;
}