function saveNote() {
    const noteTitle = document.getElementById('noteTitle').value;
    const noteSubject = document.getElementById('noteSubject').value;
    const noteContent = document.getElementById('noteInput').value;
    if (!noteTitle || !noteContent) {
        alert('Please provide both title and content for your note.');
        return;
    }
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('You must be logged in to save notes.');
        return;
    }
    const note = {
        title: noteTitle,
        subject: noteSubject,
        content: noteContent,
        date: new Date().toLocaleString(),
        user: currentUser.username
    };
    let userNotes = JSON.parse(localStorage.getItem(`notes_${currentUser.username}`)) || [];
    userNotes.push(note);
    localStorage.setItem(`notes_${currentUser.username}`, JSON.stringify(userNotes));
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteInput').value = '';
    displayNotes();
}
function displayNotes() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const notes = JSON.parse(localStorage.getItem(`notes_${currentUser.username}`)) || [];
    const display = document.getElementById('notesDisplay');
    
    if (notes.length === 0) {
        display.innerHTML = '<p>You have no saved notes yet.</p>';
        return;
    }
    
    display.innerHTML = '<h3>Your Saved Notes:</h3>';
    
    notes.forEach((note, index) => {
        display.innerHTML += `
            <div class="note-card">
                <h4>${note.title}</h4>
                <div class="note-info">
                    <span class="note-subject">${note.subject}</span>
                    <span class="note-date">${note.date}</span>
                </div>
                <p>${note.content}</p>
                <button onclick="deleteNote(${index})" class="delete-button">Delete</button>
            </div>
        `;
    });
}
function deleteNote(index) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    let userNotes = JSON.parse(localStorage.getItem(`notes_${currentUser.username}`)) || [];
    userNotes.splice(index, 1);
    localStorage.setItem(`notes_${currentUser.username}`, JSON.stringify(userNotes));
    displayNotes();
}

function runRegexSearch() {
    const regexInput = document.getElementById('regexSearch').value;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    const notes = JSON.parse(localStorage.getItem(`notes_${currentUser.username}`)) || [];
    const result = document.getElementById('regexResult');
    
    if (!regexInput) {
        result.innerHTML = 'Please enter a search pattern';
        return;
    }
    
    try {
        const regex = new RegExp(regexInput, 'i');
        const matches = notes.filter(note => 
            regex.test(note.title) || regex.test(note.content)
        );
        
        if (matches.length === 0) {
            result.innerHTML = 'No matches found.';
            return;
        }
        result.innerHTML = '<h4>Search Results:</h4>';
        matches.forEach(note => {
            result.innerHTML += `
                <div class="search-result">
                    <h5>${note.title}</h5>
                    <p>${note.content}</p>
                </div>
            `;
        });
    } catch (e) {
        result.innerHTML = 'Invalid Regular Expression';
    }
}
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginText = document.getElementById('loginText');
    const notesContainer = document.getElementById('notesContainer');
    const loginPrompt = document.getElementById('loginPrompt');
    
    if (currentUser) {
        if (loginText) loginText.textContent = 'Logout';
        
        if (notesContainer && loginPrompt) {
            notesContainer.style.display = 'block';
            loginPrompt.style.display = 'none';
            displayNotes();
        }
    } else {
        if (loginText) loginText.textContent = 'Login';
        
        if (notesContainer && loginPrompt) {
            notesContainer.style.display = 'none';
            loginPrompt.style.display = 'block';
        }
    }
}
function toggleLogin() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')); 
    if (currentUser) {
        localStorage.removeItem('currentUser');
        alert('You have been logged out successfully.');
        window.location.href = 'index.html';
    } else {
        window.location.href = 'login.html';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    const loginNav = document.getElementById('loginNav');
    if (loginNav) {
        loginNav.addEventListener('click', function(e) {
            e.preventDefault();
            toggleLogin();
        });
    }
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
});
window.addEventListener('load', function() {
    if (document.getElementById('notesDisplay')) {
        checkLoginStatus();
    }
});