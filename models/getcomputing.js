const axios=require('axios');
const schedule = require('node-schedule');

const token01 = 'Bearer wZGSpBiU3OjaiSYD5LTr2v06dozBAFZa';
const url = 'https://www.dxpool.com/api/pools/ltc/accounts/3832/rates?group_id=';
const url02 = 'http://localhost:3001/api/computing';

function fetchdata(id) {
  const request = axios.get(`${url}${id}`, {
    headers: {
      'Accept': '*/*',
      'Content-Type': 'text/plain',
      'Authorization': token01,
    },
  });
  const dataPromise = (request.then((response) => response.data));
  
  console.log(dataPromise);
  return dataPromise;

}

const rule = new schedule.RecurrenceRule();
rule.second = [0, 10, 30, 50];

function getcomputing(id){
    schedule.scheduleJob(rule, () => {
      fetchdata(id).then((data) => {
        console.log(data);
        console.log(data.total_1m.value);
        let groupname = '';
        if (id === '') {
          groupname = 'All';
          console.log(groupname);
        }
        if(id=== '925') {
          groupname= 'X5S';
          console.log(groupname);
        }
        if(id=== '926') {
          groupname= 'X6';
          console.log(groupname);
        }
        if(id=== '927') {
          groupname= 'X6S';
          console.log(groupname);
        }
        if(id=== '1916') {
          groupname= 'X5';
          console.log(groupname);
        }
        if(id=== '2104') {
          groupname= 'LT5';
          console.log(groupname);
        }
        const computing = {
          group: groupname,
          total_1h: {
            value:data.total_1h.value,
            units:data.total_1h.unit,
          },
          total_5m: {
            value:data.total_5m.value,
            units:data.total_5m.unit,
          },
          total_15m: {
            value:data.total_15m.value,
            units:data.total_15m.unit,
          },
        };
        const request = axios.post(url02, computing);
        return request;
      });
    });
  }

module.exports = getcomputing;