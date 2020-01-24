# ContactManagerMERN

### Installing a local development copy of the web app

To create your own local copy for development (on Linux):

1) Clone the git repo to a local folder
```
git clone https://github.com/devon-gadarowski/ContactManagerMERN.git
```
2) Install NodeJS
```
sudo apt-get install nodejs
sudo apt-get install npm
sudo npm install -g n
```
3) Install nodemon (a tool for our express server)
```
sudo npm install -g nodemon
```
4) Change Directory to the ContactManagerMERN app and install express, mongodb, and body-parser
```
cd ContactManagerMERN/
sudo npm install
sudo npm install express --save
sudo npm install body-parser
sudo npm install mongodb
```
Note: You should now be able to start the express server using the following:
```
npm start
```
The express server will serve our react app to the client browser. Check localhost:8000 in your browser to see the app working. You should see the following message:
```
Error: ENOENT: no such file or directory, stat '/home/devon/Desktop/classes/COP4331/ContactManagerMERN/frontend/build/index.html'
```
5) Now we need to install our react modules inside the frontend directory.
```
cd frontend/
npm install react react-scripts react-dom react-router-dom
```
6) Now build the react frontend by running the following inside the frontend directory. React will need to be rebuilt everytime changes are made to the frontend.
```
npm run build
```
7) You should now be able to start the express server and see the app in action by accessing localhost:8000 in your browser.
```
cd ..
npm start
```

### App organization

The Contact Manager web app is organized in two parts:

1) The express server
   - The express server handles all of our server-side logic. When client browsers request webpages, the express server processes those initial requests and responds with react pages or other data.
   - The express server lives in the root of our app directory, with server.js as its main file.
   - The express server also hosts our database API, located inside server.js
2) The react client
   - The react client defines our web app's structure. After the express server delivers the react app to the client's browser, react handles page routing and makes requests to the API.
   - Our react app is located inside the frontend directory. Most of working end of the react app is located inside frontend/src.
   - App.js is the main program for react, where we can define page routing. The react UI is made up of components and pages, which are located inside the components directory and the pages directory, respectively.
