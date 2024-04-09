async function CreateReserve(dataFetch , token) {
  fetch(`${import.meta.env.VITE_APP_API}reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(dataFetch),
  }).then((response) => {
    if (response.status === 400) {
      const err = response.json();
      throw new Error(err.message);
    }
    if (response.status === 500) {
      const err = response.json();
      throw new Error(err.message);
    }
    if (response.status === 200) {
      const json = response.json();
      return json;
    }
  });
}

export default CreateReserve;