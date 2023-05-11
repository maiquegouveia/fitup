export default async imageBase64 => {
  let imageUrl;
  try {
    let body = new FormData();
    body.append('key', 'f0fbe7cb625f524b53d190796b79cbc3');
    body.append('image', imageBase64);
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: body,
    });
    const data = await response.json();
    imageUrl = data.data.display_url;
  } catch (error) {
    console.log(error);
  }
  return imageUrl;
};
