document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("feed-selector");
  const contentDiv = document.getElementById("content");

  function loadFeed(url) {
    contentDiv.innerHTML = "<p>Loading...</p>";

    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        contentDiv.innerHTML = ""; // Clear previous feed
        if (data.items && data.items.length > 0) {
          data.items.slice(0, 5).forEach((item) => {
            const article = document.createElement("article");
            article.innerHTML = `
              <h3><a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a></h3>
              <p>${item.description.slice(0, 150)}...</p>
            `;
            contentDiv.appendChild(article);
          });
        } else {
          contentDiv.innerHTML = "<p>No articles found.</p>";
        }
      })
      .catch((error) => {
        console.error("Error fetching feed:", error);
        contentDiv.innerHTML = "<p>Error loading feed. Please try again later.</p>";
      });
  }

  // Load default feed on start
  loadFeed(selector.value);

  // Load selected feed
  selector.addEventListener("change", () => {
    loadFeed(selector.value);
  });
});
