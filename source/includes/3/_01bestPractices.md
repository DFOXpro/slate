# 301 - Best practices

## ñ00 Never point to master
> BAD idea

```html
<script src="https://cdn.rawgit.com/DFOXpro/trocha/master/dist/trocha.min.js"></script>
```

> GOOD idea

```html
<script src="https://cdn.rawgit.com/DFOXpro/trocha/0.1.3/dist/trocha.min.js"></script>
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
const myRoutes = trocha {... my routes ...} # for CS2

# for coffeescript vanilla :(
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


**WHY?**

* Its more clean for the apis or cdns or views route trees
* Most cases views routes are diferent of api routes
* Even more you can create some security holes showing all your api routes in the view

## ñ04 If posible use Trocha for(with) async cdns
> BAD idea

```javascript
loadAsyncCDN('www.myCDN.io/min.js');
```
```coffeescript
loadAsyncCDN 'www.myCDN.io/min.js'
```

> GOOD idea

```javascript
myCDN = trocha({routes: min: 'www.myCDN.io/min.js'});
loadAsyncCDN(myCDN.min);
```
```coffeescript
myCDN = trocha routes: min: 'www.myCDN.io/min.js'
loadAsyncCDN myCDN.min
```

If you use async libraries or technologies like AMD use trocha to point the cdn url


**WHY?**

* Its cleaner
* Can be used like Dependency Injection if you wanna, ideal for dev/test/production environment swap

<aside class="success">
BTW Trocha can be loaded any time in runtime :) so feel free to load whenever you want
</aside>
