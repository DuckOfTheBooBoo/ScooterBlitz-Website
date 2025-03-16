class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
    @import "/css/style.css";
    @import "/components/footer/footer.css";
    @import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
    </style>
            <footer
      id="company-footer"
      class="container-fluid bg-body-skyblue py-5 px-3 d-flex flex-column gap-3 w-100"
    >
      <div class="footer-item d-flex flex-row w-100 gap-4">
        <div
          id="footer-mission"
          class="text-coolWhite text-center text-lg-start fw-medium fs-6 w-10"
        >
          We're dedicated to elevating brief travels, contributing to a more
          seamless and efficient urban environment for everyone.
        </div>
        <div
          id="footer-map"
          class="d-none d-md-flex flex-row gap-5 justify-content-start"
        >
          <div class="d-flex flex-column text-coolWhite">
            <h3 class="text-coolWhite fw-semibold mb-3">Company</h3>
            <ul class="list-unstyled">
              <li>
                <a
                  href="/pages/about-us.html"
                  class="text-coolWhite text-decoration-none"
                  >About Us</a
                >
              </li>
            </ul>
          </div>
          <div class="d-flex flex-column text-coolWhite">
            <h3 class="text-coolWhite fw-semibold mb-3">Contact Us</h3>
            <ul class="list-unstyled">
              <li>E-mail</li>
              <li>Phone</li>
              <li>Fill out form</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="separator"></div>
      <div
        id="store-link"
        class="footer-item d-flex flex-row w-100 justify-content-center gap-3"
      >
        <img
          src="https://cdn.prod.website-files.com/63c4acbedbab5dea8b1b98cd/63c4acbedbab5d05ad1b9904_appstore-white%402x.webp"
          loading="lazy"
          alt="app store"
          class=""
        />
        <img
          src="https://cdn.prod.website-files.com/63c4acbedbab5dea8b1b98cd/63c4acbedbab5de95d1b9903_googleplay-white%402x.webp"
          loading="lazy"
          alt="google play"
          class=""
        />
      </div>
      <div class="separator"></div>
      <div
        id="license"
        class="footer-item text-coolWhite text-center fw-medium"
      >
        Copyright 2025 ScooterBlitz Co Limited
      </div>
    </footer>
        `;
  }
}

customElements.define('footer-component', FooterComponent);