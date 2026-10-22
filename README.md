# VC-268-EventConnect
## COSC2408 Programming Project 1
README: Innovent Code 

Figma: https://www.figma.com/design/MYoxjbP6WVEwxsQUYimoAS/Innovent?node-id=0-1&t=mO4Bxsflbeqd4PVC-1

This repository contains both the Frontend and the Backend code pertaining to the Innobound prototype.  

 

Release Notes: 

* Keep in mind that this is a prototype, and not the final application. 

 

Implemented (Frontend): 

- Logging in and Signing up through the backend 

- Selecting and editing of tags 

- Home page to view all events which exist 

- Profile page to view details 

- Edit profile page to edit details 

- Event view page to see details for a specific event 

 

Implemented but not visible to user: 

- Event creation page 

 

Implemented (Backend only): 

- Get events by user interest 

- Get all events a user is interested in 

 

Installation instructions: 

 

Running the frontend: 

Change into the frontend directory 

Run the following commands: 

- npm i -g @ionic/cli (if you haven't done this before on your machine) 

- npm i 

- ionic serve 

 

Running the backend: 

 

With the use of the cloud-hosted SQL: 

Change to the backend directory 

Run the following commands: 

- npm i 

- node app.js 

 

Without the use of the cloud-hosted SQL: 

Install XAMPP from https://www.apachefriends.org/ and make sure to install the Apache and MySQL modules. Run both modules. 

Change to the backend directory 

Run the following commands: 

- npm i 

- node app.js 

 

* Please make sure that the Frontend's config.js file points to the correct Backend HTTP URL, (should be localhost:4000/api without deployment of the backend) 

 

There is currently no active version of this code running. The cloud instances that were running to showcase to the client were turned off shortly after the client had tested it and there were other testers who gave feedback. This was not a permanent instance, due to this being a prototype. 
