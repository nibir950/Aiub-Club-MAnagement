
let pendingMembers = [];

let approvedMembers = [];
let recruitmentNotices = [];

let clubEvents = [];
let publicPosts = [];


let announcements = [];


let editMemberIndex = -1;

let editNoticeIndex = -1;
let editEventIndex = -1;



let editPostIndex = -1;


let editAnnouncementIndex = -1;


let pendingRows = document.querySelectorAll("#pendingRequestsTable tbody tr");

for (let i = 0; i < pendingRows.length; i++)
    
    {

    let cells = pendingRows[i].querySelectorAll("td");

    pendingMembers.push({
         
        name: cells[0].innerText,

        studentId: cells[1].innerText,
        email: cells[2].innerText,
        date: cells[3].innerText
    });
}


let noticeRows = document.querySelectorAll("#recruitmentList .recruitment-notice");

for (let i = 0; i < noticeRows.length; i++)
    
    {

    let paragraphs = noticeRows[i].querySelectorAll("p");

    recruitmentNotices.push({
        title: noticeRows[i].querySelector("h3").innerText,
        description: paragraphs[0].innerText,
       
        deadline: convertToDate(paragraphs[1].innerText.replace("Deadline: ", "")),
        applyDetails: ""
    });
}


let eventRows = document.querySelectorAll("#eventList li");

for (let i = 0; i < eventRows.length; i++) 
    
    {

    clubEvents.push(
        
        
        {
        title: eventRows[i].innerText,
        description: "",
        date: "",
        location: ""
    });
}


function convertToDate(dateText) 
{

    let date = new Date(dateText);

    if (isNaN(date.getTime())) 
        {
        return "";

    }

    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
}


function updateCounts() 

{

    document.querySelector("#card1 .Number").innerText =
        150 + approvedMembers.length;

    document.querySelector("#card2 .Number").innerText =
        recruitmentNotices.length;

    document.querySelector("#card3 .Number").innerText =
        10 + publicPosts.length;

    document.querySelector("#card4 .Number").innerText =
        clubEvents.length;
}


function createButton(text, className, index)

{

    let button = document.createElement("button");

    button.type = "button";
    button.innerText = text;
    button.className = className;
    button.setAttribute("data-index", index);

    return button;
}


function createContentCard(item, index, editClass, deleteClass, details)

{

    let div = document.createElement("div");

    let heading = document.createElement("h3");
    heading.innerText = item.title;

    let paragraph = document.createElement("p");
    paragraph.innerText = item.description || "";

    let date = document.createElement("small");
    date.innerText = details || "";

    let editButton = createButton("Edit", editClass, index);
    let deleteButton = createButton("Delete", deleteClass, index);

    div.appendChild(heading);
    div.appendChild(paragraph);
    div.appendChild(date);
    div.appendChild(editButton);
    div.appendChild(deleteButton);

    return div;
}


function showPendingMembers()

{

    let tbody = document.querySelector("#pendingRequestsTable tbody");

    tbody.innerHTML = "";

    for (let i = 0; i < pendingMembers.length; i++) 
        
        {

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

        let approveButton = createButton("Approve", "approve_btn", i);
        let rejectButton = createButton("Reject", "reject_btn", i);

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


function showApprovedMembers()

{

    let tbody = document.querySelector("#membersTable tbody");

    tbody.innerHTML = "";

    for (let i = 0; i < approvedMembers.length; i++) 
        {

        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.innerText = approvedMembers[i].name;

        let idCell = document.createElement("td");
        idCell.innerText = approvedMembers[i].studentId;

        let emailCell = document.createElement("td");
        emailCell.innerText = approvedMembers[i].email;

        let actionCell = document.createElement("td");

        let editButton = createButton("Edit", "edit_member_btn", i);
        let deleteButton = createButton("Delete", "delete_member_btn", i);

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(idCell);
        row.appendChild(emailCell);
        row.appendChild(actionCell);

        tbody.appendChild(row);
    }
}


let pendingTable = document.getElementById("pendingRequestsTable");

pendingTable.addEventListener("click", function(event) 



{

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

    } else if (event.target.classList.contains("reject_btn")) {

        pendingMembers.splice(index, 1);

        showPendingMembers();

        alert("Membership Request Rejected!");
    }

});


let memberForm = document.getElementById("memberForm");

memberForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("memberName").value;
    let studentId = document.getElementById("memberId").value;
    let email = document.getElementById("memberEmail").value;

    let member = {
        name: name,
        studentId: studentId,
        email: email
    };

    if (editMemberIndex === -1) {

        approvedMembers.push(member);

        alert("Member Added Successfully!");

    } else {

        approvedMembers[editMemberIndex] = member;

        editMemberIndex = -1;

        document.getElementById("memberSubmit").innerText = "Add Member";

        alert("Member Updated Successfully!");
    }

    memberForm.reset();

    showApprovedMembers();
    updateCounts();

});


