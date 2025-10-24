$(function () {
  // ===== Розгортання підзаголовків фільтра =====
  if ($('.dss-filter__col-subtitle').length) {
    $('.dss-filter__col-subtitle').on('click', function () {
      const $this = $(this);
      $this.toggleClass('active');
      $this.next().slideToggle(300);
    });
  }

  // ===== Слайдер ціни =====
  if ($("#price-range").length) {
    $("#price-range").ionRangeSlider({
      type: "double",
      min: 0,
      max: 10000,
      from: 1000,
      to: 7000,
      postfix: " ₴",
      onChange: updateInputs,
      onFinish: updateInputs
    });

    var range = $("#price-range").data("ionRangeSlider");

    // Спочатку інпути порожні
    $("#price-min").val("");
    $("#price-max").val("");

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
  }



  if ($(".accordeon").length) {
    $(".accordeon dd").hide().prev().click(function () {
      const $parent = $(this).parent();

      if ($parent.hasClass("open")) {
        $parent.removeClass("open");
        $(this).removeClass("active").next().slideUp();
        return;
      }

      $(this)
        .parents(".accordeon")
        .find("dd")
        .slideUp()
        .prev()
        .removeClass("active")
        .parent()
        .removeClass("open");

      $(this).addClass("active").next().slideDown();
      $parent.addClass("open");
    });

    const $firstItem = $(".accordeon dt").first();
    $firstItem.addClass("active").parent().addClass("open");
    $firstItem.next("dd").show();
  }


  $('.preference__title').on('click', function () {
    $(this).toggleClass('active');
    $(this).next().slideToggle(300);
  });


  $('.dss-order__item').on('click', function () {
    const $this = $(this);
    const $content = $this.next();

    $('.dss-order__item').not($this).removeClass('active').next().slideUp(300);

    $this.toggleClass('active');
    $content.slideToggle(300);
  });

  //
  $('.header__has-child > span').on('click', function () {
    $(this).next().slideToggle(300);
  });


});


document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  const searchBtn = document.querySelector('.header__search');
  const searchForm = document.querySelector('.header__search-form');
  const filterBtn = document.querySelector('.dss-filter__filter-btn');
  const filterClose = document.querySelector('.dss-filter__close');
  const filterLeft = document.querySelector('.dss-filter__left');
  const basketBtn = document.querySelector('.header__bascket');
  const basket = document.querySelector('.pst-basket');
  const closeBtn = document.querySelector('.pst-basket__close');
  const menuBtn = document.querySelector('.header__menu-btn');
  const header = document.querySelector('.header');
  const headerBox = document.querySelector('.header__box');
  const headerBtnBox = document.querySelector('.header__btn-box'); // ← додано

  // --- Пошук ---
  if (searchBtn && searchForm) {
    searchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchForm.classList.toggle('active');

      if (searchForm.classList.contains('active')) {
        body.classList.add('body-index');
      } else {
        body.classList.remove('body-index');
      }

      updateBodyLock();
    });

    document.addEventListener('click', (e) => {
      if (!searchForm.contains(e.target) && !searchBtn.contains(e.target)) {
        searchForm.classList.remove('active');
        body.classList.remove('body-index');
        updateBodyLock();
      }
    });
  }

  // --- Фільтр ---
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

  // --- Кошик ---
  if (basketBtn && basket) {
    basketBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      basket.classList.add('open');
      updateBodyLock();
    });
  }

  if (closeBtn && basket) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      basket.classList.remove('open');
      updateBodyLock();
    });
  }

  document.addEventListener('click', (e) => {
    if (basket && basketBtn) {
      const isClickInsideBasket = basket.contains(e.target);
      const isClickOnBasketBtn = basketBtn.contains(e.target);
      if (!isClickInsideBasket && !isClickOnBasketBtn) {
        basket.classList.remove('open');
        updateBodyLock();
      }
    }
  });

  // --- Кабінет ---
  function initCabinet() {
    const cabinetBtn = document.querySelector('.header__cabinet');
    const cabinetLeft = document.querySelector('.dss-cabinet__left');
    const cabinetClose = document.querySelector('.dss-cabinet__close');

    if (cabinetBtn) cabinetBtn.replaceWith(cabinetBtn.cloneNode(true));
    if (cabinetClose) cabinetClose.replaceWith(cabinetClose.cloneNode(true));

    const newCabinetBtn = document.querySelector('.header__cabinet');
    const newCabinetClose = document.querySelector('.dss-cabinet__close');

    if (window.innerWidth < 991 && newCabinetBtn && cabinetLeft && newCabinetClose) {
      newCabinetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        cabinetLeft.classList.add('open');
        updateBodyLock();
      });

      newCabinetClose.addEventListener('click', (e) => {
        e.stopPropagation();
        cabinetLeft.classList.remove('open');
        updateBodyLock();
      });

      document.addEventListener('click', (e) => {
        const isClickInsideCabinet = cabinetLeft.contains(e.target);
        const isClickOnCabinetBtn = newCabinetBtn.contains(e.target);
        if (!isClickInsideCabinet && !isClickOnCabinetBtn) {
          cabinetLeft.classList.remove('open');
          updateBodyLock();
        }
      });
    } else {
      if (cabinetLeft) cabinetLeft.classList.remove('open');
      body.classList.remove('lock');
    }
  }

  initCabinet();
  window.addEventListener('resize', initCabinet);

  // --- Меню ---
  if (menuBtn && header && headerBox) {
    menuBtn.addEventListener('click', () => {
      header.classList.toggle('open');
      headerBox.classList.toggle('open');
      updateBodyLock();
    });

    document.querySelectorAll('.header__nav a').forEach(link => {
      link.addEventListener('click', () => {
        header.classList.remove('open');
        headerBox.classList.remove('open');
        updateBodyLock();
      });
    });
  }

  // --- header__btn-box ---
  if (headerBtnBox) {
    headerBtnBox.addEventListener('click', (e) => {
      e.stopPropagation();
      headerBtnBox.classList.toggle('open');
      updateBodyLock();
    });

    document.addEventListener('click', (e) => {
      if (!headerBtnBox.contains(e.target)) {
        headerBtnBox.classList.remove('open');
        updateBodyLock();
      }
    });
  }

  // --- Централізована логіка ---
  function updateBodyLock() {
    const searchActive = searchForm?.classList.contains('active');
    const filterOpen = filterLeft?.classList.contains('open');
    const basketOpen = basket?.classList.contains('open');
    const cabinetOpen = document.querySelector('.dss-cabinet__left')?.classList.contains('open');
    const menuOpen = header?.classList.contains('open') || headerBox?.classList.contains('open');
    const headerBtnBoxOpen = headerBtnBox?.classList.contains('open');

    if (searchActive || filterOpen || basketOpen || cabinetOpen || menuOpen || headerBtnBoxOpen) {
      body.classList.add('lock');
    } else {
      body.classList.remove('lock');
    }
  }
});



