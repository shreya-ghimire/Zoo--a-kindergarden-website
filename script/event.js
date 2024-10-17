const events = JSON.parse(localStorage.getItem("events"));
function displayEvents(events) {
    const eventsContainer = document.querySelector('.event-details');
    eventsContainer.innerHTML="";
    
    if (!eventsContainer) return;  
    events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        console.log(event.date);
       console.log(typeof(event.date));
        let [year, month, day] = event.date.split('-');
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      
        let formattedDate = `
          <p>${parseInt(day, 10)}</p>
          <p>${months[parseInt(month, 10) - 1]}</p>
          <p>${year}</p>
        `;

        const eventDateDiv = document.createElement('div');
        eventDateDiv.classList.add('event-date');
        eventDateDiv.innerHTML = `<p>${formattedDate}</p>`;

        const eventContentDiv = document.createElement('div');
        eventContentDiv.classList.add('event-content');

        const eventLink = document.createElement('a');
        eventLink.className = "event_link";


      

        eventLink.innerHTML = `<h3>${event.title}</h3>`;
        eventLink.href = "event-content.html"; 
        const eventDesc = document.createElement('p');
        eventDesc.textContent = event.description;

        const tagsDiv = document.createElement('div');
        tagsDiv.classList.add('tags');
        event.tags.split(',').forEach(tag => {
            const tagDiv = document.createElement('div');
            tagDiv.classList.add('tag');
            tagDiv.textContent = tag.trim(); 
            tagsDiv.appendChild(tagDiv);
        });
        

        eventContentDiv.appendChild(eventLink);
        eventContentDiv.appendChild(eventDesc);
        eventContentDiv.appendChild(tagsDiv);

        eventDiv.appendChild(eventDateDiv);
        eventDiv.appendChild(eventContentDiv);

        eventsContainer.appendChild(eventDiv);

        eventLink.addEventListener("click", function() {
            localStorage.setItem("current_event", event.id); 
        });
    });
}


function eventContent(events){   
    function renderEventDescription() {
        const events = JSON.parse(localStorage.getItem("events")); 
        const eventContent = document.getElementById("content-detail"); 
    
        if (!eventContent || !events) return; 
    
        const eventId = parseInt(localStorage.getItem("current_event")); 
    
        try {
    
            const selectedEvent = events.find(event => event.id === eventId);
    
            if (selectedEvent) {
                console.log(selectedEvent.title); 

                setInterval(()=>{
                    showTimer(selectedEvent.date);
                },1000);
              
                const eventTitle = document.createElement("h1");
                eventTitle.className = "event-title";
                eventTitle.innerHTML = `${selectedEvent.title}`;
                eventContent.appendChild(eventTitle);
                const p = document.createElement("p");
                p.className = "event-description";
                p.innerHTML = selectedEvent.detailDescription; 
                eventContent.appendChild(p);   
            } else {
                console.error("Event not found.");
            }
        } catch (error) {
            console.error("Error rendering event description:", error);
        }
    } 
    const currentId = parseInt(localStorage.getItem("current_event"));


const registrationForm = document.querySelector(".registration-form");


registrationForm.addEventListener("submit", function(event) {
    event.preventDefault(); 

   
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const tickets = document.getElementById("tickets").value;

 
    const registrationDetails = {
        name: name,
        email: email,
        phone: phone,
        tickets: tickets,
        eventId: currentId 
    };

    const existingRegistrations = JSON.parse(localStorage.getItem("registrations")) || [];


    existingRegistrations.push(registrationDetails);

    localStorage.setItem("registrations", JSON.stringify(existingRegistrations));


    registrationForm.reset();
    

    alert("Registration successful!");



    
});
    
   
    
    renderEventDescription();
}

function showTimer(date){
    console.log(typeof(date));

    const dateNow=new Date();
    console.log(dateNow);
    const eventDate=new Date(`${date}`);
    timeDiff=eventDate-dateNow;
    if(timeDiff<0){
        const timerDiv=document.querySelector(".timer");
        timerDiv.innerHTML=`
        <div class="timer-container">Expired</div>
    
    `;

    }else{
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
        const timerDiv=document.querySelector(".timer");
        timerDiv.innerHTML=`
            <div class="timer-container">${days}</div>
            <div class="timer-container">${hours}</div>
            <div class="timer-container">${minutes}</div>
            <div class="timer-container">${seconds}</div>
        `;

    }
   




}

function eventPage(events){
    defaultPage(events);
    const apply=document.getElementById("apply-filter");
    const reset=document.getElementById("reset-filter");

    apply.addEventListener('click', function() {
        const month = document.getElementById('month').value;
        const eventType = document.getElementById('event-type').value;
        const ageGroup = document.getElementById('age-group').value;
    

        const checkedTags = Array.from(document.querySelectorAll('.custom-checkbox:checked')).map(cb => cb.value);
    
        const filteredEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            const eventMonth = eventDate.toLocaleString('default', { month: 'long' }).toLowerCase();
    
    
            const eventTags = event.tags.split(',').map(tag => tag.trim().toLowerCase());
    
            const matchesMonth = month === "all" || eventMonth === month;
            const matchesEventType = eventType === "all" || event.eventType.toLowerCase() === eventType;
            const matchesAgeGroup = ageGroup === "all" || event.ageGroup === ageGroup;
            

            const matchesTags = checkedTags.length === 0 || checkedTags.every(tag => eventTags.includes(tag.toLowerCase()));
    
            return matchesMonth && matchesEventType && matchesAgeGroup && matchesTags;
        });
    
        displayEvents(filteredEvents);
    });
    
reset.addEventListener('click', function() {
    defaultPage(events);
});
 function defaultPage(events){
    document.getElementById('month').value = "All";
    document.getElementById('event-type').value = "all";
    document.getElementById('age-group').value = "all";
    const checkboxes = document.querySelectorAll('.custom-checkbox');
    checkboxes.forEach(cb => cb.checked = false);

    displayEvents(events);
 }
}


if (window.location.pathname.includes("event-content.html")) {
    console.log("this page");
   eventContent(events);
} else if (window.location.pathname.includes("events.html")) {
    console.log("this is event page");
    eventPage(events);
} 
