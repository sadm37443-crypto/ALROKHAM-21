/* ============================================================
   موقع الرخام الملكي — السكريبت الكامل
   يشمل: Navbar, Menu, Counters, Fade-in, Filter, Lightbox,
           Contact Form, SPA Navigation
   ============================================================ */

// ============================================================
// 1) Navbar Scroll Effect
// ============================================================
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  if (navbar) {
    navbar.style.boxShadow = window.scrollY > 50
      ? '0 4px 20px rgba(0,0,0,0.12)'
      : '0 2px 10px rgba(0,0,0,0.05)';
  }

  if (backToTop) {
    backToTop.classList.toggle('active', window.scrollY > 400);
  }
});

// ============================================================
// 2) Hamburger Menu (Mobile)
// ============================================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // إغلاق القائمة عند الضغط على أي رابط
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// ============================================================
// 3) Back to Top
// ============================================================
document.getElementById('backToTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// 4) Animated Counters
// ============================================================
const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
  const target = +counter.dataset.target;
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const update = () => {
    current += step;
    if (current < target) {
      counter.textContent = Math.ceil(current) + '+';
      requestAnimationFrame(update);
    } else {
      counter.textContent = target + '+';
    }
  };
  update();
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ============================================================
// 5) Fade-in on Scroll
// ============================================================
const fadeEls = document.querySelectorAll(
  '.product-card, .testimonial-card, .vision-card, .stat-item'
);

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => fadeObserver.observe(el));

// ============================================================
// 6) Products Filter
// ============================================================
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('#productsGrid .product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? 'block' : 'none';
    });
  });
});

// ============================================================
// 7) Lightbox (Portfolio)
// ============================================================
function openLightbox(src) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  if (!lightbox || !img) return;
  img.src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ============================================================
// 8) Contact Form
// ============================================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    status.textContent = '✓ تم استلام رسالتك بنجاح، سنتواصل معك قريباً.';
    status.style.color = '#22a722';
    contactForm.reset();
    setTimeout(() => { status.textContent = ''; }, 5000);
  });
}

// ============================================================
// 9) Smooth scroll for internal anchor links
//    (مش هيتعارض مع SPA لأننا نتعامل مع links الـ SPA أدناه)
// ============================================================
document.querySelectorAll('a[href^="#"]:not([data-page])').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================================
// 10) SPA Navigation — التنقل بين الصفحات
// ============================================================
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('[data-page]');
const navMenuEl = document.getElementById('navMenu');
const hamburgerEl = document.getElementById('hamburger');

function showPage(pageId) {
  // إخفاء كل الصفحات
  pages.forEach(p => p.classList.remove('active'));

  // إظهار الصفحة المطلوبة
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');

  // تحديث الرابط النشط في القائمة
  navMenuEl?.querySelectorAll('a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });

  // إغلاق قائمة الموبايل
  hamburgerEl?.classList.remove('active');
  navMenuEl?.classList.remove('active');

  // الرجوع لأعلى الصفحة
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // إعادة تشغيل الأنيميشن للكروت الجديدة
  if (target) {
    const newCards = target.querySelectorAll(
      '.product-card, .testimonial-card, .vision-card, .stat-item'
    );
    newCards.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 80);
    });
  }
}

// ربط كل رابط SPA بالصفحة
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    if (page) {
      showPage(page);
      // تحديث الـ hash في الـ URL
      history.pushState(null, '', '#' + page);
    }
  });
});

// التعامل مع hash الموجود في URL عند التحميل الأول
window.addEventListener('load', () => {
  const hash = window.location.hash.replace('#', '') || 'home';
  showPage(hash);
});

// دعم زر الرجوع/التقدم في المتصفح
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '') || 'home';
  showPage(hash);
});