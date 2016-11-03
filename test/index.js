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
});
