# BK TRAVEL WEB APPLICATION
A website designed for travel enthusiasts.
## Table of Contents
- Project Structure
- Project Functions
- Getting Started
    - Prerequisites
    - Installation
    - Running the Backend
    - Running the Frontend
    - Database Setup
- Usage
- Contributing
- License
## Project Structure
```
my-project/
│   README.md
│
├── backend/
│   ├── src/
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── database/
    ├── GR1_database.sql
    └── Data_insert.sql
```
## Project Functions
- User authentication (Sign in/Sign up)
- Tour search, booking, and rating.
- Pay online with VNPAY
- Destination search for travel locations.
- Real-time chat with customer service representatives.
- Inquiry submission via email.
- Admin and Staff management.
## Getting Started
### Prerequisites
- ***Java 11*** or higher
- ***Node.js*** (version 16 or higher)
- ***MySQL*** (recommend new versions)
### Installation
1. Clone this repository:
   ```
   git clone https://github.com/Aresky-T/GR1_DB_TRAVEL
   ```
2. Install backend dependencies:
   ```
   cd backend
   mvn clean install
   ```
3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```
### Running the Backend
   ```
   cd backend
   mvn spring-boot:run
   ```
### Running the Frontend
   ```
   cd frontend
   npm start
   ```
### Database Setup
1. Create a MySQL database
2. Update the database configuration in ```backend/src/main/resources/application.properties```.
3. Run the SQL scripts in ```database/GR1_database.sql``` and ```database/Data_insert.sql```.
## Usage
- Access the frontend at ```http://localhost:3000```
- Backend API endpoints are available at ```http://localhost:8080/api/v1```
## Deployment
- Access the domain: [https://bk-travel.vercel.app](https://bk-travel.vercel.app)
## Related Repository
- Access the github link: [https://github.com/Aresky-T/bk_travel_customer_support](https://github.com/Aresky-T/bk_travel_customer_support)
- The deployed domain: [https://bk-travel-customer-support.vercel.app/](https://bk-travel-customer-support.vercel.app/)
## Contributing
Contributing are welcome! Please create a pull request.
## License
This project is licensed under the HUST Lience - @2023 | all rights reserved.
  
