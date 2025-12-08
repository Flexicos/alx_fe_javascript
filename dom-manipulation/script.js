const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // Mock API

// --- Fetch quotes from server ---
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const serverData = await response.json();

    // Transform server data into our quote format
    const serverQuotes = serverData.slice(0, 5).map(item => ({
      text: item.title,
      category: "Server"
    }));

    // Resolve conflicts with local quotes
    resolveConflicts(serverQuotes);

  } catch (err) {
    console.error("Error fetching quotes from server:", err);
  }
}

// --- Post a new quote to server ---
async function postQuoteToServer(quote) {
  try {
    const response = await fetch(SERVER_URL, {
      method: "POST",                  // ✅ HTTP POST method
      headers: {
        "Content-Type": "application/json"  // ✅ Headers
      },
      body: JSON.stringify(quote)      // Convert quote to JSON
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const result = await response.json();
    console.log("Quote successfully posted to server:", result);
    notifyUser("Quote successfully sent to server!");
  } catch (err) {
    console.error("Error posting quote to server:", err);
    notifyUser("Failed to send quote to server.");
  }
}

// --- Conflict resolution ---
function resolveConflicts(serverQuotes) {
  let conflictsResolved = false;

  serverQuotes.forEach(sq => {
    const existsLocally = quotes.some(lq => lq.text === sq.text);
    if (!existsLocally) {
      quotes.push(sq);  // Add server quote if not present locally
      conflictsResolved = true;
    }
  });

  if (conflictsResolved) {
    localStorage.setItem("quotes", JSON.stringify(quotes));
    populateCategories();
    filterQuotes();
    notifyUser("New quotes synced from server!");
  }
}

// --- Periodic server fetch ---
setInterval(fetchQuotesFromServer, 30000); // every 30 seconds
fetchQuotesFromServer(); // initial fetch
