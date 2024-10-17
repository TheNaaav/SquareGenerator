SquareGrid Project
This project is a simple application that generates squares with random colors. The frontend is built with React.js, and the backend is built with .NET/C#. The backend saves the squares' position and color in a JSON file and restores them when the page is reloaded.

Prerequisites
Make sure you have the following installed:

Node.js (for frontend)
.NET SDK (for backend)
npm or yarn (for package management)
Setup Instructions
1. Clone the repository
bash
Copy code
git clone https://github.com/TheNaaav/SquareGenerator.git
cd SquareGenerator
2. Install dependencies
Frontend
Go to the frontend folder and install the dependencies:

bash
Copy code
cd frontend
npm install
Backend
Go to the backend folder and restore the .NET dependencies:

bash
Copy code
cd ../backend
dotnet restore
3. Running the project
You can run both the frontend and backend at the same time using a single command.

In the root folder of the project, run the following command:

bash
Copy code
npm start
This will:

Start the React frontend
Start the .NET backend API
4. Accessing the application
Once both servers are running, open your browser and go to:

arduino
Copy code
http://localhost:3000
The application will be available at this address.

Project Structure
frontend: Contains the React.js code for the user interface.
backend: Contains the .NET API that handles the saving and loading of squares.
Troubleshooting
Make sure both the frontend and backend ports (3000 for React and 5000 for .NET API) are not being blocked by another process.
If you run into issues with dependencies, try deleting the node_modules folder and running npm install again.
