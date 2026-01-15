# News Aggregator API

A RESTful API built with **Node.js** and **Express.js** that allows users to register, log in, manage news preferences, and fetch personalized news articles using the **GNews API**.

## Features

- **User Authentication**: Secure signup and login using **JWT (JSON Web Tokens)**.
- **Password Security**: Passwords are hashed using **bcrypt**.
- **News Preferences**: Users can set unique preferences (e.g., "movies", "technology").
- **Personalized News**: Fetches news based on user preferences. Defaults to 'general' news if no preferences are set.
- **Architecture**: Clean **Controller-Service-Route** architecture.
- **Testing**: Comprehensive test suite using **TAP** and **Supertest**.
- **Request Tracking**: Middleware to log incoming requests.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JsonWebToken (JWT), Bcrypt
- **External API**: Axios (consuming GNews API)
- **Testing**: Tap, Supertest
- **Utilities**: Dotenv

## Prerequisites

- Node.js (v18 or higher)
- npm
- A generic news API key (Get one for free at [GNews.io](https://gnews.io/))

## Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd news-aggregator-api-GAUTAM2349
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory and add the following variables:

    ```env
    JWT_SECRET=your_super_secret_jwt_key
    GNEWS_API_KEY=your_gnews_api_key
    # Optional: Override base URL if needed
    # GNEWS_BASE_URL=https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&apikey=
    ```

## Usage

1.  **Start the server**:
    ```bash
    node app.js
    ```
    The server runs on `http://localhost:3000`.

2.  **Run Tests**:
    ```bash
    npm test
    ```

## API Endpoints

### generic

#### `POST /users/signup`
Register a new user. Returns a JWT token immediately.

**Body:**
```json
{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "securepassword",
    "preferences": ["technology", "ai"]
}
```

#### `POST /users/login`
Authenticate a user and receive a JWT token.

**Body:**
```json
{
    "email": "jane@example.com",
    "password": "securepassword"
}
```

#### `GET /users/preferences`
Get the logged-in user's news preferences.
*Header:* `Authorization: Bearer <token>`

#### `PUT /users/preferences`
Update the logged-in user's news preferences.
*Header:* `Authorization: Bearer <token>`

**Body:**
```json
{
    "preferences": ["sports", "finance"]
}
```

### News

#### `GET /news`
Fetch news articles based on the logged-in user's preferences.
*Header:* `Authorization: Bearer <token>`

## Project Structure

```
.
├── controllers/      # Request handlers (User, News)
├── middlewares/      # Express middlewares (Auth, Logger)
├── routes/           # API route definitions
├── services/         # Business logic (JWT, News Fetching)
├── test/             # Test suite
├── app.js            # App entry point
└── package.json
```
