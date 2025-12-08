// --- Step 1: Fetch quotes from server ---
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // Mock API

async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const serverData = await response.json();

    // Transform server data into quote format
    const serverQuotes = serverData.slice(0, 5).map(item => ({
      text: item.title,
      category: "Server" // Example category for server data
    }));

    // Resolve conflicts with local data
    resolveConflicts(serverQuotes);

  } catch (err) {
    console.error("Error fetching quotes from server:", err);
  }
}

// --- Step 2: Conflict resolution ---
function resolveConflicts(serverQuotes) {
  let conflictsResolved = false;

  serverQuotes.forEach(sq => {
    const existsLocally = quotes.some(lq => lq.text === sq.text);
    if (!existsLocally) {
      quotes.push(sq);          // Add new quote from server
      conflictsResolved = true;
    }
  });

  if (conflictsResolved) {
    localStorage.setItem("quotes", JSON.stringify(quotes)); // ✅ Save updated quotes
    populateCategories();   // Update category dropdown
    filterQuotes();         // Refresh displayed quote
    notifyUser("New quotes synced from server!");
  }
}

// --- Step 3: Notification UI ---
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

// --- Step 4: Periodic syncing ---
setInterval(fetchQuotesFromServer, 30000); // every 30 seconds
fetchQuotesFromServer(); // initial fetch on page load
