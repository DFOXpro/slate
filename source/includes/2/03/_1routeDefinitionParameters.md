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
