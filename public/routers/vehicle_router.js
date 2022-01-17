const {vehicles, getVehicle, getVehicles, addVehicle, updateVehicle, deleteVehicle, searchByColor, searchByName} = require('../controllers/vehicle_controller')
const express = require('express')
const router = express.Router()

/**
 * @swagger
 * /vehicles:
 *  get:
 *   description: Use to retrieve all vehicles
 *   responses:
 *    '200':
 *     description: Success
 */
router.get('/', getVehicles)


// router.get('/vehicles', getVehicles)


router.get('/:vehicleId', getVehicle)

router.get('/search/name=:vehicleName', searchByName)

router.get('/search/?color=:vehicleColor', searchByColor)


router.post('/', addVehicle)


router.put('/:vehicleId', updateVehicle)


router.delete('/:vehicleId', deleteVehicle)


module.exports = router