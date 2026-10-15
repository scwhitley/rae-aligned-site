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
