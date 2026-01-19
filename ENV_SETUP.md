# Environment Setup

To enable Firebase authentication, create a `.env.local` file in the project root with the following content:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBn0nbZ1XQsxkiD9Cefj_FTGNpK3VhTpMY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=kyozoverse.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=kyozoverse
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=kyozoverse.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1061297794599
NEXT_PUBLIC_FIREBASE_APP_ID=1:1061297794599:web:23a0dd107dc36cff44a802
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-33S7RT90CJ
```

After creating the file, restart the development server:

```bash
pnpm dev
```
