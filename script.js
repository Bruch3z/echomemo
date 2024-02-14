document.addEventListener("DOMContentLoaded", function() {
    // Select all event titles
    const eventTitles = document.querySelectorAll('.event-title');

    // Loop through each event title
    eventTitles.forEach(function(title) {
        // Add event listener for mouseenter (hover over)
        title.addEventListener('mouseenter', function() {
            // Find the parent container of the event title
            const eventblockContainer = title.closest('.eventblock');

            // Add a class to make the text red
            if (eventblockContainer) {
                eventblockContainer.classList.add('red-text');
            }

            // Show the corresponding hidden image
            const image = eventblockContainer.querySelector('.keyimage');
            if (image) {
                image.classList.add('show-image');
            }

            // Blur all other event blocks
            eventTitles.forEach(function(otherTitle) {
                if (otherTitle !== title) {
                    const otherEventblockContainer = otherTitle.closest('.eventblock');
                    if (otherEventblockContainer) {
                        otherEventblockContainer.classList.add('blur');
                    }
                }
            });
        });

        // Add event listener for mouseleave (hover off)
        title.addEventListener('mouseleave', function() {
            // Find the parent container of the event title
            const eventblockContainer = title.closest('.eventblock');

            // Remove the class to revert back to the original color
            if (eventblockContainer) {
                eventblockContainer.classList.remove('red-text');
            }

            // Hide the image
            const image = eventblockContainer.querySelector('.keyimage');
            if (image) {
                image.classList.remove('show-image');
            }

            // Remove the blur effect from all other event blocks
            eventTitles.forEach(function(otherTitle) {
                if (otherTitle !== title) {
                    const otherEventblockContainer = otherTitle.closest('.eventblock');
                    if (otherEventblockContainer) {
                        otherEventblockContainer.classList.remove('blur');
                    }
                }
            });
        });
    });

    // A propos
    function toggleInfo() {
        var info = document.getElementById('info');
        var button = document.getElementById('toggleButton');
        if (info.style.display === 'none') {
            info.style.display = 'block';
            button.innerHTML = '<h3> fermer </h3>';
        } else {
            info.style.display = 'none';
            button.innerHTML = '<h3> à propos </h3>';
        }
    }

    // Add event listener to the "à propos" button
    document.getElementById('toggleButton').addEventListener('click', toggleInfo);
});
