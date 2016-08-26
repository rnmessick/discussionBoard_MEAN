var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
	name        :String,
	created_at  :{ type: Date, default: Date.now },
	topics      :[{ type: mongoose.Schema.Types.Mixed, ref: "Topic" }],
	posts       :[{ type: mongoose.Schema.Types.Mixed, ref: "Post" }],
	comments    :[{ type: mongoose.Schema.Types.Mixed, ref: "Comment"}]
})


var topicSchema = mongoose.Schema({
	name        :String,
	user_id     :{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
	category    :String,
	title       :String,
	description :String,
	created_at  :{ type: Date, default: Date.now },
	posts       :Number
}) 

var postsSchema = mongoose.Schema({
	name        :String,
	user_id     :{ type: mongoose.Schema.Types.ObjectId, ref: "User"},
	topic_id    :{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
	comments    :[{ type: mongoose.Schema.Types.Mixed, ref: "Comment"}],
	post        :String,
	like        :Number,
	dislike     :Number,
	created_at  :{ type: Date, default: Date.now }
})

var commentsSchema = mongoose.Schema({
	name        :String,
	user_id     :{ type: mongoose.Schema.Types.ObjectId, ref: "User"},
	topic_id    :{ type: mongoose.Schema.Types.ObjectId, ref: "Topic"},
	post_id     :{ type: mongoose.Schema.Types.ObjectId, ref: "Post"},
	comment     :String,
	created_at  :{ type: Date, default: Date.now}
})

mongoose.model("User", userSchema);
mongoose.model("Topic", topicSchema);
mongoose.model("Post", postsSchema);
mongoose.model("Comment", commentsSchema);