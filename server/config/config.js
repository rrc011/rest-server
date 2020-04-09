//Port of build
process.env.PORT = process.env.PORT || 3000;

//Evironment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//DataBase
let urlDB;

if (process.env.NODE_ENV === 'dev') urlDB = 'mongodb://localhost:27017/cafe';
else urlDB = 'mongodb+srv://cafeDB_admin:cafe123@cafe-aw74i.mongodb.net/test?retryWrites=true&w=majority';
process.env.URLDB = urlDB;