let membersTable = document.getElementById("membersTable");

membersTable.addEventListener("click", function(event) {

    let index = event.target.getAttribute("data-index");

    if (index === null) return;

    index = Number(index);

    if (event.target.classList.contains("edit_member_btn")) {

        editMemberIndex = index;

        document.getElementById("memberName").value =
            approvedMembers[index].name;

        document.getElementById("memberId").value =
            approvedMembers[index].studentId;

        document.getElementById("memberEmail").value =
            approvedMembers[index].email;

        document.getElementById("memberSubmit").innerText = "Update Member";

        memberForm.scrollIntoView({
            behavior: "smooth"
        });

    } else if (event.target.classList.contains("delete_member_btn")) {

        approvedMembers.splice(index, 1);

        showApprovedMembers();
        updateCounts();

        alert("Member Removed Successfully!");
    }

});


let recruitmentForm = document.getElementById("recruitmentForm");

recruitmentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let title = document.getElementById("noticeTitle").value;
    let description = document.getElementById("noticeDescription").value;
    let deadline = document.getElementById("deadline").value;
    let applyDetails = document.getElementById("applydetails").value;

    let notice = {
        title: title,
        description: description,
        deadline: deadline,
        applyDetails: applyDetails
    };

    if (editNoticeIndex === -1) {

        recruitmentNotices.push(notice);

        alert("Recruitment Notice Published Successfully!");

    } else {

        recruitmentNotices[editNoticeIndex] = notice;

        editNoticeIndex = -1;

        recruitmentForm.querySelector("button").innerText = "Publish Notice";

        alert("Recruitment Notice Updated Successfully!");
    }

    recruitmentForm.reset();

    showRecruitmentNotices();
    updateCounts();

});


function showRecruitmentNotices() {

    let dashboardList = document.getElementById("recruitmentList");
    let manageList = document.getElementById("recruitmentManageList");

    dashboardList.innerHTML = "";
    manageList.innerHTML = "";

    for (let i = 0; i < recruitmentNotices.length; i++) {

        let notice = recruitmentNotices[i];

        let div = document.createElement("div");
        div.className = "recruitment-notice";

        let heading = document.createElement("h3");
        heading.innerText = notice.title;

        let description = document.createElement("p");
        description.innerText = notice.description;

        let deadline = document.createElement("p");
        deadline.innerText = "Deadline: " + notice.deadline;

        let apply = document.createElement("p");
        apply.innerText = "How to Apply: " + notice.applyDetails;

        div.appendChild(heading);
        div.appendChild(description);
        div.appendChild(deadline);
        div.appendChild(apply);

        dashboardList.appendChild(div);

        let manageCard = createContentCard(
            notice,
            i,
            "edit_notice_btn",
            "delete_notice_btn",
            "Deadline: " + notice.deadline
        );

        manageList.appendChild(manageCard);
    }
}


let recruitmentManageList = document.getElementById("recruitmentManageList");

