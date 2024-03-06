document.addEventListener("DOMContentLoaded", function() {
    const eventBlocks = document.querySelectorAll('.eventblock');
    let visibleImage = null; // Track the currently visible image
    let activeEventBlock = null; // Track the currently active event block

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
                            visibleImage.style.opacity = '0.25'; // Set opacity to 75%
                            visibleImage.classList.remove('show-image');
                        }
                        visibleImage = image;
                        visibleImage.classList.add('show-image');
                        visibleImage.style.opacity = '1'; // Set opacity to 100%
                    }
                } else {
                    image.style.opacity = '0.25'; // Set opacity to 75% when not visible
                    image.classList.remove('show-image');
                }
            }
        });
    }

    const dropdownItems = document.querySelectorAll('.dropdown-item-custom');
    const dropdownMenuButton = document.getElementById('dropdownMenuButton');
    const dateTextSpan = document.getElementById('dateText');

    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const offset = 0;
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
        event.stopPropagation();
    }

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

    dateTextSpan.addEventListener('click', function() {
        const dropdownMenu = document.querySelector('.dropdown-menu');
        if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') {
            dropdownMenu.style.display = 'block';
        } else {
            dropdownMenu.style.display = 'none';
        }
    });

    dropdownMenuButton.addEventListener('click', function() {
        const dropdownMenu = document.querySelector('.dropdown-menu');
        if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') {
            dropdownMenu.style.display = 'block';
        } else {
            dropdownMenu.style.display = 'none';
        }
    });
});
