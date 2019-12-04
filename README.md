# MyFootPrints
> A web app for creating travel logs with corresponding markers placing on google map. So far it provides date/location, image carousels and description display.
> This project is still working in progress for other features.

Build with:
- Next.js: a react framework supporting servide-side rendering out of box
- Firebase as server/firestore/storage/hosting service
- Firebase authentication
- Material UI
- Redux
- Google-map-react
- OpenCage Geocoding API

## Demo





## Deployment setup

I didn't find enough information on firebase website about how to deploy Next.js.

The below is what I had learned from the forums of github/stackoverflow I had visited.
Not sure if it'll be modified anytime soon, but hoping it's still helpful!

## Table of Contents

1. [Folder structure](#Folder-structure)

2. [Instructions](#Instructions)
  - [Create a Firebase project](#1.-Create-a-Firebase-project)
  - [Create all the folders as above](#2.-Create-all-the-folders-as-above)
  - [Work on functions directory](#3.-Work-on-functions-directory)
  - [Work on dist directories](#4.-Work-on-dist-directories)
  - [Create build for Next.js project](#5.-Create-build-for-Next.js-project)
  - [Ready to deploy](#6.-Ready-to-deploy)


### Folder structure

```
 ├── dist (folder) ├── functions (folder) ├── next (folder)
                   ├── public (folder)
 ├── functions (folder) ├── index.js
 ├── public (folder)
 ├── src (folder)
 ├── firestore.indexes.json
 ├── firestore.rules
 ├── storage.rules
 ├── firebase.json
 ├── package-lock.json
 ├── package.json
```
##### [Go to top](#MyFootPrints)
### Instructions

#### 1. Create a Firebase project
  - Create a folder for firebase project. ex: firebaseApp
  - Initialize pacakge.json
     ```npm init```
     or
     ```yarn init```
  - Install firebase-tools globally
     ```npm install -g firebase-tools```
  - Login to Firebase CLI
    ```firebase login```
    - make sure you have created google account
  - Initialize Firebase project
     ```firebase init```
     - I select Firestore, Functions, Hosting, Storage
     - I select an existing project created in the Firebase web console
     - I select firestore.rules
     - I select firestore.indexes.json
     - I select javascript
     - I select No for using ESLint
     - I select to install dependencies now
     - I select public as my public directory
     - I select the storage.rules
  - What should we have now?
     - firebase.json, .firebaserc, all the rules I've selected, a functions directory, a public directory
  - Modify the path of hosting/functions for Firebase cloud functions in firebase.json
    ```
      "hosting": {
        "public": "dist/public",
       "rewrites": [
         {
          "source": "**/**",
          "function": "next"
         }
        ]
        },
       "functions": {
          "source": "dist/functions"
        }
    ```
##### [Go to top](#MyFootPrints)
#### 2. Create all the folders as above
   So we need to create dist and src directory at this point.
  - dist: for deployment. Create public and functions directories in it.
  - functions: firebase functions. We need it to deploy our Next.js.
  - public: for static files such as images.
  - src: for the source files of Next.js project. Just place the whole thing in it.
##### [Go to top](#MyFootPrints)

#### 3. Work on functions directory.
   (the one created by Firebase CLI)
   It has installed some Firebase cloud function related modules already.
   Since it's going to use its dependencies to work with our build release from source code, I found it doesn't work if I don't install all my dependencies I need for my source code.
  - Install all the dependencies of my app's source code in functions directory
  - Work on index.js. It is the cloud function to serve my app.

    ```
    const functions = require('firebase-functions');
    const express = require('express');
    const cors = require('cors');
    const path = require('path')
    const admin = require('firebase-admin')
    const next = require('next');
    const dev = process.env.NODE_ENV !== 'production'
    const app = next({dev, conf: {distDir: `${path.relative(process.cwd(), __dirname)}/next`}});
    const handle = app.getRequestHandler();
    admin.initializeApp()
    exports.next = functions.https.onRequest(async (req, res) => {
    console.log('File: ' + req.originalUrl); // log the page.js file that is being requested
    await app.prepare();
    handle(req, res);
    });
    ```
##### [Go to top](#MyFootPrints)
#### 4. Work on dist directories
  - Copy package.json, package-lock.json, index.js to dist/functions
  - Install all the dependendcies in dist/functions by ```npm install```
  - Copy everything in public folder to dist/public
##### [Go to top](#MyFootPrints)
#### 5. Create build for Next.js project
  - Go to src folder. Create next.config.js and add distDir
  ```
  module.exports = {
  distDir: '../dist/functions/next'
  }
  ```
  - use  ```next build```
 create build  or
    use ```npm run build```
  and put the script in package.json
  - Make sure it will create a next folder under dist/functions
##### [Go to top](#MyFootPrints)
#### 6. Ready to deploy
  - Go to firebaseApp folder
  - Test by firebase serve
  Set the following script in package.json
  ```
  "serve": "NODE_ENV=production firebase serve",
  ```
  - Firebase deploy
  Just run ```firebase deploy```
  or place it in package.json as a script
##### [Go to top](#MyFootPrints)
