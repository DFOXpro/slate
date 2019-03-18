# 202 - Constants

```javascript
console.log(Trocha.GET);
```

```coffeescript
console.log Trocha.GET
```

> This should print:

```bash
GET
```

The Trocha class also offers a set of useful constants, to call those constants simply write `Trocha.<CONST_NAME>` or within the module include `import {Trocha, GET, ROUTE, $RESOURCE} from 'trocha'`.

<aside class="notice">
Some constants have the prefix `$` this means it's an object not an string
</aside>

## Route types names
```javascript
const ROUTES = new Trocha({
	routes:{
		route_a: {
			$type: Trocha.ROUTE // Not necesary
		},
		route_b: {},
		scope: {
			$type: Trocha.SCOPE
		},
		resource: {
			$type: Trocha.RESOURCE
		},
		alias: { // if alias don't have child, should be use the alias string directly
			$type: Trocha.ALIAS,
			$alias: "theAlias"
		}
	}
});
```
```coffeescript
ROUTES = new Trocha
	routes:
		route_a:
			$type: Trocha.ROUTE # Not necesary
		route_b: {}
		scope:
			$type: Trocha.SCOPE
		resource:
			$type: Trocha.RESOURCE
		alias: # if alias don't have child, should be use the alias string directly
			$type: Trocha.ALIAS
			$alias: "theAlias"
```

There are 4 type of routes implemented in trocha but only 2 route type names normally is needed to be use:

* `Trocha.SCOPE`
* `Trocha.RESOURCE`
* `Trocha.ALIAS`
* `Trocha.ROUTE`

The other 2 can be defined via:

* Routes are the default type need no `$type`
* Alias can be initialized via a simple String

See [Type of routes](#201-type-of-routes).



## HTTP request methods names

```javascript
const ROUTES = {
	SERVER: new Trocha({
		domain: 'https://myRESTfulAPI.net.co',
		alwaysUrl: true,
		routes:{
			users: {
				login: {
					$method: Trocha.PATCH
				}
			}
		}
	});
};
```

```coffeescript
ROUTES.SERVER = new Trocha
	domain: 'https://myRESTfulAPI.net.co'
	alwaysUrl: true
	routes:
		users:
			login:
				$method: Trocha.PATCH
```

> This should generate:

```bash
users.login:
	url: https://myRESTfulAPI.net.co/users/login
	method: PATCH
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
data.user =
	username: $scope.data.user.toLowerCase()
	password: $scope.data.password
$http
	url: ROUTES.SERVER.users.login.path()
	method: ROUTES.SERVER.users.login.$method
	data: data
.then (response) ->
	# Your amazing login success code
, (response) ->
	# Your amazing login fail code
```

There are 9 HTTP request methods names implemented in trocha:

* `Trocha.GET`
* `Trocha.POST`
* `Trocha.PATCH`
* `Trocha.DELETE`
* `Trocha.HEAD`
* `Trocha.PUT`
* `Trocha.CONNECT`
* `Trocha.OPTIONS`
* `Trocha.TRACE`

Those names are usefull when you're using the route object to point a RESTful server see [Angular 1.X implentation](#304-angular-1-x)
You can set/get the method name of any of your routes via the `$method` param/attribute.
Remember the objective of trocha is to avoid the use of repetitive or unmantenable Strings

* For any Route or Alias default $method is `GET`
* Scopes and Resource base routes has no $method
* It's interacting with customSelector so `<customSelector>method` to set and get this attribute

## Resource base object

```javascript
var myResource = Trocha.$RESOURCE
const ROUTES = new Trocha({customSelector: 'TC_'})
var myOtherResource = ROUTES.TC_RESOURCE

```

```coffeescript
myResource = Trocha.$RESOURCE
ROUTES = new Trocha customSelector: 'TC_'
myOtherResource = ROUTES.TC_RESOURCE
```

> This should generate:

```json
{
"myResource": {
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
},
"myOtherResource": {
	"TC_id": "id",
	"edit": {},
	"list": {
		"TC_hide": true,
		"TC_id": false
	},
	"new": {
		"TC_id": false
	},
	"show": {
		"TC_hide": true
	}
}}
```

`Trocha.$RESOURCE` This routes tree (object like the `routes: {...}` you do) define how any resource will be created within this trocha object, you can modify this object if you want to create [Custom resources](#custom-resource)

 * It’s interacting with customSelector so `<customSelector>RESOURCE` to get this object
