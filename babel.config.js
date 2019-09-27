module.exports = {
  "presets": [
    ["@babel/env", {
      "modules": false,
      "useBuiltIns": 'usage',
      'corejs': 3
    }],
    "@babel/preset-react"
  ],
  "plugins": [
    "react-hot-loader/babel",
    ["@babel/plugin-proposal-decorators", {
      "legacy": true
    }],
    ["@babel/plugin-proposal-class-properties", {
      "loose": true
    }],
    ["import", {
      "libraryName": "antd-mobile",
      "style": true
    }]
  ]
}