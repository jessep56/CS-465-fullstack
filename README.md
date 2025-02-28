## CS-465 Full Stack Development with MEAN

## Project Overview
This project is a full stack web application designed to serve both customer and administrative users. The customer-facing side allows users to browse available trips, while the admin panel provides the functionality to manage trip listings. The application includes a secure authentication system for admins to log in and perform CRUD (Create, Read, Update, Delete) operations on trips. The frontend is built using Angular as a single-page application (SPA), while the backend is powered by Express.js with a MongoDB NoSQL database.

## Architecture
The frontend development for this project involved different approaches. Initially, Express was used to serve static HTML and JavaScript, providing a basic interactive experience. However, to enhance the user experience, the application was transitioned into an Angular-based SPA. The SPA approach allows for dynamic updates without requiring full-page reloads, resulting in a smoother and more responsive user interface.

The backend utilizes Node.js with Express.js as the framework, and MongoDB as the database. A NoSQL database like MongoDB was chosen due to its flexibility in handling semi-structured trip data. Unlike relational databases, MongoDB allows for easy scalability and fast data retrieval, making it a good choice for managing trip-related information without requiring complex relationships between tables.

## Functionality
JSON plays a key role in bridging the frontend and backend by providing a standard format for data exchange. While JavaScript is used to manipulate data within the frontend, JSON structures the data that gets sent and received via API calls. This ensures that the frontend can easily interpret the data retrieved from the database and display it properly.

During development, code was refactored multiple times to improve efficiency and maintainability. One example was restructuring the trip-listing component to use reusable UI components for displaying trip details. This eliminated redundancy and made it easier to apply updates across multiple parts of the application. Another instance was optimizing API calls to reduce unnecessary requests, improving overall performance and responsiveness.

## Testing
API testing was performed to verify that the frontend and backend communicate correctly. I used Postman to send GET, POST, PUT, and DELETE requests to the API endpoints, ensuring that data was being retrieved and updated as expected. For example, I tested the login functionality by sending a POST request with user credentials and checking if a valid token was returned.

One challenge in testing was handling authentication-protected routes. Since some endpoints required an authorization token, I had to include the token in the headers of my requests in Postman. This helped confirm that only authenticated users could perform administrative actions like adding or editing trips. Additionally, testing involved simulating different scenarios, such as attempting to access admin features without logging in, to ensure that security measures were properly enforced.

## Reflection
This course has been a great learning experience, especially in understanding how frontend and backend systems work together. Before this, I had only a basic understanding of SPAs and REST APIs, but now I feel much more confident in building full stack applications. One of the most valuable skills I gained was working with authentication and security, which is a fundamental part of real-world web applications.

I also improved my ability to debug and test applications effectively. Using tools like Postman and browser dev tools helped me identify issues quickly and understand how different parts of the system interact. Overall, this project has given me hands-on experience with modern web development technologies, and I feel more prepared to apply these skills in future projects or job opportunities.
