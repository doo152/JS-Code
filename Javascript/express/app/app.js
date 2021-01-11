const express = require('express');
const  bodyparser = require('body-parser');
const app = express();
const jsonParser = bodyparser.json();
const urlParser = bodyparser.urlencoded({extended: false });

app.post('/login', urlParser, (req, res)=>{
	if(!req.body) return res.sendStatus(400);
	res.send('Welcome ', req.body.username);
});

app.post('/about', jsonParser, (req,res)=>{
	if(!req.body) return res.sendStatus(400);
	res.send('about json ', req.body.username);
});
 
// app.use('/', (req, res, next) => {
// 	console.log(' root path ');
// 	next();
// });

// var router = express.Router();
// router.use((req,res,next)=>{
// 	console.log('%s %s', req.url, req.method);
// 	next();
// });

// router.get('/', (req, res)=>{
// 	res.send('<h1>Home Page</h1>');
// })
// router.get('/about', (req, res)=>{
// 	res.send('<h1>about Page</h1>');
// })
// app.use('/', router);

// (req, res, next) => {
// 	// res.header('Content-type', 'asd');
// 	console.log("====User dir==================\n"+ req.url)
// 	console.log(req.params);
// 	console.log(req.path);
// 	console.log(req.get('Content-Type'));
// 	console.log("88888888888888888");
// 	next();
// });

// app.use('/user/about' ,(req, res) => {
// 	res.header('Content-type', 'asd');
// 	console.log('about page');
// })

app.listen(3000);
