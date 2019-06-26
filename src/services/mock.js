import Mock from "mockjs";

let data = []
for (let i = 0; i < 20; i++) {
    let template = {
        'id|+1': 1,
        'title': '@csentence(5,12)',
        'author': '@cname',
        "summary": "@cparagraph"
    }
    data.push(template)
}
Mock.mock('/data/index', 'get', data)