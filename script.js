document.addEventListener("DOMContentLoaded", function() {
    const eventBlocks = document.querySelectorAll('.eventblock');
    let visibleImage = null; // Track the currently visible image

    eventBlocks.forEach(function(eventBlock) {
        eventBlock.addEventListener('mouseover', function() {
            eventBlock.classList.add('eventblock-hover');
        });

        eventBlock.addEventListener('mouseout', function() {
            eventBlock.classList.remove('eventblock-hover');
        });
    });

    window.addEventListener('scroll', function() {
        let visibleEventBlock = null; // Track the currently visible event block

        eventBlocks.forEach(function(eventBlock) {
            const rect = eventBlock.getBoundingClientRect();
            const threshold = 290; // Distance from the top of the page
            if (rect.top <= threshold && rect.bottom >= threshold) {
                visibleEventBlock = eventBlock;
            }
        });

        if (visibleEventBlock) {
            const date = visibleEventBlock.querySelector('h3').textContent;
            document.getElementById('dateText').textContent = date;

            // Update dropdown text
            const yearId = visibleEventBlock.id.replace('event-', '');
            document.getElementById('dropdownMenuButton').textContent = yearId;
        } else {
            document.getElementById('dateText').textContent = '';
        }

        eventBlocks.forEach(function(eventBlock) {
            const image = eventBlock.querySelector('.keyimage');
            if (image) {
                const rect = eventBlock.getBoundingClientRect();
                const threshold = 280; // Distance from the top of the page
                if (rect.top <= threshold) {
                    if (!image.classList.contains('show-image')) {
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

    const dropdownItems = document.querySelectorAll('.dropdown-item-custom');
    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1); // Remove the #
            const targetElement = document.getElementById(targetId);
            const offset = 0; // Offset from the top
            const bodyRect = document.body.getBoundingClientRect().top;
            const targetRect = targetElement.getBoundingClientRect().top;
            const targetOffset = targetRect - bodyRect - offset;
            window.scrollTo({
                top: targetOffset,
                behavior: 'smooth'
            });
        });
    });

    const aproposButton = document.getElementById('toggleButton');
    const aproposContent = document.getElementById('info');

    aproposButton.addEventListener('click', function() {
        if (aproposContent.style.display === 'none' || aproposContent.style.display === '') {
            aproposContent.style.display = 'block';
            aproposButton.querySelector('h3').textContent = 'fermer';
        } else {
            aproposContent.style.display = 'none';
            aproposButton.querySelector('h3').textContent = 'à propos';
        }
    });

    // Add mobile-specific code here
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
        eventBlocks.forEach(function(eventBlock) {
            const image = eventBlock.querySelector('.keyimage');
            if (image) {
                image.addEventListener('click', function() {
                    if (image.classList.contains('show-image')) {
                        image.classList.remove('show-image');
                    } else {
                        image.classList.add('show-image');
                    }
                });
            }
        });
    }
});
