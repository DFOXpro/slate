# 202 - Constants

```javascript
console.log(trocha.GET);
```

```coffeescript
console.log trocha.GET
```

> This should print:

```bash
GET
```

The Trocha constructor also offers a set of useful constants, to call those constants simply write `trocha.<CONST_NAME>`.

<aside class="notice">
Some constants have the prefix `$` this means it's not an String
</aside>

## Route types names
```javascript
const ROUTES = trocha({
	routes:{
		route_a: {
			$type: trocha.ROUTE // Not necesary
		},
		route_b: {},
		scope: {
			$type: trocha.SCOPE
		},
		resource: {
			$type: trocha.RESOURCE
		},
		alias: "theAlias"
	}
});
```
```coffeescript
ROUTES = trocha {
	routes:
		route_a:
			$type: trocha.ROUTE # Not necesary
		route_b: {}
		scope:
			$type: trocha.SCOPE
		resource:
			$type: trocha.RESOURCE
		alias: "theAlias"
}
```

There are 4 type of routes implemented in trocha but only 2 route type names need to be use:

* `trocha.SCOPE`
* `trocha.RESOURCE`

The other 2 can be defined via:

* Routes are the default type need no `$type`
* Alias can be initialized via a simple String

See [Type of routes](#201-type-of-routes).



## HTTP request methods names

```javascript
const ROUTES = {
	SERVER: trocha({
		domain: 'https://myRESTfulAPI.net.co',
		alwaysUrl: true,
		routes:{
			users: {
				login: {
					$method: trocha.GET
				}
			}
		}
	});
};
```

```coffeescript
ROUTES.SERVER = trocha {
	domain: 'https://myRESTfulAPI.net.co'
	alwaysUrl: true
	routes:
		users:
			login:
				$method: trocha.GET
}
```

> This should generate:

```bash
users.login:
	url: https://myRESTfulAPI.net.co/users/login
	method: GET
```

> You can use this in Angular 1.X xhr calls, for example:

```javascript
// some Angular 1.X code
data.user = {
	username: $scope.data.user.toLowerCase(),
	password: $scope.data.password
};
$http({
	url: ROUTES.SERVER.users.login.path(),
	method: ROUTES.SERVER.users.login.$method,
	data: data
} ).then( (response) => {
	// Your amazing login success code
}, (response) => {
	// Your amazing login fail code
});
```

```coffeescript
# some Angular 1.X code
data.user = {
	username: $scope.data.user.toLowerCase()
	password: $scope.data.password
}
$http({
	url: ROUTES.SERVER.users.login.path()
	method: ROUTES.SERVER.users.login.$method
	data: data
} ).then (response) ->
	# Your amazing login success code
, (response) ->
	# Your amazing login fail code
```

There are 9 HTTP request methods names implemented in trocha:

* `trocha.GET`
* `trocha.POST`
* `trocha.PATCH`
* `trocha.DELETE`
* `trocha.HEAD`
* `trocha.PUT`
* `trocha.CONNECT`
* `trocha.OPTIONS`
* `trocha.TRACE`

Those names are usefull when you're using the route object to point a RESTful server see [Angular 1.X implentation](#303-angular-1-x)
You can set/get the method name of any of your routes via the `$method` param/attribute.
Remember the objective of trocha is to avoid the use of repetitive or unmantenable Strings

## Resource base object

```javascript
(=> {
	trocha.$RESOURCE
})()
```

```coffeescript
(->
	trocha.$RESOURCE
)()
```

> This should return an object:

```json
{
	"$id": "id",
	"edit": {},
	"list": {
		"$hide": true,
		"$id": false
	},
	"new": {
		"$id": false
	},
	"show": {
		"$hide": true
	}
}
```

`trocha.$RESOURCE` This routes tree (object like the `routes: {...}` you do) define how any resource will be created within this trocha object, you can modify this object if you want to create [Custom resources](#custom-resource)

# 203 - Route definition parameters

# 204 - Route printing parameters

# 205 - Methods