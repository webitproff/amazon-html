# amazon-html
This **[guide](https://abuyfile.com/en/usersblog/amazon-shablon-html-css-js)** provides a detailed breakdown of the adaptive interface styled after Amazon, featuring three slide-out menus. It is aimed at beginner developers who want to understand how modern navigation panels are built and how to separate HTML, CSS, and JavaScript into independent files. You can use this template as a foundation for your own themes on Cotonti CMF or other systems.

## Educational Purpose

The template demonstrates:
- Creating a fixed header and navigation bar.
- Using offcanvas menus (left and right) with smooth animation.
- Organizing nested submenus with transitions without page reloads.
- Applying CSS variables, Flexbox, absolute positioning, and media queries.
- Writing clean JavaScript to manage menu states.

All code is split into three files for easier maintenance. We will now examine each file step by step.

## 1. File Structure

```
project/
  index.html      – page markup
  style.css       – styles and animations
  script.js       – menu logic
```

The HTML includes Bootstrap (for icons and basic styles) and Font Awesome (for icons). The core functionality is handled by our own CSS and JS.

## 2. Detailed Breakdown of HTML (index.html)

The HTML document is divided into logical blocks: header, navigation bar, three offcanvas menus, main content, and footer. Let’s look at each.

### 2.1. Top Line (top-line)

```html
<div class="top-line">
  <a href="/" class="logo"><span>A</span>mazon</a>
  <div class="search-box">...</div>
  <div class="header-icons">
    <a href="#" id="accountListsLink">
      <span>Hello, sign in</span>
      <strong>Account & Lists</strong>
    </a>
    ...
  </div>
</div>
```

**Purpose:** a dark bar with the logo, search field, and user icons.

- **Logo** – a link with class `.logo`, the letter "A" highlighted in yellow.
- **Search box** – a flex container with two `<select>` elements and an input field. Wrapped in a border `border: 2px solid var(--amazon-yellow)`. On mobile devices (via media query) this block wraps to a new line and takes full width.
- **User icons** – the `.header-icons` block contains links arranged in a flex row. The `#accountListsLink` link has a unique `id` that JavaScript will use to open the right offcanvas menu.

Note: inside the link there are two text levels – `<span>` for greeting and `<strong>` for the main label. This allows separate styling.

### 2.2. Bottom Navigation Bar (nav-line)

```html
<div class="nav-line">
  <button class="mobile-nav-toggle" id="mobileNavToggle">
    <i class="fas fa-bars"></i>
  </button>
  <button class="all-btn" id="allBtn">
    <i class="fas fa-bars"></i> All
  </button>
  <div class="nav-links" id="navLinks">
    <a href="#">Today's Deals</a>
    <a href="#">Customer Service</a>
    <a href="#">Gift Cards</a>
    <a href="#" id="helpSettingsLink">Help & Settings</a>
  </div>
</div>
```

**Purpose:** a gray block below the header with the "All" button and additional links.

- **Hamburger button** (`#mobileNavToggle`) is visible only on mobile devices (initially hidden via `display: none`). It toggles the visibility of the `#navLinks` block on small screens.
- **"All" button** (`#allBtn`) opens the left offcanvas menu with the product categories list. It has a yellow background.
- **"Help & Settings" link** (`#helpSettingsLink`) opens a second left menu with settings.
- The **`#navLinks` block** is displayed horizontally on desktop; on mobile it turns into a dropdown list when the hamburger is clicked.

### 2.3. Offcanvas Menus: General Structure

All three menus follow the same pattern:

1. A semi-transparent overlay (`offcanvas-overlay`) that dims the background.
2. A menu container (`offcanvas-menu` or `offcanvas-menu-right`).
3. Inside the container:
   - Menu header with title and close button.
   - User block (for shop and help menus).
   - Menu body (`offcanvas-body`) containing navigation levels.

We will now examine each menu individually.

#### 2.3.1. Left Shop Menu ("All" Button)

```html
<div class="offcanvas-overlay" id="overlay-shop"></div>
<div class="offcanvas-menu" id="offcanvas-shop">
  <div class="offcanvas-header">
    <span>Browse all categories</span>
    <button class="offcanvas-close" id="offcanvasCloseShop">
      <i class="fas fa-times"></i>
    </button>
  </div>
  <div class="offcanvas-user">
    <i class="fas fa-user-circle fa-2x"></i> Hello, sign in
  </div>
  <div class="offcanvas-body">
    <!-- menu levels -->
  </div>
</div>
```

- **Overlay** (`#overlay-shop`) and the menu itself (`#offcanvas-shop`) are linked via JavaScript: when the menu opens, the overlay gets the class `open`, making it visible.
- **Closing** occurs by clicking the X button, the overlay, or pressing Escape.
- **User block** – an extra section, like on the real Amazon.
- **Menu body** is built on absolutely positioned layers with class `.menu-level`.

#### 2.3.2. Menu Levels and Submenus in the Shop

The main level (`#mainLevelShop`) contains categories. Those with subcategories have the class `has-submenu` and a `data-submenu` attribute:

```html
<div class="menu-item has-submenu" data-submenu="electronics">
  Electronics <span class="menu-arrow"><i class="fas fa-chevron-right"></i></span>
</div>
```

A submenu is a separate `div.menu-level` with `id="submenu-electronics"`, initially hidden (class `next`). When the parent item is clicked, JavaScript finds the submenu by `id` and swaps classes to trigger the animation.

Each submenu always contains a "back" button:

```html
<div class="menu-item back-button" data-back>
  <i class="fas fa-arrow-left"></i> main menu
</div>
```

The `data-back` attribute lets the script identify this button to return to the main level.

The submenus `computers`, `books`, `home` are built the same way.

#### 2.3.3. Left "Help & Settings" Menu

Completely analogous to the shop menu, but with a different `id` (`#offcanvas-help`) and its own overlay (`#overlay-help`). The main level (`#mainLevelHelp`) contains items with submenus "Seasons" and "Days of the Week". Their structure repeats the shop logic.

#### 2.3.4. Right "Account & Lists" Menu

Differs from the left ones by the slide direction. It uses the class `offcanvas-menu-right`:

```html
<div class="offcanvas-overlay" id="overlay-account"></div>
<div class="offcanvas-menu-right" id="offcanvas-account">
  <div class="offcanvas-header">...</div>
  <div class="offcanvas-body" style="overflow-y: auto;">
    <!-- simple list -->
  </div>
</div>
```

Inside the body is a static list with a "Sign in" button and links. There are no nested levels, so the script only opens/closes this menu.

### 2.4. Main Content and Footer

A regular block with a placeholder and a footer that doesn't affect the menu logic. The footer uses flex-wrap for responsiveness.

## 3. Detailed Breakdown of CSS (style.css)

CSS is built on variables defined in `:root`. This makes it easy to change the colors of the entire interface.

### 3.1. Variables and Base Styles

```css
:root {
  --amazon-dark: #131921;
  --amazon-light-dark: #232f3e;
  --amazon-yellow: #febd69;
  --amazon-white: #ffffff;
  --menu-width: 365px;
}
body {
  font-family: Arial, sans-serif;
  background: #fff;
  overflow-x: hidden;
}
```

`overflow-x: hidden` prevents horizontal scroll when menus slide out.

### 3.2. Top Line

**Flex container** with `flex-wrap: wrap` allows items to wrap on mobile.

```css
.top-line {
  background: var(--amazon-dark);
  color: #ccc;
  display: flex;
  align-items: center;
  padding: 8px 15px;
  gap: 15px;
  flex-wrap: wrap;
}
```

**Logo** – large white text, letter "A" in yellow.

**Search box** – also a flex container that stretches thanks to `flex: 1`. Has a yellow border.

**Icons** – `gap: 20px`, links are displayed as a column (via `flex-direction: column`) so the text appears on two lines.

### 3.3. Navigation Bar

```css
.nav-line {
  background: var(--amazon-light-dark);
  display: flex;
  align-items: center;
  min-height: 40px;
  padding: 0 15px;
  position: relative;
  z-index: 1020;
}
```

`position: relative; z-index: 1020` is needed to keep the navigation bar above the offcanvas menus when they overlap (menus have z-index 2000+, but they are fixed, so this is more of a safety measure).

**"All" button** – yellow, with inner flex for icon and text.

**Navigation links** – white, become brighter on hover.

### 3.4. Overlay

```css
.offcanvas-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 2000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
}
.offcanvas-overlay.open {
  opacity: 1;
  visibility: visible;
}
```

The overlay is initially transparent and hidden (`visibility: hidden`). Adding the class `open` makes it visible and semi-transparent. The dual property (`opacity` + `visibility`) ensures the element does not capture clicks when hidden.

### 3.5. Left Offcanvas Menu

```css
.offcanvas-menu {
  position: fixed;
  top: 0; left: 0;
  width: var(--menu-width);
  max-width: 85vw;
  height: 100%;
  background: #fff;
  z-index: 2010;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 2px 0 10px rgba(0,0,0,0.2);
}
.offcanvas-menu.open {
  transform: translateX(0);
}
```

The menu is fixed, takes up the full screen height. Initially shifted left by 100% of its width using `translateX(-100%)`. When the class `open` is added, transform becomes `translateX(0)`, and the menu slides in smoothly. `transition` sets the animation duration to 0.3 seconds.

`z-index: 2010` is higher than the overlay (2000) so the menu appears above the dimming.

**Menu header** – dark background, white text, close button (X) positioned to the right.

**User block** – gray background, icon and text.

**Menu body** – takes the remaining space, has `position: relative` and `overflow: hidden` for correct operation of nested absolute layers.

### 3.6. Menu Levels (menu-level) – Key Submenu Animation

```css
.menu-level {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  overflow-y: auto;
  background: #fff;
  transition: transform 0.3s ease;
  padding-bottom: 20px;
}
.menu-level.active {
  transform: translateX(0);
  z-index: 2;
}
.menu-level.next {
  transform: translateX(100%);
  z-index: 1;
}
.menu-level.hidden-left {
  transform: translateX(-100%);
  z-index: 0;
}
```

All levels reside inside `.offcanvas-body` and are positioned absolutely relative to it. Initially the main level is active (`active`). Submenus have the class `next` and are shifted right out of the visible area (`translateX(100%)`). When the user clicks a submenu item:

1. The main level gets the class `hidden-left`, shifting left (`translateX(-100%)`).
2. The target submenu loses the class `next` and gains `active`, shifting to the center (`translateX(0)`).

Returning works in reverse. All animations are smooth thanks to `transition`. `overflow-y: auto` allows scrolling long lists.

`z-index` controls stacking order: the active layer is on top.

### 3.7. Menu Items and Subcategories

```css
.menu-item {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: #111;
  text-decoration: none;
  font-size: 0.95rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.15s;
}
.menu-item:hover { background: #f3f3f3; }
.menu-item.has-submenu .menu-arrow {
  margin-left: auto;
  color: #888;
}
```

Items are links or divs with class `.menu-item`. On hover the background becomes light gray. The right arrow (`menu-arrow`) is automatically pushed to the right edge via `margin-left: auto`.

**Subcategories** (`.subcategory-item`) – ordinary block links with a smaller font.

**Back button** (`.menu-item.back-button`) – bold text and a light gray background.

### 3.8. Right Menu

```css
.offcanvas-menu-right {
  position: fixed;
  top: 0; right: 0; left: auto;
  width: var(--menu-width);
  max-width: 85vw;
  height: 100%;
  background: #fff;
  z-index: 2010;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: -2px 0 10px rgba(0,0,0,0.2);
}
.offcanvas-menu-right.open {
  transform: translateX(0);
}
```

Instead of `left: 0`, we use `right: 0; left: auto`. The initial offset is `translateX(100%)` (off the right edge). Opening sets `translateX(0)`. The shadow falls to the left (negative `box-shadow` value).

Inside the right menu there are no layers, only a simple list with class `.account-menu-list`.

### 3.9. Footer and Media Queries

The footer uses flex-wrap for column wrapping on narrow screens.

**Media query for mobile (≤768px)**:
- Top line: reduced padding.
- Search box: `order: 3` and `width: 100%` – it jumps to a new line and takes full width.
- Hamburger: `display: block` – becomes visible.
- Navigation links `#navLinks`: become a vertical list, hidden by default. They are shown only when the class `show` is added (via JS). They are absolutely positioned below the navigation bar.

## 4. Detailed Breakdown of JavaScript (script.js)

The script is wrapped in an immediately invoked function expression `(function() { ... })();` to avoid polluting the global scope. The code runs as soon as the DOM is ready because it is loaded with the `defer` attribute, which guarantees the DOM is already built.

### 4.1. Variable Initialization

For each menu, constants are defined that reference DOM elements by their `id`. For example:

```javascript
const allBtn = document.getElementById('allBtn');
const overlayShop = document.getElementById('overlay-shop');
const offcanvasShop = document.getElementById('offcanvas-shop');
const closeShop = document.getElementById('offcanvasCloseShop');
const mainLevelShop = document.getElementById('mainLevelShop');
```

If an element is missing, the script won’t break, but the menu won’t work.

### 4.2. Functions for the Left Shop Menu

```javascript
function openShopMenu() {
  overlayShop.classList.add('open');
  offcanvasShop.classList.add('open');
  document.body.style.overflow = 'hidden';
  resetShopMenu();
}
function closeShopMenu() {
  overlayShop.classList.remove('open');
  offcanvasShop.classList.remove('open');
  if (!offcanvasHelp.classList.contains('open') &&
      !offcanvasAccount.classList.contains('open')) {
    document.body.style.overflow = '';
  }
}
```

When opening, the `open` classes are added to the overlay and menu, triggering CSS animations. Body scrolling is blocked (`overflow: hidden`) so the page under the overlay doesn’t scroll.

When closing, the classes are removed. Scrolling is restored only if no other menu is open. The other two menus are checked for the `open` class.

**Reset levels**:

```javascript
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
```

This function is called each time the menu opens. It ensures the main level is active and centered, and all submenus are shifted right (class `next`) and inactive. This prevents the situation where the user closed the menu on a sublevel and upon reopening sees a submenu instead of the main screen.

### 4.3. Event Handlers for the Shop Menu

- **"All" button** – calls `openShopMenu()` with `stopPropagation()` to prevent the click from bubbling to the document.
- **Overlay and X button** – call `closeShopMenu()`.
- **Escape** – a global `keydown` handler closes all open menus.

### 4.4. Submenu Navigation in the Shop

```javascript
const shopSubmenuTriggers = offcanvasShop.querySelectorAll('.menu-item.has-submenu');
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
```

For each item with class `has-submenu`, a click handler is attached. It reads the `data-submenu` attribute (e.g., `electronics`), forms the submenu `id` (`submenu-electronics`), finds it, and swaps classes:
- the main level moves left (hidden-left),
- the target submenu becomes active (removes next, adds active).

**Back button**:

```javascript
const shopBackButtons = offcanvasShop.querySelectorAll('[data-back]');
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
```

When a button with `data-back` is clicked, it finds its nearest parent `.menu-level` (the current submenu), hides it (next), and returns the main level to the center (active, removes hidden-left).

### 4.5. "Help & Settings" Menu

Completely identical to the shop menu, but with its own variables and elements. The only difference is in the `id`s and that submenu lookup uses the prefix `submenu-help-` (e.g., `submenu-help-seasons`).

When opening this menu, the others are closed:

```javascript
helpLink.addEventListener('click', function(e) {
  e.preventDefault();
  if (offcanvasShop.classList.contains('open')) closeShopMenu();
  if (offcanvasAccount.classList.contains('open')) closeAccountMenu();
  openHelpMenu();
});
```

### 4.6. Right "Account & Lists" Menu

The open/close functions are simpler because there are no sublevels inside.

```javascript
function openAccountMenu() {
  overlayAccount.classList.add('open');
  offcanvasAccount.classList.add('open');
  document.body.style.overflow = 'hidden';
}
```

When opening, other menus are also closed.

### 4.7. Global Close with Escape

```javascript
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (offcanvasShop.classList.contains('open')) closeShopMenu();
    if (offcanvasHelp.classList.contains('open')) closeHelpMenu();
    if (offcanvasAccount.classList.contains('open')) closeAccountMenu();
  }
});
```

This handler is not tied to a specific menu and closes all open ones.

### 4.8. Mobile Menu (Hamburger)

```javascript
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
```

On mobile devices the `#navLinks` block is hidden (CSS `display: none`). When the hamburger is clicked, the class `show` is toggled, which via a media query changes `display` to `flex`. A click outside this block or on the hamburger closes it.

### 4.9. Interaction Between Menus

Key point: when any menu is opened, it checks whether other menus are open, and if so, closes them. This prevents multiple menus and overlays from stacking. Also, after each menu closes, it checks whether any other menus remain open, so that scrolling is not restored prematurely.

## 5. How It All Works Together

The connection between HTML, CSS, and JS is established via `id`s and classes. JavaScript only manages states (adding/removing classes), while CSS handles the visual representation of these states (animations, positioning). Let’s trace the full cycle of opening a submenu:

1. The user clicks the "Electronics" item in the shop menu.
2. JS reads `data-submenu="electronics"`, finds `#submenu-electronics`.
3. The main level (`#mainLevelShop`) gets the class `hidden-left`, shifting left.
4. The submenu (`#submenu-electronics`) gets the class `active` (instead of `next`), and its transform becomes `translateX(0)`, sliding the submenu into the center.
5. If "back" is pressed, JS removes `active` from the submenu, adds `next` (slides right), and returns the main level to `active` (center).

All transitions last 0.3 seconds thanks to a single `transition` in CSS.

## 6. Conclusion

You have received a detailed description of an adaptive template with multiple offcanvas menus. Now you can:
- Change the color scheme via CSS variables.
- Add new submenus by following the same structure (copying a `menu-level` block and adding a trigger with `data-submenu`).
- Use the right offcanvas for other purposes (cart, notifications).
- Integrate this code into Cotonti CMF by replacing static content with TPL tags.

This template is an educational resource and can serve as a starting point for creating your own themes. Understanding the principles of CSS animations and managing the DOM through classes will open the door to building complex interfaces without heavy frameworks.

___
RU
___

Данное руководство представляет собой детальный разбор устройства адаптивного интерфейса, стилизованного под Amazon, с тремя выезжающими меню. Материал ориентирован на начинающих разработчиков, которые хотят понять, как строятся современные навигационные панели, и как разделить HTML, CSS и JavaScript на независимые файлы. Вы сможете использовать этот шаблон как основу для своих тем на Cotonti CMF или других системах.

## Образовательная цель

Шаблон демонстрирует:
- Создание фиксированной шапки и навигационной панели.
- Использование offcanvas-меню (левых и правого) с плавной анимацией.
- Организацию вложенных подменю с переходами без перезагрузки страницы.
- Применение CSS-переменных, Flexbox, абсолютного позиционирования и медиазапросов.
- Написание чистого JavaScript для управления состояниями меню.

Весь код разделён на три файла, что упрощает поддержку. Далее мы шаг за шагом разберём каждый из них.

## 1. Файловая структура

```
project/
  index.html      – разметка страницы
  style.css       – стили и анимации
  script.js       – логика работы меню
```

В HTML подключаются Bootstrap (для иконок и базовых стилей) и Font Awesome (для иконок). Основная работа выполняется нашим собственным CSS и JS.

## 2. Подробный разбор HTML (index.html)

HTML-документ разделён на логические блоки: шапка, навигационная строка, три offcanvas-меню, основной контент и подвал. Рассмотрим каждый.

### 2.1. Верхняя строка (top-line)

```html
<div class="top-line">
  <a href="/" class="logo"><span>A</span>mazon</a>
  <div class="search-box">...</div>
  <div class="header-icons">
    <a href="#" id="accountListsLink">
      <span>Hello, sign in</span>
      <strong>Account & Lists</strong>
    </a>
    ...
  </div>
</div>
```

**Назначение:** тёмная полоса с логотипом, поисковой строкой и иконками пользователя.

- **Логотип** – ссылка с классом `.logo`, буква «A» выделена жёлтым цветом.
- **Поисковая строка** – flex-контейнер с двумя `<select>` и полем ввода. Обёрнута в рамку `border: 2px solid var(--amazon-yellow)`. На мобильных устройствах (через медиазапрос) этот блок переносится на новую строку и занимает всю ширину.
- **Иконки пользователя** – блок `.header-icons` содержит ссылки, выстроенные во flex-строку. Ссылка `#accountListsLink` имеет уникальный `id`, через который JavaScript будет открывать правое offcanvas-меню.

Обратите внимание: внутри ссылки два уровня текста – `<span>` для приветствия и `<strong>` для основного названия. Это позволяет стилизовать их раздельно.

### 2.2. Нижняя навигационная строка (nav-line)

```html
<div class="nav-line">
  <button class="mobile-nav-toggle" id="mobileNavToggle">
    <i class="fas fa-bars"></i>
  </button>
  <button class="all-btn" id="allBtn">
    <i class="fas fa-bars"></i> All
  </button>
  <div class="nav-links" id="navLinks">
    <a href="#">Today's Deals</a>
    <a href="#">Customer Service</a>
    <a href="#">Gift Cards</a>
    <a href="#" id="helpSettingsLink">Help & Settings</a>
  </div>
</div>
```

**Назначение:** серый блок под шапкой с кнопкой «All» и дополнительными ссылками.

- **Кнопка-гамбургер** (`#mobileNavToggle`) видна только на мобильных устройствах (изначально скрыта через `display: none`). Она отвечает за показ/скрытие блока `#navLinks` на маленьких экранах.
- **Кнопка «All»** (`#allBtn`) открывает левое offcanvas-меню со списком категорий товаров. Имеет жёлтый фон.
- **Ссылка «Help & Settings»** (`#helpSettingsLink`) открывает второе левое меню с настройками.
- **Блок `#navLinks`** на десктопе отображается горизонтально, на мобильных – превращается в выпадающий список при клике на гамбургер.

### 2.3. Offcanvas-меню: общая структура

Все три меню построены по одной схеме:

1. Полупрозрачный оверлей (`offcanvas-overlay`), который затемняет фон.
2. Контейнер меню (`offcanvas-menu` или `offcanvas-menu-right`).
3. Внутри контейнера:
   - Шапка меню с заголовком и кнопкой закрытия.
   - Блок пользователя (для магазина и помощи).
   - Тело меню (`offcanvas-body`), которое содержит уровни навигации.

Рассмотрим каждое меню отдельно.

#### 2.3.1. Левое меню магазина (кнопка «All»)

```html
<div class="offcanvas-overlay" id="overlay-shop"></div>
<div class="offcanvas-menu" id="offcanvas-shop">
  <div class="offcanvas-header">
    <span>Browse all categories</span>
    <button class="offcanvas-close" id="offcanvasCloseShop">
      <i class="fas fa-times"></i>
    </button>
  </div>
  <div class="offcanvas-user">
    <i class="fas fa-user-circle fa-2x"></i> Hello, sign in
  </div>
  <div class="offcanvas-body">
    <!-- уровни меню -->
  </div>
</div>
```

- **Оверлей** (`#overlay-shop`) и само меню (`#offcanvas-shop`) связаны через JavaScript: при открытии меню оверлею добавляется класс `open`, делая его видимым.
- **Закрытие** происходит по клику на крестик, на оверлей или по клавише Escape.
- **Блок пользователя** – дополнительная секция, как на реальном Amazon.
- **Тело меню** построено на абсолютно позиционированных слоях с классами `.menu-level`.

#### 2.3.2. Уровни меню и подменю в магазине

Главный уровень (`#mainLevelShop`) содержит категории. Те, у которых есть подкатегории, имеют класс `has-submenu` и атрибут `data-submenu`:

```html
<div class="menu-item has-submenu" data-submenu="electronics">
  Electronics <span class="menu-arrow"><i class="fas fa-chevron-right"></i></span>
</div>
```

Подменю представляет собой отдельный `div.menu-level` с `id="submenu-electronics"`, который изначально скрыт (класс `next`). При клике на родительский пункт JavaScript находит подменю по `id` и меняет классы, запуская анимацию.

В подменю обязательно присутствует кнопка «назад»:

```html
<div class="menu-item back-button" data-back>
  <i class="fas fa-arrow-left"></i> main menu
</div>
```

Атрибут `data-back` позволяет скрипту идентифицировать эту кнопку для возврата на главный уровень.

Аналогично устроены подменю `computers`, `books`, `home`.

#### 2.3.3. Левое меню «Help & Settings»

Полностью аналогично магазину, но с другим `id` (`#offcanvas-help`) и собственным оверлеем (`#overlay-help`). Внутри главного уровня (`#mainLevelHelp`) находятся пункты с подменю «Времена года» и «Дни недели». Их структура повторяет логику магазина.

#### 2.3.4. Правое меню «Account & Lists»

Отличается от левых направлением выезда. Используется класс `offcanvas-menu-right`:

```html
<div class="offcanvas-overlay" id="overlay-account"></div>
<div class="offcanvas-menu-right" id="offcanvas-account">
  <div class="offcanvas-header">...</div>
  <div class="offcanvas-body" style="overflow-y: auto;">
    <!-- простой список -->
  </div>
</div>
```

Внутри тела меню – статичный список с кнопкой «Sign in» и ссылками. Здесь нет вложенных уровней, поэтому скрипт только открывает/закрывает это меню.

### 2.4. Основной контент и подвал

Обычный блок с заглушкой и футер, не влияющий на логику меню. Футер использует flex-wrap для адаптивности.

## 3. Подробный разбор CSS (style.css)

CSS построен на переменных, определённых в `:root`. Это позволяет легко менять цвета всего интерфейса.

### 3.1. Переменные и базовые стили

```css
:root {
  --amazon-dark: #131921;
  --amazon-light-dark: #232f3e;
  --amazon-yellow: #febd69;
  --amazon-white: #ffffff;
  --menu-width: 365px;
}
body {
  font-family: Arial, sans-serif;
  background: #fff;
  overflow-x: hidden;
}
```

`overflow-x: hidden` предотвращает горизонтальную прокрутку при выезжающих меню.

### 3.2. Верхняя строка

**Flex-контейнер** с `flex-wrap: wrap` позволяет элементам переноситься на мобильных.

```css
.top-line {
  background: var(--amazon-dark);
  color: #ccc;
  display: flex;
  align-items: center;
  padding: 8px 15px;
  gap: 15px;
  flex-wrap: wrap;
}
```

**Логотип** – крупный белый текст, буква «A» жёлтая.

**Поисковая строка** – также flex-контейнер, который растягивается благодаря `flex: 1`. Имеет жёлтую рамку.

**Иконки** – `gap: 20px`, ссылки отображаются как колонка (через `flex-direction: column`), чтобы текст был в две строки.

### 3.3. Навигационная строка

```css
.nav-line {
  background: var(--amazon-light-dark);
  display: flex;
  align-items: center;
  min-height: 40px;
  padding: 0 15px;
  position: relative;
  z-index: 1020;
}
```

`position: relative; z-index: 1020` нужен для того, чтобы навигационная строка оставалась поверх offcanvas-меню при их перекрытии (меню имеют z-index 2000+, но они фиксированы, так что это скорее страховка).

**Кнопка «All»** – жёлтая, с внутренним flex для иконки и текста.

**Ссылки навигации** – белые, при наведении становятся ярче.

### 3.4. Оверлей

```css
.offcanvas-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 2000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
}
.offcanvas-overlay.open {
  opacity: 1;
  visibility: visible;
}
```

Оверлей изначально прозрачен и скрыт (`visibility: hidden`). Добавление класса `open` делает его видимым и полупрозрачным. Двойное свойство (`opacity` + `visibility`) гарантирует, что элемент не будет перехватывать клики, когда скрыт.

### 3.5. Левое offcanvas-меню

```css
.offcanvas-menu {
  position: fixed;
  top: 0; left: 0;
  width: var(--menu-width);
  max-width: 85vw;
  height: 100%;
  background: #fff;
  z-index: 2010;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 2px 0 10px rgba(0,0,0,0.2);
}
.offcanvas-menu.open {
  transform: translateX(0);
}
```

Меню зафиксировано, занимает всю высоту экрана. Изначально сдвинуто влево на 100% своей ширины с помощью `translateX(-100%)`. При добавлении класса `open` transform становится `translateX(0)`, и меню плавно выезжает. `transition` задаёт длительность анимации 0.3 секунды.

`z-index: 2010` выше, чем у оверлея (2000), чтобы меню было над затемнением.

**Шапка меню** – тёмный фон, белый текст, кнопка закрытия (крестик) спозиционирована справа.

**Блок пользователя** – серый фон, иконка и текст.

**Тело меню** – занимает оставшееся пространство, имеет `position: relative` и `overflow: hidden` для корректной работы вложенных абсолютных слоёв.

### 3.6. Слои меню (menu-level) – ключевая анимация подменю

```css
.menu-level {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  overflow-y: auto;
  background: #fff;
  transition: transform 0.3s ease;
  padding-bottom: 20px;
}
.menu-level.active {
  transform: translateX(0);
  z-index: 2;
}
.menu-level.next {
  transform: translateX(100%);
  z-index: 1;
}
.menu-level.hidden-left {
  transform: translateX(-100%);
  z-index: 0;
}
```

Все уровни находятся внутри `.offcanvas-body` и позиционированы абсолютно относительно него. Изначально главный уровень активен (`active`). Подменю имеют класс `next` и сдвинуты вправо за пределы видимой области (`translateX(100%)`). Когда пользователь кликает по пункту с подменю:

1. Главный уровень получает класс `hidden-left`, смещаясь влево (`translateX(-100%)`).
2. Целевое подменю теряет класс `next` и получает `active`, смещаясь в центр (`translateX(0)`).

Возврат происходит наоборот. Все анимации плавные благодаря `transition`. `overflow-y: auto` позволяет прокручивать длинные списки.

`z-index` управляет порядком наложения: активный слой поверх остальных.

### 3.7. Пункты меню и подкатегории

```css
.menu-item {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: #111;
  text-decoration: none;
  font-size: 0.95rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.15s;
}
.menu-item:hover { background: #f3f3f3; }
.menu-item.has-submenu .menu-arrow {
  margin-left: auto;
  color: #888;
}
```

Пункты – это ссылки или div'ы с классом `.menu-item`. При наведении фон становится светло-серым. Стрелка вправо (`menu-arrow`) автоматически прижимается к правому краю через `margin-left: auto`.

**Подкатегории** (`.subcategory-item`) – обычные блочные ссылки с меньшим шрифтом.

**Кнопка «назад»** (`.menu-item.back-button`) – выделена жирным шрифтом и светло-серым фоном.

### 3.8. Правое меню

```css
.offcanvas-menu-right {
  position: fixed;
  top: 0; right: 0; left: auto;
  width: var(--menu-width);
  max-width: 85vw;
  height: 100%;
  background: #fff;
  z-index: 2010;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: -2px 0 10px rgba(0,0,0,0.2);
}
.offcanvas-menu-right.open {
  transform: translateX(0);
}
```

Вместо `left: 0` используется `right: 0; left: auto`. Начальное смещение – `translateX(100%)` (за правый край). Открытие – `translateX(0)`. Тень падает влево (отрицательное значение `box-shadow`).

Внутри правого меню нет слоёв, только простой список с классом `.account-menu-list`.

### 3.9. Футер и медиазапросы

Футер использует flex-wrap для переноса колонок на узких экранах.

**Медиазапрос для мобильных (≤768px)**:
- Верхняя строка: уменьшаются отступы.
- Поисковая строка: `order: 3` и `width: 100%` – она перескакивает на новую строку и занимает всю ширину.
- Гамбургер: `display: block` – становится видимым.
- Навигационные ссылки `#navLinks`: превращаются в вертикальный список, скрытый по умолчанию. Показываются только при добавлении класса `show` (через JS). Они абсолютно позиционированы под навигационной строкой.

## 4. Подробный разбор JavaScript (script.js)

Скрипт обёрнут в самовызывающуюся функцию `(function() { ... })();`, чтобы не засорять глобальную область видимости. Код выполняется сразу, так как подключается с атрибутом `defer`, который гарантирует, что DOM уже построен.

### 4.1. Инициализация переменных

Для каждого меню определяются константы, ссылающиеся на DOM-элементы по их `id`. Например:

```javascript
const allBtn = document.getElementById('allBtn');
const overlayShop = document.getElementById('overlay-shop');
const offcanvasShop = document.getElementById('offcanvas-shop');
const closeShop = document.getElementById('offcanvasCloseShop');
const mainLevelShop = document.getElementById('mainLevelShop');
```

Если какой-то элемент отсутствует, скрипт не сломается, но меню не будет работать.

### 4.2. Функции для левого меню магазина

```javascript
function openShopMenu() {
  overlayShop.classList.add('open');
  offcanvasShop.classList.add('open');
  document.body.style.overflow = 'hidden';
  resetShopMenu();
}
function closeShopMenu() {
  overlayShop.classList.remove('open');
  offcanvasShop.classList.remove('open');
  if (!offcanvasHelp.classList.contains('open') &&
      !offcanvasAccount.classList.contains('open')) {
    document.body.style.overflow = '';
  }
}
```

При открытии добавляются классы `open` оверлею и меню, запуская CSS-анимации. Прокрутка `body` блокируется (`overflow: hidden`), чтобы страница под оверлеем не скроллилась.

При закрытии классы убираются. Блокировка прокрутки снимается только в том случае, если ни одно другое меню не открыто. Для этого проверяются оба других меню.

**Сброс уровней**:

```javascript
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
```

Функция вызывается при каждом открытии меню. Она гарантирует, что главный уровень активен и находится в центре, а все подменю сдвинуты вправо (класс `next`) и неактивны. Это предотвращает ситуацию, когда пользователь закрыл меню на подуровне, а при повторном открытии видит не главный экран.

### 4.3. Обработчики событий для меню магазина

- **Кнопка «All»** – вызывает `openShopMenu()` с `stopPropagation()`, чтобы клик не всплывал к документу.
- **Оверлей и крестик** – вызывают `closeShopMenu()`.
- **Escape** – глобальный обработчик на `keydown` закрывает все открытые меню.

### 4.4. Навигация по подменю в магазине

```javascript
const shopSubmenuTriggers = offcanvasShop.querySelectorAll('.menu-item.has-submenu');
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
```

Для каждого пункта с классом `has-submenu` вешается обработчик клика. Он считывает значение атрибута `data-submenu` (например, `electronics`), формирует `id` подменю (`submenu-electronics`), находит его и меняет классы:
- главный уровень уходит влево (hidden-left),
- целевое подменю становится активным (убирается next, добавляется active).

**Кнопка «назад»**:

```javascript
const shopBackButtons = offcanvasShop.querySelectorAll('[data-back]');
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
```

Кнопка с атрибутом `data-back` при клике находит свой ближайший родительский `.menu-level` (это текущее подменю), скрывает его (next) и возвращает главный уровень в центр (active, убирает hidden-left).

### 4.5. Меню «Help & Settings»

Полностью идентично магазину, но с собственными переменными и элементами. Разница только в `id` и в том, что поиск подменю ведётся с префиксом `submenu-help-` (например, `submenu-help-seasons`).

При открытии этого меню закрываются остальные:

```javascript
helpLink.addEventListener('click', function(e) {
  e.preventDefault();
  if (offcanvasShop.classList.contains('open')) closeShopMenu();
  if (offcanvasAccount.classList.contains('open')) closeAccountMenu();
  openHelpMenu();
});
```

### 4.6. Правое меню «Account & Lists»

Функции открытия/закрытия проще, так как внутри нет подуровней.

```javascript
function openAccountMenu() {
  overlayAccount.classList.add('open');
  offcanvasAccount.classList.add('open');
  document.body.style.overflow = 'hidden';
}
```

При открытии также закрываются другие меню.

### 4.7. Глобальное закрытие по Escape

```javascript
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (offcanvasShop.classList.contains('open')) closeShopMenu();
    if (offcanvasHelp.classList.contains('open')) closeHelpMenu();
    if (offcanvasAccount.classList.contains('open')) closeAccountMenu();
  }
});
```

Этот обработчик не зависит от конкретного меню и закрывает все открытые.

### 4.8. Мобильное меню (гамбургер)

```javascript
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
```

На мобильных устройствах блок `#navLinks` скрыт (CSS `display: none`). При клике на гамбургер добавляется/убирается класс `show`, который через медиазапрос меняет `display` на `flex`. Клик вне этого блока или по гамбургеру закрывает его.

### 4.9. Взаимодействие между меню

Ключевой момент: при открытии любого меню проверяется, не открыты ли другие, и если да – они закрываются. Это предотвращает наложение нескольких меню и оверлеев. Также после закрытия каждого меню проверяется, остались ли ещё открытые, чтобы не восстанавливать прокрутку раньше времени.

## 5. Как всё работает вместе

Связь HTML, CSS и JS осуществляется через `id` и классы. JavaScript управляет только состояниями (добавлением/удалением классов), а CSS отвечает за визуальное представление этих состояний (анимации, позиционирование). Разберём полный цикл открытия подменю:

1. Пользователь кликает на пункт «Electronics» в меню магазина.
2. JS считывает `data-submenu="electronics"`, находит `#submenu-electronics`.
3. Главному уровню (`#mainLevelShop`) назначается класс `hidden-left`, и он смещается влево.
4. Подменю (`#submenu-electronics`) получает класс `active` (вместо `next`), и transform становится `translateX(0)`, подменю выезжает в центр.
5. Если нажать «назад», JS убирает `active` у подменю, добавляет `next` (уезжает вправо), а главному уровню возвращает `active` (центр).

Все переходы длятся 0.3 секунды благодаря единому `transition` в CSS.

## 6. Заключение

Вы получили детальное описание адаптивного шаблона с несколькими offcanvas-меню. Теперь вы можете:
- Изменять цветовую схему через CSS-переменные.
- Добавлять новые подменю, следуя той же структуре (копируя блок `menu-level` и добавляя триггер с `data-submenu`).
- Использовать правый offcanvas для других целей (корзина, уведомления).
- Интегрировать этот код в Cotonti CMF, заменив статическое наполнение на TPL-теги.

Данный шаблон является образовательным материалом и может служить отправной точкой для создания собственных тем. Понимание принципов работы CSS-анимаций и управления DOM через классы откроет вам путь к построению сложных интерфейсов без тяжёлых фреймворков.
