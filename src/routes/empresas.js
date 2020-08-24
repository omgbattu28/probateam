const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', (req, res) => {
    res.render('empresas/add');
});

router.post('/add', async (req, res) => {
    const { nombre_empresa, cif, direccion, encargado } = req.body;
    const newEmpresa = {
        nombre_empresa,
        cif,
        direccion,
        encargado,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO empresas set ?', [newEmpresa]);
    req.flash('success', 'Empresa Saved Successfully');
    res.redirect('/empresas');
});

router.get('/', isLoggedIn, async (req, res) => {
    const empresas = await pool.query('SELECT * FROM empresas WHERE user_id = ?', [req.user.id]);
    console.log(req.body);
    res.render('empresas/list', { empresas });
});

router.get('/listado', isLoggedIn, async (req, res) => {
    const empresas = await pool.query('SELECT * FROM empresas WHERE user_id = ?', [req.user.id]);
    console.log(req.body);
    res.render('empresas/listado', { empresas });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM empresas WHERE ID = ?', [id]);
    
    req.flash('success', 'Empresa Removed Successfully');
    res.redirect('/empresas');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const empresas = await pool.query('SELECT * FROM empresas WHERE id = ?', [id]);
    console.log(id);
    res.render('empresas/edit', {empresa: empresas[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre_empresa, cif, direccion, encargado } = req.body; 
    const newEmpresa = {
        nombre_empresa,
        cif,
        direccion,
        encargado
    };
    await pool.query('UPDATE empresas set ? WHERE id = ?', [newEmpresa, id]);
    req.flash('success', 'Empresa Updated Successfully');
    res.redirect('/empresas');
});

module.exports = router;