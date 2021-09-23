import { Slide, UUID } from "./model";

function generateUUID(): UUID {
    return 'mega unique id';
}

function replaceCurrentSlideInSlides(slides: Slide[], currentSlide: Slide): Slide[] {
    const slidesCopy = slides.slice();
    for (let i = 0; i < slides.length; ++i) {
        if (slides[i].id === currentSlide.id) {
            slides[i] = { ...currentSlide };
            break;
        }
    }

    return slidesCopy;
}

export {
    generateUUID,
    replaceCurrentSlideInSlides,
}
