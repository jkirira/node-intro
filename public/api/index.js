const express = require('express');
const path = require('path');
const Vehicle = require('../models/models');
const {validateVehicle} = require('../validators/vehiclevalidator')
const app =  express();


var vehicles = Array();

vehicle1 = new Vehicle("Toyota Corolla", 4, "White", 4)
vehicle1.id = 0
vehicles.push(vehicle1);

vehicle2 = new Vehicle("Mitsubishi", 4, "Yellow", 5)
vehicle2.id = 1
vehicles.push(vehicle2);




app.use(express.json());



app.get('/', (req, res) => {
    res.json(vehicles);
})




app.get('/vehicles', (req, res) => {
    res.json(vehicles);
})




app.get('/vehicles/:vehicleId', (req, res) => {
    if( !req.params.vehicleId || isNaN(req.params.vehicleId) ){
        res.status(400).json({ 'error': 'Not a number', })
    }

    var findVehicle = vehicles.find( vehicle => vehicle.id == req.params.vehicleId )
    
    if ( findVehicle ){
        res.json(findVehicle);
    } else {
        res.status(404).json({ 'error': 'Vehicle Not Found', })
    }
})




app.post('/vehicles', (req, res) => {
    console.log( typeof(validateVehicle(req.body)) )
    
    if( validateVehicle(req.body).isValid ) {
        v = new Vehicle(req.body.name, req.body.wheels, req.body.color, req.body.capacity)
        v.id = vehicles.length;
        vehicles.unshift(v)
        res.json(v)
    } else {
        res.status(400).json({ 'error': validateVehicle(req.body).error, })
    }
    
})



app.put('/vehicles/:vehicleId', (req, res) => {

    if( !req.params.vehicleId || req.params.vehicleId == null ){
        res.status(400).json({ 'error': 'Not a number', })
    }

    var findVehicle = vehicles.find( vehicle => vehicle.id == req.params.vehicleId )

    if ( findVehicle ){

        if(req.body.id){
            res.status(400).json({'error': 'Cannot set property id'})
        }

        findVehicle.name = req.body.name ? req.body.name : findVehicle.name;
        findVehicle.color = req.body.color ? req.body.color : findVehicle.color;
        findVehicle.wheels = req.body.wheels ? req.body.wheels : findVehicle.wheels;
        findVehicle.capacity = req.body.capacity ? req.body.capacity : findVehicle.capacity;


        if( validateVehicle(req.body).isValid ) {
            
            v.id = vehicles.length;
            vehicles.unshift(v)
            res.json(v)
        } else {
            res.status(400).json({ 'error': validateVehicle(req.body).error, })
        }

        res.status(200).json(findVehicle)

    } else {
        res.status(404).json({ 'error': 'Vehicle Not Found',})
    }
})




app.delete('/vehicles/:vehicleId', (req, res) => {

    if( !req.params.vehicleId || isNaN(req.params.vehicleId) ){
        res.status(400).json({ 'error': 'Not a number', })
    }

    var findVehicle = vehicles.find( vehicle =>  vehicle.id == req.params.vehicleId )
    //res.json(findVehicle)

    if ( findVehicle ){
        vehicles = vehicles.filter(vehicle => vehicle.id != findVehicle.id);
        res.json(vehicles);
    } else {
        res.status(404).json({ "error": "Vehicle not Found", })
    }  
})


app.listen(3333, ()=>{
    console.log('Application Listening on port 3333');
})