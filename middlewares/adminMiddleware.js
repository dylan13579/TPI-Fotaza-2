function adminMiddleware(req,res,next){

    if(!req.session.usuario){
        return res.redirect('/auth/login');
    }


    if(req.session.usuario.rol !== 'admin'){
        return res.status(403).send('Acceso denegado');
    }


    next();
}


module.exports = adminMiddleware;