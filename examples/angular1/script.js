(() => {
	let REST_RESOURCE = trocha.$RESOURCE;
	// now we are adding more routes to the default resource
	// Note this will only be used within the server routes
	REST_RESOURCE.list = {
		$id: false,
		$hide: true
	};
	REST_RESOURCE.create = {
		$hide: true,
		$id: false,
		$method: trocha.POST
	};
	REST_RESOURCE.update = {
		$hide: true,
		$method: trocha.PATCH
	};
	REST_RESOURCE["delete"] = {
		$hide: true,
		$method: trocha.DELETE
	};
	const ROUTES = {
		CLIENT: trocha({
			pre: 'templates', // Note relative route
			post: '.html',
			routes: {
				posts: {
					$type: trocha.RESOURCE,
					$id: 'postId',
					comments: {}
				},
				users: {
					$type: trocha.RESOURCE,
					$id: 'userId'
				},
				data: { //just for templates
					$type: trocha.RESOURCE,
					$id: 'dummyId'
				},
				index: {
				}
			}
		}),
		SERVER: trocha({
			domain:'https://jsonplaceholder.typicode.com',
			alwaysUrl: true,
			resource: REST_RESOURCE,
			routes: {
				posts: {
					$type: trocha.RESOURCE,
					$id: 'postId',
					comments: {}
				},
				users: {
					$type: trocha.RESOURCE,
					$id: 'userId'
				}
			}
		})
	};
	delete REST_RESOURCE;// no longer needed

	const emptyController = function($scope, $trocha) {
		$scope.data = {
			routes: $trocha.CLIENT
		};
	};
	const listController = (type) => {
		return function($scope, $trocha) {//this is the controller
			$scope.data = {
				type: type
			};

			// this part should be in a resolve, but I put here to make the example smaller
			$scope.data.routes = $trocha.CLIENT;
			// I hope you dont get lost with this mix of names
			const xhrSuccess = (response) => $scope.data.response = response.data;
			$trocha.xhr($trocha.SERVER[type].list).then(xhrSuccess, xhrFail);
		}
	};
	const xhrFail = (response) => {
		console.error('xhrFail', response);
		window.alert('The XHR fail, see console output')
	};

	// Note TrochaJS is not a module of angularjs... yet
	let app = angular.module("app", ['ngRoute']);

	// This is the core of this example
	app.factory('$trocha', [
		'$http',
		($http) => {
			var $trocha = trocha;
			$trocha.CLIENT = ROUTES.CLIENT;
			$trocha.SERVER = ROUTES.SERVER;
			$trocha.xhr = (route, path, data) => {
				let args = {
					url: route.path(path),
					method: route.$method
				}
				if(data) args.data = data;
				return $http(args);
			}
			return $trocha;
		}
	]);

	app.config([
		'$routeProvider',
		($routeProvider) => {
			$routeProvider.when(ROUTES.CLIENT.index.path(), {
				templateUrl: ROUTES.CLIENT.index.path({ext: true}),
				controller: ROUTES.CLIENT.index.$as
			})
			.when(ROUTES.CLIENT.users.list.path(), {
				templateUrl: ROUTES.CLIENT.data.list.path({ext: true, hide: false}),
				controller: ROUTES.CLIENT.users.list.$as
			}).when(ROUTES.CLIENT.posts.list.path(), {
				templateUrl: ROUTES.CLIENT.data.list.path({ext: true, hide: false}),
				controller: ROUTES.CLIENT.posts.list.$as
			}).otherwise({redirectTo: ROUTES.CLIENT.index.path()})
		}
	]);

	app.controller(ROUTES.CLIENT.index.$as, [
		'$scope', '$trocha', '$routeParams', emptyController
	]);

	app.controller(ROUTES.CLIENT.users.list.$as, [
		'$scope', '$trocha', listController(ROUTES.CLIENT.users.$as)
	]);
	
	app.controller(ROUTES.CLIENT.posts.list.$as, [
		'$scope', '$trocha', listController(ROUTES.CLIENT.posts.$as)
	]);

})();
