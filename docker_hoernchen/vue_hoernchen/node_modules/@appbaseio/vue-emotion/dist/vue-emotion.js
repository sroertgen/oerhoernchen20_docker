(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.emotionVue = {})));
}(this, (function (exports) { 'use strict';

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

  /* eslint-disable */
  // murmurhash2 via https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js
  function hashString(str) {
    return murmurhash2_32_gc(str, str.length).toString(36);
  }

  function murmurhash2_32_gc(str, seed) {
    var l = str.length,
        h = seed ^ l,
        i = 0,
        k;

    while (l >= 4) {
      k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
      k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
      k ^= k >>> 24;
      k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
      h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;
      l -= 4;
      ++i;
    }

    switch (l) {
      case 3:
        h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

      case 2:
        h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

      case 1:
        h ^= str.charCodeAt(i) & 0xff;
        h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    }

    h ^= h >>> 13;
    h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    h ^= h >>> 15;
    return h >>> 0;
  }

  var pa = function fa(ha) {
    function V(f, d, c, l, a) {
      for (var g = 0, b = 0, n = 0, e = 0, k, r, m, v = 0, B = 0, C = 0, x = 0, D = 0, p = 0, H = 0, q = 0, O = r = 0, M = 0, t = 0, y = c.length, G = y - 1, h = '', u = '', F = '', N = '', I; q < y;) {
        m = c.charCodeAt(q);
        q === G && 0 !== b + e + n + g && (0 !== b && (m = 47 === b ? 10 : 47), e = n = g = 0, y++, G++);

        if (0 === b + e + n + g) {
          if (q === G && (0 < r && (h = h.replace(Q, '')), 0 < h.trim().length)) {
            switch (m) {
              case 32:
              case 9:
              case 59:
              case 13:
              case 10:
                break;

              default:
                h += c.charAt(q);
            }

            m = 59;
          }

          if (1 === O) switch (m) {
            case 123:
            case 125:
            case 59:
            case 34:
            case 39:
            case 40:
            case 41:
            case 44:
              O = 0;

            case 9:
            case 13:
            case 10:
            case 32:
              break;

            default:
              for (O = 0, t = q, k = m, q--, m = 59; t < y;) {
                switch (c.charCodeAt(t++)) {
                  case 10:
                  case 13:
                  case 59:
                    ++q;
                    m = k;
                    t = y;
                    break;

                  case 58:
                    0 < r && (++q, m = k);

                  case 123:
                    t = y;
                }
              }

          }

          switch (m) {
            case 123:
              h = h.trim();
              k = h.charCodeAt(0);
              x = 1;

              for (t = ++q; q < y;) {
                m = c.charCodeAt(q);

                switch (m) {
                  case 123:
                    x++;
                    break;

                  case 125:
                    x--;
                }

                if (0 === x) break;
                q++;
              }

              p = c.substring(t, q);
              0 === k && (k = (h = h.replace(qa, '').trim()).charCodeAt(0));

              switch (k) {
                case 64:
                  0 < r && (h = h.replace(Q, ''));
                  r = h.charCodeAt(1);

                  switch (r) {
                    case 100:
                    case 109:
                    case 115:
                    case 45:
                      k = d;
                      break;

                    default:
                      k = W;
                  }

                  p = V(d, k, p, r, a + 1);
                  t = p.length;
                  0 < X && 0 === t && (t = h.length);
                  0 < E && (k = ia(W, h, M), I = P(3, p, k, d, J, z, t, r, a, l), h = k.join(''), void 0 !== I && 0 === (t = (p = I.trim()).length) && (r = 0, p = ''));
                  if (0 < t) switch (r) {
                    case 115:
                      h = h.replace(ra, sa);

                    case 100:
                    case 109:
                    case 45:
                      p = h + '{' + p + '}';
                      break;

                    case 107:
                      h = h.replace(ta, '$1 $2' + (0 < R ? T : ''));
                      p = h + '{' + p + '}';
                      p = 1 === w || 2 === w && U('@' + p, 3) ? '@-webkit-' + p + '@' + p : '@' + p;
                      break;

                    default:
                      p = h + p, 112 === l && (p = (u += p, ''));
                  } else p = '';
                  break;

                default:
                  p = V(d, ia(d, h, M), p, l, a + 1);
              }

              F += p;
              p = M = r = H = O = D = 0;
              h = '';
              m = c.charCodeAt(++q);
              break;

            case 125:
            case 59:
              h = (0 < r ? h.replace(Q, '') : h).trim();
              if (1 < (t = h.length)) switch (0 === H && (k = h.charCodeAt(0), 45 === k || 96 < k && 123 > k) && (t = (h = h.replace(' ', ':')).length), 0 < E && void 0 !== (I = P(1, h, d, f, J, z, u.length, l, a, l)) && 0 === (t = (h = I.trim()).length) && (h = '\x00\x00'), k = h.charCodeAt(0), r = h.charCodeAt(1), k + r) {
                case 0:
                  break;

                case 169:
                case 163:
                  N += h + c.charAt(q);
                  break;

                default:
                  58 !== h.charCodeAt(t - 1) && (u += Y(h, k, r, h.charCodeAt(2)));
              }
              M = r = H = O = D = 0;
              h = '';
              m = c.charCodeAt(++q);
          }
        }

        switch (m) {
          case 13:
          case 10:
            if (0 === b + e + n + g + ja) switch (C) {
              case 41:
              case 39:
              case 34:
              case 64:
              case 126:
              case 62:
              case 42:
              case 43:
              case 47:
              case 45:
              case 58:
              case 44:
              case 59:
              case 123:
              case 125:
                break;

              default:
                0 < H && (O = 1);
            }
            47 === b ? b = 0 : 0 === A + D && (r = 1, h += '\x00');
            0 < E * ka && P(0, h, d, f, J, z, u.length, l, a, l);
            z = 1;
            J++;
            break;

          case 59:
          case 125:
            if (0 === b + e + n + g) {
              z++;
              break;
            }

          default:
            z++;
            k = c.charAt(q);

            switch (m) {
              case 9:
              case 32:
                if (0 === e + g + b) switch (v) {
                  case 44:
                  case 58:
                  case 9:
                  case 32:
                    k = '';
                    break;

                  default:
                    32 !== m && (k = ' ');
                }
                break;

              case 0:
                k = '\\0';
                break;

              case 12:
                k = '\\f';
                break;

              case 11:
                k = '\\v';
                break;

              case 38:
                0 === e + b + g && 0 < A && (r = M = 1, k = '\f' + k);
                break;

              case 108:
                if (0 === e + b + g + K && 0 < H) switch (q - H) {
                  case 2:
                    112 === v && 58 === c.charCodeAt(q - 3) && (K = v);

                  case 8:
                    111 === B && (K = B);
                }
                break;

              case 58:
                0 === e + b + g && (H = q);
                break;

              case 44:
                0 === b + n + e + g && (r = 1, k += '\r');
                break;

              case 34:
                0 === b && (e = e === m ? 0 : 0 === e ? m : e);
                break;

              case 39:
                0 === b && (e = e === m ? 0 : 0 === e ? m : e);
                break;

              case 91:
                0 === e + b + n && g++;
                break;

              case 93:
                0 === e + b + n && g--;
                break;

              case 41:
                0 === e + b + g && n--;
                break;

              case 40:
                if (0 === e + b + g) {
                  if (0 === D) switch (2 * v + 3 * B) {
                    case 533:
                      break;

                    default:
                      x = 0, D = 1;
                  }
                  n++;
                }

                break;

              case 64:
                0 === b + n + e + g + H + p && (p = 1);
                break;

              case 42:
              case 47:
                if (!(0 < e + g + n)) switch (b) {
                  case 0:
                    switch (2 * m + 3 * c.charCodeAt(q + 1)) {
                      case 235:
                        b = 47;
                        break;

                      case 220:
                        t = q, b = 42;
                    }

                    break;

                  case 42:
                    47 === m && 42 === v && (33 === c.charCodeAt(t + 2) && (u += c.substring(t, q + 1)), k = '', b = 0);
                }
            }

            if (0 === b) {
              if (0 === A + e + g + p && 107 !== l && 59 !== m) switch (m) {
                case 44:
                case 126:
                case 62:
                case 43:
                case 41:
                case 40:
                  if (0 === D) {
                    switch (v) {
                      case 9:
                      case 32:
                      case 10:
                      case 13:
                        k += '\x00';
                        break;

                      default:
                        k = '\x00' + k + (44 === m ? '' : '\x00');
                    }

                    r = 1;
                  } else switch (m) {
                    case 40:
                      D = ++x;
                      break;

                    case 41:
                      0 === (D = --x) && (r = 1, k += '\x00');
                  }

                  break;

                case 9:
                case 32:
                  switch (v) {
                    case 0:
                    case 123:
                    case 125:
                    case 59:
                    case 44:
                    case 12:
                    case 9:
                    case 32:
                    case 10:
                    case 13:
                      break;

                    default:
                      0 === D && (r = 1, k += '\x00');
                  }

              }
              h += k;
              32 !== m && 9 !== m && (C = m);
            }

        }

        B = v;
        v = m;
        q++;
      }

      t = u.length;
      0 < X && 0 === t && 0 === F.length && 0 === d[0].length === !1 && (109 !== l || 1 === d.length && (0 < A ? L : S) === d[0]) && (t = d.join(',').length + 2);

      if (0 < t) {
        if (0 === A && 107 !== l) {
          c = 0;
          g = d.length;

          for (b = Array(g); c < g; ++c) {
            v = d[c].split(ua);
            B = '';
            C = 0;

            for (y = v.length; C < y; ++C) {
              if (!(0 === (x = (e = v[C]).length) && 1 < y)) {
                q = B.charCodeAt(B.length - 1);
                M = e.charCodeAt(0);
                n = '';
                if (0 !== C) switch (q) {
                  case 42:
                  case 126:
                  case 62:
                  case 43:
                  case 32:
                  case 40:
                    break;

                  default:
                    n = ' ';
                }

                switch (M) {
                  case 38:
                    e = n + L;

                  case 126:
                  case 62:
                  case 43:
                  case 32:
                  case 41:
                  case 40:
                    break;

                  case 91:
                    e = n + e + L;
                    break;

                  case 58:
                    switch (2 * e.charCodeAt(1) + 3 * e.charCodeAt(2)) {
                      case 530:
                        if (0 < Z) {
                          e = n + e.substring(8, x - 1);
                          break;
                        }

                      default:
                        if (1 > C || 1 > v[C - 1].length) e = n + L + e;
                    }

                    break;

                  case 44:
                    n = '';

                  default:
                    e = 1 < x && 0 < e.indexOf(':') ? n + e.replace(va, '$1' + L + '$2') : n + e + L;
                }

                B += e;
              }
            }

            b[c] = B.replace(Q, '').trim();
          }

          d = b;
        }

        k = d;
        if (0 < E && (I = P(2, u, k, f, J, z, t, l, a, l), void 0 !== I && 0 === (u = I).length)) return N + u + F;
        u = k.join(',') + '{' + u + '}';

        if (0 !== w * K) {
          2 !== w || U(u, 2) || (K = 0);

          switch (K) {
            case 111:
              u = u.replace(wa, ':-moz-$1') + u;
              break;

            case 112:
              u = u.replace(aa, '::-webkit-input-$1') + u.replace(aa, '::-moz-$1') + u.replace(aa, ':-ms-input-$1') + u;
          }

          K = 0;
        }
      }

      return N + u + F;
    }

    function ia(f, d, c) {
      var l = d.trim().split(xa);
      d = l;
      var a = l.length,
          g = f.length;

      switch (g) {
        case 0:
        case 1:
          var b = 0;

          for (f = 0 === g ? '' : f[0] + ' '; b < a; ++b) {
            d[b] = la(f, d[b], c, g).trim();
          }

          break;

        default:
          var n = b = 0;

          for (d = []; b < a; ++b) {
            for (var e = 0; e < g; ++e) {
              d[n++] = la(f[e] + ' ', l[b], c, g).trim();
            }
          }

      }

      return d;
    }

    function la(f, d, c, l) {
      var a = d.charCodeAt(0);
      33 > a && (a = (d = d.trim()).charCodeAt(0));

      switch (a) {
        case 38:
          switch (A + l) {
            case 0:
            case 1:
              if (0 === f.trim().length) break;

            default:
              return d.replace(F, '$1' + f.trim());
          }

          break;

        case 58:
          switch (d.charCodeAt(1)) {
            case 103:
              if (0 < Z && 0 < A) return d.replace(ya, '$1').replace(F, '$1' + S);
              break;

            default:
              return f.trim() + d.replace(F, '$1' + f.trim());
          }

        default:
          if (0 < c * A && 0 < d.indexOf('\f')) return d.replace(F, (58 === f.charCodeAt(0) ? '' : '$1') + f.trim());
      }

      return f + d;
    }

    function Y(f, d, c, l) {
      var a = f + ';',
          g = 2 * d + 3 * c + 4 * l;

      if (944 === g) {
        f = a.length;
        var b = a.indexOf(':', 9) + 1;
        d = a.substring(0, b).trim();
        c = a.substring(b, f - 1).trim();

        switch (a.charCodeAt(9) * R) {
          case 0:
            break;

          case 45:
            if (110 !== a.charCodeAt(10)) break;

          default:
            for (a = c.split((c = '', za)), b = l = 0, f = a.length; l < f; b = 0, ++l) {
              g = a[l];

              for (var n = g.split(Aa); g = n[b];) {
                var e = g.charCodeAt(0);
                if (1 === R && (64 < e && 90 > e || 96 < e && 123 > e || 95 === e || 45 === e && 45 !== g.charCodeAt(1))) switch (isNaN(parseFloat(g)) + (-1 !== g.indexOf('('))) {
                  case 1:
                    switch (g) {
                      case 'infinite':
                      case 'alternate':
                      case 'backwards':
                      case 'running':
                      case 'normal':
                      case 'forwards':
                      case 'both':
                      case 'none':
                      case 'linear':
                      case 'ease':
                      case 'ease-in':
                      case 'ease-out':
                      case 'ease-in-out':
                      case 'paused':
                      case 'reverse':
                      case 'alternate-reverse':
                      case 'inherit':
                      case 'initial':
                      case 'unset':
                      case 'step-start':
                      case 'step-end':
                        break;

                      default:
                        g += T;
                    }

                }
                n[b++] = g;
              }

              c += (0 === l ? '' : ',') + n.join(' ');
            }

        }

        c = d + c + ';';
        return 1 === w || 2 === w && U(c, 1) ? '-webkit-' + c + c : c;
      }

      if (0 === w || 2 === w && !U(a, 1)) return a;

      switch (g) {
        case 1015:
          return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

        case 951:
          return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

        case 963:
          return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

        case 1009:
          if (100 !== a.charCodeAt(4)) break;

        case 969:
        case 942:
          return '-webkit-' + a + a;

        case 978:
          return '-webkit-' + a + '-moz-' + a + a;

        case 1019:
        case 983:
          return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

        case 883:
          return 45 === a.charCodeAt(8) ? '-webkit-' + a + a : a;

        case 932:
          if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
            case 103:
              return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

            case 115:
              return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

            case 98:
              return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
          }
          return '-webkit-' + a + '-ms-' + a + a;

        case 964:
          return '-webkit-' + a + '-ms-flex-' + a + a;

        case 1023:
          if (99 !== a.charCodeAt(8)) break;
          b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
          return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

        case 1005:
          return Ba.test(a) ? a.replace(ma, ':-webkit-') + a.replace(ma, ':-moz-') + a : a;

        case 1e3:
          b = a.substring(13).trim();
          d = b.indexOf('-') + 1;

          switch (b.charCodeAt(0) + b.charCodeAt(d)) {
            case 226:
              b = a.replace(N, 'tb');
              break;

            case 232:
              b = a.replace(N, 'tb-rl');
              break;

            case 220:
              b = a.replace(N, 'lr');
              break;

            default:
              return a;
          }

          return '-webkit-' + a + '-ms-' + b + a;

        case 1017:
          if (-1 === a.indexOf('sticky', 9)) break;

        case 975:
          d = (a = f).length - 10;
          b = (33 === a.charCodeAt(d) ? a.substring(0, d) : a).substring(f.indexOf(':', 7) + 1).trim();

          switch (g = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
            case 203:
              if (111 > b.charCodeAt(8)) break;

            case 115:
              a = a.replace(b, '-webkit-' + b) + ';' + a;
              break;

            case 207:
            case 102:
              a = a.replace(b, '-webkit-' + (102 < g ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
          }

          return a + ';';

        case 938:
          if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
            case 105:
              return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

            case 115:
              return '-webkit-' + a + '-ms-flex-item-' + a.replace(na, '') + a;

            default:
              return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(na, '') + a;
          }
          break;

        case 973:
        case 989:
          if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

        case 931:
        case 953:
          if (!0 === Ca.test(f)) return 115 === (b = f.substring(f.indexOf(':') + 1)).charCodeAt(0) ? Y(f.replace('stretch', 'fill-available'), d, c, l).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
          break;

        case 962:
          if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === c + l && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(Da, '$1-webkit-$2') + a;
      }

      return a;
    }

    function U(f, d) {
      var c = f.indexOf(1 === d ? ':' : '{'),
          l = f.substring(0, 3 !== d ? c : 10);
      c = f.substring(c + 1, f.length - 1);
      return ba(2 !== d ? l : l.replace(Ea, '$1'), c, d);
    }

    function sa(f, d) {
      var c = Y(d, d.charCodeAt(0), d.charCodeAt(1), d.charCodeAt(2));
      return c !== d + ';' ? c.replace(Fa, ' or ($1)').substring(4) : '(' + d + ')';
    }

    function P(f, d, c, l, a, g, b, n, e, k) {
      for (var r = 0, m = d, v; r < E; ++r) {
        switch (v = ca[r].call(G, f, m, c, l, a, g, b, n, e, k)) {
          case void 0:
          case !1:
          case !0:
          case null:
            break;

          default:
            m = v;
        }
      }

      switch (m) {
        case void 0:
        case !1:
        case !0:
        case null:
        case d:
          break;

        default:
          return m;
      }
    }

    function da(f) {
      switch (f) {
        case void 0:
        case null:
          E = ca.length = 0;
          break;

        default:
          switch (f.constructor) {
            case Array:
              for (var d = 0, c = f.length; d < c; ++d) {
                da(f[d]);
              }

              break;

            case Function:
              ca[E++] = f;
              break;

            case Boolean:
              ka = !!f | 0;
          }

      }

      return da;
    }

    function ea(f) {
      for (var d in f) {
        var c = f[d];

        switch (d) {
          case 'keyframe':
            R = c | 0;
            break;

          case 'global':
            Z = c | 0;
            break;

          case 'cascade':
            A = c | 0;
            break;

          case 'compress':
            oa = c | 0;
            break;

          case 'semicolon':
            ja = c | 0;
            break;

          case 'preserve':
            X = c | 0;
            break;

          case 'prefix':
            ba = null, c ? 'function' !== typeof c ? w = 1 : (w = 2, ba = c) : w = 0;
        }
      }

      return ea;
    }

    function G(f, d) {
      if (void 0 !== this && this.constructor === G) return fa(f);
      var c = f,
          l = c.charCodeAt(0);
      33 > l && (l = (c = c.trim()).charCodeAt(0));
      0 < R && (T = c.replace(Ga, 91 === l ? '' : '-'));
      l = 1;
      1 === A ? S = c : L = c;
      c = [S];

      if (0 < E) {
        var a = P(-1, d, c, c, J, z, 0, 0, 0, 0);
        void 0 !== a && 'string' === typeof a && (d = a);
      }

      var g = V(W, c, d, 0, 0);
      0 < E && (a = P(-2, g, c, c, J, z, g.length, 0, 0, 0), void 0 !== a && 'string' !== typeof (g = a) && (l = 0));
      L = S = T = '';
      K = 0;
      z = J = 1;
      return 0 === oa * l ? g : g.replace(Q, '').replace(Ha, '').replace(Ia, '$1').replace(Ja, '$1').replace(Ka, ' ');
    }

    var qa = /^\0+/g,
        Q = /[\0\r\f]/g,
        ma = /: */g,
        Ba = /zoo|gra/,
        Da = /([,: ])(transform)/g,
        za = /,+\s*(?![^(]*[)])/g,
        Aa = / +\s*(?![^(]*[)])/g,
        ua = / *[\0] */g,
        xa = /,\r+?/g,
        F = /([\t\r\n ])*\f?&/g,
        ya = /:global\(((?:[^\(\)\[\]]*|\[.*\]|\([^\(\)]*\))*)\)/g,
        Ga = /\W+/g,
        ta = /@(k\w+)\s*(\S*)\s*/,
        aa = /::(place)/g,
        wa = /:(read-only)/g,
        Ha = /\s+(?=[{\];=:>])/g,
        Ia = /([[}=:>])\s+/g,
        Ja = /(\{[^{]+?);(?=\})/g,
        Ka = /\s{2,}/g,
        va = /([^\(])(:+) */g,
        N = /[svh]\w+-[tblr]{2}/,
        ra = /\(\s*(.*)\s*\)/g,
        Fa = /([\s\S]*?);/g,
        na = /-self|flex-/g,
        Ea = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
        Ca = /stretch|:\s*\w+\-(?:conte|avail)/,
        z = 1,
        J = 1,
        K = 0,
        A = 1,
        w = 1,
        Z = 1,
        oa = 0,
        ja = 0,
        X = 0,
        W = [],
        ca = [],
        E = 0,
        ba = null,
        ka = 0,
        R = 1,
        T = '',
        L = '',
        S = '';
    G.use = da;
    G.set = ea;
    void 0 !== ha && ea(ha);
    return G;
  };

  var memoize = function memoize(fn) {
    var cache = {};
    return function (arg) {
      if (cache[arg] === undefined) cache[arg] = fn(arg);
      return cache[arg];
    };
  };
  var STYLES_KEY = '__emotion_styles';
  var unitless = {
    animationIterationCount: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    // SVG-related properties
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1
  };

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var stylisRuleSheet = createCommonjsModule(function (module, exports) {
  (function (factory) {
  	module['exports'] = factory();
  }(function () {

  	return function (insertRule) {
  		var delimiter = '/*|*/';
  		var needle = delimiter+'}';

  		function toSheet (block) {
  			if (block)
  				try {
  					insertRule(block + '}');
  				} catch (e) {}
  		}

  		return function ruleSheet (context, content, selectors, parents, line, column, length, ns, depth, at) {
  			switch (context) {
  				// property
  				case 1:
  					// @import
  					if (depth === 0 && content.charCodeAt(0) === 64)
  						return insertRule(content+';'), ''
  					break
  				// selector
  				case 2:
  					if (ns === 0)
  						return content + delimiter
  					break
  				// at-rule
  				case 3:
  					switch (ns) {
  						// @font-face, @page
  						case 102:
  						case 112:
  							return insertRule(selectors[0]+content), ''
  						default:
  							return content + (at === 0 ? delimiter : '')
  					}
  				case -2:
  					content.split(needle).forEach(toSheet);
  			}
  		}
  	}
  }));
  });

  var hyphenateRegex = /[A-Z]|^ms/g;
  var processStyleName = memoize(function (styleName) {
    return styleName.replace(hyphenateRegex, '-$&').toLowerCase();
  });
  var processStyleValue = function processStyleValue(key, value) {
    if (value == null || typeof value === 'boolean') {
      return '';
    }

    if (unitless[key] !== 1 && key.charCodeAt(1) !== 45 && // custom properties
    !isNaN(value) && value !== 0) {
      return value + 'px';
    }

    return value;
  };
  var classnames = function classnames(args) {
    var len = args.length;
    var i = 0;
    var cls = '';

    for (; i < len; i++) {
      var arg = args[i];
      if (arg == null) continue;
      var toAdd = void 0;

      switch (typeof arg) {
        case 'boolean':
          break;

        case 'function':
          toAdd = classnames([arg()]);
          break;

        case 'object':
          {
            if (Array.isArray(arg)) {
              toAdd = classnames(arg);
            } else {
              toAdd = '';

              for (var k in arg) {
                if (arg[k] && k) {
                  toAdd && (toAdd += ' ');
                  toAdd += k;
                }
              }
            }

            break;
          }

        default:
          {
            toAdd = arg;
          }
      }

      if (toAdd) {
        cls && (cls += ' ');
        cls += toAdd;
      }
    }

    return cls;
  };
  var isBrowser = typeof document !== 'undefined';

  /*

  high performance StyleSheet for css-in-js systems

  - uses multiple style tags behind the scenes for millions of rules
  - uses `insertRule` for appending in production for *much* faster performance
  - 'polyfills' on server side

  // usage

  import StyleSheet from 'glamor/lib/sheet'
  let styleSheet = new StyleSheet()

  styleSheet.inject()
  - 'injects' the stylesheet into the page (or into memory if on server)

  styleSheet.insert('#box { border: 1px solid red; }')
  - appends a css rule into the stylesheet

  styleSheet.flush()
  - empties the stylesheet of all its contents

  */
  // $FlowFixMe
  function sheetForTag(tag) {
    if (tag.sheet) {
      // $FlowFixMe
      return tag.sheet;
    } // this weirdness brought to you by firefox


    for (var i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].ownerNode === tag) {
        // $FlowFixMe
        return document.styleSheets[i];
      }
    }
  }

  function makeStyleTag(opts) {
    var tag = document.createElement('style');
    tag.type = 'text/css';
    tag.setAttribute('data-emotion', opts.key || '');

    if (opts.nonce !== undefined) {
      tag.setAttribute('nonce', opts.nonce);
    }

    tag.appendChild(document.createTextNode('')) // $FlowFixMe
    ;
    (opts.container !== undefined ? opts.container : document.head).appendChild(tag);
    return tag;
  }

  function _StyleSheet(options) {
    this.isSpeedy = "development" === 'production'; // the big drawback here is that the css won't be editable in devtools

    this.tags = [];
    this.ctr = 0;
    this.opts = options;
  }

  function _inject() {
    if (this.injected) {
      throw new Error('already injected!');
    }

    this.tags[0] = makeStyleTag(this.opts);
    this.injected = true;
  }

  function _speedy(bool) {
    if (this.ctr !== 0) {
      // cannot change speedy mode after inserting any rule to sheet. Either call speedy(${bool}) earlier in your app, or call flush() before speedy(${bool})
      throw new Error("cannot change speedy now");
    }

    this.isSpeedy = !!bool;
  }

  function _insert(rule, sourceMap) {
    // this is the ultrafast version, works across browsers
    if (this.isSpeedy) {
      var tag = this.tags[this.tags.length - 1];
      var sheet = sheetForTag(tag);

      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        {
          console.warn('illegal rule', rule); // eslint-disable-line no-console
        }
      }
    } else {
      var _tag = makeStyleTag(this.opts);

      this.tags.push(_tag);

      _tag.appendChild(document.createTextNode(rule + (sourceMap || '')));
    }

    this.ctr++;

    if (this.ctr % 65000 === 0) {
      this.tags.push(makeStyleTag(this.opts));
    }
  }

  function _ref(tag) {
    return tag.parentNode.removeChild(tag);
  }

  function _flush() {
    // $FlowFixMe
    this.tags.forEach(_ref);
    this.tags = [];
    this.ctr = 0; // todo - look for remnants in document.styleSheets

    this.injected = false;
  }

  var StyleSheet =
  /*#__PURE__*/
  function () {
    var _proto = _StyleSheet.prototype;
    _proto.inject = _inject;
    _proto.speedy = _speedy;
    _proto.insert = _insert;
    _proto.flush = _flush;
    return _StyleSheet;
  }();

  function createEmotion(context, options) {
    if (context.__SECRET_EMOTION__ !== undefined) {
      return context.__SECRET_EMOTION__;
    }

    if (options === undefined) options = {};
    var key = options.key || 'css';

    {
      if (/[^a-z-]/.test(key)) {
        throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
      }
    }

    var current;

    function insertRule(rule) {
      current += rule;

      if (isBrowser) {
        sheet.insert(rule, currentSourceMap);
      }
    }

    var insertionPlugin = stylisRuleSheet(insertRule);
    var stylisOptions = {
      keyframe: false,
      global: false,
      prefix: options.prefix === undefined ? true : options.prefix,
      semicolon: true
    };

    {
      stylisOptions.compress = false;
    }

    var caches = {
      registered: {},
      inserted: {},
      nonce: options.nonce,
      key: key
    };
    var sheet = new StyleSheet(options);

    if (isBrowser) {
      // 🚀
      sheet.inject();
    }

    var stylis = new pa(stylisOptions);
    stylis.use(options.stylisPlugins)(insertionPlugin);
    var currentSourceMap = '';

    function handleInterpolation(interpolation, couldBeSelectorInterpolation) {
      if (interpolation == null) {
        return '';
      }

      switch (typeof interpolation) {
        case 'boolean':
          return '';

        case 'function':
          if (interpolation[STYLES_KEY] !== undefined) {
            var selector = interpolation.toString();

            if (selector === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
              throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
            }

            return selector;
          }

          return handleInterpolation.call(this, this === undefined ? interpolation() : // $FlowFixMe
          interpolation(this.mergedProps, this.context), couldBeSelectorInterpolation);

        case 'object':
          return createStringFromObject.call(this, interpolation);

        default:
          var cached = caches.registered[interpolation];
          return couldBeSelectorInterpolation === false && cached !== undefined ? cached : interpolation;
      }
    }

    var objectToStringCache = new WeakMap();

    function createStringFromObject(obj) {
      if (objectToStringCache.has(obj)) {
        // $FlowFixMe
        return objectToStringCache.get(obj);
      }

      var string = '';

      function _ref(interpolation) {
        string += handleInterpolation.call(this, interpolation, false);
      }

      function _ref2(key) {
        if (typeof obj[key] !== 'object') {
          if (caches.registered[obj[key]] !== undefined) {
            string += key + "{" + caches.registered[obj[key]] + "}";
          } else {
            string += processStyleName(key) + ":" + processStyleValue(key, obj[key]) + ";";
          }
        } else {
          if (key === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
            throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
          }

          string += key + "{" + handleInterpolation.call(this, obj[key], false) + "}";
        }
      }

      if (Array.isArray(obj)) {
        obj.forEach(_ref, this);
      } else {
        Object.keys(obj).forEach(_ref2, this);
      }

      objectToStringCache.set(obj, string);
      return string;
    }

    var name;
    var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;

    var createStyles = function createStyles(strings) {
      var stringMode = true;
      var styles = '';
      var identifierName = '';

      if (strings == null || strings.raw === undefined) {
        stringMode = false;
        styles += handleInterpolation.call(this, strings, false);
      } else {
        styles += strings[0];
      }

      for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        interpolations[_key - 1] = arguments[_key];
      }

      interpolations.forEach(function (interpolation, i) {
        styles += handleInterpolation.call(this, interpolation, styles.charCodeAt(styles.length - 1) === 46 // .
        );

        if (stringMode === true && strings[i + 1] !== undefined) {
          styles += strings[i + 1];
        }
      }, this);
      styles = styles.replace(labelPattern, function (match, p1) {
        identifierName += "-" + p1;
        return '';
      });
      name = hashString(styles + identifierName) + identifierName;
      return styles;
    };

    {
      var sourceMapRegEx = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//;
      var oldStylis = stylis;

      stylis = function stylis(selector, styles) {
        var result = sourceMapRegEx.exec(styles);
        currentSourceMap = result ? result[0] : '';
        oldStylis(selector, styles);
        currentSourceMap = '';
      };
    }

    function insert(scope, styles) {
      if (caches.inserted[name] === undefined) {
        current = '';
        stylis(scope, styles);
        caches.inserted[name] = current;
      }
    }

    var css = function css() {
      var styles = createStyles.apply(this, arguments);
      var selector = key + "-" + name;

      if (caches.registered[selector] === undefined) {
        caches.registered[selector] = styles;
      }

      insert("." + selector, styles);
      return selector;
    };

    var keyframes = function keyframes() {
      var styles = createStyles.apply(this, arguments);
      var animation = "animation-" + name;
      insert('', "@keyframes " + animation + "{" + styles + "}");
      return animation;
    };

    var injectGlobal = function injectGlobal() {
      var styles = createStyles.apply(this, arguments);
      insert('', styles);
    };

    function getRegisteredStyles(registeredStyles, classNames) {
      var rawClassName = '';
      classNames.split(' ').forEach(function (className) {
        if (caches.registered[className] !== undefined) {
          registeredStyles.push(className);
        } else {
          rawClassName += className + " ";
        }
      });
      return rawClassName;
    }

    function merge(className, sourceMap) {
      var registeredStyles = [];
      var rawClassName = getRegisteredStyles(registeredStyles, className);

      if (registeredStyles.length < 2) {
        return className;
      }

      return rawClassName + css(registeredStyles, sourceMap);
    }

    function cx() {
      for (var _len2 = arguments.length, classNames = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        classNames[_key2] = arguments[_key2];
      }

      return merge(classnames(classNames));
    }

    function hydrateSingleId(id) {
      caches.inserted[id] = true;
    }

    function hydrate(ids) {
      ids.forEach(hydrateSingleId);
    }

    function flush() {
      if (isBrowser) {
        sheet.flush();
        sheet.inject();
      }

      caches.inserted = {};
      caches.registered = {};
    }

    function _ref3(node) {
      // $FlowFixMe
      sheet.tags[0].parentNode.insertBefore(node, sheet.tags[0]); // $FlowFixMe

      node.getAttribute("data-emotion-" + key).split(' ').forEach(hydrateSingleId);
    }

    if (isBrowser) {
      var chunks = document.querySelectorAll("[data-emotion-" + key + "]");
      Array.prototype.forEach.call(chunks, _ref3);
    }

    var emotion = {
      flush: flush,
      hydrate: hydrate,
      cx: cx,
      merge: merge,
      getRegisteredStyles: getRegisteredStyles,
      injectGlobal: injectGlobal,
      keyframes: keyframes,
      css: css,
      sheet: sheet,
      caches: caches
    };
    context.__SECRET_EMOTION__ = emotion;
    return emotion;
  }

  var context = typeof global !== 'undefined' ? global : {};

  var _createEmotion = createEmotion(context);
  var flush = _createEmotion.flush;
  var hydrate = _createEmotion.hydrate;
  var cx = _createEmotion.cx;
  var merge = _createEmotion.merge;
  var getRegisteredStyles = _createEmotion.getRegisteredStyles;
  var injectGlobal = _createEmotion.injectGlobal;
  var keyframes = _createEmotion.keyframes;
  var css = _createEmotion.css;
  var sheet = _createEmotion.sheet;
  var caches = _createEmotion.caches;

  /*!
   * nano-assign v1.0.0
   * (c) 2017-present egoist <0x142857@gmail.com>
   * Released under the MIT License.
   */

  var index = function(obj) {
    var arguments$1 = arguments;

    for (var i = 1; i < arguments.length; i++) {
      // eslint-disable-next-line guard-for-in, prefer-rest-params
      for (var p in arguments[i]) { obj[p] = arguments$1[i][p]; }
    }
    return obj
  };

  var nanoAssign_common = index;

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

  var index$1 = (function (tag, options) {
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
      var styles = isReal && tag[STYLES_KEY] !== undefined ? tag[STYLES_KEY].slice(0) : [];

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
              className += getRegisteredStyles(classInterpolations, exisingClassName);
            } else {
              className += "".concat(exisingClassName, " ");
            }
          }

          if (staticClassName === undefined) {
            var ctx = {
              mergedProps: nanoAssign_common({
                theme: injections.theme
              }, props)
            };
            className += css.apply(ctx, styles.concat(classInterpolations));
          } else {
            className += staticClassName;
          }

          if (stableClassName !== undefined) {
            className += " ".concat(stableClassName);
          }

          return h(tag, nanoAssign_common({}, data, {
            attrs: attrs,
            class: className
          }), children);
        }
      };
      Styled[STYLES_KEY] = styles;
      Styled.__emotion_base = baseTag;
      Styled.__emotion_real = Styled;
      Object.defineProperty(Styled, 'toString', {
        enumerable: false,
        value: function value() {
          if ("development" !== 'production' && stableClassName === undefined) {
            return 'NO_COMPONENT_SELECTOR';
          }

          return ".".concat(stableClassName);
        }
      });
      return Styled;
    };
  });

  exports.default = index$1;
  exports.flush = flush;
  exports.hydrate = hydrate;
  exports.cx = cx;
  exports.merge = merge;
  exports.getRegisteredStyles = getRegisteredStyles;
  exports.injectGlobal = injectGlobal;
  exports.keyframes = keyframes;
  exports.css = css;
  exports.sheet = sheet;
  exports.caches = caches;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
