// =====================
// DOM
// =====================
const pagination = document.querySelector('.pagination');
const form = document.querySelector('#search-form');
const searchInput = document.querySelector('.search-input');
const countryChoose = document.querySelector('#choose-country');
const eventContainer = document.querySelector('.event-container');

const backdrop = document.querySelector('.backdrop');
const closeBtn = document.querySelector('.close-modal');
const modalTitle = document.querySelector('.modal-title');
const modalDate = document.querySelector('.modal-date');
const modalCity = document.querySelector('.modal-city');

// =====================
// STATE
// =====================
let currentPage = 0;
const limit = 2;

let filteredEvents = [];
let currentEvents = [];

// =====================
// MOCK DATA
// =====================
const mockEvents = [
  {
    name: "Rock Concert",
    country: "US",
    dates: { start: { localDate: "2026-07-12" } },
    _embedded: { venues: [{ name: "Madison Square Garden" }] }
  },
  {
    name: "Pop Festival",
    country: "US",
    dates: { start: { localDate: "2026-08-15" } },
    _embedded: { venues: [{ name: "SoFi Stadium" }] }
  },
  {
    name: "Indie Gig",
    country: "UK",
    dates: { start: { localDate: "2026-06-20" } },
    _embedded: { venues: [{ name: "O2 Academy" }] }
  },
  {
    name: "Jazz Night",
    country: "UK",
    dates: { start: { localDate: "2026-09-05" } },
    _embedded: { venues: [{ name: "Ronnie Scott's" }] }
  },
  {
    name: "Electronic Beats",
    country: "CA",
    dates: { start: { localDate: "2026-10-11" } },
    _embedded: { venues: [{ name: "Budweiser Stage" }] }
  },
  {
    name: "Classical Gala",
    country: "CA",
    dates: { start: { localDate: "2026-11-30" } },
    _embedded: { venues: [{ name: "Roy Thomson Hall" }] }
  }
];

// =====================
// TEMPLATE
// =====================
const templateSource = `
{{#each events}}
<div class="event-card">

  <p class = 'event-name'>
    <b>{{name}}</b>
  </p>

  <p class = 'event-city'>
    Location: {{_embedded.venues.0.name}} ({{country}})
  </p>

  <p class = 'event-date'>
    Date: {{dates.start.localDate}}
  </p>

  <button class="more-info-btn" data-id="{{@index}}">
    More info
  </button>

</div>
{{/each}}
`;

const compileTemplate = Handlebars.compile(templateSource);

// =====================
// RENDER EVENTS
// =====================
function renderEvents(events) {
  if (!events.length) {
    eventContainer.innerHTML = "No events found.";
    return;
  }

  eventContainer.innerHTML = compileTemplate({ events });
}

// =====================
// PAGINATION
// =====================
function renderPagination(totalPages) {
  let buttons = "";

  for (let i = 0; i < totalPages; i++) {
    buttons += `
      <button class="button-pagination ${i === currentPage ? "active" : ""}" data-page="${i}">
        ${i + 1}
      </button>
    `;
  }

  pagination.innerHTML = buttons;
}

// =====================
// UPDATE DISPLAY
// =====================
function updateDisplay() {
  const searchQuery = searchInput.value.toLowerCase().trim();
  const selectedCountry = countryChoose.value;

  filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery);
    const matchesCountry = !selectedCountry || event.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  const totalPages = Math.ceil(filteredEvents.length / limit);

  if (currentPage >= totalPages && totalPages > 0) {
    currentPage = totalPages - 1;
  }

  const start = currentPage * limit;
  const end = start + limit;

  currentEvents = filteredEvents.slice(start, end);

  renderEvents(currentEvents);
  renderPagination(totalPages);
}

// =====================
// EVENTS
// =====================
pagination.addEventListener('click', (e) => {
  if (!e.target.classList.contains('button-pagination')) return;

  currentPage = Number(e.target.dataset.page);
  updateDisplay();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  currentPage = 0;
  updateDisplay();
});

countryChoose.addEventListener('change', () => {
  currentPage = 0;
  updateDisplay();
});

searchInput.addEventListener('input', () => {
  currentPage = 0;
  updateDisplay();
});

// =====================
// MODAL
// =====================
eventContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('.more-info-btn');
  if (!btn) return;

  const id = Number(btn.dataset.id);
  const event = currentEvents[id];

  if (!event) return;

  modalTitle.textContent = event.name;
  modalDate.textContent = event.dates.start.localDate;
  modalCity.textContent = event._embedded.venues[0].name;

  backdrop.classList.remove('is-hidden');
});

closeBtn.addEventListener('click', () => {
  backdrop.classList.add('is-hidden');
});

backdrop.addEventListener('click', (e) => {
  if (e.target === backdrop) {
    backdrop.classList.add('is-hidden');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    backdrop.classList.add('is-hidden');
  }
});

// =====================
// INIT
// =====================
updateDisplay();