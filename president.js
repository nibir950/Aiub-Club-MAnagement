
let pendingMembers = [];

let pendingRows = document.querySelectorAll(
    "#pendingRequestsTable tbody tr"
);

for (let i = 0; i < pendingRows.length; i++) {
    let cells = pendingRows[i].querySelectorAll("td");

    pendingMembers.push({
        name: cells[0].innerText,
        studentId: cells[1].innerText,
        email: cells[2].innerText,
        date: cells[3].innerText
    });
}

let approvedMembers = [];
let recruitmentNotices = [];

let noticeRows = document.querySelectorAll(
    "#recruitmentList .recruitment-notice"
);

for (let i = 0; i < noticeRows.length; i++) {

    let title = noticeRows[i].querySelector("h3").innerText;

    let paragraphs = noticeRows[i].querySelectorAll("p");

    let description = paragraphs[0].innerText;
    let deadline = paragraphs[1].innerText;
    let applyDetails = paragraphs[2].innerText;

    recruitmentNotices.push({
        title: title,
        description: description,
        deadline: deadline,
        applyDetails: applyDetails
    });
}

let clubEvents = [];

let eventRows = document.querySelectorAll("#eventList li");

for (let i = 0; i < eventRows.length; i++) {
    clubEvents.push({
        title: eventRows[i].innerText,
        description: "",
        date: "",
        location: ""
    });
}

let publicPosts = [];

function updateCounts() {

    let card1 = document.querySelector("#card1 .Number");
    let card2 = document.querySelector("#card2 .Number");
    let card3 = document.querySelector("#card3 .Number");
    let card4 = document.querySelector("#card4 .Number");

    if (card1) {
        card1.innerText = 150 + approvedMembers.length;
    }

    if (card2) {
        card2.innerText = recruitmentNotices.length;
    }

    if (card3) {
        card3.innerText = 10 + publicPosts.length;
    }

    if (card4) {
        card4.innerText = clubEvents.length;
    }
}

function showPendingMembers() {

    let tbody = document.querySelector(
        "#pendingRequestsTable tbody"
    );

    if (!tbody) return;

    tbody.innerHTML = "";

    for (let i = 0; i < pendingMembers.length; i++) {

        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.innerText = pendingMembers[i].name;

        let idCell = document.createElement("td");
        idCell.innerText = pendingMembers[i].studentId;

        let emailCell = document.createElement("td");
        emailCell.innerText = pendingMembers[i].email;

        let dateCell = document.createElement("td");
        dateCell.innerText = pendingMembers[i].date;

        let actionCell = document.createElement("td");

        let approveButton = document.createElement("button");
        approveButton.innerText = "Approve";
        approveButton.className = "approve_btn";
        approveButton.setAttribute("data-index", i);

        let rejectButton = document.createElement("button");
        rejectButton.innerText = "Reject";
        rejectButton.className = "reject_btn";
        rejectButton.setAttribute("data-index", i);

        actionCell.appendChild(approveButton);
        actionCell.appendChild(rejectButton);

        row.appendChild(nameCell);
        row.appendChild(idCell);
        row.appendChild(emailCell);
        row.appendChild(dateCell);
        row.appendChild(actionCell);

        tbody.appendChild(row);
    }
}


function showApprovedMembers() {

    let tbody = document.querySelector(
        "#membersTable tbody"
    );

    if (!tbody) return;

    tbody.innerHTML = "";

    for (let i = 0; i < approvedMembers.length; i++) {

        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.innerText = approvedMembers[i].name;

        let idCell = document.createElement("td");
        idCell.innerText = approvedMembers[i].studentId;

        let emailCell = document.createElement("td");
        emailCell.innerText = approvedMembers[i].email;

        let actionCell = document.createElement("td");

        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete_btn";
        deleteButton.setAttribute("data-index", i);

        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(idCell);
        row.appendChild(emailCell);
        row.appendChild(actionCell);

        tbody.appendChild(row);
    }
}



let pendingTable = document.getElementById(
    "pendingRequestsTable"
);

if (pendingTable) {

    pendingTable.addEventListener("click", function(event) {

        let index = event.target.getAttribute("data-index");

        if (index === null) return;

        index = Number(index);

       
        if (event.target.classList.contains("approve_btn")) {

            approvedMembers.push(pendingMembers[index]);

            pendingMembers.splice(index, 1);

            showPendingMembers();
            showApprovedMembers();
            updateCounts();

            alert("Member Approved Successfully!");
        }


        
        else if (event.target.classList.contains("reject_btn")) {

            pendingMembers.splice(index, 1);

            showPendingMembers();

            alert("Member Rejected!");
        }

    });
}




let membersTable = document.getElementById("membersTable");

