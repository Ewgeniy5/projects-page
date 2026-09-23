const form = document.getElementById('project-form');
const nameInput = document.getElementById('project-name');
const descInput = document.getElementById('project-desc');
const searchInput = document.getElementById('search');
const list = document.getElementById('projects-list');

let projects = JSON.parse(localStorage.getItem('projects') || '[]');

function save() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function render(filter = '') {
    list.innerHTML = '';
    const filtered = projects.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase())
    );
    filtered.forEach(p => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${p.name}</strong><br>${p.desc}`;
        list.appendChild(li);
    });
}

form.addEventListener('submit', e => {
    e.preventDefault();
    projects.push({
        name: nameInput.value,
        desc: descInput.value
    });
    save();
    nameInput.value = '';
    descInput.value = '';
    render(searchInput.value);
});

searchInput.addEventListener('input', () => {
    render(searchInput.value);
});

render();
