# 203 - Route definition parameters
When you're creating your trocha object you can set some basic parameters so when a route need to be printed it will do with more or less content if you like.

## Routes & its parameters
```javascript
myRoutes = new Trocha( {
	routes: {
		home: {}, // A simple route
		The: { // It's supports many levels of hierarchy
			quick: {
				brown: {
					fox: {
						jumps: {
							over: {
								the: {
									lazy: {
										dog: {}}}}}}}}}, // that's why I prefer coffeescript ;)
		people: {
			$id: "name",
			update: {
				$hide: true, // The "update" will be hidden
				$method: Trocha.PATCH // This can be part of a (custom) resource ;)
			}
		},
		ninja: { // see 300 - Real World applications > Advance ID handling
			$id: "ninja_shadow",
			$justId: true,
			flying_shuriken: {
				$parentId: false,
				$id: 'shuriken_id'
			},
			silent_knife: { // note it does the same as Previous example, but more presise
				ninja_shadow: false,
				$id: 'knife_id'
			}
		}
	}
});
console.log(myRoutes.home.path());
console.log(myRoutes.The.quick.brown.path());
console.log(myRoutes.The.quick.brown.fox.jumps.over.the.lazy.dog.path());
console.log(myRoutes.people.update.path());
console.log(myRoutes.people.update.$method);
console.log(myRoutes.ninja.path());
console.log(myRoutes.ninja.flying_shuriken.path({shuriken_id: 'the·distracting·one'}));
console.log(myRoutes.ninja.silent_knife.path({knife_id: 'the·killer·one'}));
```

```coffeescript
myRoutes = new Trocha
	routes:
		home: {} # A simple route
		The: # It's supports many levels of hierarchy
			quick:
				brown:
					fox:
						jumps:
							over:
								the:
									lazy:
										dog: {} # that's why I prefer coffeescript ;)
		people:
			$id: "name"
			update:
				$hide: true # The "update" will be hidden
				$method: Trocha.PATCH # This can be part of a (custom) resource ;)
		ninja: # see 300 - Real World applications > Advance ID handling
			$id: "ninja_shadow"
			$justId: true
			flying_shuriken:
				$parentId: false
				$id: 'shuriken_id'
			silent_knife: # note it does the same as Previous example, but more presise
				ninja_shadow: false
				$id: 'knife_id'

console.log myRoutes.home.path()
console.log myRoutes.The.quick.brown.path()
console.log myRoutes.The.quick.brown.fox.jumps.over.the.lazy.dog.path()
console.log myRoutes.people.update.path()
console.log myRoutes.people.update.$method
console.log myRoutes.ninja.path()
console.log myRoutes.ninja.flying_shuriken.path shuriken_id: 'the·distracting·one'
console.log myRoutes.ninja.silent_knife.path knife_id: 'the·killer·one'
```
> This should print:

```bash
/home
/people/:name
PATCH
/:ninja_shadow
/flying_shuriken/the·distracting·one
/silent_knife/the·killer·one
/The/quick/brown
/The/quick/brown/fox/jumps/over/the/lazy/dog
```

`routes` is an optional(but recomended) object that define the entire routes tree of your trocha object.

A trivial example: `routes:{<name>:{...route parameters...}, <name>:"<alias>"}`

* This routes tree can have has many routes child of any type has you like.

* If you want a route with a reserved name like `/$id/` or `/$name/` please see [$ and customSelector](#$-and-customSelector)

* Note the selector `$` (`$hide:` for example) is only used when you create the routes via JSON constructor, if you want to use the [Method creation](#via-method) ignore the selector (use `hide:` instead)

Each route type suport diferent parameters, here a list on how to use:

           | route     | resource  | scope     | alias     | Type        | What does
---------- | --------- | --------- | --------- | --------- | ----------- | -----------------
$name (*)  | Mandatory | Mandatory | Mandatory | Mandatory | String      | the name of this part of the path
$alias (*) | NA        | NA        | NA        | Mandatory | String      | An String that replace the name
$id        | Optional  | Mandatory | NA        | NA        | String      | A modificable ID_name see [Best practices](#301-best-practices)
$method    | Optional  | NA        | NA        | NA        | String      | Define wich method will be used when requested this path
$hide      | Optional  | NA        | NA        | NA        | Bool(True)  | If true hide the actual name of this part of the path (ideal for indexs)
$justId    | Optional  | Optional  | Optional  | NA        | Bool(True)  | Same as $hide but needs $id
$parent_id | Optional  | Optional  | Optional  | NA        | Bool(False) | If false the parent id will be absent, can be Override in path()
\<Id\>     | Optional  | Optional  | Optional  | NA        | Bool(False) | If false the id will be absent, can be Override in path()

Note if `$hide` or `$justId` are false will do nothing, same goes to `$parent_id` or `\<Id\>` if true

(\*) Also note `name` and `alias` are only used when the route is defined vía method
