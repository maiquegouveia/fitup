let accessToken; // global variable

const requestFatsecretAuth = async () => {
    try {
      const clientID = "242cc16520fd47fba043c7f5a5792558";
      const clientSecret = "cbf33ff2e43445a3ba5f5e2bc3283136";
      const response = await fetch(
        "https://oauth.fatsecret.com/connect/token",
        {
          method: "POST",
          body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const data = await response.json();
      accessToken = data["access_token"];
    } catch (error) {
      console.log(error);
    }
  };

   const requestFoodInfo = async () => {
    await requestFatsecretAuth()
    try {
      const response = await fetch(
        "https://platform.fatsecret.com/rest/server.api?method=foods.search&search_expression=toast&format=json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },

        }
      );
      const data = await response.json();
      // console.log(data.foods.food[0]);
    } catch (error) {
      console.log(error);
    }
  };

  export default requestFoodInfo