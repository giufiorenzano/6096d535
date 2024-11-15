const baseMethod = (method) => {
  return async (url, body = {}, headers = {}) => {
    const options = {
      method,
      ...headers,
    };

    if (method === "PATCH" && body) options.body = JSON.stringify(body);

    const response = await fetch(url, options);

    return response.json();
  };
};

const request = {
  get: baseMethod("GET"),
  patch: baseMethod("PATCH"),
};

export default request;
