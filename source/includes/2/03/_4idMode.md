## idMode

```javascript
serverRoutes = new Trocha( {
	idMode: Trocha.BRACKETS,
	routes: {
		hello: {
			$id: 'name'
		}
	}
});
console.log(serverRoutes.hello.path());
```

```coffeescript
serverRoutes = new Trocha
	idMode: Trocha.BRACKETS,
	routes: hello:
		$id: 'name'
console.log serverRoutes.hello.path()
```

> This should print:

```bash
https://mydomain.net.co/hello/{name}
# Normally is
# https://mydomain.net.co/hello/:name
```

You can choice the id mode of your routes via `idMode` constructor attribute.

`idMode` can be:

    `Trocha.BRACKETS` will render: `/{id}`.

    `Trocha.COLON` will render: `/:id`, this is the default behavior.

This is useful for not so standard framework/libraries.
<aside class="info">
New in `0.2.1`! before this only `/:id` idMode was rendered
</aside>
