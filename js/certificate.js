document.addEventListener("DOMContentLoaded", () => {
    const certificates = document.querySelectorAll('.certificate-item');
    const modalOverlay = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');

    const certificateImages = {
        an: 'pictures/profile.jpg', // Understanding Data Visualization
        on: 'pictures/profile.jpg', // Understanding Prompt Engineering
        enz: 'pictures/profile.jpg', // Introduction to Data
        'in': 'pictures/profile.jpg', // Cybersecurity Basics  
        un: 'pictures/profile.jpg'  // Project Management Fundamentals
    };

    certificates.forEach(cert => {
        cert.addEventListener('click', () => {
            const certName = cert.dataset.certificate;
            modalImage.src = certificateImages[certName]; // exact file path
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent background scroll
        });
    });

    closeModal.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        modalImage.src = ''; // reset
        document.body.style.overflow = 'auto';
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            modalImage.src = ''; // reset
            document.body.style.overflow = 'auto';
        }
    });
});