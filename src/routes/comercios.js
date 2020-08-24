const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.render('comercios/add', {id});
});

router.post('/add/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre_comercio, codigo_postal, movil, correo, direccion, provincia, ciudad, descripcion, responsable, activodescuento, precioparadescontar, montodescuento, pedidoinferior, precioinferior, pedidosuperior, preciosuperior, entregadescripcion } = req.body;
    console.log(id);
    console.log('dios');
    console.log(req.body);
    const newComercio = {
        nombre_comercio,
        codigo_postal,
        movil,
        correo,
        direccion,
        provincia,
        ciudad,
        descripcion,
        responsable,
        activodescuento,
        precioparadescontar,
        montodescuento,
        pedidoinferior,
        precioinferior,
        pedidosuperior,
        preciosuperior,
        entregadescripcion,
        empresa_id: id
    };
    console.log('vayapordios');
    console.log(newComercio);
    await pool.query('INSERT INTO comercios set ?', [newComercio]);
    req.flash('success', 'Comercio Saved Successfully');
    res.redirect('/empresas/comercios/' + id);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const comercios = await pool.query('SELECT * FROM comercios WHERE empresa_id = ?', id);
    //console.log(comercios);
    res.render('comercios/list', { comercios, id });
});

router.get('/listado/:id', async (req, res) => {
    const { id } = req.params;
    const comercios = await pool.query('SELECT * FROM comercios WHERE empresa_id = ?', id);
    //console.log(comercios);
    res.render('comercios/listado', { comercios, id });
});

router.get('/delete/:id/:emp', async (req, res) => {
    const { id } = req.params;
    const { emp } = req.params;
    console.log('GET ELIMINAR: ' + id);
    console.log('GET ELIMINAR: ' + emp);
    await pool.query('DELETE FROM comercios WHERE id = ?', [id]);
    req.flash('success', 'Comercio Removed Successfully');
    res.redirect('/empresas/comercios/' + emp);
});

router.get('/edit/:id/:emp', async (req, res) => {
    const { id } = req.params;
    const { emp } = req.params;
    console.log('GET EDITAR: ' + id);
    console.log('GET EDITAR: ' + emp);
    const comercios = await pool.query('SELECT * FROM comercios WHERE id = ?', [id]);
    console.log(comercios);
    res.render('comercios/edit', {comercio: comercios[0]});
});

router.post('/edit/:id/:emp', async (req, res) => {
    const { id } = req.params;
    const { emp } = req.params;
    console.log('POST EDITAR: ' + id);
    console.log('POST EDITAR: ' + emp);
    const { nombre_comercio, codigo_postal, movil, correo, direccion, provincia, ciudad, descripcion, responsable, activodescuento, precioparadescontar, montodescuento, pedidoinferior, precioinferior, pedidosuperior, preciosuperior, entregadescripcion } = req.body; 
    const newComercio = {
        nombre_comercio,
        codigo_postal,
        movil,
        correo,
        direccion,
        provincia,
        ciudad,
        descripcion,
        responsable,
        activodescuento,
        precioparadescontar,
        montodescuento,
        pedidoinferior,
        precioinferior,
        pedidosuperior,
        preciosuperior,
        entregadescripcion
    };
    console.log(newComercio);
    await pool.query('UPDATE comercios set ? WHERE id = ?', [newComercio, id]);
    req.flash('success', 'Comercio Updated Successfully');
    res.redirect('/empresas/comercios/' + emp);
});

module.exports = router;