if (membersTable) {

    membersTable.addEventListener("click", function(event) {

        let index = event.target.getAttribute("data-index");

        if (event.target.classList.contains("delete_btn") && index !== null) {

            index = Number(index);

            approvedMembers.splice(index, 1);

            showApprovedMembers();
            updateCounts();

            alert("Member Deleted Successfully!");
        }

    });
}



let recruitmentForm = document.getElementById(
    "recruitmentForm"
);

if (recruitmentForm) {

    recruitmentForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let title = document.getElementById("noticeTitle").value;
        let description = document.getElementById("noticeDescription").value;
        let deadline = document.getElementById("deadline").value;
        let applyDetails = document.getElementById("applydetails").value;

        if (title === "" || description === "" || deadline === "") {
            alert("Please fill all required fields!");
            return;
        }

        let notice = {
            title: title,
            description: description,
            deadline: deadline,
            applyDetails: applyDetails
        };

        recruitmentNotices.push(notice);

        recruitmentForm.reset();

        showRecruitmentNotices();
        updateCounts();

        alert("Recruitment Notice Published Successfully!");

    });
}




function showRecruitmentNotices() {

    let list = document.getElementById("recruitmentList");

    if (!list) return;

    list.innerHTML = "";

    for (let i = 0; i < recruitmentNotices.length; i++) {

        let noticeDiv = document.createElement("div");
        noticeDiv.className = "recruitment-notice";

        let heading = document.createElement("h3");
        heading.innerText = recruitmentNotices[i].title;

        let description = document.createElement("p");
        description.innerText = recruitmentNotices[i].description;

        let deadline = document.createElement("p");
        deadline.innerText = "Deadline: " + recruitmentNotices[i].deadline;

        let applyDetails = document.createElement("p");
        applyDetails.innerText = recruitmentNotices[i].applyDetails;

        noticeDiv.appendChild(heading);
        noticeDiv.appendChild(description);
        noticeDiv.appendChild(deadline);
        noticeDiv.appendChild(applyDetails);

        list.appendChild(noticeDiv);
    }
}




let eventForm = document.getElementById("eventForm");

if (eventForm) {

    eventForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let title = document.getElementById("eventTitle").value;
        let description = document.getElementById("eventDescription").value;
        let date = document.getElementById("eventDate").value;
        let location = document.getElementById("eventLocation").value;

        if (title === "" || date === "") {
            alert("Please enter Event Title and Date!");
            return;
        }

        let newEvent = {
            title: title,
            description: description,
            date: date,
            location: location
        };

        clubEvents.push(newEvent);

        eventForm.reset();

        showEvents();
        updateCounts();

        alert("Event Added Successfully!");

    });
}



function showEvents() {

    let list = document.getElementById("eventList");

    if (!list) return;

    list.innerHTML = "";

    for (let i = 0; i < clubEvents.length; i++) {

        let li = document.createElement("li");

        li.innerText =
            clubEvents[i].title +
            " - " +
            clubEvents[i].date +
            " - " +
            clubEvents[i].location;

        list.appendChild(li);
    }
}




let postForm = document.getElementById("postForm");

if (postForm) {

    postForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let title = document.getElementById("postTitle").value;
        let content = document.getElementById("postContent").value;

        if (title === "" || content === "") {
            alert("Please fill all fields!");
            return;
        }

        let date = new Date().toLocaleDateString();

        let post = {
            title: title,
            content: content,
            date: date
        };

        publicPosts.push(post);

        postForm.reset();

        showPublicPosts();
        updateCounts();

        alert("Post Published Successfully!");

    });
}




function showPublicPosts() {

    let list = document.getElementById("publicPostsList");

    if (!list) return;

    list.innerHTML = "";

    for (let i = 0; i < publicPosts.length; i++) {

        let div = document.createElement("div");

        let heading = document.createElement("h3");
        heading.innerText = publicPosts[i].title;

        let paragraph = document.createElement("p");
        paragraph.innerText = publicPosts[i].content;

        let date = document.createElement("small");
        date.innerText = "Published Date: " + publicPosts[i].date;

        div.appendChild(heading);
        div.appendChild(paragraph);
        div.appendChild(date);

        list.appendChild(div);
    }
}




let quickActions = document.querySelectorAll(
    ".publishpostcard"
);

for (let i = 0; i < quickActions.length; i++) {

    quickActions[i].addEventListener("click", function() {

        let targetId = this.getAttribute("data-target");

        let targetSection = document.getElementById(targetId);

        if (targetSection) {

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });
}
let logoutButton = document.getElementById("logout");

if (logoutButton) {

    logoutButton.addEventListener("click", function() {

        window.location.href = "login.html";

    });

}

showPendingMembers();

showApprovedMembers();

showRecruitmentNotices();

showEvents();

showPublicPosts();

updateCounts();


