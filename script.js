

document.addEventListener("DOMContentLoaded", async () => {
    let sheltersData = [];
    const URL = "http://localhost:3000/shelters";

    async function fetchShelters() {
        try {
            const response = await fetch(URL);
        
            const rawData = await response.text();
            console.log("Raw Response:", rawData);
    
            sheltersData = JSON.parse(rawData);
            console.log("Parsed Data:", sheltersData);

            displayListings(sheltersData);
            populateDropdown(sheltersData);
        } catch (error) {
            console.error("Error fetching shelters:", error);
        }
    }
    

    function displayListings(shelterList) {
        const container = document.getElementById("listings-container");
        container.innerHTML = "";

        shelterList.forEach(shelter => {
            const listing = document.createElement("div");
            listing.classList.add("listing");

            listing.innerHTML = `
                <img src="${shelter.image}" alt="${shelter.name}">
                <div class="description">
                    <h3>${shelter.name}</h3>
                    <p><strong>Location:</strong> ${shelter.location}</p>
                    <p><strong>Listing Agent:</strong> ${shelter.listingagent}</p>
                    <p><strong>Type:</strong> ${shelter.type}</p>
                    <p><strong>Price:</strong> ${shelter.price ? `Ksh ${shelter.price}` : "Free"}</p>
                    <button class="services-button" data-id="${shelter.id}">View Details</button>
                    <p class="services-info hidden"></p>
                </div>
            `;

            container.appendChild(listing);
        });

        document.querySelectorAll(".services-button").forEach(button => {
            button.addEventListener("click", async function () {
                const shelterId = this.getAttribute("data-id");
                const servicesInfo = this.nextElementSibling;

                if (!servicesInfo.textContent) {
                    await fetchServices(shelterId, servicesInfo);
                }
                servicesInfo.classList.toggle("hidden");
            });
        });
    }

    async function fetchServices(shelterId, servicesInfoElement) {
        try {
            const response = await fetch(`${URL}/${shelterId}`);
            if (!response.ok) throw new Error("Failed to fetch services");

            const shelter = await response.json();
            const services = shelter.services ? shelter.services : "No services available";

            servicesInfoElement.textContent = `Services: ${services}`;
        } catch (error) {
            console.error("Error fetching services:", error);
            servicesInfoElement.textContent = "Error loading services.";
        }
    }

    function getUniqueTypes(shelters) {
        return [...new Set(shelters.map(shelter => shelter.type))];
    }

    function populateDropdown(shelters) {
        const dropdownList = document.getElementById("dropdown-list");
        dropdownList.innerHTML = "";
        const types = getUniqueTypes(shelters);
        types.forEach(type => {
            const link = document.createElement("a");
            link.textContent = type;
            link.onclick = () => filterByType(type);
            dropdownList.appendChild(link);
        });
    }

    function filterByType(type) {
        const filteredShelters = sheltersData.filter(shelter => shelter.type === type);
        displayListings(filteredShelters);
    }

    document.querySelector(".dropdown-button").addEventListener("click", function () {
        document.getElementById("dropdown-list").style.display =
            document.getElementById("dropdown-list").style.display === "block" ? "none" : "block";
    });

    window.addEventListener("click", function (event) {
        if (!event.target.matches(".dropdown-button")) {
            document.getElementById("dropdown-list").style.display = "none";
        }
    });

    document.getElementById("search-bar").addEventListener("input", () => {
        filterListings();
    });

    function filterListings() {
        const searchInput = document.getElementById("search-bar").value.toLowerCase();
        const filteredShelters = sheltersData.filter(shelter =>
            shelter.name.toLowerCase().includes(searchInput) ||
            shelter.location.toLowerCase().includes(searchInput) ||
            shelter.type.toLowerCase().includes(searchInput)
        );
        displayListings(filteredShelters);
    }

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

        displayListings(filteredShelters);
    }

    document.getElementById("login-icon").addEventListener("click", () => {
        document.getElementById("login-form").classList.toggle("hidden");
    });

    document.getElementById("login-btn").addEventListener("click", () => {
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();

        if (username && email) {
            const firstName = username.split(" ")[0];
            document.getElementById("greeting").textContent = `Hello, ${firstName}`;
            document.getElementById("login-form").classList.add("hidden");
        } else {
            alert("Please enter both your name and email.");
        }
    });
    document.getElementById("listings-container").addEventListener("mouseover", (event) => {
        if (event.target.closest(".listing")) {
            event.target.closest(".listing").style.transform = "scale(1.05)";
            event.target.closest(".listing").style.transition = "transform 0.3s ease-in-out";
        }
    });
    
    document.getElementById("listings-container").addEventListener("mouseout", (event) => {
        if (event.target.closest(".listing")) {
            event.target.closest(".listing").style.transform = "scale(1)";
        }
    });
    
    
    fetchShelters();
});

    




