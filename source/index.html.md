---
title: Trocha JS routes list engine Reference

language_tabs:
  - javascript
  - coffeescript

toc_footers:
  - <a href='https://dfoxpro.github.io/trochaJS/0_2_0/'>Old 0.2.0 docs</a>
  - <a href='https://dfoxpro.github.io/trochaJS/0_1_3/'>Old 0.1.3 docs</a>
  - <a href='#100-contributing'>Español</a>
  - <a href='#100-contributing'>English</a>
  - <a href='#100-contributing'>Français</a>
  - <a href='https://github.com/tripit/slate'>Documentation Powered by Slate</a>

includes:
  - 0previous
  - 1basics
  - 2/01typeOfRoutes
  - 2/02constants
  - 2/03/1routeDefinitionParameters
  - 2/03/2domainAndAlwaysUrl
  - 2/03/3prefixAndPostfix
  - 2/03/4idMode
  - 2/03/5customSelector
  - 2/04/1routePrintingParameters
  - 2/05/1methodsAndAttributes
  - 3/00realWorldApplications
  - 3/01bestPractices
  - 3/02-3-4examples
  - 4errors
  - 6licence

search: true
---

# TrochaJS

> [![MPL license](https://img.shields.io/npm/l/trocha.svg?style=plastic&logo=Mozilla)](https://www.mozilla.org/en-US/MPL/2.0/FAQ)
[![npm version](https://img.shields.io/npm/v/trocha.svg?style=plastic&logo=npm)](https://www.npmjs.com/package/trocha)
[![Github project](https://img.shields.io/badge/src-DFOXpro/trocha-brightgreen.svg?style=plastic&logo=Github)](https://github.com/DFOXpro/trocha)
[![Build Status](https://img.shields.io/travis/DFOXpro/trocha.svg?logo=Travis%20CI&logoColor=FFFFFF&style=plastic)](https://travis-ci.org/DFOXpro/trocha)

> [![Test Node](https://img.shields.io/badge/asserts-173/173-brightgreen.svg?style=plastic&logo=Node.js)](https://github.com/DFOXpro/trocha/tree/master/src/test)
[![Test FX](https://img.shields.io/badge/asserts-173/173-brightgreen.svg?style=plastic&logo=Mozilla%20Firefox)](https://github.com/DFOXpro/trocha/tree/master/src/test)
[![Test Chromium](https://img.shields.io/badge/asserts-173/173-brightgreen.svg?style=plastic&logo=Google%20Chrome)](https://github.com/DFOXpro/trocha/tree/master/src/test)
[![Test Edge](https://img.shields.io/badge/asserts-173/173-brightgreen.svg?style=plastic&logo=Microsoft%20Edge)](https://github.com/DFOXpro/trocha/tree/master/src/test)
[![Test IE](https://img.shields.io/badge/11%20asserts-170/173-brightgreen.svg?style=plastic&logo=Internet%20explorer&color=important)](https://github.com/DFOXpro/trocha/tree/master/src/test)

> [![Contact info](https://img.shields.io/badge/contact-@DFOXpro-informational.svg?style=plastic&logo=Twitter)](https://twitter.com/dfoxpro)
[![Share info](https://img.shields.io/badge/share-%23TrochaJS-informational.svg?style=plastic&logo=Twitter)](https://twitter.com/hashtag/TrochaJS)

> [New in 0.2.1: idMode](#idmode) [![Commits since release](https://img.shields.io/github/commits-since/DFOXpro/trocha/0.2.0.svg?style=plastic&logo=Github)]()

> [New in 0.2.0: alias.path](#alias) [![Commits since previous release](https://img.shields.io/github/commits-since/DFOXpro/trocha/0.1.3.svg?style=plastic&logo=Github)]()

> [Full changelog here](https://github.com/DFOXpro/trocha/blob/master/CHANGELOG.md)

It's a standalone javascript library that describe route listing.
Ideal for client-side route management (SPAs and XHR/Ajax async request) and NodeJS route declaration.

see our [Hello Wolrd code example](#101-intro-to-trocha-js) to lear more.

### What it does

**print** clean routes for your javascript projects and even help `<your favorite>` (framework/set of libraries) to **describe** your app routes.

### What it does not

**handle** route/view for your app nor framework.

See [vanilla implementation](#302-vanilla) or [Angular 1.X implementation](#304-angular-1-x).
