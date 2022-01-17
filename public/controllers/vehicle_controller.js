const Vehicle = require('../models/vehicle_model');
const {validateRequest} = require('../validators/vehiclevalidator')

var vehicles = Array();

vehicle1 = new Vehicle("Toyota Corolla", 4, "White", 4)
// vehicle1.id = 0
vehicles.push(vehicle1);

vehicle2 = new Vehicle("Mitsubishi", 4, "Yellow", 5)
// vehicle2.id = 1
vehicles.push(vehicle2);



function getVehicles(req, res){
    res.json(vehicles);
}

function getVehicle(req, res){

    var findVehicle = vehicles.find( vehicle => vehicle.id == req.params.vehicleId )
    
    if ( findVehicle ){
        res.json(findVehicle);
    } else {
        res.status(404).json({ 'error': 'Vehicle Not Found', })
    }
}

function addVehicle(req, res){
    // console.log( typeof(validateRequest(req.body)) )
    
    if( validateRequest(req.body).isValid ) {
        let v = new Vehicle(req.body.name, req.body.wheels, req.body.color, req.body.capacity)
        vehicles.unshift(v)
        res.json(v)
    } else {
        res.status(400).json({ 'error': validateRequest(req.body).error, })
    }
    
}

function updateVehicle(req, res){

    var findVehicle = vehicles.find( vehicle => vehicle.id == req.params.vehicleId )

    if ( findVehicle ){

        if( validateRequest(req.body).isValid ) {
            
            Object.keys(req.body).forEach(key => {
                findVehicle[key] = req.body[key]
            })

        } else {
            res.status(400).json({ 'error': validateRequest(req.body).error, })
        }

        res.status(200).json(findVehicle)

    } else {
        res.status(404).json({ 'error': 'Vehicle Not Found',})
    }
}

function searchByName(req, res){

    searchResults = vehicles.filter( (vehicle) => vehicle.name.trim() == req.params.vehicleName.trim() )
    
    if ( searchResults.length > 0 ){
        res.json(searchResults);
    } else {
        res.status(404).json({ 'error': 'Vehicle Not Found', })
    }
}

function searchByColor(req, res){

    var searchResults = vehicles.filter( vehicle => vehicle.color == req.params.vehicleColor )
    
    if ( searchResults.length > 0 ){
        res.json(searchResults);
    } else {
        res.status(404).json({ 'error': 'Vehicle Not Found', })
    }
}

function deleteVehicle(req, res){

    var findVehicle = vehicles.find( vehicle =>  vehicle.id == req.params.vehicleId )

    if ( findVehicle ){
        vehicles = vehicles.filter(vehicle => vehicle.id != findVehicle.id);
        res.json(vehicles);
    } else {
        res.status(404).json({ "error": "Vehicle not Found", })
    }  
}

module.exports = {vehicles, getVehicle, getVehicles, addVehicle, updateVehicle, deleteVehicle, searchByColor, searchByName}