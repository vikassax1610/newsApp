// API key and base URL
const apiKey = "a441658d34a996b56fea3ed507e0da1a";
const baseURL = "https://gnews.io/api/v4/top-headlines?";

// Select elements from the DOM
const searchButton = document.getElementById("navbar-search-button");
const searchInput = document.getElementById("navbar-search-input");
const newsContainer = document.getElementById("news-container");
const newsHeading = document.getElementById("news-heading");

const homeButton = document.getElementById("home-button");
const financeNewsButton = document.getElementById("finance-news");
const politicsNewsButton = document.getElementById("politics-news");
const sportsNewsButton = document.getElementById("sports-news");
const entertainmentNewsButton = document.getElementById("entertainment-news");

// Default behavior: Show Featured Articles when page loads
document.addEventListener("DOMContentLoaded", () => {
  newsHeading.innerText = "Featured Articles";
  fetchNews("featured");
});

// Event listener for search button in navbar
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    newsHeading.innerText = `Search results for "${query}"`;
    fetchNews(query);
  }
});

// Event listeners for category buttons
homeButton.addEventListener("click", () => {
  newsHeading.innerText = "Featured Articles";
  fetchNews("featured");
});
financeNewsButton.addEventListener("click", () => {
  newsHeading.innerText = "Here are Finance News";
  fetchNews("finance");
});
politicsNewsButton.addEventListener("click", () => {
  newsHeading.innerText = "Here are Politics News";
  fetchNews("politics");
});
sportsNewsButton.addEventListener("click", () => {
  newsHeading.innerText = "Here are Sports News";
  fetchNews("sports");
});
entertainmentNewsButton.addEventListener("click", () => {
  newsHeading.innerText = "Here are entertainment News";
  fetchNews("entertainment");
});

// Function to fetch news using the GNews API
async function fetchNews(query) {
  try {
    const response = await fetch(
      `${baseURL}&token=${apiKey}&q=${query}&lang=en&max=20`
    );
    const data = await response.json();

    displayNews(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

// Function to display fetched news articles
function displayNews(articles) {
  newsContainer.innerHTML = ""; // Clear previous news

  if (articles.length === 0) {
    newsContainer.innerHTML = "<p>No news articles found for this query.</p>";
    return;
  }

  articles.forEach((article, index) => {
    const newsCard = document.createElement("div");
    newsCard.classList.add("news-card");
    newsCard.style.animationDelay = `${index * 0.1}s`; // Add delay for staggered animation

    newsCard.innerHTML = `
            <img src="${article.image}" alt="${article.title}">
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;

    newsContainer.appendChild(newsCard);
  });
}
