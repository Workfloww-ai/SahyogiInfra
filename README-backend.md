# SahYogi InfraCare Backend Setup

This is a simple Python Flask backend designed to handle contact form submissions from the React application and forward them to your email using Gmail SMTP.

## Prerequisites
- Python 3.7+ installed on your machine.
- A Gmail account to use for sending emails.

## Step 1: Create a Gmail App Password
Google requires an "App Password" to allow third-party applications (like this Flask server) to send emails via SMTP, especially if you have Two-Factor Authentication (2FA) enabled.

1. Go to your [Google Account Manager](https://myaccount.google.com/).
2. Navigate to **Security** on the left menu.
3. Under "How you sign in to Google," make sure **2-Step Verification** is turned on.
4. Search for "App Passwords" in the search bar at the top, or click on 2-Step Verification and scroll down to the bottom to find **App passwords**.
5. Select "Other (Custom name)" from the "Select app" dropdown, and name it something like `Flask Backend`.
6. Click **Generate**.
7. Google will show you a 16-character password in a yellow box. **Copy this password** (you won't be able to see it again).

## Step 2: Install Dependencies
Open your terminal, navigate to the `backend` directory, and install the required Python packages:

```bash
cd backend
pip install -r requirements.txt
```
*(It is highly recommended to use a virtual environment like `python -m venv venv` and `source venv/bin/activate` before installing).*

## Step 3: Create the `.env` File
In the `backend` directory, there is a file named `.env.example`. 

1. Copy it to a new file named `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and fill in your details:
   - `GMAIL_USER`: Your Gmail address (e.g., `your.email@gmail.com`)
   - `GMAIL_APP_PASSWORD`: The 16-character password you generated in Step 1 (no spaces).
   - `RECIPIENT_EMAIL`: The email address where you want to receive the form submissions.

**Note:** Never commit the `.env` file to version control (GitHub, etc.).

## Step 4: Run the Server Locally
To start the Flask backend:

```bash
python app.py
```
The server will start running on `http://localhost:5000`. It is now ready to receive `POST` requests from your React application.

## Step 5: Updating the React Fetch URL for Production
Currently, the React application is configured to send requests to `http://localhost:5000/contact`. 

When you deploy your application to production (e.g., deploying Flask to Render, Heroku, or PythonAnywhere):
1. You will get a production URL for your backend (e.g., `https://sahyogi-backend.onrender.com`).
2. Open `src/App.tsx` in your React project.
3. Locate the `handleSubmit` function where the `fetch` call is made.
4. Change `http://localhost:5000/contact` to your new production URL:
   ```javascript
   const response = await fetch('https://sahyogi-backend.onrender.com/contact', {
     // ...
   });
   ```
5. Build and deploy your React frontend.
