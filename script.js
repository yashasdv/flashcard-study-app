const form = document.getElementById('flashcard-form');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const grid = document.getElementById('flashcards-grid');
const emptyMessage = document.getElementById('empty-message');
const cardCount = document.getElementById('card-count');
const searchInput = document.getElementById('search-input');

let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

function saveFlashcards() {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    updateUI();
}

function updateUI(filteredCards = flashcards) {
    grid.innerHTML = '';
    cardCount.textContent = `${filteredCards.length} Flashcard${filteredCards.length !== 1 ? 's' : ''}`;
    
    if (filteredCards.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
        filteredCards.forEach((card) => {
            const index = flashcards.indexOf(card);
            const cardEl = document.createElement('div');
            cardEl.className = 'flashcard-container';
            cardEl.innerHTML = `
                <div class="flashcard">
                    <div class="card-inner">
                        <div class="card-front">
                            <p><strong>Q:</strong> ${card.question}</p>
                        </div>
                        <div class="card-back">
                            <p><strong>A:</strong> ${card.answer}</p>
                        </div>
                    </div>
                </div>
                <button class="delete-btn" onclick="deleteCard(event, ${index})">Delete</button>
            `;
            
            // Toggle answer on click
            cardEl.querySelector('.flashcard').addEventListener('click', function() {
                this.classList.toggle('flipped');
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
    event.stopPropagation();
    flashcards.splice(index, 1);
    saveFlashcards();
}

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = flashcards.filter(card => 
        card.question.toLowerCase().includes(term) || 
        card.answer.toLowerCase().includes(term)
    );
    updateUI(filtered);
});

// Initial load
updateUI();
