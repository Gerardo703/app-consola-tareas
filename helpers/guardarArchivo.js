const fs = require('fs');

const archivo = './DB/data.json'; // Ruta donde se guardarĂ¡ el archivo

const guardarDB = ( data ) =>  {

    fs.writeFileSync( archivo, JSON.stringify(data)); // Creo el archivo y lo convierto a String
};

const leerDB = () => {
    
    if( !fs.existsSync( archivo ) ){
        return null;
    } 

    const info = fs.readFileSync( archivo, { encoding: 'utf-8' });
    const data = JSON.parse( info );

    //console.log( data );

    return data;
};

module.exports = {
    guardarDB,
    leerDB
};