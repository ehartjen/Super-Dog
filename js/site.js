//this is a comment
let events = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019"
    }
];

//the default display for all events
let filteredEvents = events;

//build a dropdown of specific cities

function buildDropDown() {
    let eventDD = document.getElementById("eventDropDown");
    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;
    //distinct events from the events array
    let distinctEvents = [...new Set(curEvents.map(event => event.city))];

    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All">All</a>';
    let resultHTML = "";

    for (let i = 0; i < distinctEvents.length; i++) {
        resultHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string ="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
    }
    resultHTML += linkHTMLEnd;
    eventDD.innerHTML = resultHTML;
    displayStats();
    displayData();
}
// this will display the stats
function getEvents(element) {
    let city = element.getAttribute("data-string");
    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;
    filteredEvents = curEvents;
    document.getElementById("statsHeader").innerHTML = `stats for ${city} Events`;
    if (city != 'All') {
        filteredEvents = events.filter(function (item) {
            if (item.city == city) {
                return item;
            }

        })
    }
    displayStats();
}



function displayStats() {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let i = 0; i < filteredEvents.length; i++) {
        currentAttendance = filteredEvents[i].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }
        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }
    }
    average = total / filteredEvents.length;

    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString((undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }));

}

function displayData() {
    const template = document.getElementById("eventData-template");
    const eventBody = document.getElementById("eventBody");

    eventBody.innerHTML = "";

    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || [];
    if (curEvents.length == 0) {
        curEvents = events;
        localStorage.setItem("eventsArray", JSON.stringify(curEvents));
    }

    for (let i = 0; i < curEvents.length; i++) {
        const eventRow = document.importNode(template.content, true);
        //grab only the columns in the template
        eventRow.getElementById("event").textContent = curEvents[i].event;
        eventRow.getElementById("city").textContent = curEvents[i].city;
        eventRow.getElementById("state").textContent = curEvents[i].state;
        eventRow.getElementById("attendance").textContent = curEvents[i].attendance;
        eventRow.getElementById("eventDate").textContent = new Date(curEvents[i].date).toLocaleDateString();
        eventBody.appendChild(eventRow);
    }

}

function saveEventData() {
    //grab the events out of local storage
    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;

    //document.getElementById("newEventName");
    let obj = {};
    obj["event"] = document.getElementById("newEventName").value;
    obj["city"] = document.getElementById("newEventCity").value;

    let stateSel = document.getElementById("newEventState");
    obj["state"] = stateSel.options[stateSel.selectedIndex].text
    obj["attendance"] = parseInt(
        document.getElementById("newEventAttendance").value,
        10
    );

    let eventDate = document.getElementById("newEventDate").value;
    let eventDate2 = `${eventDate} 00:00`

    obj["date"] = new Date(eventDate2).toLocaleDateString();

    curEvents.push(obj);

    localStorage.setItem("eventsArray", JSON.stringify(curEvents));
    filteredEvents = curEvents;
    //clear the form
    //Access the values from the form by ID and add an object to the array.
    buildDropDown();
    displayData();
}

function clearData() {
    localStorage.clear();
    window.location.reload();
}