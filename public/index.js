const express = require('express');
const path = require('path');
const app =  express();

const vehicles = Array();

function Vehicle(name, wheels, color, capacity){
    this.id = vehicles.length
    this.name = name,
    this.wheels = wheels,
    this.color = color,
    this.capacity = capacity
}

vehicle1 = new Vehicle("Toyota Corolla", 4, "White", 4)
vehicles.push(vehicle1);
vehicle2 = new Vehicle("Mitsubishi", 4, "Yellow", 5)
vehicles.push(vehicle2);

function vehicleInArray(index){
    if ( index <= vehicles.length-1 ) {
        return true;
    } else {
        return false;
    }
}

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
})

app.get('/vehicles', (req, res) => {
    res.json(vehicles);
})

app.get('/vehicles/:vehicleId', (req, res) => {
    if( !req.params.vehicleId || isNaN(req.params.vehicleId) ){
        res.status(400).json({ 'error': 'Not a number', })
    }
    
    if ( vehicleInArray(req.params.vehicleId) ){
        res.json(vehicles[req.params.vehicleId]);
    } else {
        res.status(404).json({ 'error': 'Not Found', })
    }
})

app.post('/vehicles', (req, res) => {
    if (req.body.name) {
        
        v = new Vehicle(req.body.name, req.body.wheels, req.body.color, req.body.capacity)
        vehicles.push(v)
        res.json(vehicles)

    } else {
        res.status(400).json({
            'error': 'Vehicle needs atleast a name', 
        })
    }
    
})

app.put('/vehicles/:vehicleId', (req, res) => {
    if( !req.params.vehicleId || isNaN(req.params.vehicleId) ){
        res.status(400).json({ 'error': 'Not a number', })
    }

    if ( vehicleInArray(req.params.vehicleId) ){
        
        v_id = req.params.vehicleId
        v = vehicles[v_id]

        Object.keys(req.body).forEach(key => {
            v[key] = req.body[key]
        });
        res.json(v)

    } else {
        res.status(404).json({
            'error': 'Not Found', 
        })
    }
})

app.delete('/vehicles/:vehicleId', (req, res) => {

    if( !req.params.vehicleId || isNaN(req.params.vehicleId) ){
        res.status(400).json({ 'error': 'Not a number', })
    }

    if ( vehicleInArray(req.params.vehicleId) ){
        vehicles.splice(v_id, 1);
        res.json(vehicles);
    } else {
        res.json({
            "error": "Could not remove vehicle"
        })
    }  
})


app.listen(3333, ()=>{
    console.log('Application Listening on port 3333');
})