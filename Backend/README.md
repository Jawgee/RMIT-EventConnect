# How to run

Install [XAMPP](https://www.apachefriends.org/)

If not already installed, get [Node.js](https://nodejs.org/en) (with npm)

### Run XAMPP and create DB

If you did not choose to create a desktop shortcut, navigate to the XAMPP directory and run:

```
xampp-control.exe
```

XAMPP control panel will open, under the "actions" column on the right side, start both the Apache and MySQL modules

After both are running, navigate to the "Admin" action button for the MySQL module, this should open up `http://localhost/phpmyadmin/` in the browser, this is the phpMyAdmin dashboard.

To the left you should see a list of databases. Create a new database for our backend by clicking on "New" at the top of the list.

On this new page set the database name to "test", leave the rest of the settings as they are and click "Create" on the right.

This will create the database, do not make a table when prompted as it will be done for you when we start the backend for the first time.

### Run node app

Navigate to the backend directory, and install the dependencies with `npm install`.

Then just start the app with node

```
node app.js
```

Navigate to [localhost on port 4000](http://localhost:4000/), where you should get a message stating "Testing connection to port 4000".

Current routes:

User Routes
- GET: `/Users`
- GET: `/Users/:id`
- GET: `/Users/Email/:email`
- GET: `/Users/Events/:id`
- POST `/Users/Register`
- POST `/Users/Enlist/:id`
- PUT `/:id`
- DELETE `/:id`
Login Routes
- POST: `/Users/Login`
Event Routes
- GET: `/Events`
- GET: `/Events/:id`
- GET: `/Events/Attendees/:id`
- PUT `/Events/:id`
- POST `/Events`
- POST `/Events/AddAttendee/:id`
- DELETE `/Events/:id`
Tag Routes
- GET: `/Tags/UserByTag/:column/:bool`
- GET: `/Tags/UserTagList/:user_id`
- GET: `/Tags/EventTagList/:event_id`
- PUT: `/Tags/UserInterests/:user_id`
- PUT: `/Tags/EventTags/:event_id`
Enlist Routes
- GET `/Enlist/Attendees/:event_id`
- GET `/Enlist/Events/:user_id`
- POST `/Enlist/`
- DELETE `/Enlist/`

:sunglasses:
