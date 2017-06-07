const _ = require('lodash');
const assert = require('assert');

var companies = [
  {
    name: 'onestore',
    member: [
      'Jin, Heonkyu',
      'Song, Jinseok'
    ]
  },
  {
    name: 'line',
    member: [
      'Park, Joohyung',
      'Lee, Jinseung'
    ]
  }
];

console.log(_.find(companies, { name: 'onestore' }));

//assert.equal(_.find(companies, { name: 'onestore' }).map('name'), 'onestore');
