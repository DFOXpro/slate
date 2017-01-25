# 301 - Best practices

## ñ00 Never point to master
> BAD idea

```html
<script src="https://cdn.rawgit.com/DFOXpro/trocha/master/dist/trocha.min.js"></script>
```

> GOOD idea

```html
<script src="https://cdn.rawgit.com/DFOXpro/trocha/0.1.2/dist/trocha.min.js"></script>
```

Wherever you use this library never point to master branch, use always an especific version of the library.

**WHY?**

Any change between versions (releases, revision, etc) may change the behavior of this library.

## ñ01 Prefer JSON constructor
> BAD idea

```javascript
let myRoutes = trocha();
myRoutes._newRoute({args...});
...
```
```coffeescript
myRoutes = trocha()
myRoutes._newRoute {args...}
...
```


> GOOD idea

```javascript
const myRoutes = trocha({
	routes: {... my routes ...}
});
```
```coffeescript
myRoutes = trocha
	routes: {... my routes ...}
```

Always use the JSON constructor to declarate the routes tree, avoid the creation methods.

**WHY?**

* When using the creation methods your route can't be const and may be override later on.
* Using the creation methods you can ending with routes declarations in the entire project.
* Using the JSON contructor you can declare in just one place (file?) all your routes.

## ñ02 Use const
> BAD idea

```javascript
let myRoutes = trocha({
	routes: {... my routes ...}
});
```
```coffeescript
myRoutes = trocha
	routes: {... my routes ...}
...
```


> GOOD idea

```javascript
const myRoutes = trocha({
	routes: {... my routes ...}
});
```
```coffeescript
# For coffeescript lets hope this feature and all es6 grammar became avalible :(
# See: https://github.com/jashkenas/coffeescript/issues/3571
__myRoutes = {... my routes ...}
`const myRoutes = trocha({
	routes: __myRoutes
});
`
delete __myRoutes
```

Use variable type [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

**WHY?**

* This is a well supported ES6 feature (even IE11 support this).
* This prevent later on override.

## ñ03 Use diferent trocha objects to diferent route scopes
> BAD idea

```javascript
const myRoutes = trocha({
	routes: {
		client routes ...
		serverA routes ...
		serverB routes ...
	}
});
```
```coffeescript
myRoutes = trocha
	routes:
		client routes ...
		serverA routes ...
		serverB routes ...
```


> GOOD idea

```javascript
const clientRoutes = trocha({
	pre: '/the/templates/route',
	post: '_the_hash_and_ext.html',
	routes: {... client routes ...}
});
const serverARoutes = trocha({
	domain: 'https://api.serverA.net.co/',
	alwaysUrl: true,
	routes: {... serverA routes ...}
});
const serverBRoutes = trocha({
	domain: 'https://api.serverB.net.co/',
	alwaysUrl: true,
	routes: {... serverB routes ...}
});
```
```coffeescript
clientRoutes = trocha {
	pre: '/the/templates/route'
	post: '_the_hash_and_ext.html'
	routes: {... client routes ...}
serverARoutes = trocha {
	domain: 'https://api.serverA.net.co/'
	alwaysUrl: true
	routes: {... serverA routes ...}
serverBRoutes = trocha {
	domain: 'https://api.serverB.net.co/'
	alwaysUrl: true
	routes: {... serverB routes ...}
```

If your project access to RESTful apis declare a trocha object per server, also use an exclusive object for client views
