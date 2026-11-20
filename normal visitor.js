let clubs = [
    {name: "AIUB Computer Club", category: "Technology"},
    {name: "AIUB Robotics Club", category: "Engineering"},
    {name: "AIUB Business Club", category: "Business"},
    {name: "AIUB Photography Club", category: "Arts"}
];

let events = [
    {name: "Web Development Bootcamp", date: "25 November 2026", venue: "Computer Lab, AIUB"},
    {name: "Campus Robotics Showcase", date: "28 November 2026", venue: "Auditorium, AIUB"},
    {name: "Through Our Lens: Exhibition", date: "2 December 2026", venue: "Campus Gallery, AIUB"}
];

let profiles = [];
let currentProfileId = 0;
let registrations = [];
let feedbacks = [];

let nextProfileId = 1;
let nextRegistrationId = 1;
let nextFeedbackId = 1;

let editingProfileId = 0;
let editingRegistrationId = 0;
let editingFeedbackId = 0;

function getCurrentProfile() {
    let currentProfile = null;

    profiles.forEach(function(profile) {
        if (profile.id == currentProfileId) {
            currentProfile = profile;
        }
    });

    return currentProfile;
}

function updateAccountAccess() {
    let currentProfile = getCurrentProfile();
    let registrationContent = document.getElementById("registrationContent");
    let feedbackContent = document.getElementById("feedbackContent");

    if (currentProfile == null) {
        registrationContent.style.display = "none";
        feedbackContent.style.display = "none";
        document.getElementById("registrationAccessMessage").style.display = "block";
        document.getElementById("feedbackAccessMessage").style.display = "block";
        document.getElementById("currentVisitorStatus").innerText = "No active account";
    } else {
        registrationContent.style.display = "block";
        feedbackContent.style.display = "block";
        document.getElementById("registrationAccessMessage").style.display = "none";
        document.getElementById("feedbackAccessMessage").style.display = "none";
        document.getElementById("currentVisitorStatus").innerText = "Account: " + currentProfile.name;
        document.getElementById("registrationName").value = currentProfile.name;
        document.getElementById("feedbackName").value = currentProfile.name;
        document.getElementById("registrationName").readOnly = true;
        document.getElementById("feedbackName").readOnly = true;
    }
}

function updateCounts() {
    let myRegistrationCount = 0;
    let myFeedbackCount = 0;

    registrations.forEach(function(item) {
        if (item.profileId == currentProfileId) {
            myRegistrationCount = myRegistrationCount + 1;
        }
    });

    feedbacks.forEach(function(item) {
        if (item.profileId == currentProfileId) {
            myFeedbackCount = myFeedbackCount + 1;
        }
    });

    document.getElementById("clubCount").innerText = clubs.length;
    document.getElementById("eventCount").innerText = events.length;
    document.getElementById("registrationCount").innerText = myRegistrationCount;
    document.getElementById("feedbackCount").innerText = myFeedbackCount;
}

function showClubs() {
    let table = document.createElement("table");
    let header = document.createElement("tr");
    let nameHeading = document.createElement("th");
    let categoryHeading = document.createElement("th");

    nameHeading.innerText = "Club Name";
    categoryHeading.innerText = "Category";

    header.appendChild(nameHeading);
    header.appendChild(categoryHeading);
    table.appendChild(header);

    clubs.forEach(function(club) {
        let row = document.createElement("tr");
        let nameCell = document.createElement("td");
        let categoryCell = document.createElement("td");

        nameCell.innerText = club.name;
        categoryCell.innerText = club.category;

        row.appendChild(nameCell);
        row.appendChild(categoryCell);
        table.appendChild(row);
    });

    let list = document.getElementById("clubList");
    list.innerHTML = "";
    list.appendChild(table);
    updateCounts();
}

