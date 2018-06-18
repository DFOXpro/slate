# 204 - Route printing parameters
```javascript
myRoutes = trocha( {
	pre: '/templates', // note the /
	post: '-myH45H.html',
	domain: 'https://mydomain.net.co',
	routes: {
		town: {
			$id: 'town_name',
			house: {
				$id: 'address'
			}
		}
	}
});
console.log(myRoutes.town.path());
console.log(myRoutes.town.path({url: true})); //only if alwaysUrl is not set
console.log(myRoutes.town.path({pre: true}));
console.log(myRoutes.town.path({post: true})); //only if alwaysPost is not set
console.log(myRoutes.town.path({ext: true}));
console.log(myRoutes.town.path({hide: true}));
console.log(myRoutes.town.path({query: {description: true, pictures: 4}}));
console.log(myRoutes.town.path({fragment: 'references'}));
console.log(myRoutes.town.house.path({parentId: false}));
console.log(myRoutes.town.house.path({id: false}));
console.log(myRoutes.town.house.path({
	town_name: 'Sydney_NSW',
	address: 'P._Sherman_42_wallaby_way'
}));

```

```coffeescript
myRoutes = trocha
	pre: '/templates' # note the /
	post: '-myH45H.html'
	domain: 'https://mydomain.net.co'
	routes:
		town:
			$id: 'town_name'
			house:
				$id: 'address'
console.log myRoutes.town.path()
console.log myRoutes.town.path url: true # only if alwaysUrl is not set
console.log myRoutes.town.path pre: true
console.log myRoutes.town.path post: true # only if alwaysPost is not set
console.log myRoutes.town.path ext: true
console.log myRoutes.town.path hide: true
console.log myRoutes.town.path
	query:
		description: true
		pictures: 4
console.log myRoutes.town.path fragment: 'references'
console.log myRoutes.town.house.path parentId: false
console.log myRoutes.town.house.path id: false
console.log myRoutes.town.house.path
	town_name: 'Sydney_NSW'
	address: 'P._Sherman_42_wallaby_way'

```
> This should print:

```shell
/town/:town_name
https://mydomain.net.co/town/:town_name
/templates/town/:town_name
/town/:town_name-myH45H.html
/templates/town/:town_name-myH45H.html
/:town_name
/town/:town_name?description=true&pictures=4
/town/:town_name#references
/town/house/:address
/town/:town_name/house
/town/Sydney_NSW/house/P._Sherman_42_wallaby_way
```
After you define your routes the next think you wanna do is print those routes, to do that simply use the `path({args})` at the end of your desire route.

Parameters:

* `url: true` print domain if alwaysUrl is not set.
* `pre: true` print prefix.
* `post: <Boolean>` if `post: true` print the postfix, if `post: false`(note just `false` not `undefined` nor `null` nor `0`) will ignore alwaysPost route param.
* `ext: true` (extended) print prefix and postfix.
* `hide: true` Hide the last name of the path, if an id is setted it will appears anyway.
* `parentId: false` Hide the parent route id.
* `id: false` Hide the route id.
* `<someId>: String` set the value of some id of the route.
* `query: {<attribute>:<value>}` Print a define query `?<attribute>=<value>&...`.
* `fragment: String` Print the fragment `#<value>`.

<aside class="notice">
Note query attributes only support one level deep.
</aside>
