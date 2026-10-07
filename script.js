/* =========================================================
   THE CHAMPION'S PORTAL
   DIRECT FEATURE EDITING SYSTEM
   ========================================================= */


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {

        page.classList.remove("active");

        if (page.id === pageName) {
            page.classList.add("active");
        }

    });


    const links = document.querySelectorAll(".sidebar a");

    links.forEach(function(link) {

        link.classList.remove("active");

        const onclickText =
            link.getAttribute("onclick") || "";

        if (onclickText.includes("'" + pageName + "'")) {
            link.classList.add("active");
        }

    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   GRADE CALCULATOR
========================================================= */

function calculateGrade() {

    let totalScore = 0;
    let totalPossible = 0;


    for (let i = 1; i <= 4; i++) {

        const scoreElement =
            document.getElementById("score" + i);

        const totalElement =
            document.getElementById("total" + i);


        if (!scoreElement || !totalElement) {
            continue;
        }


        const score =
            parseFloat(scoreElement.value);

        const total =
            parseFloat(totalElement.value);


        if (
            !isNaN(score) &&
            !isNaN(total) &&
            total > 0
        ) {

            totalScore += score;
            totalPossible += total;

        }

    }


    const result =
        document.getElementById("gradeResult");


    if (!result) {
        return;
    }


    if (totalPossible === 0) {

        result.innerHTML = `

            <h3>--</h3>

            <p>
                Enter your scores to calculate.
            </p>

        `;

        return;

    }


    const percentage =
        (totalScore / totalPossible) * 100;


    result.innerHTML = `

        <h3>
            ${percentage.toFixed(2)}%
        </h3>

        <p>
            Overall Raw Score
        </p>

    `;

}


/* =========================================================
   ATTENDANCE
========================================================= */

function updateAttendance() {

    const rows =
        document.querySelectorAll(
            '.attendance-table tbody tr'
        );


    let present = 0;
    let absent = 0;
    let late = 0;


    rows.forEach(function(row) {

        const selected =
            row.querySelector(
                'input[type="radio"]:checked'
            );


        if (!selected) {
            return;
        }


        if (selected.value === "present") {
            present++;
        }


        if (selected.value === "absent") {
            absent++;
        }


        if (selected.value === "late") {
            late++;
        }

    });


    const presentElement =
        document.getElementById("presentCount");

    const absentElement =
        document.getElementById("absentCount");

    const lateElement =
        document.getElementById("lateCount");

    const rateElement =
        document.getElementById("attendanceRate");


    if (presentElement) {
        presentElement.textContent = present;
    }


    if (absentElement) {
        absentElement.textContent = absent;
    }


    if (lateElement) {
        lateElement.textContent = late;
    }


    let rate = 0;


    if (rows.length > 0) {

        rate =
            ((present + late) / rows.length) * 100;

    }


    if (rateElement) {

        rateElement.textContent =
            rate.toFixed(0) + "%";

    }

}


/* =========================================================
   SAVE ATTENDANCE
========================================================= */

function saveAttendance() {

    updateAttendance();


    const present =
        document.getElementById(
            "presentCount"
        )?.textContent || "0";


    const absent =
        document.getElementById(
            "absentCount"
        )?.textContent || "0";


    const late =
        document.getElementById(
            "lateCount"
        )?.textContent || "0";


    showToast(
        "Attendance saved successfully!"
    );


    setTimeout(function() {

        alert(
            "✓ Attendance saved successfully!\n\n" +
            "Present: " + present + "\n" +
            "Absent: " + absent + "\n" +
            "Late: " + late
        );

    }, 200);

}


/* =========================================================
   CLEAR ATTENDANCE
========================================================= */

function clearAttendance() {

    const radios =
        document.querySelectorAll(
            '.attendance-table input[type="radio"]'
        );


    radios.forEach(function(radio) {

        radio.checked = false;

    });


    const ids = [
        "presentCount",
        "absentCount",
        "lateCount"
    ];


    ids.forEach(function(id) {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent = "0";
        }

    });


    const rate =
        document.getElementById(
            "attendanceRate"
        );


    if (rate) {
        rate.textContent = "0%";
    }


    showToast(
        "Attendance cleared."
    );

}


/* =========================================================
   TODAY'S DATE
========================================================= */

function setTodayDate() {

    const dateInput =
        document.getElementById(
            "attendanceDate"
        );


    if (!dateInput) {
        return;
    }


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    dateInput.value =
        `${year}-${month}-${day}`;

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    let toast =
        document.getElementById(
            "portalToast"
        );


    if (!toast) {

        toast =
            document.createElement("div");

        toast.id =
            "portalToast";


        toast.style.position =
            "fixed";

        toast.style.bottom =
            "25px";

        toast.style.left =
            "50%";

        toast.style.transform =
            "translateX(-50%) translateY(20px)";

        toast.style.background =
            "#1E4D77";

        toast.style.color =
            "#FFFFFF";

        toast.style.padding =
            "12px 20px";

        toast.style.borderRadius =
            "12px";

        toast.style.fontSize =
            "13px";

        toast.style.fontWeight =
            "700";

        toast.style.zIndex =
            "99999";

        toast.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.2)";

        toast.style.opacity =
            "0";

        toast.style.transition =
            "all .3s ease";


        document.body.appendChild(toast);

    }


    toast.textContent =
        message;


    toast.style.opacity =
        "1";

    toast.style.transform =
        "translateX(-50%) translateY(0)";


    clearTimeout(
        window.portalToastTimer
    );


    window.portalToastTimer =
        setTimeout(function() {

            toast.style.opacity =
                "0";

            toast.style.transform =
                "translateX(-50%) translateY(20px)";

        }, 2500);

}


