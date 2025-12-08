// Existing DOM references and functions assumed above
// (quoteDisplay, newQuoteBtn, addQuoteFormContainer, importFile, exportBtn, categoryFilter, quotes, saveQuotes, filterQuotes, etc.)

// --- Step 1: Simulate Server Interaction ---
// We'll use a mock API endpoint for demonstration
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // Mock API

// Function to fetch quotes from the server
async function fetchServerQuotes() {
  try {
    const response = await fetch(SERVER_URL);
    const serverData = await response.json();

    // Convert server data to match our quote format for simulation
    const serverQuotes = serverData.slice(0, 5).map(item => ({
      text: item.title,
      category: "Server" // Simulated category
    }));

    resolveConflicts(serverQuotes);
  } catch (err) {
    console.error("Error fetching server data:", err);
  }
}

// --- Step 2: Implement Data Syncing with Conflict Resolution ---
function resolveConflicts(serverQuotes) {
  let conflictsResolved = false;

  serverQuotes.forEach(sq => {
    const existsLocally = quotes.some(lq => lq.text === sq.text);
    if (!existsLocally) {
      quotes.push(sq);
      conflictsResolved = true;
    }
  });

  if (conflictsResolved) {
    saveQuotes();         // ✅ update localStorage with merged data
    populateCategories();  // update category dropdown
    filterQuotes();       // refresh displayed quote
    notifyUser("New quotes synced from server!");
  }
}

// --- Step 3: UI Notification for Conflict Resolution ---
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

// --- Step 4: Periodic Sync ---
// Fetch server quotes every 30 seconds
setInterval(fetchServerQuotes, 30000); // 30,000ms = 30s

// Optionally fetch immediately on page load
fetchServerQuotes();
