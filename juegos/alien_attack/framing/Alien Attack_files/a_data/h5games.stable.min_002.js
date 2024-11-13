'undefined' == typeof h5games &&
  (h5games = (function () {
    let e = null;
    function t() {
      return (
        e ||
          (e = new Promise((e, t) => {
            let n = (function e() {
                let t = null;
                try {
                  t = new URL(window.location.href).searchParams.get('ver');
                } catch (n) {}
                if (t) return t;
                let r = document.getElementsByTagName('script'),
                  a = null;
                for (let i = 0; i < r.length; i++) {
                  let l = r[i].getAttribute('src');
                  if (l && l.includes('h5games.stable.min.js')) {
                    a = r[i];
                    break;
                  }
                }
                if (a) {
                  let s = a.getAttribute('src');
                  'string' == typeof s &&
                    s.startsWith('//') &&
                    (s = 'http:' + s);
                  try {
                    t = new URL(s).searchParams.get('ver');
                  } catch (c) {}
                }
                return t || '1.7.7';
              })(),
              r = document.createElement('script');
            (r.src = '//h5games.com/api/' + n + '/h5games.stable.min.js'),
              (r.onload = () => {
                e();
              }),
              (r.onerror = (e) => {
                t();
              }),
              document.head.appendChild(r);
          })),
        e
      );
    }
    return (
      t(),
      {
        init: function e(n) {
          return new Promise((e) => {
            t()
              .then(() => {
                window.h5games.init(n).then((t) => {
                  e(t);
                });
              })
              .catch((e) => {});
          });
        },
      }
    );
  })());
