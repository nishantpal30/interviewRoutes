# InterviewRoute Backend

## Setup

From the repository root, enter the backend folder and install its dependencies:

```bash
cd Backend
npm install
```

Create a `.env` file in this folder and set the variables below:

The backend reads these environment variables:

- `PORT` (optional; defaults to `3001`)
- `DATABASE_URI` (required MongoDB connection string)
- `JWT_SECRET_KEY` (required secret used to sign and verify login tokens)
- `EMAIL_USER` and `EMAIL_PASS` (required to send email verification and
  password reset codes; for Gmail, use an app password)
- `EMAIL_FROM` and `SUPPORT_EMAIL` (optional email sender and reply address)

Start the development server with:

```bash
npm run dev
```

Start it without the file watcher with:

```bash
npm start
```

The authentication API is available under `/api/auth`.
