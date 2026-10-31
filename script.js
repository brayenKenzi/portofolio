const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const menu = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
if ('IntersectionObserver' in window && !motion.matches) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
const orbital = document.querySelector('.orbital');
const progress = document.querySelector('.progress');
let framePending = false;
let pointerX = 0;
function updateEffects() {
  const scroll = window.scrollY;
  const range = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${range > 0 ? Math.min(100, scroll / range * 100) : 0}%`;
  orbital.style.setProperty('--orb-y', `${motion.matches ? 0 : Math.min(scroll * 0.12, 65)}px`);
  orbital.style.setProperty('--mouse-x', `${motion.matches ? 0 : pointerX}px`);
  framePending = false;
}
function scheduleEffects() { if (!framePending) { framePending = true; requestAnimationFrame(updateEffects); } }
window.addEventListener('scroll', scheduleEffects, { passive: true });
window.addEventListener('resize', scheduleEffects, { passive: true });
document.querySelector('.hero').addEventListener('pointermove', event => { if (event.pointerType !== 'mouse') return; pointerX = (event.clientX / window.innerWidth - 0.5) * 16; scheduleEffects(); });
document.querySelector('.hero').addEventListener('pointerleave', () => { pointerX = 0; scheduleEffects(); });
motion.addEventListener('change', () => { if (motion.matches) document.documentElement.classList.remove('js-motion'); scheduleEffects(); });
scheduleEffects();
function updateClock() { document.querySelector('#local-time').textContent = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Makassar', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()) + ' WITA'; }
updateClock(); setInterval(updateClock, 60000);
document.querySelector('#year').textContent = new Date().getFullYear();
const projects = [
  { title: 'Setup Jaringan LAN & WiFi MikroTik', description: 'Setup jaringan LAN dan WiFi MikroTik untuk kantor di Kotamobagu dengan lebih dari 50 pengguna, termasuk konfigurasi VLAN dan hotspot.' },
  { title: 'Implementasi Server & Backup System', description: 'Perancangan dan implementasi sistem server dan backup otomatis untuk perusahaan logistik di Sulawesi Utara. Area implementasi mencakup server, backup, dan Linux.' },
  { title: 'Keamanan Jaringan & VPN', description: 'Implementasi solusi keamanan jaringan dan VPN untuk perusahaan multi-cabang dengan akses remote yang aman. Fokus pada konfigurasi keamanan, VPN, dan firewall.' },
  { title: 'Sistem Monitoring Jaringan', description: 'Implementasi sistem monitoring jaringan real-time untuk deteksi dini masalah dan optimasi performa. Menggunakan PRTG untuk membantu pemantauan kondisi jaringan.' }
];
const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[Number(button.dataset.project)];
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-description').textContent = project.description;
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
