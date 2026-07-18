const denunciaModel = require('../models/denunciaModel');
const publicacionModel = require('../models/publicacionModel');


async function verDenuncias(req,res){

    const denuncias = await denunciaModel.obtenerTodas();


    res.render('admin/denuncia',{
        denuncias
    });

}

async function liberarPublicacion(req, res) {

    try {

        const id = req.params.id;

        await publicacionModel.liberarPublicacion(id);

        res.redirect('/admin/denuncias');

    } catch (error) {

        console.log(error);

        res.send('Error al liberar');

    }
}


module.exports = {
    verDenuncias,
    liberarPublicacion
};