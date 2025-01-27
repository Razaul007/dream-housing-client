# DreamHouzing

DreamHouzing is a web-based platform designed for seamless property buying, selling, and management. It connects property owners, agents, and buyers to create an intuitive real estate experience.

## Features
- **Property Listings**: Browse detailed property information with images, prices, and locations.
- **Wishlist Functionality**: Users can add properties to their wishlist for future reference.
- **Role-Based Access**:
  - **User**: Can browse and buy properties.
  - **Agent**: Can list and manage properties.
  - **Admin**: Manages the platform and users.
- **Search and Filter**: Search properties by location, price range, or type.
- **Authentication**: Secure login and registration system.

## Tech Stack
### Frontend
- React.js
- Tailwind CSS
- DaisyUI
- Axios (for API requests)
- React Toastify (for notifications)

### Backend
- Node.js
- Express.js
- MongoDB (native driver for database operations)
- JWT (for authentication)

### Additional Libraries
- React Router (for routing)
- TanStack Query (for API data fetching)

## Installation

### Prerequisites
- Node.js (v14 or above)
- MongoDB (local or cloud-based)

### Steps to Set Up Locally
1. Clone the repository:
   ```bash
   git clone `https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Razaul007`
   `https://github.com/Programming-Hero-Web-Course4/b10a12-server-side-Razaul007`

   ```
2. Navigate to the project folder:
   ```bash
   cd DreamHouzing
   ```
3. Install dependencies for the frontend and backend:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with the following environment variables:
   ```env
   VITE_API_URL=http://localhost:5000
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=your_mongodb_connection_string
   ```


## Usage
1. Visit the website at `https://dream-houzing.web.app/`.
2. Register as a new user or log in.
3. Browse available properties and interact with the platform based on your role (user, agent, or admin).
4. Add properties to your wishlist or manage your listed properties.

## Folder Structure
```
DreamHouzing/
├── backend/                # Backend API logic
│   └── index.js        # Main server file
├── frontend/               # React frontend
│   └── src/
│       ├── components/ # Reusable components
│       ├── pages/      # Pages for routing
│       ├── styles/     # Tailwind and DaisyUI setup
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

## API Endpoints
### Wishlist
- **POST /wishlist**: Add a property to the wishlist (only for users)
  - Request Body:
    ```json
    {
      "id": "propertyId",
      "customer": {
        "id": "userId",
        "email": "user@example.com",
        "name": "User Name",
        "image": "userImageUrl"
      },
      "image": "propertyImageUrl",
      "title": "Property Title",
      "location": "Property Location",
      "agent": {
        "name": "Agent Name",
        "email": "agent@example.com",
        "image": "agentImageUrl"
      },
      "status": "pending",
      "minPrice": 5000,
      "maxPrice": 6000
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "message": "Property added to wishlist successfully."
    }
    ```

## Contributing
We welcome contributions! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries or feedback, please reach out to:
- **Name**: Muhammad Razaul Alam
- **Email**: razafulalam05@gmail.com