/* =========================================================
   PORTAL DATA
========================================================= */

const DEFAULT_PORTAL_DATA = {

    announcements: [

        {
            title: "Quarter 1 Examination",
            text: "Quarter 1 examinations will begin next week. Please prepare your reviewers.",
            date: "September 20, 2026"
        },

        {
            title: "School Clean-Up Drive",
            text: "All students are encouraged to participate in the school clean-up activity.",
            date: "September 22, 2026"
        },

        {
            title: "Student Organization Week",
            text: "Students may visit the Organizations page to learn more about school clubs.",
            date: "September 25, 2026"
        }

    ],


    assignments: [

        {
            subject: "General Chemistry 2",
            task: "Laboratory Report",
            date: "September 25",
            status: "Due Soon"
        },

        {
            subject: "General Physics 2",
            task: "Electromagnetism Worksheet",
            date: "September 27",
            status: "Pending"
        },

        {
            subject: "Pre-Calculus",
            task: "Function Exercises",
            date: "September 29",
            status: "Upcoming"
        }

    ],


    schedule: [

        {
            day: "MONDAY",
            time: "7:30 AM",
            subject: "General Chemistry 2",
            room: "Room 204"
        },

        {
            day: "MONDAY",
            time: "9:00 AM",
            subject: "General Physics 2",
            room: "Room 205"
        },

        {
            day: "TUESDAY",
            time: "8:00 AM",
            subject: "Pre-Calculus",
            room: "Room 301"
        },

        {
            day: "TUESDAY",
            time: "10:00 AM",
            subject: "Empowerment Technologies",
            room: "ICT Laboratory"
        }

    ],


    organizations: [

        {
            icon: "🏫",
            name: "Supreme Secondary Learner Government",
            description: "Student leadership and school-wide activities."
        },

        {
            icon: "🧪",
            name: "Science Club",
            description: "Science experiments, research, and innovation."
        },

        {
            icon: "📐",
            name: "Mathematics Club",
            description: "Mathematics activities, competitions, and challenges."
        },

        {
            icon: "🏐",
            name: "Volleyball Club",
            description: "Sports training and school competitions."
        },

        {
            icon: "🎨",
            name: "Arts & Culture Club",
            description: "Creative arts, culture, and school performances."
        },

        {
            icon: "💻",
            name: "ICT Club",
            description: "Coding, technology, and digital innovation."
        },

        {
            icon: "🌱",
            name: "YES-O",
            description: "Environmental awareness and sustainability activities."
        },

        {
            icon: "📰",
            name: "Campus Journalism",
            description: "Writing, journalism, photography, and publication."
        }

    ]

};


