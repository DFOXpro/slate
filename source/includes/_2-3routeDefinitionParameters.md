# 203 - Route definition parameters
When you're creating your trocha object you can set some basic parameters so when a route need to be printed it will do with more or less content if you like.

## Routes & its parameters
```javascript
myRoutes = trocha( {
	routes: {
		home: {},
		people: {
			$id: "name",
			update: {
				$hide: true,
				$method: trocha.PATCH
			}
		},
		The: {
			quick: {
				brown: {
					fox: {
						jumps: {
							over: {
								the: {
									lazy: {
										dog: {}}}}}}}}}
// that's why I prefer coffeescript ;)
	}
});
console.log(myRoutes.home.path());
console.log(myRoutes.people.update.path());
console.log(myRoutes.people.update.$method);
console.log(myRoutes.The.quick.brown.path());
console.log(myRoutes.The.quick.brown.fox.jumps.over.the.lazy.dog.path());
```

```coffeescript
myRoutes = trocha {
	routes:
		home: {}
		people:
			$id: "name"
			update:
				$hide: true
				$method: trocha.PATCH
		The:
			quick:
				brown:
					fox:
						jumps:
							over:
								the:
									lazy:
										dog: {}
# that's why I prefer coffeescript ;)
console.log myRoutes.home.path()
console.log myRoutes.people.update.path()
console.log myRoutes.people.update.$method
console.log myRoutes.The.quick.brown.path()
console.log myRoutes.The.quick.brown.fox.jumps.over.the.lazy.dog.path()
```
> This should print:

```bash
/home
/people/:name
PATCH
/The/quick/brown
/The/quick/brown/fox/jumps/over/the/lazy/dog
```

`routes` is an optional(but recomended) object that define the entire routes tree of your trocha object.

A trivial example: `routes:{<name>:{...route parameters...}, <name>:"<alias>"}`

* This routes tree can have has many routes child of any type has you like.

* If you want a route with a reserved name like `/$id/` or `/$name/` please see [$ and customSelector](#$-and-customSelector)

* Note the selector `$` (`$hide:` for example) is only used when you create the routes via JSON constructor, if you want to use the [Method creation](#via-method) ignore the selector (use `hide:` instead)

Each route type suport diferent parameters, here a list on how to use:

           | route     | resource  | scope     | alias     | Type   | What does
---------- | --------- | --------- | --------- | --------- | ------ | -----------------
$name (*)  | Mandatory | Mandatory | Mandatory | Mandatory | String | the name of this part of the path
$id        | Optional  | Mandatory | NA        | NA        | String | A modificable ID_name see [Best practices](#301-best-practices)
$hide      | Optional  | NA        | NA        | NA        | Bool   | Hide the actual name of this part of the path (ideal for indexs)
$method    | Optional  | NA        | NA        | NA        | String | Define wich method will be used when requested this path
$alias (*) | NA        | NA        | NA        | Mandatory | String | An String that replace the name

(*) Also note `name` and `alias` are only used when the route is defined vía method

## Prefix & postfix string
```javascript
templateRoutes = trocha( {
	pre: '/templates', // note the /
	post: '-myH45H.html',
	alwaysPost: true,
	routes: {
		home: {}
	}
});
console.log(templateRoutes.home.path());
console.log(templateRoutes.home.path({pre: true}));
console.log(templateRoutes.home.path({ext: true})); //only if alwaysPost is not set
```

```coffeescript
templateRoutes = trocha {
	pre: '/templates' # note the /
	post: '-myH45H.html'
	alwaysPost: true
	routes:
		home: {}
console.log templateRoutes.home.path()
console.log templateRoutes.home.path {pre: true}
console.log templateRoutes.home.path {ext: true} #only if alwaysPost is not set
```
> This should print:

```shell
/home-myH45H.html
/templates/home-myH45H.html
/templates/home-myH45H.html
```

You can add Strings at the begining or end your path if you needed, for example if you need add an extention like `.html` to all your routes simply add as a contructor attribute `post: ".html", alwaysPost: true,`

* `pre` and `post` Strings within the constructor object will be the defaults Strings for the entire routes tree.
* Those Strings does not compute any level(`/`) so if you need it this must especify.
* Those Strings only compute once, example: `<pre>/my/long/route<post>`
* You can the the raw Strings of your Trocha object via `$alwaysPost`, `$post` and `$pre` attributes
* If `alwaysPost` is not set, you can print the `pre` or `post` String within the path function `{pre:true,post:true}`
* You can overide `alwaysPost` within the path function `{pre:false}`

<aside class="notice">
Avoid the use of <code>pre</code> if <code>domain</code> can be use
</aside>

see [Route printing parameters](#204-route-printing-parameters) for furter explanation

## $ & customSelector

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


# 204 - Route printing parameters

# 205 - Methods & attributes