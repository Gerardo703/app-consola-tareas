const Tarea = require("./tarea");


class Tareas {

    _listado = {
        'abc': 123 
    };

    get listadoArray(){

        const listadoTareas =[];

        // Obtengo las llaves del objeto
        Object.keys(this._listado).forEach( key => {
            
            // Agrego la tarea a listadoTareas
            const tarea = this._listado[key];
            listadoTareas.push( tarea );
        })

        return listadoTareas;

    }

    constructor(){
        this._listado = {}; 
    }

    eliminarTarea ( id = '' ) {
        
        // Eliminar una tarea
        if( this._listado[id]){
            delete this._listado[id];
        }
    };

    cargarTareas( tareas = [] ) {
       
       //Recorremos las tareas y sacamos el id 
       tareas.forEach(tarea => {
           this._listado[tarea.id] = tarea
       }); 

    };


    crearTarea( desc = '' ){

        //Creamos una tarea nueva
        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;
    };

    listadoCompleto() {
        
        console.log();
        //Listado completo de todas las tareas
        this.listadoArray.forEach( (tarea, i) => {
            
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;

            const estado = ( completadoEn )
                                    ? 'Completado'.green
                                    : 'Pendiente'.red;
            console.log(`${ idx } ${ desc } :: ${ estado }`);

        });

    };

    litarPendientesCompletadas( completadas = true ){
        
        console.log();
        let contador = 0;
        //Listar las completadas
        this.listadoArray.forEach( tarea  => {
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
            ? 'Completado'.green
            : 'Pendiente'.red;
            
            if( completadas ){
                // Mostrar Completadas
                if( completadoEn ){
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ completadoEn.green }`);
                }
            } else {
                // Mostrar las pendientes
                if( !completadoEn ){
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ estado }`);
                }
            };
        });
    };

    toggleCompletadas( ids = [] ){

        ids.forEach( id => {

            // Cambiar las pendientes a completadas
            const tarea = this._listado[id];

            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }
        });


        this.listadoArray.forEach( tarea => {

            if( !ids.includes( tarea.id ) ){
                this._listado[tarea.id].completadoEn = null;
            }
        })

    }


};

module.exports = Tareas;