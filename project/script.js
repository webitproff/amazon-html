(function() {
  // ====== Offcanvas для магазина (кнопка All) ======
  const allBtn = document.getElementById('allBtn');
  const overlayShop = document.getElementById('overlay-shop');
  const offcanvasShop = document.getElementById('offcanvas-shop');
  const closeShop = document.getElementById('offcanvasCloseShop');
  const mainLevelShop = document.getElementById('mainLevelShop');

  function openShopMenu() {
    overlayShop.classList.add('open');
    offcanvasShop.classList.add('open');
    document.body.style.overflow = 'hidden';
    resetShopMenu();
  }
  function closeShopMenu() {
    overlayShop.classList.remove('open');
    offcanvasShop.classList.remove('open');
    if (!document.getElementById('offcanvas-help').classList.contains('open') &&
        !document.getElementById('offcanvas-account').classList.contains('open')) {
      document.body.style.overflow = '';
    }
  }
  function resetShopMenu() {
    mainLevelShop.classList.add('active');
    mainLevelShop.classList.remove('hidden-left');
    offcanvasShop.querySelectorAll('.menu-level').forEach(level => {
      if (level !== mainLevelShop) {
        level.classList.add('next');
        level.classList.remove('active');
      }
    });
  }

  allBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    openShopMenu();
  });
  overlayShop.addEventListener('click', closeShopMenu);
  closeShop.addEventListener('click', closeShopMenu);

  const shopSubmenuTriggers = offcanvasShop.querySelectorAll('.menu-item.has-submenu');
  const shopBackButtons = offcanvasShop.querySelectorAll('[data-back]');

  shopSubmenuTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      const submenuId = this.dataset.submenu;
      const submenu = document.getElementById('submenu-' + submenuId);
      if (!submenu) return;
      mainLevelShop.classList.remove('active');
      mainLevelShop.classList.add('hidden-left');
      submenu.classList.remove('next');
      submenu.classList.add('active');
    });
  });

  shopBackButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const parentLevel = this.closest('.menu-level');
      parentLevel.classList.remove('active');
      parentLevel.classList.add('next');
      mainLevelShop.classList.remove('hidden-left');
      mainLevelShop.classList.add('active');
    });
  });

  // ====== Offcanvas для Help & Settings ======
  const helpLink = document.getElementById('helpSettingsLink');
  const overlayHelp = document.getElementById('overlay-help');
  const offcanvasHelp = document.getElementById('offcanvas-help');
  const closeHelp = document.getElementById('offcanvasCloseHelp');
  const mainLevelHelp = document.getElementById('mainLevelHelp');

  function openHelpMenu() {
    overlayHelp.classList.add('open');
    offcanvasHelp.classList.add('open');
    document.body.style.overflow = 'hidden';
    resetHelpMenu();
  }
  function closeHelpMenu() {
    overlayHelp.classList.remove('open');
    offcanvasHelp.classList.remove('open');
    if (!document.getElementById('offcanvas-shop').classList.contains('open') &&
        !document.getElementById('offcanvas-account').classList.contains('open')) {
      document.body.style.overflow = '';
    }
  }
  function resetHelpMenu() {
    mainLevelHelp.classList.add('active');
    mainLevelHelp.classList.remove('hidden-left');
    offcanvasHelp.querySelectorAll('.menu-level').forEach(level => {
      if (level !== mainLevelHelp) {
        level.classList.add('next');
        level.classList.remove('active');
      }
    });
  }

  helpLink.addEventListener('click', function(e) {
    e.preventDefault();
    if (offcanvasShop.classList.contains('open')) closeShopMenu();
    if (document.getElementById('offcanvas-account').classList.contains('open')) {
      closeAccountMenu();
    }
    openHelpMenu();
  });
  overlayHelp.addEventListener('click', closeHelpMenu);
  closeHelp.addEventListener('click', closeHelpMenu);

  const helpSubmenuTriggers = offcanvasHelp.querySelectorAll('.menu-item.has-submenu');
  const helpBackButtons = offcanvasHelp.querySelectorAll('[data-back]');

  helpSubmenuTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      const submenuId = this.dataset.submenu;
      const submenu = document.getElementById('submenu-help-' + submenuId);
      if (!submenu) return;
      mainLevelHelp.classList.remove('active');
      mainLevelHelp.classList.add('hidden-left');
      submenu.classList.remove('next');
      submenu.classList.add('active');
    });
  });

  helpBackButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const parentLevel = this.closest('.menu-level');
      parentLevel.classList.remove('active');
      parentLevel.classList.add('next');
      mainLevelHelp.classList.remove('hidden-left');
      mainLevelHelp.classList.add('active');
    });
  });

  // ====== Offcanvas для Account & Lists (правое) ======
  const accountLink = document.getElementById('accountListsLink');
  const overlayAccount = document.getElementById('overlay-account');
  const offcanvasAccount = document.getElementById('offcanvas-account');
  const closeAccount = document.getElementById('offcanvasCloseAccount');

  function openAccountMenu() {
    overlayAccount.classList.add('open');
    offcanvasAccount.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeAccountMenu() {
    overlayAccount.classList.remove('open');
    offcanvasAccount.classList.remove('open');
    if (!document.getElementById('offcanvas-shop').classList.contains('open') &&
        !document.getElementById('offcanvas-help').classList.contains('open')) {
      document.body.style.overflow = '';
    }
  }

  accountLink.addEventListener('click', function(e) {
    e.preventDefault();
    if (offcanvasShop.classList.contains('open')) closeShopMenu();
    if (offcanvasHelp.classList.contains('open')) closeHelpMenu();
    openAccountMenu();
  });
  overlayAccount.addEventListener('click', closeAccountMenu);
  closeAccount.addEventListener('click', closeAccountMenu);

  // Глобальное закрытие по Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (offcanvasShop.classList.contains('open')) closeShopMenu();
      if (offcanvasHelp.classList.contains('open')) closeHelpMenu();
      if (offcanvasAccount.classList.contains('open')) closeAccountMenu();
    }
  });

  // Мобильная навигация (гамбургер)
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');
  mobileNavToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    navLinks.classList.toggle('show');
  });
  document.addEventListener('click', function(e) {
    if (!navLinks.contains(e.target) && e.target !== mobileNavToggle) {
      navLinks.classList.remove('show');
    }
  });
})();