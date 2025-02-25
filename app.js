const express = require('express');
const bodyParser = require('body-parser');

const books = [
    {
        bookName: "Rudest Book Ever",
        bookAuthor: "Shwetabh Gangwar",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    },
    {
        bookName: "Do Epic Shit",
        bookAuthor: "Ankur Wariko",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    }
];

const app = express();

app.set('view engine', 'ejs');


app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home", { data: books });
});

app.post("/", (req, res) => {
    const { bookName, bookAuthor, bookPages, bookPrice } = req.body;

    books.push({
        bookName,
        bookAuthor,
        bookPages,
        bookPrice,
        bookState: "Available"
    });

    res.render("home", { data: books });
});

app.post('/issue', (req, res) => {
    const requestedBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName === requestedBookName) {
            book.bookState = "Issued";
        }
    });
    res.render("home", { data: books });
});

app.post('/return', (req, res) => {
    const requestedBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName === requestedBookName) {
            book.bookState = "Available";
        }
    });
    res.render("home", { data: books });
});

app.post('/delete', (req, res) => {
    const requestedBookName = req.body.bookName;
    const index = books.findIndex(book => book.bookName === requestedBookName);
    if (index !== -1) {
        books.splice(index, 1);
    }
    res.render("home", { data: books });
});

app.listen(3000, () => {
    console.log("App is running on port 3000");
});
