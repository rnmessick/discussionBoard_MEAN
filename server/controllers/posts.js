var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports = (function(){
	return{
		add: function(req, res){
		console.log('hello from add post!');
		var new_post = new Post(req.body);
		new_post.save(function(err, results){
			if(err){
				console.log('fail to add post to database!');
				res.json(err);
			}else{
				console.log('successfully added post to the database');
				res.json(results)
			}
		})

	},

		show: function(req, res){
			Post.find({topic_id: req.params.id}, function(err, results){
				if(err){
				console.log("post 24", err);
					res.json(err);
				}else{
					res.json(results);
				}
			})
		},
		// ##fix to recent
		show_one: function(req, res){
			Post.findOne({topic_id: req.params.id}, function(err, results){
				if(err){
					console.log("post 35", err);
					res.json(err);
				}else{
					res.json(results);
				}
			})
		},


		update: function(req, res) {
			Post.findByIdAndUpdate(	req.params.id, {$set: {comments: req.body.comments}}, {new : true},	function(err, results){
				if(err)  {
					console.log("post 47", err)
				}
				else{
					Post.find({topic_id: data.topic_id }, function(err, data) {
						if(err){
							console.log("post 52", err)
						}
						else{
							res.json(data);
						}
					})
				}
			})
		}
	}

})();