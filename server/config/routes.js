var users = require('./../controllers/users.js');
var topics = require('./../controllers/topics.js');
var posts = require('./../controllers/posts.js');
var comments = require('./../controllers/comments.js');

module.exports = function(app){
	app.get('/', function(req, res) {
		res.render('index');
	});

	app.get('/users', function(req, res){
		users.show(req, res);
	});

	app.post('/addUser', function(req, res){
		users.add(req, res);
	});

	app.get('/users/:id', function(req, res){
		users.show_one(req, res)
		
	});
	app.post('/users/topics/:id', function(req, res) {
		users.update_topics(req, res);
	})

	app.post('/users/posts/:id', function(req, res) {
		users.update_posts(req, res);
	})

	app.post('/users/comments/:id', function(req, res) {
		users.update_comments(req, res);
	})
	app.get('/topics', function(req, res){
		topics.show(req, res);
	});

	app.post('/topics', function(req, res){
		topics.add(req, res)
	});

	app.post('/topics/:id', function(req, res){
		topics.update(req, res);
	});

	app.get('/topics/:id', function(req, res){
		topics.show_one(req, res);
	});

	app.post('/posts', function(req, res){
		posts.add(req, res);
	});

	app.get('/posts/:id', function(req, res){
		posts.show(req, res);
	});

	app.post('/posts/:id', function(req, res){
		posts.update(req, res);
	});

	app.post('/comments', function(req, res){
		comments.add(req, res);
	});

	app.get('/comments/:id', function(req, res){
		comments.show(req, res);
	});



}