/* =========================================================
   DATA STORAGE
========================================================= */

function getPortalData() {

    const saved =
        localStorage.getItem(
            "championsPortalData"
        );


    if (!saved) {

        return JSON.parse(
            JSON.stringify(
                DEFAULT_PORTAL_DATA
            )
        );

    }


    try {

        return JSON.parse(saved);

    } catch (error) {

        return JSON.parse(
            JSON.stringify(
                DEFAULT_PORTAL_DATA
            )
        );

    }

}


function savePortalData(data) {

    localStorage.setItem(
        "championsPortalData",
        JSON.stringify(data)
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }


    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* =========================================================
   DIRECT EDITOR STYLES
========================================================= */

function addDirectEditorStyles() {

    if (
        document.getElementById(
            "directEditorStyles"
        )
    ) {
        return;
    }


    const style =
        document.createElement("style");


    style.id =
        "directEditorStyles";


    style.textContent = `

        .portal-feature-controls {
            display: flex;
            gap: 7px;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 15px;
        }


        .portal-add-button {
            background: #008081 !important;
            color: white !important;
            border: none !important;
            border-radius: 9px !important;
            padding: 9px 13px !important;
            font-size: 10px !important;
            font-weight: 800 !important;
            cursor: pointer !important;
        }


        .portal-edit-button {
            background: #FFF4B5 !important;
            color: #6E5B00 !important;
            border: none !important;
            border-radius: 8px !important;
            padding: 7px 10px !important;
            font-size: 10px !important;
            font-weight: 800 !important;
            cursor: pointer !important;
        }


        .portal-delete-button {
            background: #FFF0F0 !important;
            color: #C0392B !important;
            border: none !important;
            border-radius: 8px !important;
            padding: 7px 10px !important;
            font-size: 10px !important;
            font-weight: 800 !important;
            cursor: pointer !important;
        }


        .portal-control-row {
            display: flex;
            gap: 6px;
            margin-top: 10px;
        }


        .portal-inline-form {
            background: #F8F9F2;
            border: 1px solid #E1E5D5;
            border-radius: 14px;
            padding: 15px;
            margin-bottom: 12px;
            animation: directEditIn .2s ease;
        }


        .portal-inline-form input,
        .portal-inline-form textarea,
        .portal-inline-form select {
            width: 100%;
            box-sizing: border-box;
            padding: 9px 11px;
            margin-bottom: 8px;
            border: 1px solid #D8DED1;
            border-radius: 8px;
            background: white;
            font-family: inherit;
            font-size: 11px;
            color: #24343D;
            outline: none;
        }


        .portal-inline-form textarea {
            min-height: 70px;
            resize: vertical;
        }


        .portal-inline-form input:focus,
        .portal-inline-form textarea:focus,
        .portal-inline-form select:focus {
            border-color: #008081;
            box-shadow: 0 0 0 3px rgba(0,128,129,.08);
        }


        .portal-form-label {
            display: block;
            font-size: 10px;
            font-weight: 800;
            color: #1E4D77;
            margin-bottom: 4px;
        }


        .portal-form-actions {
            display: flex;
            gap: 7px;
            margin-top: 5px;
        }


        .portal-save-button {
            background: #4CB050 !important;
            color: white !important;
            border: none !important;
            border-radius: 8px !important;
            padding: 8px 12px !important;
            font-size: 10px !important;
            font-weight: 800 !important;
            cursor: pointer !important;
        }


        .portal-cancel-button {
            background: #E9ECE5 !important;
            color: #24343D !important;
            border: none !important;
            border-radius: 8px !important;
            padding: 8px 12px !important;
            font-size: 10px !important;
            font-weight: 800 !important;
            cursor: pointer !important;
        }


        .announcement,
        .assignment,
        .schedule-item,
        .organization-card {
            position: relative;
        }


        .announcement .portal-control-row {
            justify-content: flex-end;
        }


        .assignment .portal-control-row {
            justify-content: flex-end;
        }


        .schedule-item {
            padding-bottom: 42px;
        }


        .schedule-item .portal-control-row {
            position: absolute;
            right: 12px;
            bottom: 9px;
        }


        .organization-card {
            padding-bottom: 55px;
        }


        .organization-card .portal-control-row {
            position: absolute;
            left: 15px;
            bottom: 12px;
        }


        @keyframes directEditIn {

            from {
                opacity: 0;
                transform: translateY(-5px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }

        }


        @media (max-width: 600px) {

            .portal-control-row {
                justify-content: flex-start !important;
            }

            .schedule-item {
                padding-bottom: 55px;
            }

        }

    `;


    document.head.appendChild(
        style
    );

}


/* =========================================================
   CREATE BUTTON
========================================================= */

function createButton(
    text,
    className,
    action
) {

    const button =
        document.createElement("button");


    button.type =
        "button";


    button.textContent =
        text;


    button.className =
        className;


    button.onclick =
        action;


    return button;

}


/* =========================================================
   ANNOUNCEMENTS
========================================================= */

function renderAnnouncements() {

    const data =
        getPortalData();


    const page =
        document.getElementById(
            "announcements"
        );


    if (!page) {
        return;
    }


    const card =
        page.querySelector(".card");


    if (!card) {
        return;
    }


    card.innerHTML = "";


    const controls =
        document.createElement("div");


    controls.className =
        "portal-feature-controls";


    const addButton =
        createButton(
            "+ Add Announcement",
            "portal-add-button",
            addAnnouncement
        );


    controls.appendChild(
        addButton
    );


    card.appendChild(
        controls
    );


    data.announcements.forEach(
        function(item, index) {

            const announcement =
                document.createElement("div");


            announcement.className =
                "announcement";


            announcement.innerHTML = `

                <div>

                    <h3>
                        ${escapeHTML(item.title)}
                    </h3>

                    <p>
                        ${escapeHTML(item.text)}
                    </p>

                </div>

                <span class="announcement-date">
                    ${escapeHTML(item.date)}
                </span>

            `;


            const controls =
                document.createElement("div");


            controls.className =
                "portal-control-row";


            controls.appendChild(
                createButton(
                    "✏️ Edit",
                    "portal-edit-button",
                    function() {
                        editAnnouncement(
                            announcement,
                            index
                        );
                    }
                )
            );


            controls.appendChild(
                createButton(
                    "🗑️ Delete",
                    "portal-delete-button",
                    function() {
                        deleteAnnouncement(index);
                    }
                )
            );


            announcement.appendChild(
                controls
            );


            card.appendChild(
                announcement
            );

        }
    );

}


/* =========================================================
   ADD ANNOUNCEMENT
========================================================= */

function addAnnouncement() {

    const data =
        getPortalData();


    data.announcements.push({

        title: "New Announcement",

        text: "Write your announcement here.",

        date: "New Date"

    });


    savePortalData(data);

    renderAnnouncements();


    showToast(
        "Announcement added."
    );

}


/* =========================================================
   EDIT ANNOUNCEMENT
========================================================= */

function editAnnouncement(
    element,
    index
) {

    const data =
        getPortalData();


    const item =
        data.announcements[index];


    element.innerHTML = `

        <div class="portal-inline-form">

            <span class="portal-form-label">
                Announcement Title
            </span>

            <input
                id="announcementTitle${index}"
                type="text"
                value="${escapeHTML(item.title)}"
            >


            <span class="portal-form-label">
                Description
            </span>

            <textarea
                id="announcementText${index}"
            >${escapeHTML(item.text)}</textarea>


            <span class="portal-form-label">
                Date
            </span>

            <input
                id="announcementDate${index}"
                type="text"
                value="${escapeHTML(item.date)}"
            >


            <div class="portal-form-actions">

                <button
                    type="button"
                    class="portal-save-button"
                    onclick="saveAnnouncement(${index})"
                >
                    💾 Save
                </button>

                <button
                    type="button"
                    class="portal-cancel-button"
                    onclick="renderAnnouncements()"
                >
                    Cancel
                </button>

            </div>

        </div>

    `;

}


/* =========================================================
   SAVE ANNOUNCEMENT
========================================================= */

function saveAnnouncement(index) {

    const data =
        getPortalData();


    data.announcements[index].title =
        document.getElementById(
            "announcementTitle" + index
        ).value;


    data.announcements[index].text =
        document.getElementById(
            "announcementText" + index
        ).value;


    data.announcements[index].date =
        document.getElementById(
            "announcementDate" + index
        ).value;


    savePortalData(data);

    renderAnnouncements();


    showToast(
        "Announcement updated."
    );

}


/* =========================================================
   DELETE ANNOUNCEMENT
========================================================= */

function deleteAnnouncement(index) {

    if (
        !confirm(
            "Delete this announcement?"
        )
    ) {
        return;
    }


    const data =
        getPortalData();


    data.announcements.splice(
        index,
        1
    );


    savePortalData(data);

    renderAnnouncements();


    showToast(
        "Announcement deleted."
    );

}


/* =========================================================
   ASSIGNMENTS
========================================================= */

function renderAssignments() {

    const data =
        getPortalData();


    const page =
        document.getElementById(
            "assignments"
        );


    if (!page) {
        return;
    }


    const card =
        page.querySelector(".card");


    if (!card) {
        return;
    }


    card.innerHTML = "";


    const controls =
        document.createElement("div");


    controls.className =
        "portal-feature-controls";


    controls.appendChild(
        createButton(
            "+ Add Assignment",
            "portal-add-button",
            addAssignment
        )
    );


    card.appendChild(
        controls
    );


    data.assignments.forEach(
        function(item, index) {

            const assignment =
                document.createElement("div");


            assignment.className =
                "assignment";


            const badgeClass =
                item.status
                    .toLowerCase()
                    .includes("upcoming")
                    ? "badge green-badge"
                    : "badge";


            assignment.innerHTML = `

                <div>

                    <h3>
                        ${escapeHTML(item.subject)}
                    </h3>

                    <p>
                        ${escapeHTML(item.task)}
                        • Due ${escapeHTML(item.date)}
                    </p>

                </div>

                <span class="${badgeClass}">
                    ${escapeHTML(item.status)}
                </span>

            `;


            const buttons =
                document.createElement("div");


            buttons.className =
                "portal-control-row";


            buttons.appendChild(
                createButton(
                    "✏️ Edit",
                    "portal-edit-button",
                    function() {
                        editAssignment(
                            assignment,
                            index
                        );
                    }
                )
            );


            buttons.appendChild(
                createButton(
                    "🗑️ Delete",
                    "portal-delete-button",
                    function() {
                        deleteAssignment(index);
                    }
                )
            );


            assignment.appendChild(
                buttons
            );


            card.appendChild(
                assignment
            );

        }
    );

}


/* =========================================================
   ADD ASSIGNMENT
========================================================= */

function addAssignment() {

    const data =
        getPortalData();


    data.assignments.push({

        subject: "New Subject",

        task: "New Assignment",

        date: "New Date",

        status: "Upcoming"

    });


    savePortalData(data);

    renderAssignments();


    showToast(
        "Assignment added."
    );

}


/* =========================================================
   EDIT ASSIGNMENT
========================================================= */

function editAssignment(
    element,
    index
) {

    const data =
        getPortalData();


    const item =
        data.assignments[index];


    element.innerHTML = `

        <div class="portal-inline-form">

            <span class="portal-form-label">
                Subject
            </span>

            <input
                id="assignmentSubject${index}"
                type="text"
                value="${escapeHTML(item.subject)}"
            >


            <span class="portal-form-label">
                Assignment
            </span>

            <input
                id="assignmentTask${index}"
                type="text"
                value="${escapeHTML(item.task)}"
            >


            <span class="portal-form-label">
                Due Date
            </span>

            <input
                id="assignmentDate${index}"
                type="text"
                value="${escapeHTML(item.date)}"
            >


            <span class="portal-form-label">
                Status
            </span>

            <select
                id="assignmentStatus${index}"
            >

                <option
                    ${item.status === "Due Soon" ? "selected" : ""}
                >
                    Due Soon
                </option>

                <option
                    ${item.status === "Pending" ? "selected" : ""}
                >
                    Pending
                </option>

                <option
                    ${item.status === "Upcoming" ? "selected" : ""}
                >
                    Upcoming
                </option>

                <option
                    ${item.status === "Completed" ? "selected" : ""}
                >
                    Completed
                </option>

            </select>


            <div class="portal-form-actions">

                <button
                    type="button"
                    class="portal-save-button"
                    onclick="saveAssignment(${index})"
                >
                    💾 Save
                </button>

                <button
                    type="button"
                    class="portal-cancel-button"
                    onclick="renderAssignments()"
                >
                    Cancel
                </button>

            </div>

        </div>

    `;

}


/* =========================================================
   SAVE ASSIGNMENT
========================================================= */

function saveAssignment(index) {

    const data =
        getPortalData();


    data.assignments[index].subject =
        document.getElementById(
            "assignmentSubject" + index
        ).value;


    data.assignments[index].task =
        document.getElementById(
            "assignmentTask" + index
        ).value;


    data.assignments[index].date =
        document.getElementById(
            "assignmentDate" + index
        ).value;


    data.assignments[index].status =
        document.getElementById(
            "assignmentStatus" + index
        ).value;


    savePortalData(data);

    renderAssignments();


    showToast(
        "Assignment updated."
    );

}


/* =========================================================
   DELETE ASSIGNMENT
========================================================= */

function deleteAssignment(index) {

    if (
        !confirm(
            "Delete this assignment?"
        )
    ) {
        return;
    }


    const data =
        getPortalData();


    data.assignments.splice(
        index,
        1
    );


    savePortalData(data);

    renderAssignments();


    showToast(
        "Assignment deleted."
    );

}


/* =========================================================
   SCHEDULE
========================================================= */

function renderSchedule() {

    const data =
        getPortalData();


    const page =
        document.getElementById(
            "schedule"
        );


    if (!page) {
        return;
    }


    const card =
        page.querySelector(".card");


    if (!card) {
        return;
    }


    card.innerHTML = "";


    const controls =
        document.createElement("div");


    controls.className =
        "portal-feature-controls";


    controls.appendChild(
        createButton(
            "+ Add Class",
            "portal-add-button",
            addScheduleItem
        )
    );


    card.appendChild(
        controls
    );


    let currentDay = "";


    data.schedule.forEach(
        function(item, index) {

            if (
                item.day !== currentDay
            ) {

                currentDay =
                    item.day;


                const day =
                    document.createElement(
                        "div"
                    );


                day.className =
                    "schedule-day";


                day.textContent =
                    item.day;


                card.appendChild(
                    day
                );

            }


            const scheduleItem =
                document.createElement(
                    "div"
                );


            scheduleItem.className =
                "schedule-item";


            scheduleItem.innerHTML = `

                <div class="schedule-time">
                    ${escapeHTML(item.time)}
                </div>

                <div class="schedule-subject">

                    <strong>
                        ${escapeHTML(item.subject)}
                    </strong>

                    <span>
                        ${escapeHTML(item.room)}
                    </span>

                </div>

            `;


            const buttons =
                document.createElement(
                    "div"
                );


            buttons.className =
                "portal-control-row";


            buttons.appendChild(
                createButton(
                    "✏️ Edit",
                    "portal-edit-button",
                    function() {
                        editScheduleItem(
                            scheduleItem,
                            index
                        );
                    }
                )
            );


            buttons.appendChild(
                createButton(
                    "🗑️ Delete",
                    "portal-delete-button",
                    function() {
                        deleteScheduleItem(index);
                    }
                )
            );


            scheduleItem.appendChild(
                buttons
            );


            card.appendChild(
                scheduleItem
            );

        }
    );

}


/* =========================================================
   ADD CLASS
========================================================= */

function addScheduleItem() {

    const data =
        getPortalData();


    data.schedule.push({

        day: "MONDAY",

        time: "7:30 AM",

        subject: "New Subject",

        room: "Room 000"

    });


    savePortalData(data);

    renderSchedule();


    showToast(
        "Class added."
    );

}


/* =========================================================
   EDIT CLASS
========================================================= */

function editScheduleItem(
    element,
    index
) {

    const data =
        getPortalData();


    const item =
        data.schedule[index];


    element.innerHTML = `

        <div class="portal-inline-form">

            <span class="portal-form-label">
                Day
            </span>

            <select
                id="scheduleDay${index}"
            >

                <option
                    ${item.day === "MONDAY" ? "selected" : ""}
                >
                    MONDAY
                </option>

                <option
                    ${item.day === "TUESDAY" ? "selected" : ""}
                >
                    TUESDAY
                </option>

                <option
                    ${item.day === "WEDNESDAY" ? "selected" : ""}
                >
                    WEDNESDAY
                </option>

                <option
                    ${item.day === "THURSDAY" ? "selected" : ""}
                >
                    THURSDAY
                </option>

                <option
                    ${item.day === "FRIDAY" ? "selected" : ""}
                >
                    FRIDAY
                </option>

                <option
                    ${item.day === "SATURDAY" ? "selected" : ""}
                >
                    SATURDAY
                </option>

            </select>


            <span class="portal-form-label">
                Time
            </span>

            <input
                id="scheduleTime${index}"
                type="text"
                value="${escapeHTML(item.time)}"
                placeholder="7:30 AM"
            >


            <span class="portal-form-label">
                Subject
            </span>

            <input
                id="scheduleSubject${index}"
                type="text"
                value="${escapeHTML(item.subject)}"
            >


            <span class="portal-form-label">
                Room
            </span>

            <input
                id="scheduleRoom${index}"
                type="text"
                value="${escapeHTML(item.room)}"
            >


            <div class="portal-form-actions">

                <button
                    type="button"
                    class="portal-save-button"
                    onclick="saveScheduleItem(${index})"
                >
                    💾 Save
                </button>

                <button
                    type="button"
                    class="portal-cancel-button"
                    onclick="renderSchedule()"
                >
                    Cancel
                </button>

            </div>

        </div>

    `;

}


/* =========================================================
   SAVE CLASS
========================================================= */

function saveScheduleItem(index) {

    const data =
        getPortalData();


    data.schedule[index].day =
        document.getElementById(
            "scheduleDay" + index
        ).value;


    data.schedule[index].time =
        document.getElementById(
            "scheduleTime" + index
        ).value;


    data.schedule[index].subject =
        document.getElementById(
            "scheduleSubject" + index
        ).value;


    data.schedule[index].room =
        document.getElementById(
            "scheduleRoom" + index
        ).value;


    savePortalData(data);

    renderSchedule();


    showToast(
        "Class schedule updated."
    );

}


/* =========================================================
   DELETE CLASS
========================================================= */

function deleteScheduleItem(index) {

    if (
        !confirm(
            "Delete this class?"
        )
    ) {
        return;
    }


    const data =
        getPortalData();


    data.schedule.splice(
        index,
        1
    );


    savePortalData(data);

    renderSchedule();


    showToast(
        "Class deleted."
    );

}


/* =========================================================
   ORGANIZATIONS
========================================================= */

function renderOrganizations() {

    const data =
        getPortalData();


    const page =
        document.getElementById(
            "organizations"
        );


    if (!page) {
        return;
    }


    const grid =
        page.querySelector(".grid-4");


    if (!grid) {
        return;
    }


    grid.innerHTML = "";


    const controls =
        document.createElement("div");


    controls.className =
        "portal-feature-controls";


    controls.appendChild(
        createButton(
            "+ Add Organization",
            "portal-add-button",
            addOrganization
        )
    );


    grid.parentElement.insertBefore(
        controls,
        grid
    );


    data.organizations.forEach(
        function(item, index) {

            const organization =
                document.createElement(
                    "div"
                );


            organization.className =
                "organization-card";


            organization.innerHTML = `

                <div class="organization-icon">
                    ${escapeHTML(item.icon)}
                </div>

                <h3>
                    ${escapeHTML(item.name)}
                </h3>

                <p>
                    ${escapeHTML(item.description)}
                </p>

            `;


            const buttons =
                document.createElement(
                    "div"
                );


            buttons.className =
                "portal-control-row";


            buttons.appendChild(
                createButton(
                    "✏️ Edit",
                    "portal-edit-button",
                    function() {
                        editOrganization(
                            organization,
                            index
                        );
                    }
                )
            );


            buttons.appendChild(
                createButton(
                    "🗑️ Delete",
                    "portal-delete-button",
                    function() {
                        deleteOrganization(index);
                    }
                )
            );


            organization.appendChild(
                buttons
            );


            grid.appendChild(
                organization
            );

        }
    );

}


/* =========================================================
   ADD ORGANIZATION
========================================================= */

function addOrganization() {

    const data =
        getPortalData();


    data.organizations.push({

        icon: "⭐",

        name: "New Organization",

        description:
            "Write the organization description here."

    });


    savePortalData(data);

    renderOrganizations();


    showToast(
        "Organization added."
    );

}


/* =========================================================
   EDIT ORGANIZATION
========================================================= */

function editOrganization(
    element,
    index
) {

    const data =
        getPortalData();


    const item =
        data.organizations[index];


    element.innerHTML = `

        <div class="portal-inline-form">

            <span class="portal-form-label">
                Icon / Emoji
            </span>

            <input
                id="organizationIcon${index}"
                type="text"
                value="${escapeHTML(item.icon)}"
            >


            <span class="portal-form-label">
                Organization Name
            </span>

            <input
                id="organizationName${index}"
                type="text"
                value="${escapeHTML(item.name)}"
            >


            <span class="portal-form-label">
                Description
            </span>

            <textarea
                id="organizationDescription${index}"
            >${escapeHTML(item.description)}</textarea>


            <div class="portal-form-actions">

                <button
                    type="button"
                    class="portal-save-button"
                    onclick="saveOrganization(${index})"
                >
                    💾 Save
                </button>

                <button
                    type="button"
                    class="portal-cancel-button"
                    onclick="renderOrganizations()"
                >
                    Cancel
                </button>

            </div>

        </div>

    `;

}


/* =========================================================
   SAVE ORGANIZATION
========================================================= */

function saveOrganization(index) {

    const data =
        getPortalData();


    data.organizations[index].icon =
        document.getElementById(
            "organizationIcon" + index
        ).value;


    data.organizations[index].name =
        document.getElementById(
            "organizationName" + index
        ).value;


    data.organizations[index].description =
        document.getElementById(
            "organizationDescription" + index
        ).value;


    savePortalData(data);

    renderOrganizations();


    showToast(
        "Organization updated."
    );

}


/* =========================================================
   DELETE ORGANIZATION
========================================================= */

function deleteOrganization(index) {

    if (
        !confirm(
            "Delete this organization?"
        )
    ) {
        return;
    }


    const data =
        getPortalData();


    data.organizations.splice(
        index,
        1
    );


    savePortalData(data);

    renderOrganizations();


    showToast(
        "Organization deleted."
    );

}


/* =========================================================
   REMOVE OLD EDIT PORTAL BUTTON
========================================================= */

function removeOldEditPortal() {

    const oldButton =
        document.getElementById(
            "editPortalButton"
        );


    if (oldButton) {
        oldButton.remove();
    }


    const oldEditor =
        document.getElementById(
            "portalEditor"
        );


    if (oldEditor) {
        oldEditor.remove();
    }


    const oldStyle =
        document.getElementById(
            "portalEditorStyles"
        );


    if (oldStyle) {
        oldStyle.remove();
    }

}


/* =========================================================
   RENDER EVERYTHING
========================================================= */

function renderAllPortalContent() {

    renderAnnouncements();

    renderAssignments();

    renderSchedule();

    renderOrganizations();

}


/* =========================================================
   RESET CONTENT
========================================================= */

function resetPortalContent() {

    if (
        !confirm(
            "Reset announcements, assignments, schedule, and organizations to the original content?"
        )
    ) {
        return;
    }


    localStorage.removeItem(
        "championsPortalData"
    );


    renderAllPortalContent();


    showToast(
        "Portal content reset."
    );

}


/* =========================================================
   KEYBOARD SHORTCUT
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            document
                .querySelectorAll(
                    ".portal-inline-form"
                )
                .forEach(
                    function(form) {
                        form.remove();
                    }
                );

            renderAllPortalContent();

        }

    }
);


/* =========================================================
   START PORTAL
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setTodayDate();

        removeOldEditPortal();

        addDirectEditorStyles();

        renderAllPortalContent();

    }
);