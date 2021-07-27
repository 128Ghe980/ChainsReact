console.log('heelo');
const express = require('express')
require('dotenv').config()
const app = express()
const cors =require('cors')
const Observer=require('./models/observer');
const Computing=require('./models/computing');
var getMydata = require('./models/getdata');
var getMycomouting =require('./models/getcomputing');
var proxy = require('http-proxy-middleware');
const { response } = require('express');
const schedule = require('node-schedule');
//getmydata=new getMydata();
/* const sourcecomputingurl01 = process.env.sourcecomputingurl;
const postcomputingurl01 = process.env.postcomputingurl;
const token01= process.env.token01; */
const sourcecomputingurl01 = process.env.sourcecomputingurl;
const postcomputingurl01 = process.env.postcomputingurl;
const token01= process.env.token01;

app.use('/api/pools', proxy.createProxyMiddleware({target: 'https://www.dxpool.com',changeOrigin: true,
pathRewrite: {
  '^api/pools/ltc/accounts/3832/miners/stats?group_id=': 'api/pools/ltc/accounts/3832/miners/stats?group_id=',
},}));
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
}
  
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body) 
  console.log('---')
  next()
}
  
app.use(requestLogger)

app.get('/api/counts',(request,response)=>{
  Observer.find({}).then(observers => {
    response.json({count:observers.length});
    console.log({count:observers.length});
  })
})

app.get('/api/observers/:id',(request, response) => {
  Observer.find({}).sort({date:-1}).limit(5).skip(Number(request.params.id)).then(observers => {
    response.json({results:observers});
    console.log({result:observers});
    console.log(observers.length);

    //response.json(observers);
  })
})

app.get('/api/observers',(request, response) => {
  Observer.find({}).sort({date:-1}).then(observers => {
    response.json({results:observers});
    console.log({result:observers});
    console.log(observers.length);

    //response.json(observers);
  })
})

app.get('/api/observers/:group/:num',(request, response) => {
  Observer.find({group: request.params.group}).sort({date:-1}).limit(Number(request.params.num)).then(observers => {
    response.json({results:observers});
    console.log({result:observers});
    console.log(observers.length);

    //response.json(observers);
  })
})

app.get('/api/computing/:group/:num',(request, response) => {
  Computing.find({group: request.params.group}).sort({date:-1}).limit(Number(request.params.num)).then(computing => {
    response.json({results:computing});
    console.log({result:computing});
    console.log(computing.length);

    //response.json(observers);
  })
})

app.get('/api/computing',(request, response) => {
  Computing.find({}).sort({date:-1}).then(computing => {
    response.json({results:computing});
    console.log({result:computing});
    console.log(computing.length);

    //response.json(observers);
  })
})



/* app.get('api/pools/ltc/accounts/3832/miners/stats?group_id=',function(req,res){
  res.send('sss');
}) */

/* app.get('/api/observers/:id',(request,response,next)=>{
  Observer.findById(request.params.id)
    .then(observer => {
      if (observer) {
      response.json(observer)
      } else {
        response.status(404).end()
      }

    })
    .catch(error => next(error))
}) */

app.post('/api/observers',(request,response,next)=>{
  const body=request.body;
  /* var myDate = new Date();
  console.log(myDate.toLocaleString( )); */

  const observer =new Observer({
    group: body.group,
    date: new Date(),
    active: body.active,
    dead: body.dead,
    inactive: body.inactive,
    total: body.total,
  })
  observer.save()
     .then(savedObserver =>{
       response.json(savedObserver.toJSON())
     })
     .catch(error => next(error))
})

app.post('/api/computing',(request,response,next)=>{
  const body=request.body;

  const computing =new Computing({
    group: body.group,
    date: new Date(),

    total_1h: {
      value:body.total_1h.value,
      units:body.total_1h.units,
    },
    total_5m: {
      value:body.total_5m.value,
      units:body.total_5m.units,
    },
    total_15m: {
      value:body.total_15m.value,
      units:body.total_15m.units,
    },
    
  })
  computing.save()
     .then(savedComputing =>{
       response.json(savedComputing.toJSON())
     })
     .catch(error => next(error))
})

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

const rule = new schedule.RecurrenceRule();
rule.second = [0, 10, 30, 50];
const groupAll='';
const groupX5S='925';
const groupX6='926'
const groupX6S='927'
const groupX5='1916'
const groupLT5='2104'

getMydata(groupAll);
getMydata(groupX5S);
getMydata(groupX6);
getMydata(groupX6S);
getMydata(groupX5);
getMydata(groupLT5);

getMycomouting(groupAll);
getMycomouting(groupX5S);
getMycomouting(groupX6);
getMycomouting(groupX6S);
getMycomouting(groupX5);
getMycomouting(groupLT5);
//getMycomouting(groupAll,sourcecomputingurl01,postcomputingurl01,token01);

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})