const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.render('zonasentrega/add', {id});
});

router.post('/add/:id', async (req, res) => {
    const { id } = req.params;
    const { codigo_postal, precio_minimo, coste_envio, tiempo_entrega } = req.body;
    console.log(id);
    console.log('dios');
    console.log(req.body);
    const newZonaEntrega = {
        codigo_postal,
        precio_minimo,
        coste_envio,
        tiempo_entrega,
        comercio_id: id
    };
    console.log('vayapordios');
    console.log(newZonaEntrega);
    await pool.query('INSERT INTO zonasentrega set ?', [newZonaEntrega]);
    req.flash('success', 'Zona de Entrega ingresado correctamente');
    res.redirect('/empresas/comercios/zonasentrega/' + id);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const zonasentrega = await pool.query('SELECT * FROM zonasentrega WHERE comercio_id = ?', id);
    //console.log(zonasentrega);
    res.render('zonasentrega/list', { zonasentrega, id });
});

router.get('/listado/:id', async (req, res) => {
    const { id } = req.params;
    const zonasentrega = await pool.query('SELECT * FROM zonasentrega WHERE comercio_id = ?', id);
    //console.log(zonasentrega);
    res.render('zonasentrega/listado', { zonasentrega, id });
});

router.get('/delete/:id/:emp', async (req, res) => {
    const { id } = req.params;
    const { emp } = req.params;
    console.log('GET ELIMINAR: ' + id);
    console.log('GET ELIMINAR: ' + emp);
    await pool.query('DELETE FROM zonasentrega WHERE id = ?', [id]);
    req.flash('success', 'Zona de Entrega eliminado correctamente');
    res.redirect('/empresas/comercios/zonasentrega/' + emp);
});

router.get('/edit/:id/:emp', async (req, res) => {
    const { id } = req.params;
    const { emp } = req.params;
    console.log('GET EDITAR: ' + id);
    console.log('GET EDITAR: ' + emp);
    const zonasentrega = await pool.query('SELECT * FROM zonasentrega WHERE id = ?', [id]);
    console.log(zonasentrega);
    res.render('zonasentrega/edit', {zonaentrega: zonasentrega[0]});
});

router.post('/edit/:id/:emp', async (req, res) => {
    const { id } = req.params;
    const { emp } = req.params;
    console.log('POST EDITAR: ' + id);
    console.log('POST EDITAR: ' + emp);
    const { codigo_postal, precio_minimo, coste_envio, tiempo_entrega } = req.body; 
    const newZonaEntrega = {
        codigo_postal,
        precio_minimo,
        coste_envio,
        tiempo_entrega
    };
    console.log(newZonaEntrega);
    await pool.query('UPDATE zonasentrega set ? WHERE id = ?', [newZonaEntrega, id]);
    req.flash('success', 'Zona de Entrega modificado correctamente');
    res.redirect('/empresas/comercios/zonasentrega/' + emp);
});

module.exports = router;