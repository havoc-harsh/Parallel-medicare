

# 🏥 MediCare

MediCare is a modern healthcare management system designed to streamline medical appointments, patient records, and doctor consultations. This platform bridges the gap between patients and healthcare providers through an intuitive and secure interface.

---

## 🌟 Features

- 💡 **Appointment Scheduling** — Book appointments with ease.
- 🧾 **Electronic Health Records** — Store and manage patient medical history securely.
-   **RAG Based Chatbot** - Talks about all your general non professional medical query.
-   **Emergency Healthcare Features** - Book emergency services at go
-   **Map Integration** - Find healthcare providers visually on maps

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/parallel-medicare.git
   ```
2. Navigate to the project directory:
   ```bash
   cd parallel-medicare
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
# Environment Variables

This project requires several environment variables to be set up for proper functionality. Below is a list of the required variables and their descriptions.

## Required Environment Variables

1. **JWT_SECRET**
   - **Description**: Secret key used for signing JSON Web Tokens.
   - **Example**: 
     ```plaintext
     JWT_SECRET="your_jwt_secret"
     ```

2. **COOKIE_SECRET**
   - **Description**: Secret key used for signing cookies.
   - **Example**: 
     ```plaintext
     COOKIE_SECRET="your_cookie_secret"
     ```

3. **DATABASE_URL**
   - **Description**: Connection string for the PostgreSQL database.
   - **Example**: 
     ```plaintext
     DATABASE_URL="postgresql://username:password@localhost:5432/medicare"
     ```

4. **NEXTAUTH_URL**
   - **Description**: The URL of your application for NextAuth.js.
   - **Example**: 
     ```plaintext
     NEXTAUTH_URL="http://localhost:3000"
     ```

5. **NEXTAUTH_SECRET**
   - **Description**: Secret key used for NextAuth.js.
   - **Example**: 
     ```plaintext
     NEXTAUTH_SECRET="your_nextauth_secret"
     ```

6. **NEXT_PUBLIC_MAPBOX_TOKEN**
   - **Description**: Token for accessing Mapbox services.
   - **Example**: 
     ```plaintext
     NEXT_PUBLIC_MAPBOX_TOKEN="your_mapbox_token"
     ```

## Setting Up Environment Variables

1. Create a `.env` file in the root of your project.
2. Copy the following template into the `.env` file and replace the placeholder values with your actual credentials:
   ```plaintext
   JWT_SECRET="your_jwt_secret"
   COOKIE_SECRET="your_cookie_secret"
   DATABASE_URL="postgresql://username:password@localhost:5432/medicare"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_nextauth_secret"
   ```

3. If you are using Mapbox, create a `.env.local` file and add your Mapbox token:
   ```plaintext
   NEXT_PUBLIC_MAPBOX_TOKEN="your_mapbox_token"
   ```

Make sure to keep your `.env` and `.env.local` files secure and do not share them publicly.

## Usage
To start the application, run:
```bash
npm run dev
```
Then, open your browser and go to `http://localhost:3000`.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.
