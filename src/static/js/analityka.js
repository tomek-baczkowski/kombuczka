// Analityka: Google Analytics 4 tylko po zgodzie odwiedzającego.
// Konfiguracja w znaczniku <script>:
//   data-ga="G-XXXXXXXXXX"      identyfikator pomiaru GA4
//   data-polityka="/prywatnosc/" adres polityki prywatności
//   data-kliki="tak"            liczyć kliknięcia e-mail, telefon, WhatsApp (pomiń, jeśli strona liczy je sama)
// Przycisk lub link z atrybutem data-zgody ponownie otwiera okienko wyboru.
(function () {
  var s = document.currentScript || document.querySelector('script[data-ga]');
  if (!s) return;
  var ID = s.getAttribute('data-ga');
  var POLITYKA = s.getAttribute('data-polityka') || '/';
  var KLIKI = s.getAttribute('data-kliki') === 'tak';
  var KLUCZ = 'zgoda-analityka';
  var zaladowane = false;

  function odczytaj() { try { return localStorage.getItem(KLUCZ); } catch (e) { return null; } }
  function zapisz(v) { try { localStorage.setItem(KLUCZ, v); } catch (e) {} }

  function zaladujGA() {
    if (zaladowane || !ID) return;
    zaladowane = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('config', ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
    var t = document.createElement('script');
    t.async = true;
    t.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ID);
    document.head.appendChild(t);
  }

  function usunCiasteczkaGA() {
    var host = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var n = c.split('=')[0].trim();
      if (/^_ga/.test(n)) {
        ['', '; domain=' + host, '; domain=.' + host].forEach(function (d) {
          document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d;
        });
      }
    });
  }

  var styl = '#zgody{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin:0 auto;' +
    'background:#fff;color:#1a1a1a;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.18);padding:18px 20px;' +
    'font-size:15px;line-height:1.5;font-family:inherit}' +
    '#zgody p{margin:0 0 12px}#zgody a{color:inherit;text-decoration:underline}' +
    '#zgody .zgody-przyciski{display:flex;gap:10px;flex-wrap:wrap}' +
    '#zgody button{flex:1 1 140px;padding:10px 14px;border-radius:8px;border:1.5px solid #1a1a1a;' +
    'font:inherit;font-weight:600;cursor:pointer;background:#fff;color:#1a1a1a}' +
    '#zgody button.zgody-tak{background:#1a1a1a;color:#fff}' +
    '#zgody button:focus-visible{outline:3px solid #6aa0ff;outline-offset:2px}';

  function pokaz() {
    if (document.getElementById('zgody')) return;
    if (!document.getElementById('zgody-styl')) {
      var st = document.createElement('style'); st.id = 'zgody-styl'; st.textContent = styl;
      document.head.appendChild(st);
    }
    var d = document.createElement('div');
    d.id = 'zgody';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-label', 'Zgoda na statystyki');
    d.innerHTML = '<p>Chcemy liczyć odwiedziny w Google Analytics, żeby wiedzieć, skąd przychodzą goście i które strony są przydatne. ' +
      'To zapisze na Twoim urządzeniu pliki cookie Google. Bez Twojej zgody nic nie liczymy. ' +
      '<a href="' + POLITYKA + '">Polityka prywatności</a></p>' +
      '<div class="zgody-przyciski"><button type="button" class="zgody-nie">Nie zgadzam się</button>' +
      '<button type="button" class="zgody-tak">Zgadzam się</button></div>';
    document.body.appendChild(d);
    d.querySelector('.zgody-tak').addEventListener('click', function () {
      zapisz('tak'); d.remove(); zaladujGA();
    });
    d.querySelector('.zgody-nie').addEventListener('click', function () {
      var bylo = odczytaj() === 'tak';
      zapisz('nie'); d.remove(); usunCiasteczkaGA();
      if (bylo && zaladowane) location.reload();
    });
  }

  document.addEventListener('click', function (e) {
    var z = e.target.closest && e.target.closest('[data-zgody]');
    if (z) { e.preventDefault(); pokaz(); return; }
    if (!KLIKI || typeof window.gtag !== 'function') return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var h = a.getAttribute('href') || '';
    var rodzaj = /^mailto:/i.test(h) ? 'email' : /^tel:/i.test(h) ? 'telefon' :
      /(wa\.me|api\.whatsapp\.com|whatsapp:)/i.test(h) ? 'whatsapp' : null;
    if (rodzaj) window.gtag('event', 'kontakt_' + rodzaj, { miejsce: location.pathname });
  });

  var zgoda = odczytaj();
  if (zgoda === 'tak') zaladujGA();
  else if (zgoda !== 'nie') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', pokaz);
    else pokaz();
  }
})();
