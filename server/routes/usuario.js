const Usuario = require('../models/usuario');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');

app.post('/usuario', (req, res) => {
	let body = req.body;
	let user = new Usuario({
		nombre: body.nombre,
		email: body.email,
		password: bcrypt.hashSync(body.password, 10),
		img: body.img,
		role: body.role,
		google: body.google,
	});

	user.save((err, userDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err,
			});
		}

		return res.json({
			ok: true,
			user: userDB,
		});
	});
});

app.put('/usuario/:id', (req, res) => {
	let id = req.params.id;
	let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

	Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, userDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err,
			});
		}

		return res.json({
			ok: true,
			user: userDB,
		});
	});
});

app.get('/usuario', (req, res) => {
	let page = req.query.page - 1 || 0;
	page = Number(page);
	console.log(page);

	let pageSize = req.query.pageSize || 5;
	pageSize = Number(pageSize);

	Usuario.find({estado: true}, 'nombre email password role estado')
		.skip(page)
		.limit(pageSize)
		.exec((error, lstUser) => {
			if (error) {
				return res.status(400).json({
					ok: false,
					error,
				});
			}

			Usuario.count({estado: true}, (error, count) => {
				return res.json({
					ok: true,
					users: lstUser,
					count,
				});
			});
		});
});

app.get('/usuario/:id', (req, res) => {
	let id = req.params.id;

	Usuario.findById(id, {estado: true}, (error, user) => {
		if (error) {
			return res.status(400).json({
				ok: false,
				error,
			});
		}

		return res.json({
			ok: true,
			user,
		});
	});
});

app.delete('/usuario/:id', (req, res) => {
	let id = req.params.id;

	Usuario.findByIdAndUpdate(id, {estado: false}, {new: true}, (error, user) => {
		if (error) {
			res.status(400).json({
				ok: false,
				error,
			});
		}

		if (user === null) {
			res.status(404).json({
				ok: false,
				error: {
					messaga: 'Usuario no encontrado',
				},
			});
		}

		res.json({
			ok: true,
			user,
		});
	});
});

module.exports = app;
