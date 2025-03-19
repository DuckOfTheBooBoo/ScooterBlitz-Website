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

// Dynamically determine the number of cards per slide
function getCardsPerSlide() {
  if (window.innerWidth >= 1200) return 4; // Desktop (4 items per slide)
  if (window.innerWidth >= 768) return 3;  // Tablet (3 items per slide)
  return 1; // Mobile (1 item per slide)
}

function generateCarouselItems(locations) {
  const cardsPerSlide = getCardsPerSlide();
  let carouselHTML = '';

  for (let i = 0; i < locations.length; i += cardsPerSlide) {
    let cardsHTML = '';
    for (let j = i; j < i + cardsPerSlide; j++) {
      if (locations[j]) cardsHTML += generateLocationCard(locations[j]);
    }
    carouselHTML += `
      <div class="carousel-item ${i === 0 ? 'active' : ''}">
        <div class="d-flex flex-nowrap justify-content-center gap-3">
          ${cardsHTML}
        </div>
      </div>`;
  }
  return carouselHTML;
}

function generateMobileScrollItems(locations) {
  return locations.map(location => generateLocationCard(location)).join('');
}

// Select containers
const carouselInner = document.getElementById('carousel-inner');
const mobileScrollContainer = document.getElementById('mobile-scroll-container');

// Insert the generated HTML into the DOM
function updateUI() {
  carouselInner.innerHTML = generateCarouselItems(locations);
  mobileScrollContainer.innerHTML = generateMobileScrollItems(locations);
}

updateUI();
window.addEventListener('resize', updateUI); // Adjust layout on window resize
