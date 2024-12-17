// 모듈명이 카멜케이스인 경우 주석처럼 한듯함
import camelCase from 'lodash/camelCase'
const requireModule = require.context('.', false, /\.js$/) // Get js files inside routes folder
const modules = {}

requireModule.keys().forEach(fileName => {
    // Avoid the index.js file
    if (fileName === './index.js') {
        return;
    }

    const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''))
    modules[moduleName] = requireModule(fileName).default
})

export default modules
