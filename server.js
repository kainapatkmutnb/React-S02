import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory book data
let books = [
  { id: 1, title: "React in Action", author: "Mark Tielens Thomas" },
  { id: 2, title: "JavaScript: The Good Parts", author: "Douglas Crockford" },
  { id: 3, title: "Node.js Design Patterns", author: "Mario Casciaro" },
];

let nextId = 4;

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// GET book by id
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// POST create new book
app.post("/books", (req, res) => {
  const newBook = {
    id: nextId++,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book
app.put("/books/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Book not found" });
  books[index] = {
    id: parseInt(req.params.id),
    title: req.body.title,
    author: req.body.author,
  };
  res.json(books[index]);
});

// DELETE book
app.delete("/books/:id", (req, res) => {
  books = books.filter((b) => b.id !== parseInt(req.params.id));
  res.json({ message: "Book deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