// ===== SIZE =====
if (document.querySelectorAll('.dss-filter .dss-size').length) {
  document.querySelectorAll('.dss-filter .dss-size').forEach(el => {
    el.addEventListener('click', () => {
      el.classList.toggle('active');
    });
  });
}

// ===== SHOW PASSWORD =====
const showPassBtn = document.querySelector('.dst-form__show-pass');
if (showPassBtn) {
  showPassBtn.addEventListener('click', function () {
    this.classList.toggle('show');
  });
}



// ===== BRAND SLIDER =====
if (document.querySelector('.dss-brand__slider')) {
  var swiper = new Swiper(".dss-brand__slider", {
    slidesPerView: 4,
    spaceBetween: 10,
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
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 7,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 9,
        spaceBetween: 20,
      },
    },
  });
}

// ===== PRODUCT GALLERY SWIPER =====
if (document.querySelector('.mySwiper') && document.querySelector('.mySwiper2')) {
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
}
//
const thumbsSwiperEl = document.querySelector('.thumbsSwiper');
const mainSwiperEl = document.querySelector('.mainSwiper');

if (thumbsSwiperEl && mainSwiperEl) {
  document.querySelectorAll('.dss-item').forEach(item => {
    const thumbsSwiperEl = item.querySelector('.thumbsSwiper');
    const mainSwiperEl = item.querySelector('.mainSwiper');

    if (thumbsSwiperEl && mainSwiperEl) {
      const thumbsSwiper = new Swiper(thumbsSwiperEl, {
        spaceBetween: 10,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
        slideToClickedSlide: true, // 👈 клік по тумбі перемикає головний слайд
        navigation: {
          nextEl: item.querySelector('.swiper-button-next'),
          prevEl: item.querySelector('.swiper-button-prev'),
        },
      });

      const mainSwiper = new Swiper(mainSwiperEl, {
        spaceBetween: 10,
        thumbs: {
          swiper: thumbsSwiper,
        },
      });
    }
  });
}


// ===== FAVORITE =====
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.dss-item__add-favorite');
  if (btn) {
    btn.classList.toggle('active');
  }
});



// ===== DRAG TO SCROLL =====
if (document.querySelectorAll('.size-wrap__inner').length) {
  const sliders = document.querySelectorAll('.size-wrap__inner');

  sliders.forEach(slider => {
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
      const walk = (x - startX) * 1;
      slider.scrollLeft = scrollLeft - walk;
    });
  });
}

//
const hasChildElements = document.querySelectorAll('.header__has-child');

hasChildElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (window.innerWidth >= 991) {
      document.body.classList.add('lock');
    }
  });

  el.addEventListener('mouseleave', () => {
    if (window.innerWidth >= 991) {
      document.body.classList.remove('lock');
    }
  });
});


//



