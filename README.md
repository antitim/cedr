# cedr [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> Cedr - is a page builder from library of blocks.

## About

Inspired by [BEM](https://en.bem.info/) and [bem-xjst](https://github.com/bem/bem-xjst)
Before you can use `cedr` strongly recommended to read [this methodolgy](https://en.bem.info/methodology/quick-start/)

## Installation

```sh
$ npm install --save cedr
```

## Usage

```js
const cedr = require('cedr');

let library = {
  'page': {
    templates: {
      'page': '<!DOCTYPE html><html><head></head><body class="{{ className }}">{{{ content }}}</body></html>',
      '__header': '<div class="{{ className }}">This is Header: {{{ content }}}</div>'
    }
  },
  'text': {
    templates: {
      'text': '<p class="{{ className }}">{{{ content }}}</p>'
    }
  }
}

let page = {
  block: 'page',
  content: [
    {
      block: 'text',
      content: 'text'
    },
    {
      block: 'page',
      element: 'header',
      content: 'Yeah!'
    }
  ]
};

cedr(page, library); 
// Return '<!DOCTYPE html><html><head></head><body class="page"><p class="text">text</p><div class="page__header">This is Header: Yeah!</div></body></html>'
cedr(page); 
// Return '<div class="page"><div class="text">text</div><div class="page__header">Yeah!</div></div>'

```
## API
cedr can be called with or without library of blocks.

### cedr(page[, library])

#### page
Type: `Object`

The object of page. [More about page format](docs/page.md)

#### library
Type: `Object`

The object of library.

Returns a `String` of html.


## License

MIT © [antitim](http://vk.com/antitim)


[npm-image]: https://badge.fury.io/js/cedr.svg
[npm-url]: https://npmjs.org/package/cedr
[travis-image]: https://travis-ci.org/antitim/cedr.svg?branch=master
[travis-url]: https://travis-ci.org/antitim/cedr
[daviddm-image]: https://david-dm.org/antitim/cedr.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/antitim/cedr
