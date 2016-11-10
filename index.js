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
 * Класс контента для переопределения метода toString у Array
 */
class Contents extends Array {
  toString () {
    return this.join('');
  }
}

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
  if (node.constructor === Object && node.block) {
    // Формируем контекст
    let context = Object.assign({}, node, {
      tagName: node.tagName || 'div',
      content: renderNode(node.content),
      className: () => {
        let baseName = node.block;

        if (node.element) {
          baseName = baseName + '__' + node.element;
        }

        let className = baseName;

        if (node.mods) {
          for (let key in node.mods) {
            let value = node.mods[key];

            if (typeof value === 'boolean') {
              className = className + ' ' + baseName + '_' + key;
            } else {
              className = className + ' ' + baseName + '_' + key + '_' + value;
            }
          }
        }

        if (node.className) {
          className = className + ' ' + node.className;
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
  if (node.constructor === Array) {
    var html = new Contents();
    for (let i in node) {
      html.push(renderNode(node[i]));
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
