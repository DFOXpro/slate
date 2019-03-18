# 100 - Basics
# 101 - Intro to Trocha JS

> Get a copy of the library via npm

```
npm i trocha
```

> Insert the library within your page

```html
<body>
...Your page tags
<script src="https://<aCDN>/trocha/0.2.0/dist/trocha_library.min.js"></script>
...Your other scripts
</body>
```

> Or via ES6 modules

```javascript
import {Trocha} from 'trocha'
```

```coffeescript
import {Trocha} from 'trocha'
```

> Now define routes

```javascript
var myRoutes = new Trocha({
	routes:{
		hello:{
			$id: "name"
		}
	}
});
```

```coffeescript
myRoutes = new Trocha
	routes:
		hello:
			$id: "name"
```

> finally print the routes

```javascript
console.log(myroutes.hello.path());
console.log(myroutes.hello.path({name: "World"}));
```


```coffeescript
console.log myroutes.hello.path()
console.log myroutes.hello.path name: "World"
```

> This will print:

```
/hello/:name
/hello/World
```

Welcome to Trocha JS routes engine, the main goal of this library is to prevent use of annoing/unmantenible strings in sources(JS) and markup(HTML) files of your big projects.

This library does not depend of any other library/framework but can be integrated in those (React/Vue/Angular/Vanilla for example), also can be used on node and any mayor browser.
<aside class="info">
Note since `0.2.0` tag, Trocha is a class so now is Capitalize and use 'new' on init `new Trocha()`
</aside>

# 102 - Defining routes

You can define routes tree with a simple JSON when initialize or after that with a method, please see [Best practices](#301-best-practices) and [Type of routes](#201-type-of-routes) for depper explanation

## Via JSON constructor

```javascript
const myRoutes = new Trocha( {
	routes: {
		index: {
			$hide: true
		},
		contact: {},
		hello: {
			$id: "name"
		},
		crud: {
			$type: Trocha.RESOURCE,
			$id: "crud_id"
		},
		faq: "/FrequentlyAskedQuestions"
	}
});
```

```coffeescript
myRoutes = new Trocha
	routes:
		index:
			$hide: true
		contact: {}
		hello:
			$id: "name"
		crud:
			$type: Trocha.RESOURCE
			$id: "crud_id"
		faq: "/FrequentlyAskedQuestions"
```

> This should generate:

```bash
 # an empty string return index
/contact
/hello/:name
/crud # get = list
/crud/new # get = view for create
/crud/:crud_id # get = show
/crud/:crud_id/edit # get = view for update
/FrequentlyAskedQuestions # via myRoutes.faq
```

This is the recomended way to define your routes tree, when create your trocha object simply add a `routes` object tree.

Note the `$` prefix this is used to separate trocha especific inputs of route names, this can be change see [Route definition parameters](#203-route-definition-parameters).

## Via method

```javascript
let myRoutes = new Trocha();
myRoutes._newRoute({
	name: "hello",
	id: "name"
});
myRoutes._newAlias({
	name: "faq",
	alias: "/FrequentlyAskedQuestions"
});
```

```coffeescript
myRoutes = new Trocha()
myRoutes._newRoute
	name: "hello"
	id: "name"
myRoutes._newAlias
	name: "faq"
	alias: "/FrequentlyAskedQuestions"
```

> This should generate:

```bash
/hello/:name
/FrequentlyAskedQuestions # via myRoutes.faq
```

This route definition mode can be used in any part of the code, also is usefull to change a route definition.
<aside class="warning">
Note `myRoutes` should not be `const`
</aside>

Avoid this way, please see [Best practices](#301-best-practices) for depper explanation.

# 103 - Printing routes

> See [101's Via JSON constructor](#via-json-constructor) this is a continue of this example

```javascript
myRoutes.index.path();
myRoutes.contact.path();
myRoutes.hello.path({name:"World"});
myRoutes.crud.list.path();
myRoutes.crud.new.path();
myRoutes.crud.show.path({
	crud_id:"ASD",
	query:{guest:"true"}
});
myRoutes.crud.edit.path();
myRoutes.faq.path();
```

```coffeescript
myRoutes.index.path()
myRoutes.contact.path()
myRoutes.hello.path name: "World"
myRoutes.crud.list.path()
myRoutes.crud.new.path()
myRoutes.crud.show.path
	crud_id: "ASD"
	query: guest: "true"
myRoutes.crud.edit.path()
myRoutes.faq.path()
```

> This should generate:

```bash
 # Empty string
/contact
/hello/World
/crud # get = list
/crud/new # get = view for create
/crud/ASD?guest=true # get = show
/crud/:crud_id/edit # get = view for update
/FrequentlyAskedQuestions # via myRoutes.faq
```

To print any of your routes simply use `path()` function at the end of the route.
See [Route printing parameters](#204-route-printing-parameters)
<aside class="info">
Note since `0.2.0` tag, alias print with the path function
</aside>
