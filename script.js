document.addEventListener("DOMContentLoaded", function() {
    const eventBlocks = document.querySelectorAll('.eventblock');

    let visibleImage = null; // Track the currently visible image

    eventBlocks.forEach(function(eventBlock) {
        eventBlock.addEventListener('mouseenter', function() {
            eventBlock.classList.add('red-text');

            const image = eventBlock.querySelector('.keyimage');
            if (image) {
                // Hide the previously visible image
                if (visibleImage && visibleImage !== image) {
                    visibleImage.classList.remove('show-image');
                }
                visibleImage = image;

                image.classList.add('show-image');
            }
        });

        eventBlock.addEventListener('mouseleave', function() {
            eventBlock.classList.remove('red-text');

            const image = eventBlock.querySelector('.keyimage');
            if (image) {
                image.classList.remove('show-image');
            }
        });

        eventBlock.addEventListener('mouseover', function() {
            eventBlock.classList.add('eventblock-hover');
        });

        eventBlock.addEventListener('mouseout', function() {
            eventBlock.classList.remove('eventblock-hover');
        });
    });

    // Scroll event to reveal images
    window.addEventListener('scroll', function() {
        eventBlocks.forEach(function(eventBlock) {
            const image = eventBlock.querySelector('.keyimage');
            if (image) {
                const rect = eventBlock.getBoundingClientRect();
                const threshold = 290; // Distance from the top of the page
                if (rect.top <= threshold) {
                    if (!image.classList.contains('show-image')) {
                        // Hide the previously visible image
                        if (visibleImage && visibleImage !== image) {
                            visibleImage.classList.remove('show-image');
                        }
                        visibleImage = image;

                        image.classList.add('show-image');
                    }
                } else {
                    image.classList.remove('show-image');
                }
            }
        });
    });

});
