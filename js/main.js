// RaeAligned site: mobile menu + contact form (Netlify Forms)
(function () {
  var links = document.getElementById('navLinks');
  var menuBtn = document.getElementById('menuBtn');

  if (links && menuBtn) {
    function setMenu(open) {
      links.dataset.open = open ? 'true' : 'false';
      menuBtn.setAttribute('aria-expanded', String(open));
    }
    menuBtn.addEventListener('click', function () {
      setMenu(links.dataset.open !== 'true');
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
  }

  var form = document.getElementById('contactForm');
  if (!form) return;
  var err = document.getElementById('cf-err');
  var done = document.getElementById('cf-done');
  var submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    err.textContent = '';
    done.hidden = true;

    var f = form.elements;
    var name = f['cf-name'], email = f['cf-email'], msg = f['cf-msg'];
    if (!name.value.trim()) { err.textContent = 'Please add your name.'; name.focus(); return; }
    if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) { err.textContent = 'Please enter a valid email so I can reply.'; email.focus(); return; }
    if (!msg.value.trim()) { err.textContent = 'Add a short message about what you need.'; msg.focus(); return; }

    submitBtn.disabled = true;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    })
      .then(function (res) {
        if (!res.ok) throw new Error(res.status);
        form.reset();
        done.hidden = false;
      })
      .catch(function () {
        err.textContent = 'Your message didn’t send. Please try again, or email info@raealignedservices.com.';
      })
      .finally(function () { submitBtn.disabled = false; });
  });
})();
