// app.js
const express = require("express");
const bodyParser = require("body-parser");
const libraryData = require("./data"); // Impor data dari data.js
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint untuk menambahkan buku
app.get("/hello", (req, res) => {
    res.json("Hello World");
});

// Endpoint untuk menampilkan seluruh buku
app.get("/books", (req, res) => {
    res.json(libraryData);
});

// Endpoint untuk menampilkan buku sesuai judul
app.get("/books/:title", (req, res) => {
    const bookTitle = req.params.title;
    const book = libraryData.find((book) => book.title === bookTitle);

    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Endpoint untuk menambahkan buku
app.post("/books", (req, res) => {
    const newBook = req.body;
    libraryData.push(newBook);
    res.json({ message: "Book added successfully", book: newBook });
});

// Endpoint untuk mengubah data buku
app.put("/books/:title", (req, res) => {
    const bookTitle = req.params.title;
    const updatedBook = req.body;
    const index = libraryData.findIndex((book) => book.title === bookTitle);

    if (index !== -1) {
        libraryData[index] = updatedBook;
        res.json({ message: "Book updated successfully", book: updatedBook });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Endpoint untuk menghapus data buku
app.delete("/books/:title", (req, res) => {
    const bookTitle = req.params.title;
    const index = libraryData.findIndex((book) => book.title === bookTitle);

    if (index !== -1) {
        const deletedBook = libraryData.splice(index, 1);
        res.json({
            message: "Book deleted successfully",
            book: deletedBook[0],
        });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
