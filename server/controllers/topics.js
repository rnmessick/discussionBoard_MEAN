var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');

module.exports = (function(){
	return{
		show: function(req, res){
			Topic.find({}, function(err, results){
				if(err){
				console.log("topic 9", err);
					res.json(err);
				}else{
					res.json(results);
				}
			})
		},
		// ##fix to recent
		show_one: function(req, res){
			Topic.findOne({_id: req.params.id}, function(err, results){
				if(err){
					console.log("topic 20", err);
					res.json(err);
				}else{
					res.json(results);
				}
			})
		},

		add: function(req, res){
			console.log('hello from add topic!');
			var new_topic = new Topic(req.body);
			new_topic.save(function(err, results){
				if(err){
					console.log('fail to add topic to database!');
					res.json(err);
				}else{
					console.log('successfully added topic to the database');
					res.json(results);
				}
			})

		},

		update: function(req, res) {
			Topic.findByIdAndUpdate(
				req.params.id,
				{$set: {posts: req.body.posts}},
				{new : true},
				function(err, results){
					if(err)
						console.log("topic 50", err)
					else
						res.json(results);
				}
			)
		}

	}

})();

