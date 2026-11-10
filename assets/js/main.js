// AMÉA – mobile menu, offer tabs, nav highlight, scroll reveal, service panel + Booksy booking window, footer year. No dependencies.
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
  // details with the option and area/length to choose. "Wybierz termin" hides the panel and opens Booksy's
  // widget in a centred window (#booking) straight on that variant; Booksy loads only after that click.
  // Its href (Booksy profile with ?do=open-widget&variantId=…) is for Ctrl/middle click.
  // Without JS (or <dialog>) the link on the card opens the Booksy profile.
  var svcData = document.getElementById('svc-data');
  var sheet = document.getElementById('svc');
  if (svcData && sheet && typeof sheet.showModal === 'function') {
    var data = JSON.parse(svcData.textContent);
    var body = sheet.querySelector('.sheet-body');
    var foot = sheet.querySelector('.sheet-foot');
    var bookLink = foot.querySelector('[data-sheet-book]');
    var svc = null, lvl = 0, vr = 0, trigger = null;

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
      foot.querySelector('.sum-name').textContent = parts.filter(Boolean).join(' · '); // nothing to choose: the title above says it
      var sum = foot.querySelector('.sum-price');
      sum.classList.toggle('is-quote', V.price == null); // no price on Booksy: priced after the consultation
      sum.innerHTML = (V.price == null ? 'Wycena indywidualna' : zl(V.price)) + '<small>' + time(V.min) + '</small>';
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

    // Booking window: Booksy's widget in an iframe. The widget talks to the page with postMessage
    // ({ uniqueId, events: { ready | resize | close | goToUrl | sendPost } }), like Booksy's own code.js.
    var booking = document.getElementById('booking');
    var card = booking && booking.querySelector('.booking-card');
    var frame = null, uid = '', waitTimer = 0;
    var phone = window.matchMedia('(max-width: 640px)');
    var BOOKSY = /^https:\/\/([a-z0-9-]+\.)*booksy\.(com|net)$/;
    var afterAnim = function (el, fn) { // run fn once el's own animation ends (at once when there is none)
      var name = getComputedStyle(el).animationName;
      if (!name || name === 'none') { fn(); return; }
      var done = false;
      var end = function (e) {
        if (done || (e && e.target !== el)) return;
        done = true; el.removeEventListener('animationend', end); fn();
      };
      el.addEventListener('animationend', end);
      setTimeout(end, 700);
    };
    var tellSize = function () { // where the widget sits, as Booksy's code.js reports it
      if (!frame || !frame.contentWindow) return;
      var r = card.getBoundingClientRect();
      frame.contentWindow.postMessage({ uniqueId: uid, name: 'scroll', data: {
        container: { x: r.x, y: r.y, top: r.top, left: r.left, right: r.right, bottom: r.bottom, width: r.width, height: r.height },
        window: { width: window.innerWidth, height: window.innerHeight } } }, '*');
    };
    var ready = function () { booking.classList.add('is-ready'); clearTimeout(waitTimer); tellSize(); };
    var post = function (action, fields) { // payment and similar steps: a form POST, as code.js does
      var f = document.createElement('form');
      f.method = 'post'; f.action = action;
      Object.keys(fields || {}).forEach(function (k) {
        var i = document.createElement('input');
        i.type = 'hidden'; i.name = k; i.value = fields[k]; f.appendChild(i);
      });
      document.body.appendChild(f); f.submit();
    };
    var book = function () {
      var L = level(), V = variant(), f;
      document.getElementById('booking-name').textContent = [svc.title, svc.levels.length > 1 ? L.name : '', L.variants.length > 1 ? V.label : ''].filter(Boolean).join(' · ');
      Array.prototype.forEach.call(booking.querySelectorAll('[data-booking-out]'), function (a) { a.href = bookLink.href; });
      uid = 'amea' + Date.now().toString(36);
      frame = f = document.createElement('iframe');
      f.title = 'Rezerwacja w Booksy';
      f.setAttribute('allow', 'payment');
      f.src = data.widget + '&variantId=' + V.id + '&uniqueId=' + uid;
      f.addEventListener('load', function () { setTimeout(function () { if (frame === f) ready(); }, 4000); }); // in case "ready" never comes
      booking.classList.remove('is-ready', 'is-late');
      card.appendChild(f);
      clearTimeout(waitTimer);
      waitTimer = setTimeout(function () { booking.classList.add('is-late'); }, 15000);
      var show = function () { booking.showModal(); history.replaceState({ ameaBook: true }, ''); };
      if (phone.matches) { // the window slides up over the panel, then the panel goes
        show();
        afterAnim(booking, function () {
          sheet.close();
          if (booking.open && !booking.contains(document.activeElement)) booking.querySelector('[data-booking-close]').focus();
        });
      } else { // the panel slides away, then the window rises in the centre
        sheet.classList.add('is-leaving');
        afterAnim(sheet, function () { sheet.close(); sheet.classList.remove('is-leaving'); show(); });
      }
    };
    var closeBooking = function (fromHistory) {
      if (!booking.open) return;
      booking.close();
      clearTimeout(waitTimer);
      if (frame) { frame.remove(); frame = null; }
      if (sheet.open) sheet.close();
      if (!fromHistory && history.state && history.state.ameaBook) history.back();
      if (trigger && trigger.isConnected) trigger.focus();
    };
    if (booking && data.widget) {
      bookLink.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // on purpose: Booksy's page in a new tab
        e.preventDefault();
        book();
      });
      booking.querySelector('[data-booking-close]').addEventListener('click', function () { closeBooking(); });
      booking.addEventListener('cancel', function (e) { e.preventDefault(); closeBooking(); });
      window.addEventListener('resize', tellSize);
      window.addEventListener('message', function (e) {
        var d = e.data, ev;
        if (!frame || !BOOKSY.test(e.origin) || !d || d.uniqueId !== uid || !(ev = d.events)) return;
        if (ev.ready) ready();
        if (ev.close) closeBooking(); // Booksy's own X (after "Tak, przerwij") or the end of the booking
        if (ev.goToUrl && /^https:\/\//.test(ev.goToUrl.url)) window.location.assign(ev.goToUrl.url);
        if (ev.sendPost && /^https:\/\//.test(ev.sendPost.action)) post(ev.sendPost.action, ev.sendPost.data);
      });
    }

    window.addEventListener('popstate', function () {
      if (booking && booking.open) closeBooking(true);
      if (sheet.open) sheet.close();
    });
    sheet.addEventListener('cancel', function (e) { e.preventDefault(); close(); });
    sheet.addEventListener('click', function (e) { if (e.target === sheet) close(); }); // click on the backdrop
    sheet.querySelector('[data-sheet-close]').addEventListener('click', close);
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[data-svc]');
      if (link && !e.metaKey && !e.ctrlKey && !e.shiftKey && open(link.getAttribute('data-svc'), link.getAttribute('data-lvl'))) {
        e.preventDefault();
        trigger = link;
      }
    });
  }

  // Current year in the footer
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
