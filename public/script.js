document.addEventListener('DOMContentLoaded', function () {
    const dietForm = document.getElementById('diet-form');
    const pdfUpload = document.getElementById('pdf-upload');
    const dietOutput = document.getElementById('diet-output');
    const recommendationSection = document.getElementById('diet-recommendation');

    // Handle form submission
    dietForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Show loading state
        dietOutput.textContent = "Generating your personalized diet plan...";
        recommendationSection.style.display = "block";

        try {
            const formData = new FormData(dietForm);

            const response = await fetch('/get-diet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData))
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            dietOutput.innerHTML = formatRecommendation(data.recommendation);
        } catch (error) {
            console.error('Error:', error);
            dietOutput.textContent = "Failed to generate diet recommendation. Please try again.";
        }
    });


});