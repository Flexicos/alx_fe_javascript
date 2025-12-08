// Function to send a new quote to the server
async function postQuoteToServer(quote) {
  try {
    const response = await fetch(SERVER_URL, {
      method: "POST",              // ✅ HTTP method
      headers: {
        "Content-Type": "application/json"  // ✅ Content-Type header
      },
      body: JSON.stringify(quote)   // convert quote object to JSON
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

// --- Extend addQuote function to POST new quotes ---
function addQuote(textInput, categoryInput) {
  const text = textInput.value.trim();
  const category = categoryInput.value.trim() || "Uncategorized";

  if (!text) {
    alert("Quote cannot be empty!");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);

  // ✅ Save locally
  localStorage.setItem("quotes", JSON.stringify(quotes));

  // ✅ Update categories and display
  populateCategories();
  filterQuotes();

  // ✅ POST to server
  postQuoteToServer(newQuote);

  // Clear input fields
  textInput.value = "";
  categoryInput.value = "";
}
