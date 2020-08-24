const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.render('horarios/add', {id});
});

router.post('/add/:id', async (req, res) => {
    const { id } = req.params;
    const { dia, hora_apertura, hora_cierre } = req.body;
    console.log(id);
    console.log('dios');
    console.log(req.body);
    const newHorario = {
        dia,
        hora_apertura,
        hora_cierre,
        comercio_id: id
    };
    console.log('vayapordios');
    console.log(newHorario);
    await pool.query('INSERT INTO horarios set ?', [newHorario]);
    req.flash('success', 'Catalogo ingresado correctamente');
    res.redirect('/empresas/comercios/horarios/' + id);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const horarios = await pool.query('SELECT * FROM horarios WHERE comercio_id = ?', id);
    //console.log(horarios);
    res.render('horarios/list', { horarios, id });
});

router.get('/listado/:id', async (req, res) => {
    const { id } = req.params;
    const horarios = await pool.query('SELECT * FROM horarios WHERE comercio_id = ?', id);
    //console.log(horarios);
    res.render('horarios/listado', { horarios, id });
});

router.get('/delete/:id/:emp', async (req, res) => {
    const { id } = req.params;
    const { emp } = req.params;
    console.log('GET ELIMINAR: ' + id);
    console.log('GET ELIMINAR: ' + emp);
    await pool.query('DELETE FROM horarios WHERE id = ?', [id]);
    req.flash('success', 'Horario eliminado correctamente');
    res.redirect('/empresas/comercios/horarios/' + emp);
});

router.get('/edit/:id/:emp', async (req, res) => {
    const { id } = req.params;
    const { emp } = req.params;
    console.log('GET EDITAR: ' + id);
    console.log('GET EDITAR: ' + emp);
    const horarios = await pool.query('SELECT * FROM horarios WHERE id = ?', [id]);
    console.log(horarios);
    res.render('horarios/edit', {horario: horarios[0]});
});

router.post('/edit/:id/:emp', async (req, res) => {
    const { id } = req.params;
    const { emp } = req.params;
    console.log('POST EDITAR: ' + id);
    console.log('POST EDITAR: ' + emp);
    const { dia, hora_apertura, hora_cierre } = req.body; 
    const newHorario = {
        dia,
        hora_apertura,
        hora_cierre
    };
    console.log(newHorario);
    await pool.query('UPDATE horarios set ? WHERE id = ?', [newHorario, id]);
    req.flash('success', 'Horario modificado correctamente');
    res.redirect('/empresas/comercios/horarios/' + emp);
});

module.exports = router;