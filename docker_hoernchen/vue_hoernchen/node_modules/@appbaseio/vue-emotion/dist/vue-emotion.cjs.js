'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var emotion = require('emotion');
var assign = _interopDefault(require('nano-assign'));
var emotionUtils = require('emotion-utils');

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function stringifyClass(klass) {
  if (Array.isArray(klass)) {
    return klass.join(' ');
  }

  if (_typeof(klass) === 'object') {
    return Object.keys(klass).filter(function (key) {
      return Boolean(klass[key]);
    }).join(' ');
  }

  return klass;
}

var index = (function (tag, options) {
  var staticClassName;
  var identifierName;
  var stableClassName;
  var propsDefinitions;

  if (options !== undefined) {
    staticClassName = options.e;
    identifierName = options.label;
    stableClassName = options.target;
    propsDefinitions = options.props;
  }

  var isReal = tag.__emotion_real === tag;
  var baseTag = staticClassName === undefined ? isReal && tag.__emotion_base || tag : tag;
  return function () {
    var styles = isReal && tag[emotionUtils.STYLES_KEY] !== undefined ? tag[emotionUtils.STYLES_KEY].slice(0) : [];

    if (identifierName !== undefined) {
      styles.push("label:".concat(identifierName, ";"));
    }

    if (staticClassName === undefined) {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (args[0] === null || args[0].raw === undefined) {
        styles.push.apply(styles, args);
      } else {
        styles.push(args[0][0]);
        var len = args.length;
        var i = 1;

        for (; i < len; i++) {
          styles.push(args[i], args[0][i]);
        }
      }
    }

    var Styled = {
      name: "Styled".concat(tag.name || identifierName || 'Component'),
      functional: true,
      inject: {
        theme: {
          from: 'theme_reactivesearch',
          default: null
        }
      },
      props: propsDefinitions,
      render: function render(h, _ref) {
        var data = _ref.data,
            children = _ref.children,
            props = _ref.props,
            injections = _ref.injections;
        var className = '';
        var classInterpolations = [];
        var exisingClassName = stringifyClass(data.class);
        var attrs = {};

        for (var key in data.attrs) {
          if (key[0] !== '$') {
            attrs[key] = data.attrs[key];
          }
        }

        if (exisingClassName) {
          if (staticClassName === undefined) {
            className += emotion.getRegisteredStyles(classInterpolations, exisingClassName);
          } else {
            className += "".concat(exisingClassName, " ");
          }
        }

        if (staticClassName === undefined) {
          var ctx = {
            mergedProps: assign({
              theme: injections.theme
            }, props)
          };
          className += emotion.css.apply(ctx, styles.concat(classInterpolations));
        } else {
          className += staticClassName;
        }

        if (stableClassName !== undefined) {
          className += " ".concat(stableClassName);
        }

        return h(tag, assign({}, data, {
          attrs: attrs,
          class: className
        }), children);
      }
    };
    Styled[emotionUtils.STYLES_KEY] = styles;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_real = Styled;
    Object.defineProperty(Styled, 'toString', {
      enumerable: false,
      value: function value() {
        if (process.env.NODE_ENV !== 'production' && stableClassName === undefined) {
          return 'NO_COMPONENT_SELECTOR';
        }

        return ".".concat(stableClassName);
      }
    });
    return Styled;
  };
});

Object.keys(emotion).forEach(function (key) { exports[key] = emotion[key]; });
exports.default = index;