recruitmentManageList.addEventListener("click", function(event) {

    let index = event.target.getAttribute("data-index");

    if (index === null) return;

    index = Number(index);

    if (event.target.classList.contains("edit_notice_btn")) {

        editNoticeIndex = index;

        document.getElementById("noticeTitle").value =
            recruitmentNotices[index].title;

        document.getElementById("noticeDescription").value =
            recruitmentNotices[index].description;

        document.getElementById("deadline").value =
            recruitmentNotices[index].deadline;

        document.getElementById("applydetails").value =
            recruitmentNotices[index].applyDetails;

        recruitmentForm.querySelector("button").innerText = "Update Notice";

        recruitmentForm.scrollIntoView({
            behavior: "smooth"
        });

    } else if (event.target.classList.contains("delete_notice_btn")) {

        recruitmentNotices.splice(index, 1);

        showRecruitmentNotices();
        updateCounts();

        alert("Recruitment Notice Deleted!");
    }

});


let eventForm = document.getElementById("eventForm");

eventForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let title = document.getElementById("eventTitle").value;
    let description = document.getElementById("eventDescription").value;
    let date = document.getElementById("eventDate").value;
    let location = document.getElementById("eventLocation").value;

    let newEvent = {
        title: title,
        description: description,
        date: date,
        location: location
    };

    if (editEventIndex === -1) {

        clubEvents.push(newEvent);

        alert("Event Published Successfully!");

    } else {

        clubEvents[editEventIndex] = newEvent;

        editEventIndex = -1;

        eventForm.querySelector("button").innerText = "Publish Event";

        alert("Event Updated Successfully!");
    }

    eventForm.reset();

    showEvents();
    updateCounts();

});


function showEvents() {

    let list = document.getElementById("eventList");
    let manageList = document.getElementById("eventManageList");

    list.innerHTML = "";
    manageList.innerHTML = "";

    for (let i = 0; i < clubEvents.length; i++) {

        let item = clubEvents[i];

        let li = document.createElement("li");

        if (item.date && item.location) {
            li.innerText = item.title + " - " + item.date + " - " + item.location;
        } else {
            li.innerText = item.title;
        }

        list.appendChild(li);

        let card = createContentCard(
            item,
            i,
            "edit_event_btn",
            "delete_event_btn",
            "Date: " + item.date + " | Location: " + item.location
        );

        manageList.appendChild(card);
    }
}


let eventManageList = document.getElementById("eventManageList");

eventManageList.addEventListener("click", function(event)


{

    let index = event.target.getAttribute("data-index");

    if (index === null) return;

    index = Number(index);

    if (event.target.classList.contains("edit_event_btn")) {

        editEventIndex = index;

        document.getElementById("eventTitle").value =
            clubEvents[index].title;

        document.getElementById("eventDescription").value =
            clubEvents[index].description;

        document.getElementById("eventDate").value =
            clubEvents[index].date;

        document.getElementById("eventLocation").value =
            clubEvents[index].location;

        eventForm.querySelector("button").innerText = "Update Event";

        eventForm.scrollIntoView({
            behavior: "smooth"
        });

    } else if (event.target.classList.contains("delete_event_btn")) {

        clubEvents.splice(index, 1);

        showEvents();
        updateCounts();

        alert("Event Deleted Successfully!");
    }

});


let announcementForm = document.getElementById("announcementForm");

announcementForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let title = document.getElementById("announcementTitle").value;
    let content = document.getElementById("announcementContent").value;

    let announcement = {
        title: title,
        description: content,
        date: new Date().toLocaleDateString()
    };

    if (editAnnouncementIndex === -1) {

        announcements.push(announcement);

        alert("Announcement Published Successfully!");

    } else {

        announcements[editAnnouncementIndex].title = title;
        announcements[editAnnouncementIndex].description = content;

        editAnnouncementIndex = -1;

        announcementForm.querySelector("button").innerText =
            "Publish Announcement";

        alert("Announcement Updated Successfully!");
    }

    announcementForm.reset();

    showAnnouncements();

});


