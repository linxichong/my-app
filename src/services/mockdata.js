import Mock from "mockjs";

let template = {'list|20': [{
    'id|+1': 1,
    'title': '@csentence(5,12)',
    'author': '@cname',
    "summary": "@cparagraph"
}]}
Mock.mock('/data', template)