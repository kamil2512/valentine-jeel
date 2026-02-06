/* ═══════════════════════════════════════════════════════════════
   Valentine's Day App — "Apocalypse" by Cigarettes After Sex
   For Josh my Jeel, from Shoq

   Flow: Opening → Memories (mixed) → Question → Celebration
   ═══════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────────────────
// Memory Data — Your beautiful moments together (IMAGES + VIDEOS)
// type: 'image' or 'video'
// ─────────────────────────────────────────────────────────────────
const memories = [
    // All your beautiful memories together
    { type: 'image', src: 'Images/where it all began.jpg', caption: 'Where it all began...' },
    { type: 'video', src: 'Videos/Vid1 First Date ever.mp4', caption: 'Our very first date' },
    { type: 'image', src: 'Images/Pic on our way to first trip alone.jpeg', caption: 'Our first trip alone together' },
    { type: 'image', src: 'Images/Pic in our trip alone.jpg', caption: 'Just us, no one else' },
    { type: 'image', src: 'Images/pic2 in our trip alone.jpg', caption: 'More from our trip together' },
    { type: 'video', src: 'Videos/Vid 2.mp4', caption: 'Us' },
    { type: 'image', src: 'Images/Pic1.jpeg', caption: 'You and me' },
    { type: 'image', src: 'Images/PXL_20240707_125632121.jpg', caption: '♥' },
    { type: 'video', src: 'Videos/Vid 3.mp4', caption: 'Another moment with you' },
    { type: 'image', src: 'Images/Pic2.jpeg', caption: 'Together' },
    { type: 'image', src: 'Images/Pic where we are celebrating my bithday.JPG', caption: 'Celebrating my birthday together' },
    { type: 'image', src: 'Images/Snapchat-539073826.jpg', caption: 'Us being us' },
    { type: 'video', src: 'Videos/Vid 4.mov', caption: 'Memories' },
    { type: 'image', src: 'Images/PXL_20240814_115158222.MP.jpg', caption: 'My favorite person' },
    { type: 'image', src: 'Images/Pic3.jpeg', caption: 'With you' },
    { type: 'video', src: 'Videos/Vid 5.mp4', caption: 'Our moments' },
    { type: 'image', src: 'Images/IMG_0446.jpg', caption: 'Always' },
    { type: 'image', src: 'Images/Snapchat-577424559.jpg', caption: 'You make me smile' },
    { type: 'image', src: 'Images/IMG_0742.jpg', caption: 'My Jeel' },
    { type: 'video', src: 'Videos/Vid 6.mp4', caption: 'More of us' },
    { type: 'image', src: 'Images/IMG_1494.jpg', caption: 'Forever' },
    { type: 'image', src: 'Images/PXL_20240913_162055062.MP.jpg', caption: 'With you is home' },
    { type: 'image', src: 'Images/IMG_3178.JPG', caption: 'Grateful for you' },
    { type: 'video', src: 'Videos/Vid 7.mov', caption: 'Our story' },
    { type: 'image', src: 'Images/Pic that shows how we will look when we get real old.jpeg', caption: 'Growing old with you...' },
];

// ─────────────────────────────────────────────────────────────────
// DOM Elements
// ─────────────────────────────────────────────────────────────────
const bgMusic = document.getElementById('bgMusic');
const particleCanvas = document.getElementById('particleCanvas');
const ctx = particleCanvas.getContext('2d');

// Screens
const screens = {
    opening: document.getElementById('opening'),
    memories: document.getElementById('memories'),
    question: document.getElementById('question'),
    celebration: document.getElementById('celebration')
};

// Buttons
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Memory elements
const memoryFrame = document.getElementById('memoryFrame');
const memoryCaption = document.getElementById('memoryCaption');
const progressBar = document.getElementById('progressBar');

// ─────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────
let currentMemory = 0;
let memoryInterval = null;
let particles = [];
let noButtonAttempts = 0;
let currentVideo = null;
let isVideoPlaying = false;
let hasReachedCelebration = false; // Prevent going back to question

// ─────────────────────────────────────────────────────────────────
// Initialize
// ─────────────────────────────────────────────────────────────────
function init() {
    resizeCanvas();
    createParticles();
    animateParticles();
    createMemoryItems();
    setupEventListeners();
}

// ─────────────────────────────────────────────────────────────────
// Particle System — Dreamy floating dust
// ─────────────────────────────────────────────────────────────────
function resizeCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    const count = Math.min(50, Math.floor(window.innerWidth / 20));

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * particleCanvas.width,
            y: Math.random() * particleCanvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: -Math.random() * 0.5 - 0.1,
            opacity: Math.random() * 0.4 + 0.1
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -10) {
            p.y = particleCanvas.height + 10;
            p.x = Math.random() * particleCanvas.width;
        }
        if (p.x < -10) p.x = particleCanvas.width + 10;
        if (p.x > particleCanvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 164, 169, ${p.opacity})`;
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}

// ─────────────────────────────────────────────────────────────────
// Screen Transitions
// ─────────────────────────────────────────────────────────────────
function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    screens[screenName].classList.add('active');
}

// ─────────────────────────────────────────────────────────────────
// Opening Screen
// ─────────────────────────────────────────────────────────────────
function startExperience() {
    bgMusic.volume = 0.5;
    bgMusic.play().then(() => {
        console.log('Music playing');
    }).catch(e => {
        console.log('Music blocked, will retry on next interaction:', e);
    });
    showScreen('memories');
    startMemorySlideshow();
}

// Try to autoplay music on page load (usually blocked, but worth trying)
function tryAutoplayMusic() {
    bgMusic.volume = 0.5;
    bgMusic.play().then(() => {
        console.log('Autoplay succeeded');
    }).catch(e => {
        console.log('Autoplay blocked - will play on first click');
    });
}

// Try autoplay when page loads
window.addEventListener('load', tryAutoplayMusic);

// ─────────────────────────────────────────────────────────────────
// Mixed Memory System (Images + Videos)
// ─────────────────────────────────────────────────────────────────
function createMemoryItems() {
    memoryFrame.innerHTML = '';

    memories.forEach((memory, index) => {
        const item = document.createElement('div');
        item.className = 'memory-item';
        item.dataset.index = index;
        item.dataset.type = memory.type;

        if (memory.type === 'image') {
            item.innerHTML = `<img src="${memory.src}" alt="Memory ${index + 1}">`;
        } else if (memory.type === 'video') {
            item.innerHTML = `
                <video playsinline preload="metadata">
                    <source src="${memory.src}" type="video/mp4">
                </video>
                <div class="video-overlay">
                    <button class="play-icon-btn" aria-label="Play video">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                </div>
            `;
        }

        memoryFrame.appendChild(item);
    });

    updateMemoryDisplay();
}

function updateMemoryDisplay() {
    const items = document.querySelectorAll('.memory-item');

    // Pause any playing videos
    if (currentVideo) {
        currentVideo.pause();
        currentVideo = null;
        isVideoPlaying = false;
    }

    items.forEach((item, i) => {
        item.classList.remove('active');
        if (i === currentMemory) {
            item.classList.add('active');

            // Reset video overlay if it's a video
            const overlay = item.querySelector('.video-overlay');
            if (overlay) {
                overlay.classList.remove('hidden');
            }
        }
    });

    // Update caption
    const captionP = memoryCaption.querySelector('p');
    captionP.classList.remove('visible');

    setTimeout(() => {
        captionP.textContent = memories[currentMemory].caption;
        captionP.classList.add('visible');
    }, 300);

    // Update progress
    const progress = ((currentMemory + 1) / memories.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function nextMemory() {
    // Don't do anything if we've already reached celebration
    if (hasReachedCelebration) return;

    // Check if we're at the last memory
    if (currentMemory >= memories.length - 1) {
        // Go to question after last memory
        stopAllVideos();
        showScreen('question');
        return;
    }

    currentMemory++;
    updateMemoryDisplay();
}

function stopAllVideos() {
    // Stop any playing video and clear its handlers
    if (currentVideo) {
        currentVideo.pause();
        currentVideo.onended = null;
        currentVideo = null;
        isVideoPlaying = false;
    }
    bgMusic.volume = 0.4;
}

function prevMemory() {
    if (currentMemory > 0) {
        currentMemory--;
        updateMemoryDisplay();
    }
}

function startMemorySlideshow() {
    currentMemory = 0;
    updateMemoryDisplay();
    // No auto-advance - user controls with buttons
}

// Video playback
function playVideo(videoElement, overlay) {
    // Don't play if we've reached celebration
    if (hasReachedCelebration) return;

    // Lower background music
    bgMusic.volume = 0.15;

    currentVideo = videoElement;
    isVideoPlaying = true;
    overlay.classList.add('hidden');
    videoElement.play();

    // When video ends - just show the overlay again, user clicks next
    videoElement.onended = () => {
        bgMusic.volume = 0.5;
        isVideoPlaying = false;
        overlay.classList.remove('hidden');
        currentVideo = null;
    };
}

function pauseVideo(videoElement, overlay) {
    videoElement.pause();
    bgMusic.volume = 0.4;
    isVideoPlaying = false;
    overlay.classList.remove('hidden');
}

// ─────────────────────────────────────────────────────────────────
// Runaway "No" Button
// ─────────────────────────────────────────────────────────────────
const noMessages = [
    'no',
    'are you sure?',
    'really?',
    'think again...',
    'nope!',
    'try again!',
    'just say yes!',
    'please? ♥',
    'come on...',
    'YES is right there!'
];

function runawayNo(e) {
    e.preventDefault();
    noButtonAttempts++;

    const padding = 80;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const newX = Math.max(padding, Math.random() * maxX);
    const newY = Math.max(padding, Math.random() * maxY);

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    noBtn.style.zIndex = '1000';
    noBtn.style.transition = 'left 0.25s ease-out, top 0.25s ease-out';

    if (noButtonAttempts < noMessages.length) {
        noBtn.textContent = noMessages[noButtonAttempts];
    }
}

// ─────────────────────────────────────────────────────────────────
// Celebration
// ─────────────────────────────────────────────────────────────────
function celebrate() {
    const colors = ['#c9a4a9', '#d4a5a5', '#f5ebe0', '#a67b7b', '#6b2d42'];

    // Initial burst
    confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: colors,
        shapes: ['circle'],
        gravity: 0.6,
        scalar: 1.2
    });

    // Continuous gentle fall
    const duration = 20000;
    const end = Date.now() + duration;

    const frame = () => {
        if (Date.now() > end) return;

        confetti({
            particleCount: 2,
            angle: 60,
            spread: 40,
            origin: { x: 0, y: 0 },
            colors: colors,
            shapes: ['circle'],
            gravity: 0.4,
            drift: 1,
            scalar: 0.8
        });

        confetti({
            particleCount: 2,
            angle: 120,
            spread: 40,
            origin: { x: 1, y: 0 },
            colors: colors,
            shapes: ['circle'],
            gravity: 0.4,
            drift: -1,
            scalar: 0.8
        });

        requestAnimationFrame(frame);
    };

    frame();
}

// ─────────────────────────────────────────────────────────────────
// Event Listeners
// ─────────────────────────────────────────────────────────────────
function setupEventListeners() {
    // Window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });

    // Opening screen
    screens.opening.addEventListener('click', startExperience);
    screens.opening.addEventListener('touchend', (e) => {
        e.preventDefault();
        startExperience();
    });

    // Memory navigation
    nextBtn.addEventListener('click', () => {
        if (currentVideo && isVideoPlaying) {
            const overlay = currentVideo.closest('.memory-item').querySelector('.video-overlay');
            pauseVideo(currentVideo, overlay);
        }
        nextMemory();
    });

    prevBtn.addEventListener('click', () => {
        if (currentVideo && isVideoPlaying) {
            const overlay = currentVideo.closest('.memory-item').querySelector('.video-overlay');
            pauseVideo(currentVideo, overlay);
        }
        prevMemory();
    });

    // Video play/pause
    memoryFrame.addEventListener('click', (e) => {
        const playBtn = e.target.closest('.play-icon-btn');
        const overlay = e.target.closest('.video-overlay');

        if (playBtn || overlay) {
            const memoryItem = e.target.closest('.memory-item');
            const video = memoryItem.querySelector('video');
            const videoOverlay = memoryItem.querySelector('.video-overlay');

            if (video && videoOverlay) {
                playVideo(video, videoOverlay);
            }
        }
    });

    // Click on video to pause
    memoryFrame.addEventListener('click', (e) => {
        if (e.target.tagName === 'VIDEO' && isVideoPlaying) {
            const memoryItem = e.target.closest('.memory-item');
            const overlay = memoryItem.querySelector('.video-overlay');
            pauseVideo(e.target, overlay);
        }
    });

    // Yes button → Celebration
    yesBtn.addEventListener('click', () => {
        hasReachedCelebration = true; // Lock in celebration
        stopAllVideos();
        showScreen('celebration');
        celebrate();
    });

    // No button (runaway!)
    noBtn.addEventListener('mouseenter', runawayNo);
    noBtn.addEventListener('touchstart', runawayNo, { passive: false });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (screens.memories.classList.contains('active')) {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                nextMemory();
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevMemory();
            }
        }

        // Testing shortcut: Shift+Escape to skip to celebration
        if (e.key === 'Escape' && e.shiftKey) {
            hasReachedCelebration = true;
            stopAllVideos();
            showScreen('celebration');
            celebrate();
        }
    });

    // Touch swipe on memory frame
    let touchStartX = 0;
    let touchEndX = 0;

    memoryFrame.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    memoryFrame.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe left → next
                nextMemory();
            } else {
                // Swipe right → prev
                prevMemory();
            }
        }
    }
}

// ─────────────────────────────────────────────────────────────────
// Start the app
// ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
