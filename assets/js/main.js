// AMÉA – mobile menu, offer tabs, nav highlight, scroll reveal, service panel, footer year. No dependencies.
(function () {
  'use strict';

  // Mobile menu
  var menuBtn = document.getElementById('menu-btn');
  var nav = document.getElementById('nav');
  if (menuBtn && nav) {
    var setMenu = function (open) {
      nav.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.textContent = open ? 'Zamknij' : 'Menu';
    };
    menuBtn.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); menuBtn.focus(); }
    });
  }

  // Offer tabs (WAI-ARIA tabs pattern: click, arrow keys, Home/End)
  var tablist = document.querySelector('[role="tablist"]');
  if (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    var feet = Array.prototype.slice.call(document.querySelectorAll('.offer-foot[data-foot]'));
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      // Offer footer: the tab's own one if it has it (classes → Fitssey), otherwise the default (Booksy)
      var own = feet.some(function (f) { return f.getAttribute('data-foot') === tab.id; });
      feet.forEach(function (f) { f.hidden = f.getAttribute('data-foot') !== (own ? tab.id : 'default'); });
      if (focus) tab.focus();
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') next = tabs[0];
        else if (e.key === 'End') next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); select(next, true); }
      });
    });
    select(tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0], false);

    // Links with data-tab (philosophy pillars) open that tab; the anchor then scrolls to the offer
    document.addEventListener('click', function (e) {
      var link = e.target.closest('[data-tab]');
      var tab = link && document.getElementById(link.getAttribute('data-tab'));
      if (tab) select(tab, false);
    });
  }

  // Highlight the nav link of the section in the middle of the viewport
  if (nav && 'IntersectionObserver' in window) {
    var links = {};
    Array.prototype.forEach.call(nav.querySelectorAll('a[href^="#"]'), function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        Object.keys(links).forEach(function (id) { links[id].removeAttribute('aria-current'); });
        if (links[entry.target.id]) links[entry.target.id].setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Array.prototype.forEach.call(document.querySelectorAll('main > section[id]'), function (s) { spy.observe(s); });
  }

  // Scroll reveal: photos settle into their frames, divider lines draw out from the emblem.
  // Elements are tagged only here, so without JS or with reduced motion nothing is ever hidden.
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !calm) {
    var reveal = new IntersectionObserver(function (entries) {
      var n = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.setProperty('--delay', (n++ * 0.12) + 's');
        entry.target.classList.add('is-in');
        reveal.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    var below = 'main > section:not(.hero) ';
    Array.prototype.forEach.call(document.querySelectorAll(below + '.photo, ' + below + '.portrait, ' + below + '.divider'), function (el) {
      if (!el.classList.contains('divider') && !el.querySelector(':scope > img')) return; // empty portrait placeholders stay as they are
      el.classList.add('reveal');
      reveal.observe(el);
    });
  }

  // Service panel: a link with data-svc (optionally data-lvl = preselected option) opens the treatment's
  // details with the option and area/length to choose. "Wybierz termin" is a plain link to the Booksy profile
  // with ?do=open-widget&variantId=…, which opens Booksy in a new tab straight on that service's booking.
  // Nothing from Booksy loads on this page. Without JS (or <dialog>) the link opens the Booksy profile.
  var svcData = document.getElementById('svc-data');
  var sheet = document.getElementById('svc');
  if (svcData && sheet && typeof sheet.showModal === 'function') {
    var data = JSON.parse(svcData.textContent);
    var body = sheet.querySelector('.sheet-body');
    var foot = sheet.querySelector('.sheet-foot');
    var bookLink = foot.querySelector('[data-sheet-book]');
    var svc = null, lvl = 0, vr = 0;

    var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
    var zl = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' zł'; };
    var time = function (m) { var h = Math.floor(m / 60), r = m % 60; return (h ? h + ' h' : '') + (h && r ? ' ' : '') + (r ? r + ' min' : ''); };
    var list = function (items) { return items.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join(''); };
    var level = function () { return svc.levels[lvl]; };
    var variant = function () { return level().variants[vr]; };
    var varLabel = function () { return level().varLabel || svc.varLabel || 'Obszar'; };

    // Parts that change with the choice: variant pills, the option's description, the summary in the footer
    var renderLevel = function () {
      var L = level(), h = '';
      if (L.variants.length > 1) {
        h += '<fieldset class="chips"><legend class="eyebrow">' + esc(varLabel()) + '</legend>' + L.variants.map(function (v, i) {
          return '<label class="chip"><input type="radio" name="svc-var" value="' + i + '"' + (i === vr ? ' checked' : '') + '><span>' + esc(v.label) + '</span></label>';
        }).join('') + '</fieldset>';
      }
      if (L.note || L.steps) {
        h += '<div class="sheet-block"><h3>' + (L.steps ? 'Przebieg zabiegu' : 'O zabiegu') + '</h3>' +
          (L.note ? '<p>' + esc(L.note) + '</p>' : '') + (L.steps ? '<ol class="sheet-steps">' + list(L.steps) + '</ol>' : '') + '</div>';
      }
      body.querySelector('[data-part="level"]').innerHTML = h;
      renderSum();
    };
    var renderSum = function () {
      var L = level(), V = variant();
      var parts = [svc.levels.length > 1 ? L.name : '', L.variants.length > 1 && varLabel() !== 'Czas' ? V.label : ''];
      foot.querySelector('.sum-name').textContent = parts.filter(Boolean).join(' · ') || svc.title;
      foot.querySelector('.sum-price').innerHTML = zl(V.price) + '<small>' + time(V.min) + '</small>';
      bookLink.href = data.booksy + '?do=open-widget&variantId=' + V.id;
    };
    var render = function () {
      var h = '<header class="sheet-title"><p class="eyebrow">' + esc(svc.eyebrow) + '</p><h2 id="svc-title">' + esc(svc.title) + '</h2>' +
        (svc.tagline ? '<p class="tagline">' + esc(svc.tagline) + '</p>' : '') + '<p class="sheet-for">' + esc(svc.for) + '</p></header>';
      if (svc.levels.length > 1) {
        h += '<fieldset><legend class="eyebrow">' + esc(svc.levelLabel || 'Poziom') + '</legend>' + svc.levels.map(function (L, i) {
          var min = Math.min.apply(null, L.variants.map(function (v) { return v.price; }));
          return '<label class="opt"><input type="radio" name="svc-lvl" value="' + i + '"' + (i === lvl ? ' checked' : '') + '>' +
            '<span class="opt-name' + (svc.levelLabel ? ' plain' : '') + '">' + esc(L.name) + '</span><span class="opt-price">' + (L.variants.length > 1 ? 'od ' : '') + zl(min) + '</span></label>';
        }).join('') + '</fieldset>';
      }
      h += '<div data-part="level"></div>';
      (svc.lists || []).forEach(function (l) { h += '<details class="fold"><summary>' + esc(l.title) + '</summary><ul>' + list(l.items) + '</ul></details>'; });
      body.innerHTML = h;
      renderLevel();
    };

    body.addEventListener('change', function (e) {
      if (e.target.name === 'svc-lvl') {
        var label = variant().label;
        lvl = +e.target.value;
        vr = Math.max(0, level().variants.map(function (v) { return v.label; }).indexOf(label)); // keep the area/length if the option has it
        renderLevel();
      } else if (e.target.name === 'svc-var') {
        vr = +e.target.value;
        renderSum();
      }
    });

    // Open / close; the panel takes a history entry, so the phone's back button closes it
    var open = function (key, preset) {
      svc = data.uslugi[key];
      if (!svc) return false;
      lvl = Math.min(Math.max(+preset || 0, 0), svc.levels.length - 1);
      vr = 0;
      render();
      sheet.showModal();
      body.scrollTop = 0;
      history.pushState({ ameaSheet: true }, '');
      return true;
    };
    var close = function () {
      if (sheet.open) sheet.close();
      if (history.state && history.state.ameaSheet) history.back();
    };
    window.addEventListener('popstate', function () { if (sheet.open) sheet.close(); });
    sheet.addEventListener('cancel', function (e) { e.preventDefault(); close(); });
    sheet.addEventListener('click', function (e) { if (e.target === sheet) close(); }); // click on the backdrop
    sheet.querySelector('[data-sheet-close]').addEventListener('click', close);
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[data-svc]');
      if (link && !e.metaKey && !e.ctrlKey && !e.shiftKey && open(link.getAttribute('data-svc'), link.getAttribute('data-lvl'))) e.preventDefault();
    });
  }

  // Current year in the footer
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
