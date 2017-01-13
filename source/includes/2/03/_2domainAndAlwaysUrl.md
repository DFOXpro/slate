## Domain & Always Url
```javascript
serverRoutes = trocha( {
	domain: 'https://mydomain.net.co',
	alwaysUrl: true,
	routes: {
		home: {}
	}
});
console.log(serverRoutes.home.path());
```

```coffeescript
serverRoutes = trocha {
	domain: 'https://mydomain.net.co'
	alwaysUrl: true
	routes:
		home: {}
console.log serverRoutes.home.path()
```
> This should print:

```bash
https://mydomain.net.co/home
```

You can set the domain of your routes via `domain` constructor attribute and choice if you want to always print with `alwaysUrl`, if you want to print the domain just fewer times see [url printing parameter](#url).

This is very usefull when you're defining routes for a RESTful server.
