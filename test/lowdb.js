const lowdb = require('lowdb');
const assert = require('assert');

var db = lowdb('db.json');
var users = db.get('users');

assert.equal(users.find({ age: 30}).value()['name'], 'Joohyung');
assert.equal(users.find({ age: 30}).value()['devices'][0], 'Macbook13');

users.add({
  name: 'Jinseung',
  age: 35,
  income: 1000,
  devices: [ 'Macbook13', 'Galaxy' ]
})
