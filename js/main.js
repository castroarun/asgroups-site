/* =========================================================
   AS Groups — page behaviour
   Every page loads content.js then this file. It:
   1. builds the shared header, footer, floating buttons and enquiry pop-up
   2. fills any [data-render="..."] block from content.js
   3. runs the motion (reveals, counters, testimonial rotation)
   4. handles the enquiry form (opens WhatsApp with the message filled in)
   ========================================================= */
(function () {
  'use strict';
  var S = window.SITE;
  document.documentElement.classList.add('js');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // Escape, then show [placeholders] in gold so nobody ships them by mistake.
  function txt(s) { return esc(s).replace(/\[[^\]]*\]/g, function (m) { return '<span class="ph">' + m + '</span>'; }); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function waLink(message) { return 'https://wa.me/' + S.contact.whatsapp + (message ? '?text=' + encodeURIComponent(message) : ''); }
  function telLink(p) { return 'tel:' + p.replace(/[^+\d]/g, ''); }
  var page = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '') || 'index';

  var ICON = {
    wa: '<svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3z"/></svg>',
    li: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1a4.2 4.2 0 0 1 3.8-2c4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z"/></svg>',
    ig: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    tick: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0A0A0C" stroke-width="3" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    play: '<svg width="30" height="30" viewBox="0 0 24 24" fill="#0A0A0C" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>'
  };

  /* ---------- 1. shared header ---------- */
  var NAV = [
    ['What we do', 'index.html#what-we-do'],
    ['Projects', 'projects.html'],
    ['About', 'about.html'],
    ['Careers', 'careers.html'],
    ['Contact', 'contact.html']
  ];
  var header = $('#site-header');
  if (header) {
    header.className = 'site-header';
    header.innerHTML =
      '<div class="wrap nav">' +
        '<a class="brand" href="index.html" aria-label="AS Groups home"><img src="assets/img/logo-mark.png" alt="" width="40" height="35"><span><b>AS GROUPS</b><small>TOGETHER WE GROW</small></span></a>' +
        '<nav class="nav-links" id="nav-links" aria-label="Main">' +
          NAV.map(function (n) {
            var here = n[1].replace(/#.*/, '').replace('.html', '') === page;
            return '<a href="' + n[1] + '"' + (here ? ' aria-current="page"' : '') + '>' + n[0] + '</a>';
          }).join('') +
        '</nav>' +
        '<button class="btn btn-gold" type="button" data-enquire>Talk to us</button>' +
        '<button class="menu-btn" type="button" aria-controls="nav-links" aria-expanded="false" aria-label="Menu">' + ICON.menu + '</button>' +
      '</div>';
    var mb = $('.menu-btn', header), links = $('#nav-links');
    mb.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      mb.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) { if (e.target.tagName === 'A') { links.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); } });
  }

  /* ---------- shared footer ---------- */
  var footer = $('#site-footer');
  if (footer) {
    footer.className = 'footer';
    var c = S.contact;
    footer.innerHTML =
      '<div class="wrap grid">' +
        '<div class="col"><a class="brand" href="index.html"><img src="assets/img/logo-mark.png" alt="" width="40" height="35"><span><b>AS GROUPS</b><small>TOGETHER WE GROW</small></span></a>' +
          '<span>Building smarter businesses.<br>Creating sustainable growth.</span><span class="tamil" lang="ta">ஒன்றாக வளர்வோம்</span>' +
          '<span class="socials"><a href="' + S.social.linkedin + '" target="_blank" rel="noopener" aria-label="Harish on LinkedIn">' + ICON.li + '</a><a href="' + S.social.instagram + '" target="_blank" rel="noopener" aria-label="Harish on Instagram">' + ICON.ig + '</a></span></div>' +
        '<div class="col"><h4>What we do</h4>' + S.verticals.map(function (v) { return '<a href="' + v.page + '">' + esc(v.name) + '</a>'; }).join('') + '</div>' +
        '<div class="col"><h4>Company</h4><a href="about.html">About AS Groups</a><a href="projects.html">Projects</a><a href="careers.html">Careers</a><a href="contact.html">Contact</a><a href="privacy.html">Privacy</a></div>' +
        '<div class="col"><h4>Contact</h4>' + c.phones.map(function (p) { return '<a href="' + telLink(p) + '">' + p + '</a>'; }).join('') +
          '<a href="mailto:' + c.email + '">' + c.email + '</a><span>' + esc(c.place) + '</span></div>' +
      '</div>' +
      '<div class="wrap base"><span>© ' + new Date().getFullYear() + ' AS Groups · Founder: Harish VJ</span><span>People · Business · Sustainability · Growth</span></div>';
  }

  /* ---------- floating buttons ---------- */
  var fab = document.createElement('div');
  fab.className = 'fab';
  fab.innerHTML = '<button class="btn btn-gold" type="button" data-enquire>Talk to us</button>' +
    '<a class="fab-wa" href="' + waLink('Hi AS Groups, ') + '" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">' + ICON.wa + '</a>';
  document.body.appendChild(fab);

  /* ---------- enquiry pop-up ---------- */
  var modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'enquiry';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'enq-title');
  modal.innerHTML =
    '<div class="modal-backdrop" data-close></div>' +
    '<div class="panel">' +
      '<div class="panel-head"><span id="enq-title"><img src="assets/img/logo-mark.png" alt="">Talk to AS Groups</span><button class="close" type="button" data-close aria-label="Close">' + ICON.close + '</button></div>' +
      '<form novalidate>' +
        '<fieldset><legend>What would you like to talk about?</legend><div class="chips">' +
          S.reasons.map(function (r) { return '<button type="button" class="chip" aria-pressed="false">' + esc(r) + '</button>'; }).join('') +
        '</div><p class="hint" id="reason-hint" hidden>Pick one so we know who should call you back.</p></fieldset>' +
        '<div class="fields">' +
          '<label>Your name<input class="field" name="name" autocomplete="name" required placeholder="Full name"></label>' +
          '<label>Phone / WhatsApp<input class="field" name="phone" type="tel" autocomplete="tel" inputmode="tel" required placeholder="+91"></label>' +
        '</div>' +
        '<label>Email <span class="muted">(optional)</span><input class="field" name="email" type="email" autocomplete="email" placeholder="you@example.com"></label>' +
        '<label>Your message<textarea class="field" name="message" rows="4" placeholder="Tell us a little about your idea or your business"></textarea></label>' +
        '<input class="hp" name="company" tabindex="-1" autocomplete="off" aria-hidden="true">' +
        '<label class="consent"><input type="checkbox" name="consent" required> I agree that AS Groups may contact me about this enquiry. See our <a href="privacy.html">privacy note</a>.</label>' +
        '<p class="hint" id="form-hint" hidden></p>' +
        '<button class="btn btn-gold" type="submit">' + ICON.wa.replace('#fff', '#0A0A0C').replace(/26/g, '20') + ' Send on WhatsApp</button>' +
        '<p class="muted" style="margin:0;font-size:13px">Your message reaches AS Groups on WhatsApp. We’ll get back to you there, usually within ' + txt(S.contact.replyTime) + '.</p>' +
      '</form>' +
      '<div class="sent" aria-live="polite"><div class="tick">' + ICON.tick + '</div><h3>Thank you.</h3><p class="muted" id="sent-line" style="margin:0"></p>' +
        '<p class="muted" style="margin:0;font-size:14px">If WhatsApp didn’t open, <a id="sent-wa" href="#" target="_blank" rel="noopener">tap here</a> or call <a href="' + telLink(S.contact.phones[0]) + '">' + S.contact.phones[0] + '</a>.</p>' +
        '<button class="btn btn-ghost" type="button" data-close>Close</button></div>' +
    '</div>';
  document.body.appendChild(modal);

  var form = $('form', modal), chips = $$('.chip', modal), lastFocus = null, reason = '';
  function pickReason(r) {
    reason = r || '';
    chips.forEach(function (ch) { ch.setAttribute('aria-pressed', ch.textContent === reason ? 'true' : 'false'); });
    if (reason) $('#reason-hint').hidden = true;
  }
  chips.forEach(function (ch) { ch.addEventListener('click', function () { pickReason(ch.textContent); }); });

  function openModal(r) {
    lastFocus = document.activeElement;
    form.hidden = false;
    $('.sent', modal).classList.remove('show');
    pickReason(r);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { (r ? form.elements.name : chips[0]).focus(); }, 60);
  }
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-enquire]');
    if (t) { e.preventDefault(); openModal(t.getAttribute('data-enquire')); return; }
    if (e.target.closest('[data-close]') && modal.contains(e.target)) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') { // keep focus inside the pop-up
      var f = $$('button, a[href], input:not(.hp), textarea', modal).filter(function (el) { return el.offsetParent !== null; });
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var el = form.elements, hint = $('#form-hint');
    if (el.company.value) return; // bot trap
    if (!reason) { $('#reason-hint').hidden = false; chips[0].focus(); return; }
    var problems = [];
    if (!el.name.value.trim()) problems.push('your name');
    if (el.phone.value.replace(/\D/g, '').length < 10) problems.push('a phone number');
    if (!el.consent.checked) problems.push('the consent tick');
    if (problems.length) { hint.textContent = 'Please add ' + problems.join(', ') + '.'; hint.hidden = false; return; }
    hint.hidden = true;
    var msg = 'New enquiry from the AS Groups website\n' +
      'Topic: ' + reason + '\n' +
      'Name: ' + el.name.value.trim() + '\n' +
      'Phone: ' + el.phone.value.trim() + '\n' +
      (el.email.value.trim() ? 'Email: ' + el.email.value.trim() + '\n' : '') +
      (el.message.value.trim() ? 'Message: ' + el.message.value.trim() : '');
    var link = waLink(msg);
    window.open(link, '_blank', 'noopener');
    $('#sent-wa').href = link;
    $('#sent-line').textContent = 'We have your message about “' + reason.toLowerCase() + '”. Send it in WhatsApp and we’ll reply there.';
    form.hidden = true;
    $('.sent', modal).classList.add('show');
    form.reset();
  });

  /* ---------- 2. render blocks from content.js ---------- */
  function countAttr(n, from) { return n == null ? '<span class="ph">[00]</span>' : '<span data-count="' + n + '"' + (from ? ' data-from="' + from + '"' : '') + '>' + (reduceMotion ? n : (from || 0)) + '</span>'; }

  var R = {
    numbers: function () {
      return '<div class="wrap grid">' + S.numbers.map(function (n) {
        return '<div class="stat"><b>' + countAttr(n.value, n.from) + (n.suffix ? '<em>' + n.suffix + '</em>' : '') + '</b><span>' + esc(n.label) + '</span></div>';
      }).join('') + '</div>';
    },
    verticals: function () {
      var total = ('0' + S.verticals.length).slice(-2);
      return S.verticals.map(function (v, i) {
        var n = ('0' + (i + 1)).slice(-2);
        return '<article class="vcard v' + (i + 1) + '">' +
          '<div class="vcard-media"><img src="' + v.image + '" alt="' + esc(v.imageAlt) + '" loading="lazy">' + (v.imageNote ? '<span class="img-note">' + txt(v.imageNote) + '</span>' : '') + '</div>' +
          '<div class="vcard-body"><div class="vhead"><span class="vnum" aria-hidden="true">' + n + '</span><span class="vmeta"><span class="vof">Vertical ' + n + ' of ' + total + '</span><span class="label">' + esc(v.name) + '</span></span></div><h3>' + txt(v.line) + '</h3>' +
          '<div class="tags">' + v.services.map(function (s) { return '<span class="tag' + (v.hot.indexOf(s) > -1 ? ' hot' : '') + '">' + esc(s) + '</span>'; }).join('') + '</div>' +
          '<div class="vcard-foot"><div class="count"><b>' + countAttr(v.live) + '</b><span class="live"><i class="dot"></i>Live</span></div>' +
          '<div class="count"><b>' + countAttr(v.progress) + '</b><span class="prog">In progress</span></div>' +
          '<a class="btn btn-ghost" href="' + v.page + '">Explore projects →</a></div></div></article>';
      }).join('');
    },
    projects: function (el) {
      var only = el.getAttribute('data-vertical');
      var list = S.projects.filter(function (p) { return !only || p.vertical === only; });
      if (!list.length) return '<p class="muted">Projects in this area will be listed here as they go live. <a href="#" data-enquire>Talk to us</a> about yours.</p>';
      return list.map(function (p) {
        var where = [p.line, p.place, p.when].filter(Boolean).join(' · ');
        return '<article class="pcard reveal">' +
          (p.image ? '<div class="pcard-media"><img src="' + p.image + '" alt="' + esc(p.name) + '" loading="lazy"></div>' : '<div class="pcard-media empty"><span>[Project photo]</span></div>') +
          '<div class="pcard-body"><div class="pcard-meta"><span class="k">' + esc(p.kind) + '</span>' +
          (p.status === 'live' ? '<span class="live-tag"><i class="dot"></i> Live</span>' : '<span class="prog-tag">● In progress</span>') + '</div>' +
          '<h3>' + txt(p.name) + '</h3><p>' + txt(where) + '</p></div></article>';
      }).join('');
    },
    testimonials: function () {
      var goldRun = '<span>IN THEIR OWN WORDS</span><i>✦</i><span>TOGETHER WE GROW</span><i>✦</i><span>YOUR GROWTH, OUR COMMITMENT</span><i>✦</i>';
      var darkRun = '<span>Setup</span><i>·</i><span>Marketing</span><i>·</i><span>Hospitality</span><i>·</i><span>Healthcare</span><i>·</i><span>Franchise</span><i>·</i><span>Growth</span><i>·</i>';
      function rep(s, n) { var o = ''; for (var i = 0; i < n; i++) o += s; return o; }
      return '<div class="ribbons" aria-hidden="true"><div class="ribbon dark"><div class="track">' + rep(darkRun, 6) + '</div></div>' +
        '<div class="ribbon gold"><div class="track">' + rep(goldRun, 6) + '</div></div></div>' +
        '<div class="wrap testi">' +
          '<div><h2 class="h2" style="margin-bottom:26px">Client <span class="serif">stories</span></h2>' +
            '<div class="deck"><div class="peek p1"></div><div class="peek p2"></div><div class="story" id="story"></div></div>' +
            '<p class="note">Plays through each story on its own. Tap a bar to jump, tap play to watch.</p></div>' +
          '<div><h2 class="h2" style="margin-bottom:26px">What our clients <span class="serif">say</span>.</h2>' +
            '<div class="quotes" id="quotes" aria-live="polite"></div>' +
            '<div class="qnav" id="qnav"></div></div>' +
        '</div>';
    }
  };
  $$('[data-render]').forEach(function (el) {
    var fn = R[el.getAttribute('data-render')];
    if (fn) el.innerHTML = fn(el);
  });

  /* ---------- 3. motion ---------- */
  // Phones: the "Where are you today?" strip gives a little pull to the right and springs
  // back, so people see it can be swiped. Stops once they touch it.
  var strip = $('.chooser .grid');
  if (strip && !reduceMotion && 'IntersectionObserver' in window) {
    var touched = false, peekTimer = null, peeks = 0;
    var stop = function () { touched = true; clearTimeout(peekTimer); };
    strip.addEventListener('touchstart', stop, { passive: true });
    strip.addEventListener('pointerdown', stop);
    var peek = function () {
      if (touched || window.innerWidth > 860 || peeks >= 3) return;
      peeks++;
      strip.classList.remove('peek'); void strip.offsetWidth; strip.classList.add('peek');
      peekTimer = setTimeout(peek, 5500);
    };
    var peekIO = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { peekTimer = setTimeout(peek, 600); }
      else clearTimeout(peekTimer);
    }, { threshold: 0.7 });
    peekIO.observe(strip);
  }

  // Vertical cards stack over each other on scroll. On phones a card is taller than the
  // screen, so it sticks only once its bottom reaches the bottom of the screen.
  var vcards = $$('.vcard');
  if (vcards.length) {
    var stackTops = function () {
      var phone = window.innerWidth <= 860;
      vcards.forEach(function (c, i) {
        if (!phone) { c.style.top = ''; return; }
        var t = Math.min(76 + i * 12, window.innerHeight - c.offsetHeight - 12 + i * 12);
        c.style.top = t + 'px';
      });
    };
    stackTops();
    window.addEventListener('resize', stackTops);
    window.addEventListener('load', stackTops);
  }

  // Hero constellation: scale the 640px drawing to the space available
  var cwrap = $('.cwrap');
  if (cwrap) {
    var fit = function () { cwrap.style.setProperty('--cs', Math.min(1, cwrap.clientWidth / 640)); };
    fit();
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(cwrap); else window.addEventListener('resize', fit);
  }

  // Scroll reveals
  var revealIO = 'IntersectionObserver' in window && !reduceMotion ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); revealIO.unobserve(en.target); } });
  }, { threshold: 0.15 }) : null;
  $$('.reveal, .process-line').forEach(function (el) { revealIO ? revealIO.observe(el) : el.classList.add('is-in'); });

  // Count-up numbers (only start when visible, then stop)
  function countUp(el) {
    var to = +el.getAttribute('data-count'), from = +(el.getAttribute('data-from') || 0), t0 = null, dur = 1800;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (to - from) * e);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = $$('[data-count]');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { countUp(en.target); countIO.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countIO.observe(el); });
  } else counters.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });

  // Client stories: auto-advance every 7s
  var story = $('#story');
  if (story && S.stories.length) {
    var si = 0, sTimer = null;
    function drawStory() {
      var v = S.stories[si];
      story.innerHTML = '<div class="dots-bg"></div><div class="sheen"></div>' +
        '<div class="segs">' + S.stories.map(function (_, i) { return '<button type="button" aria-label="Story ' + (i + 1) + '" class="' + (i < si ? 'done' : i === si ? 'now' : '') + '"><i></i></button>'; }).join('') + '</div>' +
        (v.video ? '' : '<span class="tagph">[Still from the customer video]</span>') +
        '<button class="play" type="button" aria-label="Play this story">' + ICON.play + '</button>' +
        '<div class="cap"><p>“' + txt(v.quote) + '”</p><small>' + txt(v.who) + ' · ' + txt(v.length) + '</small></div>';
      $$('.segs button', story).forEach(function (b, i) { b.addEventListener('click', function () { si = i; restart(); }); });
      $('.play', story).addEventListener('click', function () {
        if (v.video) window.open(v.video, '_blank', 'noopener');
        else alertInline(story, 'The customer video goes here once it is shared.');
      });
    }
    function restart() { drawStory(); clearInterval(sTimer); if (!reduceMotion) sTimer = setInterval(function () { si = (si + 1) % S.stories.length; drawStory(); }, 7000); }
    restart();
  }
  function alertInline(host, msg) {
    var n = document.createElement('div'); n.className = 'toast'; n.textContent = msg; host.appendChild(n);
    setTimeout(function () { n.remove(); }, 2600);
  }

  // Painted reviews: two at a time, rotate every 6.5s
  var quotes = $('#quotes'), qnav = $('#qnav');
  if (quotes && S.reviews.length) {
    var pairs = Math.ceil(S.reviews.length / 2), qi = 0, qTimer = null;
    var PLATES = ['assets/brush/ivory.webp', 'assets/brush/gold.webp', 'assets/brush/sky.webp'];
    function drawQuotes() {
      var two = S.reviews.slice(qi * 2, qi * 2 + 2);
      quotes.innerHTML = two.map(function (q, k) {
        var plate = PLATES[(qi * 2 + k) % PLATES.length];
        return '<figure class="paint enter' + (k ? ' second' : '') + '" style="transform:rotate(' + (k ? '1deg' : '-1deg') + ')' + (k ? ';margin-left:6%' : ';margin-right:6%') + '">' +
          '<div class="bobber" style="position:relative"><img class="brush" src="' + plate + '" alt="">' +
          '<div class="inner"><span class="src">' + txt(q.source) + ' · ' + txt(q.date) + '</span>' +
          '<blockquote>“' + txt(q.text) + '”</blockquote>' +
          '<figcaption><span class="avatar">' + (q.photo ? '<img src="' + q.photo + '" alt="">' : txt(q.initial)) + '</span><span><b>' + txt(q.who) + '</b><br>' + txt(q.biz) + '</span></figcaption></div></div></figure>';
      }).join('');
      qnav.innerHTML = Array.apply(null, Array(pairs)).map(function (_, i) { return '<button type="button" aria-label="Reviews ' + (i + 1) + '"' + (i === qi ? ' aria-current="true"' : '') + '></button>'; }).join('') +
        '<a href="contact.html#reviews">All reviews →</a>';
      $$('button', qnav).forEach(function (b, i) { b.addEventListener('click', function () { qi = i; qRestart(); }); });
    }
    function qRestart() { drawQuotes(); clearInterval(qTimer); if (!reduceMotion && pairs > 1) qTimer = setInterval(function () { qi = (qi + 1) % pairs; drawQuotes(); }, 6500); }
    qRestart();
  }

})();
