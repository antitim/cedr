# Page format

Page is an `Object` that describes an HTML document. Represents a tree of nodes.

There are three types of node:
- Text node
- Array of nodes
- Block node

The root of the tree is always block.

## Array of nodes
`Array` of nodes

## Text node
`String`

## Block node
`Object`

The term "Block" is taken from the BEM methodology.
Before you can use cedr strongly recommended to read [this methodolgy](https://en.bem.info/methodology/quick-start/)

```js
{
  block: 'menu', // required field
  element: 'item', // is filled if the current node is an element
  mods: {
    key1: 'value',
    key2: true
  }, // contains a hash of the modifier block
  attrs: {
    target: '_blank',
    'data-bar': 'foo'
  }, // contains block attributes
  tagName: 'span', // if you do not specify, it will be `div` by default
  className: 'item-prop', //additional class name
  content: Node // contains the node
}
```

You can use any other field to pass the context to the template.

Example of `page`:

```js
{
  block: 'page',
  content: [
    {
      block: 'page',
      element: 'header',
      mods: {
        size: 'big',
        main: true
      }
      content: 'Yeah!'
    },
    {
      block: 'panel',
      attrs: {
        'data-bar': 'foo'
      }
      someData: [1, 2, 3],
      content: [
        {
          block: 'text',
          tagName: 'span',
          className: 'item-prop'
        },
        'Good'
      ]
    },
    'Footer will be here'
  ]
}
```

Result for this page without using library of block:

```HTML
<div class="page">
  <div class="page__header page__header_size_big page__header_main">Yeah!</div>
  <div class="panel" data-bar="foo">
    <span class="text item-prop"></span>
    Good
  </div>
  Footer will be here
</div>

```
