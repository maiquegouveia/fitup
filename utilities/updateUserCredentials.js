// https://fitup-api-production.up.railway.app/api/v1/users/find/userId

export default async userId => {
  try {
    const response = await fetch(`https://fitup-api-production.up.railway.app/api/v1/users/find/${userId}`);
    const data = await response.json();
    if (response.ok) return data.data[0];
    else return {};
  } catch (err) {
    console.log(err);
  }
};
