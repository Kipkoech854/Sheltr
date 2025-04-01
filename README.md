# Sheltr
a house finding application
# Shelter Listings Application

## Overview
This application helps users browse, search, and filter shelter listings based on location, type, and price. It also allows users to view additional shelter details and log in to personalize their experience.

## Features
- **Fetch and display shelters** from a JSON server.
- **Search shelters** by name, location, or type.
- **Filter shelters** by type using a dropdown menu.
- **Sort shelters** by price range.
- **View details** of a shelter including services offered.
- **Login functionality** to personalize the experience.

## Installation
### Prerequisites
- A local JSON server to serve shelter data.
- Basic HTML, CSS, and JavaScript knowledge.

### Steps to Set Up
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project folder:
   ```sh
   cd shelter-listings
   ```
3. Install JSON Server if not already installed:
   ```sh
   npm install -g json-server
   ```
4. Start the JSON Server:
   ```sh
   json-server --watch db.json --port 3000
   ```
5. Open `index.html` in a web browser.

## Usage
1. **View Shelter Listings:** Shelters are displayed upon loading the page.
2. **Search:** Enter keywords in the search bar to find specific shelters.
3. **Filter by Type:** Click on the dropdown to filter shelters by type.
4. **Filter by Price:** Use the buttons to filter shelters by price range.
5. **View More Details:** Click on "View Details" to see additional services.
6. **Login:** Click the login icon, enter your name and email to personalize your experience.

It serves as a platform in which listing agents use to list property.The clients reach out through the email or phone whereby they are connected to the agent.

## Technologies Used
- JavaScript (DOM manipulation, Fetch API)
- HTML & CSS
- JSON Server (for mock backend)

## Future Improvements
- Implement a user authentication system.
- Allow users to submit and review shelters.
- Add a more advanced filtering system.

## License
This project is open-source. Feel free to modify and use it as needed!

## Deployment links
https://celadon-salamander-75a68b.netlify.app/

the above is a deployment link using netlify

 https://kipkoech854.github.io/Sheltr/

 the above is the deployment link using github
