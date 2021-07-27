const axios = require("axios");

const token = "Bearer wZGSpBiU3OjaiSYD5LTr2v06dozBAFZa";
const url = "https://www.dxpool.com/api/pools/ltc/accounts/3832/rates?group_id=";
const url02 = "http://localhost:3001/api/computing";
const id = "";

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

function fetchdata(id, url, token) {
  const request = axios.get(`${url}${id}`, {
    headers: {
      Accept: "*/*",
      "Content-Type": "text/plain",
      Authorization: token,
    },
  });
  const dataPromise = request.then((response) => response.data);

  console.log(dataPromise);
  return dataPromise;
}
fetchdata(id, url, token).then((data) => {
  console.log(data);
  console.log(data.total_5m.value);
  let groupname = "";
  if (id === "") {
    groupname = "All";
    console.log(groupname);
  }
  if (id === "925") {
    groupname = "X5S";
    console.log(groupname);
  }
  if (id === "926") {
    groupname = "X6";
    console.log(groupname);
  }
  if (id === "927") {
    groupname = "X6S";
    console.log(groupname);
  }
  if (id === "1916") {
    groupname = "X5";
    console.log(groupname);
  }
  if (id === "2104") {
    groupname = "LT5";
    console.log(groupname);
  }
  const computing = {
    group: groupname,
    total_1h: {
      value: data.total_1h.value,
      units: data.total_1h.unit,
    },
    total_5m: {
      value: data.total_5m.value,
      units: data.total_5m.unit,
    },
    total_15m: {
      value: data.total_15m.value,
      units: data.total_15m.unit,
    },
  };
  console.log("final");
  const request = axios.post(url02, computing);
  return request;
});
