myApp.controller('usersController', function($scope, $routeParams, userFactory) {
	var id = $routeParams.id;
	
	$scope.checkUser = function(user) {
		userFactory.readUsers(user, function(data) {
		})
	}

	userFactory.viewUser(id, function(data) {
		$scope.user = data;
	})

})

myApp.controller('dashboardsController', function($scope, topicFactory, userFactory) {
	$scope.new_topic = {};

	userFactory.readUser(function(data) {
		$scope.user = data;
	})

	$scope.createTopic = function(new_topic, name) {
		new_topic.name = name.name;
		new_topic.user_id = name._id;
		topicFactory.createTopic(new_topic, function(data, info) {
			userFactory.updateUserTopics(data, name, function(info) {});
			$scope.topics = data.data;
			$scope.new_topic = {};
			socket.emit('created_topic', data.info);
		})
	}

	socket.on('topic_added', function(data) {
		$scope.$broadcast("new_topic", data);
	})

	topicFactory.readTopics(function(data) {
		$scope.topics = data;
	})	
})

myApp.directive("topics", function() { // Added to an HTML just as class or id
	return {
		restrict: "A",  // E for Element
		link: function($scope, $element) {
			$scope.$on("new_topic", function(event, data) {
				console.log(data);
				$element.find("tbody").append(
					"<tr>"
						+"<td>"+data.category+"</td>"
						+"<td><a href='#/topic/"+data._id+"'>"+data.title+"</a></td>"
						+"<td><a href='#/user/"+data.user_id+"'>"+data.name+"</a></td>"
						+"<td></td>"
				   +"<tr>"
				);
			});
		}
	}
})

myApp.controller('topicsController', function($scope, $routeParams, topicFactory, postFactory, userFactory) {
	var id = $routeParams.id;
	var topic_id = [];

	userFactory.readUser(function(data) {
		$scope.name = data;
	})
	
	topicFactory.getTopic(id, function(data) {
		topic_id = data._id;
		$scope.topic = data;
		postFactory.readPosts(id, function(info) {
			$scope.posts = info;
		})
		
		
	})

	$scope.createPost = function(new_post, name) {		
		new_post.name = name.name;
        new_post.topic_id = topic_id;
		new_post.user_id = name._id;
    	postFactory.createPost(new_post, function(data) {
			postFactory.readPosts(id, function(info) {
				$scope.posts = info;
				numOfPosts = info.length;
	    		topicFactory.updateTopic(numOfPosts, id, function(yep){})
	    		userFactory.updateUserPosts(info, name, function(yep){})
			})
		})
	}

	$scope.createComment = function(new_comment, post, name) {
		postFactory.createComment(new_comment, post, name, function(info) {
			$scope.posts = info;
		})
	}
})



