export const apiCall = ({
  path,
  options,
  method,
  headers,
  body,
  callback = (err, res) => {},
}) => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const url = BASE_URL + path;
  options = {
    method: method || "GET",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };
  if (body) options.body = JSON.stringify(body);
  fetch(url, options)
    .then((res) => {
      res
        .json()
        .then((data) => {
          if (data.status === "error") return callback(data);
          if (data.response_code === 200) return callback(null, data);
          throw data;
        })
        .catch((err) => {
          callback(err);
          console.error(err);
        });
    })
    .catch((err) => {
      callback(err);
      console.error(err);
    });
};

export const authApiCall = ({
  path,
  options,
  method,
  headers,
  body,
  callback = (err, res) => {},
}) => {
  const token = localStorage.getItem("token");
  if (token)
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  apiCall({ path, options, method, headers, body, callback });
};
