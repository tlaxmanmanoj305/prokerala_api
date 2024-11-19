const fetch = require("node-fetch");

exports.handler = async (event) => {
  const clientId = "a23f270a-014b-4b7d-8121-d2580c98933e";
  const clientSecret = "30nXzJvTj8LBpeJNqzzS7dk8DySvmpWTlqh2kmm0";

  try {
    // Get the access token
    const tokenResponse = await fetch("https://api.prokerala.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });
    const tokenData = await tokenResponse.json();

    // Fetch Panchang data
    const apiResponse = await fetch(
      "https://api.prokerala.com/v2/astrology/panchang?date=2024-11-19&latitude=12.9716&longitude=77.5946",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );
    const panchangData = await apiResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify(panchangData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
