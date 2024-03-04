const express = require ('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');

const url = 'mongodb://localhost/Mongodb1'


mongoose.connect(url)

.then (( ) => console.log(' Conectado en la base de datos'))
.catch((e)=> console.log('error en la conceccion' + e))



const personaSchema = mongoose.Schema({
    nombre  : String ,
    edad : Number,
    pais : String 
})

const PersonaModel = mongoose.model('personas',personaSchema)

//Mostrar 

const mostrar = async () => {
    const personas = await PersonaModel.find()
    console.log(personas)
}

mostrar()


// Crear 

const crear = async () => {
    const personaExistente = await PersonaModel.findOne({ nombre: 'maricarmen' });
    if (personaExistente) {
        console.log('La persona ya existe.');
    } else {
        const persona = new PersonaModel({
            nombre: 'maricarmen',
            edad: 45,
            pais: 'madagascard'
        });
        const resultado = await persona.save();
        console.log(resultado);
        console.log('Persona creada correctamente.');
    }
}


crear()


//Actualizar 

const actualizar = async (id) => {
    const personaExistente = await PersonaModel.findOne({_id: id});
    if (personaExistente) {
        await PersonaModel.updateOne({_id:id}, {
            $set: {
                nombre: 'Maricarmen Modificado',
                pais: 'jual'
            }
        });
        console.log('Persona actualizada correctamente.');
    } else {
        console.log('La persona con el ID proporcionado no existe.');
    }
}




actualizar ('65e50dfeaeb79d1d40d07806')





const eliminar = async (id) => {

    const persona = await PersonaModel.deleteOne({_id:id})

    console.log(persona)

}

eliminar ('65e50fa1d7d20e3e45a1db6c')