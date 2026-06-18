/**
 * SmileCare Dental Clinic - Premium Multi-Page JavaScript Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Page Loading Dismissal (Preloader)
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 500); // 500ms delay for visual premium feel
    }

    // 2. Sticky Header scroll effect & Back to Top button
    const header = document.getElementById('header');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        
        if (scrollPos > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (scrollPos > 400) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // 3. Mobile Hamburger Menu Toggling
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside of it
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // 4. Highlight Active Navigation Item based on current URL path
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    let matchedLink = false;
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href !== '#' && currentPath.endsWith(href)) {
            link.classList.add('active');
            matchedLink = true;
        }
    });

    // Fallback: Default to Home (index.html) if index path matches or no match found
    if (!matchedLink && navLinks.length > 0) {
        if (currentPath === '/' || currentPath.endsWith('index.html') || currentPath === '') {
            navLinks[0].classList.add('active');
        }
    }

    // 5. Intersection Observer for Scroll Animations (.reveal)
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Reveal once
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // 5b. Animated Number Counter for Stats Section
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'), 10);
                    const suffix = el.getAttribute('data-suffix') || '';
                    const duration = 1800; // ms
                    const stepTime = 20;
                    const steps = Math.ceil(duration / stepTime);
                    let current = 0;
                    const increment = target / steps;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        // Format large numbers with commas
                        const display = target >= 1000
                            ? Math.floor(current).toLocaleString()
                            : Math.floor(current);
                        el.textContent = display + suffix;
                    }, stepTime);

                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.4 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // 6. Testimonial Slider Carousel Logic
    const sliderTrack = document.querySelector('.testimonial-slider-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevArrow = document.getElementById('slider-prev');
    const nextArrow = document.getElementById('slider-next');
    const dotsContainer = document.querySelector('.slider-dots');

    if (sliderTrack && slides.length > 0) {
        let currentIndex = 0;
        const slideCount = slides.length;
        let slideInterval;

        // Generate pagination dots dynamically
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoplay();
            });
            if (dotsContainer) dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.slider-dot');

        function updateSliderPosition() {
            sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            // Update dots
            if (dots.length > 0) {
                dots.forEach(dot => dot.classList.remove('active'));
                dots[currentIndex].classList.add('active');
            }
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSliderPosition();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateSliderPosition();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateSliderPosition();
        }

        // Add Arrow Event Listeners
        if (prevArrow) {
            prevArrow.addEventListener('click', () => {
                prevSlide();
                resetAutoplay();
            });
        }
        if (nextArrow) {
            nextArrow.addEventListener('click', () => {
                nextSlide();
                resetAutoplay();
            });
        }

        // Autoplay loop
        function startAutoplay() {
            slideInterval = setInterval(nextSlide, 5000); // Shift every 5s
        }

        function resetAutoplay() {
            clearInterval(slideInterval);
            startAutoplay();
        }

        startAutoplay();
    }

    // 7. FAQ Accordion Toggle Logic
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const headerElement = item.querySelector('.faq-header');
            const bodyElement = item.querySelector('.faq-body');

            headerElement.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other open accordion panels
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-body').style.maxHeight = null;
                    }
                });

                // Toggle current panel
                if (isActive) {
                    item.classList.remove('active');
                    bodyElement.style.maxHeight = null;
                } else {
                    item.classList.add('active');
                    bodyElement.style.maxHeight = bodyElement.scrollHeight + "px";
                }
            });
        });
    }

    // 8. Gallery Filters (gallery.html page)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item, .masonry-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.classList.remove('hide');
                    } else {
                        if (item.classList.contains(filterValue)) {
                            item.classList.remove('hide');
                        } else {
                            item.classList.add('hide');
                        }
                    }
                });
            });
        });
    }

    // 9. Lightbox Zoom Logic (gallery.html page)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    window.openLightbox = function(element) {
        if (!lightbox || !lightboxImg || !lightboxCaption) return;

        const imgSrc = element.querySelector('img').src;
        const captionText = element.querySelector('h4').textContent;

        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = captionText;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scroll
    };

    window.closeLightbox = function() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Unlock scroll
    };

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // 10. Global Appointment Popup Toggle
    const appointmentPopup = document.getElementById('appointment-popup-modal');
    window.openAppointmentPopup = function() {
        if (appointmentPopup) {
            appointmentPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            window.location.href = 'appointment.html';
        }
    };

    window.closeAppointmentPopup = function() {
        if (appointmentPopup) {
            appointmentPopup.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    if (appointmentPopup) {
        appointmentPopup.addEventListener('click', (e) => {
            if (e.target === appointmentPopup) {
                closeAppointmentPopup();
            }
        });
    }

    // Set min date to today for date pickers
    const dateInputs = document.querySelectorAll('input[type="date"]');
    if (dateInputs.length > 0) {
        const today = new Date().toISOString().split('T')[0];
        dateInputs.forEach(input => {
            input.min = today;
        });
    }

    // 11. WhatsApp floating widget redirection helper
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            // Standard clinic support whatsapp api redirect
            const phoneNumber = "15551234567"; // Clinical mockup whatsapp phone number
            const message = encodeURIComponent("Hello SmileCare! I'd like to ask about dental checkups and bookings.");
            window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`, '_blank');
        });
    }
});

// 12. Appointment Form Booking validation (appointment.html and Global Popup)
function handleBookingSubmit(event, isPopup = false) {
    event.preventDefault();
    
    const prefix = isPopup ? 'popup-' : '';
    const name = document.getElementById(prefix + 'patientName').value.trim();
    const email = document.getElementById(prefix + 'patientEmail').value.trim();
    const phone = document.getElementById(prefix + 'patientPhone').value.trim();
    const service = document.getElementById(prefix + 'selectService').value;
    const date = document.getElementById(prefix + 'appointmentDate').value;
    const message = document.getElementById(prefix + 'patientMessage').value.trim();
    
    // Fetch newly introduced Age and Doctor selection fields
    const ageInput = document.getElementById(prefix + 'patientAge');
    const doctorInput = document.getElementById(prefix + 'selectDoctor');
    
    const age = ageInput ? ageInput.value : '';
    const doctor = doctorInput ? doctorInput.value : 'First Available Specialist';

    // Simple validations
    if (!name || !email || !phone || !service || !date) {
        alert("Please fill in all required fields.");
        return;
    }

    if (ageInput && (parseInt(age) <= 0 || parseInt(age) > 120)) {
        alert("Please enter a valid age between 1 and 120.");
        return;
    }

    // Modal success overlay rendering
    const confirmOverlay = document.getElementById('confirm-modal-overlay');
    if (confirmOverlay) {
        document.getElementById('confirm-name').textContent = name;
        document.getElementById('confirm-email').textContent = email;
        document.getElementById('confirm-phone').textContent = phone;
        document.getElementById('confirm-service').textContent = service;
        document.getElementById('confirm-date').textContent = date;
        document.getElementById('confirm-message').textContent = message ? message : 'None';
        
        // Render optional new stats details in confirmation
        const confirmAge = document.getElementById('confirm-age');
        const confirmDoctor = document.getElementById('confirm-doctor');
        if (confirmAge) confirmAge.textContent = age ? age : 'Not Specified';
        if (confirmDoctor) confirmDoctor.textContent = doctor;

        confirmOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (isPopup) {
            closeAppointmentPopup();
        }
    } else {
        alert(`🎉 Appointment Requested!\n\nPatient Name: ${name}\nAge: ${age}\nService: ${service}\nDoctor: ${doctor}\nDate: ${date}\n\nOur clinic coordination board will contact you shortly!`);
    }

    // Reset Form
    const formId = isPopup ? 'popupBookingForm' : 'bookingForm';
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
    }
}

// Close Confirm Modal
function closeConfirmModal() {
    const confirmOverlay = document.getElementById('confirm-modal-overlay');
    if (confirmOverlay) {
        confirmOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// 13. Contact Us Inquiry Form validation (contact.html page)
function handleContactSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !subject || !message) {
        alert("Please fill in all details.");
        return;
    }

    alert(`✉️ Message Sent!\n\nThank you, ${name}. Your inquiry about "${subject}" has been received. Our clinical support desk will reply to ${email} within 24 hours.`);
    
    const form = document.getElementById('contactForm');
    if (form) {
        form.reset();
    }
}
