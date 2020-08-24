const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.render('tags/add', {id});
});

router.post('/add/:id', async (req, res) => {
    const { id } = req.params;
    const { descripcion } = req.body;
    console.log(id);
    console.log('dios');
    console.log(req.body);
    const newTag = {
        descripcion,
        comercio_id: id
    };
    console.log('vayapordios');
    console.log(newTag);
    await pool.query('INSERT INTO tags set ?', [newTag]);
    req.flash('success', 'Tag ingresado correctamente');
    res.redirect('/empresas/comercios/tags/' + id);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const tags = await pool.query('SELECT * FROM tags WHERE comercio_id = ?', id);
    //console.log(tags);
    res.render('tags/list', { tags, id });
});

router.get('/listado/:id', async (req, res) => {
    const { id } = req.params;
    const tags = await pool.query('SELECT * FROM tags WHERE comercio_id = ?', id);
    //console.log(tags);
    res.render('tags/listado', { tags, id });
});

router.get('/delete/:id/:emp', async (req, res) => {
    const { id } = req.params;
    const { emp } = req.params;
    console.log('GET ELIMINAR: ' + id);
    console.log('GET ELIMINAR: ' + emp);
    await pool.query('DELETE FROM tags WHERE id = ?', [id]);
    req.flash('success', 'Tags eliminado correctamente');
    res.redirect('/empresas/comercios/tags/' + emp);
});

router.get('/edit/:id/:emp', async (req, res) => {
    const { id } = req.params;
    const { emp } = req.params;
    console.log('GET EDITAR: ' + id);
    console.log('GET EDITAR: ' + emp);
    const tags = await pool.query('SELECT * FROM tags WHERE id = ?', [id]);
    console.log(tags);
    res.render('tags/edit', {tag: tags[0]});
});

router.post('/edit/:id/:emp', async (req, res) => {
    const { id } = req.params;
    const { emp } = req.params;
    console.log('POST EDITAR: ' + id);
    console.log('POST EDITAR: ' + emp);
    const { descripcion } = req.body; 
    const newTags = {
        descripcion
    };
    console.log(newTags);
    await pool.query('UPDATE tags set ? WHERE id = ?', [newTags, id]);
    req.flash('success', 'Tag modificado correctamente');
    res.redirect('/empresas/comercios/tags/' + emp);
});

module.exports = router;