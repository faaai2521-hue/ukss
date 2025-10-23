// Theme handling (persist)
function setTheme(theme){
  if(theme === 'dark') document.body.classList.add('dark');
  else document.body.classList.remove('dark');
  localStorage.setItem('theme', theme);
}

function toggleTheme(){
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Menu toggle for mobile
function toggleMenu(menuId){
  // If specific menuId given (for pages with separate navMenu ids), toggle that; otherwise use generic
  const id = menuId || 'navMenu';
  const el = document.getElementById(id);
  if(!el) return;
  el.classList.toggle('show');
}

// Highlight active link based on current filename
function highlightActiveLink(){
  const links = document.querySelectorAll('.nav-link');
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const page = path.split('.html')[0];
  links.forEach(a => {
    const target = a.getAttribute('data-page');
    if(target === page) a.classList.add('active');
    else a.classList.remove('active');
  });
}

// Hook event listeners (handles multiple menu buttons across pages)
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme
  const saved = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(saved);

  // Theme toggle buttons (may be multiple with different ids)
  ['themeToggle','themeToggle2','themeToggle3','themeToggle4'].forEach(id => {
    const btn = document.getElementById(id);
    if(btn) btn.addEventListener('click', toggleTheme);
  });

  // Menu toggles (for responsive hamburger) — support multiple ids per page
  const menuHookPairs = [
    {btnId:'menuToggle', menuId:'navMenu'},
    {btnId:'menuToggle2', menuId:'navMenu2'},
    {btnId:'menuToggle3', menuId:'navMenu3'},
    {btnId:'menuToggle4', menuId:'navMenu4'},
    {btnId:'menuToggle5', menuId:'navMenu5'},
  ];
  menuHookPairs.forEach(pair => {
    const b = document.getElementById(pair.btnId);
    if(b){
      b.addEventListener('click', () => toggleMenu(pair.menuId));
    }
  });

  // Also highlight active link
  highlightActiveLink();

  // Close mobile menu when clicking outside (optional)
  document.addEventListener('click', (e) => {
    const menus = document.querySelectorAll('.nav-links');
    const toggles = document.querySelectorAll('.menu-toggle');
    const clickedToggle = Array.from(toggles).some(t => t.contains(e.target));
    if(!clickedToggle){
      menus.forEach(m => {
        if(m.classList.contains('show')){
          // if click outside nav and not inside nav, close
          if(!m.contains(e.target)) m.classList.remove('show');
        }
      });
    }
  });
});
