const ArtRenderer = (function() {
    'use strict';

    const CONFIG = {
        dataUrl: 'assets/data/art.json',
        gridSelector: '#art-grid',
        lightboxSelector: '#art-lightbox',
        errorMessage: 'Unable to load artwork. Please try again later.',
        emptyMessage: 'No artwork yet — check back soon.',
    };

    let artworkData = null;

    async function fetchArtwork() {
        try {
            const response = await fetch(CONFIG.dataUrl);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            return data.artwork;
        } catch (error) {
            console.error('Failed to fetch artwork:', error);
            return null;
        }
    }

    function createArtCard(piece) {
        const figure = document.createElement('figure');
        figure.className = 'art-card';
        figure.setAttribute('data-art-id', piece.id);
        figure.setAttribute('tabindex', '0');
        figure.setAttribute('role', 'button');
        figure.setAttribute('aria-label', `View ${piece.title}`);

        const img = document.createElement('img');
        // Use thumbnail if available, fall back to full image
        img.src = piece.image.thumbnail || piece.image.src;
        img.alt = piece.image.alt;
        img.loading = 'lazy';

        const overlay = document.createElement('div');
        overlay.className = 'art-card-overlay';

        const title = document.createElement('h3');
        title.textContent = piece.title;

        const medium = document.createElement('span');
        medium.textContent = piece.metadata.medium || '';

        overlay.appendChild(title);
        overlay.appendChild(medium);
        figure.appendChild(img);
        figure.appendChild(overlay);

        return figure;
    }

    function renderGrid(artwork) {
        const grid = document.querySelector(CONFIG.gridSelector);
        if (!grid) {
            console.error('Art grid container not found');
            return false;
        }

        if (artwork.length === 0) {
            const msg = document.createElement('p');
            msg.className = 'art-empty-message';
            msg.textContent = CONFIG.emptyMessage;
            grid.appendChild(msg);
            return true;
        }

        const sorted = [...artwork].sort(
            (a, b) => new Date(b.metadata.date) - new Date(a.metadata.date)
        );

        const fragment = document.createDocumentFragment();
        sorted.forEach(piece => fragment.appendChild(createArtCard(piece)));
        grid.appendChild(fragment);
        return true;
    }

    function openLightbox(piece) {
        const lightbox = document.querySelector(CONFIG.lightboxSelector);
        if (!lightbox) return;

        document.getElementById('lightbox-img').src = piece.image.src;
        document.getElementById('lightbox-img').alt = piece.image.alt;
        document.getElementById('lightbox-title').textContent = piece.title;
        document.getElementById('lightbox-description').textContent = piece.description || '';
        document.getElementById('lightbox-medium').textContent = piece.metadata.medium || '';

        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Focus the close button for keyboard accessibility
        lightbox.querySelector('.lightbox-close').focus();
    }

    function closeLightbox() {
        const lightbox = document.querySelector(CONFIG.lightboxSelector);
        if (!lightbox) return;

        lightbox.classList.add('hidden');
        document.body.style.overflow = '';

        // Clear src to stop any in-progress image loads
        const img = document.getElementById('lightbox-img');
        img.src = '';
        img.alt = '';
    }

    function attachEventListeners() {
        const grid = document.querySelector(CONFIG.gridSelector);
        if (!grid || !artworkData) return;

        // Open lightbox on card click or Enter key
        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.art-card');
            if (!card) return;
            const id = card.getAttribute('data-art-id');
            const piece = artworkData.find(p => p.id === id);
            if (piece) openLightbox(piece);
        });

        grid.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            const card = e.target.closest('.art-card');
            if (!card) return;
            e.preventDefault();
            const id = card.getAttribute('data-art-id');
            const piece = artworkData.find(p => p.id === id);
            if (piece) openLightbox(piece);
        });

        // Close lightbox
        const lightbox = document.querySelector(CONFIG.lightboxSelector);
        if (!lightbox) return;

        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

        // Click outside the image content to close
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
                closeLightbox();
            }
        });
    }

    function showError() {
        const grid = document.querySelector(CONFIG.gridSelector);
        if (!grid) return;
        const msg = document.createElement('p');
        msg.textContent = CONFIG.errorMessage;
        msg.style.textAlign = 'center';
        msg.style.color = '#e74c3c';
        msg.style.padding = '40px 20px';
        grid.appendChild(msg);
    }

    async function init() {
        artworkData = await fetchArtwork();

        if (artworkData === null) {
            showError();
            return false;
        }

        renderGrid(artworkData);
        attachEventListeners();
        return true;
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
    ArtRenderer.init();
});
