const form = document.getElementById('flashcard-form');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const grid = document.getElementById('flashcards-grid');
const emptyMessage = document.getElementById('empty-message');
const cardCount = document.getElementById('card-count');

let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

function saveFlashcards() {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    updateUI();
}

function updateUI() {
    grid.innerHTML = '';
    cardCount.textContent = `${flashcards.length} Flashcard${flashcards.length !== 1 ? 's' : ''}`;
    
    if (flashcards.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
        flashcards.forEach((card, index) => {
            const cardEl = document.createElement('div');
            cardEl.className = 'flashcard';
            cardEl.innerHTML = `
                <div class="card-content">
                    <p class="question"><strong>Q:</strong> ${card.question}</p>
                    <p class="answer" style="display: none;"><strong>A:</strong> ${card.answer}</p>
                </div>
                <button class="delete-btn" onclick="deleteCard(event, ${index})">Delete</button>
            `;
            
            // Toggle answer on click
            cardEl.querySelector('.card-content').addEventListener('click', () => {
                const answer = cardEl.querySelector('.answer');
                const question = cardEl.querySelector('.question');
                if (answer.style.display === 'none') {
                    answer.style.display = 'block';
                    question.style.display = 'none';
                } else {
                    answer.style.display = 'none';
                    question.style.display = 'block';
                }
            });
            
            grid.appendChild(cardEl);
        });
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();
    
    if (question && answer) {
        flashcards.push({ question, answer });
        saveFlashcards();
        form.reset();
    }
});

function deleteCard(event, index) {
    event.stopPropagation(); // Prevent card from flipping
    flashcards.splice(index, 1);
    saveFlashcards();
}

// Initial load
updateUI();
