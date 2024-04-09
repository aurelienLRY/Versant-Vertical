async function GetReserve() {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API}reservations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
  
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
      }
  
      const json = await response.json();
      console.log("response", json);
      return json;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }
  
  export default GetReserve;