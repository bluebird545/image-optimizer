const BASE_URL = `http://localhost:8000`;

export const optimizeImages = async(files: any, quality: string, width: string, height: string, format: string) => {
  const query = new URLSearchParams({
    quality,
    ...(width && { width }),
    ...(height && { height }),
    ...(format && { format })
  });

  const url = `${BASE_URL}/optimize?${query.toString()}`;
  
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i].originalFile);
  }

  const requestOptions = {
    method: 'POST',
    'Content-Type': 'application/json',
    body: formData,
  };

  return fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result.recordKey;
    })
    .catch(error => console.log('error', error));
}

export const downloadImages = async (recordKey: string) => {
  const requestOptions = {
    method: 'GET'
  };

  return await fetch(`http://localhost:8000/download?recordKey=${recordKey}`, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network error');
      }
      return response.arrayBuffer();
    })
    .then(result => result)
    .catch(err => {
      throw Error('Failed to download image(s)');
    })
}