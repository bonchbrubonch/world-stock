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
  }

  if ($(".accordeon").length) {
    $(".accordeon dd").hide().prev().click(function () {
      $(this)
        .parents(".accordeon")
        .find("dd")
        .not(this)
        .slideUp()
        .prev()
        .removeClass("active");
      $(this)
        .next()
        .not(":visible")
        .slideDown()
        .prev()
        .addClass("active");
      $("dl").removeClass("open");
      $(this).parent().toggleClass("open");
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



});




document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

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

  const basketBtn = document.querySelector('.header__bascket');
  const basket = document.querySelector('.pst-basket');
  const closeBtn = document.querySelector('.pst-basket__close');

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

  function updateBodyLock() {
    const searchActive = searchForm && searchForm.classList.contains('active');
    const filterOpen = filterLeft && filterLeft.classList.contains('open');
    const basketOpen = basket && basket.classList.contains('open');
    const cabinetOpen = document.querySelector('.dss-cabinet__left')?.classList.contains('open');
    if (searchActive || filterOpen || basketOpen || cabinetOpen) {
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
