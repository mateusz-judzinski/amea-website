// AMÉA – mobile menu, offer tabs, nav highlight, scroll reveal, footer year. No dependencies.
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
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
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

  // Current year in the footer
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
