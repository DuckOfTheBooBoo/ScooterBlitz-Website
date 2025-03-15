$(document).ready(function() {
    const $textElement = $("#headline-text");
    const text = $textElement.text();
    let textProgress = '';
    const textArray = text.split("-");
    let partIndex = 0;
    let charIndex = 0;
    const typingSpeed = 90;
    const pauseDuration = 800;

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
});
