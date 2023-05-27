export default async (userId, fieldName, fieldType, newValue) => {
  try {
    const response = await fetch(
      `https://fitup-api-production.up.railway.app/api/v1/users/${userId}/fieldName/${fieldName}/newValue/${newValue}/type/${fieldType}`,
      {
        method: 'PATCH',
      }
    );
    if (response.status === 500) {
      const data = await response.json();
      return { status: 500, errorCode: data.errorCode };
    } else if (response.status === 204) {
      return { status: 204 };
    }
  } catch (err) {
    console.log(err);
  }
};
