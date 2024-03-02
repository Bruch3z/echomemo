// JavaScript code to handle the key image behavior on mobile
document.addEventListener("DOMContentLoaded", function() {
    const eventBlocks = document.querySelectorAll('.eventblock');
    let visibleImage = null; // Track the currently visible image
    let activeEventBlock = null; // Track the currently active event block

    // Add hover event listener to event blocks
    eventBlocks.forEach(function(eventBlock) {
        eventBlock.addEventListener('mouseover', function() {
            eventBlock.classList.add('eventblock-hover');
        });

        eventBlock.addEventListener('mouseout', function() {
            eventBlock.classList.remove('eventblock-hover');
        });
    });

    // Add class to first event block to make it black
    eventBlocks[0].classList.add('eventblock-active');

    // Set the initial text of the dropdown button to the first year
    const firstYear = eventBlocks[0].id.replace('event-', '');
    document.getElementById('dropdownMenuButton').textContent = firstYear;

    window.addEventListener('scroll', function() {
        let visibleEventBlock = null; // Track the currently visible event block

        eventBlocks.forEach(function(eventBlock) {
            const rect = eventBlock.getBoundingClientRect();
            let threshold = 290; // Distance from the top of the page
            if (window.innerWidth <= 768) {
                threshold = window.innerHeight / 2; // Middle of the screen on mobile
            }
            if (rect.top <= threshold && rect.bottom >= threshold) {
                visibleEventBlock = eventBlock;
            }
        });

        if (visibleEventBlock) {
            const date = visibleEventBlock.querySelector('.date').textContent;
            document.getElementById('dateText').textContent = date;

            // Update dropdown text
            const yearId = visibleEventBlock.id.replace('event-', '');
            document.getElementById('dropdownMenuButton').textContent = yearId;

            // Turn the active event block grey
            if (activeEventBlock && activeEventBlock !== visibleEventBlock) {
                activeEventBlock.classList.remove('eventblock-active');
            }
            activeEventBlock = visibleEventBlock;
            activeEventBlock.classList.add('eventblock-active');
        } else {
            document.getElementById('dateText').textContent = '';

            // If no event block is visible, remove active class from the last active block
            if (activeEventBlock) {
                activeEventBlock.classList.remove('eventblock-active');
                activeEventBlock = null;
            }
        }

        eventBlocks.forEach(function(eventBlock) {
            const image = eventBlock.querySelector('.keyimage');
            if (image) {
                const rect = eventBlock.getBoundingClientRect();
                let threshold = 290; // Distance from the top of the page
                if (window.innerWidth <= 768) {
                    threshold = window.innerHeight / 2; // Middle of the screen on mobile
                }
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
    const dropdownMenuButton = document.getElementById('dropdownMenuButton');
    const dateTextSpan = document.getElementById('dateText');

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

        item.addEventListener('mouseover', function() {
            dateTextSpan.style.visibility = 'hidden';
        });

        item.addEventListener('mouseout', function() {
            dateTextSpan.style.visibility = 'visible';
        });

        item.addEventListener('mouseover', function() {
            dropdownMenuButton.textContent = item.textContent;
        });
    });

    const aproposButton = document.getElementById('toggleButton');
    const aproposContent = document.getElementById('info');

    function toggleDropdown(event) {
        if (aproposContent.style.display === 'none' || aproposContent.style.display === '') {
            aproposContent.style.display = 'block';
            aproposButton.querySelector('h3').textContent = 'fermer';
        } else {
            aproposContent.style.display = 'none';
            aproposButton.querySelector('h3').textContent = 'à propos';
        }
        event.stopPropagation(); // Stop the event from propagating to parent elements
    }

    aproposButton.addEventListener('click', toggleDropdown);

    // Add mobile-specific code here
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
        // Hide key image and white overlay initially
        document.querySelectorAll('.keyimage').forEach(function(image) {
            image.style.display = 'none';
        });
        document.querySelectorAll('.white-overlay').forEach(function(overlay) {
            overlay.style.display = 'none';
        });

        // Hide image and white overlay when tapped
        document.body.addEventListener('click', function(event) {
            if (!event.target.closest('.keyimage') && !event.target.closest('.white-overlay')) {
                document.querySelectorAll('.keyimage').forEach(function(image) {
                    image.style.display = 'none';
                });
                document.querySelectorAll('.white-overlay').forEach(function(overlay) {
                    overlay.style.display = 'none';
                });
            }
        });

        // Change image on vertical scroll
        window.addEventListener('scroll', function() {
            if (document.body.classList.contains('show-image')) {
                eventBlocks.forEach(function(eventBlock) {
                    const image = eventBlock.querySelector('.keyimage');
                    if (image) {
                        const rect = eventBlock.getBoundingClientRect();
                        let threshold = 290; // Distance from the top of the page
                        if (window.innerWidth <= 768) {
                            threshold = window.innerHeight / 2; // Middle of the screen on mobile
                        }
                        if (rect.top <= threshold) {
                            if (!image.classList.contains('show-image')) {
                                document.querySelectorAll('.keyimage').forEach(function(img) {
                                    img.style.display = 'none';
                                });
                                visibleImage = image;
                                image.style.display = 'block';
                            }
                        } else {
                            image.style.display = 'none';
                        }
                    }
                });
            }
        });
    }

    // Open dropdown menu on span click
    dateTextSpan.addEventListener('click', function() {
        const dropdownMenu = document.querySelector('.dropdown-menu');
        if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') {
            dropdownMenu.style.display = 'block';
        } else {
            dropdownMenu.style.display = 'none';
        }
    });

    // Toggle visibility of dropdown menu on button click
    dropdownMenuButton.addEventListener('click', function() {
        const dropdownMenu = document.querySelector('.dropdown-menu');
        if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') {
            dropdownMenu.style.display = 'block';
        } else {
            dropdownMenu.style.display = 'none';
        }
    });
});
