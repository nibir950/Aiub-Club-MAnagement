const currentUser = {
    name: "Asif Sezan",
    email: "member@aiub.edu",
    role: "Member"
};

const clubs = [
    { id: 1, name: "AIUB Computer Club" },
    { id: 2, name: "AIUB Business Club" },
    { id: 3, name: "AIUB Robotics Crew" }
];

const memberships = [
    { id: 101, clubId: 1, joinDate: "2026-09-02", status: "Approved" },
    { id: 102, clubId: 3, joinDate: "2026-09-12", status: "Approved" }
];

let events = [
    {
        id: 1,
        clubId: 1,
        name: "AI & Machine Learning",
        date: "2026-11-22T10:00",
        venue: "Computer Lab 5, Building D",
        description: "Hands-on learning with real-world AI examples."
    },
    {
        id: 2,
        clubId: 3,
        name: "Campus Innovation Fair",
        date: "2026-11-26T11:00",
        venue: "AIUB Multipurpose Hall",
        description: "Explore student projects and new ideas."
    },
    {
        id: 3,
        clubId: 1,
        name: "Web Development Workshop",
        date: "2026-11-29T14:00",
        venue: "Computer Lab 3, Building D",
        description: "Learn basic web development and DOM manipulation."
    }
];

const posts = [
    {
        id: 1,
        clubId: 1,
        title: "Fall 2026 Club Activities",
        content: "Explore this semester's events and activities of the AIUB Computer Club.",
        type: "Announcement",
        visibility: "Public",
        date: "2026-11-17"
    },
    {
        id: 2,
        clubId: 3,
        title: "Campus Innovation Fair",
        content: "Members can explore student projects and new ideas at the innovation fair.",
        type: "Announcement",
        visibility: "Public",
        date: "2026-11-16"
    },
    {
        id: 3,
        clubId: 1,
        title: "Workshop Materials",
        content: "The workshop materials will be shared with Computer Club members.",
        type: "Internal",
        visibility: "Club",
        date: "2026-11-18"
    },
    {
        id: 4,
        clubId: 3,
        title: "Robotics Team Meeting",
        content: "Members can review the preparation notes before the next meeting.",
        type: "Internal",
        visibility: "Club",
        date: "2026-11-18"
    }
];

let selectedClub = "all";
let selectedEventClub = "all";
let selectedPostClub = "all";
let selectedPostFilter = "all";
let editingEventId = null;


function getClubName(id) {
    for (let i = 0; i < clubs.length; i++) {
        if (clubs[i].id === Number(id)) {
            return clubs[i].name;
        }
    }
    return "Unknown Club";
}

function myMemberships() {
    return memberships.filter(function(m) {
        return m.status === "Approved";
    });
}

