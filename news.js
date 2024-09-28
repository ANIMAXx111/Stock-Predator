document.addEventListener('DOMContentLoaded', () => {
    AOS.init(); // Initialize AOS animations

    // Fetch news from NewsAPI
    const apiKey = '55300bfb688647fe951b5038b41bad00';
    const apiUrl = `https://newsapi.org/v2/everything?q=stock+market&apiKey=${apiKey}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const articles = data.articles;
        const newsSection = document.getElementById('news-section');

        // Clear any existing news
        newsSection.innerHTML = '';

        articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('news-article');

            // Populate the article element with image, title, and description
            articleElement.innerHTML = `
                <img src="${article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="${article.title}">
                <div class="news-article-content">
                    <h2>${article.title}</h2>
                    <p>${article.description || 'No description available'}</p>
                </div>
            `;

            // Add click event to show modal with full news content
            articleElement.addEventListener('click', () => {
                showModal(article);
            });

            newsSection.appendChild(articleElement);
        });
    })
    .catch(error => console.error('Error fetching news:', error));

    // Modal functionality
    const modal = document.getElementById('news-modal');
    const modalContent = document.getElementById('modal-article');
    const closeBtn = document.querySelector('.modal .close');

    function showModal(article) {
        modalContent.innerHTML = `
            <h1>${article.title}</h1>
            <img src="${article.urlToImage || 'https://via.placeholder.com/800x400?text=No+Image'}" alt="${article.title}" style="width: 100%; height: auto;">
            <p>${article.content || 'No content available'}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside of content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Smooth scroll effect for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Shrink image when clicked
    const articles = document.querySelectorAll('.news-article');
    articles.forEach(article => {
        article.addEventListener('click', function () {
            const img = this.querySelector('img');
            img.classList.toggle('shrink');
        });
    });
});
