const API_URL = '/api/doctors';
let doctors = [];
let editMode = false;
let currentDoctorId = null;

// DOM Elements
const doctorsTableBody = document.getElementById('doctorsTableBody');
const doctorForm = document.getElementById('doctorForm');
const doctorModal = new bootstrap.Modal(document.getElementById('doctorModal'));
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
const doctorCountEl = document.getElementById('doctorCount');
const quickSearchResults = document.getElementById('quickSearchResults');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchDoctors();
    updateCount();
});

// Fetch all doctors
async function fetchDoctors() {
    try {
        const response = await fetch(API_URL);
        doctors = await response.json();
        renderDoctors(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
    }
}

// Render doctors to table
function renderDoctors(doctorsList) {
    doctorsTableBody.innerHTML = '';
    doctorsList.forEach(doctor => {
        const row = `
            <tr>
                <td><span class="badge bg-light text-dark">#${doctor.id}</span></td>
                <td><div class="fw-bold">${doctor.name}</div></td>
                <td><span class="text-primary fw-semibold">${doctor.specialization}</span></td>
                <td><i class="fas fa-phone-alt me-2 text-muted small"></i>${doctor.contact}</td>
                <td>
                    <button class="btn-action btn-edit me-1" onclick="openEditModal('${doctor.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action btn-delete" onclick="confirmDelete('${doctor.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        doctorsTableBody.innerHTML += row;
    });
}

// Search logic
async function searchDoctors(query) {
    if (!query) {
        fetchDoctors();
        return;
    }
    try {
        const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`);
        const results = await response.json();
        renderDoctors(results);
    } catch (error) {
        console.error('Error searching doctors:', error);
    }
}

// Handle quick search on dashboard
async function handleQuickSearch(query) {
    if (query.length < 2) {
        quickSearchResults.innerHTML = '';
        return;
    }
    try {
        const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`);
        const results = await response.json();
        quickSearchResults.innerHTML = '';
        results.slice(0, 3).forEach(d => {
            const item = `
                <div class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <div class="fw-bold">${d.name}</div>
                        <small class="text-muted">${d.specialization}</small>
                    </div>
                    <button class="btn btn-sm btn-outline-primary" onclick="viewDoctorDetail('${d.id}')">View</button>
                </div>
            `;
            quickSearchResults.innerHTML += item;
        });
    } catch (error) {
        console.error('Error in quick search:', error);
    }
}

function viewDoctorDetail(id) {
    showSection('view-doctors');
    document.getElementById('mainSearch').value = id;
    searchDoctors(id);
}

// Update count
async function updateCount() {
    try {
        const response = await fetch(`${API_URL}/count`);
        const count = await response.json();
        doctorCountEl.innerText = count;
    } catch (error) {
        console.error('Error fetching count:', error);
    }
}

// Show/Hide Sections
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.add('d-none'));
    document.getElementById(sectionId).classList.remove('d-none');
    
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    event.target.classList.add('active');
}

// Modal management
function openAddModal() {
    editMode = false;
    currentDoctorId = null;
    document.getElementById('modalTitle').innerText = 'Add New Doctor';
    document.getElementById('doctorId').disabled = false;
    doctorForm.reset();
    doctorModal.show();
}

function openEditModal(id) {
    editMode = true;
    currentDoctorId = id;
    const doctor = doctors.find(d => d.id === id);
    if (doctor) {
        document.getElementById('modalTitle').innerText = 'Update Doctor';
        document.getElementById('doctorId').value = doctor.id;
        document.getElementById('doctorId').disabled = true;
        document.getElementById('doctorName').value = doctor.name;
        document.getElementById('doctorSpecialization').value = doctor.specialization;
        document.getElementById('doctorContact').value = doctor.contact;
        doctorModal.show();
    }
}

// Form Submission
doctorForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const doctorData = {
        id: document.getElementById('doctorId').value,
        name: document.getElementById('doctorName').value,
        specialization: document.getElementById('doctorSpecialization').value,
        contact: document.getElementById('doctorContact').value
    };

    // Validation
    const idRegex = /^D\d{3}$/;
    const phoneRegex = /^\d{10}$/;

    if (!doctorData.id || !idRegex.test(doctorData.id)) {
        alert('Invalid Doctor ID! Format should be D followed by 3 digits (e.g., D001).');
        return;
    }
    if (!doctorData.name || doctorData.name.trim().length < 3) {
        alert('Full Name must be at least 3 characters long.');
        return;
    }
    if (!doctorData.specialization || doctorData.specialization.trim().length < 3) {
        alert('Specialization must be at least 3 characters long.');
        return;
    }
    if (!doctorData.contact || !phoneRegex.test(doctorData.contact)) {
        alert('Invalid Contact Number! Must be exactly 10 digits.');
        return;
    }

    try {
        let response;
        if (editMode) {
            response = await fetch(`${API_URL}/${currentDoctorId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(doctorData)
            });
        } else {
            response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(doctorData)
            });
        }

        if (response.ok) {
            doctorModal.hide();
            fetchDoctors();
            updateCount();
            doctorForm.reset();
        }
    } catch (error) {
        console.error('Error saving doctor:', error);
    }
});

// Delete Logic
let idToDelete = null;
function confirmDelete(id) {
    idToDelete = id;
    deleteModal.show();
}

document.getElementById('confirmDeleteBtn').onclick = async () => {
    if (idToDelete) {
        try {
            const response = await fetch(`${API_URL}/${idToDelete}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                deleteModal.hide();
                fetchDoctors();
                updateCount();
            }
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    }
};
