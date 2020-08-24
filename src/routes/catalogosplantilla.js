const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.render('catalogosplantilla/add', {id});
});

router.post('/add/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre_producto, descripcion_producto, precio, categoria, tipo } = req.body;
    console.log(id);
    console.log('dios');
    console.log(req.body);
    const newCatalogoPlantilla = {
        nombre_producto,
        descripcion_producto,
        precio,
        categoria,
        tipo,
        empresa_id: id
    };
    console.log('vayapordios');
    console.log(newCatalogoPlantilla);
    await pool.query('INSERT INTO catalogosplantilla set ?', [newCatalogoPlantilla]);
    req.flash('success', 'Catalogo Plantilla ingresado correctamente');
    res.redirect('/empresas/catalogosplantilla/' + id);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const catalogosplantilla = await pool.query('SELECT * FROM catalogosplantilla WHERE empresa_id = ?', id);
    console.log(id);
    res.render('catalogosplantilla/list', { catalogosplantilla, id });
});

router.get('/listado/:id', async (req, res) => {
    const { id } = req.params;
    const catalogosplantilla = await pool.query('SELECT * FROM catalogosplantilla WHERE empresa_id = ?', id);
    //console.log(catalogos);
    res.render('catalogosplantilla/listado', { catalogosplantilla, id });
});

router.get('/delete/:id/:emp', async (req, res) => {
    const { id } = req.params;
    const { emp } = req.params;
    console.log('GET ELIMINAR: ' + id);
    console.log('GET ELIMINAR: ' + emp);
    await pool.query('DELETE FROM catalogosplantilla WHERE id = ?', [id]);
    req.flash('success', 'Catalogo Plantilla eliminado correctamente');
    res.redirect('/empresas/catalogosplantilla/' + emp);
});

router.get('/edit/:id/:emp', async (req, res) => {
    const { id } = req.params;
    const { emp } = req.params;
    console.log('GET EDITAR: ' + id);
    console.log('GET EDITAR: ' + emp);
    const catalogosplantilla = await pool.query('SELECT * FROM catalogosplantilla WHERE id = ?', [id]);
    console.log(catalogosplantilla);
    res.render('catalogosplantilla/edit', {catalogoplantilla: catalogosplantilla[0]});
});

router.post('/edit/:id/:emp', async (req, res) => {
    const { id } = req.params;
    const { emp } = req.params;
    console.log('POST EDITAR: ' + id);
    console.log('POST EDITAR: ' + emp);
    const { nombre_producto, descripcion_producto, precio, categoria, tipo } = req.body; 
    const newCatalogoPlantilla = {
        nombre_producto,
        descripcion_producto,
        precio,
        categoria,
        tipo
    };
    console.log(newCatalogoPlantilla);
    await pool.query('UPDATE catalogosplantilla set ? WHERE id = ?', [newCatalogoPlantilla, id]);
    req.flash('success', 'Catalogo Plantilla modificado correctamente');
    res.redirect('/empresas/catalogosplantilla/' + emp);
});

module.exports = router;