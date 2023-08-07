AppName.Modules.ThemeModule = (function() {
  //Dependencies
  var core = AppName.Core;
  var windowSize = $(window).width();
  //////////////////////
  // Private Methods //
  ////////////////////

  var _navbarFunctions = function() {
    //Scroll to Display Div

    // if ($(window).width() >= 768) {
      $('.navbar-nav .js-with-dropdown').on('mouseenter', function(e) {

        // var navItem = $(this).parents('.nav-item');
        var navItemSiblings = $(this).siblings('.nav-item');
          $('.js-with-dropdown').addClass('active');
          navItemSiblings.removeClass('active');

         var getID = $(this).find('.nav-link').data('id');
         $('#' + getID + '.dropdown-category').addClass('opened');
         $('.dropdown-category').not('#' + getID + '').removeClass('opened');

         if ($('.dropdown-category').hasClass('opened')) {
           $('.overlay-on-open').show().addClass('active-light');
         } else {
           $('.overlay-on-open').removeClass('active-light');
         }

           $('.dropdown-menu').fadeOut(300).removeClass('show');
      });
    // }

    $('.category-links .nav-item:not(.js-with-dropdown)').on('mouseenter', function(){
        // var navItem = $(this).parents('.nav-item');
        var navItemSiblings = $(this).siblings('.nav-item');
        $('.dropdown-category').removeClass('opened');
        $('.overlay-on-open').removeClass('active-light');
        $('.category-links .nav-item').addClass('active');
        navItemSiblings.removeClass('active');
        $('.dropdown-menu').fadeOut(300).removeClass('show');
        // $('.user-links .dropdown').removeClass('show');
    });

    $('.category-links .nav-item:not(.js-with-dropdown)').on('mouseleave', function(){
        $('.category-links .nav-item').removeClass('active');
    });

    $('main, .header-toggler-wrapper .btn-toggler, .c-nav-link').unbind('click').click(function(e) {
       $('.dropdown-category').removeClass('opened');
       $('.overlay-on-open').removeClass('active-light');
       $('.nav-item').removeClass('active');
    });
    // $('.js-with-dropdown').on('mouseover', function(e) {
    //   var category = $(this).data('category');
    //   var categoryID = "#" + category;
    //   var navItem = $(this).parents('.nav-item');
    //   var navItemSiblings = navItem.siblings('.nav-item');
    //
    //   navItem.toggleClass('active');
    //   navItemSiblings.removeClass('active');
    //
    //   $('.dropdown-category').each(function() {
    //     if ($(this).attr('id') != category) {
    //       $(this).fadeOut();
    //     }
    //   });
    //
    //
    //   $(categoryID).slideToggle(700);
    //   setTimeout(function() {
    //     if ($(categoryID).is(':visible') == true) {
    //       $('.overlay-on-open').addClass('active-light');
    //     } else {
    //       $('.overlay-on-open').removeClass('active-light');
    //     }
    //   }, 710);
    //
    //   e.preventDefault();
    // });

    $('.user-links .dropdown').on('show.bs.dropdown', function() {
      $(this).find('.dropdown-menu').fadeIn(300).addClass('show');
      $('.overlay-on-open').fadeIn(300).addClass('active-light');
      $('.dropdown-category').removeClass('opened');
      $('.nav-item').removeClass('active');

      if($(this).find('.dropdown-menu').hasClass('show')) {
        $('#dropdownLogIn svg path').addClass('svg-dark');
      }
    });

    $('.js-login-dropdown .dropdown-toggle, .js-language-dropdown .dropdown-toggle, .js-signin-dropdown .dropdown-toggle, .js-sidebar-toggler').on('click', function() {
      $('.dropdown-menu').fadeOut(300).removeClass('show');
      $('.overlay-on-open').fadeOut(300).removeClass('active-light');
    });

    $('main').on('click', function() {
      $('.dropdown-menu').fadeOut(300).removeClass('show');
      $('.nav-item').removeClass('active');
      $('.overlay-on-open').fadeOut(300).removeClass('active-light');
    });

    //On scroll
    $(window).on('scroll', function() {
      if ($(window).scrollTop() > 10) {
        $('.header').addClass('fixed-header');
        $('.js-navbar-brand-img').attr('src', 'assets/images/logo-white.png');
      } else {
        $('.header').removeClass('fixed-header');
        $('.js-navbar-brand-img').attr('src', 'assets/images/logo.png');
      }
    });

    //for sidebar menu
    $('.header-toggler-wrapper .btn-toggler, .js-close-sm').on('click', function() {
      $('.header-toggler-wrapper .btn-toggler').toggleClass('is-active open');
      // $('.overlay-on-open').toggleClass('active-dark');
      $('.header-overlay').toggleClass('active-dark');
      $('html,body').toggleClass('overflow-hidden lock-body');
      $('.header-toggler-wrapper').toggleClass('sidebar-open');
      $('.header-sidebar').toggle('slide', {
        direction: "left"
      }, 500);
    });

    $('.js-sidebar-toggler').unbind('click').click(function(){
      $('.header-sidebar').hide('slide', {
        direction: "left"
      }, 500);
      $('.header-toggler-wrapper .btn-toggler').removeClass('is-active open');
    });

    // for responsive

      if ($(window).width() <= 767) {
        $('.header-sidebar-main-link').addClass('js-category-mobile');
      }

      $('.js-category-mobile').unbind('click').click(function(e) {
        var category = $(this).data('category-mobile');
        var categoryID = "#" + category;
        if ($(window).width() <= 767) {

        console.log(categoryID);

        $('.header-sidebar').toggle('slide', {
          direction: "left"
        }, 400);

        $(categoryID).addClass('opened');

        e.preventDefault();
        }else {
          $('.header-sidebar-main-link').removeClass('js-category-mobile');
          $('.js-category-mobile').removeData('category-mobile');
          $(categoryID).removeClass('opened');
        }
      });

    $('.js-back-menu').unbind('click').click(function() {
      var parent = $(this).parents('.dropdown-category');

      $(parent).toggle('slide', {
        direction: "left"
      }, 400);

      $('.header-sidebar').toggle('slide', {
        direction: "left"
      }, 400);
    });

    if($(window).width() <= 767) {
      $('.on-mobile .dropdown').on('show.bs.dropdown', function() {
        $(this).find('.dropdown-menu').fadeIn(300).addClass('show');
        $('.dropdown-category').removeClass('opened');
        $('.nav-item').removeClass('active');
      });
    }
    if($(window).width() >= 768) {
      $('.on-mobile .dropdown-menu').hide();
      $('.on-mobile .dropdown-menu').removeClass('show');
      // $('.log-in-menu').css('z-index','1');
    }

    $('.header-sidebar').unbind('click').click(function(e){
      if($(e.target).closest('.dropdown-menu').length === 0) {
        $('.dropdown-menu').fadeOut(300).removeClass('show');
      }
    });


    //RESIZE
    $(window).resize(function(){
      if ($(window).width() <= 767) {
        $('.header-sidebar-main-link').addClass('js-category-mobile');
      }

      if($(window).width() >= 768) {
        $('main').trigger('click');
        $('.header-overlay').removeClass('active-dark');
        $('.header-toggler-wrapper .btn-toggler').removeClass('is-active open');
        $('html,body').removeClass('overflow-hidden lock-body');
        $('.header-toggler-wrapper').removeClass('sidebar-open');
        $('.header-sidebar').hide('slide', {
          direction: "left"
        }, 400);
        // $('.header-toggler-wrapper .btn-toggler').toggleClass('is-active open');
      }

      $('.js-category-mobile').unbind('click').click(function(e) {
        var category = $(this).data('category-mobile');
        var categoryID = "#" + category;
        if ($(window).width() <= 767) {

        console.log(categoryID);

        $('.header-sidebar').toggle('slide', {
          direction: "left"
        }, 400);

        $(categoryID).addClass('opened');

        e.preventDefault();
        }else {
          $('.header-sidebar-main-link').removeClass('js-category-mobile');
          $('.js-category-mobile').removeData('category-mobile');
          $(categoryID).removeClass('opened');
          // $('main').trigger('click');
        }
      });

      if($(window).width() >= 768) {
        $('.on-mobile .dropdown-menu').hide();
        $('.on-mobile .dropdown-menu').removeClass('show');
      }

      if($(window).width() >= 768) {
        $('.on-mobile .dropdown-menu').hide();
        $('.on-mobile .dropdown-menu').removeClass('show');
      }
      if($(window).width() <= 767) {
        $('.on-mobile .dropdown').on('show.bs.dropdown', function() {
          $(this).find('.dropdown-menu').fadeIn(300).addClass('show');
          $('.dropdown-category').removeClass('opened');
          $('.nav-item').removeClass('active');
          if(!$(this).find('.dropdown-menu').hasClass('show')) {
            $('.log-in-menu').css('z-index','-1');
          }
        });
      }
    });
  }

  var _sidebar = function() {
    $(window).on('load', function() {
      //open sidebar
      $('.js-sidebar-toggler').on('click', function() {
        var sidebarID = '#' + $(this).data('open');

        if($('body').hasClass('direction-ltr')) {
          $(sidebarID).toggle('slide', {
            direction: "right"
          }, 500);
        } else {
          $(sidebarID).toggle('slide', {
            direction: "left"
          }, 500);
        }

        $(sidebarID).siblings('.sign-in-sidebar').hide();
        $('html,body').addClass('overflow-hidden lock-body');
        // $('.overlay-on-open').addClass('active-dark');
        $('.header-overlay').addClass('active-dark');
        $('.dropdown-category').removeClass('opened');
        $('.overlay-on-open').removeClass('active-light');
        $('.nav-item').removeClass('active');
        $('.log-in-menu').removeClass('show');
      });

      //close sidebar
      $('.sidebar-close').on('click', function() {
        var sidebarID = '#' + $(this).data('close');
        var parent = $(this).parents('.sign-in-sidebar');
        $('html, body').removeClass('overflow-hidden lock-body');
        // $('.overlay-on-open').removeClass('active-dark');
        $('.header-overlay').removeClass('active-dark');

        if($('body').hasClass('direction-ltr')) {
          $(parent).toggle('slide', {
            direction: "right"
          }, 500);
        } else {
          $(parent).toggle('slide', {
            direction: "left"
          }, 500);
        }
      });

      // $('.header-overlay').on('click', function() {
      //   // var sidebarID = '#' + $('.sidebar-close').data('close');
      //   // var parent = $('.sign-in-sidebar');
      //   $('html, body').removeClass('overflow-hidden lock-body');
      //   $('.header-overlay').removeClass('active-dark');
      //   $('.header-toggler-wrapper btn-toggler').removeClass('is-active open');
      //   $('.header-sidebar').hide('slide', {
      //           direction: "left"
      //   }, 500);
      //
      //   if($('body').hasClass('direction-ltr')) {
      //     $('.sign-in-sidebar').hide('slide', {
      //       direction: "right"
      //     }, 500);
      //   } else {
      //     $('.sign-in-sidebar').hide('slide', {
      //       direction: "left"
      //     }, 500);
      //   }
      // });
    });
  }

  var _closeAllTabs = function() {
    $('.header-overlay').click(function() {
        $('.header-toggler-wrapper .btn-toggler').removeClass('is-active open');
        $('.header-overlay').removeClass('active-dark');
        $('html,body').removeClass('overflow-hidden lock-body');
        $('.header-toggler-wrapper').removeClass('sidebar-open');

        $('.header-sidebar').hide('slide', {
          direction: "left"
        }, 500);

        if($('body').hasClass('direction-ltr')) {
          $('#signin-sidebar').hide('slide', {
              direction: "right"
            }, 500);

          $('#cart-sidebar').hide('slide', {
            direction: "right"
          }, 500);

          $('#signup-sidebar').hide('slide', {
            direction: "right"
          }, 500);

          $('#disclaimer-sidebar').hide('slide', {
            direction: "right"
          }, 500);

          $('#thankyou-sidebar').hide('slide', {
            direction: "right"
          }, 500);

          $('#forgotpassword-sidebar').hide('slide', {
            direction: "right"
          }, 500);

          $('#resetpassword-sidebar').hide('slide', {
            direction: "right"
          }, 500);

        } else {
          $('#sign-in-sidebar').hide('slide', {
            direction: "left"
          }, 500);

          $('#cart-sidebar').hide('slide', {
            direction: "left"
          }, 500);

          $('#signup-sidebar').hide('slide', {
            direction: "left"
          }, 500);

          $('#disclaimer-sidebar').hide('slide', {
            direction: "left"
          }, 500);

          $('#thankyou-sidebar').hide('slide', {
            direction: "left"
          }, 500);

          $('#forgotpassword-sidebar').hide('slide', {
            direction: "left"
          }, 500);

          $('#resetpassword-sidebar').hide('slide', {
            direction: "left"
          }, 500);
        }

    });

    var modalBody = $('.modal-body');
    var modalHead = $('.modal-head');
    $(window).on('click', function(event) {
      if(modalBody.is(event.target) || modalHead.is(event.target)) {
        $('#media_modal_video').modal('hide');
        $('#media_modal_image').modal('hide');
      }
    });
  }

  var _swiper = function() {
    $(document).ready(function() {
      if ($('.homepage-banner-slider').length) {
        var homeBannersettings = {
          autoHeight: true,
          spaceBetween: 30,
          effect: 'fade',
          fadeEffect: {
            crossFade: true,
          },
          direction: 'horizontal',
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            progressbarOpposite: true,
            bulletClass: 'homepage-banner-bullet',
            bulletActiveClass: 'homepage-banner-bullet-active',
            renderBullet: function(index, className) {
              return '<span class="' + className + '">' + '<span class="bullet-number">0' + (index + 1) + '</span></span>';
            },
          },
          keyboard: {
            enabled: true,
            onlyInViewport: false,
          },
        };

        var homeBanner = new Swiper('.homepage-banner-slider', homeBannersettings);

        $('.direction-toggler').click(function() {
          setTimeout(function() {
            homeBanner.destroy();
            homeBanner = new Swiper('.homepage-banner-slider', homeBannersettings);
          }, 1000);
        });
      }

      if ($('.section-featured-products .featured-products-slider').length) {
        var windowSize = $(window).width();
        var featuredProductsSlider;

        function featuredSliderSettings() {
          if (windowSize <= 767) {
            featuredProductsSlider = new Swiper('.section-featured-products .featured-products-slider', {
              slidesPerView: 4,
              slidesPerColumn: 2,
              breakpoints: {
                767: {
                  slidesPerView: 2,
                },
              }
            });
          }

          else {
            featuredProductsSlider = new Swiper('.section-featured-products .featured-products-slider', {
              slidesPerView: 4,
              breakpoints: {
                767: {
                  slidesPerView: 2,
                },
              }
            });
          }
        }

        featuredSliderSettings();
      }

      if ($('.youmaylike-slider').length) {
        // var youMayLikeSlider = new Swiper('.youmaylike-slider', {
        //   slidesPerView: '4',
        // })
        var windowSize = $(window).width();
        var youMayLikeSlider;

        function youMayLikeSettings() {
          if (windowSize <= 767) {
            youMayLikeSlider = new Swiper('.youmaylike-slider', {
              slidesPerView: 4,
              slidesPerColumn: 2,
              breakpoints: {
                767: {
                  slidesPerView: 2,
                },
              }
            });
          }

          else {
            youMayLikeSlider = new Swiper('.youmaylike-slider', {
              slidesPerView: 4,
              breakpoints: {
                767: {
                  slidesPerView: 2,
                },
              }
            });
          }
        }

        youMayLikeSettings();
      }

      if ($('.similiar-products-slider').length) {
        // var youMayLikeSlider = new Swiper('.similiar-products-slider', {
        //   slidesPerView: '4',
        // })
        var windowSize = $(window).width();
        var similarProductSlider;

        function similarProductSettings() {
          if (windowSize <= 767) {
            similarProductSlider = new Swiper('.similiar-products-slider', {
              slidesPerView: 4,
              slidesPerColumn: 2,
              breakpoints: {
                767: {
                  slidesPerView: 2,
                },
              }
            });
          }

          else {
            similarProductSlider = new Swiper('.similiar-products-slider', {
              slidesPerView: 4,
              breakpoints: {
                767: {
                  slidesPerView: 2,
                },
              }
            });
          }
        }

        similarProductSettings();
      }

      if ($('.section-product-details .swiper-videos').length) {
        var swiperVideossettings = {
          loop: true,
          keyboard: {
            enabled: true,
          },
          pagination: {
            el: '.section-product-details .swiper-pagination',
            clickable: true,
            renderBullet: function(index, className) {
              return '<span class="' + className + '">' + +0 + (index + 1) + '</span>';
            },
          },
        };

        var swiperVideos = new Swiper('.section-product-details .swiper-container', swiperVideossettings);

        swiperVideos.on('slideChange', function() {
          $('.section-product-details .swiper-slide').each(function() {
            $(this).closest('.swiper-videos').find('.swiper-slide-active').removeClass('hide-button');
          });
        })

        swiperVideos.on('slideChangeTransitionEnd', function() {
          playVideo();
        })

        // $('.direction-toggler').click(function() {
        //   setTimeout(function() {
        //     swiperVideos.destroy();
        //
        //     swiperVideos = new Swiper('.section-learning-details .gallery-thumbs', swiperVideossettings);
        //   }, 1010);
        // });
      }

      if ($('.section-banner-product .gallery-top').length) {
        var galleryTopsettings = {
          slidesPerView: 1,
          keyboard: {
            enabled: true,
          },
          breakpoints: {
            767: {
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
              },
            }
          }
        };

        var galleryThumbssettings = {
          slidesPerView: 'auto',
          slideToClickedSlide: true,
          breakpoints: {
            767: {
              centeredSlides: 'true',
            }
          }
        };

        var galleryTop = new Swiper('.section-banner-product .gallery-top', galleryTopsettings);

        var galleryThumbs = new Swiper('.section-banner-product .gallery-thumbs', galleryThumbssettings);

        $('.section-banner-product .gallery-thumbs .swiper-slide:first-child').addClass('selected');

        galleryTop.on('slideChange', function () {
          galleryThumbs.slideTo(galleryTop.realIndex);
          $('.section-banner-product .gallery-thumbs .swiper-slide.selected').removeClass('selected');
          $('.section-banner-product .gallery-thumbs .swiper-slide').eq(galleryTop.realIndex).addClass('selected');
        });

        $('.section-banner-product .gallery-thumbs .swiper-slide').on('click', function() {
          $('.section-banner-product .gallery-thumbs .swiper-slide.selected').removeClass('selected');
          galleryTop.slideTo($(this).index());
          $(this).addClass('selected');
        });
      }

      if ($('.section-combos-details .gallery-top').length) {
        var galleryTopCombossettings = {
          slidesPerView: 1,
          navigation: {
            nextEl: '.section-combos-details .gallery-btn-next',
            prevEl: '.section-combos-details .gallery-btn-prev',
          },
          keyboard: {
            enabled: true,
          },
        };

        var galleryThumbsCombossettings = {
          slidesPerView: 'auto',
          slideToClickedSlide: true,
          navigation: {
            nextEl: '.section-combos-details .gallery-thumb-btn-next',
            prevEl: '.section-combos-details .gallery-thumb-btn-prev',
          },
          breakpoints: {
            767: {
              centeredSlides: 'true',
            }
          }
        };

        var galleryDescriptionCombossettings = {
          slidesPerView: 1,
          navigation: {
            nextEl: '.section-combos-details .gallery-btn-next',
            prevEl: '.section-combos-details .gallery-btn-prev',
          },
          keyboard: {
            enabled: true,
          },
        };

        var galleryTopCombos = new Swiper('.section-combos-details .gallery-top', galleryTopCombossettings);

        var galleryThumbsCombos = new Swiper('.section-combos-details .gallery-thumbs', galleryThumbsCombossettings);

        var galleryDescriptionCombos = new Swiper('.section-combos-details .gallery-description', galleryDescriptionCombossettings);

        $('.section-combos-details .gallery-thumbs .swiper-slide:first-child').addClass('selected');

        galleryTopCombos.on('slideChange', function () {
          galleryThumbsCombos.slideTo(galleryTopCombos.realIndex);
          $('.section-combos-details .gallery-thumbs .swiper-slide.selected').removeClass('selected');
          $('.section-combos-details .gallery-thumbs .swiper-slide').eq(galleryTopCombos.realIndex).addClass('selected');
        });

        $('.section-combos-details .gallery-thumbs .swiper-slide').on('click', function() {
          $('.section-combos-details .gallery-thumbs .swiper-slide.selected').removeClass('selected');
          galleryTopCombos.slideTo($(this).index());
          $(this).addClass('selected');
        });

        galleryDescriptionCombos.on('slideChange', function () {
          galleryThumbsCombos.slideTo(galleryDescriptionCombos.realIndex);
          $('.section-combos-details .gallery-thumbs .swiper-slide.selected').removeClass('selected');
          $('.section-combos-details .gallery-thumbs .swiper-slide').eq(galleryDescriptionCombos.realIndex).addClass('selected');
        });

        $('.section-combos-details .gallery-thumbs .swiper-slide').on('click', function() {
          $('.section-combos-details .gallery-thumbs .swiper-slide.selected').removeClass('selected');
          galleryDescriptionCombos.slideTo($(this).index());
          $(this).addClass('selected');
        });
      }

      if ($('.section-banner-product').length) {
        var quickviewsettings = {
          slidesPerView: 1,
          observer: true,
          observeParents: true,
          keyboard: {
            enabled: true,
          },
          breakpoints: {
            767: {
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
              },
            }
          }
        };

        var quickviewThumbssettings = {
          slidesPerView: 'auto',
          slideToClickedSlide: true,
          observer: true,
          observeParents: true,
          breakpoints: {
            767: {
              centeredSlides: 'true',
            }
          }
        };

        var quickview = new Swiper('.swiper-quickview', quickviewsettings);

        var quickviewThumbs = new Swiper('.swiper-quickview-thumbs', quickviewThumbssettings);

        $('.section-banner-product .swiper-quickview-thumbs .swiper-slide:first-child').addClass('selected');

        quickview.on('slideChange', function () {
          quickviewThumbs.slideTo(quickview.realIndex);
          $('.section-banner-product .swiper-quickview-thumbs .swiper-slide.selected').removeClass('selected');
          $('.section-banner-product .swiper-quickview-thumbs .swiper-slide').eq(quickview.realIndex).addClass('selected');
        });

        $('.section-banner-product .swiper-quickview-thumbs .swiper-slide').on('click', function() {
          $('.section-banner-product .swiper-quickview-thumbs .swiper-slide.selected').removeClass('selected');
          quickview.slideTo($(this).index());
          $(this).addClass('selected');
        });
      }

      if ($('.section-learning-details .gallery-top').length) {
        var galleryTop2settings = {
          slidesPerView: 1,
          observeParents: true,
          observer: true,
          keyboard: {
            enabled: true,
          },
          breakpoints: {
            767: {
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
              },
            }
          }
        };

        var galleryThumbs2settings = {
          slidesPerView: 'auto',
          slideToClickedSlide: true,
          breakpoints: {
            767: {
              centeredSlides: 'true',
            }
          }
        };

        var galleryTop2 = new Swiper('.section-learning-details .gallery-top', galleryTop2settings);

        var galleryThumbs2 = new Swiper('.section-learning-details .gallery-thumbs', galleryThumbs2settings);

        $('.section-learning-details .gallery-thumbs .swiper-slide:first-child').addClass('selected');

        galleryTop2.on('slideChange', function () {
          galleryThumbs2.slideTo(galleryTop2.realIndex);
          $('.section-learning-details .gallery-thumbs .swiper-slide.selected').removeClass('selected');
          $('.section-learning-details .gallery-thumbs .swiper-slide').eq(galleryTop2.realIndex).addClass('selected');
        });

        $('.section-learning-details .gallery-thumbs .swiper-slide').on('click', function() {
          $('.section-learning-details .gallery-thumbs .swiper-slide.selected').removeClass('selected');
          galleryTop2.slideTo($(this).index());
          $(this).addClass('selected');
        });

        $('.direction-toggler').click(function() {
          setTimeout(function() {
            galleryTop2.destroy();
            galleryThumbs2.destroy();
            galleryTop2 = new Swiper('.section-learning-details .gallery-top', galleryTop2settings);
            galleryThumbs2 = new Swiper('.section-learning-details .gallery-thumbs', galleryThumbs2settings);
          }, 1000);
        });
      }
    });

    $(window).load(function() {
      if ($('.similiar-products-slider').length) {
        setTimeout(function() {
          $('.similiar-products-slider').parent().removeClass('active show opacity-0');
        }, 100);
      }

      // if ($('.section-product-details .swiper-holder iframe').length) {
      //   $('.section-product-details .swiper-slide').each(function() {
      //     var findAttrSrc = $(this).find('iframe').attr('src');
      //     newAttrSrc = findAttrSrc + '?rel=0&amp;fs=0&amp;showinfo=0&controls=0';
      //     $(this).find('iframe').attr('src', newAttrSrc);
      //   })
      // }
    })
  }

  var _playProductSwiperVideo =  function () {
    $(document).on('click', '.swiper-pagination-bullet', function(e) {
      playVideo();
    })

    $(document).on('ready', function() {
      var tagContainer = $('.section-product-details').find('.swiper-slide-active').children();
      if(tagContainer.length) {
        tagContainer[0].src += "&mute=1&autoplay=1";
      }
    })
  }

  function playVideo() {
    var tagContainer = $('.section-product-details').find('.swiper-slide-active').children();

    if(tagContainer[0].tagName === 'IFRAME') {
      tagContainer[0].src += "&mute=1&autoplay=1";
    }
  }

  var _mediaModalSwiper = function() {
    // Set initial active slide
    var selectedSlide = 0;

    // Assign selected slide to active slide
    $('.js-media-wrap').on('click', function(e) {
      var slideNumber = $(this).data('slide-number');
      selectedSlide = slideNumber;
    });

    // When modal is shown, assign active slide to Swiper
    $('#media_modal_image').on('shown.bs.modal', function(e) {
      if ( $('.js-media-swiper'.length) ) {
        var galleryTop = new Swiper('.gallery-top-image', {
          initialSlide: selectedSlide,
          spaceBetween: 10,
          navigation: {
            nextEl: '.gallery-next',
            prevEl: '.gallery-prev',
          },
          keyboard: {
            enabled: true,
          },
        });

        var galleryThumbs = new Swiper('.gallery-thumbs', {
          spaceBetween: 5,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true,
          breakpoints: {
            767: {
              centeredSlides: 'true',
            }
          },
        });

        $('.gallery-thumbs .swiper-slide').each(function() {
          $(this).removeClass('selected');
        });
        $('.gallery-thumbs .swiper-slide').eq(selectedSlide).addClass('selected');

        galleryTop.on('slideChange', function () {
          galleryThumbs.slideTo(galleryTop.realIndex);
          $('.gallery-thumbs .swiper-slide.selected').removeClass('selected');
          $('.gallery-thumbs .swiper-slide').eq(galleryTop.realIndex).addClass('selected');
        });

       $('.gallery-thumbs .swiper-slide').on('click', function() {
          $('.gallery-thumbs .swiper-slide.selected').removeClass('selected');
          galleryTop.slideTo($(this).index());
          $(this).addClass('selected');
       });

      }
    });

    $('#media_modal_video').on('shown.bs.modal', function(e) {
      if ( $('.js-media-swiper'.length) ) {
        var gallery = new Swiper('.gallery-top-video', {
          initialSlide: selectedSlide,
          spaceBetween: 10,
          navigation: {
            nextEl: '.gallery-next',
            prevEl: '.gallery-prev',
          },
          keyboard: {
            enabled: true,
          },
        });
      }
    });
  }

  var _scroller = function() {

    $('.js-scroller').on('click', function() {
      $('html,body').animate({
          scrollTop: $('#featured-products').offset().top
        },
        'slow');
    });

    if($('.js-scroller').length){
      $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(e) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

         if($(window).scrollTop()){
           if (target.length) {
             e.preventDefault();
             $('html, body').animate({
             scrollTop: target.offset().top - 70  }, "slow");
             return false;
           }
         } else{
           if (target.length) {
             e.preventDefault();
             $('html, body').animate({
             scrollTop: target.offset().top - 180  }, "slow");
             return false;
           }
         }
        }
      });
    };
  }

  var _modalFunctions = function() {
    $('.js-newsletter-form').on('submit', function(e) {
      $('.newsletter-modal .form-content').fadeOut(700);
      $('.newsletter-modal .thankyou-content').delay(700).fadeIn(1000);

      e.preventDefault();
    });

    $(window).load(function () {
      if ($('.wrap-gift-modal').length) {
        $('.button-wrap').click(function (e) {
          e.preventDefault();
          $(this).closest('.wrap-gift-modal').modal('hide');
        })
      }
    })
  }

  var _filter = function() {
    $('.product-listing-checkbox').click(function() {
      var valueSelected = $(this).attr('value');
      if ($(this).is(':checked')) {
        $('.category-selection').append('<li class="category-selected mb-2" data-text="' + valueSelected + '"><span class="btn-close"><i class="fas fa-times"></i></span> CATEGORY: ' + valueSelected + '</li>');
      } else {
        $('.category-selection .category-selected').each(function(i, item) {
          var itemValue = $(item).data('text');
          if (valueSelected === itemValue) {
            $(item).remove();
          }
        });
      }
    });

    $('.skin-type-checkbox').click(function() {
      var valueSelected = $(this).attr('value');
      if ($(this).is(':checked')) {
        $('.skin-type-selection').append('<li class="skin-type-selected mb-2" data-text="' + valueSelected + '"><span class="btn-close"><i class="fas fa-times"></i></span> SKIN TYPE: ' + valueSelected + '</li>');
      } else {
        $('.skin-type-selection .skin-type-selected').each(function(i, item) {
          var itemValue = $(item).data('text');
          if (valueSelected === itemValue) {
            $(item).remove();
          }
        });
      }
    });

    $('.age-range-checkbox').click(function() {
      var valueSelected = $(this).attr('value');
      if ($(this).is(':checked')) {
        $('.age-range-selection').append('<li class="age-range-selected mb-2" data-text="' + valueSelected + '"><span class="btn-close"><i class="fas fa-times"></i></span> AGE RANGE: ' + valueSelected + '</li>');
      } else {
        $('.age-range-selection .age-range-selected').each(function(i, item) {
          var itemValue = $(item).data('text');
          if (valueSelected === itemValue) {
            $(item).remove();
          }
        });
      }
    });

    $(document).on('click', '.skin-type-selection .skin-type-selected .btn-close', function() {
      $(this).closest('.skin-type-selected').remove();
      var sectionCategoryText = $(this).closest('.skin-type-selected').data('text');
      $('.skin-type-checkbox').each(function(i, item) {
        var itemValue = $(item).attr('value');
        if (sectionCategoryText === itemValue) {
          $(item).prop('checked', false);
        }
      });
    })

    $(document).on('click', '.category-selection .category-selected .btn-close', function() {
      $(this).closest('.category-selected').remove();
      var sectionCategoryText = $(this).closest('.category-selected').data('text');
      $('.product-listing-checkbox').each(function(i, item) {
        var itemValue = $(item).attr('value');
        if (sectionCategoryText === itemValue) {
          $(item).prop('checked', false);
        }
      });
    })

    $(document).on('click', '.age-range-selection .age-range-selected .btn-close', function() {
      $(this).closest('.age-range-selected').remove();
      var sectionCategoryText = $(this).closest('.age-range-selected').data('text');
      $('.age-range-checkbox').each(function(i, item) {
        var itemValue = $(item).attr('value');
        if (sectionCategoryText === itemValue) {
          $(item).prop('checked', false);
        }
      });
    })

    //filter - Mobile
    if ($(window).width() < 768) {
      $('.btn-filter').click(function() {
        $('.filter-options').toggle('slow', function() {
          $('body').css('overflow', 'hidden');
        });

        // $('.section-selection').css('display','block');
      })

      $('.filter-close-btn').click(function() {
        $('.filter-options').toggle('slow', function() {
          $('body').css('overflow', 'auto');
        });

      })
    }
  }

  var _specialoffer = function() {
    if ($(window).width() < 992) {
      // $('.col-special-offer').appendTo('.product-holder > .row');
      $('.col-special-offer').insertBefore('.col-product:last-child');
    }
    if ($(window).width() < 768) {
      // $('.col-special-offer').appendTo('.product-holder > .row');
      $('.col-special-offer').insertBefore('.col-product:nth-last-child(3)');
    }
  }

  var _productDetails = function() {
    function smoothScrollDesktop() {
      $('.smooth-scroll:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          $('html, body').animate({
            scrollTop: target.offset().top -200
          }, 1000);
        }
      });
    }

    function smoothScrollTablet() {
      $('.smooth-scroll:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          $('html, body').animate({
            scrollTop: target.offset().top -130
          }, 1000);
        }
      });
    }

    function smoothScrollMobile() {
      $('.smooth-scroll:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          $('html, body').animate({
            scrollTop: target.offset().top - 65
          }, 1000);
        }
      });
    }

    $(window).load(function() {
      if ($('.quantity').length) {
        $('body').on('click', '.quantity-opt', function() {
          var getVal = $(this).siblings('.quantity-value').val();
          if ($(this).hasClass('quantity-add')) {
            getVal++;
            $(this).siblings('.quantity-value').attr('value', getVal);
          } else {
            if (getVal > 1) {
              getVal--;
              $(this).siblings('.quantity-value').attr('value', getVal);
            }
          }
        });
      }

      if ($('.details-holder').length) {
        $('.trigger-close').click(function() {
          $(this).fadeOut();
          $('.details-holder').parent().fadeOut();
        })
      }

      if ($('.review .rate-now').length) {
        $('.review .rate-now').click(function(e) {
          e.preventDefault();
          $(this).addClass('active').closest('.item').find('.form-holder').fadeIn();
        })
      }

      if ($('.smooth-scroll').length) {
        if ($(window).width() >= 992) {
          smoothScrollDesktop();
      	}

        if (($(window).width() >= 768) && ($(window).width() <= 991)) {
          smoothScrollTablet();
      	}

        if ($(window).width() <= 767) {
          smoothScrollMobile();
      	}
      }

      if ($('.section-banner-product .social-share').length) {
        $(this).click(function(e) {
          e.preventDefault();
        });
      }

      if ($('.form-holder .close-popup').length) {
        $('.form-holder .close-popup').click(function() {
          $(this).closest('.item').find('.rate-now').removeClass('active');
          $(this).closest('.form-holder').fadeOut();
          // $(this).closest('.form-holder').find('.rating-input').attr('checked', false);
          $(this).closest('.form-holder').find('.rating-input').removeAttr('checked');
          $(this).closest('.form-holder').find('.review-ratings-holder').addClass('disable-review');
          $(this).closest('.form-holder').find('.leaf').attr('src', 'assets/images/icon-leaf-light.png');
        })
      }

      if ($('.form-holder .btn-dark-blue').length) {
        $('.form-holder form').submit(function (e) {
          if ($('.form-holder .review-ratings-holder').hasClass('disable-review')) {
            e.preventDefault();
            $('.form-holder .rating-error-message').fadeIn();

            setTimeout( function () {
              $('.form-holder .rating-error-message').fadeOut();
            }, 3000);
          }

          else {
            e.preventDefault();
            $('.form-holder .review-ratings-holder').addClass('disable-review');
            $('.form-holder label .rating-input').removeAttr('checked');
            $(this).closest('.form-holder').find('.leaf').attr('src', 'assets/images/icon-leaf-light.png');
            $(this).closest('.form-holder').fadeOut('fast');
            $(this).closest('.item').find('.message-holder').fadeIn('slow');

            setTimeout( function (e) {
              $('.form-holder form').closest('.item').find('.rate-now').removeClass('active');
              $('.form-holder form').closest('.item').find('.message-holder').fadeOut();
              $(this).submit();
            }, 4000);
          }
        })
      }

      if ($('.form-holder .review-ratings-holder').length) {
        $('.form-holder .review-ratings-holder label').on('click', function() {
          // var classRating = $(this).attr('class');
          // $(this).closest('.review-ratings-holder').removeClass('one two three four five');
          // $(this).closest('.review-ratings-holder').addClass(classRating).removeClass('rating-count');
          // console.log(classRating);

          var getVal = $(this).find('input').val();

          $(this).parent().removeClass('disable-review');
          $('.review-ratings-holder .leaf').attr('src', 'assets/images/icon-leaf-light.png');

          for (x=0; x<getVal; x++) {
            $(this).closest('.review-ratings-holder').find('label').eq(x).find('img').attr('src', 'assets/images/icon-leaf-dark.png');
          }
        });
      }

      // if ($('.section-product-details .swiper-holder iframe').length) {
      //   $('.section-product-details .swiper-slide').each(function() {
      //     $(this).click(function () {
      //       $(this).addClass('hide-button temporary-overlay');
      //       setTimeout(function() {
      //         $('.temporary-overlay').removeClass('temporary-overlay');
      //       }, 1500);
      //       $(this).closest('.swiper-videos').find('.swiper-slide-active').find('iframe').attr('src', $('.swiper-slide-active iframe').attr('src') + '&autoplay=1');
      //     })
      //   });
      // }
    });
  }

  var _sectionReviews = function() {
    $(window).load(function() {
      if ($('.section-reviews .write-review').length) {
        $('.section-reviews .write-review').click(function(e) {
          e.preventDefault();
          $(this).addClass('triggered');
          // clear textarea
          $(this).closest('.section-reviews').find('.review-message').val('');
          $(this).closest('.section-reviews').find('.add-review').fadeIn();
        });
      }

      if ($('.section-reviews .submit-review').length) {
        $('.review-message').change(function () {
          if (!$.trim($(".review-message").val())) {
            // textarea is empty or contains only white-space
            $('.submit-review').click(function(e) {
              e.preventDefault();
            });
          }

          else {
            $('.add-review').submit( function(e) {
              e.preventDefault();
              $(this).fadeOut('slow');
              $(this).closest('.section-reviews').find('.write-review').removeClass('triggered');

              setTimeout( function () {
                $(this).submit();
              }, 1000);
            });
          }
       });
      }

      if ($('.section-reviews .cancel-review').length) {
        $('.section-reviews .cancel-review').click(function(e) {
          e.preventDefault();
          $(this).closest('.section-reviews').find('.review-ratings-holder').addClass('disable-review');
          $(this).closest('.section-reviews').find('.add-review').fadeOut();
          $(this).closest('.section-reviews').find('.write-review').removeClass('triggered');
          $(this).closest('.section-reviews').find('.rating-input').attr('checked', false);
          $(this).closest('.section-reviews').find('.leaf').attr('src', 'assets/images/icon-leaf-light.png');
        });
      }

      if ($('.section-reviews .review-ratings-holder').length) {
        $('.section-reviews .review-ratings-holder label').on('click', function() {
          // var classRating = $(this).attr('class');
          // $(this).closest('.review-ratings-holder').removeClass('one two three four five');
          // $(this).closest('.review-ratings-holder').addClass(classRating).removeClass('rating-count');
          // console.log(classRating);

          var getVal = $(this).find('input').val();

          $(this).parent().removeClass('disable-review');
          $('.section-reviews .review-ratings-holder .leaf').attr('src', 'assets/images/icon-leaf-light.png');

          for (x=0; x<getVal; x++) {
            $(this).closest('.review-ratings-holder').find('label').eq(x).find('img').attr('src', 'assets/images/icon-leaf-dark.png');
          }
        });

        $('.submit-review').click(function (e) {
          if ($('.section-reviews .review-ratings-holder').hasClass('disable-review')) {
            e.preventDefault();
            console.log('has disable-review');
            $('.section-reviews .rating-error-message').fadeIn();

            setTimeout( function () {
              $('.section-reviews .rating-error-message').fadeOut();
            }, 3000);
          }

          else {
            $('.section-reviews .review-ratings-holder').addClass('disable-review');
            // $('.section-reviews label .rating-input').removeAttr('checked');
            $(this).closest('.section-reviews').find('.leaf').attr('src', 'assets/images/icon-leaf-light.png');
          }
        })
      }
    });
  }

  var _toggler = function() {
    $('.direction-toggler').click(function(){
      $('body').addClass('overlay');
      setTimeout(function() {
        $('body').toggleClass('direction-rtl direction-ltr');
        $('body').removeClass('overlay');
      }, 1000);

      if($('.swiper-container, .swiper-container-horizontal').length) {
        setTimeout(function() {
          if($('body').hasClass('direction-ltr')) {
            $('.swiper-container, .swiper-container-horizontal').attr('dir', 'ltr');
          } else {
            $('.swiper-container, .swiper-container-horizontal').attr('dir', 'rtl');
          }
        }, 1000);
      }
    });
  }

  var _formFunctions = function() {
    $('form#contactUsForm').on('submit', function(e) {
      $('.left .col-wrapper').fadeOut(300);
      $('.left .thankyou-wrapper').fadeIn(500);
      e.preventDefault();
    });

    if($('.my-account').length) {
      $(window).on('load', function() {
        $.extend($.validator.messages, {
          required: "",
          equalTo: "Passwords do not match"
        });

        $('#change-password-form').validate({
          rules: {
            confirmpassword: {
              required: true,
              equalTo: "#password-change"
            }
          }
        });

        $('#change-password-form').on('submit', function(e) {
          if($(this).valid()) {
            $('.change-password-col .form-wrapper').fadeOut(200);
            $('.change-password-col .thankyou-wrapper').fadeIn(400);

            e.preventDefault();
          }
        });
      });
    }
  }

  var _scrollLock = function() {
    $('.newsletter-modal .modal-content').scrollLock();
    $('.header-sidebar').scrollLock();
    $('.sign-in-sidebar').scrollLock();
    $('.js-face-category').scrollLock();
  }

  var _forPreview = function() {
    $(window).on('load', function() {

      if($('.04_home_newsletter').length) {
        $('#newsletter').modal('show');
      }

      if($('.05_home_newsletter_thank_you').length) {
        $('#newsletter').modal('show');
        $('#newsletter .form-content').hide();
        $('#newsletter .thankyou-content').show();
      }

      if($('.06_home_rollover_media').length) {
        $('html,body').animate({
            scrollTop: $('.section-discover').offset().top
          },
          'slow');
      }

      if($('.07_home_rollover_category, .08_home_rollover_category').length) {
        $('#facedropdown').trigger('click');
      }

      if($('.09_home_rollover_whatsapp_icon').length) {
        $('html,body').animate({
            scrollTop: $('.section-socials').offset().top
          },
          'slow');
      }

      if($('.10_my_account').length) {
        $('#dropdownLogIn').trigger('click');
      }

      if($('.11_sign_in').length) {
        $('.signin-toggler').trigger('click');
      }

      if($('.12_sign_up').length) {
        $('.signup-toggler').trigger('click');
      }

      if($('.13_disclaimer').length) {
        $('.disclaimer-toggler').trigger('click');
      }

      if($('.15_home_signed_in').length) {
        $('#dropdownSignIn').trigger('click');
      }

      if($('.16_forgot_password').length) {
        $('.forgotpassword-toggler').trigger('click');
      }

      if($('.17_thank_you').length) {
        $('.thankyou-toggler').trigger('click');
      }

      if($('.18_reset_password').length) {
        $('.resetpassword-toggler').trigger('click');
      }

      if($('.19_my_cart').length) {
        $('.cart-sidebar-toggler').trigger('click');
      }

      if($('.20_home_scroll').length) {
        $('html,body').animate({
            scrollTop: $('.section-information').offset().top
          },
          'slow');
      }

      if($('.21_home_menu').length) {
        $('.header-toggler-wrapper .hamburger--collapse.btn-toggler').trigger('click');
      }

      if($('.25_product_listing_quickview, .product-listing').length) {
        $('#quickpreview').modal('show');
      }

      if($('.32_gift_wrap_pop_up').length) {
        $('.wrap-gift-modal').modal('show');
      }

      if($('.41_shipping_and_payment').length) {
        $('#new-address').modal('show');
      }

      if($('.45_my_account_password').length) {
        $('#change-password-form input[name="password"]').val('try');
        $('#change-password-form input[name="confirmpassword"]').val('try2');
        $('#change-password-form .btn-account').trigger('click');
      }

      if($('.46_my_account_thank_you').length) {
        $('#change-password-form input[name="password"]').val('try');
        $('#change-password-form input[name="confirmpassword"]').val('try');
        $('#change-password-form .btn-account').trigger('click');
      }

      if($('.47_my_account_my_orders').length) {
        $('a[href="#my_orders"]').trigger('click');
      }

      if($('.48_my_account_my_orders').length) {
        $('a[href="#my_address_book"]').trigger('click');
      }
    });
  }

  var _globalFunction = function() {
    $('head link[href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"]').insertAfter('head link[href="stylesheets/main.min.css"]');

    $('footer .whatsapp-wrapper').on('click', function() {
      $('.whatsapp-number-mobile').slideToggle();
    });
  }

  // var _tabToSelect = function() {
  //   var $tabButtonItem = $('.js-tab-button li'),
  //       $tabSelect = $('.js-tab-select'),
  //       $tabContents = $('.js-tab-content'),
  //       activeClass = 'is-active';
  //
  //   $tabButtonItem.first().addClass(activeClass);
  //   $tabContents.not(':first').hide();
  //
  //   $tabButtonItem.find('a').on('click', function(e) {
  //     var target = $(this).attr('href');
  //
  //     $tabButtonItem.removeClass(activeClass);
  //     $tabButtonItem.find('.nav-link').removeClass(activeClass);
  //     $(this).parent().addClass(activeClass);
  //
  //     $tabSelect.val(target);
  //     $tabContents.hide();
  //     $(target).show();
  //     e.preventDefault();
  //   });
  //
  //   $tabSelect.on('change', function() {
  //     var target = $(this).val(),
  //         targetSelectNum = $(this).prop('selectedIndex');
  //
  //     $tabButtonItem.removeClass(activeClass);
  //     $tabButtonItem.find('.nav-link').removeClass('active');
  //
  //     $tabButtonItem.eq(targetSelectNum).addClass(activeClass);
  //     $tabButtonItem.eq(targetSelectNum).find('.nav-link').addClass('active');
  //     $tabContents.hide().css('opacity', '');
  //     $tabContents.removeClass('show');
  //     $(target).show().css('opacity', '1').addClass('show');
  //   });
  // }

  var _tabToSelect = function() {
    $('.js-tab-button .nav-link').on('show.bs.tab', function(e){
      $(this).parents('.js-tab-button').next().find('.js-tab-select').val(e.target.hash);
    });

    $('.js-tab-select').on('change', function(){
      var targetIndex = $(this).val();

      $('.js-tab-button .nav-link').each(function(){
        if ( $(this).attr('href') == targetIndex ) {
          $(this).tab('show');
        }
      });
    });
  }

  var _myAccountFunction = function() {
    $('.make-as-default').on('click', function(e) {
      $(this).parents('.address-item').addClass('active').siblings('.address-item').removeClass('active');

      e.preventDefault();
    });
  }

  var _selectcountry = function() {
    $(function () {
      if($("#shippingcountry").length) {
        $('#shipping-select-label').hide();
        $('#shippingcountry').change(function () {
             $('#shipping-select-label').hide();
             if (this.options[this.selectedIndex].value) {
                 $('#shipping-select-label').show();
                 $('#shippingcountry').css('padding','13px 10px 0');
                 $('#shippingcountry').css('color','#000');
                 $(".cod").attr("disabled", true);
                 $('.cod-label').addClass('disable');
             }
             if (this.options[this.selectedIndex].value == 'lebanon') {
                 $(".cod").removeAttr("disabled");
                 $('.cod-label').removeClass('disable');
             }
             if (this.options[this.selectedIndex].value == 'country') {
                 $('#shipping-select-label').hide();
                  $('#shippingcountry').css('padding','16px 10px');
                  $('#shippingcountry').css('color','#767676');
                 $('.cod-label').addClass('disable');
                 $(".cod").attr("disabled", true);
             }
         });
      }

      if($("#billingcountry").length) {
        $('#billing-select-label').hide();
         $('#billingcountry').change(function () {
              $('#billing-select-label').hide();
              if (this.options[this.selectedIndex].value) {
                  $('#billing-select-label').show();
                  $('#billingcountry').css('padding','13px 10px 0');
                  $('#billingcountry').css('color','#000');
                  $(".cod").attr("disabled", true);
                  $('.cod-label').addClass('disable');
              }
              if (this.options[this.selectedIndex].value == 'lebanon') {
                  $(".cod").removeAttr("disabled");
                  $('.cod-label').removeClass('disable');
              }
              if (this.options[this.selectedIndex].value == 'country') {
                  $('#billing-select-label').hide();
                  $('#billingcountry').css('padding','16px 10px');
                  $('#billingcountry').css('color','#767676');
                  $('.cod-label').addClass('disable');
                  $(".cod").attr("disabled", true);
              }
          });
        }
     });
  }


  /////////////////////
  // Public Methods //
  ///////////////////
  var init = function() {
    _navbarFunctions();
    _sidebar();
    _closeAllTabs();
    _swiper();
    _playProductSwiperVideo();
    _mediaModalSwiper();
    _scroller();
    _modalFunctions();
    _filter();
    _specialoffer();
    _productDetails();
    _toggler();
    _formFunctions();
    _forPreview();
    _sectionReviews();
    _scrollLock();
    _globalFunction();
    _tabToSelect();
    _myAccountFunction();
    _selectcountry();
  };

  $(window).load(function(){
    // _navbarFunctions();
  });

  return {
    init: init
  };
})();
