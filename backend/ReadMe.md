# MyMails

MyMails is a user-friendly email scheduler application designed to empower individuals with efficient email workflow management. It surpasses basic email sending functionalities by offering a focused set of features to enhance communication and save time.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [.env Configuration](#env-configuration)
- [Routes](#routes)
  - [Save User](#save-user)
  - [Send OTP](#send-otp)
  - [Verify OTP](#verify-otp)
  - [Save Passkey](#save-passkey)
- [Sample Requests and Responses](#sample-requests-and-responses)

## Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MongoDB Atlas account (or local MongoDB server)

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/mymails.git
   cd mymails
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure it (see [.env Configuration](#env-configuration) below).

4. Start the server:
   ```bash
   npm start
   ```

## .env Configuration

Create a `.env` file in the root directory and add the following variables:

```
MONGODB_URI=mogodb_connection_string
JWT_SECRET_KEY=your_secret_key
ENCRYPTION_KEY=your_encryption_key
EMAIL_USER=your_email_address
EMAIL_PASS=app_password
```

## Routes

### Save User

**Endpoint:** `/api/users/saveUser`

**Method:** `POST`

**Description:** Save user data (sign up or log in) and return a JWT token.

**Request Body:**

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "oauthId": "unique-oauth-id"
}
```

**Response:**

```json
{
  "token": "jwt-token",
  "message": "User saved successfully"
}
```

### Send OTP

**Endpoint:** `/api/users/sendOTP`

**Method:** `POST`

**Description:** Send an OTP to the user's email.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "message": "OTP sent successfully"
}
```

### Verify OTP

**Endpoint:** `/api/users/verifyOTP`

**Method:** `POST`

**Description:** Verify the OTP sent to the user's email.

**Request Body:**

```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response:**

```json
{
  "message": "OTP verified successfully"
}
```

**Error Responses:**

- Invalid OTP:

  ```json
  {
    "message": "Invalid OTP"
  }
  ```

- OTP expired:
  ```json
  {
    "message": "OTP expired"
  }
  ```

### Save Passkey

**Endpoint:** `/api/users/savePassKey`

**Method:** `POST`

**Description:** Save an encrypted passkey for the user. This route is protected by authentication.

**Request Headers:**

```json
{
  "Authorization": "Bearer jwt-token"
}
```

**Request Body:**

```json
{
  "passkey": "your-secure-passkey"
}
```

**Response:**

```json
{
  "message": "Passkey saved successfully"
}
```

## Sample Requests and Responses

### Save User

**Request:**

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "oauthId": "unique-oauth-id"
}
```

**Response:**

```json
{
  "token": "jwt-token",
  "message": "User saved successfully"
}
```

### Send OTP

**Request:**

```json
{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "message": "OTP sent successfully"
}
```

### Verify OTP

**Request:**

```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response:**

```json
{
  "message": "OTP verified successfully"
}
```

### Save Passkey

**Request Headers:**

```json
{
  "Authorization": "Bearer jwt-token"
}
```

**Request:**

```json
{
  "passkey": "your-secure-passkey"
}
```

**Response:**

```json
{
  "message": "Passkey saved successfully"
}
```

---

By following this documentation, you should be able to set up and use the MyMails backend server effectively. If you encounter any issues or have any questions, please refer to the project's issue tracker or contact the project maintainer.

```

This `README.md` file provides comprehensive documentation for setting up the MyMails project, configuring the environment, and using the API routes with example requests and responses. Adjust the repository URL and other specific details as needed.
```
