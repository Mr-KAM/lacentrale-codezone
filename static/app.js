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


const connexion=true
// Ajout du code pour le compte à rebours
function updateCountdown() {
    const now = new Date();
    const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 20, 0);
    const classLink = document.getElementById('classLink');
    if (now >= target) {
        document.getElementById('countdown').innerHTML = "La classe est en cours !";
        classLink.href = "https://meet.jit.si/TremendousManipulationsDefendHopefully";

        classLink.innerHTML = "Accéder à la Classe en Ligne";
        classLink.classList.remove('btn-disabled');
        classLink.classList.add('btn-primary');
    } else {
        const diff = target - now;
        const hours = Math.floor(diff / 1000 / 60 / 60);
        const minutes = Math.floor(diff / 1000 / 60) % 60;
        const seconds = Math.floor(diff / 1000) % 60;

        document.getElementById('countdown').innerHTML = `Débute dans : <h1 class="text-4xl"> ${hours}h ${minutes}m ${seconds}s </h1>`;
        classLink.href = "#";
        classLink.innerHTML = "La classe sera disponible à 16h20";
        classLink.classList.remove('btn-primary');
        classLink.classList.add('btn-disabled');
    }
}

// if (connexion==false){
//     // redirection vers un autre site
//     window.location.href = "index_disconnect.html";
// }else{
//     updateCountdown();
//     setInterval(updateCountdown, 1000);
// }
