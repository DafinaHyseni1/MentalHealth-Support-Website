// Funksioni për zgjedhjen e metodës (Text ose Call)
function selectMethod(method) {
    document.getElementById('team').scrollIntoView({ behavior: 'smooth' });
}

// Funksioni për hapjen dhe mbylljen e menu-t në pajisjet mobile
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

// Përdorim setTimeout për të shtyrë shfaqjen e chatbot-it pas 2 sekondash
window.onload = function() {
    setTimeout(function() {
      const chatbotContainer = document.getElementById('chatbot-container');
      chatbotContainer.classList.remove('hidden'); // Heqim klasën 'hidden' që e fsheh chatbot-in
    }, 2000); // 2000 milisekonda (2 sekonda)
};

// Mbyll chatbot
document.getElementById('close-chat').addEventListener('click', function() {
    const chatbotContainer = document.getElementById('chatbot-container');
    chatbotContainer.classList.add('hidden'); // Fsheh chatbot-in kur klikohet 'X'
});

// Minimizo chatbot
document.getElementById('minimize-chat').addEventListener('click', function() {
    const chatbotBody = document.getElementById('chatbot-body');
    const chatbotFooter = document.getElementById('chatbot-footer');
    const chatbotHeader = document.getElementById('chatbot-header');

    // Ndërron mes minimizimit dhe shfaqjes normale të chatbot-it
    if (chatbotBody.style.display === 'none') {
        chatbotBody.style.display = 'block';
        chatbotFooter.style.display = 'flex';
        chatbotHeader.style.display = 'flex'; // Sigurohemi që header-i të jetë gjithmonë i dukshëm
    } else {
        chatbotBody.style.display = 'none';
        chatbotFooter.style.display = 'none';
        chatbotHeader.style.display = 'none'; // Fsheh header-in nëse është minimalizuar
    }
});

document.getElementById('send-message').addEventListener('click', function() {
    const userMessage = document.getElementById('user-message').value;
    sendMessage(userMessage);
});

function sendMessage(userMessage) {
    const chatbotBody = document.getElementById('chatbot-body');

    if (userMessage.trim() !== "") {
        addMessageToChat(userMessage, 'user-message');

        let botResponse = getBotResponse(userMessage);
        addMessageToChat(botResponse, 'bot-message');

        document.getElementById('user-message').value = '';

        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }
}

function addMessageToChat(message, className) {
    const chatbotBody = document.getElementById('chatbot-body');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(className);
    messageDiv.textContent = message;
    chatbotBody.appendChild(messageDiv);
}

function sendSuggestedQuestion(question) {
    sendMessage(question);
}

function getBotResponse(message) {
    const responses = {
       "How can I manage stress?": "Managing stress involves mindfulness, exercise, and healthy habits. Try deep breathing techniques and regular physical activity.",
        "What are the benefits of therapy?": "Therapy provides a safe space to discuss emotions and develop coping strategies for mental well-being.",
        "How does healthy eating affect mental health?": "A balanced diet rich in nutrients can improve mood and reduce anxiety and depression symptoms.",
        "What is mindfulness?": "Mindfulness is the practice of staying present in the moment, reducing stress, and increasing self-awareness.",
        "Can exercise help with anxiety?": "Yes! Regular exercise releases endorphins, which improve mood and reduce symptoms of anxiety and stress."
    };

    return responses[message] || "I'm sorry, I don't have an answer for that right now.";
}

// Create suggested questions
function createSuggestedQuestions() {
    const chatbotBody = document.getElementById('chatbot-body');
    const questionsContainer = document.createElement('div');
    questionsContainer.classList.add('suggested-questions');

    const questions = [
       "How can I manage stress?",
        "What are the benefits of therapy?",
        "How does healthy eating affect mental health?",
        "What is mindfulness?",
    ];

    questions.forEach(question => {
        const questionButton = document.createElement('button');
        questionButton.textContent = question;
        questionButton.classList.add('suggested-question');
        questionButton.onclick = function() {
            sendSuggestedQuestion(question);
        };
        questionsContainer.appendChild(questionButton);
    });

    chatbotBody.appendChild(questionsContainer);
}

