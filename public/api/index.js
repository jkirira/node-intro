const express = require('express');
const path = require('path');
const vehicleRoutes = require('../routers/vehicle_router')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')


const app =  express();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Vehicle API',
            description: 'Vehicles',
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: 'Development Server'
            }
        ],
},
    apis: ["../routers/*.js"]
}


const swaggerDocs = swaggerJsDoc(swaggerOptions)
// console.log(swaggerDocs)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(express.json());


app.use('/vehicles', vehicleRoutes);


app.listen(4000, ()=>{
    console.log('Application Listening');
})