require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerinput,
        listadoBorrarTareas,
        confirmar,
        mostrarListadoCheck
} = require('./helpers/inquirer');


const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');


const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if( tareasDB ){ // Cargar tareas 
        tareas.cargarTareas( tareasDB );
    }

    do {    

        //Imprimir el Menú
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
               // Crear Opción
               const desc = await leerinput('Descripción:');
               tareas.crearTarea(desc); 
            break;

            case '2':
                // Listado de las opciones
                tareas.listadoCompleto();
            break

            case '3':
                // Listar Completadas
                tareas.litarPendientesCompletadas(true);
            break

            case '4':
                // Listar Pendientes
                tareas.litarPendientesCompletadas(false);
            break

            case '5':
                // Seleccionar Completar
                const ids = await mostrarListadoCheck( tareas.listadoArray );
                tareas.toggleCompletadas( ids );
               
            break

            case '6':
                // Eliminar Tarea
                const id = await listadoBorrarTareas( tareas.listadoArray ) // Donde tengo las tareas
                if( id !== '0' ){
                    const ok = await confirmar('¿Estás seguro?');

                    // TODO: Confirmación
                    if( ok ){
                        tareas.eliminarTarea( id );
                        console.log();
                        console.log('Tarea Eliminada Correctamente');
                    }
                }
            break
        }

        guardarDB( tareas.listadoArray ); // Guardo el Arreglo de las tareas en el archivo .txt

        await pausa();

    } while (opt !== '0');

}

main();