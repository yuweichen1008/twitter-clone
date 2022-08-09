This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, create .env.local contains KEYS ( reference .env.local.example )


```
NEXT_PUBLIC_FIREBASE_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_MESSAGING_SENDER_ID=
GOOGLE_APP_ID=
NEXTAUTH_URL=https://localhost:3000
NEXTAUTH_SECRET=test
```

## Next Auth

In order to make next auth work, we have to set NEXTAUTH_URL and NEXTAUTH_SECRET ( or define it in .env.local / .env) 

If you are using csh
```
setenv NEXTAUTH_URL https://localhost:3000
setenv NEXTAUTH_SECRET test
```
If you are using bash
```
export NEXTAUTH_URL=https://localhost:3000
export NEXTAUTH_SECRET=test
```

For more information, please go [next auth getting start](https://next-auth.js.org/getting-started/example)


## Run the development server


```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
