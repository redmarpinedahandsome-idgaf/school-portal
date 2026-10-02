/* =========================================
   PAGE NAVIGATION
========================================= */

function showPage(pageName) {

    // Hide every page
    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {

        page.classList.remove("active");

    });


    // Show selected page
    const selectedPage =
        document.getElementById(pageName);

    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    // Update sidebar
    const links =
        document.querySelectorAll(".sidebar a");

    links.forEach(function(link) {

        link.classList.remove("active");

    });


    // Find clicked link
    links.forEach(function(link) {

        const onclick =
            link.getAttribute("onclick");

        if (
            onclick &&
            onclick.includes("'" + pageName + "'")
        ) {

            link.classList.add("active");

        }

    });


    // Scroll to top
    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================
   GRADE CALCULATOR
========================================= */

function calculateGrade() {

    let totalScore = 0;

    let totalPossible = 0;


    for (let i = 1; i <= 4; i++) {

        const score =
            parseFloat(
                document.getElementById(
                    "score" + i
                ).value
            );

        const total =
            parseFloat(
                document.getElementById(
                    "total" + i
                ).value
            );


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
        document.getElementById(
            "gradeResult"
        );


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


/* =========================================
   ATTENDANCE
========================================= */

function updateAttendance() {

    const rows =
        document.querySelectorAll(
            '.attendance-table tbody tr'
        );


    let present = 0;

    let absent = 0;

    let late = 0;

    let recorded = 0;


    rows.forEach(function(row) {

        const selected =
            row.querySelector(
                'input[type="radio"]:checked'
            );


        if (selected) {

            recorded++;


            if (
                selected.value === "present"
            ) {

                present++;

            }


            if (
                selected.value === "absent"
            ) {

                absent++;

            }


            if (
                selected.value === "late"
            ) {

                late++;

            }

        }

    });


    document.getElementById(
        "presentCount"
    ).textContent = present;


    document.getElementById(
        "absentCount"
    ).textContent = absent;


    document.getElementById(
        "lateCount"
    ).textContent = late;


    let rate = 0;


    if (rows.length > 0) {

        rate =
            ((present + late) /
                rows.length) * 100;

    }


    document.getElementById(
        "attendanceRate"
    ).textContent =
        rate.toFixed(0) + "%";

}


/* =========================================
   SAVE ATTENDANCE
========================================= */

function saveAttendance() {

    updateAttendance();


    const present =
        document.getElementById(
            "presentCount"
        ).textContent;


    const absent =
        document.getElementById(
            "absentCount"
        ).textContent;


    const late =
        document.getElementById(
            "lateCount"
        ).textContent;


    alert(

        "✓ Attendance saved successfully!\n\n" +

        "Present: " + present + "\n" +

        "Absent: " + absent + "\n" +

        "Late: " + late

    );

}


/* =========================================
   CLEAR ATTENDANCE
========================================= */

function clearAttendance() {

    const radios =
        document.querySelectorAll(
            '.attendance-table input[type="radio"]'
        );


    radios.forEach(function(radio) {

        radio.checked = false;

    });


    document.getElementById(
        "presentCount"
    ).textContent = "0";


    document.getElementById(
        "absentCount"
    ).textContent = "0";


    document.getElementById(
        "lateCount"
    ).textContent = "0";


    document.getElementById(
        "attendanceRate"
    ).textContent = "0%";

}


/* =========================================
   SET TODAY'S DATE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const dateInput =
            document.getElementById(
                "attendanceDate"
            );


        if (dateInput) {

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

    }
);