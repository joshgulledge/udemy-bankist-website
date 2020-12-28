'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefualt();
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

// ------Scrolling------

const learnMoreBtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

learnMoreBtn.addEventListener('click', function () {
  // this gets the coordinates
  const s1cords = section1.getBoundingClientRect();
  // ^ cords are relative to view screen.
  console.log(`Learn more button pressed`);

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
