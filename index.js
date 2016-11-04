'use strict';

const Mustache = require('mustache');

/**
 * Шаблон блока по умолчанию
 *
 * @type {string}
 */
const defaultBlockTemplate = '<{{tagName}} class="{{className}}"{{{attrs}}}>{{{ content }}}</{{tagName}}>';

/**
 * Список имеющихся блоков
 *
 * @type {Object[]}
 */
let library;

/**
 * Функция рекурсивно рендерит узлы страницы
 *
 * @param node {Object} Корневой узел
 * @returns {String} html узлов
 */
function renderNode (node) {
  // Узел отсутствует
  if (node === undefined) {
    return '';
  }

  // Текстовый узел
  if (typeof node === 'string') {
    return node;
  }

  // Блок
  if (node.block) {
    // Формируем контекст
    let context = Object.assign({}, node, {
      tagName: node.tagName || 'div',
      content: renderNode(node.content),
      className: () => {
        let className = node.block;
        let blockName = className;

        if (node.element) {
          className = blockName + '__' + node.element;
        }

        if (node.className) {
          className = className + ' ' + node.className;
        }

        if (node.mods) {
          for (let key in node.mods) {
            let value = node.mods[key];

            if (typeof value === 'boolean') {
              className = className + ' ' + blockName + '_' + key;
            } else {
              className = className + ' ' + blockName + '_' + key + '_' + value;
            }
          }
        }

        return className;
      },
      attrs: () => {
        let attrs;

        if (node.attrs) {
          attrs = '';

          for (let key in node.attrs) {
            let value = node.attrs[key];
            attrs = attrs + ' ' + key + '="' + value + '"';
          }
        }

        return attrs;
      }
    });

    // Если в библиотеке для этого блока присутсвует шаблон, то загружаем его.
    let template;

    if (library[node.block] && library[node.block].templates) {
      var libTemplate = library[node.block].templates;

      if (node.element) {
        template = libTemplate['__' + node.element];
      } else {
        template = libTemplate[node.block];
      }
    }

    return Mustache.render(template || defaultBlockTemplate, context);
  }

  // Список узлов
  if (typeof node === 'object') {
    var html = '';
    for (let i in node) {
      html = html + renderNode(node[i]);
    }

    return html;
  }
}

/**
 * Рендерит страницу
 *
 * @param page {Object} Объект страницы
 * @param userlibrary {Object} Объект библиотеки
 * @return {string} Html страницы
 */
module.exports = function (page, userlibrary) {
  library = userlibrary || {};

  return renderNode(page);
};
