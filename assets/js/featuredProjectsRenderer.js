/**
 * Featured Projects Renderer
 * Displays featured projects on the home page
 */

const FeaturedProjectsRenderer = (function() {
    'use strict';

    // Configuration
    const CONFIG = {
        dataUrl: 'assets/data/projects.json',
        containerSelector: '#featured-container',
        maxFeatured: 3, // Maximum number of featured projects to display
        errorMessage: 'Unable to load featured projects.',
    };

    /**
     * Fetch projects from JSON file
     * @returns {Promise<Array>} Array of project objects
     */
    async function fetchProjects() {
        try {
            const response = await fetch(CONFIG.dataUrl);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            return data.projects;
        } catch (error) {
            console.error('Failed to fetch featured projects:', error);
            return null;
        }
    }

    /**
     * Create a featured project card element
     * @param {Object} project - Project data object
     * @returns {HTMLElement} Featured project card element
     */
    function createFeaturedCard(project) {
        // Create card container
        const card = document.createElement('div');
        card.className = 'featured-project-card';
        card.setAttribute('data-project-id', project.id);

        // Create title
        const title = document.createElement('h3');
        title.textContent = project.title;

        // Create image
        const img = document.createElement('img');
        img.src = project.image.src;
        img.alt = project.image.alt;
        img.loading = 'lazy';

        // Create description
        const description = document.createElement('p');
        description.textContent = project.description;

        // Create "View Projects" link
        const link = document.createElement('a');
        link.href = 'projects.html';
        link.className = 'featured-link';
        link.textContent = 'View All Projects →';

        // Assemble the card
        card.appendChild(title);
        card.appendChild(img);
        card.appendChild(description);

        return card;
    }

    /**
     * Render featured projects to the DOM
     * @param {Array} projects - Array of featured project objects
     * @returns {boolean} Success status
     */
    function renderFeaturedProjects(projects) {
        const container = document.querySelector(CONFIG.containerSelector);

        if (!container) {
            console.error('Featured container not found');
            return false;
        }

        // Filter for featured projects only
        const featuredProjects = projects
            .filter(p => p.metadata.featured)
            .sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date))
            .slice(0, CONFIG.maxFeatured);

        if (featuredProjects.length === 0) {
            // No featured projects - hide the section
            const featuredSection = document.querySelector('.featured-projects');
            if (featuredSection) {
                featuredSection.style.display = 'none';
            }
            return true;
        }

        // Create document fragment for better performance
        const fragment = document.createDocumentFragment();
        featuredProjects.forEach(project => {
            fragment.appendChild(createFeaturedCard(project));
        });

        // Add a "View All Projects" link at the end
        const viewAllContainer = document.createElement('div');
        viewAllContainer.className = 'view-all-container';
        viewAllContainer.style.width = '100%';
        viewAllContainer.style.textAlign = 'center';
        viewAllContainer.style.marginTop = '20px';

        const viewAllLink = document.createElement('a');
        viewAllLink.href = 'projects.html';
        viewAllLink.className = 'view-all-link';
        viewAllLink.textContent = 'View All Projects →';
        viewAllLink.style.fontSize = '1.1em';
        viewAllLink.style.fontWeight = 'bold';
        viewAllLink.style.color = '#3498db';
        viewAllLink.style.textDecoration = 'none';
        viewAllLink.style.transition = 'color 0.3s ease';

        viewAllLink.addEventListener('mouseenter', () => {
            viewAllLink.style.color = '#2980b9';
        });
        viewAllLink.addEventListener('mouseleave', () => {
            viewAllLink.style.color = '#3498db';
        });

        viewAllContainer.appendChild(viewAllLink);

        // Insert cards and view all link
        container.appendChild(fragment);
        container.appendChild(viewAllContainer);

        return true;
    }

    /**
     * Show error message to user
     */
    function showError() {
        const container = document.querySelector(CONFIG.containerSelector);
        if (!container) return;

        const errorText = document.createElement('p');
        errorText.textContent = CONFIG.errorMessage;
        errorText.style.textAlign = 'center';
        errorText.style.color = '#e74c3c';

        container.appendChild(errorText);
    }

    /**
     * Initialize the featured projects renderer
     * @returns {Promise<boolean>} Success status
     */
    async function init() {
        const projects = await fetchProjects();

        if (!projects || projects.length === 0) {
            showError();
            return false;
        }

        return renderFeaturedProjects(projects);
    }

    // Public API
    return {
        init
    };
})();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    FeaturedProjectsRenderer.init();
});
