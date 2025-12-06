// ============================================
// NAVIGATION & SMOOTH SCROLL
// ============================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = ['hero', 'reflexion', 'responsabilidad', 'accion', 'comunidad'];
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = sectionId;
            }
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// HERO SECTION - STATISTICS COUNTER
// ============================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.round(target) + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.round(start) + '%';
        }
    }, 16);
}

// Start counter immediately on page load
document.addEventListener('DOMContentLoaded', () => {
    const counter = document.getElementById('stat-counter');
    if (counter) {
        // Start from 0 and animate to 54
        counter.textContent = '0%';
        setTimeout(() => {
            animateCounter(counter, 54, 2500);
        }, 500);
    }
});

// ============================================
// HERO SECTION - PARALLAX EFFECT
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroBackground.style.opacity = 1 - (scrolled / 500);
    }

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

// ============================================
// REFLEXIÓN SECTION - PHONE INTERACTION
// ============================================

const phoneScreen = document.getElementById('phoneScreen');
if (phoneScreen) {
    phoneScreen.addEventListener('mouseenter', () => {
        const messages = phoneScreen.querySelectorAll('.message');
        messages.forEach((msg, index) => {
            setTimeout(() => {
                msg.style.opacity = '0';
                msg.style.transform = 'translateX(-20px)';
            }, index * 100);
        });
    });

    phoneScreen.addEventListener('mouseleave', () => {
        const messages = phoneScreen.querySelectorAll('.message');
        messages.forEach((msg, index) => {
            setTimeout(() => {
                msg.style.opacity = '1';
                msg.style.transform = 'translateX(0)';
            }, index * 100);
        });
    });
}

// ============================================
// RESPONSABILIDAD SECTION - CHAT SIMULATOR
// ============================================

const chatResponses = {
    empatica: {
        message: 'Tu respuesta: "¿Quieres hablar? Estoy aquí para escucharte"',
        impact: 'Impacto positivo: La persona se siente apoyada y comprendida. Tu empatía puede hacer la diferencia en su día.',
        type: 'positive'
    },
    neutral: {
        message: 'Tu respuesta: "Ok, espero que te sientas mejor"',
        impact: 'Impacto neutro: Aunque no es negativo, podría ser más empático. Una respuesta más cálida podría ayudar más.',
        type: 'neutral'
    },
    negativa: {
        message: 'Tu respuesta: "No me importa mucho"',
        impact: 'Impacto negativo: Esta respuesta puede hacer que la persona se sienta ignorada y más sola. Las palabras importan.',
        type: 'negative'
    },
    toxica: {
        message: 'Tu respuesta: "Déjame en paz con tus problemas"',
        impact: 'Impacto muy negativo: Esta respuesta puede profundizar el dolor emocional de la persona. El ciberbullying comienza con respuestas como esta.',
        type: 'negative'
    }
};

function selectOption(option) {
    const chatOptions = document.getElementById('chatOptions');
    const chatResponse = document.getElementById('chatResponse');
    const responseMessage = document.getElementById('responseMessage');
    const responseImpact = document.getElementById('responseImpact');
    const optionButtons = document.querySelectorAll('.option-btn');

    // Animate out options
    optionButtons.forEach((btn, index) => {
        setTimeout(() => {
            btn.style.transform = 'translateX(-100px)';
            btn.style.opacity = '0';
        }, index * 100);
    });

    setTimeout(() => {
        chatOptions.style.display = 'none';
    }, 500);

    // Add sent message to chat with animation
    const chatContainer = document.querySelector('.chat-container');
    const sentMessage = document.createElement('div');
    sentMessage.className = 'chat-message sent';
    sentMessage.style.opacity = '0';
    sentMessage.style.transform = 'translateX(50px)';
    sentMessage.innerHTML = `
        <div class="message-avatar">👤</div>
        <div class="message-bubble">
            <p>${getOptionText(option)}</p>
        </div>
    `;
    chatContainer.insertBefore(sentMessage, chatResponse);

    // Animate sent message in
    setTimeout(() => {
        sentMessage.style.transition = 'all 0.5s ease';
        sentMessage.style.opacity = '1';
        sentMessage.style.transform = 'translateX(0)';
    }, 100);

    // Show response with delay
    setTimeout(() => {
        chatResponse.style.display = 'block';
        chatResponse.style.opacity = '0';
        chatResponse.style.transform = 'translateY(20px)';
        
        const response = chatResponses[option];
        responseMessage.textContent = response.message;
        responseImpact.textContent = response.impact;
        responseImpact.className = `response-impact ${response.type}`;

        setTimeout(() => {
            chatResponse.style.transition = 'all 0.5s ease';
            chatResponse.style.opacity = '1';
            chatResponse.style.transform = 'translateY(0)';
        }, 50);
    }, 600);
}

function getOptionText(option) {
    const options = {
        empatica: '¿Quieres hablar? Estoy aquí para escucharte',
        neutral: 'Ok, espero que te sientas mejor',
        negativa: 'No me importa mucho',
        toxica: 'Déjame en paz con tus problemas'
    };
    return options[option] || '';
}

