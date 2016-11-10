'use strict';

require('chai').should();
let cedr = require('..');

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
  },
  'tab': {
    templates: {
      'tab': '<ul class="{{ className }}">{{#content}}<li>{{{.}}}</li>{{/content}}</ul>'
    }
  }
};

describe('Cedr', () => {
  it('block without library', () => {
    let html = cedr({
      block: 'page',
      content: [
        'text'
      ]
    });

    html.should.equal('<div class="page">text</div>');
  });

  it('element without library', () => {
    let html = cedr({
      block: 'page',
      element: 'header'
    });

    html.should.equal('<div class="page__header"></div>');
  });

  it('block with tag without library', () => {
    let html = cedr({
      block: 'page',
      element: 'header',
      tagName: 'span'
    });

    html.should.equal('<span class="page__header"></span>');
  });

  it('block and modifications without library', () => {
    let html = cedr({
      block: 'page',
      mods: {
        main: true,
        size: 'big'
      }
    });

    html.should.equal('<div class="page page_main page_size_big"></div>');
  });

  it('element and modifications without library', () => {
    let html = cedr({
      block: 'page',
      element: 'header',
      mods: {
        main: true
      }
    });

    html.should.equal('<div class="page__header page__header_main"></div>');
  });

  it('block and attributes without library', () => {
    let html = cedr({
      block: 'page',
      attrs: {
        target: '_blank',
        'data-bar': 'foo'
      }
    });

    html.should.equal('<div class="page" target="_blank" data-bar="foo"></div>');
  });

  it('block with library', () => {
    let html = cedr({
      block: 'page',
      content: [
        'text'
      ]
    }, library);

    html.should.equal('<!DOCTYPE html><html><head></head><body class="page">text</body></html>');
  });

  it('element inside block with library', () => {
    let html = cedr({
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
    }, library);

    html.should.equal('<!DOCTYPE html><html><head></head><body class="page"><p class="text">text</p><div class="page__header">This is Header: Yeah!</div></body></html>');
  });

  it('block with array content with library', () => {
    let html = cedr({
      block: 'tab',
      content: [
        'text',
        'text2'
      ]
    }, library);

    html.should.equal('<ul class="tab"><li>text</li><li>text2</li></ul>');
  });
});
