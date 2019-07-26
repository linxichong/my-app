const express = require('express');   //引入express
const Mock = require('mockjs');       //引入mock

const app = express();        //实例化express
// const createError = require('http-errors')

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
})

app.get('/api/novels', (req, res) => {
  res.json(Mock.mock({
    "novel|20": [{
      'id|+1': 1,
      'title': '@csentence(5,12)',
      'author': '@cname',
      "summary": "@cparagraph"
    }],
  }));
})

// app.post('/api/checklock', (req, res) => {
//   if (req.query.uketukeBng !== "1" && req.query.email !== "1@163.com") {
//     res.json({
//       result: 0
//     });
//   } else {
//     res.json({
//       result: 1
//     });
//   }
// })

app.listen('8000', () => {
  console.log('监听端口 8000')
})
