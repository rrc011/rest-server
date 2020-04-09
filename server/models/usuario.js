const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let roleValidos = {
	values: ['ADMIN_ROLE', 'USER_ROLE'],
	message: '{VALUE} no es un role valido',
};

let Schema = mongoose.Schema;

let userSchema = new Schema({
	nombre: {
		type: String,
		required: [true, 'Nombre requerido'],
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'Correo requerido'],
	},
	password: {
		type: String,
		required: [true, 'password requirida'],
	},
	img: {
		type: String,
		required: false,
	},
	role: {
		type: String,
		enum: roleValidos,
		default: 'USER_ROLE',
	},
	estado: {
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
	},
});

userSchema.methods.toJSON = function() {
	let user = this;
	let userObject = user.toObject();
	delete userObject.password;
	return userObject;
};

userSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser unico'});

module.exports = mongoose.model('Usuario', userSchema);
