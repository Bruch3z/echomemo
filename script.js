document.addEventListener("DOMContentLoaded", function() {
    const eventTitles = document.querySelectorAll('.event-title');

    eventTitles.forEach(function(title) {
        title.addEventListener('mouseenter', function() {
            const eventblockContainer = title.closest('.eventblock');
            if (eventblockContainer) {
                eventblockContainer.classList.add('red-text');
            }

            const image = eventblockContainer.querySelector('.keyimage');
            if (image) {
                image.classList.add('show-image');
            }

            eventTitles.forEach(function(otherTitle) {
                if (otherTitle !== title) {
                    const otherEventblockContainer = otherTitle.closest('.eventblock');
                    if (otherEventblockContainer) {
                        otherEventblockContainer.classList.add('blur');
                    }
                }
            });
        });

        title.addEventListener('mouseleave', function() {
            const eventblockContainer = title.closest('.eventblock');
            if (eventblockContainer) {
                eventblockContainer.classList.remove('red-text');
            }

            const image = eventblockContainer.querySelector('.keyimage');
            if (image) {
                image.classList.remove('show-image');
            }

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

    document.getElementById('toggleButton').addEventListener('click', toggleInfo);

    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                let offset = window.innerWidth >= 768 ? 280 : 80; // Offset for desktop and mobile
                const scrollPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
            }
        });
    });
});
