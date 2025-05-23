# 🏫 School Locator API

A RESTful Node.js and Express API that allows you to add schools with geolocation and fetch them sorted by distance from a given point. Ideal for location-based school listing applications.

---

## 🚀 Features

- Add a school with name, address, latitude, and longitude.
- Retrieve a list of all schools sorted by proximity to a given location.
- Uses MySQL for data storage.
- Distance calculated using Haversine formula.

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MySQL
- Postman (for testing)
- Railway (for DB hosting)

---

## 📁 Folder Structure

```
.
├── index.js         # Entry point for Express server
├── db.js            # MySQL database connection setup
├── .env             # Environment variables
└── README.md        # This documentation
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Bunny-777/School-api.git
cd School-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add environment variables

Create a `.env` file:
```
MYSQL_URL=mysql://<username>:<password>@<host>:<port>/<database>
PORT=3000
```

Example:
```
MYSQL_URL=mysql://root:password@localhost:3306/schools
PORT=3000
```

### 4. Start the server
```bash
node index.js
```

---

## 🧪 API Endpoints

### ➕ Add a School
**POST** `/addSchool`

**Request Body:**
```json
{
  "name": "Delhi Public School",
  "address": "RK Puram, New Delhi",
  "latitude": 28.5613,
  "longitude": 77.1830
}
```

**Response:**
```json
{
  "message": "Added",
  "id": 1
}
```

---

### 📍 List Schools by Proximity
**GET** `/listSchools?latitude=28.61&longitude=77.23`

**Response:**
```json
[
  {
    "id": 1,
    "name": "Delhi Public School",
    "address": "RK Puram, New Delhi",
    "latitude": 28.5613,
    "longitude": 77.183,
    "distance": 5.8
  },
  ...
]
```

---

## 🗂️ Database Schema

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  address TEXT,
  latitude DOUBLE,
  longitude DOUBLE
);
```

---

## 📬 Postman Collection

You can import the Postman collection via this shared link:  
**[Postman Collection Link](https://bunny-63439.postman.co/workspace/Bunny's-Workspace~55747ebd-b694-4ae5-886e-aa45ccc39a1b/collection/45217689-33adcdca-f2fe-4bb7-b597-5aa4e1ad289b?action=share&creator=45217689)**  

---

## 🌐 Live API

You can access the live API at:  
**https://api-d3s3.onrender.com/**  


---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)
