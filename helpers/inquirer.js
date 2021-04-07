const inquirer = require('inquirer');
require('colors');

const preguntas = [

    // Creamos el menu
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear Tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar Tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar Tareas Completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar Tareas Pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar Tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Eliminar Tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
];

const inquirerMenu = async() => {

    console.clear();
    console.log('=========================='.green);
    console.log('  Seleccione una opción  '.white);
    console.log('==========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    
    return opcion;
}

const pausa = async() => {

    const pregunta = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.blue} para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(pregunta);
}

const leerinput = async( message ) => {
    
    // Leemos el input
    const question = [
        {
            type:'input',
            name: 'desc',
            message,
            validate( value ){
                if ( value.length === 0){
                    return 'Por favor ingrese un valor'
                }
                // Todo ok
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}


const listadoBorrarTareas = async( tareas = [] ) => {

    const choices = tareas.map( ( tarea, i ) => {

        const idx = `${i + 1}.`.green;
        return{
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`
        }
    });

    // Agregar una opción cancelar si no quiere borrar nada
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar '
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    const { id } = await inquirer.prompt(preguntas);
    return id;

};

const confirmar = async( mensaje ) => {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            mensaje
        }
    ];

    const { ok } = await inquirer.prompt(pregunta);
    return ok;
};

const mostrarListadoCheck = async( tareas = [] ) => {

    const choices = tareas.map( ( tarea, i ) => {

        const idx = `${i + 1}.`.green;

        return{
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(preguntas);
    return ids;

};

module.exports = {
    inquirerMenu,
    pausa,
    leerinput,
    listadoBorrarTareas,
    confirmar,
    mostrarListadoCheck
}