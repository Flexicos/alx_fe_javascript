const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // Mock API

// --- Sync quotes with server ---
async function syncQuotes(newQuote = null) {
  try {
    // 1️⃣ POST new quote if provided
    if (newQuote) {
      await fetch(SERVER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuote)
      });
      notifyUser("Quote successfully sent to server!");
    }

    // 2️⃣ FETCH latest quotes from server
    const response = await fetch(SERVER_URL);
    const serverData = await response.json();

    // Convert server data into quote objects
    const serverQuotes = serverData.slice(0, 5).map(item => ({
      text: item.title,
      category: "Server"
    }));

    // 3️⃣ Merge server quotes with local quotes (conflict resolution)
    let conflictsResolved = false;
    serverQuotes.forEach(sq => {
      const existsLocally = quotes.some(lq => lq.text === sq.text);
      if (!existsLocally) {
        quotes.push(sq);
        conflictsResolved = true;
      }
    });

    if (conflictsResolved) {
      localStorage.setItem("quotes", JSON.stringify(quotes));
      populateCategories();
      filterQuotes();
      notifyUser("New quotes synced from server!");
    }

  } catch (err) {
    console.error("Error syncing quotes:", err);
    notifyUser("Failed to sync quotes with server.");
  }
}

// --- Example: Extend addQuote function to sync ---
function addQuote(textInput, categoryInput) {
  const text = textInput.value.trim();
  const category = categoryInput.value.trim() || "Uncategorized";

  if (!text) {
    alert("Quote cannot be empty!");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);

  // Save locally
  localStorage.setItem("quotes", JSON.stringify(quotes));
  populateCategories();
  filterQuotes();

  // Sync with server
  syncQuotes(newQuote);

  textInput.value = "";
  categoryInput.value = "";
}

// --- Periodic automatic sync ---
setInterval(() => syncQuotes(), 30000); // every 30 seconds
syncQuotes(); // initial fetch on page load