function showEvents() {
    let table = document.createElement("table");
    let header = document.createElement("tr");
    let nameHeading = document.createElement("th");
    let dateHeading = document.createElement("th");
    let venueHeading = document.createElement("th");

    nameHeading.innerText = "Event Name";
    dateHeading.innerText = "Date";
    venueHeading.innerText = "Venue";

    header.appendChild(nameHeading);
    header.appendChild(dateHeading);
    header.appendChild(venueHeading);
    table.appendChild(header);

    events.forEach(function(item) {
        let row = document.createElement("tr");
        let nameCell = document.createElement("td");
        let dateCell = document.createElement("td");
        let venueCell = document.createElement("td");

        nameCell.innerText = item.name;
        dateCell.innerText = item.date;
        venueCell.innerText = item.venue;

        row.appendChild(nameCell);
        row.appendChild(dateCell);
        row.appendChild(venueCell);
        table.appendChild(row);
    });

    let list = document.getElementById("eventList");
    list.innerHTML = "";
    list.appendChild(table);
    updateCounts();
}

function showProfiles() {
    let table = document.createElement("table");
    let header = document.createElement("tr");
    let nameHeading = document.createElement("th");
    let idHeading = document.createElement("th");
    let emailHeading = document.createElement("th");
    let actionHeading = document.createElement("th");

    nameHeading.innerText = "Name";
    idHeading.innerText = "Student ID";
    emailHeading.innerText = "Email";
    actionHeading.innerText = "Action";

    header.appendChild(nameHeading);
    header.appendChild(idHeading);
    header.appendChild(emailHeading);
    header.appendChild(actionHeading);
    table.appendChild(header);

    profiles.forEach(function(profile) {
        let row = document.createElement("tr");
        let nameCell = document.createElement("td");
        let idCell = document.createElement("td");
        let emailCell = document.createElement("td");
        let actionCell = document.createElement("td");

        nameCell.innerText = profile.name;
        idCell.innerText = profile.studentId;
        emailCell.innerText = profile.email;
        actionCell.innerHTML = '<button onclick="editProfile(' + profile.id + ')">Edit</button> <button onclick="deleteProfile(' + profile.id + ')">Delete</button>';
        row.appendChild(nameCell);
        row.appendChild(idCell);
        row.appendChild(emailCell);
        row.appendChild(actionCell);
        table.appendChild(row);
    });

    let list = document.getElementById("profileList");
    list.innerHTML = "";
    list.appendChild(table);
    updateCounts();
}

function saveProfile() {
    let name = document.getElementById("profileName").value;
    let studentId = document.getElementById("profileStudentId").value;
    let email = document.getElementById("profileEmail").value;

    if (name == "" || studentId == "" || email == "") {
        document.getElementById("profileMessage").innerText = "Please fill in all fields.";
        return;
    }

    if (!/^[0-9]{2}-[0-9]{5}-[0-9]$/.test(studentId)) {
        document.getElementById("profileMessage").innerText = "Student ID must be like 23-50489-1.";
        return;
    }

    if (editingProfileId == 0) {
        let profile = {
            id: nextProfileId,
            name: name,
            studentId: studentId,
            email: email
        };

        profiles[profiles.length] = profile;
        currentProfileId = profile.id;
        nextProfileId = nextProfileId + 1;
        document.getElementById("profileMessage").innerText = "Profile added.";
    } else {
        profiles.forEach(function(profile) {
            if (profile.id == editingProfileId) {
                profile.name = name;
                profile.studentId = studentId;
                profile.email = email;
            }
        });
        document.getElementById("profileMessage").innerText = "Profile updated.";
    }

    clearProfileForm();
    showProfiles();
    updateAccountAccess();
}

function editProfile(id) {
    profiles.forEach(function(profile) {
        if (profile.id == id) {
            document.getElementById("profileName").value = profile.name;
            document.getElementById("profileStudentId").value = profile.studentId;
            document.getElementById("profileEmail").value = profile.email;
        }
    });

    editingProfileId = id;
    document.getElementById("profileButton").value = "Update Profile";
    document.getElementById("profileMessage").innerText = "Edit the information and click Update Profile.";
}

function deleteProfile(id) {
    let newProfiles = [];

    profiles.forEach(function(profile) {
        if (profile.id != id) {
            newProfiles[newProfiles.length] = profile;
        }
    });

    profiles = newProfiles;

    if (id == currentProfileId) {
        currentProfileId = 0;
    }

    clearProfileForm();
    showProfiles();
    updateAccountAccess();
    document.getElementById("profileMessage").innerText = "Profile deleted.";
}

