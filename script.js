/**
 * Main JavaScript File for Portfolio
 * Handles matrix background, terminal typing effect, and scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------
       1. Matrix Canvas Background Effect
    ---------------------------------------------------- */
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    // Make canvas full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters for the matrix effect (Katakana, Latin, Numerics)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}|:<>?~アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    // Array of drops - one per column
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    // Drawing function
    function drawMatrix() {
        // Translucent black background to create trail effect
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff41'; // Green text
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = charArray[Math.floor(Math.random() * charArray.length)];

            // x = i*fontSize, y = value of drops[i]*fontSize
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reset drop to top randomly to create staggered effect
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Increment y coordinate
            drops[i]++;
        }
    }

    // Handle Resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    setInterval(drawMatrix, 33); // ~30fps


    /* ----------------------------------------------------
       2. Terminal Typing Effect
    ---------------------------------------------------- */
    const terminalElement = document.getElementById('hero-terminal');

    const terminalLines = [
        { text: "loay@kali:~$ whoami", cl: "command", delay: 1000 },
        { text: "loay_salem", cl: "output", delay: 500 },
        { text: "loay@kali:~$ cat /etc/role", cl: "command", delay: 800 },
        { text: "Penetration Tester | Cybersecurity Engineer", cl: "output", delay: 500 },
        { text: "loay@kali:~$ ./run_exploit.sh --target future", cl: "command", delay: 800 },
        { text: "[*] Initializing exploit framework...", cl: "output", delay: 500 },
        { text: "[*] Establishing foothold...", cl: "output", delay: 600 },
        { text: "[+] Success. Access granted to Loay's Portfolio.", cl: "output highlight", delay: 800 }
    ];

    let currentLine = 0;

    function typeLine() {
        if (currentLine < terminalLines.length) {
            const lineData = terminalLines[currentLine];

            const lineElement = document.createElement('div');
            lineElement.className = lineData.cl;

            // If it's a command, add typing effect
            if (lineData.cl === 'command') {
                terminalElement.appendChild(lineElement);
                let charIndex = 0;

                const typeInterval = setInterval(() => {
                    if (charIndex < lineData.text.length) {
                        lineElement.textContent += lineData.text.charAt(charIndex);
                        charIndex++;
                        terminalElement.scrollTop = terminalElement.scrollHeight;
                    } else {
                        clearInterval(typeInterval);
                        currentLine++;
                        setTimeout(typeLine, lineData.delay);
                    }
                }, 40); // typing speed
            } else {
                // If it's just output, show immediately after delay
                lineElement.innerHTML = lineData.cl.includes('highlight')
                    ? `<span class="highlight">${lineData.text}</span>`
                    : lineData.text;
                terminalElement.appendChild(lineElement);
                terminalElement.scrollTop = terminalElement.scrollHeight;

                currentLine++;
                setTimeout(typeLine, lineData.delay);
            }
        } else {
            // Add blinking cursor at the end
            const cursorRow = document.createElement('div');
            cursorRow.innerHTML = `<span class="command">loay@kali:~$ </span><span class="cursor">_</span>`;
            terminalElement.appendChild(cursorRow);
            terminalElement.scrollTop = terminalElement.scrollHeight;
        }
    }

    // Start typing effect shortly after load
    setTimeout(typeLine, 500);


    /* ----------------------------------------------------
       3. Scroll Reveal Animation
    ---------------------------------------------------- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

});
