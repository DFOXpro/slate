# 201 - Type of routes

There are 4 type of routes (see [Constants](#202-constants)):

* [Routes](#route)
* [Resources](#resource)
* [Scopes](#scope)
* [Alias](#alias)

## Route

```javascript
const myRoutes = trocha( {
	routes: {
		person: {
			$id: "name",
			$hide: true,
			attributes: {}
		}
	}
});
//OR
let myRoutes = trocha();
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
myRoutes = trocha {
	routes:
		person:
			$id: "name"
			$hide: true
			index: {}
}
#OR
myRoutes = trocha()
myRoutes._newRoute {
	name: "person"
	hide: true
	id: "name"
}

myRoutes.person._newRoute {
	name: "index"
}
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
const myRoutes = trocha( {
	routes: {
		products: {
			$type: trocha.RESOURCE,
			$id: "product_id"
		}
	}
});
//OR
let myRoutes = trocha();
myRoutes._newResource( {
	name: "products",
	id: "product_id"
});
```

```coffeescript
myRoutes = trocha {
	routes:
		products:
			$type: trocha.RESOURCE
			$id: "product_id"
}
#OR
myRoutes = trocha()
myRoutes._newResource {
	name: "products",
	id: "product_id"
}
```

> This should generate:

```bash
/products
/products/new
/products/:product_id
/products/:product_id/edit
```

Is a configurable set of routes, ideal for CRUD routes:

* It require an `ID`
* The default routes are (useful for views POV):
	* `list(): <name>`
	* `new(): <name>/new`
  * `show({id}): <name>/:<id>`
  * `edit({id}): <name>/:<id>/edit`

## Custom resource

```javascript
apiResource = trocha.$RESOURCE; // Note the $, this is an object not the String
delete apiResource.new;
delete apiResource.edit;
//apiResource.show = {$hide: true}; // Already defined
apiResource.list = {$id: false, $hide: true}; // Override $hide: true
apiResource.create = {$hide: true, $id: false, $method: trocha.POST};
apiResource.update = {$hide: true, $method: trocha.PATCH};
apiResource.delete = {$hide: true, $method: trocha.DELETE};

serverRoutes = trocha( {
	domain: 'https://myRESTfulAPI.net.co',
	post: '.json',
	alwaysPost: true,
	alwaysUrl: true,
	resource: apiResource,
	routes: {
		products: {
			$type: trocha.RESOURCE, // Note this is String
			$id: product_id
		}
	}
});
```

```coffeescript
apiResource = trocha.$RESOURCE # Note the $, this is an object not the String
delete apiResource.new
delete apiResource.edit
#apiResource.show = {$hide: true} # Already defined
apiResource.list = {$id: false, $hide: true} # Override $hide: true
apiResource.create = {$hide: true, $id: false, $method: trocha.POST}
apiResource.update = {$hide: true, $method: trocha.PATCH}
apiResource.delete = {$hide: true, $method: trocha.DELETE}

serverRoutes = trocha {
	domain: 'https://myRESTfulAPI.net.co'
	post: '.json'
	alwaysPost: true
	alwaysUrl: true
	resource: apiResource
	routes:
		products:
			$type: trocha.RESOURCE # Note this is String
			$id: product_id
```

> This should generate:

```bash
https://myRESTfulAPI.net.co/products/:product_id.json # get
https://myRESTfulAPI.net.co/products/list.json # get
https://myRESTfulAPI.net.co/products.json # post
https://myRESTfulAPI.net.co/products/:product_id.json # patch
https://myRESTfulAPI.net.co/products/:product_id.json # delete
```

You can create your customs resources, ideal for RESTful apis (see
[Best practices](#301-best-practices),
[Methods](#205-methods) and
[Constants](#202-constants)
)

When you're defining your trocha object add an `resource` object, it will be use has reference for any resource within this trocha object.

* You can copy and modify default resource at `trocha.$RESOURCE`

## Scope

```javascript
const myRoutes = trocha( {
	routes: {
		portal: {
			$type: trocha.SCOPE,
			dashboard: {}
		}
	}
});
//OR
let myRoutes = trocha();
myRoutes._newScope( {
	name: "portal"
});
myRoutes.portal._newRoute( {
	name: "dashboard"
});
```

```coffeescript
myRoutes = trocha {
	routes:
		portal:
			$type: trocha.SCOPE
			dashboard: {}
}
#OR
myRoutes = trocha()
myRoutes._newScope {
	name: "portal"
}
myRoutes.portal._newRoute {
	name: "dashboard"
}
```

> This should generate:

```bash
/portal/dashboard
```

Is just a level of the route tree.

* Does not offer `path()`.
* Can be parent of any kind of other routes.

## Alias


```javascript
const cdns = trocha( {
	routes: {
		// This is a cool vanilla views/routing system more @ http://mtrpcic.net/pathjs/
		pathjs: "https://cdn.rawgit.com/mtrpcic/pathjs/master/path.min.js"
	}
});
//OR
let cdns = trocha();
cdns._newAlias( {
	name: "pathjs",
	alias: "https://cdn.rawgit.com/mtrpcic/pathjs/master/path.min.js"
});
console.log(cdns.pathjs);
```

```coffeescript
cdns = trocha {
	routes:
		# This is a cool vanilla views/routing system more @ http://mtrpcic.net/pathjs/
		pathjs: "https://cdn.rawgit.com/mtrpcic/pathjs/master/path.min.js"
}
#OR
cdns = trocha()
cdns._newAlias {
	name: "pathjs"
	alias: "https://cdn.rawgit.com/mtrpcic/pathjs/master/path.min.js"
}
console.log cdns.pathjs
```

> This should print:

```bash
https://cdn.rawgit.com/mtrpcic/pathjs/master/path.min.js
```

This type of route can render an specific string independent of the name, it's usefull to print cdns and very long and isolated paths
<aside class="warning">
Note for `0.1.1` tag, alias print without the path function, this will change in future releases
</aside>