function clearProfileForm() {
    document.getElementById("profileName").value = "";
    document.getElementById("profileStudentId").value = "";
    document.getElementById("profileEmail").value = "";
    document.getElementById("profileButton").value = "Add Profile";
    editingProfileId = 0;
}

function showRegistrations() {
    let table = document.createElement("table");
    let header = document.createElement("tr");
    let nameHeading = document.createElement("th");
    let eventHeading = document.createElement("th");
    let phoneHeading = document.createElement("th");
    let actionHeading = document.createElement("th");

    nameHeading.innerText = "Visitor Name";
    eventHeading.innerText = "Event";
    phoneHeading.innerText = "Contact Number";
    actionHeading.innerText = "Action";

    header.appendChild(nameHeading);
    header.appendChild(eventHeading);
    header.appendChild(phoneHeading);
    header.appendChild(actionHeading);
    table.appendChild(header);

    registrations.forEach(function(item) {
        if (item.profileId == currentProfileId) {
            let row = document.createElement("tr");
            let nameCell = document.createElement("td");
            let eventCell = document.createElement("td");
            let phoneCell = document.createElement("td");
            let actionCell = document.createElement("td");

            nameCell.innerText = item.name;
            eventCell.innerText = item.event;
            phoneCell.innerText = item.phone;
            actionCell.innerHTML = '<button onclick="editRegistration(' + item.id + ')">Edit</button> <button onclick="deleteRegistration(' + item.id + ')">Delete</button>';
            row.appendChild(nameCell);
            row.appendChild(eventCell);
            row.appendChild(phoneCell);
            row.appendChild(actionCell);
            table.appendChild(row);
        }
    });

    let list = document.getElementById("registrationList");
    list.innerHTML = "";
    list.appendChild(table);
    updateCounts();
}

function saveRegistration() {
    let currentProfile = getCurrentProfile();

    if (currentProfile == null) {
        document.getElementById("registrationMessage").innerText = "Create a visitor profile first.";
        updateAccountAccess();
        return;
    }

    let name = currentProfile.name;
    let event = document.getElementById("registrationEvent").value;
    let phone = document.getElementById("registrationPhone").value;

    if (name == "" || event == "" || phone == "") {
        document.getElementById("registrationMessage").innerText = "Please fill in all fields.";
        return;
    }

    if (editingRegistrationId == 0) {
        let registration = {
            id: nextRegistrationId,
            name: name,
            event: event,
            phone: phone,
            profileId: currentProfileId
        };

        registrations[registrations.length] = registration;
        nextRegistrationId = nextRegistrationId + 1;
        document.getElementById("registrationMessage").innerText = "Registration added.";
    } else {
        registrations.forEach(function(item) {
            if (item.id == editingRegistrationId && item.profileId == currentProfileId) {
                item.name = name;
                item.event = event;
                item.phone = phone;
            }
        });
        document.getElementById("registrationMessage").innerText = "Registration updated.";
    }

    clearRegistrationForm();
    showRegistrations();
    updateAccountAccess();
}

function editRegistration(id) {
    if (getCurrentProfile() == null) {
        return;
    }

    registrations.forEach(function(item) {
        if (item.id == id && item.profileId == currentProfileId) {
            document.getElementById("registrationName").value = item.name;
            document.getElementById("registrationEvent").value = item.event;
            document.getElementById("registrationPhone").value = item.phone;
        }
    });

    editingRegistrationId = id;
    document.getElementById("registrationButton").value = "Update Registration";
    document.getElementById("registrationMessage").innerText = "Edit the information and click Update Registration.";
}

function deleteRegistration(id) {
    if (getCurrentProfile() == null) {
        return;
    }

    let newRegistrations = [];

    registrations.forEach(function(item) {
        if (item.id != id || item.profileId != currentProfileId) {
            newRegistrations[newRegistrations.length] = item;
        }
    });

    registrations = newRegistrations;
    clearRegistrationForm();
    showRegistrations();
    updateAccountAccess();
    document.getElementById("registrationMessage").innerText = "Registration deleted.";
}

function clearRegistrationForm() {
    document.getElementById("registrationName").value = "";
    document.getElementById("registrationEvent").value = "";
    document.getElementById("registrationPhone").value = "";
    document.getElementById("registrationButton").value = "Register";
    editingRegistrationId = 0;
}

