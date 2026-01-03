let quotes = [
  { text: "Believe you can and you’re halfway there.", category: "motivation" },
  { text: "Learning never exhausts the mind.", category: "education" },
  { text: "Stay curious.", category: "inspiration" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// REQUIRED FUNCTION
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p><strong>${quote.text}</strong></p>
    <small>Category: ${quote.category}</small>
  `;
}

function addQuote() {
  quotes.push({ text: newText, category: newCategory });
saveQuotes();
populateCategories();  // <-- update dropdown dynamically


  quotes.push({ text: newText, category: newCategory });
  textInput.value = "";
  categoryInput.value = "";

  alert("Quote added!");
}
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
  };

  fileReader.readAsText(event.target.files[0]);
}
function populateCategories() {
  const categorySelect = document.getElementById("categoryFilter");

  // Clear previous options except "all"
  categorySelect.innerHTML = `<option value="all">All Categories</option>`;

  // Get unique categories from quotes
  const categories = [...new Set(quotes.map(q => q.category))];

  // Add categories to dropdown
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  // Restore last selected category from localStorage
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    categorySelect.value = savedCategory;
  }
}
function filterQuotes() {
  const categorySelect = document.getElementById("categoryFilter");
  const selectedCategory = categorySelect.value;

  // Save selected category to localStorage
  localStorage.setItem("selectedCategory", selectedCategory);

  let filteredQuotes = quotes;

  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  }

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = `<p>No quotes available in this category.</p>`;
    return;
  }

  // Pick a random quote from filtered
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p><strong>${quote.text}</strong></p>
    <small>Category: ${quote.category}</small>
  `;
}
// Fetch quotes from the simulated server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    // Map server data to quote objects
    const serverQuotes = data.slice(0, 10).map(post => ({
      text: post.title,
      category: "server" // tag server quotes
    }));

    return serverQuotes;
  } catch (error) {
    console.error("Error fetching quotes from server:", error);
    return [];
  }
}

async function syncWithServer() {
  const serverQuotes = await fetchQuotesFromServer();

  let updated = false;

  // Merge server quotes into local quotes (server wins)
  serverQuotes.forEach(serverQuote => {
    const exists = quotes.some(q => q.text === serverQuote.text);
    if (!exists) {
      quotes.push(serverQuote);
      updated = true;
    }
  });

  if (updated) {
    saveQuotes();
    populateCategories();
    showRandomQuote();
    notifyUser("Quotes have been updated from the server!");
  }
}

function notifyUser(message) {
  let notification = document.getElementById("notification");
  if (!notification) {
    notification = document.createElement("div");
    notification.id = "notification";
    notification.style.position = "fixed";
    notification.style.top = "10px";
    notification.style.right = "10px";
    notification.style.backgroundColor = "#ffd700";
    notification.style.padding = "10px";
    notification.style.border = "1px solid #ccc";
    document.body.appendChild(notification);
  }
  notification.textContent = message;

  setTimeout(() => {
    notification.textContent = "";
  }, 5000);
}
// Sync every 30 seconds
setInterval(syncWithServer, 30000);

// NEW FUNCTION — creates the form dynamically
function createAddQuoteForm() {
  const container = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  container.appendChild(quoteInput);
  container.appendChild(categoryInput);
  container.appendChild(addButton);

  document.body.appendChild(container);
}

newQuoteBtn.addEventListener("click", showRandomQuote);

// Show first quote and create the form when page loads
loadQuotes();
populateCategories();   // fill dropdown first
showRandomQuote();
createAddQuoteForm();
syncWithServer();

