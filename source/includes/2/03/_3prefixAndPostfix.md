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
Avoid the use of `pre` if `domain` can be use
</aside>

see [Route printing parameters](#204-route-printing-parameters) for furter explanation
