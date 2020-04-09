require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(require('./routes/usuario'));

let options = {
	// https://mongoosejs.com/docs/deprecations.html
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true,
};

mongoose
	.connect(process.env.URLDB, options)
	.then(() => console.log(`Base de datos Online`))
	.catch((e) => console.error(e));

app.listen(port, () => console.log(`Example app listening on port port!`));
