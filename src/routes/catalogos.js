const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.render('catalogos/add', {id});
});

router.post('/add/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre_producto, descripcion_producto, precio, categoria, tipo } = req.body;
    console.log(id);
    console.log('dios');
    console.log(req.body);
    const newCatalogo = {
        nombre_producto,
        descripcion_producto,
        precio,
        categoria,
        tipo,
        empresa_id: id
    };
    console.log('vayapordios');
    console.log(newCatalogo);
    await pool.query('INSERT INTO catalogos set ?', [newCatalogo]);
    req.flash('success', 'Catalogo ingresado correctamente');
    res.redirect('/empresas/catalogos/' + id);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const catalogos = await pool.query('SELECT * FROM catalogos WHERE comercio_id = ?', id);
    //console.log(catalogos);
    res.render('catalogos/list', { catalogos, id });
});

router.get('/listado/:id', async (req, res) => {
    const { id } = req.params;
    const catalogos = await pool.query('SELECT * FROM catalogos WHERE comercio_id = ?', id);
    //console.log(catalogos);
    res.render('catalogos/listado', { catalogos, id });
});

router.get('/delete/:id/:emp', async (req, res) => {
    const { id } = req.params;
    const { emp } = req.params;
    console.log('GET ELIMINAR: ' + id);
    console.log('GET ELIMINAR: ' + emp);
    await pool.query('DELETE FROM catalogos WHERE id = ?', [id]);
    req.flash('success', 'Catalogo eliminado correctamente');
    res.redirect('/empresas/catalogos/' + emp);
});

router.get('/edit/:id/:emp', async (req, res) => {
    const { id } = req.params;
    const { emp } = req.params;
    console.log('GET EDITAR: ' + id);
    console.log('GET EDITAR: ' + emp);
    const catalogos = await pool.query('SELECT * FROM catalogos WHERE id = ?', [id]);
    console.log(catalogos);
    res.render('catalogos/edit', {catalogo: catalogos[0]});
});

router.post('/edit/:id/:emp', async (req, res) => {
    const { id } = req.params;
    const { emp } = req.params;
    console.log('POST EDITAR: ' + id);
    console.log('POST EDITAR: ' + emp);
    const { nombre_producto, descripcion_producto, precio, categoria, tipo } = req.body; 
    const newCatalogo = {
        nombre_producto,
        descripcion_producto,
        precio,
        categoria,
        tipo
    };
    console.log(newCatalogo);
    await pool.query('UPDATE catalogos set ? WHERE id = ?', [newCatalogo, id]);
    req.flash('success', 'Catalogo modificado correctamente');
    res.redirect('/empresas/catalogos/' + emp);
});

module.exports = router;