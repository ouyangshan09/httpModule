module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": [
    "standard"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "babel",
    "promise"
  ],
  "rules": {
    "indent": [
      "error",
      4
    ],
    "semi": 0,
    "generator-star-spacing": [
      "error",
      {"before": false, "after": true}
    ]
  }
};
