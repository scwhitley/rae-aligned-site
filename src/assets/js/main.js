// RaeAligned: mobile menu + form validation and submission (Netlify Forms)
(function () {
  var nav = document.getElementById('siteNav');
  var btn = document.getElementById('menuBtn');
  if (nav && btn) {
    var setOpen = function (open) {
      nav.dataset.open = open ? 'true' : 'false';
      btn.setAttribute('aria-expanded', String(open));
    };
    btn.addEventListener('click', function () { setOpen(nav.dataset.open !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  var messages = {
    valueMissing: function (el) {
      if (el.type === 'checkbox') return 'Please tick the box: ' + el.labels[0].textContent.replace(/\s*required\s*$/, '').trim();
      return 'Please fill in: ' + el.labels[0].textContent.replace(/\s*required\s*$/, '').trim() + '.';
    },
    typeMismatch: function () { return 'Please enter a valid email address so I can reply.'; },
    rangeUnderflow: function (el) { return el.labels[0].textContent.replace(/\s*required\s*$/, '').trim() + ' must be at least 1.'; }
  };

  document.querySelectorAll('form[data-netlify]').forEach(function (form) {
    var err = form.querySelector('.form-error');
    var done = form.querySelector('.form-done');
    var submit = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      err.textContent = '';
      done.hidden = true;
      form.querySelectorAll('[aria-invalid]').forEach(function (el) { el.removeAttribute('aria-invalid'); });

      var bad = Array.prototype.find.call(form.elements, function (el) { return el.willValidate && !el.checkValidity(); });
      if (bad) {
        var v = bad.validity;
        var key = v.valueMissing ? 'valueMissing' : v.typeMismatch ? 'typeMismatch' : v.rangeUnderflow ? 'rangeUnderflow' : null;
        err.textContent = key ? messages[key](bad) : 'Please check the highlighted field.';
        bad.setAttribute('aria-invalid', 'true');
        bad.focus();
        return;
      }

      submit.disabled = true;
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      })
        .then(function (res) {
          if (!res.ok) throw new Error(res.status);
          form.reset();
          done.hidden = false;
          done.focus && done.setAttribute('tabindex', '-1');
          done.focus();
        })
        .catch(function () {
          err.textContent = 'Your message didn’t send. Please try again, or email raven@raealignedservices.com.';
        })
        .finally(function () { submit.disabled = false; });
    });
  });
})();

// Homepage pop-up panels. Links carry data-modal="name"; when the matching <dialog id="m-name">
// exists (homepage only) the panel opens, otherwise the link goes to the standalone page.
// Each open panel adds a history entry, so the phone's back button closes it.
(function () {
  var dialogs = {};
  document.querySelectorAll('dialog.modal').forEach(function (d) { dialogs[d.id.slice(2)] = d; });
  if (!Object.keys(dialogs).length || typeof HTMLDialogElement === 'undefined') return;

  var root = document.documentElement;
  var fromHistory = false;
  var lastTrigger = null;

  function current() {
    for (var k in dialogs) if (dialogs[k].open) return k;
    return null;
  }
  function show(name) {
    var d = dialogs[name];
    var open = current();
    if (open && open !== name) { fromHistory = true; dialogs[open].close(); fromHistory = false; }
    if (!d.open) d.showModal();
    d.querySelector('.modal-body').scrollTop = 0;
    root.classList.add('modal-open');
  }
  function open(name) {
    var inPanel = history.state && history.state.modal;
    show(name);
    if (inPanel) history.replaceState({ modal: name }, '', '#' + name);
    else history.pushState({ modal: name }, '', '#' + name);
  }

  Object.keys(dialogs).forEach(function (name) {
    var d = dialogs[name];
    d.addEventListener('close', function () {
      if (!current()) root.classList.remove('modal-open');
      if (!fromHistory && history.state && history.state.modal === name) history.back();
      if (!current() && lastTrigger) { lastTrigger.focus(); lastTrigger = null; }
    });
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
    d.querySelector('[data-close]').addEventListener('click', function () { d.close(); });
  });

  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-modal]');
    if (a && dialogs[a.dataset.modal]) {
      e.preventDefault();
      if (!current()) lastTrigger = a;
      open(a.dataset.modal);
      return;
    }
    var s = e.target.closest('[data-scroll]');
    if (s) {
      var target = document.querySelector(s.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }
  });

  window.addEventListener('popstate', function () {
    var want = history.state && history.state.modal;
    if (want && dialogs[want]) { show(want); return; }
    var open = current();
    if (open) { fromHistory = true; dialogs[open].close(); fromHistory = false; }
  });

  // A link elsewhere on the page to #notary etc.
  window.addEventListener('hashchange', function () {
    var h = location.hash.slice(1);
    if (dialogs[h] && current() !== h) { history.replaceState(null, '', location.pathname); open(h); }
  });

  // Direct link such as raealignedservices.com/#notary opens that panel; back returns to the homepage.
  var hash = location.hash.slice(1);
  if (dialogs[hash]) {
    history.replaceState(null, '', location.pathname);
    open(hash);
  }
})();
