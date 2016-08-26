var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

module.exports = (function(){
	return{
		show: function(req, res){
			Comment.find({post_id: req.params.id}, function(err, results){
				if(err){
				console.log("comment 9", err);
					res.json(err);
				}else{
					res.json(results);
				}
			})
		},

		add: function(req, res){
			console.log('hello from add comment!');
			var new_comment = new Comment(req.body);
			new_comment.save(function(err, results){
				if(err){
					console.log('fail to add comment to database!');
					res.json(err);
				}else{
					console.log('successfully added comment to the database');
					module.exports.show(req, res);
				}
			})

		}
	}
})();