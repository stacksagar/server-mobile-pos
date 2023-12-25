(function ($) {
  "use strict";
  $.fn.sliderResponsive = function (settings) {
    var set = $.extend(
      {
        slidePause: 5000,
        fadeSpeed: 800,
        autoPlay: "on",
        showArrows: "off",
        hideDots: "off",
        hoverZoom: "on",
        titleBarTop: "off",
      },
      settings
    );

    var $slider = $(this);
    var size = $slider.find("> div").length; //number of slides
    var position = 0; // current position of carousal
    var sliderIntervalID; // used to clear autoplay

    // Add a Dot for each slide
    $slider.append("<ul></ul>");
    $slider.find("> div").each(function () {
      $slider.find("> ul").append("<li></li>");
    });

    // Put .show on the first Slide
    $slider.find("div:first-of-type").addClass("show");

    // Put .showLi on the first dot
    $slider.find("li:first-of-type").addClass("showli");

    //fadeout all items except .show
    $slider.find("> div").not(".show").fadeOut();

    // If Autoplay is set to 'on' than start it
    if (set.autoPlay === "on") {
      startSlider();
    }

    // If showarrows is set to 'on' then don't hide them
    if (set.showArrows === "on") {
      $slider.addClass("showArrows");
    }

    // If hideDots is set to 'on' then hide them
    if (set.hideDots === "on") {
      $slider.addClass("hideDots");
    }

    // If hoverZoom is set to 'off' then stop it
    if (set.hoverZoom === "off") {
      $slider.addClass("hoverZoomOff");
    }

    // If titleBarTop is set to 'on' then move it up
    if (set.titleBarTop === "on") {
      $slider.addClass("titleBarTop");
    }

    // function to start auto play
    function startSlider() {
      sliderIntervalID = setInterval(function () {
        nextSlide();
      }, set.slidePause);
    }

    // on mouseover stop the autoplay and clear interval
    $slider.mouseover(function () {
      clearInterval(sliderIntervalID);
    });

    // on mouseout starts the autoplay by calling startSlider
    $slider.mouseout(function () {
      startSlider();
    });

    //on right arrow click
    $slider.find("> .right").click(nextSlide);

    //on left arrow click
    $slider.find("> .left").click(prevSlide);

    // Go to next slide
    function nextSlide() {
      position = $slider.find(".show").index() + 1;
      if (position > size - 1) position = 0;
      changeCarousel(position);
    }

    // Go to previous slide
    function prevSlide() {
      position = $slider.find(".show").index() - 1;
      if (position < 0) position = size - 1;
      changeCarousel(position);
    }

    //when user clicks slider button
    $slider.find(" > ul > li").click(function () {
      position = $(this).index();
      changeCarousel($(this).index());
    });

    //this changes the image and button selection
    function changeCarousel() {
      $slider.find(".show").removeClass("show").fadeOut();
      $slider.find("> div").eq(position).fadeIn(set.fadeSpeed).addClass("show");
      // The Dots
      $slider.find("> ul").find(".showli").removeClass("showli");
      $slider.find("> ul > li").eq(position).addClass("showli");
    }

    return $slider;
  };
})(jQuery);

//////////////////////////////////////////////
// Activate each slider - change options
//////////////////////////////////////////////
$(document).ready(function () {
  $("#slider1").sliderResponsive({
    // Using default everything
    // slidePause: 5000,
    // fadeSpeed: 800,
    // autoPlay: "on",
    // showArrows: "off",
    // hideDots: "off",
    // hoverZoom: "on",
    // titleBarTop: "off"
  });

  $("#slider2").sliderResponsive({
    fadeSpeed: 300,
    autoPlay: "off",
    showArrows: "on",
    hideDots: "on",
  });

  $("#slider3").sliderResponsive({
    hoverZoom: "off",
    hideDots: "on",
  });
});

// Gallery Fancyboxes images
// Fancybox Configuration
$('[data-fancybox="gallery"]').fancybox({
  buttons: ["slideShow", "thumbs", "zoom", "fullScreen", "share", "close"],
  loop: false,
  protect: true,
});

// Product Images
var currentImage;
var thumbnails, thumbnailButtons;

window.addEventListener("DOMContentLoaded", function (e) {
  currentImage = document.querySelector(".current-image");

  /**
    When Slick is initialized, grab the DOM nodes for the thumbnails and watch for user interactions.
  */
  $(".thumbnails").on("init", function (e, slick) {
    thumbnailButtons = document.querySelectorAll(
      ".thumbnails .thumbnail .thumbnail-button"
    );

    // Update the large image each time a thumbnail is activated
    thumbnailButtons.forEach(function (thumbnailButton) {
      thumbnailButton.addEventListener("click", function (e) {
        activateThumbnail(thumbnailButton);
      });
    });
  });

  /**
    Initialize Slick Slider with recommended configuration options
  */
  $(".thumbnails").slick({
    slidesToShow: 3,
    prevArrow:
      '<button class="previous-button button">' +
      '  <span class="fas fa-angle-left" aria-hidden="true"></span>' +
      '  <span class="sr-only">Previous slide</span>' +
      "</button>",
    nextArrow:
      '<button class="next-button button">' +
      '  <span class="fas fa-angle-right" aria-hidden="true"></span>' +
      '  <span class="sr-only">Next slide</span>' +
      "</button>",
    infinite: false,
    responsive: [
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  /**
    Update the large current image when a thumbnail button is activated.
  */
  function activateThumbnail(thumbnailButton) {
    // Swap the current image based to match the thumbnail
    // - If you'd like to use separate images, like higher-res versions, consider using the index to pick an appropriate src string from an array, or storing the URI of the higher-res image in a custom data attribute on the thumbnail.
    var newImageSrc = thumbnailButton.querySelector("img").getAttribute("src");
    var newImageAlt = thumbnailButton
      .querySelector("img")
      .getAttribute("data-full-alt");
    currentImage.querySelector("img").setAttribute("src", newImageSrc);
    currentImage.querySelector("img").setAttribute("alt", newImageAlt);

    // Remove aria-current from any previously-activated thumbnail
    thumbnailButtons.forEach(function (button) {
      button.removeAttribute("aria-current");
    });

    // Indicate to screen readers which thumbnail is selected using aria-current
    thumbnailButton.setAttribute("aria-current", true);
  }
});

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}
