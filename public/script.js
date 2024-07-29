// File: public/script.js
let tools = [];

async function fetchTools() {
    const response = await fetch('/api/tools');
    tools = await response.json();
    renderTools();
}

function renderTools() {
    const categoriesGrid = document.getElementById('categories');
    categoriesGrid.innerHTML = '';

    const categories = [...new Set(tools.map(tool => tool.category))];
    
    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category';
        categoryElement.innerHTML = `
            <h2>${category}</h2>
            <ul>
                ${tools.filter(tool => tool.category === category)
                    .map(tool => `<li>${tool.name}</li>`)
                    .join('')}
            </ul>
        `;
        categoriesGrid.appendChild(categoryElement);
    });
}

function openAddToolModal() {
    document.getElementById('add-tool-modal').style.display = 'block';
}

function closeAddToolModal() {
    document.getElementById('add-tool-modal').style.display = 'none';
}

document.getElementById('add-tool-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newTool = {
        name: document.getElementById('tool-name').value,
        category: document.getElementById('tool-category').value,
        description: document.getElementById('tool-description').value
    };

    const response = await fetch('/api/tools', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTool)
    });

    if (response.ok) {
        closeAddToolModal();
        fetchTools();
    }
});

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

fetchTools();
