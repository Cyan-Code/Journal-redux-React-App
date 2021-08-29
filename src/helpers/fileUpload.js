

export const fileUpload = async (file) => {
  const cloudURL = 'https://api.cloudinary.com/v1_1/cyancode/upload'
  const formData = new FormData(); // Buscar documentacion sobre esto !!!!
  formData.append('upload_preset', 'react-journal')
  formData.append('file', file);

  try {
    
    const resp = await fetch(cloudURL, {
      method: 'POST',
      body: formData
    })

    if (resp.ok) {
      const cloudRESP = await resp.json();
      return cloudRESP.secure_url;
    } else {
      throw await resp.json();
    }

  } catch (error) {
    throw error;
  }
}

