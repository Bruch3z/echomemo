document.addEventListener("DOMContentLoaded", function() {
    // Select all event title elements
    const eventTitles = document.querySelectorAll('.event-title');

    // Loop through each event title element
    eventTitles.forEach(function(title) {
        // Add event listener for mouseenter (hover over)
        title.addEventListener('mouseenter', function() {
            // Find the parent container of the event title
            const eventblockContainer = title.closest('.eventblock');

            // Find the corresponding hidden image within the same container
            const image = eventblockContainer.querySelector('.keyimage');

            // Add a class to show the corresponding hidden image
            if (image) {
                image.classList.add('show-image');
            }
        });

        // Add event listener for mouseleave (hover off)
        title.addEventListener('mouseleave', function() {
            const eventblockContainer = title.closest('.eventblock');

            const image = eventblockContainer.querySelector('.keyimage');

            if (image) {
                image.classList.remove('show-image');
            }
        });
    });
});
