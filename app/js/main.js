$(function () {
  $('.dss-filter__col-subtitle').on('click', function () {
    const $this = $(this);
    $this.toggleClass('active');

    $this.next().slideToggle(300);
  });



  $("#price-range").ionRangeSlider({
    type: "double",
    min: 0,
    max: 10000,
    from: 1000,
    to: 7000,
    postfix: " ₴",
    onStart: updateInputs,
    onChange: updateInputs,
    onFinish: updateInputs
  });

  var range = $("#price-range").data("ionRangeSlider");

  function updateInputs(data) {
    $("#price-min").val(data.from);
    $("#price-max").val(data.to);
  }

  $("#price-min").on("input", function () {
    var val = +$(this).val();
    if (val < range.options.min) val = range.options.min;
    if (val > $("#price-max").val()) val = $("#price-max").val();
    range.update({ from: val });
  });

  $("#price-max").on("input", function () {
    var val = +$(this).val();
    if (val > range.options.max) val = range.options.max;
    if (val < $("#price-min").val()) val = $("#price-min").val();
    range.update({ to: val });
  });





});




document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  // ===== SEARCH =====
  const searchBtn = document.querySelector('.header__search');
  const searchForm = document.querySelector('.header__search-form');

  if (searchBtn && searchForm) {
    searchBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      searchForm.classList.toggle('active');
      updateBodyLock();
    });

    document.addEventListener('click', function (e) {
      if (!searchForm.contains(e.target) && !searchBtn.contains(e.target)) {
        searchForm.classList.remove('active');
        updateBodyLock();
      }
    });
  }

  // ===== FILTER =====
  const filterBtn = document.querySelector('.dss-filter__filter-btn');
  const filterClose = document.querySelector('.dss-filter__close');
  const filterLeft = document.querySelector('.dss-filter__left');

  if (filterBtn && filterLeft) {
    filterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      filterLeft.classList.add('open');
      updateBodyLock();
    });
  }

  if (filterClose && filterLeft) {
    filterClose.addEventListener('click', (e) => {
      e.stopPropagation();
      filterLeft.classList.remove('open');
      updateBodyLock();
    });
  }

  document.addEventListener('click', (e) => {
    if (filterLeft && filterBtn) {
      const isClickInsideFilter = filterLeft.contains(e.target);
      const isClickOnBtn = filterBtn.contains(e.target);

      if (!isClickInsideFilter && !isClickOnBtn) {
        filterLeft.classList.remove('open');
        updateBodyLock();
      }
    }
  });

  // ===== ФУНКЦІЯ КОНТРОЛЮ BODY LOCK =====
  function updateBodyLock() {
    const searchActive = searchForm && searchForm.classList.contains('active');
    const filterOpen = filterLeft && filterLeft.classList.contains('open');

    if (searchActive || filterOpen) {
      body.classList.add('lock');
    } else {
      body.classList.remove('lock');
    }
  }
});

//
document.querySelectorAll('.dss-filter .dss-size').forEach(el => {
  el.addEventListener('click', () => {
    el.classList.toggle('active');
  });
});





//
var swiper = new Swiper(".dss-brand__slider", {
  slidesPerView: 4,
  spaceBetween: 20,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 7,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 9,
      spaceBetween: 30,
    },
  },
});

//
var swiper = new Swiper(".mySwiper", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,
  direction: "vertical",
});

var swiper2 = new Swiper(".mySwiper2", {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
  on: {
    init: function () {
      updateCounter(this);
    },
    slideChange: function () {
      updateCounter(this);
    },
  },
});

function updateCounter(swiper) {
  const counter = swiper.el.querySelector(".swiper-counter");
  if (counter) {
    const current = swiper.realIndex + 1;
    const total = swiper.el.querySelectorAll(".swiper-slide:not(.swiper-slide-duplicate)").length;
    counter.textContent = `${current} / ${total}`;
  }
}



//
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.dss-item__add-favorite');
  if (btn) {
    btn.classList.toggle('active');
  }
});

//
const slider = document.querySelector('.size-wrap__inner');

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1; // коефіцієнт швидкості (1 = норм)
  slider.scrollLeft = scrollLeft - walk;
});