function resetChat() {
    const chatOptions = document.getElementById('chatOptions');
    const chatResponse = document.getElementById('chatResponse');
    const sentMessages = document.querySelectorAll('.chat-message.sent');
    const optionButtons = document.querySelectorAll('.option-btn');

    // Animate out response
    chatResponse.style.opacity = '0';
    chatResponse.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        chatResponse.style.display = 'none';
        sentMessages.forEach(msg => {
            msg.style.opacity = '0';
            msg.style.transform = 'translateX(50px)';
            setTimeout(() => msg.remove(), 300);
        });

        // Reset and animate in options
        chatOptions.style.display = 'grid';
        optionButtons.forEach((btn, index) => {
            btn.style.transform = 'translateX(-100px)';
            btn.style.opacity = '0';
            setTimeout(() => {
                btn.style.transition = 'all 0.5s ease';
                btn.style.transform = 'translateX(0)';
                btn.style.opacity = '1';
            }, index * 100 + 200);
        });
    }, 300);
}

// ============================================
// ACCIÓN SECTION - INTERACTIVE STEPS
// ============================================

function toggleStep(stepNumber) {
    const stepCard = document.querySelector(`[data-step="${stepNumber}"]`);
    const allStepCards = document.querySelectorAll('.step-card');
    const isActive = stepCard.classList.contains('active');

    // Close all other steps with animation
    allStepCards.forEach(card => {
        if (card !== stepCard) {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.classList.remove('active');
                card.style.transform = '';
            }, 200);
        }
    });

    // Toggle current step with animation
    if (isActive) {
        stepCard.style.transform = 'scale(0.98)';
        setTimeout(() => {
            stepCard.classList.remove('active');
            stepCard.style.transform = '';
        }, 200);
    } else {
        stepCard.style.transform = 'scale(1.02)';
        stepCard.classList.add('active');
        setTimeout(() => {
            stepCard.style.transform = '';
        }, 300);
    }
}

// ============================================
// COMUNIDAD SECTION - COMMITMENT FORM
// ============================================

function submitCommitment(event) {
    event.preventDefault();
    
    const form = document.getElementById('commitmentForm');
    const userName = document.getElementById('userName').value || 'Anónimo';
    const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
    
    if (checkboxes.length === 0) {
        alert('Por favor, selecciona al menos un compromiso.');
        return;
    }

    const commitments = Array.from(checkboxes).map(cb => {
        const label = cb.closest('label').querySelector('span').textContent;
        return label;
    });

    const commitmentText = commitments.length > 0 
        ? commitments[0] 
        : 'Me uno al movimiento contra el ciberbullying';

    // Add message to wall
    addMessageToWall(commitmentText, userName);

    // Reset form
    form.reset();

    // Show success message
    showSuccessMessage();
}

function addMessageToWall(message, name) {
    const wallMessages = document.getElementById('wallMessages');
    const newMessage = document.createElement('div');
    newMessage.className = 'wall-message';
    newMessage.innerHTML = `
        <p>"${message}"</p>
        <span>- ${name}</span>
    `;
    wallMessages.insertBefore(newMessage, wallMessages.firstChild);
}

function showSuccessMessage() {
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, rgba(0, 255, 255, 0.9), rgba(255, 0, 255, 0.9));
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 15px;
        box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
    `;
    successMsg.textContent = '¡Gracias por unirte al movimiento!';
    document.body.appendChild(successMsg);

    setTimeout(() => {
        successMsg.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => successMsg.remove(), 500);
    }, 3000);
}

// ============================================
// COMUNIDAD SECTION - SHARE BUTTONS
// ============================================

function shareSocial(platform) {
    const url = window.location.href;
    const text = 'Me uno al movimiento #TuMensajeDejaHuella. El ciberbullying no es un juego. Únete:';
    const hashtag = '#TuMensajeDejaHuella';

    let shareUrl = '';

    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=TuMensajeDejaHuella`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
        case 'copy':
            navigator.clipboard.writeText(url).then(() => {
                alert('¡Enlace copiado al portapapeles!');
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('¡Enlace copiado al portapapeles!');
            });
            return;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section > .section-container, .testimonial-card, .step-card, .chat-simulator');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(section);
    });
});

// ============================================
// MOBILE MENU (if needed in future)
// ============================================

// Add mobile menu toggle if screen is small
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        // Mobile menu logic can be added here
    }
});

// ============================================
// PARTICLES EFFECT
// ============================================

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ============================================
// TEXT ANIMATIONS
// ============================================

function animateTextOnScroll() {
    const textElements = document.querySelectorAll('.hero-copy, .reflexion-copy, .section-quote');
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.2 });

    textElements.forEach(el => {
        el.style.opacity = '0';
        textObserver.observe(el);
    });
}

// ============================================
// INTERACTIVE HOVER EFFECTS
// ============================================

function addInteractiveEffects() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-button, .option-btn, .submit-btn, .share-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add CSS for ripple animation
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================
// TYPING ANIMATION FOR CHAT
// ============================================

function animateTyping() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        setTimeout(() => {
            const dots = typingIndicator.querySelector('.typing-dots');
            if (dots) {
                dots.style.display = 'none';
            }
        }, 2000);
    }
}

// ============================================
// INITIALIZE ON LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize any components that need setup
    console.log('Landing Page "Tu mensaje deja huella" cargada correctamente');
    
    // Create particles
    createParticles();
    
    // Animate text on scroll
    animateTextOnScroll();
    
    // Add interactive effects
    addInteractiveEffects();
    
    // Animate typing indicator
    animateTyping();
    
    // Add smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Add scroll reveal animations
    const revealElements = document.querySelectorAll('.testimonial-card, .step-card, .wall-message');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
});

// ============================================
// ADDITIONAL CSS ANIMATIONS VIA JS
// ============================================

// Add fadeOut animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(20px);
        }
    }
`;
document.head.appendChild(style);

