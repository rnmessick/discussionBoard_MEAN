
myApp.config(function($routeProvider){

	 $routeProvider
	 		.when('/', {
	 			templateUrl: './../static/partials/login.html',
	 			controller: "usersController"
	 		})
	 		.when('/dashboard', {
	 			templateUrl: './../static/partials/dashboard.html',
	 			controller: "dashboardsController"
	 		})
	        .when('/users/:id',{
	            templateUrl: './../static/partials/users.html',
	            controller: "usersController"
	        })
	        .when('/topics/:id',{
	            templateUrl: './../static/partials/topics.html',
	            controller: "topicsController"
	        })

	        .otherwise({
	          redirectTo: '/'
	        });
})