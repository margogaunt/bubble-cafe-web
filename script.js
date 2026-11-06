// Chování webu – viz DESIGN.md, kap. 7 (střídmé animace)
const canHover = matchMedia('(hover: hover)').matches;
const isMobile = () => matchMedia('(max-width: 960px)').matches;

// ===== Navigace =====
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('menu');

const setMenu = open => {
  menu.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');
};
toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

let navQueued = false;
const onScroll = () => {
  if (navQueued) return;
  navQueued = true;
  requestAnimationFrame(() => { navQueued = false; nav.classList.toggle('is-scrolled', scrollY > 40); });
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Objevení při scrollu =====
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Nabídka =====
// photo: cesta k fotce ve složce IMG
const ITEMS = {
  tea: {
    photo: '867406006_18115543799021674_6986882147659581351_n.webp',
    alt: 'Mléčný bubble tea s tapiokovými perlami v ruce',
    tag: 'Nejoblíbenější',
    desc: 'Čaj, mléko nebo ovoce a na dně žvýkací perly. Podle našich zákazníků nejlepší bubble tea v okolí.'
  },
  coffee: {
    photo: '848170183_18113528954021674_6414360546930213852_n.webp',
    alt: 'Cappuccino s latte art na stolku venku',
    tag: 'Z brazilských zrn',
    desc: 'Na rychlé espresso po cestě i na pomalé cappuccino k dezertu. Káva, kvůli které stojí za to zastavit.'
  },
  ice: {
    photo: '845483574_18113222252021674_8766040224482675115_n.webp',
    alt: 'Mangová točená zmrzlina v kornoutu',
    tag: 'Vanilka · Mango · Mix',
    desc: 'Točená zmrzlina v kornoutu i v kelímku. Vanilková, mangová nebo obojí – proč si vybírat.'
  },
  frappe: {
    photo: '757454747_18102570536021674_7661208918829281333_n.webp',
    alt: 'Ledové frappé ve skle',
    tag: 'Ledové osvěžení',
    desc: 'Krémové a ledové. Nejlepší způsob, jak přežít horké odpoledne – a k tomu něco sladkého.'
  },
  dessert: {
    photo: '768555291_18104485046021674_1542284532686548519_n.webp',
    alt: 'Ovocné tartaletky s borůvkami',
    tag: 'Sladká tečka',
    desc: 'Ovocné tartaletky, tiramisu, laskonky a další dobroty. Co je zrovna v nabídce, uvidíš na Instagramu.'
  }
};
if (document.getElementById('menuPhoto')) Object.values(ITEMS).forEach(i => { new Image().src = i.photo; });

const buttons = document.querySelectorAll('.menu__item');
const photo = document.getElementById('menuPhoto');
const tag = document.getElementById('menuTag');
const desc = document.getElementById('menuDesc');
let current = 'tea';
let fadeTimer = 0;

function select(key) {
  if (key === current) return;
  current = key;
  const item = ITEMS[key];
  buttons.forEach(b => {
    const on = b.dataset.item === key;
    b.classList.toggle('is-active', on);
    b.setAttribute('aria-selected', on);
  });
  tag.textContent = item.tag;
  desc.textContent = item.desc;
  // jemné prolnutí fotky
  photo.classList.add('is-fading');
  clearTimeout(fadeTimer);
  fadeTimer = setTimeout(() => {
    photo.src = item.photo;
    photo.alt = item.alt;
    photo.classList.remove('is-fading');
  }, 180);
  if (isMobile()) {
    const btn = document.querySelector(`.menu__item[data-item="${key}"]`);
    const list = btn.closest('.menu__list');
    list.scrollTo({ left: btn.parentElement.offsetLeft - (list.clientWidth - btn.offsetWidth) / 2, behavior: 'smooth' });
  }
}
buttons.forEach(b => {
  b.addEventListener('click', () => select(b.dataset.item));
  if (canHover) b.addEventListener('mouseenter', () => select(b.dataset.item));
});

// ===== Galerie: tažení myší =====
const track = document.querySelector('.gallery__track');
if (track && canHover) {
  let down = false, startX = 0, startLeft = 0;
  track.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse') return;
    down = true; startX = e.clientX; startLeft = track.scrollLeft;
    track.classList.add('is-dragging');
  });
  addEventListener('pointermove', e => { if (down) track.scrollLeft = startLeft - (e.clientX - startX); });
  addEventListener('pointerup', () => { down = false; track.classList.remove('is-dragging'); });
}

// ===== Otevírací doba =====
// [od, do] v hodinách, index = den v týdnu (0 = neděle)
const HOURS = [[10, 18], [11, 18], [11, 18], [11, 18], [11, 18], [11, 18], [10, 18]];
const now = new Date();
const day = now.getDay();
const h = now.getHours() + now.getMinutes() / 60;
const [from, to] = HOURS[day];

document.querySelector(`.hours [data-day="${day}"]`)?.classList.add('is-today');

const status = document.getElementById('openStatus');
if (status) {
  if (h >= from && h < to) {
    status.textContent = `Právě máme otevřeno · do ${to}:00`;
    status.classList.add('is-open');
  } else {
    const next = h < from ? `dnes v ${from}:00` : `zítra v ${HOURS[(day + 1) % 7][0]}:00`;
    status.textContent = `Teď zavřeno · otevíráme ${next}`;
    status.classList.add('is-closed');
  }
}

const year = document.getElementById('year');
if (year) year.textContent = now.getFullYear();
