const express = require('express');   //引入express
const Mock = require('mockjs');       //引入mock

const app = express();        //实例化express

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

app.listen('8090', () => {
    console.log('监听端口 8090')
})