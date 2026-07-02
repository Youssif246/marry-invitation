/**
 * Luxury Wedding Landing Page - Scripts
 * Features: Luxury preloader fade, staggered hero reveals, high-precision countdown, rolling digit animations, scroll reveals, background music toggle.
 */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initScrollReveals();
    initCountdown('2026-07-31T19:00:00');

    initInteractions();
});

/**
 * 1. Interactive Envelope Preloader Controller
 */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const waxSeal = document.getElementById('wax-seal');
    const hero = document.getElementById('hero-section');
    
    if (!preloader || !envelopeWrapper || !waxSeal) return;
    
    // Trigger opening when the user clicks the gold wax seal
    waxSeal.addEventListener('click', () => {
        // Step 1: Open the envelope (flips top flap, slides card up, removes wax seal)
        envelopeWrapper.classList.add('open');
        
        // Step 2: Allow the envelope opening animation to complete, then slide the preloader container up
        setTimeout(() => {
            preloader.classList.add('fade-out');
            
            // Step 3: Trigger the staggered hero section card entry reveals
            setTimeout(() => {
                if (hero) {
                    hero.classList.add('loaded');
                }
            }, 300); // 300ms offset for smooth timing
            
            // Step 4: Set display none to clean up DOM interactions once preloader has exited
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1200); // Matches transition-slow duration
            
        }, 2000); // Wait 2 seconds for envelope opening sequence to execute
    });
}

/**
 * 2. Intersection Observer for Scroll-Based Reveals
 */
function initScrollReveals() {
    const revealElements = document.querySelectorAll('.scroll-reveal, .fade-in-up');
    
    const observerOptions = {
        root: null, // Viewport
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before element enters center
        threshold: 0.1 // 10% visibility triggers reveal
    };
    
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * 3. High-Precision Countdown with Rolling Digit Effect
 */
function initCountdown(targetDateStr) {
    const targetDate = new Date(targetDateStr).getTime();
    
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');
    
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
    
    let prevValues = { days: '', hours: '', minutes: '', seconds: '' };
    
    function updateTimer() {
        const now = new Date().getTime();
        const difference = targetDate - now;
        
        let days = 0;
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
        
        if (difference > 0) {
            days = Math.floor(difference / (1000 * 60 * 60 * 24));
            hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((difference % (1000 * 60)) / 1000);
        }
        
        const formatted = {
            days: days.toString().padStart(2, '0'),
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0')
        };
        
        updateDigit(daysEl, formatted.days, prevValues.days);
        updateDigit(hoursEl, formatted.hours, prevValues.hours);
        updateDigit(minutesEl, formatted.minutes, prevValues.minutes);
        updateDigit(secondsEl, formatted.seconds, prevValues.seconds);
        
        prevValues = formatted;
    }
    
    function updateDigit(element, newValue, oldValue) {
        if (newValue !== oldValue) {
            element.textContent = newValue;
            
            // Re-trigger the roll animation by cycling class
            element.classList.remove('digit-roll');
            void element.offsetWidth; // Force reflow
            element.classList.add('digit-roll');
        }
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}



/**
 * 5. Micro-interactions and Logging
 */
function initInteractions() {
    const cards = document.querySelectorAll('.detail-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Can trigger a small gold glitter trace if desired, kept lightweight
        });
    });
}
