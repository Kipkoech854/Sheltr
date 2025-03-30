
document.addEventListener("DOMContentLoaded", async () => {
    const API_URL = "http://localhost:3000/shelters";
    let sheltersData = [];

    async function fetchShelters() {
        try {
            const response = await fetch(API_URL);
            sheltersData = await response.json();
            renderListings(sheltersData);
            populateDropdown(sheltersData);
        } catch (error) {
            console.error("Error fetching shelters:", error);
        }
    }

    function renderListings(shelters) {
        const container = document.getElementById("listings-container");
        container.innerHTML = shelters.map(shelter => `
            <div class="listing">
                <img src="${shelter.image}" alt="${shelter.name}">
                <div class="description">
                    <h3>${shelter.name}</h3>
                    <p><strong>Location:</strong> ${shelter.location}</p>
                    <p><strong>Agent:</strong> ${shelter.listingagent}</p>
                    <p><strong>Type:</strong> ${shelter.type}</p>
                    <p><strong>Price:</strong> ${shelter.price ? `Ksh ${shelter.price}` : "Free"}</p>
                    <button class="details-btn" data-id="${shelter.id}">View Details</button>
                    <p class="services-info hidden"></p>
                </div>
            </div>`).join('');
    }

    function populateDropdown(shelters) {
        const dropdown = document.getElementById("dropdown-list");
        dropdown.innerHTML = [...new Set(shelters.map(s => s.type))]
            .map(type => `<a href="#" class="dropdown-item" data-type="${type}">${type}</a>`)
            .join('');
    }

    document.getElementById("search-bar").addEventListener("input", () => {
        const query = document.getElementById("search-bar").value.toLowerCase();
        const filteredShelters = sheltersData.filter(shelter =>
            shelter.name.toLowerCase().includes(query) ||
            shelter.location.toLowerCase().includes(query) ||
            shelter.type.toLowerCase().includes(query)
        );
        renderListings(filteredShelters);
    });

    document.getElementById("dropdown-list").addEventListener("click", event => {
        if (event.target.classList.contains("dropdown-item")) {
            const type = event.target.dataset.type;
            renderListings(sheltersData.filter(s => s.type === type));
        }
    });
    document.querySelectorAll("#filterbyprice button").forEach(button => {
        button.addEventListener("click", () => {
            filterByPrice(button.classList[0]);
        });
    });

    function filterByPrice(priceCategory) {
        let filteredShelters = [];

        switch (priceCategory) {
            case "zero":
                filteredShelters = sheltersData.filter(shelter => !shelter.price || shelter.price === "free");
                break;
            case "one":
                filteredShelters = sheltersData.filter(shelter => shelter.price > 0 && shelter.price <= 5000);
                break;
            case "two":
                filteredShelters = sheltersData.filter(shelter => shelter.price >= 5001 && shelter.price <= 10000);
                break;
            case "three":
                filteredShelters = sheltersData.filter(shelter => shelter.price >= 10001 && shelter.price <= 20000);
                break;
            case "four":
                filteredShelters = sheltersData.filter(shelter => shelter.price >= 20001 && shelter.price <= 30000);
                break;
            case "five":
                filteredShelters = sheltersData.filter(shelter => shelter.price >= 30001);
                break;
            default:
                filteredShelters = sheltersData;
        }

        renderListings(filteredShelters);
    }


    document.getElementById("listings-container").addEventListener("click", async event => {
        if (event.target.classList.contains("details-btn")) {
            const shelterId = event.target.dataset.id;
            const infoElement = event.target.nextElementSibling;
            try {
                const response = await fetch(`${API_URL}/${shelterId}`);
                const shelter = await response.json();
                infoElement.textContent = `Services: ${shelter.services || "No services available"}`;
                infoElement.classList.toggle("hidden");
            } catch (error) {
                console.error("Error fetching details:", error);
            }
        }
    });

    document.getElementById("login-icon").addEventListener("click", () => {
        document.getElementById("login-form").classList.toggle("hidden");
    });

    document.getElementById("login-btn").addEventListener("click", () => {
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();

        if (username && email) {
            document.getElementById("greeting").textContent = `Hello, ${username.split(" ")[0]}`;
            document.getElementById("login-form").classList.add("hidden");
        } else {
            alert("Please enter both your name and email.");
        }
    });

    await fetchShelters();
});
