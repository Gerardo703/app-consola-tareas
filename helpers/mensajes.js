const { resolve } = require('path');

require('colors');

const mostrarMenu = () => {
    

    return new Promise( resolve => {
        console.clear();
        console.log('=========================='.blue);
        console.log('  Seleccione una opción  '.blue);
        console.log('==========================\n'.blue);


        console.log(`${'1.'.blue} Crear Tarea`);
        console.log(`${'2.'.blue} Listar Tareas`);
        console.log(`${'3.'.blue} Listar Tareas Completadas`);
        console.log(`${'4.'.blue} Listar Tareas Pendientes`);
        console.log(`${'5.'.blue} Completar Tareas`);
        console.log(`${'6.'.blue} Eliminar Tarea`);
        console.log(`${'0.'.blue} Salir \n`);

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout // Muestra los datos en pantalla al usuario
        });

        readLine.question('Seleccione una opción: ', (opt) => {
            readLine.close(); // Cierro el readline luego de ejecutarlo
            resolve(opt);
        });
    })
        
    }

    const pausa = () => {

        return new Promise(resolve => {
            const readLine = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout // Muestra los datos en pantalla al usuario
            });
    
            readLine.question(`\nPresione ${'ENTER'.blue} para continutar\n`, (opt) => {
                readLine.close(); // Cierro el readline luego de ejecutarlo
                resolve();
            });
        })
        
}

module.exports = {
    mostrarMenu,
    pausa
}