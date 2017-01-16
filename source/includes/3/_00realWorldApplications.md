# 300 - Real World applications
Note the main goal of this library is to declare routes, not to handle


## When to use

* When your web project implement extense Client-side routing.
* When your project make calls to a RESTful server.
* When your project is node server side rendered.

## When do not use

* When your project is server side rendered(Java, PHP, RoR, ASP), use backend framework route system instead.
* When you are looking **ONLY** for a client side route _handler_, like Angular or [pathjs](http://mtrpcic.net/pathjs/)


## Alternativeto TrochaJS
* Server-side [RoR Routes](http://edgeguides.rubyonrails.org/routing.html). This system is the inspiration of this library.
* Client-side RoR, generates javascript file that defines all Rails named routes as javascript helpers [js-routes](https://github.com/railsware/js-routes). Note this compile entire routes.rb tree (admin, unsecure routes).
* Client-side ASP.NET MVC or WebForms routes from JavaScript [RouteJs](https://github.com/Daniel15/RouteJs).
