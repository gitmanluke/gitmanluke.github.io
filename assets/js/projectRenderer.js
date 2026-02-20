/**
 * Project Renderer
 * Fetches project data from JSON and dynamically generates project HTML
 */

const ProjectRenderer = (function() {
    'use strict';

    // Configuration
    const CONFIG = {
        dataUrl: 'assets/data/projects.json',
        containerSelector: '.Engineering-content',
        insertionPoint: '.projects', // Insert after this element
        errorMessage: 'Unable to load projects. Please try again later.',
    };

    // Private state
    let projectsData = null;

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
            console.error('Failed to fetch projects:', error);
            return null;
        }
    }

    /**
     * Create a project DOM element
     * @param {Object} project - Project data object
     * @returns {HTMLElement} Project section element
     */
    function createProjectElement(project) {
        // Create main section element
        const section = document.createElement('section');
        section.className = 'project-description';
        section.setAttribute('data-project-id', project.id);

        // Create title
        const title = document.createElement('h2');
        title.textContent = project.title;

        // Create image container
        const imageDiv = document.createElement('div');
        imageDiv.className = 'project-image';

        // Create image
        const img = document.createElement('img');
        img.src = project.image.src;
        img.alt = project.image.alt;
        img.loading = 'lazy'; // Performance optimization

        // Create description
        const description = document.createElement('p');
        description.textContent = project.description;

        // Assemble the DOM structure
        imageDiv.appendChild(img);
        section.appendChild(title);
        section.appendChild(imageDiv);
        section.appendChild(description);

        return section;
    }

    /**
     * Sort projects by date (newest first) and featured status
     * @param {Array} projects - Array of project objects
     * @returns {Array} Sorted array of projects
     */
    function sortProjects(projects) {
        return projects.sort((a, b) => {
            // Featured projects come first
            if (a.metadata.featured !== b.metadata.featured) {
                return a.metadata.featured ? -1 : 1;
            }
            // Then sort by date (newest first)
            return new Date(b.metadata.date) - new Date(a.metadata.date);
        });
    }

    /**
     * Render projects to the DOM
     * @param {Array} projects - Array of project objects
     * @returns {boolean} Success status
     */
    function renderProjects(projects) {
        const container = document.querySelector(CONFIG.containerSelector);
        const insertAfter = container.querySelector(CONFIG.insertionPoint);

        if (!container || !insertAfter) {
            console.error('Container elements not found');
            return false;
        }

        // Sort projects before rendering
        const sortedProjects = sortProjects([...projects]);

        // Create document fragment for better performance
        const fragment = document.createDocumentFragment();
        sortedProjects.forEach(project => {
            fragment.appendChild(createProjectElement(project));
        });

        // Insert all projects at once after the page title section
        insertAfter.parentNode.insertBefore(fragment, insertAfter.nextSibling);
        return true;
    }

    /**
     * Show error message to user
     */
    function showError() {
        const container = document.querySelector(CONFIG.containerSelector);
        if (!container) return;

        const errorSection = document.createElement('section');
        errorSection.className = 'project-error';
        errorSection.style.textAlign = 'center';
        errorSection.style.padding = '40px 20px';
        errorSection.style.color = '#e74c3c';

        const errorText = document.createElement('p');
        errorText.textContent = CONFIG.errorMessage;

        errorSection.appendChild(errorText);
        container.appendChild(errorSection);
    }

    /**
     * Initialize the project renderer
     * @returns {Promise<boolean>} Success status
     */
    async function init() {
        projectsData = await fetchProjects();

        if (!projectsData || projectsData.length === 0) {
            showError();
            return false;
        }

        return renderProjects(projectsData);
    }

    /**
     * Get all projects data
     * @returns {Array|null} Array of projects or null if not loaded
     */
    function getProjects() {
        return projectsData;
    }

    /**
     * Filter projects by category
     * @param {string} category - Category name
     * @returns {Array} Filtered projects
     */
    function filterByCategory(category) {
        if (!projectsData) return [];
        return projectsData.filter(p => p.metadata.category === category);
    }

    /**
     * Get featured projects
     * @returns {Array} Featured projects
     */
    function getFeaturedProjects() {
        if (!projectsData) return [];
        return projectsData.filter(p => p.metadata.featured);
    }

    // Public API
    return {
        init,
        getProjects,
        filterByCategory,
        getFeaturedProjects
    };
})();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ProjectRenderer.init();
});
