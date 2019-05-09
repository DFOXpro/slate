## separator

```javascript
LOCALES = new Trocha({
  separator: Trocha.DOT,
  // firstSeparator: true,
  routes: {
    store: { product: { info: { price: { discount: {} } } } }
  }
});
console.log(LOCALES.store.product.info.price.discount.path());
```

```coffeescript
LOCALES = new Trocha
	separator: Trocha.DOT
	# firstSeparator: true
	routes:
		store: product: info: price: discount: {}
console.log LOCALES.store.product.info.price.discount.path()
```

> This should print:

```shell
store.product.info.price.discount
```

You can use Trocha also to declare attributes list (I.E. Localization engines). Using `separator` will change this `/asd/:asd_id/qwe` to `asd.:asd_id.qwe` or `\asd\:asd_id\qwe`.

If you need the first separator to be (or not) present you can toggle with `firstSeparator: <Boolean>`.

Available separators are:

- `Trocha.SLASH` default, it's `/`, firstSeparator enable
- `Trocha.BACK_SLASH` it's `\`, firstSeparator enable
- `Trocha.DOT` it's `.`, firstSeparator disable by default
