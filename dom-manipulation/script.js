const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // Mock API

// --- 1️⃣ Fetch quotes from server ---
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const serverData = await response.json();

    // Convert server data to our quote format
    const serverQuotes = serverData.slice(0, 5).map(item => ({
      text: item.title,
      category: "Server"
    }));

    // Merge server data with local quotes
    resolveConflicts(serverQuotes);

  } catch (err) {
    console.error("Error fetching quotes from server:", err);
    notifyUser("Failed to fetch quotes from server.");
  }
}

// --- 2️⃣ Post new quote to server ---
async function postQuoteToServer(quote) {
  try {
    const response = await fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quote)
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

// --- 3️⃣ Sync quotes with server (fetch + post) ---
async function syncQuotes(newQuote = null) {
  try {
    // POST new quote if provided
    if (newQuote) {
      await postQuoteToServer(newQuote);
    }

    // FETCH latest quotes from server
    await fetchQuotesFromServer();

  } catch (err) {
    console.error("Error syncing quotes:", err);
    notifyUser("Failed to sync quotes.");
  }
}

// --- 4️⃣ Conflict resolution ---
function resolveConflicts(serverQuotes) {
  let conflictsResolved = false;

  serverQuotes.forEach(sq => {
    const existsLocally = quotes.some(lq => lq.text === sq.text);
    if (!existsLocally) {
      quotes.push(sq); // Add missing server quotes
      conflictsResolved = true;
    }
  });

  if (conflictsResolved) {
    localStorage.setItem("quotes", JSON.stringify(quotes)); // update local storage
    populateCategories(); // update categories dropdown
    filterQuotes();       // update displayed quotes
    notifyUser("New quotes synced from server!");
  }
}

// --- 5️⃣ UI notifications ---
function notifyUser(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.position = "fixed";
  notification.style.top = "10px";
  notification.style.right = "10px";
  notification.style.background = "#10b981";
  notification.style.color = "white";
  notification.style.padding = "10px 15px";
  notification.style.borderRadius = "6px";
  notification.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  document.body.appendChild(notification);

  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
}

// --- 6️⃣ Example: Extend addQuote to sync with server ---
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

// --- 7️⃣ Periodic server sync ---
setInterval(() => syncQuotes(), 30000); // every 30 seconds
syncQuotes(); // initial fetch on page load
