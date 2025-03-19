import location from './store.js';

// main.js
import locations from './store.js';

function generateLocationCard(location) {
  return `
    <div class="col-6 col-md-3 px-2">
      <div class="text-center location-card">
        <img src="${location.imagePath}" alt="${location.title}" class="img-fluid rounded w-100">
        <h5 class="mt-3">${location.title}</h5>
        <a href="/pages/place.html?location=${location.slug}" class="btn btn-skyblue  mt-2">View More</a>
      </div>
    </div>
  `;
}

function generateCarouselItem(locations, startIndex, endIndex) {
  let cardsHTML = '';
  for (let i = startIndex; i < endIndex; i++) {
    if (locations[i]) {
      cardsHTML += generateLocationCard(locations[i]);
    }
  }
  return `
    <div class="carousel-item ${startIndex === 0 ? 'active' : ''}">
      <div class="d-flex flex-nowrap justify-content-center gap-3">
        ${cardsHTML}
      </div>
    </div>
  `;
}

const carouselInner = document.getElementById('carousel-inner');
const mobileScrollContainer = document.getElementById('mobile-scroll-container');

let carouselHTML = '';
let mobileHTML = '';

// Generate carousel items (up to 4 locations per slide)
for (let i = 0; i < locations.length; i += 4) {
  carouselHTML += generateCarouselItem(locations, i, i + 4);
}

// Generate mobile location cards
locations.forEach(location => {
  mobileHTML += generateLocationCard(location);
});

// Insert the generated HTML into the DOM
carouselInner.innerHTML = carouselHTML;
mobileScrollContainer.innerHTML = mobileHTML;