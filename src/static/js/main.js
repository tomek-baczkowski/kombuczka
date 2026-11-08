// kombuczka.pl – drobne interakcje: menu, okno „Zapytaj o termin”, formularz oceny partii
(function () {
  var EMAIL = 'kombuczka@gmail.com';
  var WA = '48731550393';

  // Nagłówek: linia po przewinięciu
  var header = document.querySelector('.site-header');
  var sticky = document.querySelector('.sticky-cta');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
    if (sticky) sticky.classList.toggle('is-visible', window.scrollY > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Menu na telefonie
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav__toggle');
  if (toggle) toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
  });
  document.querySelectorAll('.nav__links a').forEach(function (a) {
    a.addEventListener('click', function () { nav.classList.remove('is-open'); if (toggle) toggle.setAttribute('aria-expanded', 'false'); });
  });

  // Rozwijane „Dla kogo”
  document.querySelectorAll('.has-sub > button').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var li = btn.parentElement; var open = li.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open);
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.has-sub.is-open').forEach(function (li) { li.classList.remove('is-open'); li.firstElementChild.setAttribute('aria-expanded', 'false'); });
  });

  // Okno „Zapytaj o termin” z gotową wiadomością
  var dlg = document.getElementById('ask');
  function template(topic) {
    return 'Dzień dobry, chcę zapytać o ' + (topic || 'wykład / spotkanie przy Kombuczce / warsztat / kombuchę na wydarzenie') + '.\n' +
      'Rodzaj wydarzenia:\nData (albo kilka możliwych):\nMiejscowość:\nLiczba osób:\nCo jeszcze warto wiedzieć:';
  }
  document.querySelectorAll('[data-ask]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      if (!dlg) return;
      var msg = template(el.getAttribute('data-topic') || document.body.getAttribute('data-topic'));
      document.getElementById('ask-template').textContent = msg;
      document.getElementById('ask-mail').href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Zapytanie o termin') + '&body=' + encodeURIComponent(msg);
      document.getElementById('ask-wa').href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
      if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    });
  });
  if (dlg) {
    dlg.querySelector('[data-close]').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    var copy = document.getElementById('ask-copy');
    copy.addEventListener('click', function () {
      var text = document.getElementById('ask-template').textContent;
      var done = function () { copy.textContent = 'Skopiowano'; setTimeout(function () { copy.textContent = 'Kopiuj wiadomość'; }, 2000); };
      try { navigator.clipboard.writeText(text).then(done, function () { copy.textContent = 'Zaznacz tekst i skopiuj ręcznie'; }); }
      catch (err) { copy.textContent = 'Zaznacz tekst i skopiuj ręcznie'; }
    });
  }

  // Zaznaczenie bieżącej strony w spisie poradnika
  document.querySelectorAll('.guide-toc a').forEach(function (a) {
    if (a.href.replace(/index\.html$/, '') === location.href.split('#')[0].replace(/index\.html$/, '')) a.setAttribute('aria-current', 'page');
  });

  // Liczenie kliknięć e-mail i WhatsApp – przygotowane, WYŁĄCZONE.
  // Po wyborze narzędzia analityki (i aktualizacji polityki prywatności) ustaw ANALYTICS = true
  // i podmień wnętrze track() na wywołanie narzędzia, np. window.plausible(name).
  var ANALYTICS = false;
  function track(name) { if (!ANALYTICS) return; /* np. window.plausible && window.plausible(name) */ }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-track]');
    if (t) track(t.getAttribute('data-track') === 'email' ? 'Klik e-mail' : 'Klik WhatsApp');
  });

  // Formularz oceny partii
  var form = document.getElementById('rate-form');
  if (!form) return;
  var startedAt = Date.now();
  var descs = { 1: 'Nie smakowała', 2: 'Taka sobie', 3: 'W porządku', 4: 'Bardzo dobra', 5: 'Rewelacja' };
  var desc = document.getElementById('rating-desc');
  form.querySelectorAll('input[name="ocena"]').forEach(function (r) {
    r.addEventListener('change', function () {
      desc.textContent = descs[r.value];
      form.querySelectorAll('.rating label').forEach(function (l) { l.classList.toggle('is-on', Number(l.dataset.v) <= Number(r.value)); });
      r.closest('.field').classList.remove('is-invalid');
    });
  });
  var code = form.querySelector('#partia');
  code.addEventListener('input', function () { code.value = code.value.toUpperCase().replace(/[^A-Z0-9 ]/g, ''); });

  function check(field, ok) { field.classList.toggle('is-invalid', !ok); return ok; }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    ok = check(code.closest('.field'), /^[A-Z0-9 ]{2,12}$/.test(code.value.trim())) && ok;
    ok = check(form.querySelector('.field--rating'), !!form.querySelector('input[name="ocena"]:checked')) && ok;
    var opis = form.querySelector('#opis');
    ok = check(opis.closest('.field'), opis.value.trim().length >= 5) && ok;
    var mail = form.querySelector('#email');
    ok = check(mail.closest('.field'), !mail.value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value)) && ok;
    if (!ok) { var first = form.querySelector('.is-invalid input, .is-invalid textarea'); if (first) first.focus(); return; }

    // Ochrona przed spamem: ukryte pole i zbyt szybkie wysłanie (boty)
    if (form.querySelector('[name="botcheck"]').checked || Date.now() - startedAt < 3000) { showSent(); return; }

    var key = form.querySelector('[name="access_key"]').value;
    if (!key || key.indexOf('WSTAW') === 0) { showSent(true); return; } // podgląd: bez wysyłki

    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Wysyłam…';
    var data = new FormData(form);
    data.set('subject', 'Ocena partii ' + code.value.trim() + ' – ' + data.get('ocena') + '/5');
    fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      .then(function (r) { return r.json(); })
      .then(function (res) { if (res.success) showSent(); else throw new Error(res.message); })
      .catch(function () {
        btn.disabled = false; btn.textContent = 'Wyślij opinię';
        document.getElementById('form-error').hidden = false;
      });
  });
  function showSent(preview) {
    document.querySelector('.rate-card').classList.add('is-sent');
    if (preview) document.getElementById('preview-note').hidden = false;
  }
})();
