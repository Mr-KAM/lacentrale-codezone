particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
        },
        "opacity": {
            "value": 0.5,
            "random": false,
        },
        "size": {
            "value": 3,
            "random": true,
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "repulse": {
                "distance": 100,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            }
        }
    },
    "retina_detect": true
});

const connexion = true;

// Configuration de la date et heure cible
const CONFIG = {
    // Format: YYYY-MM-DD HH:MM:SS
    targetDate: "2025-09-23 15:09:00",
    classUrl: "https://meet.jit.si/TremendousManipulationsDefendHopefully",
    redirectUrl: "index_disconnect.html"
};

// Fonction pour parser la date configurée
function parseTargetDate(dateString) {
    const [datePart, timePart] = dateString.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes, seconds = 0] = timePart.split(':').map(Number);
    
    return new Date(year, month - 1, day, hours, minutes, seconds);
}

// Fonction pour formater le temps restant
function formatTimeRemaining(diff) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    let timeString = "";
    
    if (days > 0) {
        timeString += `${days}j `;
    }
    if (hours > 0 || days > 0) {
        timeString += `${hours}h `;
    }
    timeString += `${minutes}m ${seconds}s`;
    
    return timeString.trim();
}

// Ajout du code pour le compte à rebours
function updateCountdown() {
    try {
        const now = new Date();
        const target = parseTargetDate(CONFIG.targetDate);
        const classLink = document.getElementById('classLink');
        const countdownElement = document.getElementById('countdown');
        
        // Vérifier si les éléments existent
        if (!classLink || !countdownElement) {
            console.error('Éléments DOM manquants : classLink ou countdown');
            return;
        }
        
        if (now >= target) {
            // La classe est en cours ou terminée
            countdownElement.innerHTML = "La classe est en cours !";
            classLink.href = CONFIG.classUrl;
            classLink.innerHTML = "Accéder à la Classe en Ligne";
            classLink.classList.remove('btn-disabled');
            classLink.classList.add('btn-primary');
        } else {
            // Calculer le temps restant
            const diff = target - now;
            const timeRemaining = formatTimeRemaining(diff);
            
            countdownElement.innerHTML = `Débute dans : <h1 class="text-4xl">${timeRemaining}</h1>`;
            classLink.href = "#";
            classLink.innerHTML = `La classe sera disponible le ${target.toLocaleDateString('fr-FR')} à ${target.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}`;
            classLink.classList.remove('btn-primary');
            classLink.classList.add('btn-disabled');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du compte à rebours:', error);
        document.getElementById('countdown').innerHTML = "Erreur de configuration de date";
    }
}

// Fonction pour mettre à jour la configuration (optionnelle)
function updateConfig(newTargetDate, newClassUrl = null) {
    CONFIG.targetDate = newTargetDate;
    if (newClassUrl) {
        CONFIG.classUrl = newClassUrl;
    }
    updateCountdown();
}

// Initialisation
if (connexion === false) {
    // Redirection vers un autre site
    window.location.href = CONFIG.redirectUrl;
} else {
    // Vérifier que la date cible est valide
    try {
        const targetDate = parseTargetDate(CONFIG.targetDate);
        if (isNaN(targetDate.getTime())) {
            throw new Error('Date invalide');
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        console.log(`Compte à rebours configuré pour le ${targetDate.toLocaleDateString('fr-FR')} à ${targetDate.toLocaleTimeString('fr-FR')}`);
    } catch (error) {
        console.error('Erreur de configuration:', error);
        document.getElementById('countdown').innerHTML = "Erreur de configuration de date";
    }
}

// Exemple d'utilisation pour changer la configuration dynamiquement:
// updateConfig("2024-12-31 23:59:59", "https://meet.jit.si/NouvelleClasse");