function isMyClub(id) {
    for (let i = 0; i < myMemberships().length; i++) {
        if (myMemberships()[i].clubId === Number(id)) {
            return true;
        }
    }
    return false;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function getMyEvents(clubId) {
    return events.filter(function(e) {
        return isMyClub(e.clubId) &&
            (clubId === "all" || e.clubId === Number(clubId));
    });
}

function getMyPosts(clubId) {
    return posts.filter(function(p) {
        return isMyClub(p.clubId) &&
            (clubId === "all" || p.clubId === Number(clubId));
    });
}


function showPage(id) {
    document.querySelectorAll(".page").forEach(function(page) {
        page.className = page.id === id ? "page active-page" : "page";
    });

    document.querySelectorAll(".nav-button").forEach(function(button) {
        button.className = button.dataset.page === id
            ? "nav-button active"
            : "nav-button";
    });

    const names = {
        dashboardPage: "Dashboard",
        eventsPage: "Events",
        postsPage: "Posts",
        membershipPage: "My Memberships",
        profilePage: "My Profile"
    };

    document.getElementById("pageName").innerText = names[id];
}

document.querySelectorAll("[data-page]").forEach(function(button) {
    button.addEventListener("click", function() {
        showPage(this.dataset.page);
    });
});


function fillClubSelect(selectId, allOption) {
    const select = document.getElementById(selectId);

    if (allOption) {
        select.innerHTML = '<option value="all">All My Clubs</option>';
    } else {
        select.innerHTML = "";
    }

    clubs.forEach(function(club) {
        if (isMyClub(club.id)) {
            select.innerHTML +=
                '<option value="' + club.id + '">' +
                club.name +
                '</option>';
        }
    });
}

function fillClubSelectors() {
    fillClubSelect("clubSelector", true);
    fillClubSelect("eventClubSelector", true);
    fillClubSelect("postClubSelector", true);
    fillClubSelect("eventFormClub", false);
}


function renderMyClubs() {
    const box = document.getElementById("myClubs");
    box.innerHTML = "";

    myMemberships().forEach(function(m) {
        const name = getClubName(m.clubId);
        const card = document.createElement("button");

        card.className =  Number(selectedClub) === m.clubId? "club-card selected": "club-card";

        card.innerHTML ='<div class="club-icon">' +name.charAt(0) +'</div>' +'<div><strong>' +name +'</strong><span>Member since ' +formatDate(m.joinDate) +'</span></div>';

        card.addEventListener("click", function() {
            selectedClub = String(m.clubId);
            document.getElementById("clubSelector").value = selectedClub;
            document.getElementById("selectedClubName").innerText = name;
            renderDashboard();
        });

        box.appendChild(card);
    });
}

function renderDashboard() {
    const eventList = getMyEvents(selectedClub);
    const postList = getMyPosts(selectedClub);
    const members = myMemberships();

    document.getElementById("eventCount").innerText = eventList.length;
    document.getElementById("membershipCount").innerText = members.length;
    document.getElementById("postCount").innerText = postList.length;

    renderMyClubs();

    const eventBox = document.getElementById("dashboardEvents");
    eventBox.innerHTML = "";

    eventList.slice(0, 3).forEach(function(e) {
        eventBox.appendChild(createEventCard(e));
    });

    document.getElementById("dashboardPosts").innerHTML =
        postList.slice(0, 4).map(function(p) {
            return '<div class="list-item">' +
                '<strong>' + p.title + '</strong>' +
                '<span>' + getClubName(p.clubId) +
                ' - ' + formatDate(p.date) + '</span>' +
                '</div>';
        }).join("");

    document.getElementById("dashboardMemberships").innerHTML = members.map(function(m) {return '<div class="list-item">' +'<strong>' + getClubName(m.clubId) + '</strong>' +'<span>Joined ' + formatDate(m.joinDate) +' - ' + m.status + '</span>' +'</div>';}).join("");
}


function createEventCard(event) {
    const card = document.createElement("div");
    card.className = "event-card";

    const date = new Date(event.date);

    card.innerHTML =
        '<div class="event-top">' +
        '<span class="event-club">' +
        getClubName(event.clubId) +
        '</span>' +
        '<div class="event-date">' +
        '<strong>' + date.getDate() + '</strong>' +
        '<span>' +
        date.toLocaleDateString("en-US", { month: "short" }) +
        '</span>' +
        '</div>' +
        '</div>' +
        '<h3>' + event.name + '</h3>' +
        '<p>Date: ' + formatDate(event.date) + '</p>' +
        '<p>Venue: ' + event.venue + '</p>' +
        '<p>' + event.description + '</p>' +
        '<button class="event-button view-button">View Details</button>' +
        '<button class="edit-button">Edit</button>' +
        '<button class="delete-button">Delete</button>';

    card.querySelector(".view-button").addEventListener("click", function() {
        openEvent(event.id);
    });

    card.querySelector(".edit-button").addEventListener("click", function() {
        editEvent(event.id);
    });

    card.querySelector(".delete-button").addEventListener("click", function() {
        deleteEvent(event.id);
    });

    return card;
}

function renderEvents() {
    const box = document.getElementById("eventsContainer");
    box.innerHTML = "";

    getMyEvents(selectedEventClub).forEach(function(event) {
        box.appendChild(createEventCard(event));
    });

    if (box.innerHTML === "") {
        box.innerHTML = '<p class="empty">No events found.</p>';
    }
}

function openEvent(id) {
    const event = events.find(function(e) {
        return e.id === id;
    });

    if (!event) return;

    document.getElementById("modalName").innerText = event.name;
    document.getElementById("modalClub").innerText = getClubName(event.clubId);
    document.getElementById("modalDate").innerText =
        "Date: " + formatDate(event.date);
    document.getElementById("modalVenue").innerText =
        "Venue: " + event.venue;
    document.getElementById("modalDescription").innerText =
        event.description;

    document.getElementById("eventModal").className = "modal show-modal";
}

document.getElementById("closeModal").addEventListener("click", function() {
    document.getElementById("eventModal").className = "modal";
});

document.getElementById("eventModal").addEventListener("click", function(e) {
    if (e.target.id === "eventModal") {
        document.getElementById("eventModal").className = "modal";
    }
});

//CRUD Events
function clearEventForm() {
    editingEventId = null;

    document.getElementById("eventFormTitle").innerText = "Create Event";
    document.getElementById("saveEventButton").innerText = "Create Event";

    document.getElementById("eventName").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("eventVenue").value = "";
    document.getElementById("eventDescription").value = "";
    document.getElementById("eventMessage").innerText = "";
}

function editEvent(id) {
    const event = events.find(function(e) {
        return e.id === id;
    });

    if (!event) return;

    editingEventId = id;

    document.getElementById("eventFormTitle").innerText = "Update Event";
    document.getElementById("saveEventButton").innerText = "Update Event";

    document.getElementById("eventFormClub").value = event.clubId;
    document.getElementById("eventName").value = event.name;
    document.getElementById("eventDate").value = event.date;
    document.getElementById("eventVenue").value = event.venue;
    document.getElementById("eventDescription").value = event.description;
    document.getElementById("eventMessage").innerText = "Editing event...";

    window.scrollTo(0, 0);
}

function deleteEvent(id) {
    if (!confirm("Do you want to delete this event?")) return;

    events = events.filter(function(event) {
        return event.id !== id;
    });

    renderEvents();
    renderDashboard();

    document.getElementById("eventMessage").innerText =
        "Event deleted successfully.";
}

document.getElementById("saveEventButton").addEventListener("click", function() {
    const name = document.getElementById("eventName").value.trim();
    const clubId = Number(document.getElementById("eventFormClub").value);
    const date = document.getElementById("eventDate").value;
    const venue = document.getElementById("eventVenue").value.trim();
    const description =
        document.getElementById("eventDescription").value.trim();

    if (!name || !date || !venue || !description) {
        document.getElementById("eventMessage").innerText =
            "Please fill in all event fields.";
        return;
    }

    if (editingEventId === null) {
        const newId = events.length
            ? Math.max(...events.map(function(e) { return e.id; })) + 1
            : 1;

        events.push({
            id: newId,
            clubId: clubId,
            name: name,
            date: date,
            venue: venue,
            description: description,
            createdBy: currentUser.name
        });

        document.getElementById("eventMessage").innerText =
            "Event created successfully.";
    } else {
        const event = events.find(function(e) {
            return e.id === editingEventId;
        });

        event.clubId = clubId;
        event.name = name;
        event.date = date;
        event.venue = venue;
        event.description = description;

        document.getElementById("eventMessage").innerText =
            "Event updated successfully.";
    }

    clearEventForm();
    renderEvents();
    renderDashboard();
});

document.getElementById("cancelEventButton").addEventListener("click", clearEventForm);


function renderPosts() {
    const box = document.getElementById("postsContainer");
    let list = getMyPosts(selectedPostClub);

    if (selectedPostFilter !== "all") {
        list = list.filter(function(p) {
            return selectedPostFilter === "public"
                ? p.visibility === "Public"
                : p.visibility === "Club";
        });
    }

    box.innerHTML = list.map(function(p) {
        return '<div class="post-card">' +
            '<span class="badge">' +
            p.type + " - " + p.visibility +
            '</span>' +
            '<h3>' + p.title + '</h3>' +
            '<p>' + p.content + '</p>' +
            '<p class="post-info">' +
            getClubName(p.clubId) +
            ' - ' + formatDate(p.date) +
            '</p>' +
            '</div>';
    }).join("");
}


function renderMemberships() {
    document.getElementById("membershipTable").innerHTML =
        myMemberships().map(function(m) {
            return '<tr>' +
                '<td>' + m.id + '</td>' +
                '<td>' + getClubName(m.clubId) + '</td>' +
                '<td>' + formatDate(m.joinDate) + '</td>' +
                '<td><span class="status">' +
                m.status +
                '</span></td>' +
                '</tr>';
        }).join("");
}

//select clubs
document.getElementById("clubSelector").addEventListener("change", function() {
    selectedClub = this.value;

    document.getElementById("selectedClubName").innerText =
        selectedClub === "all"
            ? "All My Clubs"
            : getClubName(selectedClub);

    renderDashboard();
});

document.getElementById("eventClubSelector").addEventListener("change", function() {
    selectedEventClub = this.value;
    renderEvents();
});

document.getElementById("postClubSelector").addEventListener("change", function() {
    selectedPostClub = this.value;
    renderPosts();
});

document.querySelectorAll(".filter-button").forEach(function(button) {
    button.addEventListener("click", function() {
        document.querySelectorAll(".filter-button").forEach(function(b) {
            b.className = "filter-button";
        });

        this.className = "filter-button active";
        selectedPostFilter = this.dataset.filter;

        renderPosts();
    });
});


//profile
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");

let oldName = currentUser.name;
let oldEmail = currentUser.email;

function profileEditMode(editing) {
    profileName.readOnly = !editing;
    profileEmail.readOnly = !editing;

    document.getElementById("editProfileButton").className =
        editing ? "primary-button hidden" : "primary-button";

    document.getElementById("saveProfileButton").className =
        editing ? "primary-button" : "primary-button hidden";

    document.getElementById("cancelProfileButton").className =
        editing ? "secondary-button" : "secondary-button hidden";
}

document.getElementById("editProfileButton").addEventListener("click", function() {
    oldName = currentUser.name;
    oldEmail = currentUser.email;
    profileEditMode(true);
});

document.getElementById("saveProfileButton").addEventListener("click", function() {
    const name = profileName.value.trim();
    const email = profileEmail.value.trim();

    if (!name || !email) {
        document.getElementById("profileMessage").innerText =
            "Name and email cannot be empty.";
        return;
    }

    currentUser.name = name;
    currentUser.email = email;

    document.getElementById("sideName").innerText = name;
    document.getElementById("sideEmail").innerText = email;
    document.getElementById("sideAvatar").innerText = name.charAt(0);
    document.getElementById("profileAvatar").innerText = name.charAt(0);
    document.getElementById("profileHeading").innerText = name;
    document.getElementById("welcomeName").innerText = name;

    document.getElementById("profileMessage").innerText =
        "Profile updated successfully.";

    profileEditMode(false);
});

document.getElementById("cancelProfileButton").addEventListener("click", function() {
    profileName.value = oldName;
    profileEmail.value = oldEmail;

    document.getElementById("profileMessage").innerText =
        "Changes cancelled.";

    profileEditMode(false);
});


fillClubSelectors();
profileEditMode(false);
renderDashboard();
renderEvents();
renderPosts();
renderMemberships();