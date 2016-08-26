var myApp = angular.module('myApp', ['ngRoute', 'ngMessages']);
myApp.factory('userFactory', function($http, $location) {
	var factory = {};
	var thisUser = null;

	factory.readUsers = function(user, callback) {
		var new_user = true;
		$http.get('/users').success(function(data) {
			angular.forEach(data, function(regUser) {
				if(user.name == regUser.name) {
					console.log(user.name, "matches", regUser.name);
					new_user = false;
					thisUser = regUser
					$location.path('/dashboard');
				}	
			})          	
// If user does not exist, create new user and redirect to dashboard
			if(new_user == true) {	
				console.log("User is new, Creating...");
				$http.post('/users', user).success(function(data) {
					console.log("New user has been created...")
					thisUser = data;
					$location.path('/dashboard');
				})
			}
		})
		callback(thisUser);	
	}

	factory.readUser = function(callback) {
		callback(thisUser);
	}


	factory.viewUser = function(id, callback) {
		$http.get('/users/'+id).success(function(data) {
			callback(data[0]);
		})
	}

	factory.updateUserTopics = function(data, name, callback) {
		var topics = [];
		angular.forEach(data, function(topic) {
			if(topic.user_id == name._id)
				topics.push(topic);
		})
		$http.post('/users/topics/'+name._id, {topics: topics}).success(function(data) {})
	}

	factory.updateUserPosts = function(info, name, callback) {
		var posts = [];
		console.log(info);
		angular.forEach(info, function(post) {
			if(post.user_id == name._id)
				posts.push(post);
		})
		$http.post('/users/posts/'+name._id, {posts: posts}).success(function(data) {
			console.log(data);
		})
	}

	return factory;
})

myApp.factory('topicFactory', function($http) {
	var factory = {};
	var currentUser = null;

	factory.createTopic = function(new_topic, callback) {
		$http.post('/topics', new_topic).success(function(data) {
			callback(data);
		})
	}

	factory.readTopics = function(callback) {
		$http.get('/topics').success(function(data) {
			callback(data);
		})
	}

	factory.getTopic = function(id, callback) {
		$http.get('/topics/'+id).success(function(data) {
			callback(data);
		})
	}

	factory.setUser = function(user, callback) {
		this.currentUser = user;
		callback(currentUser);
	}

	factory.getUser = function(data, callback) {
		this.currentUser = data;
		callback(currentUser);
	}

	factory.updateTopic = function(numOfPosts, id, callback) {
		$http.post('/topics/'+id, {posts: numOfPosts}).success(function(data) {
			callback(data);
		})
	}

	return factory;
})

myApp.factory('postFactory', function($http) {
	var factory = {};
	var topic_id = null;

	factory.setId = function(idForPost, callback) {
		idForPost = topic_id;
		callback(topic_id);
	}
	
	factory.readPosts = function(id, callback) {
		$http.get('/posts/'+id).success(function(data) {
			callback(data);
		})
	}

	factory.createPost = function(new_post, callback) {
		$http.post('/posts', new_post).success(function(data) {
			callback(data);
		})
	}

	factory.createComment = function(new_comment, post, name, callback) {
		new_comment.name = name.name
		new_comment.user_id = name._id;
		new_comment.topic_id = post.topic_id;
		new_comment.post_id = post._id;
		$http.post('/comments', new_comment).success(function(data) {
			var allComments = [];
			var comments = [];
			angular.forEach(data, function(comment) {
				allComments.push(comment);
				if(comment.user_id == name._id)
					comments.push(comment);
			})
			$http.post('/posts/'+post._id, {comments: allComments}).success(function(info) {
				callback(info);
			})
			console.log("comments from this post that match user", comments);
			// $http.get('/user/'+name._id).success(function(data){
			
			// $http.post('/user/comments/'+name._id, {comments: comments}).success(function(data) {
			// 	callback(data);
			// })
		})
	}

	return factory;
})