This is a CRUD application to keep track of the books you read. It shows the title, ISBN code, cover (automatically retrieved from the ISBN, using the Open Library Covers API - https://openlibrary.org/dev/docs/api/covers), date read, your score, Amazon link and description. The application was built using EJS, JavaScript, CSS, Node.js, Express, and PostgreSQL.

This was a challenge for me and I'm proud to have finished it.

Instructions
1. Download ZIP or clone the project.

2. "cd" over to the directory and use npm install (npm i) to install the node modules.

3. Open the index.js file in your code editor.

4. Create a new database in PostgreSQL and add its name and your credentials to the index.js file, where specified:

// Add your PostgreSQL credentials here.
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "",
    password: "",
    port: 5432,
});

I named mine "book_notes" but you can name yours whatever you want, just add its name there on "database".

5. Create a table in PostgreSQL using this code in the query tool in your database:

CREATE TABLE books (
	ID SERIAL PRIMARY KEY,
	title VARCHAR(100),
	isbn VARCHAR(20),
	date_read DATE,
	my_score VARCHAR(2),
	bookstore_link VARCHAR(100),
	author VARCHAR(100),
	description VARCHAR(400)
);

6. Right click on the table's name, then "Import/Export Data", then select "books.csv" to import my extensive list of 4 books, so you can see the app with some data.

7. Run the index.js file using node or nodemon: node index.js / nodemon index.js. The app will run on http://localhost:3000.

Feel free to delete my entries and add your own. You can also edit the main text in the index.ejs file if you wish.
