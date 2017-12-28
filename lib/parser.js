'use strict';

const errors = require('@rduk/errors');
const BaseParser = require('@rduk/data/lib/parser');

let MySqlParser = function MySqlParser() {
  MySqlParser.super_.call(this);
};

util.inherits(MySqlParser, BaseParser);

MySqlParser.prototype.property = function(node, context) {
  if(node.left !== 'this') {
    return '`' + node.left + '`.`' + node.right + '`';
  }

  let value = context[node.right];

  if (typeof value !== 'string') {
    return value;
  }

  return this.str({value: value});
};

MySqlParser.prototype.and = function(node, context) {
  let left = this[node.left.type](node.left, context);
  let right = this[node.right.type](node.right, context);

  return `${left} AND ${right}`;
};

MySqlParser.prototype.or = function(node, context) {
  let left = this[node.left.type](node.left, context);
  let right = this[node.right.type](node.right, context);

  return `${left} OR ${right}`;
};

MySqlParser.prototype.equals = function(node, context) {
    let left = this[node.left.type](node.left, context);
    let right = this[node.right.type](node.right, context);

    return `${left} = ${right}`;
};

MySqlParser.prototype.contains = function(node, context) {

};

MySqlParser.prototype.startsWith = function(node, context) {

};

MySqlParser.prototype.endsWith = function(node, context) {

};

MySqlParser.prototype.toLowerCase = function(node, context) {
  return `LOWER(${this[node.left.type](node.left, context)})`;
};

MySqlParser.prototype.toUpperCase = function(node, context) {
  return `UPPER(${this[node.left.type](node.left, context)})`;
};