function showAnnouncements() {

    let dashboardList = document.getElementById("announcementsDisplay");
    let manageList = document.getElementById("announcementManageList");

    dashboardList.innerHTML = "";
    manageList.innerHTML = "";

    for (let i = 0; i < announcements.length; i++) {

        let announcement = announcements[i];

        let heading = document.createElement("h3");
        heading.innerText = announcement.title;

        let paragraph = document.createElement("p");
        paragraph.innerText = announcement.description;

        let date = document.createElement("small");
        date.innerText = "Published Date: " + announcement.date;

        dashboardList.appendChild(heading);
        dashboardList.appendChild(paragraph);
        dashboardList.appendChild(date);

        let card = createContentCard(
            announcement,
            i,
            "edit_announcement_btn",
            "delete_announcement_btn",
            "Published Date: " + announcement.date
        );

        manageList.appendChild(card);
    }
}


let announcementManageList = document.getElementById("announcementManageList");

announcementManageList.addEventListener("click", function(event) 



{

    let index = event.target.getAttribute("data-index");

    if (index === null) return;

    index = Number(index);

    if (event.target.classList.contains("edit_announcement_btn"))
        
        
        
        {

        editAnnouncementIndex = index;

        document.getElementById("announcementTitle").value =
            announcements[index].title;

        document.getElementById("announcementContent").value =
            announcements[index].description;

        announcementForm.querySelector("button").innerText =
            "Update Announcement";

        announcementForm.scrollIntoView(
            
            
            
            {
            behavior: "smooth"
        });

    } 
    
    else if (event.target.classList.contains("delete_announcement_btn"))
        
        
        
        {

        announcements.splice(index, 1);

        showAnnouncements();

        alert("Announcement Deleted Successfully!");
    }

});


let postForm = document.getElementById("postForm");

postForm.addEventListener("submit", function(event)



{

    event.preventDefault();

    let title = document.getElementById("postTitle").value;
    let content = document.getElementById("postContent").value;

    let post = 
    {
        title: title,
        description: content,
        date: new Date().toLocaleDateString()
    };

    if (editPostIndex === -1)
        
        {

        publicPosts.push(post);

        alert("Public Post Published Successfully!");

    } else
        
        
        {

        publicPosts[editPostIndex].title = title;
        publicPosts[editPostIndex].description = content;

        editPostIndex = -1;

        postForm.querySelector("button").innerText = "Publish Post";

        alert("Public Post Updated Successfully!");
    }

    postForm.reset();

    showPublicPosts();
    updateCounts();

});


function showPublicPosts() {

    let list = document.getElementById("publicPostsList");

    list.innerHTML = "";

    for (let i = 0; i < publicPosts.length; i++) {

        let card = createContentCard(
            publicPosts[i],
            i,
            "edit_post_btn",
            "delete_post_btn",
            "Published Date: " + publicPosts[i].date
        );

        list.appendChild(card);
    }
}


let publicPostsList = document.getElementById("publicPostsList");

publicPostsList.addEventListener("click", function(event) {

    let index = event.target.getAttribute("data-index");

    if (index === null) return;

    index = Number(index);

    if (event.target.classList.contains("edit_post_btn")) {

        editPostIndex = index;

        document.getElementById("postTitle").value =
            publicPosts[index].title;

        document.getElementById("postContent").value =
            publicPosts[index].description;

        postForm.querySelector("button").innerText = "Update Post";

        postForm.scrollIntoView({
            behavior: "smooth"
        });

    } else if (event.target.classList.contains("delete_post_btn")) {

        publicPosts.splice(index, 1);

        showPublicPosts();
        updateCounts();

        alert("Public Post Deleted Successfully!");
    }

});


let quickActions = document.querySelectorAll(".publishpostcard");

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


showPendingMembers();
showApprovedMembers();
showRecruitmentNotices();
showEvents();
showAnnouncements();
showPublicPosts();
updateCounts();
