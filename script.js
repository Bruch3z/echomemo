document.getElementById('dateText').addEventListener('click', function() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') {
        dropdownMenu.style.display = 'block';
        dateTextSpan.style.display = 'none'; // Hide date text when dropdown menu is open
    } else {
        dropdownMenu.style.display = 'none';
        dateTextSpan.style.display = ''; // Show date text when dropdown menu is closed
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const eventBlocks = document.querySelectorAll('.eventblock');
    let activeEventBlock = null; // Track the currently active event block

    // Update visibility on page load
    updateVisibility();

    eventBlocks.forEach(function(eventBlock) {
        eventBlock.addEventListener('mouseover', function() {
            eventBlock.classList.add('eventblock-hover');
        });

        eventBlock.addEventListener('mouseout', function() {
            eventBlock.classList.remove('eventblock-hover');
        });

        const logoleft = document.querySelector('.logoleft');
        logoleft.style.opacity = '0';
    });

    const firstEventBlock = eventBlocks[0];
    const dateText = firstEventBlock.querySelector('.date').textContent;
    document.getElementById('dateText').textContent = dateText;

    const firstYear = eventBlocks[0].id.replace('event-', '');
    document.getElementById('dropdownMenuButton').textContent = firstYear;

    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateVisibility();
                ticking = false;
            });
            ticking = true;
        }
    });

    function updateVisibility() {
        let visibleEventBlock = null;
        eventBlocks.forEach(function(eventBlock) {
            const rect = eventBlock.getBoundingClientRect();
            let threshold = window.innerHeight / 2; // Middle of the screen on all devices
            if (rect.top <= threshold && rect.bottom >= threshold) {
                visibleEventBlock = eventBlock;
            }
        });

        // Toggle active state for event blocks and update opacity
        eventBlocks.forEach(function(eventBlock) {
            if (eventBlock === visibleEventBlock) {
                if (!eventBlock.classList.contains('eventblock-active')) {
                    eventBlock.classList.add('eventblock-active');
                }
                eventBlock.style.opacity = 1; // Set opacity to 100% for active event blocks
            } else {
                eventBlock.classList.remove('eventblock-active');
                eventBlock.style.opacity = 0.25; // Set opacity to 33% for inactive event blocks
            }
        });

        if (visibleEventBlock) {
            const date = visibleEventBlock.querySelector('.date').textContent;
            document.getElementById('dateText').textContent = date;

            const yearId = visibleEventBlock.id.replace('event-', '');
            document.getElementById('dropdownMenuButton').textContent = yearId;

            if (activeEventBlock && activeEventBlock !== visibleEventBlock) {
                activeEventBlock.classList.remove('eventblock-active');
                activeEventBlock.querySelectorAll('.reference hr').forEach(hr => {
                    hr.style.opacity = '0'; // Hide <hr> of previously active block
                });
            }
            activeEventBlock = visibleEventBlock;
            activeEventBlock.classList.add('eventblock-active');
            activeEventBlock.querySelectorAll('.reference hr').forEach(hr => {
                hr.style.opacity = '1'; // Show <hr> of currently active block
            });
        } else {
            document.getElementById('dateText').textContent = '';

            if (activeEventBlock) {
                activeEventBlock.classList.remove('eventblock-active');
                activeEventBlock.querySelectorAll('.reference hr').forEach(hr => {
                    hr.style.opacity = '0'; // Hide <hr> if no block is active
                });
                activeEventBlock = null;
            }
        }
    }

    const dropdownItems = document.querySelectorAll('.dropdown-item-custom');
    const dropdownMenuButton = document.getElementById('dropdownMenuButton');
    const dateTextSpan = document.getElementById('dateText');

    dropdownItems.forEach(item => {
        item.addEventListener("mouseover", function() {
            dropdownMenuButton.textContent = this.innerText;
        });
    });

    document.body.addEventListener('click', function(event) {
        const dropdownMenu = document.querySelector('.dropdown-menu');
        if (event.target !== dropdownMenu && !dropdownMenu.contains(event.target) && event.target !== dateTextSpan) {
            dropdownMenu.style.display = 'none';
            dateTextSpan.style.display = ''; // Show date text when dropdown menu is closed
        }
    });

    dropdownMenuButton.addEventListener('click', function() {
        const dropdownMenu = document.querySelector('.dropdown-menu');
        if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') {
            dropdownMenu.style.display = 'block';
            dateTextSpan.style.display = 'none'; // Hide date text when dropdown menu is open
        } else {
            dropdownMenu.style.display = 'none';
            dateTextSpan.style.display = ''; // Show date text when dropdown menu is closed
        }
    });

    const aproposButton = document.getElementById('toggleButton');
    aproposButton.addEventListener('click', toggleDropdown);
});

