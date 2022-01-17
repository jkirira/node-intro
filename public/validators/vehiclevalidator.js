const vehicle_model = ['name','wheels','color','capacity']

function validateValue(value){
    if (value == undefined || value == null){
        return false
    } else {
        return true
    }
}

function validateLength(value, max_value){
    if (value.length < 1 || (''+value).length > max_value){
        return false
    } else {
        return true
    }
}
    
function validateType(value, value_type){
    if (typeof(value) != value_type){
        return false
    } else {
        return true
    }
}

function nameValidator(input){
    if ( !validateValue(input) ){
        return {"isValid": false, "error": "Name is undefined or null" }
    }
    if ( !validateLength(input, 50) ){
        return {"isValid": false, "error": "Name must be less than or equal to 50 letters"}
    }
    if ( !validateType(input, "string") ){
        return {"isValid": false, "error": "Name must be of type string"}
    }

    return {"isValid": true}
}

function colorValidator(input){
    if ( !validateValue(input) ){
        return {"isValid": false, "error": "Color is undefined or null"}
    }
    if ( !validateLength(input, 10) ){
        return {"isValid": false,  "error": "Color must be less than or equal to 10 letters"}
    }
    if ( !validateType(input, "string") ){
        return {"isValid": false, "error": "Color must be of type string"}
    }

    return {"isValid": true}
}

function wheelsValidator(input){
    if ( !validateValue(input) ){
        return {"isValid": false, "error": "'Wheels' is undefined or null"}
    }
    if ( !validateLength(input, 2) ){
        return {"isValid": false, "error": "Wheels must be less than or equal to 2 digits"}
    }
    if ( !validateType(input, "number") ){
        return {"isValid": false, "error": "Wheels must be of type number"}
    }

    return {"isValid": true}
}

function capacityValidator(input){
    if ( !validateValue(input) ){
        return {"isValid": false, "error": "Capacity is undefined or null"}
    }
    if ( !validateLength(input, 2) ){
        return {"isValid": false, "error": "Capacity must be less than or equal to 2 digits"}
    }
    if ( !validateType(input, "number") ){
        return {"isValid": false, "error": "Capacity must be of type number"}
    }

    return {"isValid": true }
}


function validateRequest(requestBody){

    if( requestBody.hasOwnProperty('id') ){
        return { "isValid": false, "error": "cannot set property id" }
    }

    requestBodyKeys = Object.keys(requestBody)

    for(i=0; i<requestBodyKeys.length; i++){
        if( !vehicle_model.includes(requestBodyKeys[i]) ){
            return { "isValid": false, "error": "vehicle has no property " + requestBodyKeys[i] }
        }
    }
    
    name_res = requestBody.name ? nameValidator(requestBody.name) : { "isValid" : true }
    color_res = requestBody.color ? colorValidator(requestBody.color) : { "isValid" : true }
    wheels_res = requestBody.wheels ? wheelsValidator(requestBody.wheels) : { "isValid" : true }
    capacity_res = requestBody.capacity ? capacityValidator(requestBody.capacity) : { "isValid" : true }

    if ( !name_res.isValid ){
        return name_res
    } else if ( !color_res.isValid ){
        return color_res
    } else if ( !wheels_res.isValid ){
        return wheels_res
    } else if ( !capacity_res.isValid ){
        return capacity_res
    } else {
        return {"isValid": true }
    }
  
}

module.exports = {nameValidator ,colorValidator ,wheelsValidator ,capacityValidator ,validateRequest}
