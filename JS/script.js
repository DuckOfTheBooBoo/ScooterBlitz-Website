import locations from './store.js';

function generateLocationCard(location) {
  return `
  <div class="card location-card">
    <img src="${location.imagePath}" class="card-img-top" alt="${location.title}">
    <div class="card-body">
      <p class="card-text">${location.title}</p>
      <a href="/pages/place.html?location=${location.slug}" class="btn btn-skyblue mt-2">View More</a>
    </div>
  </div>`;
}

// Generate all location cards
function generateLocationCards(locations) {
  return locations.map(location => generateLocationCard(location)).join('');
}

// Select container
const locationsContainer = document.getElementById('locations-container');

// Insert the generated HTML into the DOM
function updateUI() {
  locationsContainer.innerHTML = generateLocationCards(locations);
}

// Initialize the UI
updateUI();

// Optional: Add scroll indicator or hint
function addScrollHint() {
  if (locationsContainer && locationsContainer.scrollWidth > locationsContainer.clientWidth) {
    locationsContainer.parentElement.classList.add('has-more-content');
  } else if (locationsContainer) {
    locationsContainer.parentElement.classList.remove('has-more-content');
  }
}

// Add event listeners
window.addEventListener('load', addScrollHint);
window.addEventListener('resize', addScrollHint);