// Mobilní menu
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('menu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Otevírací doba: [od, do] v hodinách, index = den v týdnu (0 = neděle)
const HOURS = [[10, 18], [11, 18], [11, 18], [11, 18], [11, 18], [11, 18], [10, 18]];

const now = new Date();
const day = now.getDay();
const h = now.getHours() + now.getMinutes() / 60;
const [from, to] = HOURS[day];

const todayRow = document.querySelector(`.hours tr[data-day="${day}"]`);
if (todayRow) todayRow.classList.add('is-today');

const status = document.getElementById('openStatus');
if (h >= from && h < to) {
  status.textContent = `Teď máme otevřeno – do ${to}:00`;
  status.classList.add('is-open');
} else {
  const next = h < from ? `dnes v ${from}:00` : `zítra v ${HOURS[(day + 1) % 7][0]}:00`;
  status.textContent = `Teď máme zavřeno – otevíráme ${next}`;
  status.classList.add('is-closed');
}

document.getElementById('year').textContent = now.getFullYear();
