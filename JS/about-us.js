$(document).ready(function() {
    const $textElement = $("#headline-text");
    const text = $textElement.text();
    let textProgress = '';
    const textArray = text.split("-");
    let partIndex = 0;
    let charIndex = 0;
    const typingSpeed = 60;
    const pauseDuration = 800;

    $('nav').toggleClass('defaultNavState')

    function type() {
        if (partIndex < textArray.length) {
            if (charIndex <= textArray[partIndex].length) {
                textProgress += textArray[partIndex].charAt(charIndex);
                $textElement.text(textProgress);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                textProgress += ", ";
                partIndex++;
                charIndex = 0;
                setTimeout(type, pauseDuration);
            }
        }
    }

    type();

    let atTop = true;

    function checkScroll() {
        if ($(window).scrollTop() === 0) {
            if (!atTop) { 
                atTop = true;
                $('nav').removeClass('scrolledNavState')
                $('nav').addClass('defaultNavState')
                $('nav a').addClass('text-coolWhite')
                $('nav a').removeClass('text-darkNavy')
                console.log("User is at the top of the page");
            }
        } else {
            if (atTop) { 
                atTop = false;
                $('nav').removeClass('defaultNavState')
                $('nav').addClass('scrolledNavState')
                $('nav a').addClass('text-darkNavy')
                $('nav a').removeClass('text-coolWhite')
                console.log("User scrolled down");
            }
        }
    }

    $(window).on("scroll", checkScroll);
});
