import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// Add your PostgreSQL credentials here.
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "",
    password: "",
    port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const bookQuery = await db.query("SELECT * FROM books ORDER BY id ASC");

        res.render("index.ejs", {
            books: bookQuery.rows,
        });
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

app.get("/title", async (req, res) => {
    try {
        const bookQuery = await db.query("SELECT * FROM books ORDER BY title ASC");

        res.render("index.ejs", {
            books: bookQuery.rows,
        });
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

app.get("/rating", async (req, res) => {
    try {
        const bookQuery = await db.query("SELECT * FROM books ORDER BY my_score ASC");

        res.render("index.ejs", {
            books: bookQuery.rows,
        });
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

app.get("/newest", async (req, res) => {
    try {
        const bookQuery = await db.query("SELECT * FROM books ORDER BY date_read DESC");

        res.render("index.ejs", {
            books: bookQuery.rows,
        });
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

app.get("/new", async (req, res) => {
    try {
        res.render("new.ejs");
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

app.post("/add", async (req, res) => {
    const newBookTitle = req.body.newBookTitle;
    const newBookIsbn = req.body.newBookIsbn;
    const newBookDateRead = req.body.newBookDateRead;
    const newBookScore = req.body.newBookScore;
    const newBookLink = req.body.newBookLink;
    const newBookAuthor = req.body.newBookAuthor;
    const newBookDescription = req.body.newBookDescription;

    try {
        await db.query(
            "INSERT INTO books (title, isbn, date_read, my_score, bookstore_link, author, description) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [newBookTitle, newBookIsbn, newBookDateRead, newBookScore, newBookLink, newBookAuthor, newBookDescription]
        );
        res.redirect("/");

    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

app.post("/edit/:id", async (req, res) => {
    const editId = req.body.bookId;

    try {
        const bookQuery = await db.query("SELECT * FROM books WHERE id = $1", 
            [editId]
        );
        res.render("edit.ejs", {
            book: bookQuery.rows[0],
        });
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

app.post("/update", async (req, res) => {
    const editBookTitle = req.body.editBookTitle;
    const editBookIsbn = req.body.editBookIsbn;
    const editBookDateRead = req.body.editBookDateRead;
    const editBookScore = req.body.editBookScore;
    const editBookLink = req.body.editBookLink;
    const editBookAuthor = req.body.editBookAuthor;
    const editBookDescription = req.body.editBookDescription;
    const editBookId = req.body.editBookId;

    try {
        await db.query(
            "UPDATE books SET title = $1, isbn = $2, date_read = $3, my_score = $4, bookstore_link = $5, author = $6, description = $7 WHERE id = $8",
            [editBookTitle, editBookIsbn, editBookDateRead, editBookScore, editBookLink, editBookAuthor, editBookDescription, editBookId]
        );
        res.redirect("/");

    } catch (err) {
        console.log(err);
        res.status(500);
    }

});

app.post("/delete/:id", async (req, res) => {
    const deleteId = req.body.bookId;

    try {
        const bookQuery = await db.query("DELETE FROM books WHERE id = $1", 
            [deleteId]
        );
        res.redirect("/");

    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

/* NOT NEEDED ANYMORE. This function replaces any single quote (') that was typed by the user for two single quotes (''), so that their input in correctly formatted for the PostgreSQL query. */
function formatApostrophe (input) {
    const replacedApostrophes = input.replace(/'/g, "''");
    return replacedApostrophes;
};

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});