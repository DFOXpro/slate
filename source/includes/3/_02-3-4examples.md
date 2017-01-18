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
[SEE  TRIVIAL EXAMPLE HERE](/examples/vanilla.html)

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

[SEE EXAMPLE HERE](/examples/jquery.html)

In this example we use an ajax helper that include the route, the path parameters and the data it will send if any.

# 304 - Angular 1.X

# 305 - Node

WIP :(
