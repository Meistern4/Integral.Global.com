document.addEventListener("DOMContentLoaded", function() {
    // Set the current year in the footer
    const year = new Date().getFullYear();
    document.getElementById("footer-year").textContent = year;

    // Load menu items from XML
    if (document.getElementById("menu-items")) {
        loadMenuItems();
    }

    // Load branches from XML
    if (document.getElementById("branches")) {
        loadBranches();
    }

    // Handle form submission
    const form = document.getElementById("enquiry-form");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Your message has been sent!");
            form.reset();
        });
    }
});

function loadMenuItems() {
    fetch("xml/services.xml")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");
            const meals = xmlDoc.getElementsByTagName("service");
            let html = "<h2>Services</h2><ul>";
            for (let service of cleaning_services) {
                html += `<li>
                            <img src="${service.getElementsByTagName("image")[0].textContent}" alt="${service.getElementsByTagName("name")[0].textContent}">
                            <strong>${service.getElementsByTagName("name")[0].textContent}</strong> - ${service.getElementsByTagName("description")[0].textContent}
                            <br>Price: $${service.getElementsByTagName("price")[0].textContent}
                          </li>`;
            }
            html += "</ul>";
            document.getElementById("menu-items").innerHTML = html;
        })
        .catch(error => console.error("Error loading menu items:", error));
}

function loadBranches() {
    fetch("branches.xml")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");
            const branches = xmlDoc.getElementsByTagName("branch");
            let html = "<h2>Branches</h2><ul>";
            for (let branch of branches) {
                html += `<li>
                            <strong>${branch.getElementsByTagName("address")[0].textContent}</strong><br>
                            Contact: ${branch.getElementsByTagName("contact")[0].textContent}<br>
                            Opening Hours: ${branch.getElementsByTagName("opening-hours")[0].textContent}<br>
                            <a href="${branch.getElementsByTagName("google-maps-link")[0].textContent}" target="_blank">View on Google Maps</a>
                          </li>`;
            }
            html += "</ul>";
            document.getElementById("branches").innerHTML = html;
        })
        .catch(error => console.error("Error loading branches:", error));
}
