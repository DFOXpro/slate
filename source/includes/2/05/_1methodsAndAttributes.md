# 205 - Methods & attributes
When you create your own trocha object it offers a tree of routes objects where most of object offer a variety of methods/attributes. here the explanation what it does.
<aside class="notice">
Note creation methods have `_` prefix.

Attributes have the default prefix `$` to change see [$ & custom selector](#amp-customselector).
</aside>

## $name
```javascript
myRoutes = trocha( {
	routes: {
		country: {
			state: {
				city: {
					town: {}}}
		}
	}
});
console.log(myRoutes.country.$name);
console.log(myRoutes.country.state.$name);
console.log(myRoutes.country.state.city.town.$name);
```

```coffeescript
myRoutes = trocha {
	routes:
		country:
			state:
				city:
					town: {}
}
console.log myRoutes.country.$name
console.log myRoutes.country.state.$name
console.log myRoutes.country.state.city.town.$name
```
> This should print:

```shell
country
state
town
```
`<selector>name` Is a String, last child of the route.

## $as
```javascript
myRoutes = trocha( {
	routes: {
		country: {
			state: {
				city: {
					town: {}}}
		}
	}
});
console.log(myRoutes.country.$as);
console.log(myRoutes.country.state.$as);
console.log(myRoutes.country.state.city.town.$as);
```

```coffeescript
myRoutes = trocha {
	routes:
		country:
			state:
				city:
					town: {}
}
console.log myRoutes.country.$as
console.log myRoutes.country.state.$as
console.log myRoutes.country.state.city.town.$as
```
> This should print:

```shell
country
country_state
country_state_city_town
```
`<selector>as` Is a String, concatenate parent names and it self. (to easy identify the route).

This attribute is really useful if you want to declare controllers for your route handler like [Angular](#303-angular-1-x).
<aside class="success">
If you know the Ruby(language) Rails(framework) routes(gem) as(attribute) it works kind of alike when not defined ;).
</aside>

## $method
```javascript
serverRoutes = trocha( {
	routes: {
		students: {
			$method: trocha.GET,
			create: {
				$method: trocha.POST
			}
		}
	}
});
console.log(serverRoutes.students.$method);
console.log(serverRoutes.students.create.$method);
```

```coffeescript
myRoutes = trocha {
	routes:
		students:
			$method: trocha.GET
			create:
				$method: trocha.POST
}
console.log myRoutes.students.$method
console.log myRoutes.students.create.$method
```
> This should print:

```shell
GET
POST
```
`<selector>method` Is a String, the desired method of this route. See [Constants methods names](#http-request-methods-names) on how to set this String.

This attribute is really useful if you want to make XHR (ajax) calls, see [JQuery example](#304-JQuery).

## Methods
### path
`<route>.path({args})` See [Route printing parameters](#204-route-printing-parameters).

### _new<Route type>
This methods helps to create new child routes.

* `<route>._newRoute({args})`
* `<route>._newResource({args})`
* `<route>._newScope({args})`
* `<route>._newAlias({args})`

          | route     | resource  | scope     | alias     | Type   | What does
--------- | --------- | --------- | --------- | --------- | ------ | -----------------
name      | Mandatory | Mandatory | Mandatory | Mandatory | String | the name of this part of the path
id        | Optional  | Mandatory | NA        | NA        | String | A modificable ID_name see [Best practices](#301-best-practices)
hide      | Optional  | NA        | NA        | NA        | Bool   | Hide the actual name of this part of the path (ideal for indexs)
method    | Optional  | NA        | NA        | NA        | String | Define wich method will be used when requested this path
alias     | NA        | NA        | NA        | Mandatory | String | An String that replace the name

See [Routes & its parameters](#routes-amp-its-parameters).
