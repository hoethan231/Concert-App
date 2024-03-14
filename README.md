# Getting Started with Resonate!

## Description

Resonate is a simple full stack web-app that provide users with the lastest data on concerts in their area!
This app follows the MERN stack and is meant to be a good introduction into collaborative software development for the students!

## Getting started

### Front end
To begin, start by cloning the repository:

``git clone 'https://github.com/hoethan231/Concert-App'``

First we will be adding our API key in order to make requests to the ticketmaster API. 
This will allow us to get data on all concerts in the US. 

Navigate to the `/frontend` directiory by using the `cd frontend` cmd and add a file named `config.js` with the following code:

```
export const config = {

    concert_key : "XXXXXXXXXXXXXXXXXXXXXXXXXXX"
    
}
```

Ensure you replace the XXXXX placeholder with your actual key.

Then in the interminal run `npm i` in the terminal to install required dependencies:

``npm i``

### Back end

Next we need to set the *PORT* and the *DATABASE_URL* for our backend. \
If you want to purely work on the frontend, you can skip this part, but it still recommended to include.

Naviagte to the `/backend` directory with the `cd backend` cmd and again add a named `config.js` with the following code:
```
export const PORT = 5555;

export const mongoDBURL = 
    'mongodb+srv://admin:XXXXXXXXX@concert-app-db.zwlu1sq.mongodb.net/user-collection?retryWrites=true&w=majority&appName=Concert-App-DB';
```

Replace the placeholder XXXXX with a valid password to access the database.

Then in the interminal run `npm i` in the terminal to install required dependencies:

``npm i``

## Running

To run either the frontend or backend, you need to navigate to the folders using the `cd filepath` command to move into the folder. Then your commands will affect the files inside the folder. These are the following commands to startrun from the source directory:

### Inside frontend:
```
cd ./frontend
npm start
```
### Inside backend:
To run the backend: 
```
cd ./backend
npm run dev
```


