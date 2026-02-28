// ========== PROJECT FILTERING SYSTEM ==========

class ProjectFilter {
    constructor() {
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.createFilterButtons();
        this.attachEventListeners();
    }

    createFilterButtons() {
        const filterContainer = document.querySelector('.filter-container');
        if (!filterContainer) return;

        const categories = ['all', 'residential', 'commercial', 'institutional', 'landscape'];
        const filterHTML = categories.map(cat => `
            <button class="filter-btn ${cat === 'all' ? 'active' : ''}" data-filter="${cat}">
                ${cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
        `).join('');

        filterContainer.innerHTML = filterHTML;
    }

    attachEventListeners() {
        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.filterProjects(filter);

                // Update active state
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    filterProjects(category) {
        const projects = document.querySelectorAll('.project-card');

        projects.forEach((project, index) => {
            const projectCategory = project.dataset.category;

            if (category === 'all' || projectCategory === category) {
                setTimeout(() => {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.classList.add('visible');
                    }, 50);
                }, index * 50);
            } else {
                project.classList.remove('visible');
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Initialize on projects page
if (document.querySelector('.filter-container')) {
    document.addEventListener('DOMContentLoaded', () => {
        new ProjectFilter();
    });
}
