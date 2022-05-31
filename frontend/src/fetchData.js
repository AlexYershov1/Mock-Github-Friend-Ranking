import axios from "axios";
export const getData = async (path, data) => {
  const response = await axios
    .get(path, { params: data, baseURL: "http://localhost:5000" })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      throw Error();
    });
  return response
};
