import { showSnackbar } from './snackbar.js';

let jobs = [];

document.getElementById("new-job-form").addEventListener("submit", addBtnClicked);

function addBtnClicked(event) {
    event.preventDefault();

    const jobInput = document.getElementById("job");
    const job = jobInput.value.trim();

    if (job === "") {
        showSnackbar("Boş iş girilemez.", "error");
        jobInput.value = "";

        return;
    }

    if (jobs.includes(job)) {
        showSnackbar("Bu iş zaten mevcut.", "error");
        jobInput.value = "";
        return;
    }

    jobs.push(job);
    jobInput.value = "";
    refreshList();
    showSnackbar("İş eklendi.", "success");
}

function refreshList() {
    const todoList = document.getElementById('todo-list');
    
    if (jobs.length === 0) {
        todoList.innerHTML = '<li class="empty-list">Yapılacak iş eklenmedi</li>';
        return;
    }
    
    todoList.innerHTML = jobs.map((item, index) => `
        <li class="todo-item" data-index="${index}">
            <span class="todo-text">${item}</span>
            <button class="delete-btn">Sil</button>
        </li>
    `).join('');

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', deleteBtnClick);
    });

    document.querySelectorAll('.todo-text').forEach(text => {
        text.addEventListener('click', toggleComplete);
    });
}

function deleteBtnClick(event) {
    const todoItem = event.target.closest('.todo-item');
    const index = todoItem.dataset.index;

    jobs.splice(index, 1);
    refreshList();
    showSnackbar("İş silindi.", "success");
}

function toggleComplete(event) {
    const todoItem = event.target.closest('.todo-item');
    todoItem.classList.toggle('completed');
    
    if (todoItem.classList.contains('completed')) {
        showSnackbar("İş tamamlandı!", "success");
    }
}

function loadFromLocalStorage() {
    const savedJobs = localStorage.getItem('todoJobs');
    if (savedJobs) {
        jobs = JSON.parse(savedJobs);
        refreshList();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('todoJobs', JSON.stringify(jobs));
}

const originalRefreshList = refreshList;
refreshList = function() {
    originalRefreshList();
    saveToLocalStorage();
};

// Sayfa yüklendiğinde kaydedilmiş işleri yükle
document.addEventListener('DOMContentLoaded', loadFromLocalStorage);