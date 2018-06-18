# 300 - Real World applications

Note the main goal of this library is to declare routes, not to handle.


## When to use

* When your web project implement extense Client-side routing.
* When your project make calls to a RESTful server.
* When your project is **NodeJS** server side rendered.

## When do not use

* When your project is server side rendered(PHP, Java, ASP, RoR), use backend framework route system instead.
* When you are looking **ONLY** for a client side route _handler_, like Angular or [pathjs](http://mtrpcic.net/pathjs/)


## Alternativeto TrochaJS
* Server-side [RoR Routes](http://edgeguides.rubyonrails.org/routing.html). This system is the inspiration of this library.
* Client-side RoR, generates javascript file that defines all Rails named routes as javascript helpers [js-routes](https://github.com/railsware/js-routes). Note this compile **entire** routes.rb tree.
* Client-side ASP.NET MVC or WebForms routes from JavaScript [RouteJs](https://github.com/Daniel15/RouteJs).

## Advance ID handling
```shell
/reports
/reports/123
/reports/tables
/reports/tables/321
```

```javascript
myRoutes = trocha( {
	routes: {
		reports: {
			$id: 'report_id',
			tables: {
				show: {$hide: true},
				$id: 'table_id',
				// Next (any of two)lines makes the best solution
				// parentId: false // OR
				// report_id: false
			}}
	}
});
```

```coffeescript
myRoutes = trocha
	routes:
		reports:
			$id: 'report_id'
			tables:
				show: $hide: true
				$id: 'table_id'
				# Next (any of two)lines makes the best solution
				# parentId: false #  OR
				# report_id: false
```
> You can get this with:

```javascript
console.log myRoutes.reports.path({report_id: false})
console.log myRoutes.reports.path({report_id: ''}) // equal to previous
console.log myRoutes.reports.path({report_id: 123})

console.log myRoutes.reports.path({report_id: 'tables'}) // may be not the best idea
console.log myRoutes.reports.tables.path({parentId: false, table_id: false}) // :(
console.log myRoutes.reports.tables.show.path({report_id: false})
console.log myRoutes.reports.tables.show.path({parentId: false})
// if parentId defined in contructor (best idea)
console.log myRoutes.reports.tables.show.path()
console.log myRoutes.reports.tables.path(table_id: 321)
```

```coffeescript
console.log myRoutes.reports.path report_id = false
console.log myRoutes.reports.path report_id = '' # equal to previous
console.log myRoutes.reports.path report_id = 123

console.log myRoutes.reports.path report_id = 'tables' # may be not the best idea
console.log myRoutes.reports.tables.path parentId: false, table_id: false # :(
console.log myRoutes.reports.tables.show.path report_id = false
console.log myRoutes.reports.tables.show.path parentId: false
# if `(parentId or report_id): false` defined in contructor (best idea)
console.log myRoutes.reports.tables.show.path()
console.log myRoutes.reports.tables.path table_id: 321
```
> You can get this with:

```shell
/reports
/reports
/reports/123

/reports/tables # :(
/reports/tables # :(
/reports/tables/:table_id
/reports/tables/:table_id

/reports/tables # :)
/reports/tables/321 # :)
```

See the requested routes:

In some cases is useful to set the `parentId: false` or `\<Id\>: false` in the contructor for DRY code
