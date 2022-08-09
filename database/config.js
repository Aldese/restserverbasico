const mongoose = require('mongoose');


const dbConnexion = async() => {

    try {
        
        await mongoose.connect(process.env.MONGODB_CNN,{
            
        });

        console.log('BD online');
        
    } catch (error) {
        throw new Error ('Error al iniciar la DB');
    }



}


module.exports = {
    dbConnexion
}