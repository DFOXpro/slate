# 100 - Basics
# 101 - Intro to Trocha JS

> Insert the library within your page

```html
<body>
...Your page tags
<script src="https://cdn.rawgit.com/DFOXpro/trocha/0.1.2/dist/trocha.min.js"></script>
...Your other scripts
</body>
```

> Now define routes

```javascript
var myRoutes = trocha({
	routes:{
		hello:{
			$id: "name"
		}
	}
});
```

```coffeescript
myRoutes = trocha {
	routes:
		hello:
			$id: "name"
}
```

> finally print the routes

```javascript
console.log(myroutes.hello.path());
console.log(myroutes.hello.path({name: "World"}));
```


```coffeescript
console.log myroutes.hello.path()
console.log myroutes.hello.path {name: "World"}
```

> This will print:

```
/hello/:name
/hello/World
```

Welcome to Trocha JS routes engine, the main goal of this library is to prevent use of annoing/unmantenible strings in sources(JS) and markup(HTML) files of your big projects.

This library does not depend of any other library/framework but can be integrated in those (AngularJS 1.X for example), also can be used on node and any mayor browser.


# 102 - Defining routes

You can define routes tree with a simple JSON when initialize or after that with a method, please see [Best practices](#301-best-practices) and [Type of routes](#201-type-of-routes) for depper explanation

## Via JSON constructor

```javascript
const myRoutes = trocha( {
	routes: {
		index: {
			$hide: true
		},
		contact: {},
		hello: {
			$id: "name"
		},
		crud: {
			$type: trocha.RESOURCE,
			$id: "crud_id"
		},
		faq: "FrequentlyAskedQuestions"
	}
});
```

```coffeescript
myRoutes = trocha {
	routes:
		index:
			$hide: true
		contact: {}
		hello:
			$id: "name"
		crud:
			$type: trocha.RESOURCE
			$id: "crud_id"
		faq: "FrequentlyAskedQuestions"
}
```

> This should generate:

```bash
/ # Not in 0.1.2 tag
/contact
/hello/:name
/crud #get = list
/crud/new #get = view for create
/crud/:crud_id #get = show
/crud/:crud_id/edit #get = view for update
/FrequentlyAskedQuestions # via myRoutes.faq
```

This is the recomended way to define your routes tree, when create your trocha object simply add a `routes` object tree.

Note the `$` prefix this is used to separate trocha especific inputs of route names, this can be change see [Route definition parameters](#202-route-definition-parameters).

## Via method

```javascript
let myRoutes = trocha();
myRoutes._newRoute({
	name: "hello",
	id: "name"
});
myRoutes._newAlias({
	name: "faq",
	alias: "FrequentlyAskedQuestions"
});
```

```coffeescript
myRoutes = trocha()
myRoutes._newRoute {
	name: "hello"
	id: "name"
}
myRoutes._newAlias {
	name: "faq"
	alias: "FrequentlyAskedQuestions"
}
```

> This should generate:

```bash
/hello/:name
/FrequentlyAskedQuestions # via myRoutes.faq
```

This route definition mode can be used in any part of the code, also is usefull to change a route definition.
<aside class="warning">
Note `myRoutes` can't be `const`
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
myRoutes.faq; //This will change for path()
```

```coffeescript
myRoutes.index.path()
myRoutes.contact.path()
myRoutes.hello.path {name: "World"}
myRoutes.crud.list.path()
myRoutes.crud.new.path()
myRoutes.crud.show.path{
	crud_id: "ASD"
	query: {guest: "true"}
}
myRoutes.crud.edit.path()
myRoutes.faq #This will change for path()
```

> This should generate:

```bash
/ # Not in 0.1.2 tag
/contact
/hello/World
/crud #get = list
/crud/new #get = view for create
/crud/ASD?guest=true #get = show
/crud/:crud_id/edit #get = view for update
/FrequentlyAskedQuestions # via myRoutes.faq
```

To print any of your routes simply use `path()` function at the end of the route.
See [Route printing parameters](#204-route-printing-parameters)
<aside class="warning">
Note for `0.1.2` tag, alias print without the path function, this will change in future releases
</aside>
