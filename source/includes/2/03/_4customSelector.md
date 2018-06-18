## $ & customSelector
```javascript
myRoutes = trocha( {
	customSelector: 'TRCH',
	routes: {
		hello: {
			TRCHid: 'name',
			TRCHmethod: trocha.GET,
			$id: {}
		}
	}
});
console.log(myRoutes.hello.path({name: 'World'}));
console.log(myRoutes.hello.TRCHid);
console.log(myRoutes.hello.$id);
console.log(myRoutes.hello.TRCHmethod);
console.log(myRoutes.hello.$id.path());
```

```coffeescript
myRoutes = trocha
	customSelector: 'TRCH'
	routes:
		hello:
			TRCHid: 'name'
			TRCHmethod: trocha.GET
			$id: {}
console.log myRoutes.hello.path {name: 'World'}
console.log myRoutes.hello.TRCHid
console.log myRoutes.hello.$id
console.log myRoutes.hello.TRCHmethod
console.log myRoutes.hello.$id.path()
```
> This should print:

```shell
/hello/World
name
Object {... trocha route object ...}
GET
/hello/:name/$id
```
.
<aside class="warning">
Please dont use yet, see [related bug](https://github.com/DFOXpro/trocha/issues/4)
</aside>

If you have a route like this `/asd/$id/qwe` you will notice you can't directly set an `$id` route name, thats because by default the JSON constructor use `$` as a prefix to reserved names.

If you need to use it anyway, you can overide the selector, simply add `customSelector: 'TRCH'` to your inicializer object.
<aside class="notice">
Note when you use custom selector it apply boot in constructor object and all routes object, see [Methods & attributes](#205_Methods_amp_attributes).
</aside>
<aside class="notice">
Is recomended to use some acronym like `TRCH` for example isntead of just one char (maybe noisy within your routes) or unicode (maybe crash in some browsers/precompilers).
</aside>
<aside class="warning">
Avoid selectors like `/` this one have many other meanings in URL's standar;

also avoid `_`, it's a separator within this library and
finally any javascript variable illegal character like `#`, `\`, `@`...
</aside>
