# 302 - Vanilla
```javascript
const handleRoute = (event) => {
	// Your awesome route handle
};

const replaceHref = () => {
	Array.prototype.forEach.call(document.getElementsByTagName("a"), (link) => {
		if(link.dataset.href){
			link.href = eval(
				"clientRoutes." +
				link.dataset.href
			).path(
				link.dataset.path ? JSON.parse(link.dataset.path) : {}
			);
			link.onclick = handleRoute
		}
	});
};

window.onload = () => {
	replaceHref();
}
```
```coffeescript
handleRoute = (event) ->
	# Your awesome route handle

replaceHref = ->
	Array.prototype.forEach.call document.getElementsByTagName("a"), (link) ->
		if link.dataset.href
			link.href = eval(
				"clientRoutes." + link.dataset.href
			).path(
				`link.dataset.path ? JSON.parse(link.dataset.path) : {}`
			)
			link.onclick = handleRoute

window.onload = ->
	replaceHref()
```

If you want to use this library with [Vanilla JS](http://vanilla-js.com/)(my fav framework ;)) I recomend you to use [pathjs](http://mtrpcic.net/pathjs/) to route handle.
[SEE  TRIVIAL EXAMPLE HERE](examples/vanilla.html)

In this example we write the links `<a href >` via onload function

# 303 - JQuery
```javascript
const succcesAction = (msg) => {
	// Your awesome XHR success handler
};

const doJqueryXHR = (route, path, data) => {
	return $.ajax({
		method: route.$method,
		url: route.path(path),
		data: data
	})
};

doJqueryXHR(serverRoutes.posts.show,{args},{data}).done(succcesAction);
```
```coffeescript
succcesAction = (msg) ->
	# Your awesome XHR success handler

doJqueryXHR = (route, path, data) ->
	$.ajax
		method: route.$method
		url: route.path path
		data: data

doJqueryXHR(serverRoutes.posts.show,{args},{data}).done succcesAction
```

[SEE EXAMPLE HERE](examples/jquery.html)

In this example we use an ajax helper that include the route, the path parameters and the data it will send if any.

# 304 - Angular 1.X
> The directive where we include trocha to our Angular project views via `<a thref="ROUTE">...`

```javascript
app.directive( 'thref', () => {// Trocha href
	return {
		restrict: 'A',
		link: ($scope, elements, attrs) => {
			route = ROUTES.CLIENT;
			attrs.thref.split('.').forEach((r) => {
				route = route[r];
				if(!route) throw "Invalid thref route"
			});
			if(attrs.tpath)
				try {
					attrs.tpath = JSON.parse(attrs.tpath)
				} catch(error){
					console.error('Invalid tpath JSON', error)
				}
			if("string" == typeof route)
				elements[0].href = route; // @TODO in future release this will be obsolete
			else elements[0].href = '#!' + route.path(attrs.tpath)// default hashprefix since 1.6
		}
	}
});
```
```coffeescript
app.directive 'thref', () ->
	restrict: 'A'
	link: ($s, elements, attrs) ->
		route = _routes.client
		attrs.thref.split('.').forEach (r) ->
			route = route[r]
			if !route
				throw "Invalid thref route"
		if attrs.tpath
			try
				attrs.tpath = JSON.parse attrs.tpath
			catch error
				console.error 'Invalid tpath JSON', error
		if "string" == typeof route
			elements[0].href = route # @TODO in future release this will be obsolete
		else
			elements[0].href = '#!' + route.path attrs.tpath # default hashprefix since 1.6
```
```html
<a thref="trochaJSDocs">click here</a>
<a thref="users.list">Show users list</a>
```
> The factory where we include trocha XHR helper to our Angular project

```javascript
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
```
```coffeescript
app.factory '$trocha', [
	'$http',
	($http) ->
		$trocha = trocha;
		$trocha.CLIENT = ROUTES.CLIENT
		$trocha.SERVER = ROUTES.SERVER
		$trocha.xhr = (route, path, data) ->
			args =
				url: route.path path
				method: route.$method
			args.data = data if data
			$http args
		$trocha
]
```

> The ngRoute config

```javascript
app.config([
	'$routeProvider'
	($routeProvider) => {
		$routeProvider.when(ROUTES.CLIENT.the.client.route.path(), {
			templateUrl: ROUTES.CLIENT.the.client.route.path({ext: true}),
			controller: ROUTES.CLIENT.the.client.route.$as
		})
	}
]);
```
```coffeescript
app.config [
	'$routeProvider'
	($routeProvider) ->
		$routeProvider.when ROUTES.CLIENT.the.client.route.path(),
			templateUrl: ROUTES.CLIENT.the.client.route.path {ext: true}
			controller: ROUTES.CLIENT.the.client.route.$as
]
```

> The controller implementation

```javascript
app.controller(ROUTES.CLIENT.the.client.route.$as, [
	'$scope', '$trocha', function($scope, $trocha) {
		$scope.data = {
			routes: $trocha.CLIENT
		};
		$trocha.xhr($trocha.SERVER.the.server.route, {path args...}, {data...})
		.then(xhrSuccess, xhrFail);
	}
]);
```
```coffeescript
app.controller ROUTES.CLIENT.the.client.route.$as, [
	'$scope', '$trocha', ($scope, $trocha) ->
		$scope.data =
			routes: $trocha.CLIENT
		$trocha.xhr $trocha.SERVER.the.server.route, {path args...}, {data...}
		.then xhrSuccess, xhrFail
]
```

[SEE EXAMPLE HERE](examples/angular1)

In this trivial example we use use the $http Angular service to make XHR request and ngRoute to handle routes and templates.

Note various things:

* We have diferent objects for client routes and server routes.
* To print the routes in the view we integrate **just** the client routes in the directive.
* To naming the controller we use the `$as` attribute of the route.

<aside class="notice">
Notice we don't use ui-router because it use a custom url declaration.
</aside>

# 305 - Node

WIP :(
