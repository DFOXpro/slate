# 200 - API
# 201 - Type of routes

There are 4 type of routes (see [Constants](#202-constants)):

* [Routes](#route)
* [Resources](#resource)
* [Scopes](#scope)
* [Alias](#alias)

## Route

```javascript
const myRoutes = new Trocha( {
	routes: {
		person: {
			$id: "name",
			$hide: true,
			attributes: {}
		}
	}
});
//OR
let myRoutes = new Trocha();
myRoutes._newRoute( {
	name: "person",
	hide: true,
	id: "name"
});
myRoutes.person._newRoute( {
	name: "attributes"
});
```

```coffeescript
myRoutes = new Trocha
	routes:
		person:
			$id: "name"
			$hide: true
			attributes: {}
#OR
myRoutes = new Trocha()
myRoutes._newRoute
	name: "person"
	hide: true
	id: "name"
myRoutes.person._newRoute name: "attributes"
```

> This should generate:

```bash
/:name
/:name/attributes
```

The simplest and base for any other type, it represent: `<name>/[:<id>]`(`id` is optional).

* Can be create by an empty object `<name>: {}`, no type is require.
* Can be parent of any type of route.
* Can be a mute route via `$hide: true`.

## Resource

```javascript
const myRoutes = new Trocha( {
	routes: {
		products: {
			$type: Trocha.RESOURCE,
			$id: "product_id"
		}
	}
});
//OR
let myRoutes = new Trocha();
myRoutes._newResource( {
	name: "products",
	id: "product_id"
});
```

```coffeescript
myRoutes = new Trocha
	routes:
		products:
			$type: Trocha.RESOURCE
			$id: "product_id"
#OR
myRoutes = new Trocha()
myRoutes._newResource
	name: "products",
	id: "product_id"
```

> This should generate:

```bash
/products # list of
/products/new
/products/:product_id # show of
/products/:product_id/edit
```

Is a configurable set of routes, ideal for CRUD routes:

* It require an `ID`
* The default routes are (useful for views POV):
	* `list(): <name>`
	* `new(): <name>/new`
	* `show({id}): <name>/:<id>`
	* `edit({id}): <name>/:<id>/edit`

This kind of routes is useful also for RESTful request
<aside class="warning">
Avoid using the resource base route, use instead (in this example) `products.list.path()` instead of `products.path()`
</aside>

## Custom resource

```javascript
apiResource = new Trocha.$RESOURCE; // Note the $, this is an object not the String
delete apiResource.new;
delete apiResource.edit;
delete apiResource.show;
apiResource.list = {$id: false}; // Override/Remove $hide: true
apiResource.create = {$hide: true, $id: false, $method: Trocha.POST};
apiResource.read = {$hide: true};
apiResource.update = {$hide: true, $method: Trocha.PATCH};
apiResource.delete = {$hide: true, $method: Trocha.DELETE};

serverRoutes = new Trocha( {
	domain: 'https://myRESTfulAPI.net.co',
	post: '.json',
	alwaysPost: true,
	alwaysUrl: true,
	// customSelector: 'ñ',
	routes: {
		products: {
			$type: Trocha.RESOURCE, // Note this is String
			$id: 'product_id'
			$resource: apiResource
		}
	}
});
```

```coffeescript
apiResource = new Trocha.$RESOURCE # Note the $, this is an object not a String
delete apiResource.new
delete apiResource.edit
delete apiResource.show
apiResource.list = {$id: false} # Override $hide: true
apiResource.create = {$hide: true, $id: false, $method: Trocha.POST}
apiResource.read = {$hide: true}
apiResource.update = {$hide: true, $method: Trocha.PATCH}
apiResource.delete = {$hide: true, $method: Trocha.DELETE}

serverRoutes = new Trocha
	domain: 'https://myRESTfulAPI.net.co'
	post: '.json'
	alwaysPost: true
	alwaysUrl: true
	# customSelector: 'ñ'
	routes:
		products:
			$type: Trocha.RESOURCE # Note this is String (whitout the $ prefix)
			$id: 'product_id'
			$resource: apiResource
```

> This should generate:

```bash
https://myRESTfulAPI.net.co/products/list.json # list with method get
https://myRESTfulAPI.net.co/products.json # create with method post
https://myRESTfulAPI.net.co/products/:product_id.json # read with method get
https://myRESTfulAPI.net.co/products/:product_id.json # update with method patch
https://myRESTfulAPI.net.co/products/:product_id.json # delete with method delete
```

You can create your customs resources, ideal for RESTful apis (see
[Best practices](#301-best-practices),
[Methods](#205-methods-amp-attributes) and
[Constants](#202-constants)
)

When you're defining your trocha object add a `resource` object, it will be use has reference for any resource within this trocha object.

* You can copy and modify default resource at `Trocha.$RESOURCE` or with [customSelector](#amp-customselector) at `serverRoutes.ñRESOURCE`

## Scope

```javascript
const myRoutes = new Trocha( {
	routes: {
		language: {
			$type: Trocha.SCOPE,
			id: "language_id",
			dashboard: {}
		}
	}
});
//OR
let myRoutes = new Trocha();
myRoutes._newScope({name: "language", id: "language_id"});
myRoutes.language._newRoute({name: "dashboard"});

console.log(myRoutes.language.dashboard.path({language_id: 'esBO'}));
console.log(myRoutes.dashboard.path());
```

```coffeescript
myRoutes = new Trocha
	routes:
		language:
			$type: Trocha.SCOPE
			id: "language_id"
			dashboard: {}
#OR
myRoutes = new Trocha()
myRoutes._newScope name: "language", id: "language_id"
myRoutes.language._newRoute name: "dashboard"

console.log myRoutes.language.dashboard.path language_id: 'esBO'
console.log myRoutes.dashboard.path()
```

> This should print:

```bash
/esBO/dashboard
/dashboard
```

Is an optional level of the route tree.

* It require an `ID`
* It by default inits with `justId: true`
* Does not offer `path()`.
* generate the same child tree for the parent
* Can be parent of any kind of other routes.

## Alias


```javascript
const cdns = new Trocha( {
	routes: {
		// This is a cool vanilla views/routing system more @ http://mtrpcic.net/pathjs/
		pathjs: "https://cdn.rawgit.com/mtrpcic/pathjs/master/path.min.js"
		images: {
			$type: Trocha.ALIAS,
			$alias: "https://cdn.mydomain.io/images",
			$id: "image_token",
			desktop: 'full_size_for_desktop'
		}
	}
});
//OR
let cdns = new Trocha();
cdns._newAlias( {
	name: "pathjs",
	alias: "https://cdn.rawgit.com/mtrpcic/pathjs/master/path.min.js"
});
cdns._newAlias( {
	name: "images",
	alias: "https://cdn.mydomain.io/images",
	$id: "image_token"
});
cdns.images._newAlias({
	name: "desktop",
	alias: "full_size_for_desktop"
})
console.log(cdns.pathjs.path());
console.log(cdns.images.path({image_token: 'car.jpg'}));
console.log(cdns.images.desktop.path({query:{colour:'mono'}}));
```

```coffeescript
cdns = new Trocha
	routes:
		# This is a cool vanilla views/routing system more @ http://mtrpcic.net/pathjs/
		pathjs: 'https://cdn.rawgit.com/mtrpcic/pathjs/master/path.min.js'
		images:
			$type: Trocha.ALIAS
			$alias: 'https://cdn.mydomain.io/images'
			$id: 'image_token'
			desktop: 'full_size_for_desktop'
#OR
cdns = new Trocha()
cdns._newAlias
	name: 'pathjs'
	alias: 'https://cdn.rawgit.com/mtrpcic/pathjs/master/path.min.js'
cdns._newAlias
	name: 'images'
	$id: 'image_token'
	alias: 'https://cdn.mydomain.io/images'
cdns.images._newAlias
	name: 'desktop'
	alias: 'full_size_for_desktop'

console.log cdns.pathjs.path()
console.log cdns.images.path image_token: 'car.jpg'
console.log cdns.images.desktop.path query: colour:'mono'
```

> This should print:

```bash
https://cdn.rawgit.com/mtrpcic/pathjs/master/path.min.js
https://cdn.mydomain.io/images/car.jpg
https://cdn.mydomain.io/images/:image_token/full_size_for_desktop?colour=mono
```

This type of route can render an specific string independent of the name, it's usefull to print cdns and very long and isolated paths

* It can be created by an string in the constructor.
* Can be parent of any kind of other routes.
<aside class="info">
Note since `0.2.0` tag, alias print with the path function
</aside>
