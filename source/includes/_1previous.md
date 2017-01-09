# 99 - Why this library exist
> Ugly code example

```javascript
theRoute = "https://my.domain.com.co/product/" +
myProduct.id +
"/buy" +
"?quantity=" +
sell.quantity;
```

```coffeescript
theRoute = "https://my.domain.com.co/product/"+
myProduct.id+
"/buy"+
"?quantity="+
sell.quantity
```

> Objective code example

```javascript
theRoute = myRoutes.product.buy.path({
	product_id: myProduct.id,
	query: {quantity:sell.quantity}
});
```

```coffeescript
theRoute = myRoutes.product.buy.path {
	product_id: myProduct.id
	query: {confirm:"true"}
}
```


This library take inspiration from Ruby routing system, where you describe the routes via a simple name tree and call those routes via dinamic function naming, preventing use of string in views and controllers.

# 100 - Contributing

You can help me with this documentation editing/translating [here](https://github.com/DFOXpro/trocha/tree/develop/src/doc), or reporting issues [here](https://github.com/DFOXpro/trocha/issues), or improbe the source code [here](https://github.com/DFOXpro/trocha/tree/master/src).

