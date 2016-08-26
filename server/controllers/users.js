var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function(){
	return{
		show: function(req, res){
			User.find({}, function(err, results){
				if(err){
					console.log("users 9", err);
					res.json(err);
				}else{
					res.json(results);
				}
			})
		},
		// ##fix to recent
		show_one: function(req, res){
			User.find({user_id: req.params.id}, function(err, results){
				if(err){
					console.log("users 20", err);
					res.json(err);
				}else{
					res.json(results);
				}
			})
		},
		add: function(req, res){
			console.log('hello from add user!', req.body.name, req.body.created_at);
			var new_user = new User(req.body);
			new_user.save(function(err, results){
				if(err){
					console.log('users 32,fail to add to database!');
					res.json(err);
				}else{
					console.log('successfully added to the database');
					res.json(results);
				}
			})

		},
		update_topics: function(req, res) {
			console.log("users 42", req.body.topic);
			User.findByIdAndUpdate(
				req.params.id,
				{$set: {topics: req.body.topics}},
				{new : true},
				function(err, results){
					if(err)
						console.log("users 50", err)
					else
						res.json(results);
				}
			)
		},

		update_posts: function(req, res) {
			User.findByIdAndUpdate(
				req.params.id,
				{$set: {posts: req.body.posts}},
				{new : true},
				function(err, results) {
					if(err)
						console.log("user 63", err);
					else
						res.json(results);
				})
		},

		update_comments: function(req, res) {
			User.findByIdAndUpdate(
				req.params.id,
				{$set: {comments: req.body.comments}},
				{new : true},
				function(err, results) {
					if(err)
						console.log("user 76", err);
					else
						res.json(results);
				})
		}
	}
})();
