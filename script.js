// Get today's date and calculate the day number of the year
const today = new Date();
const startOfYear = new Date(today.getFullYear(), 0, 0);
const dayOfYear = Math.floor((today - startOfYear) / 86400000) - 335;

// Fetching the JSON data
fetch('images.json')
    .then(response => response.json())
    .then(images => {
        const imageContainer = document.getElementById('image-container');
        const dailyImage = document.getElementById('daily-image');
        const caption = document.getElementById('caption');
        const day = document.getElementById('day');
        const titleElement = document.querySelector('h1'); // Select the <h1> element
        const imageData = images.find(image => image.day === dayOfYear);
        

        // Set the initial image
        dailyImage.src = `images/${imageData.filename}`;
        dailyImage.style.visibility = 'hidden';
        caption.textContent = imageData.caption;
        caption.style.visibility = 'hidden'; 
        day.textContent = `${imageData.dayname} Türli`;
        day.style.visibility = 'visible';

        // Update the title dynamically
        titleElement.innerHTML = `J's Adväntskalender`; // Update <h1>

        // Add click event to toggle image and caption
        imageContainer.addEventListener('click', () => {
            if (dailyImage.style.visibility == 'hidden' && caption.style.visibility == 'hidden') {
                day.style.visibility = 'hidden'; // Hide the day
                caption.style.visibility = 'visible';   // Show the caption
            } else if (day.style.visibility == 'hidden' && dailyImage.style.visibility == 'hidden') {
                dailyImage.style.visibility = 'visible'; // Show the image
                caption.style.visibility = 'hidden';     // Hide the caption
            } else {
                dailyImage.style.visibility = 'hidden'; // Hide the image
                caption.style.visibility = 'visible';       // Show the day
            }
        });
    })
    .catch(error => console.error('Error loading the JSON file:', error));


    