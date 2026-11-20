document.addEventListener("DOMContentLoaded", function () {

    
    let clubs = [
        { id: "CLB-001", name: "AIUB Computer Club", active: true },
        { id: "CLB-002", name: "AIUB Robotics Club", active: true },
        { id: "CLB-003", name: "AIUB Business Club", active: true },
        { id: "CLB-004", name: "AIUB Photography Club", active: false }
    ];

    let presidents = [
        { clubId: "CLB-001", name: "Nafisa Rahman", studentId: "24-58335-2" },
        { clubId: "CLB-002", name: "", studentId: "" },
        { clubId: "CLB-003", name: "Tahmid Hasan", studentId: "24-58337-2" },
        { clubId: "CLB-004", name: "Sadia Ahmed", studentId: "24-58338-2" }
    ];

    let events = [
        { id: "EVT-001", title: "Campus Hackathon 2026", location: "Annex building - Auditorium", clubId: "CLB-001", date: "22 Nov 2026" },
        { id: "EVT-002", title: "Robotics Project Showcase", location: "D building - Multipurpose hall", clubId: "CLB-002", date: "25 Nov 2026" },
        { id: "EVT-003", title: "Campus Photo Walk", location: "AIUB campus - Main entrance", clubId: "CLB-004", date: "28 Nov 2026" }
    ];

    let posts = [
        { id: "PST-001", title: "Registration is open for Campus Hackathon 2026", clubId: "CLB-001", status: "Pending", date: "18 Nov 2026" },
        { id: "PST-002", title: "Meet the teams behind our newest robots", clubId: "CLB-002", status: "Pending", date: "18 Nov 2026" },
        { id: "PST-003", title: "A look back at the Campus Photography Exhibition", clubId: "CLB-004", status: "Published", date: "17 Nov 2026" }
    ];

    
    let clubsTable = document.getElementById("clubs-table");
    let presidentsTable = document.getElementById("presidents-table");
    let eventsTable = document.getElementById("events-table");
    let postsTable = document.getElementById("posts-table");

    // This function creates a table cell and adds text to it
    function addCell(row, value) {
        let cell = document.createElement("td");
        cell.innerText = value;
        row.appendChild(cell);
        return cell;
    }

    // This function creates a button and gives it an action
    function addButton(cell, text, action, extraClass) {
        let button = document.createElement("button");
        button.innerText = text;
        button.type = "button";
        button.className = "action-button " + (extraClass || "");

        button.addEventListener("click", action);
        cell.appendChild(button);
    }

    // Create the cell that contains action buttons
    function addActions(row) {
        let cell = document.createElement("td");
        cell.className = "actions-cell";
        row.appendChild(cell);
        return cell;
    }

    function addStatus(cell, value, className) {
        let status = document.createElement("span");
        status.className = "status-pill " + className;
        status.innerText = value;
        cell.appendChild(status);
    }

    function addDetail(cell, value) {
        let detail = document.createElement("span");
        detail.className = "row-detail";
        detail.innerText = value;
        cell.appendChild(detail);
    }

    // Remove old rows before showing updated data
    function clearTable(table) {
        table.innerHTML = "";
    }

    function getClub(clubId) {
        for (let i = 0; i < clubs.length; i++) {
            if (clubs[i].id === clubId) {
                return clubs[i];
            }
        }
        return null;
    }

    function getClubName(clubId) {
        let club = getClub(clubId);

        if (club !== null) {
            return club.name;
        }

        return "Club removed";
    }

    function getShortClubName(clubId) {
        let name = getClubName(clubId);
        return name.replace("AIUB ", "");
    }

    function findPresident(clubId) {
        for (let i = 0; i < presidents.length; i++) {
            if (presidents[i].clubId === clubId) {
                return presidents[i];
            }
        }
        return null;
    }

    function findItem(items, itemId) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === itemId) {
                return items[i];
            }
        }
        return null;
    }

    function askForValue(message, oldValue) {
        let answer = prompt(message, oldValue || "");

        if (answer === null) {
            return null;
        }

        answer = answer.trim();

        if (answer === "") {
            alert("Please enter a value.");
            return null;
        }

        return answer;
    }

    // Generate the next ID by counting the current items
    function makeId(items, prefix) {
        let number = items.length + 1;
        let id = prefix + "-00" + number;

        return id;
    }

    // Show all clubs in the club table
    function showClubs() {
        clearTable(clubsTable);

        for (let i = 0; i < clubs.length; i++) {
            let club = clubs[i];
            let row = document.createElement("tr");

            addCell(row, club.name);
            addCell(row, club.id);

            let statusCell = document.createElement("td");

            if (club.active === true) {
                addStatus(statusCell, "Active", "status-active");
            } else {
                addStatus(statusCell, "Inactive", "status-inactive");
            }

            row.appendChild(statusCell);

            let actions = addActions(row);

            addButton(actions, "View", function () {
                alert("Club: " + club.name +
                    "\nClub ID: " + club.id +
                    "\nStatus: " + (club.active ? "Active" : "Inactive"));
            });

            addButton(actions, "Edit", function () {
                let newName = askForValue("Enter a new club name:", club.name);

                if (newName !== null) {
                    club.name = newName;
                    showAll();
                }
            });

            addButton(actions, club.active ? "Deactivate" : "Activate", function () {
                club.active = !club.active;
                showAll();
            });

            addButton(actions, "Delete", function () {
                if (confirm("Delete " + club.name + "?")) {
                    clubs.splice(i, 1);

                    let president = findPresident(club.id);
                    if (president !== null) {
                        presidents.splice(presidents.indexOf(president), 1);
                    }

                    showAll();
                }
            }, "danger");

            clubsTable.appendChild(row);
        }
    }

    // Show the president of each club
    function showPresidents() {
        clearTable(presidentsTable);

        for (let i = 0; i < clubs.length; i++) {
            let club = clubs[i];
            let row = document.createElement("tr");
            addCell(row, getShortClubName(club.id));

            let president = findPresident(club.id);
            let actions = addActions(row);

            if (president === null || president.name === "") {
                let nameCell = document.createElement("td");
                let message = document.createElement("span");
                message.className = "unassigned-pill";
                message.innerText = "Not assigned";
                nameCell.appendChild(message);
                row.appendChild(nameCell);

                addCell(row, "-");

                addButton(actions, "Assign president", function () {
                    assignPresident(president, club.id);
                });
            } else {
                addCell(row, president.name);
                addCell(row, president.studentId);

                addButton(actions, "Change", function () {
                    assignPresident(president, club.id);
                });

                addButton(actions, "Remove", function () {
                    if (confirm("Remove " + president.name + " as club president?")) {
                        president.name = "";
                        president.studentId = "";
                        showAll();
                    }
                }, "danger");
            }

            presidentsTable.appendChild(row);
        }
    }

    function assignPresident(president, clubId) {
        if (president === null) {
            president = { clubId: clubId, name: "", studentId: "" };
            presidents.push(president);
        }

        let name = askForValue("Enter the president's name:", president.name);
        if (name === null) {
            return;
        }

        let studentId = askForValue("Enter the student's ID:", president.studentId);
        if (studentId === null) {
            return;
        }

        president.name = name;
        president.studentId = studentId;
        showAll();
    }

    // Show all events
    function showEvents() {
        clearTable(eventsTable);

        for (let i = 0; i < events.length; i++) {
            let item = events[i];
            let row = document.createElement("tr");

            let titleCell = addCell(row, item.title);
            addDetail(titleCell, item.location);
            addCell(row, getClubName(item.clubId));
            addCell(row, item.date);

            let actions = addActions(row);

            addButton(actions, "View", function () {
                alert("Event: " + item.title +
                    "\nOrganizing club: " + getClubName(item.clubId) +
                    "\nDate: " + item.date +
                    "\nLocation: " + item.location);
            });

            addButton(actions, "Edit", function () {
                let newTitle = askForValue("Enter a new event name:", item.title);

                if (newTitle !== null) {
                    item.title = newTitle;
                    showAll();
                }
            });

            addButton(actions, "Delete", function () {
                if (confirm("Delete " + item.title + "?")) {
                    events.splice(i, 1);
                    showAll();
                }
            }, "danger");

            eventsTable.appendChild(row);
        }
    }

    // Show all public posts
    function showPosts() {
        clearTable(postsTable);

        for (let i = 0; i < posts.length; i++) {
            let post = posts[i];
            let row = document.createElement("tr");
            let pending = post.status === "Pending";

            let titleCell = addCell(row, post.title);

            if (pending) {
                addDetail(titleCell, "Submitted " + post.date);
            } else {
                addDetail(titleCell, "Published " + post.date);
            }

            addCell(row, getClubName(post.clubId));

            let statusCell = document.createElement("td");

            if (pending) {
                addStatus(statusCell, "Pending", "status-pending");
            } else {
                addStatus(statusCell, "Published", "status-published");
            }

            row.appendChild(statusCell);

            let actions = addActions(row);

            addButton(actions, "View", function () {
                alert("Post: " + post.title +
                    "\nClub: " + getClubName(post.clubId) +
                    "\nStatus: " + post.status);
            });

            if (pending) {
                addButton(actions, "Approve", function () {
                    post.status = "Published";
                    showAll();
                }, "approve-button");
            } else {
                addButton(actions, "Hide", function () {
                    post.status = "Pending";
                    showAll();
                });
            }

            addButton(actions, "Delete", function () {
                if (confirm("Delete this post?")) {
                    posts.splice(i, 1);
                    showAll();
                }
            }, "danger");

            postsTable.appendChild(row);
        }
    }

    // Update the number cards at the top of the dashboard
    function showStatistics() {
        let activeClubs = 0;
        let assignedPresidents = 0;
        let pendingPosts = 0;
        let eventClubIds = [];

        for (let i = 0; i < clubs.length; i++) {
            if (clubs[i].active === true) {
                activeClubs++;
            }
        }

        for (let i = 0; i < presidents.length; i++) {
            if (presidents[i].name !== "" && getClub(presidents[i].clubId) !== null) {
                assignedPresidents++;
            }
        }

        for (let i = 0; i < posts.length; i++) {
            if (posts[i].status === "Pending") {
                pendingPosts++;
            }
        }

        for (let i = 0; i < events.length; i++) {
            let found = false;

            for (let j = 0; j < eventClubIds.length; j++) {
                if (eventClubIds[j] === events[i].clubId) {
                    found = true;
                }
            }

            if (found === false) {
                eventClubIds.push(events[i].clubId);
            }
        }

        let clubsWithoutPresident = clubs.length - assignedPresidents;

        document.getElementById("total-clubs").innerText = clubs.length;
        document.getElementById("club-summary").innerText =
            activeClubs + " active - " + (clubs.length - activeClubs) + " inactive";

        document.getElementById("total-presidents").innerText = assignedPresidents;

        if (clubsWithoutPresident === 1) {
            document.getElementById("president-summary").innerText =
                "1 club needs a president";
        } else {
            document.getElementById("president-summary").innerText =
                clubsWithoutPresident + " clubs need a president";
        }

        document.getElementById("total-events").innerText = events.length;
        document.getElementById("event-summary").innerText =
            "Across " + eventClubIds.length + " campus clubs";

        document.getElementById("total-pending-posts").innerText = pendingPosts;
        document.getElementById("pending-badge").innerText = pendingPosts + " pending";
    }

    // Call all display functions after changing data
    function showAll() {
        showClubs();
        showPresidents();
        showEvents();
        showPosts();
        showStatistics();
    }

    // Create a new club
    document.getElementById("create-club").addEventListener("click", function () {
        let name = askForValue("Enter the club name:");

        if (name !== null) {
            let id = makeId(clubs, "CLB");
            clubs.push({ id: id, name: name, active: true });
            presidents.push({ clubId: id, name: "", studentId: "" });
            showAll();
        }
    });

    // Create a new event
    document.getElementById("create-event").addEventListener("click", function () {
        if (clubs.length === 0) {
            alert("Create a club before adding an event.");
            return;
        }

        let title = askForValue("Enter the event name:");
        if (title === null) {
            return;
        }

        let location = askForValue("Enter the event location:");
        if (location === null) {
            return;
        }

        let clubList = "";
        for (let i = 0; i < clubs.length; i++) {
            clubList = clubList + (i + 1) + ". " + clubs[i].name + "\n";
        }

        let choice = prompt("Choose the organizing club by number:\n" + clubList);

        if (choice === null) {
            return;
        }

        let clubNumber = Number(choice);

        if (clubNumber < 1 || clubNumber > clubs.length || clubNumber % 1 !== 0) {
            alert("Please enter a valid club number.");
            return;
        }

        let date = askForValue("Enter the event date (example: 22 Nov 2026):");
        if (date === null) {
            return;
        }

        let id = makeId(events, "EVT");

        events.push({
            id: id,
            title: title,
            location: location,
            clubId: clubs[clubNumber - 1].id,
            date: date
        });

        showAll();
    });

    // Change the active menu item when a navigation link is clicked
    let navLinks = document.querySelectorAll(".nav-link");

    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", function () {
            for (let j = 0; j < navLinks.length; j++) {
                navLinks[j].classList.remove("active");
            }

            navLinks[i].classList.add("active");
        });
    }

    // Display the starting data
    showAll();
});
