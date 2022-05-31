# Mock-Github-Friend-Ranking
Dashboard with a friend ranking report. The server side is implementing an async BFS using an async loop that relies on callbacks.<br/>
No data is stored in server, all information is fetched using a query to the mongo DB, including the BFS run on the graph.<br/>
I've implemented a graph instance, there is no need for the graph at the moment, I'm only using it for additional features I could add in the future.<br/>
The frontend is using x-data-grid by material ui for quick rendering with pagination and sorting on large data sets.<br/>
You may calculate multiple rankings at the same time but be aware that if you switch to a different page in the table, the requests would cancel themselves.<br/>
Be aware that all the data is fake (so don't attempt to enter the links).

# How to execute
If you got a zipped file of the project:
1. Unzip the file
2. Open two terminals in the root of the folder (the same directory as server.js):
<ul>
<li>
In the first terminal:
<ol>
<li>Enter <code>npm i</code>, wait for it to finish.</li>
<li>Run <code>npm start</code></li>
</ol>
</li>
<li>
In the second terminal:
<ol>
<li>Enter <code>cd frontend</code></li>
<li>Enter <code>npm i</code>, wait for it to finish.</li>
<li>Run <code>npm start</code></li>
</ol>
</li>
</ul> 

If Cloning from github- first add .env file with your mongoDB
connection URI, name it MONGODB_URI, then continue from step 2.
<br/><br/><br/>
<b>Important notice</b>: The program lets you create a mock dataset in the DB. To create dataset, make sure your DB is empty and uncomment line 54 in server.js. After the process is done (you recieve 'Done creating data set in DB' in the console), comment back the line to avoid duplicate data in the next run.