function selectMethod(method) {
    document.getElementById('team').scrollIntoView({ behavior: 'smooth' });
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

function goToTeam() {
    document.getElementById("team").scrollIntoView({
        behavior: "smooth"
    });
}

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav-menu");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", (e) => {
    nav.classList.toggle("active");
    e.stopPropagation();
});

document.addEventListener("click", (e) => {
    const isClickInside = navbar.contains(e.target);

    if (!isClickInside) {
        nav.classList.remove("active");
    }
});

const API_KEY = "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";

window.onload = () => {
    setTimeout(() => {
        document.getElementById("chatbot-container").classList.remove("hidden");
    }, 1000);
};
document.getElementById("close-chat").onclick = () => {
    document.getElementById("chatbot-container").classList.add("hidden");
};

document.getElementById("minimize-chat").onclick = () => {
    const container = document.getElementById("chatbot-container");
    container.classList.toggle("minimized");
};

document.getElementById("send-message").onclick = sendMessage;

document.getElementById("user-message").addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
    const input = document.getElementById("user-message");
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user-message");
    input.value = "";

    const typing = addMessage("Typing...", "bot-message");

    try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
               model: "llama-3.1-8b-instant",
                messages: [
                    {
                      role: "system",
    content: `
You are a compassionate, empathetic mental health support assistant.

Your role:
- Talk like a warm, understanding human
- Be emotionally supportive and calm
- Validate feelings (never judge)
- Encourage healthy coping strategies (breathing, journaling, talking, rest)
- Never act like a therapist or diagnose conditions
- If user is in distress, respond gently and reassuringly
- Use simple, soft language and sometimes emojis (🙂💛🌿)

Important:
- Always prioritize emotional safety
- Be kind, patient, and comforting
`
                    },
                    {
                        role: "user",
                        content: text
                    }
                ]
            })
        });

        const data = await res.json();
        typing.remove();

console.log("GROQ RESPONSE:", data);

const reply = data?.choices?.[0]?.message?.content || data?.error?.message;

        if (reply) {
            addMessage(reply, "bot-message");
        } else {
            addMessage("No response from AI.", "bot-message");
            console.log(data);
        }

    } catch (err) {
        typing.remove();
        addMessage("Error connecting to AI.", "bot-message");
        console.error(err);
    }
}

function addMessage(text, className) {
    const box = document.getElementById("chatbot-body");

    const div = document.createElement("div");
    div.className = className;
    div.textContent = text;

    box.appendChild(div);
    box.scrollTop = box.scrollHeight;

    return div;
}

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
            box.classList.add('show'); 
        }
    });
}

window.addEventListener('scroll', animateServicesOnScroll);


// Funksioni për të shtuar animacione kur mbështetet mbi foton e psikologut
const teamMembers = document.querySelectorAll('.team-member');

teamMembers.forEach(member => {
    member.addEventListener('mouseover', () => {
        const photo = member.querySelector('img');
        
        photo.style.transform = 'scale(1.1)';
        
        photo.style.transition = 'transform 0.3s ease-in-out';
    });

    member.addEventListener('mouseout', () => {
        const photo = member.querySelector('img');
        
        photo.style.transform = 'scale(1)';
        
        photo.style.transition = 'transform 0.3s ease-in-out';
    });
});



let isRegistered = false;

document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const msg = document.getElementById('register-message');

    if (!name || !email || !password) {
        msg.innerText = 'Please fill out all fields.';
        msg.style.color = 'red';
        return;
    }

    if (!validateEmail(email)) {
        msg.innerText = 'Please enter a valid email address.';
        msg.style.color = 'red';
        return;
    }

    isRegistered = true;

    msg.innerText = 'Registration successful! You can now book your session.';
    msg.style.color = 'green';

    this.reset();
});

/* ================= BOOKING ================= */
function submitBooking() {
    const method = document.getElementById('method').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (!isRegistered) {
        alert(
            "Please complete registration first.\n\nThis helps us personalize your therapy experience."
        );
        return;
    }

    if (!date || !time) {
        alert("Please select both date and time.");
        return;
    }

    alert(
        `💛 Thank you for your request!\n\n` +
        `Therapist: ${document.getElementById('psychologist-name').innerText}\n` +
        `Method: ${method}\n` +
        `Date: ${date}\n` +
        `Time: ${time}\n\n` +
        `We will contact you shortly to confirm your appointment.`
    );

    closeBooking();
}

function openBookingForm(name, image) {
    document.getElementById('psychologist-name').innerText = name;
    document.getElementById('psychologist-img').src = image;

    document.getElementById('bookingModal').style.display = 'flex';
}

function closeBooking() {
    document.getElementById('bookingModal').style.display = 'none';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-name');
        const img = btn.getAttribute('data-img');

        openBookingForm(name, img);
    });
});

const blogPosts = document.querySelectorAll('.blog-post');

blogPosts.forEach(post => {
    post.addEventListener('mouseenter', () => {
        post.style.transform = 'scale(1.05)';
        post.style.transition = '0.3s ease';
    });

    post.addEventListener('mouseleave', () => {
        post.style.transform = 'scale(1)';
    });
});
