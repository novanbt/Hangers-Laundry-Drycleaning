/**
 * Hangers Laundry & Drycleaning - Client Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuIcon.textContent = 'close';
      } else {
        mobileMenu.classList.add('hidden');
        menuIcon.textContent = 'menu';
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.textContent = 'menu';
      });
    });
  }

  // 2. Sticky Header Scroll Effect
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Set minimum date for pickup to today
  const pickupDateInput = document.getElementById('pickup-date');
  if (pickupDateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    pickupDateInput.min = `${yyyy}-${mm}-${dd}`;
    pickupDateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  // 4. Quick Service Selection Handler
  const selectServiceBtns = document.querySelectorAll('.select-service-btn');
  const serviceSelect = document.getElementById('service-required');

  selectServiceBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = btn.getAttribute('data-service');
      if (serviceName && serviceSelect) {
        serviceSelect.value = serviceName;
        // Scroll smoothly to booking section
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 5. Booking Form Submission & Confirmation
  const pickupForm = document.getElementById('pickup-form');
  const bookingContainer = document.getElementById('booking-form-container');
  const bookingSuccess = document.getElementById('booking-success');
  const resetBookingBtn = document.getElementById('reset-booking-btn');

  if (pickupForm) {
    pickupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('full-name')?.value || 'Valued Guest';
      const outlet = document.getElementById('selected-outlet')?.value || 'Nearest East Delhi Outlet';
      const service = document.getElementById('service-required')?.value || 'Garment Care';
      const date = document.getElementById('pickup-date')?.value || 'Today';
      const time = document.getElementById('pickup-time')?.value || 'Standard Slot';

      // Random friendly reference code
      const randomRef = 'HNG-' + Math.floor(10000 + Math.random() * 90000);

      // Populate confirmation card
      document.getElementById('confirm-name').textContent = fullName;
      const confirmOutletEl = document.getElementById('confirm-outlet');
      if (confirmOutletEl) confirmOutletEl.textContent = outlet;
      document.getElementById('confirm-service').textContent = service;
      document.getElementById('confirm-date').textContent = date;
      document.getElementById('confirm-time').textContent = time;
      document.getElementById('confirm-ref').textContent = randomRef;

      // Show confirmation state
      bookingContainer.classList.add('hidden');
      bookingSuccess.classList.remove('hidden');

      // Scroll to top of booking box smoothly
      bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  if (resetBookingBtn) {
    resetBookingBtn.addEventListener('click', () => {
      pickupForm?.reset();
      // Reset min date
      if (pickupDateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        pickupDateInput.value = `${yyyy}-${mm}-${dd}`;
      }
      bookingSuccess.classList.add('hidden');
      bookingContainer.classList.remove('hidden');
    });
  }

  // 6. Active Navigation Link on Scroll (IntersectionObserver)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // 7. Auth Modal (Sign In / Sign Up Flow)
  const authModal = document.getElementById('auth-modal');
  const authModalBtn = document.getElementById('auth-modal-btn');
  const mobileAuthBtn = document.getElementById('mobile-auth-btn');
  const closeAuthModal = document.getElementById('close-auth-modal');
  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const demoOtpBtn = document.getElementById('demo-otp-btn');
  const otpHint = document.getElementById('otp-hint');
  const authTabs = document.getElementById('auth-tabs');
  const authLoggedInView = document.getElementById('auth-logged-in-view');
  const authHeaderContainer = document.getElementById('auth-header-container');
  const logoutBtn = document.getElementById('logout-btn');
  const headerUserIcon = document.getElementById('header-user-icon');
  const headerUserInitials = document.getElementById('header-user-initials');
  const mobileAuthBtnText = document.getElementById('mobile-auth-btn-text');

  let currentUser = null;

  // Open modal
  const openModal = () => {
    if (!authModal) return;
    authModal.classList.remove('hidden');
    authModal.classList.add('flex');
    if (mobileMenu) {
      mobileMenu.classList.add('hidden');
      if (menuIcon) menuIcon.textContent = 'menu';
    }
  };

  // Close modal
  const closeModal = () => {
    if (!authModal) return;
    authModal.classList.add('hidden');
    authModal.classList.remove('flex');
  };

  if (authModalBtn) authModalBtn.addEventListener('click', openModal);
  if (mobileAuthBtn) mobileAuthBtn.addEventListener('click', openModal);
  if (closeAuthModal) closeAuthModal.addEventListener('click', closeModal);

  // Close on backdrop click
  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) {
        closeModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && authModal && !authModal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Switch tabs (Sign In / Sign Up)
  if (tabLogin && tabSignup && loginForm && signupForm) {
    tabLogin.addEventListener('click', () => {
      tabLogin.className = 'w-1/2 py-2 text-xs font-bold rounded-lg transition-all bg-surface-container-lowest text-primary shadow-sm';
      tabSignup.className = 'w-1/2 py-2 text-xs font-bold rounded-lg transition-all text-on-surface-variant hover:text-primary';
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
    });

    tabSignup.addEventListener('click', () => {
      tabSignup.className = 'w-1/2 py-2 text-xs font-bold rounded-lg transition-all bg-surface-container-lowest text-primary shadow-sm';
      tabLogin.className = 'w-1/2 py-2 text-xs font-bold rounded-lg transition-all text-on-surface-variant hover:text-primary';
      signupForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
    });
  }

  // Demo OTP trigger
  if (demoOtpBtn && otpHint) {
    demoOtpBtn.addEventListener('click', () => {
      otpHint.classList.remove('hidden');
      const passField = document.getElementById('login-password');
      if (passField) passField.value = '1234';
    });
  }

  // Update UI for logged-in user
  const setLoggedInState = (user) => {
    currentUser = user;

    if (headerUserIcon && headerUserInitials) {
      headerUserIcon.classList.add('hidden');
      headerUserInitials.classList.remove('hidden');
      headerUserInitials.textContent = user.initials;
      authModalBtn.classList.remove('bg-surface-container');
      authModalBtn.classList.add('bg-secondary', 'text-white');
    }

    if (mobileAuthBtnText) {
      mobileAuthBtnText.textContent = `Account (${user.name})`;
    }

    // Modal contents
    if (authTabs) authTabs.classList.add('hidden');
    if (loginForm) loginForm.classList.add('hidden');
    if (signupForm) signupForm.classList.add('hidden');
    if (authHeaderContainer) authHeaderContainer.classList.add('hidden');

    if (authLoggedInView) {
      authLoggedInView.classList.remove('hidden');
      document.getElementById('logged-in-user-name').textContent = user.name;
      document.getElementById('logged-in-user-phone').textContent = `+91 ${user.phone}`;
      document.getElementById('user-avatar-badge').textContent = user.initials;
      const outletElem = document.getElementById('logged-in-outlet');
      if (outletElem) outletElem.textContent = user.outlet || 'Outlet 1 (Laxmi Nagar)';
    }

    // Pre-fill booking form if empty
    const bookingName = document.getElementById('full-name');
    const bookingMobile = document.getElementById('mobile-number');
    if (bookingName && !bookingName.value) bookingName.value = user.name;
    if (bookingMobile && !bookingMobile.value) bookingMobile.value = user.phone;
  };

  // Sign out handler
  const setLoggedOutState = () => {
    currentUser = null;

    if (headerUserIcon && headerUserInitials) {
      headerUserIcon.classList.remove('hidden');
      headerUserInitials.classList.add('hidden');
      authModalBtn.classList.add('bg-surface-container');
      authModalBtn.classList.remove('bg-secondary', 'text-white');
    }

    if (mobileAuthBtnText) {
      mobileAuthBtnText.textContent = 'Sign In / Sign Up';
    }

    if (authTabs) authTabs.classList.remove('hidden');
    if (loginForm) loginForm.classList.remove('hidden');
    if (signupForm) signupForm.classList.add('hidden');
    if (authHeaderContainer) authHeaderContainer.classList.remove('hidden');
    if (authLoggedInView) authLoggedInView.classList.add('hidden');

    // Reset forms
    loginForm?.reset();
    signupForm?.reset();
    if (otpHint) otpHint.classList.add('hidden');
  };

  // Handle Login submission
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = document.getElementById('login-phone')?.value || '9876543210';
      setLoggedInState({
        name: 'Rahul Sharma',
        phone: phone,
        initials: 'RS',
        outlet: 'Outlet 1 (Laxmi Nagar)'
      });
      closeModal();
    });
  }

  // Handle Signup submission
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name')?.value || 'Guest Member';
      const phone = document.getElementById('signup-phone')?.value || '9876543210';
      const outlet = document.getElementById('signup-outlet')?.value || 'Outlet 1 - Laxmi Nagar';
      const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U';

      setLoggedInState({
        name,
        phone,
        initials,
        outlet
      });
      closeModal();
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      setLoggedOutState();
      closeModal();
    });
  }

  // Modal internal links
  const viewPickupsLink = document.getElementById('view-pickups-link');
  const myOutletLink = document.getElementById('my-outlet-link');
  if (viewPickupsLink) viewPickupsLink.addEventListener('click', closeModal);
  if (myOutletLink) myOutletLink.addEventListener('click', closeModal);
});

