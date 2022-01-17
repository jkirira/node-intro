const { v1: uuidv1 } = require('uuid');

function Vehicle(name, wheels, color, capacity){
    this.id = uuidv1(),
    this.name = name,
    this.wheels = wheels,
    this.color = color,
    this.capacity = capacity
}

module.exports = Vehicle