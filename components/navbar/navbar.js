class NavbarComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
      @import "/css/style.css";
      @import "/components/navbar/navbar.css";
      @import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
      </style>
      <nav
        class="navbar navbar-expand-sm navbar-light position-fixed w-100 top-0 start-0 z-3 defaultNavState">
        <div class="container-fluid d-flex justify-content-between justify-content-sm-around w-100">
          <a class="navbar-brand text-coolWhite" href="/">
            <img id="scooterblitz-img" src="/assets/svg/scooterblitz.svg" alt="ScooterBlitz"
              class="d-inline-block align-text-top scooterblitz-img-defaultState" />
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarID"
            aria-controls="navbarID" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse flex-grow-0" id="navbarID">
            <div class="navbar-nav">
              <a class="nav-link active text-coolWhite fw-semibold" aria-current="page" href="../index.html">Home</a>
              <a class="nav-link active text-coolWhite fw-semibold" aria-current="page" href="/pages/about-us.html">About
                Us</a>
              <a class="nav-link active text-coolWhite fw-semibold" aria-current="page" href="/pages/contact-us.html">Contact
                Us</a>
            </div>
          </div>
        </div>
      </nav>
    `;

    this.applyJQuery();
  }

  applyJQuery() {
    const shadowRoot = this.shadowRoot;
    let atTop = true;

    function checkScroll() {
      const nav = shadowRoot.querySelector("nav");
      const navLinks = shadowRoot.querySelectorAll("nav a");
      const scooterblitzImg = shadowRoot.getElementById("scooterblitz-img");

      if ($(window).scrollTop() <= 20) {
        if (!atTop) {
          atTop = true;
          $(nav).removeClass("scrolledNavState").addClass("defaultNavState");
          // $(navLinks).addClass("text-darkNavy").removeClass("text-coolWhite");
          $(scooterblitzImg)
            .addClass("scooterblitz-img-defaultState")
            .removeClass("scooterblitz-img-scrolledState");
          console.log("User is at the top of the page");
        }
      } else {
        if (atTop) {
          atTop = false;
          $(nav).removeClass("defaultNavState").addClass("scrolledNavState");
          // $(navLinks).addClass("text-coolWhite").removeClass("text-darkNavy");
          $(scooterblitzImg)
            .addClass("scooterblitz-img-scrolledState")
            .removeClass("scooterblitz-img-defaultState");
          console.log("User scrolled down");
        }
      }
    }

    $(window).on("scroll", checkScroll);
    $("html, body").animate({ scrollTop: 0 }, "fast");

    // Initialize Bootstrap components within the shadow DOM
    const navbarToggler = shadowRoot.querySelector('.navbar-toggler');
    const collapseElement = shadowRoot.querySelector('#navbarID');
    new bootstrap.Collapse(collapseElement, {
      toggle: false
    });

    navbarToggler.addEventListener('click', () => {
      $(collapseElement).collapse('toggle');
    });
  }
}

customElements.define("navbar-component", NavbarComponent);