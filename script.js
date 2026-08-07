const questions = [
    {
        id: 1,
        text: "1. Why are you taking this test?",
        options: [
            { text: "a. I doubt being gay.", img: "https://i.imgflip.com/1q0k81.jpg" },
            { text: "b. I am gay, but I'm afraid people will make fun of me if I say it out loud.", img: "https://i.imgflip.com/1ur9b0.jpg" },
            { text: "c. Women reject me. I consider becoming gay.", img: "https://i.imgflip.com/3v6q72.jpg" }
        ]
    },
    {
        id: 2,
        text: "2. Who do you prefer to spend time with, keeping sex aside?",
        options: [
            { text: "a. Man", img: "https://i.imgflip.com/6c0r5u.jpg" },
            { text: "b. Woman", img: "https://i.imgflip.com/1rldz8.jpg" },
            { text: "c. Both men and women", img: "https://i.imgflip.com/261m1h.jpg" }
        ]
    },
    {
        id: 3,
        text: "3. Right after the deed is done, what do you feel like saying to the girl next to you?",
        options: [
            { text: "a. When are you leaving? Should I leave?", img: "https://i.imgflip.com/1z85lq.jpg" },
            { text: "b. It's only been 30 seconds, should we ask for a room refund?", img: "https://i.imgflip.com/1h7in3.jpg" }
        ]
    },
    {
        id: 4,
        text: "4. Even when you have a girlfriend available and can have sex anytime, have you ever thought about watching \"Old woman tricks a young boy who came for plumbing work and ends up in great sex\" on a porn site? P.S. Not a very old woman, just moderately old.",
        options: [
            { text: "a. No.", img: "https://i.imgflip.com/5l3q7e.jpg" },
            { text: "b. No, after a long pause.", img: "https://i.imgflip.com/34n3q7.jpg" }
        ]
    },
    {
        id: 5,
        text: "5. Hug is the most beautiful love language. It is universal. All you need is a hug from your favourite person when you feel low. But which one do you prefer?",
        options: [
            { text: "a. A side hug with a woman.", img: "https://i.imgflip.com/1n8c3p.jpg" },
            { text: "b. A tight hug where the nipples kiss each other from a man.", img: "https://i.imgflip.com/3081p5.jpg" }
        ]
    }
];

let currentQuestionIndex = 0;
let userName = "";
const nameContainer = document.getElementById('name-container');
const nameInput = document.getElementById('user-name');
const startBtn = document.getElementById('start-btn');

const ageModal = document.getElementById('age-modal');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const resultTitle = document.getElementById('result-title');
const memeImage = document.getElementById('meme-image');

const questionTextElement = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const hornSound = document.getElementById('horn-sound');

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    questionTextElement.textContent = q.text;
    optionsContainer.innerHTML = '';
    nextBtn.classList.remove('active');
    nextBtn.disabled = true;

    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = 'SUBMIT';
    } else {
        nextBtn.textContent = 'NEXT';
    }

    document.body.style.backgroundImage = 'none';

    q.options.forEach((optObj, index) => {
        const label = document.createElement('label');
        label.className = 'option-label';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.value = index;
        
        radio.addEventListener('change', () => {
            nextBtn.classList.add('active');
            nextBtn.disabled = false;
            
            // Change background image dynamically based on selected option
            document.body.style.backgroundImage = `url('${optObj.img}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundAttachment = 'fixed';
            document.body.style.transition = 'background-image 0.5s ease-in-out';
        });

        const span = document.createElement('span');
        span.className = 'option-text';
        span.textContent = optObj.text;

        label.appendChild(radio);
        label.appendChild(span);
        optionsContainer.appendChild(label);
    });
}

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResult();
    }
});

btnYes.addEventListener('click', () => {
    ageModal.classList.add('hidden');
});

btnNo.addEventListener('click', () => {
    alert("Come back when you are older!");
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
});

nameInput.addEventListener('input', () => {
    if (nameInput.value.trim().length > 0) {
        startBtn.classList.add('active');
        startBtn.disabled = false;
    } else {
        startBtn.classList.remove('active');
        startBtn.disabled = true;
    }
});

startBtn.addEventListener('click', () => {
    userName = nameInput.value.trim();
    nameContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    loadQuestion();
});

function showResult() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    
    // Clear background for result
    document.body.style.backgroundImage = 'none';
    
    let isStraight = false;
    
    const nameLower = userName.toLowerCase();
    
    if (nameLower === 'prem') {
        isStraight = true;
    } else if (nameLower === 'sridhar') {
        isStraight = false;
    } else {
        // Randomly 80% chance of being Gay, 20% chance of being Straight
        isStraight = Math.random() > 0.8;
    }
    
    if (isStraight) {
        resultTitle.textContent = `${userName.toUpperCase()}, YOU ARE 100% STRAIGHT!`;
        resultTitle.style.color = "#00B140";
        memeImage.src = "chad-meme.gif";
    } else {
        resultTitle.textContent = `${userName.toUpperCase()}, WHY ARE YOU GAY?`;
        resultTitle.style.color = "#FF0018";
        memeImage.src = "gay-meme.png";
        
        try {
            hornSound.volume = 0.5;
            hornSound.play();
        } catch (e) {
            console.log('Audio play failed: ', e);
        }
    }
}

document.getElementById('restart-btn').addEventListener('click', () => {
    // Reset variables
    currentQuestionIndex = 0;
    userName = "";
    nameInput.value = "";
    startBtn.classList.remove('active');
    startBtn.disabled = true;
    
    // Reset UI
    document.body.style.backgroundImage = 'none';
    resultContainer.classList.add('hidden');
    nameContainer.classList.remove('hidden');
});
