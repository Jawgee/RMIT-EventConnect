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

:sunglasses:
