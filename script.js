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
    let visibleImage = null; // Track the currently visible image
    let activeEventBlock = null; // Track the currently active event block

    // Set the initial visibility of the first key image
    const firstKeyImage = eventBlocks[0].querySelector('.keyimage');
    firstKeyImage.style.opacity = '1'; // Set opacity to 100%
    firstKeyImage.classList.add('show-image');

    // Set the initial date text to the date of the first event block
    const firstDate = eventBlocks[0].querySelector('.date').textContent;
    document.getElementById('dateText').textContent = firstDate;

    eventBlocks.forEach(function(eventBlock) {
        eventBlock.addEventListener('mouseover', function() {
            eventBlock.classList.add('eventblock-hover');
        });

        eventBlock.addEventListener('mouseout', function() {
            eventBlock.classList.remove('eventblock-hover');
        });
    });

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
    
        // Toggle active state for event blocks
        eventBlocks.forEach(function(eventBlock) {
            if (eventBlock === visibleEventBlock) {
                if (!eventBlock.classList.contains('eventblock-active')) {
                    eventBlock.classList.add('eventblock-active');
                }
                eventBlock.querySelectorAll('.eventdate').forEach(function(dateElement) {
                    dateElement.classList.add('eventdate-active');
                });
    
                // Update date and year when event block is in the middle of the screen
                const date = eventBlock.querySelector('.date').textContent;
                document.getElementById('dateText').textContent = date;
    
                const yearId = eventBlock.id.replace('event-', '');
                document.getElementById('dropdownMenuButton').textContent = yearId;
            } else {
                eventBlock.classList.remove('eventblock-active');
                eventBlock.querySelectorAll('.eventdate').forEach(function(dateElement) {
                    dateElement.classList.remove('eventdate-active');
                });
            }
        });

        // Hide all key images when bottom margin is reached
        const bottomMargin = document.getElementById('bottom-margin').getBoundingClientRect().bottom; // Use bottom instead of top
        const threshold = window.innerHeight / 2; // Adjust this value as needed
        if (bottomMargin <= threshold) {
            eventBlocks.forEach(function(eventBlock) {
                const image = eventBlock.querySelector('.keyimage');
                if (image) {
                    image.style.display = 'none'; // Hide key images when bottom margin is reached
                    image.classList.remove('show-image');
                }
            });
        }

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

                if (visibleImage) {
                    visibleImage.style.opacity = '0.25'; // Set opacity to 75%
                    visibleImage.classList.remove('show-image');
                    visibleImage = null;
                }
            }

            eventBlocks.forEach(function(eventBlock) {
                const image = eventBlock.querySelector('.keyimage');
                if (image) {
                    const rect = eventBlock.getBoundingClientRect();
                    let threshold = window.innerHeight / 2; // Middle of the screen on all devices
                    if (rect.top <= threshold) {
                        if (!image.classList.contains('show-image')) {
                            if (visibleImage && visibleImage !== image) {
                                visibleImage.style.opacity = '0'; // Set opacity to 75%
                                visibleImage.classList.remove('show-image');
                            }
                            visibleImage = image;
                            visibleImage.classList.add('show-image');
                            visibleImage.style.opacity = '1'; // Set opacity to 100%
                        }
                    } else {
                        image.style.opacity = '0'; // Set opacity to 75% when not visible
                        image.classList.remove('show-image');
                    }
                }
            });
            

            const bottomMarginRect = document.getElementById('bottom-margin').getBoundingClientRect();
            if (bottomMarginRect.top <= threshold && bottomMarginRect.bottom >= threshold) {
                eventBlocks.forEach(function(eventBlock) {
                    const image = eventBlock.querySelector('.keyimage');
                    if (image) {
                        image.style.opacity = '0'; // Hide key images when bottom margin is reached
                        image.classList.remove('show-image');
                    }
                });
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
        const aproposContent = document.getElementById('info');

        aproposButton.addEventListener('click', toggleDropdown);

        eventBlocks.forEach(function(eventBlock) {
            const image = eventBlock.querySelector('.keyimage');
            if (image) {
                eventBlock.addEventListener('click', function() {
                    if (image.classList.contains('show-image')) {
                        image.classList.remove('show-image');
                    } else {
                        image.classList.add('show-image');
                    }
                });
            }
        });

    });

    function toggleDropdown() {
        const aproposContent = document.getElementById('info');
        aproposContent.classList.toggle('d-none');
        const buttonText = document.getElementById('toggleButton').textContent;
        document.getElementById('toggleButton').textContent = buttonText === 'fermer' ? 'à propos' : 'fermer';
    }


    

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
    event.stopPropagation();
}

aproposButton.addEventListener('click', toggleDropdown);