function toggleDropdown() {
    const aproposContent = document.getElementById('info');
    aproposContent.classList.toggle('d-none');
    const buttonText = document.getElementById('toggleButton').textContent;
    document.getElementById('toggleButton').textContent = buttonText === 'fermer' ? 'à propos' : 'fermer';
}

function toggleDropdown(event) {
    const aproposContent = document.getElementById('info');
    const buttonText = document.getElementById('toggleButton').querySelector('h3');

    if (aproposContent.style.display === 'none' || aproposContent.style.display === '') {
        aproposContent.style.display = 'block';
        buttonText.textContent = 'fermer';
    } else {
        aproposContent.style.display = 'none';
        buttonText.textContent = 'à propos';
    }
    event.stopPropagation();
}

const aproposButton = document.getElementById('toggleButton');
aproposButton.addEventListener('click', toggleDropdown);

// Get the elements
const headerLogo = document.querySelector('.headerlogo');
const headerContainer = document.querySelector('.logoleft');

let opacity = 0; // Initial opacity value

// Set up the Intersection Observer
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            // If the headerlogo is out of view, fade in the header container
            fadeIn();
        } else {
            // If the headerlogo is in view, fade out the header container
            fadeOut();
        }
    });
}, { threshold: 0 });

// Observe the headerLogo
observer.observe(headerLogo);

function fadeIn() {
    if (opacity < 1) {
        opacity += 0.2; // Adjust the increment value as needed for smoother or faster animation
        headerContainer.style.opacity = opacity;
        headerContainer.style.transform = `translateY(${(1-opacity)*-100}%)`;
        requestAnimationFrame(fadeIn);
    }
}

function fadeOut() {
    if (opacity > 0) {
        opacity -= 0.2; // Adjust the increment value as needed for smoother or faster animation
        headerContainer.style.opacity = opacity;
        headerContainer.style.transform = `translateY(${(1-opacity)*-100}%)`;
        requestAnimationFrame(fadeOut);
    }
}

// Carousel
document.addEventListener("DOMContentLoaded", function() {
    const eventBlocks = document.querySelectorAll('.eventblock');

    eventBlocks.forEach(function(eventBlock) {
        const imageCarousel = eventBlock.querySelector('.carousel');
        const imgreferenceSpan = eventBlock.querySelector('#imgreference');

        const images = imageCarousel.querySelectorAll('.carousel-item');
        let currentIndex = 0;

        images[currentIndex].classList.add('active');
        updateReference(); // Call updateReference on page load

        images.forEach(function(image) {
            image.addEventListener('click', function() {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
                updateReference();
            });
        });

        imageCarousel.addEventListener('slid.bs.carousel', function() {
            updateReference();
        });

        function updateReference() {
            const activeItem = eventBlock.querySelector('.carousel-item.active img');
            const altText = activeItem.getAttribute('alt');
            imgreferenceSpan.textContent = altText;
        }
    });
});




if (window.innerWidth <= 768) {
    const headerLogo = document.querySelector('.headerlogo');
    const logoleft = document.querySelector('.logoleft');
    const fixedDropdown = document.querySelector('.fixed-dropdown');

    let opacity = 0; // Initial opacity value

    // Set up the Intersection Observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // If the headerlogo is out of view, fade in the header container and fixed-dropdown
                fadeIn();
            } else {
                // If the headerlogo is in view, fade out the header container and fixed-dropdown
                fadeOut();
            }
        });
    }, { threshold: 0 });

    // Observe the headerLogo
    observer.observe(headerLogo);

    function fadeIn() {
        if (opacity < 1) {
            opacity += 0.05; // Adjust the increment value as needed for smoother or faster animation
            logoleft.style.opacity = opacity;
            fixedDropdown.style.opacity = opacity;
            logoleft.style.transition = 'opacity 0.25s';
            fixedDropdown.style.transition = 'opacity 0.25s';
            requestAnimationFrame(fadeIn);
        }
    }

    function fadeOut() {
        if (opacity > 0) {
            opacity -= 0.05; // Adjust the increment value as needed for smoother or faster animation
            logoleft.style.opacity = opacity;
            fixedDropdown.style.opacity = opacity;
            logoleft.style.transition = 'opacity 0.25s';
            fixedDropdown.style.transition = 'opacity 0.25s';
            requestAnimationFrame(fadeOut);
        }
    }
}
