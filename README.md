# Web-Dev-Final-Project-Team-13

---------------------------------------------------------------------

How to run:

Open 2 terminals, one for frontend and the other for backend, 
making sure both start in the root project directory

Before running anything, make sure you have Node and MongoDB installed
on your machine or else it will not work

---------------------------------------------------------------------



Frontend terminal:

cd Client

npm install

nmp start



Backend terminal:

cd Server

npm install

mkdir data

mongod --dbpath ./data

node server.js

NOTE: You only need to run mkdir and mongod commands if data folder
doesn't already exist