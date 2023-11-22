export const convertFilesToDataURL = async(e) => {
  let files = Array.from(e.target.files);
  console.log(files)
  if (files.length > 5) {
    e.target.value = '';
    return alert('Maximum of 5 pictures!');
  }
  const results = await Promise.all(files.map(file => {
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