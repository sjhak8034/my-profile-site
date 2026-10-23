const root = document.documentElement;

// 다크모드: 저장된 값 -> 시스템 설정 순
try {
  const saved = localStorage.getItem('theme');
  if (saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches) {
    root.classList.add('dark');
  }
} catch (e) {}

document.getElementById('theme-toggle').addEventListener('click', () => {
  const dark = root.classList.toggle('dark');
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
});

// 모바일 메뉴
const mobileMenu = document.getElementById('mobile-menu');
document.getElementById('menu-toggle').addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));

// 스크롤 페이드인
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// 현재 섹션 네비 하이라이트
const links = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach(s => sectionObserver.observe(s));

document.getElementById('year').textContent = new Date().getFullYear();
