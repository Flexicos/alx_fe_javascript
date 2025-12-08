// Array to store quotes dynamically
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// References to DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuoteBtn");
const addQuoteFormContainer = document.getElementById("addQuoteForm");

// Function to display a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
}

// Function to create a form to add new quotes dynamically
function createAddQuoteForm() {
  const form = document.createElement("div");

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";
  textInput.id = "newQuoteText";

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";
  categoryInput.id = "newQuoteCategory";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";

  // Event listener to add the quote
  addButton.addEventListener("click", () => {
    const text = textInput.value.trim();
    const category = categoryInput.value.trim() || "Uncategorized";

    if (!text) {
      alert("Quote cannot be empty!");
      return;
    }

    // Add new quote to the array
    quotes.push({ text, category });

    // Clear input fields
    textInput.value = "";
    categoryInput.value = "";

    // Show the newly added quote immediately
    showRandomQuote();
  });

  form.appendChild(textInput);
  form.appendChild(categoryInput);
  form.appendChild(addButton);

  addQuoteFormContainer.appendChild(form);
}

// Initial setup
createAddQuoteForm();
newQuoteBtn.addEventListener("click", showRandomQuote);