function showFeedbacks() {
    let table = document.createElement("table");
    let header = document.createElement("tr");
    let nameHeading = document.createElement("th");
    let subjectHeading = document.createElement("th");
    let textHeading = document.createElement("th");
    let actionHeading = document.createElement("th");

    nameHeading.innerText = "Name";
    subjectHeading.innerText = "Subject";
    textHeading.innerText = "Message";
    actionHeading.innerText = "Action";

    header.appendChild(nameHeading);
    header.appendChild(subjectHeading);
    header.appendChild(textHeading);
    header.appendChild(actionHeading);
    table.appendChild(header);

    feedbacks.forEach(function(item) {
        if (item.profileId == currentProfileId) {
            let row = document.createElement("tr");
            let nameCell = document.createElement("td");
            let subjectCell = document.createElement("td");
            let textCell = document.createElement("td");
            let actionCell = document.createElement("td");

            nameCell.innerText = item.name;
            subjectCell.innerText = item.subject;
            textCell.innerText = item.text;
            actionCell.innerHTML = '<button onclick="editFeedback(' + item.id + ')">Edit</button> <button onclick="deleteFeedback(' + item.id + ')">Delete</button>';
            row.appendChild(nameCell);
            row.appendChild(subjectCell);
            row.appendChild(textCell);
            row.appendChild(actionCell);
            table.appendChild(row);
        }
    });

    let list = document.getElementById("feedbackList");
    list.innerHTML = "";
    list.appendChild(table);
    updateCounts();
}

function saveFeedback() {
    let currentProfile = getCurrentProfile();

    if (currentProfile == null) {
        document.getElementById("feedbackMessage").innerText = "Create a visitor profile first.";
        updateAccountAccess();
        return;
    }

    let name = currentProfile.name;
    let subject = document.getElementById("feedbackSubject").value;
    let text = document.getElementById("feedbackText").value;

    if (name == "" || subject == "" || text == "") {
        document.getElementById("feedbackMessage").innerText = "Please fill in all fields.";
        return;
    }

    if (editingFeedbackId == 0) {
        let feedback = {
            id: nextFeedbackId,
            name: name,
            subject: subject,
            text: text,
            profileId: currentProfileId
        };

        feedbacks[feedbacks.length] = feedback;
        nextFeedbackId = nextFeedbackId + 1;
        document.getElementById("feedbackMessage").innerText = "Feedback submitted.";
    } else {
        feedbacks.forEach(function(item) {
            if (item.id == editingFeedbackId && item.profileId == currentProfileId) {
                item.name = name;
                item.subject = subject;
                item.text = text;
            }
        });
        document.getElementById("feedbackMessage").innerText = "Feedback updated.";
    }

    clearFeedbackForm();
    showFeedbacks();
    updateAccountAccess();
}

function editFeedback(id) {
    if (getCurrentProfile() == null) {
        return;
    }

    feedbacks.forEach(function(item) {
        if (item.id == id && item.profileId == currentProfileId) {
            document.getElementById("feedbackName").value = item.name;
            document.getElementById("feedbackSubject").value = item.subject;
            document.getElementById("feedbackText").value = item.text;
        }
    });

    editingFeedbackId = id;
    document.getElementById("feedbackButton").value = "Update Feedback";
    document.getElementById("feedbackMessage").innerText = "Edit the information and click Update Feedback.";
}

function deleteFeedback(id) {
    if (getCurrentProfile() == null) {
        return;
    }

    let newFeedbacks = [];

    feedbacks.forEach(function(item) {
        if (item.id != id || item.profileId != currentProfileId) {
            newFeedbacks[newFeedbacks.length] = item;
        }
    });

    feedbacks = newFeedbacks;
    clearFeedbackForm();
    showFeedbacks();
    updateAccountAccess();
    document.getElementById("feedbackMessage").innerText = "Feedback deleted.";
}

function clearFeedbackForm() {
    document.getElementById("feedbackName").value = "";
    document.getElementById("feedbackSubject").value = "";
    document.getElementById("feedbackText").value = "";
    document.getElementById("feedbackButton").value = "Submit Feedback";
    editingFeedbackId = 0;
}

showClubs();
showEvents();
showProfiles();
showRegistrations();
showFeedbacks();
updateAccountAccess();
