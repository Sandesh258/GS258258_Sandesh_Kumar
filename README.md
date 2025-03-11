# Data Viewer
This project is a React-based web application developed to manage and analyze data related to stores, SKUs, planning, and charts. 
The app is built using Vite for faster development and optimized production builds.

# Prerequisites
Node.js: Ensure you have Node.js installed on your machine.
Git: Make sure you have Git installed. 
NPM (Node Package Manager): NPM is bundled with Node.js, and it helps manage the dependencies of your project. 
IDE (Integrated Development Environment): Although you can use any code editor, it’s recommended to use an IDE that supports React development. 
Popular choices include: Visual Studio Code

# Setup
Clone the repository to your local machine :-  
    command: git clone https://github.com/your-username/data-viewer.git
    command: cd data-viewer
Install the required dependencies: 
    command: npm install
Run the app locally:
    command: npm run dev
Open your browser and navigate to http://localhost:5173/ to see the app in action.


# Key Features and Proficiency Demonstration
1. CRUD Operations for Stores and SKUs
Store Page: Allows users to add, delete, update, and reorder stores. This was implemented using React state management and forms.

3. SKU Page: Supports full CRUD functionality for SKU data (Price, Cost), demonstrating proficiency in handling data and forms in React.

4. Planning Page with AG-Grid
I implemented AG-Grid to handle large datasets efficiently. The Planning page allows for calculations based on sales units, GM dollars, GM percentage, and conditional formatting for the grid.

5. Charts for Data Visualization
Two charts were implemented for better understanding of data:
GM % vs GM Dollars for visualizing the profit percentage.
Total Sales Units to track sales.
I utilized AG-Charts for this implementation.

# Responsive Layout and Styling
The app uses Bootstrap for layout and responsiveness. It ensures that the design is accessible across various devices with a minimum width of 1080 pixels.

# Deployment on Netlify
The app is deployed on Netlify. 
Below is the link : dataviewer258.netlify.app

# Improvements in case of  Extra Time
If I had an additional 4 hours, I would:

Implement JWT Authentication:
Secure the app with JWT-based authentication and OAuth2 authorization for better security.
File Uploading:
Add functionality to allow users to upload data (e.g., CSV or Excel files) to populate the grid and charts dynamically.
Improve UI/UX Design:
Enhance the user interface by refining the components and adding more intuitive interactions, animations, and transitions.
Make the application more visually appealing by using custom icons, buttons, and additional styling.
Unit Testing:
Implement Jest-based unit tests for critical components and business logic, ensuring better maintainability and fewer bugs.
Error Logging
Introduce an error logging mechanism to track errors and warnings throughout the app for easier debugging in production.


# Feedback on the Challenge
The challenge was an excellent learning experience! However, a few suggestions for improvement:

Clearer Data Definitions:
It would have been helpful if the challenge provided clearer definitions for data and how it should be structured, especially for dimensions and measures like Stores and SKUs.

Authentication Scope:
More detailed instructions or recommendations on implementing authentication would be great, as it's a crucial part of securing the app.
Sample Data Integration:

Including more sample data or an API to fetch real-time data would add more realism and allow the app to be tested with actual data.

Icons were not present for the SKU's , Store , Planning and Chart.


