const url = fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=vL6iA0hJeGlr3bPSJRzPoFqDQiqSCxqV');
const template = fetch('./template.hbs');
const compileTemplate = Handlebars.compile(template);


function renderEvent(){
    const eventConatiner = document.querySelector('.event-container');
    
}