// Call function to add suggested questions when chatbot loads
createSuggestedQuestions();


// Marrim të gjitha pyetjet dhe i bëjmë që të hapen/mbyllen kur klikohen
document.querySelectorAll('.faq-item .question').forEach((item) => {
    item.addEventListener('click', function () {
        const answer = this.nextElementSibling;
        const toggle = this.querySelector('.toggle');

        // Hap ose mbyll përgjigjen
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            toggle.textContent = '+';
        } else {
            answer.style.display = 'block';
            toggle.textContent = '-';
        }
    });
});

function animateServicesOnScroll() {
    const serviceBoxes = document.querySelectorAll('.service-box');
    const triggerPoint = window.innerHeight * 0.85;

    serviceBoxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;

        if (boxTop < triggerPoint) {
            box.classList.add('show'); // Shfaq kutitë
        }
    });
}

window.addEventListener('scroll', animateServicesOnScroll);


// Funksioni për të shtuar animacione kur mbështetet mbi foton e psikologut
const teamMembers = document.querySelectorAll('.team-member');

teamMembers.forEach(member => {
    member.addEventListener('mouseover', () => {
        const photo = member.querySelector('img');
        
        // Shfaq foto me një efekte të lehtë lëvizjeje
        photo.style.transform = 'scale(1.1)';
        
        // Animacioni i fotos
        photo.style.transition = 'transform 0.3s ease-in-out';
    });

    member.addEventListener('mouseout', () => {
        const photo = member.querySelector('img');
        
        // Rikthe foton në formën e saj origjinale
        photo.style.transform = 'scale(1)';
        
        // Rikthimi në animacionin origjinal
        photo.style.transition = 'transform 0.3s ease-in-out';
    });
});


// Funksioni që hap formularin e rezervimit dhe vendos emrin e psikologut
function openBookingForm(psychologistName) {
    document.getElementById('psychologist-name').innerText = psychologistName;
    document.getElementById('booking').style.display = 'block';  // Tregon seksionin e rezervimit
}

// Funksioni për të dërguar rezervimin
function submitBooking() {
    const method = document.getElementById('method').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (date && time) {
        alert(
            `Your session with ${document.getElementById('psychologist-name').innerText} is booked for ${method} on ${date} at ${time}.\n\nYour booking will be successful after you complete the registration & payment.`
        );
        // Logjika për ruajtjen e të dhënave të rezervimit mund të shtohet këtu
        document.getElementById('booking').style.display = 'none'; // Mbyll seksionin e rezervimit pas dërgimit
    } else {
        alert("Please select a date and time.");
    }
}


// Funksioni për të hapur formularin e rezervimit
function openBookingForm(psychologistName) {
    // Aktivizimi i butonit Book a Session pasi të jetë klikuar
    const button = document.querySelector('.choose-button');
    button.classList.add('active'); // Shtohet klasa aktive për butonin

    document.getElementById('psychologist-name').innerText = psychologistName;
    document.getElementById('booking').style.display = 'block';  // Tregon seksionin e rezervimit
}



// Efekt kur kaloni me maus mbi artikujt për të nxjerrë një animacion të lehtë
const blogPosts = document.querySelectorAll('.blog-post');

blogPosts.forEach(post => {
    post.addEventListener('mouseenter', () => {
        post.style.transform = 'scale(1.05)';
        post.style.transition = 'transform 0.3s ease-in-out';
    });
    post.addEventListener('mouseleave', () => {
        post.style.transform = 'scale(1)';
    });
});

// Register Form Validation
document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!name || !email || !password) {
        document.getElementById('register-message').innerText = 'Please fill out all fields.';
        document.getElementById('register-message').style.color = 'red';
    } else if (!validateEmail(email)) {
        document.getElementById('register-message').innerText = 'Please enter a valid email address.';
        document.getElementById('register-message').style.color = 'red';
    } else {
        document.getElementById('register-message').innerText = 'Registration successful!';
        document.getElementById('register-message').style.color = 'green';
        this.reset(); // Reset form fields
    }
});

// Email Validation Function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
