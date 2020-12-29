'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const topMenu = document.querySelector('.nav');

const learnMoreBtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// -------------------------
// -------Modal Window------
// -------------------------

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// -------------------------
// --------Scrolling--------
// -------------------------

learnMoreBtn.addEventListener('click', function () {
  // this gets the coordinates
  const s1cords = section1.getBoundingClientRect();
  // ^ cords are relative to view screen.

  // // the actual scroll
  // window.scrollTo(
  //   s1cords.left + window.pageXOffset,
  //   // ^ the page offset is from where you are to the end of --
  //   // -- the page. x=left & y=top
  //   s1cords.top + window.pageYOffset
  // );

  // // we can add a behavior to the scroll
  // window.scrollTo({
  //   left: s1cords.left + window.pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // MOST MODERN WAY
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // this works because as the parent element of all the--
  // --nodes all of thier event listeners bubble up to the==
  // --parent element. So control them all thier.
  if (e.target.classList.contains('nav__link')) {
    const currentId = e.target.getAttribute('href');
    // ^ has to be the element 'e' being clicked.
    document.querySelector(currentId).scrollIntoView({ behavior: 'smooth' });
  }
});

// // querySelectorAll returns all the nodes in a node list. the --
// // --node list is similiar to an array. Its like an array of nodes.

// document.querySelectorAll('.nav__link').forEach(function (element) {
//   element.addEventListener('click', function (e) {
//     e.preventDefault();
//     // ^ prevents automaticaly going to the href location.

//     // the this keyword points to the current element
//     const currentId = this.getAttribute('href');
//     // ^ this can now be used to call an element
//     console.log(currentId);
//     document.querySelector(currentId).scrollIntoView({ behavior: 'smooth' });
//   });
// });
// ------- // ^ this way of doing it could impact performance --
// -- because theres a function for every node in the list.

// -------------------------
// --------  Tabs   --------
// -------------------------

tabsContainer.addEventListener('click', function (t) {
  const clickedTab = t.target.closest('.operations__tab');
  // ^ use closest because it has a child element--
  // --that you might be able to click on

  // guard clause - takes you out of function
  if (!clickedTab) return;

  // active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedTab.classList.add('operations__tab--active');

  // active content area
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clickedTab.dataset.tab}`)
    .classList.add('operations__content--active');
});

// ---------------------------------------
// ----------Menu Fade Animation----------
// ---------------------------------------

const hoverHandler = function (n) {
  if (n.target.classList.contains('nav__link')) {
    const hoveredOver = n.target;
    const siblings = hoveredOver.closest('.nav').querySelectorAll('.nav__link');
    const logo = hoveredOver.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== hoveredOver) {
        el.style.opacity = this;
        // el.style.opacity = opacity (second argumnet)
      }
      logo.style.opacity = this;
      // logo.style.opacity = opacity (second argumnet)
    });
  }
};

// topMenu.addEventListener('mouseover', function (e) {
//   hoverHandler(e, 0.5);
// });
topMenu.addEventListener('mouseover', hoverHandler.bind(0.5));

// topMenu.addEventListener('mouseover', function (e) {
//   hoverHandler(e, 1);
// });
topMenu.addEventListener('mouseout', hoverHandler.bind(1));

// ---------------------------------------
// ---------- Sticky Navigation ----------
// ---------------------------------------

const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function () {
  if (initialCoords.top < window.scrollY) {
    topMenu.classList.add('sticky');
  } else topMenu.classList.remove('sticky');
});

// ---------------------------------------
// ----------Notes from lectures----------
// ---------------------------------------

/*

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();

  // console.log(`Link is my hero`);
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(randomColor());

  console.log(`Linksss is my hero`);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  console.log(`Nav is my hero`);
});

*/
