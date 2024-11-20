const baseMethod = (method) => {
  return async (url, body = {}, json = true) => {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (method === "PATCH" && body) options.body = JSON.stringify(body);

    const response = await fetch(url, options);

    if(json) return response.json();

    return response.text()
  };
};

const request = {
  get: baseMethod("GET"),
  patch: baseMethod("PATCH"),
};

export default request;
