const pagination = document.querySelector('.pagination')
const form = document.querySelector('#search-form');
const searchInput = document.querySelector('.search-input');
const countryChoose = document.querySelector('#choose-country');
const eventConatiner = document.querySelector('.event-container');

let currentPage = 0;
const limit = 20;


const url = fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=vL6iA0hJeGlr3bPSJRzPoFqDQiqSCxqV');
const template = fetch('./template.hbs');
const compileTemplate = Handlebars.compile(template);



form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const currentCountry = countryChoose.value;
    const name = searchInput.value;
    currentPage = 0;
});

countryChoose.addEventListener('change', ()=>{
    const currentCountry = countryChoose.value;
    currentPage = 0;
});


function renderPagination(){
    let buttons = '';
    
}




function renderEvent(){
    
}