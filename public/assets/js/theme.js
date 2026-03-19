/* =================================================================
* Template Master JS
* 
* Template:    Tank - Creative Portfolio Showcase HTML Website Template
* Author:      Themetorium
* URL:         https://themetorium.net/
*
================================================================= */


// Table of Content
// =================
// Detect browser
// Detect mobile device
// Page transitions
// Smooth Scrollbar
// Image lazy loading
// Header tools
// Main menu (classic)
// Overlay menu
// Search
// Portfolio slider (full screen slider)
// Portfolio carousel (full screen carousel)
// Portfolio hover carousel (full screen carousel)
// Content carousel
// Testimonials slider
// Isotope
// lightGallery (lightbox plugin)
// Page header
// GSAP ScrollTrigger plugin
// Portfolio list
// Portfolio interactive
// Portfolio grid
// Gallery
// Accordion
// Tabs
// Page nav
// Sidebar
// Sliding sidebar
// Scrolling text
// Scroll between anchors
// Scroll to top
// Defer videos (Youtube, Vimeo)
// Forms
// Magic cursor
// Miscellaneous 
//




(function ($) {
	'use strict';



	// ========================================
	// Detect browser and add class to </body>
	// ========================================

	// Detect Firefox
	let firefoxAgent = navigator.userAgent.indexOf("Firefox") > -1;

	// Add class "is-firefox" to </body>
	if(firefoxAgent) {
		$("body").addClass("is-firefox");
	}



	// ==============================================
	// Detect touch device (do not remove!!!)
	// Info: https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#mobile_device_detection
	// ==============================================

	var isMobile = false;
	if ("maxTouchPoints" in navigator) {
		isMobile = navigator.maxTouchPoints > 0;
	} else if ("msMaxTouchPoints" in navigator) {
		isMobile = navigator.msMaxTouchPoints > 0;
	} else {
		const mQ = matchMedia?.("(pointer:coarse)");
		if (mQ?.media === "(pointer:coarse)") {
			isMobile = !!mQ.matches;
		} else if ("orientation" in window) {
			isMobile = true; // deprecated, but good fallback
		} else {
			// Only as a last resort, fall back to user agent sniffing
			isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini|Tablet|Mobile/i.test(navigator.userAgent);
	 	}
	}

	// Add class "is-mobile" to </body>
	if (isMobile) {
		$("body").addClass("is-mobile");
	}
	


	// =================
	// Page transitions
	// =================

	if ($("body").hasClass("transition")) {

		// Wait until the whole page is loaded.
		$(window).on("load", function () {
			setTimeout(function(){
				HideLoad(); // call out animations.
			}, 0);
		});

		// Transitions In (when "ptr-overlay" slides in).
		// =================
		function RevealLoad() {
			var tl_transitIn = gsap.timeline({ defaults: { duration: 1, ease: Expo.easeInOut }});
				 tl_transitIn.set("#page-transition", { autoAlpha: 1 });
				 tl_transitIn.to(".ptr-overlay", { scaleY: 1, transformOrigin: "center bottom" }, 0);
				 tl_transitIn.to("#content-wrap", { y: -80, autoAlpha: 0 }, 0);
				 tl_transitIn.to("#header", { y: -20, autoAlpha: 0 }, 0);
				 tl_transitIn.to(".ptr-preloader", { autoAlpha: 1 }, 0.4);
		}

		// Transitions Out (when "ptr-overlay" slides out)
		// ================
		function HideLoad() {
			var tl_transitOut = gsap.timeline();
				 tl_transitOut.to(".ptr-preloader", { duration: 1, autoAlpha: 0, ease: Expo.easeInOut });
				 tl_transitOut.to(".ptr-overlay", { duration: 1, scaleY: 0, transformOrigin: "center top", ease: Expo.easeInOut }, 0.3);

				 // Header appear
				 tl_transitOut.from("#header", { duration: 1, y: 20, autoAlpha: 0, ease: Expo.easeInOut, clearProps:"all" }, 0.6);

				 // Page header image appear
				 if ($(".ph-image").length) {
				 	if ($("#page-header").hasClass("ph-bg-image")) {
				 		tl_transitOut.from(".ph-image img, .ph-video", { duration: 1.5, y: 80, autoAlpha: 0, stagger: 0.3, ease: Expo.easeOut, clearProps:"all" }, 0.8);
				 	} else {
				 		tl_transitOut.from(".ph-image", { duration: 1.5, y: 80, autoAlpha: 0, stagger: 0.3, ease: Expo.easeOut, clearProps:"all" }, 1.2);
				 	}
				 }
				 
				 // Page header elements appear (elements with class "ph-appear")
				 if ($(".ph-appear").length) {
				 	tl_transitOut.from(".ph-appear", { duration: 1.5, y: 60, autoAlpha: 0, stagger: 0.3, ease: Expo.easeOut, clearProps:"all" }, 1.5);
				 }

				 // Page header elements appear (project info list)
				 if ($("#page-header .project-info-list").length) {
				 	if ($("#page-header").hasClass("ph-inline")) {
				 		tl_transitOut.from("#page-header .project-info-list > ul > li", { duration: 1.5, y: 80, autoAlpha: 0, stagger: 0.15, ease: Expo.easeOut, clearProps:"all" }, 2.2);
				 	} else {
				 		tl_transitOut.from("#page-header .project-info-list > ul", { duration: 1.5, y: 80, autoAlpha: 0, ease: Expo.easeOut, clearProps:"all" }, 2.2);
				 	}
				 }

				 // Portfolio slider elements appear (full heigth slider)
				 if ($(".-psc-elem").length) {
				 	$(".-psc-elem").wrap('<div class="ps-appear"></div>');
				 	tl_transitOut.from(".-ps-appear", { duration: 1.5, y: 80, autoAlpha: 0, stagger: 0.3, ease: Expo.easeOut, clearProps:"all" }, 1.4);
				 }

				 // Portfolio carousel elements appear
				 if ($(".-pci-title").length) {
				 	tl_transitOut.from(".-pci-title", { duration: 1.5, x: 80, autoAlpha: 0, skewX: "-10deg", ease: Expo.easeOut, clearProps:"all" }, 1.4);
				 }
				 if ($(".-pci-category").length) {
				 	tl_transitOut.from(".-pci-category", { duration: 1.5, x: 80, autoAlpha: 0, ease: Expo.easeOut, clearProps:"all" }, 1.5);
				 }

				 // Portfolio hover carousel appear
				 var $portfolioHoverCarousel = $(".-portfolio-hover-carousel");
				 var $portfolioHoverCarouselItem = $portfolioHoverCarousel.find(".swiper-slide-visible").find(".-phc-item");
				 var $portfolioHoverCarouselCounter = $(".-phc-counter");
				 if ($portfolioHoverCarousel.length) {
				 	if ($portfolioHoverCarouselItem.length) {
				 		tl_transitOut.from($portfolioHoverCarouselItem, { duration: 2, autoAlpha: 0, y: 80, stagger: 0.2, ease: Expo.easeOut, clearProps:"all" }, 1.4);
				 	}
				 	if ($portfolioHoverCarouselCounter.length) {
				 		tl_transitOut.from($portfolioHoverCarouselCounter, { duration: 2, y: 20, autoAlpha: 0, ease: Expo.easeInOut, clearProps:"all" }, 0.4);
				 	}

				 	setTimeout(function(){
						$portfolioHoverCarousel.addClass("phc-ready");
					}, 2000);
				 }
				 
				 // Page other elements appear
				 tl_transitOut.from("#page-content", { duration: 1.5, autoAlpha: 0, y: 80, ease: Expo.easeOut, clearProps:"all" }, 0.8);
				 tl_transitOut.set("#page-transition", { duration: 1, autoAlpha: 0, ease: Expo.easeInOut });
		}

		// Force page a reload when browser "Back" button click.
		// =====================================================
		window.onpageshow = function (event) {
			if (event.persisted) {
				window.location.reload();
			}
		}


		// On link click
		// ==============
		$("a")
			.not('[target="_blank"]') // omit from selection
			.not('[href^="#"]') // omit from selection
			.not('[href^="mailto"]') // omit from selection
			.not('[href^="tel"]') // omit from selection
			.not(".lg-trigger") // omit from selection
			.not(".btn-disabled a") // omit from selection
			.not(".no-transition") // omit from selection
			.on('click', function(e) {
				e.preventDefault();

				setTimeout(function (url) {
					window.location = url
				}, 1000, this.href);
				
				RevealLoad(); // call in animations.
		});

	}



	// =======================================================================================
	// Smooth Scrollbar
	// Source: https://github.com/idiotWu/smooth-scrollbar/
	// =======================================================================================

	if ($("body").hasClass("smooth-scroll")) {

		// Not for mobile devices!
		if(!isMobile) {

			var Scrollbar = window.Scrollbar;

			// AnchorPlugin (URL with hash links load in the right position)
			// https://github.com/idiotWu/smooth-scrollbar/issues/440
			// ==================================
			class AnchorPlugin extends Scrollbar.ScrollbarPlugin {
				static pluginName = 'anchor';

				onHashChange = () => {
					this.jumpToHash(window.location.hash);
				};

				onClick = (event) => {
					const { target } = event;
					if (target.tagName !== 'A') {
						return;
					}
					const hash = target.getAttribute('href');
					if (!hash || hash.charAt(0) !== '#') {
						return;
					}
					this.jumpToHash(hash);
				};

				jumpToHash = (hash) => {
					if (!hash) {
						return;
					}
					const { scrollbar } = this;
					scrollbar.containerEl.scrollTop = 0;
					const target = document.querySelector(hash);
					if (target) {
						scrollbar.scrollIntoView(target, {
							offsetTop: parseFloat(target.getAttribute('data-offset')) || 0 // Change to set default offset
				   	});
					}
				};

				onInit() {
					this.jumpToHash(window.location.hash);
					window.addEventListener('hashchange', this.onHashChange);
					this.scrollbar.contentEl.addEventListener('click', this.onClick);
				};

				onDestory() {
					window.removeEventListener('hashchange', this.onHashChange);
					this.scrollbar.contentEl.removeEventListener('click', this.onClick);
				};
			};

			// usage
			Scrollbar.use(AnchorPlugin);
			

			// Init Smooth Scrollbar
			// ======================
			Scrollbar.init(document.querySelector("#scroll-container"), {
				damping: 0.06,
				renderByPixel: true,
				continuousScrolling: true,
				alwaysShowTracks: true
			});
			

			// 3rd party library setup
			// More info: https://greensock.com/docs/v3/Plugins/ScrollTrigger/static.scrollerProxy()
			// ========================
			let scrollPositionX = 0,
				scrollPositionY = 0,
				bodyScrollBar = Scrollbar.init(document.getElementById("scroll-container"));

			bodyScrollBar.addListener(({ offset }) => {  
				scrollPositionX = offset.x;
				scrollPositionY = offset.y;
			});

			bodyScrollBar.setPosition(0, 0);
			bodyScrollBar.track.xAxis.element.remove();

			// tell ScrollTrigger to use these proxy getter/setter methods for the "body" element:
			ScrollTrigger.scrollerProxy("body", {
				scrollTop(value) {
					if (arguments.length) {
						bodyScrollBar.scrollTop = value;
					}
					return bodyScrollBar.scrollTop;
				}
			});

			// when smooth scroller updates, tell ScrollTrigger to update() too. 
			bodyScrollBar.addListener(ScrollTrigger.update);


			// Move "header" out of "scroll-container"
			// Expl: Since Smooth Scrollbar doesn't support element fixed position inside "scroll-container" move the "header" out of it.
			// ==========================================
			if ($("#header").hasClass("header-fixed")) {
				$("#header").prependTo( $("#body-inner"));
			}


			// Enable regular scrollbar inside a smooth scrollbar (#scroll-container). IMPORTANT: use class "overflow" on inside scroll elements!
			// ===================================================
			if ($(".-overflow").length) {
				// Determine if an element is scrollable
				$.fn.IsScrollable = function () {
					return this[0].scrollWidth > this[0].clientWidth || this[0].scrollHeight > this[0].clientHeight;
				};

				$(".-overflow").each(function() {
					var $this = $(this);
					if ($this.IsScrollable()) {
						$this.on("wheel", function(e) {
							e.stopPropagation();
						});
					}
				});
			}


			// Prevent input[type=number] to scroll on focus 
			// ==============================================
			$("input[type=number]").on("focus", function() {
				$(this).on("wheel", function(e) {
					e.stopPropagation();
				});
			});

		}

	}



	// ==================================================
	// Image lazy loading
	// ==================================================

	ScrollTrigger.config({ limitCallbacks: true });

	gsap.utils.toArray(".-lazy").forEach(image => {
		
		let newSRC = image.dataset.src,
			 newImage = document.createElement("img"),

		loadImage = () => {
			newImage.onload = () => {
				newImage.onload = null; // avoid recursion
				newImage.src = image.src; // swap the src
				image.src = newSRC;
				// place the low-res version on TOP and then fade it out.
				gsap.set(newImage, {
					position: "absolute", 
					top: image.offsetTop, 
					left: image.offsetLeft, 
					width: image.offsetWidth, 
					height: image.offsetHeight
				});
				image.parentNode.appendChild(newImage);
				gsap.to(newImage, {
					opacity: 0, 
					onComplete: () => {
						newImage.parentNode.removeChild(newImage);
						image.removeAttribute("data-src"); // remove "data-src" attribute if image is loaded
					}
				});
				st && st.kill();
			}
			newImage.src = newSRC;

			ScrollTrigger.refresh(true);
		}, 

		st = ScrollTrigger.create({
			trigger: image,
			start: "-50% bottom",
			onEnter: loadImage,
			onEnterBack: loadImage // make sure it works in either direction
		});
	});



	// ==================================
	// Header tools 
	// ==================================

	// If Header tools exist
	if ($(".header-tools").length) {
		$("body").addClass("header-tools-on");

		// Header tools dynamic
		// =====================
		if ($(".header-tools-dynamic").length) {
			$("body").addClass("header-tools-dynamic-on");

			// Move header tools dynamic out of header if the window width is 768px or smaller
			function headerToolsPosition() {
				if (window.matchMedia("(max-width: 768px)").matches) {
					$(".header-tools-dynamic").prependTo("#body-inner");
				} else {
					$(".header-tools-dynamic").prependTo(".header-tools");
				}
			}
			headerToolsPosition();
			$( window ).resize(function() {
				headerToolsPosition();
			});
		}
	}




	// ==================================================
	// Overlay menu 
	// ==================================================

	// Add class "header-fixed-on" to <body> if "header-fixed" enabled.
	if ($("#header").hasClass("header-fixed")) {
		$("body").addClass("header-fixed-on");
	}

	// On menu toggle button click
	// ============================
	var $olMenuToggleBtn = $(".ol-menu-toggle-btn-text, .ol-menu-toggle-btn");
	
	$olMenuToggleBtn.on("click", function() {
		$("html").toggleClass("no-scroll");
		$("body").toggleClass("ol-menu-open");	
		if ($("body").hasClass("ol-menu-open")) {

			// Menu step in animations
			// ========================
			$("body").addClass("olm-toggle-no-click"); // Disable toggle button click until the animations last.

			var tl_olMenuIn = gsap.timeline({
				onComplete: function() { 
					$("body").removeClass("olm-toggle-no-click"); 
				}
			});

				 tl_olMenuIn.to(".overlay-menu", { duration: 0.4, autoAlpha: 1 });
				 tl_olMenuIn.from(".ol-menu-list > li", { duration: 0.4, y: 80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeOut, clearProps:"all" });

			// On menu link click
			$(".overlay-menu a, .logo a")
			.not('[target="_blank"]') // omit from selection
			.not('[href^="#"]') // omit from selection
			.not('[href^="mailto"]') // omit from selection
			.not('[href^="tel"]') // omit from selection
			.on('click', function() {
				gsap.set("#content-wrap, .gr-cat-nav", { autoAlpha: 0 }); // Hide before timeline
				var tl_olMenuClick = gsap.timeline();
					 tl_olMenuClick.to(".ol-menu-list > li", { duration: 0.4, y: -80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn });
			});

			// Hide sliding sidebar
			if ($(".sliding-sidebar-wrap").length) {
				gsap.to(".sliding-sidebar-trigger", { duration: 1, autoAlpha: 0, ease: Expo.easeOut });
			}

		} else {	

			// Menu step out animations
			// =========================
			$("body").addClass("olm-toggle-no-click"); // Disable toggle button click until the animations last.

			var tl_olMenuOut = gsap.timeline({
				onComplete: function() { 
					$("body").removeClass("olm-toggle-no-click"); 
				}
			});
				 tl_olMenuOut.to(".ol-menu-list > li", { duration: 0.4, y: -80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn });
				 tl_olMenuOut.to(".overlay-menu", { duration: 0.4, autoAlpha: 0, clearProps:"all" }, "+=0.2");
				 tl_olMenuOut.set(".ol-menu-list > li", { clearProps:"all" }); // clearProps only

				 // Show sliding sidebar
				 if ($(".sliding-sidebar-wrap").length) {
				 	gsap.to(".sliding-sidebar-trigger", { duration: 1, autoAlpha: 1, ease: Expo.easeOut, clearProps:"all" }, "-=0.3");
				 }

			// Close open submenus
			setTimeout(function () {
				$(".ol-submenu").slideUp(350);
				$(".ol-submenu-trigger").removeClass("ol-submenu-open");
			}, 500);

		}
		
		return false;
	});

	// Menu list hover
	$(".-ol-menu-list").on("mouseenter", function() {
		$(this).addClass("ol-menu-hover");
	}).on("mouseleave", function() {
		$(this).removeClass("ol-menu-hover");
	});

	// Open submenu if link href contains #
	$(".-ol-submenu-trigger > a").on("click", function() {
		if ($(this).is('[href^="#"]')) {
			var $this = $(this).parent();
			if ($this.hasClass("ol-submenu-open")) {
				$this.removeClass("ol-submenu-open");
				$this.next().slideUp(350);
			} else {
				$this.parent().parent().find(".-ol-submenu").prev().removeClass("ol-submenu-open");
				$this.parent().parent().find(".-ol-submenu").slideUp(350);
				$this.toggleClass("ol-submenu-open");
				$this.next().slideToggle(350);
			}
		}
		return false;
	});

	// Open submenu on caret click
	$(".-ol-submenu-caret-wrap").on("click", function() {
		var $this = $(this).parent();
		if ($this.hasClass("ol-submenu-open")) {
			$this.removeClass("ol-submenu-open");
			$this.next().slideUp(350);
		} else {
			$this.parent().parent().find(".-ol-submenu").prev().removeClass("ol-submenu-open");
			$this.parent().parent().find(".-ol-submenu").slideUp(350);
			$this.toggleClass("ol-submenu-open");
			$this.next().slideToggle(350);
		}
	});



	// ==================================
	// Search
	// ==================================

	if ($(".-search").length) {
		
		// Append Search
		$(".-search").appendTo("#body-inner");

		// Open Search
		$(".-search-trigger").on("click", function() {
			$("body").addClass("search-open");
			var tl_ttSearchIn = gsap.timeline();
				 tl_ttSearchIn.to(".-search", { duration: 0.4, autoAlpha: 1 });
				 tl_ttSearchIn.from(".-search-appear", { duration: 0.5, y: 80, autoAlpha: 0, stagger: 0.1, ease: Power2.easeOut, clearProps:"all" }, "+=0.1");
		});

		// Close Search
		$(".-search-close, .-search-close-btn").on("click", function() {
			$("body").removeClass("search-open");
			var tl_ttSearchOut = gsap.timeline();
				 tl_ttSearchOut.to(".-search-appear", { duration: 0.5, y: -80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn });
				 tl_ttSearchOut.to(".-search", { duration: 0.4, autoAlpha: 0, clearProps:"all" }, "+=0.2");
				 tl_ttSearchOut.to(".-search-appear", { clearProps:"all" });
		});
	}



	// =======================================================================================
	// Portfolio slider (full screen slider)
	// Source: https://swiperjs.com/
	// =======================================================================================

	if ($(".portfolio-slider").length) {
		$(".portfolio-slider").each(function() {
			var $PortfolioSlider = $(this);

			// Data attributes
			// ================
			var $dataMousewheel = $PortfolioSlider.data("mousewheel");
			var $dataKeyboard = $PortfolioSlider.data("keyboard");
			var $dataSimulateTouch = $PortfolioSlider.data("simulate-touch");
			var $dataGrabCursor = $PortfolioSlider.data("grab-cursor");
			var $dataAutoplay = $PortfolioSlider.data("autoplay") ? { delay: $PortfolioSlider.data("autoplay"),} : $PortfolioSlider.data("autoplay");
			var $dataLoop = $PortfolioSlider.data("loop") ? { loopedSlides: 100, } : $PortfolioSlider.data("loop"); // Not recommended!

			if ($PortfolioSlider.is("[data-speed]")) {
				var $dataSpeed = $PortfolioSlider.data("speed");
			} else {
				var $dataSpeed = 900; // by default
			}

			if ($PortfolioSlider.is("[data-pagination-type]")) {
				var $dataPaginationType = $PortfolioSlider.data("pagination-type");
			} else {
				var $dataPaginationType = "fraction"; // by default (bullets/fraction/progressbar)
			}

			// Init Swiper
			// =============
			var $PortfolioSliderSwiper = new Swiper ($PortfolioSlider.find(".swiper")[0], {
				// Parameters
				direction: "horizontal",
				effect: "slide",
				speed: 600, // slider speed for smaller screens (when window width is 1024px or smaller)
				parallax: true,
				resistanceRatio: 0,
				longSwipesRatio: 0.02,
				preloadImages: false, // Needed for lazy loading
				preventInteractionOnTransition: true, // No actions during transition
				autoplay: $dataAutoplay,
				mousewheel: $dataMousewheel,
				keyboard: $dataKeyboard,
				simulateTouch: $dataSimulateTouch,
				grabCursor: $dataGrabCursor,
				loop: $dataLoop, // Not recommended!

				breakpoints: {
					// when window width is 1025px or larger
					1025: {
						speed: $dataSpeed,
					}
				},

				// Lazy loading
				lazy: {
					loadPrevNext: true,
					loadOnTransitionStart: true,
				},

				// Navigation arrows
				navigation: {
					nextEl: $PortfolioSlider.find(".ps-nav-arrow-next")[0],
					prevEl: $PortfolioSlider.find(".ps-nav-arrow-prev")[0],
					disabledClass: "ps-nav-arrow-disabled",
				},

				// Pagination
				pagination: {
					el: $PortfolioSlider.find(".ps-nav-pagination")[0],
					type: $dataPaginationType,
					modifierClass: "ps-nav-pagination-",
					dynamicBullets: true,
					dynamicMainBullets: 1,
					clickable: true,
				},

				// Events
				on: {
					init: function () {

						var $this = this;
						var $slideActive = $($this.slides[$this.activeIndex]);

						// Play video on load
						$slideActive.find("video").each(function() {
							$(this).get(0).play();
						}); 

						// Portfolio slider caption on load
						// ---------------------------------
						// Portfolio slider caption title (if contains link or not)
						if ($PortfolioSlider.find(".ps-caption-title").find("a").length) {
							$PortfolioSlider.find(".ps-caption-title a").text($slideActive.attr("data-title"));
							$PortfolioSlider.find(".ps-caption-title a").attr("href", $slideActive.attr("data-url"));
						} else {
							$PortfolioSlider.find(".ps-caption-title").text($slideActive.attr("data-title"));
						}

						// Portfolio slider caption category on load
						$PortfolioSlider.find(".ps-caption-category").text($slideActive.attr("data-category"));

						// If slider image is light on load
						setTimeout(function(){
							if ($slideActive.hasClass("psi-image-is-light")) {
								$("body").addClass("psi-light-image-on");
							} else {
								$("body").removeClass("psi-light-image-on");
							}
						}, 400);
					},

					transitionStart: function () {

						var $this = this;
						var $slideActive = $($this.slides[$this.activeIndex]);

						// If slider image is light
						setTimeout(function(){
							if ($slideActive.hasClass("psi-image-is-light")) {
								$("body").addClass("psi-light-image-on");
							} else {
								$("body").removeClass("psi-light-image-on");
							}
						}, 400);

						// Play video
						$slideActive.find("video").each(function() {
							$(this).get(0).play();
						}); 

						// Animate portfolio slider caption
						gsap.fromTo($PortfolioSlider.find(".psc-elem"), { autoAlpha: 1, y: 0 }, { duration: 0.25, autoAlpha: 0, y: -30, stagger: 0.15, ease: Power1.easeIn });
					},

					transitionEnd: function () {

						var $this = this;
						var $slideActive = $($this.slides[$this.activeIndex]);

						// Pause video
						$slideActive.prevAll().find("video").each(function() {
							$(this).get(0).pause();
						});
						$slideActive.nextAll().find("video").each(function() {
							$(this).get(0).pause();
						});

						// Portfolio slider caption
						// -------------------------
						// Portfolio slider caption title (if contains link or not)
						if ($PortfolioSlider.find(".ps-caption-title").find("a").length) {
							$PortfolioSlider.find(".ps-caption-title a").text($slideActive.attr("data-title"));
							$PortfolioSlider.find(".ps-caption-title a").attr("href", $slideActive.attr("data-url"));
						} else {
							$PortfolioSlider.find(".ps-caption-title").text($slideActive.attr("data-title"));
						}

						// Portfolio slider caption category
						$PortfolioSlider.find(".ps-caption-category").text($slideActive.attr("data-category"));

						// Animate portfolio slider caption
						gsap.fromTo($PortfolioSlider.find(".psc-elem"), { autoAlpha: 0, y: 30 }, { duration: 0.25, autoAlpha: 1, y: 0, stagger: 0.15, ease: Power1.easeOut });
					}
				}
			});


			// Parallax effect on mouse move (no effect on mobile devices!)
			// ------------------------------
			if(!isMobile) {
				if ($PortfolioSlider.data("parallax-mouse-move")) {
					gsap.set($PortfolioSlider.find(".psi-image"), { scale: 1.05 });

					$PortfolioSlider.mousemove(function(e) {
						parallaxIt(e, $PortfolioSlider.find(".psi-image"), -25); // Parallax element
						parallaxIt(e, $PortfolioSlider.find(".ps-caption-inner"), -35); // Parallax element
					});

					function parallaxIt(e, target, movement) {
						var $this = $PortfolioSlider
						var relX = e.pageX - $this.offset().left;
						var relY = e.pageY - $this.offset().top;

						gsap.to(target, {
							duration: 1,
							x: (relX - $this.width() / 2) / $this.width() * movement,
							y: (relY - $this.height() / 2) / $this.height() * movement
						});
					}
				}
			}

		});
	}



	// =======================================================================================
	// Portfolio carousel (full screen carousel)
	// Source: https://swiperjs.com/
	// =======================================================================================

	if ($(".portfolio-carousel").length) {
		$(".portfolio-carousel").each(function() {
			var $PortfolioCarousel = $(this);

			// Data attributes
			// ================
			var $dataMousewheel = $PortfolioCarousel.data("mousewheel");
			var $dataKeyboard = $PortfolioCarousel.data("keyboard");
			var $dataSimulateTouch = $PortfolioCarousel.data("simulate-touch");
			var $dataGrabCursor = $PortfolioCarousel.data("grab-cursor");
			var $dataAutoplay = $PortfolioCarousel.data("autoplay") ? { delay: $PortfolioCarousel.data("autoplay"),} : $PortfolioCarousel.data("autoplay");
			var $dataLoop = $PortfolioCarousel.data("loop") ? { loopedSlides: 100, } : $PortfolioCarousel.data("loop"); // Not recommended!

			if ($PortfolioCarousel.is("[data-speed]")) {
				var $dataSpeed = $PortfolioCarousel.data("speed"); // speed for larger screens
			} else {
				var $dataSpeed = 1200; // speed for larger screens (by default) 
			}

			if ($PortfolioCarousel.is("[data-pagination-type]")) {
				var $dataPaginationType = $PortfolioCarousel.data("pagination-type");
			} else {
				var $dataPaginationType = "fraction"; // by default (bullets/fraction/progressbar)
			}

			// Init Swiper
			// =============
			var $PortfolioCarouselSwiper = new Swiper ($PortfolioCarousel.find(".swiper")[0], {
				// Parameters
				direction: "horizontal",
				slidesPerView: "auto",
				spaceBetween: 0,
				resistanceRatio: 0.85,
				longSwipesRatio: 0.3,
				shortSwipes: true,
				centeredSlides: true,
				preloadImages: false, // Needed for lazy loading
				watchSlidesProgress: true, // Needed for lazy loading (if slidesPerView is "auto" or more than 1)
				preventInteractionOnTransition: false, // No actions during transition
				speed: 900, // Slider speed for smaller screens (when window width is 1024px or smaller)
				keyboard: $dataKeyboard,
				mousewheel: $dataMousewheel,
				autoplay: $dataAutoplay,
				simulateTouch: $dataSimulateTouch,
				grabCursor: $dataGrabCursor,
				loop: $dataLoop, // Not recommended!

				lazy: {
					loadPrevNext: true,
					loadOnTransitionStart: true,
				},

				breakpoints: {
					// When window width is 1025px or larger
					1025: {
						speed: $dataSpeed,
						lazy: {
							loadPrevNextAmount: 3, // Amount of next/prev slides to preload lazy images in.
						},
					}
				},

				// Navigation arrows
				navigation: {
					nextEl: $PortfolioCarousel.find(".pc-arrow-next")[0],
					prevEl: $PortfolioCarousel.find(".pc-arrow-prev")[0],
					disabledClass: "pc-arrow-disabled",
				},

				// Pagination
				pagination: {
					el: $PortfolioCarousel.find(".pc-pagination")[0],
					type: $dataPaginationType,
					modifierClass: "pc-pagination-",
					dynamicBullets: true,
					dynamicMainBullets: 1,
					clickable: true,
				},

				// Events
				on: {
					lazyImageReady: (swiper) => { // Lazy load + slidesPerView:"auto" fix.
						$PortfolioCarouselSwiper.update()
					},

					init: function () {

						var $this = this;
						var $slideActive = $($this.slides[$this.activeIndex]);

						// Active slide class (custom) on load
						$slideActive.addClass("slide-active"); // Add class to active slide.

						// Carousel slide disabled (prev/next slide) on load
						$slideActive.prevAll().addClass("pcs-disabled");
						$slideActive.nextAll().addClass("pcs-disabled");

					},

					transitionStart: function () {

						var $this = this;
						var $slideActive = $($this.slides[$this.activeIndex]);

						// Active slide classes (custom).
						$slideActive.addClass("slide-active"); // Add class to active slide.
						$slideActive.prev().addClass("slide-active-start"); // Add class if active slide transition starts.
						$slideActive.next().addClass("slide-active-start"); // Add class if active slide transition starts.

						// Carousel slide disabled (prev/next slide)
						$slideActive.prevAll().addClass("pcs-disabled");
						$slideActive.removeClass("pcs-disabled");
						$slideActive.nextAll().addClass("pcs-disabled");

						// Play video
						$(".swiper-slide-active").find("video").each(function() {
							$(this).get(0).play();
						}); 

						// Disable nav arrow action.
						$(".-pc-arrow").addClass("pc-arrow-disabled");

					},

					transitionEnd: function () {

						var $this = this;
						var $slideActive = $($this.slides[$this.activeIndex]);

						// Active slide classes (custom)
						$slideActive.prevAll().removeClass("slide-active"); // Remove class if active slide transition ends.
						$slideActive.nextAll().removeClass("slide-active"); // Remove class if active slide transition ends.
						$slideActive.prev().removeClass("slide-active-start"); // Remove class if active slide transition ends.
						$slideActive.next().removeClass("slide-active-start"); // Remove class if active slide transition ends.

						// Pause video
						$(".swiper-slide-prev").find("video").each(function() {
							$(this).get(0).pause();
						});
						
						$(".swiper-slide-next").find("video").each(function() {
							$(this).get(0).pause();
						});

						// Disable nav arrow action.
						$(".pc-arrow").removeClass("pc-arrow-disabled");

					}
				}
			});

			// Scale down animation on carousel click
			if ($PortfolioCarousel.attr("data-simulate-touch") == "true") {
				if ($PortfolioCarousel.hasClass("pc-scale-down")) {
					$PortfolioCarousel.find(".swiper").on("mousedown touchstart pointerdown", function(e) {
						if (e.which === 1) { // Affects the left mouse button only!
							gsap.to($PortfolioCarousel.find(".swiper-slide"), { duration: 0.7, scale: 0.9 });
						}
					});
					$("body").on("mouseup touchend pointerup mouseleave", function() {	
						gsap.to($PortfolioCarousel.find(".swiper-slide"), { duration: 0.7, scale: 1, clearProps: "scale" });
					});
				}
			}

			// Update slider when windows resize or orientation change 
			$(window).on("resize orientationchange", function() {
				setTimeout(function(){
					$PortfolioCarouselSwiper.update();
					$PortfolioCarousel.find(".swiper-wrapper").addClass("swtr-smooth");
				}, $dataSpeed);

				setTimeout(function(){
					$PortfolioCarousel.find(".swiper-wrapper").removeClass("swtr-smooth");
				}, $dataSpeed + $dataSpeed);
			});
		});
	}



	// =======================================================================================
	// Portfolio hover carousel (full screen carousel)
	// Source: https://swiperjs.com/
	// =======================================================================================

	if ($(".portfolio-hover-carousel").length) {
		$("body").addClass("portfolio-hover-carousel-on");

		$(".portfolio-hover-carousel").each(function() {
			var $PortfolioHoverCarousel = $(this);

			// Data attributes
			// ================
			var $dataSimulateTouch = $PortfolioHoverCarousel.data("simulate-touch");
			var $dataGrabCursor = $PortfolioHoverCarousel.data("grab-cursor");
			var $dataLoop = $PortfolioHoverCarousel.data("loop") ? { loopedSlides: 100, } : $PortfolioHoverCarousel.data("loop");


			// Init Swiper
			// =============
			var $PortfolioHoverCarouselSwiper = new Swiper ($PortfolioHoverCarousel.find(".swiper")[0], {
				// Parameters
				direction: "horizontal",
				slidesPerView: "auto",
				spaceBetween: 0,
				shortSwipes: true,
				speed: 900, 
				keyboard: false,
				mousewheel: true,
				watchSlidesProgress: true,
				simulateTouch: $dataSimulateTouch,
				grabCursor: $dataGrabCursor,
				loop: $dataLoop,

				// Events
				on: {

					init: function () {

						// Fix position issue on load.
						setTimeout(function(){
							$PortfolioHoverCarouselSwiper.update();
						}, 100);


						// Carousel item hover
						// ====================

						// First image
						var $phcFirstImage = $(".phc-image").first();
						$phcFirstImage.addClass("active");
						$phcFirstImage.find("video").each(function() {
							$(this).get(0).play();
						});

						// First slide
						var $phcFirstSlide = $(".portfolio-hover-carousel").find(".swiper-slide").not(".swiper-slide-duplicate").first();
						$phcFirstSlide.addClass("active");
						
						// If first slide image is light
						if ($phcFirstSlide.hasClass("active")) {
							if ($phcFirstImage.hasClass("phc-image-is-light")) {
								$("body").addClass("light-bg-on");
							} else {
								$("body").removeClass("light-bg-on");
							}
						}

						// Mouse hover
						$PortfolioHoverCarousel.find(".swiper-slide").on("mouseenter touchstart", function() {
							if (!$(this).hasClass("active")) {
								$('.phc-image').find('video').each(function() {
									$(this).get(0).pause();
								});
								$(this).addClass("active").siblings().removeClass("active");
								var $phcSlide = $(this).data("slide");
								var $phcImage = $('.phc-image[data-slide="' + $phcSlide + '"]');
								$PortfolioHoverCarousel.find(".phc-image").removeClass("active");
								$phcImage.addClass("active");
								$phcImage.find('video').each(function() {
									$(this).get(0).play();
								});

								// If image is light
								if ($(this).parents($PortfolioHoverCarousel).find($phcImage).hasClass("phc-image-is-light")) {
									$("body").addClass("light-bg-on");
								} else {
									$("body").removeClass("light-bg-on");
								}

								// Slides count
								var $phcCounter = $('.phc-count span[data-slide="' + $phcSlide + '"]');
								gsap.to(".phc-count span", { duration: 0.1, autoAlpha: 0, ease: Power2.easeIn });
								gsap.to($phcCounter, { duration: 0.1, autoAlpha: 1, ease:Power2.easeOut });
							}

						});

						// Slides total count
						var $phcTotalCount = $PortfolioHoverCarousel.find(".swiper-slide").not(".swiper-slide-duplicate").length;
						$(".phc-counter-separator").after('<span class="phc-total">' + $phcTotalCount);

					}

				}

			});

		});
	}



	// =======================================================================================
	// Content carousel
	// Source: https://swiperjs.com/
	// =======================================================================================

	if ($(".content-carousel").length) {
		$(".content-carousel").each(function() {
			var $ContentCarousel = $(this);

			// Data attributes
			// ================
			var $dataSimulateTouch = $ContentCarousel.data("simulate-touch");
			var $autoplay = $ContentCarousel.data("autoplay") ? { delay: $ContentCarousel.data("autoplay"), } : $ContentCarousel.data("autoplay");
			var $dataLoop = $ContentCarousel.data("loop") ? { loopedSlides: 100, } : $ContentCarousel.data("loop");

			if ($ContentCarousel.is("[data-speed]")) {
				var $dataSpeed = $ContentCarousel.data("speed");
			} else {
				var $dataSpeed = 900; // by default
			}

			if ($ContentCarousel.is("[data-pagination-type]")) {
				var $dataPaginationType = $ContentCarousel.data("pagination-type");
			} else {
				var $dataPaginationType = "bullets"; // by default (bullets/fraction/progressbar)
			}

			// Init Swiper
			// =============
			var $ContentCarouselSwiper = new Swiper($ContentCarousel.find(".swiper")[0], {
				// Parameters
				direction: "horizontal",
				slidesPerView: "auto",
				spaceBetween: 0,
				centeredSlides: true,
				longSwipesRatio: 0.3,
				mousewheel: false,
				keyboard: false,
				preloadImages: true, // Needed for lazy loading
				watchSlidesProgress: true, // Needed for lazy loading (if slidesPerView is "auto" or more than 1)
				preventInteractionOnTransition: false, // No actions during transition
				simulateTouch: $dataSimulateTouch,
				grabCursor: $dataSimulateTouch,
				speed: $dataSpeed,
				autoplay: $autoplay,
				loop: $dataLoop,

				lazy: {
					loadPrevNext: true,
					loadOnTransitionStart: false,
				},

				breakpoints: {
					// when window width is 1025px or larger
					1025: {
						lazy: {
							loadPrevNextAmount: 3, // Amount of next/prev slides to preload lazy images in.
						},
					}
				},

				// Navigation (arrows)
				navigation: {
					nextEl: $ContentCarousel.find(".cc-nav-next")[0],
					prevEl: $ContentCarousel.find(".cc-nav-prev")[0],
					disabledClass: "cc-nav-arrow-disabled",
				},

				// Pagination
				pagination: {
					el: $ContentCarousel.find(".cc-pagination")[0],
					type: $dataPaginationType,
					modifierClass: "cc-pagination-",
					dynamicBullets: true,
					dynamicMainBullets: 1,
					clickable: true,
				},

				// Events
				on: {
					lazyImageReady: (swiper) => { // Lazy load + slidesPerView:"auto" fix.
						$ContentCarouselSwiper.update()
					},

					transitionStart: function () {

						// Play video
						$(".swiper-slide-active").find("video").each(function() {
							$(this).get(0).play();
						}); 

					},

					transitionEnd: function () {

						// Pause video
						$(".swiper-slide-prev").find("video").each(function() {
							$(this).get(0).pause();
						});
						
						$(".swiper-slide-next").find("video").each(function() {
							$(this).get(0).pause();
						});

					}
				}
			});

			// Scale down animation on carousel click
			// =======================================
			if ($ContentCarousel.attr("data-simulate-touch") == "true") {
				if ($ContentCarousel.hasClass("cc-scale-down")) {
					$ContentCarousel.find(".swiper-wrapper").on("mousedown touchstart pointerdown", function(e) {
						if (e.which === 1) { // Affects the left mouse button only!
							gsap.to($ContentCarousel.find(".content-carousel-item"), { duration: 0.7, scale: 0.9 });
						}
					});
					$("body").on("mouseup touchend pointerup mouseleave", function() {	
						gsap.to($ContentCarousel.find(".content-carousel-item"), { duration: 0.7, scale: 1, clearProps: "scale" });
					});
				}
			}

		});

	}



	// =======================================================================================
	// Testimonials slider
	// Source: https://swiperjs.com/
	// =======================================================================================

	if ($(".testimonials-slider").length) {
		$(".testimonials-slider").each(function() {
			var $TestimonialsSlider = $(this);

			// Data attributes
			// ================
			var $dataSimulateTouch = $TestimonialsSlider.data("simulate-touch");
			var $autoplay = $TestimonialsSlider.data("autoplay") ? { delay: $TestimonialsSlider.data("autoplay"), } : $TestimonialsSlider.data("autoplay");
			var $dataLoop = $TestimonialsSlider.data("loop") ? { loopedSlides: 100, } : $TestimonialsSlider.data("loop");

			if ($TestimonialsSlider.is("[data-speed]")) {
				var $dataSpeed = $TestimonialsSlider.data("speed");
			} else {
				var $dataSpeed = 900; // by default
			}

			// Init Swiper
			// =============
			var $TestimonialsSliderSwiper = new Swiper ($TestimonialsSlider.find(".swiper")[0], {
				// Parameters
				direction: "horizontal",
				slidesPerView: "auto",
				spaceBetween: 0,
				mousewheel: false,
				longSwipesRatio: 0.3,
				grabCursor: true,
				autoHeight: true,
				centeredSlides: true,
				preventInteractionOnTransition: false, // No actions during transition
				speed: $dataSpeed,
				simulateTouch: $dataSimulateTouch,
				autoplay: $autoplay,
				loop: $dataLoop,

				// Navigation (arrows)
				navigation: {
					nextEl: $TestimonialsSlider.find(".ts-nav-next")[0],
					prevEl: $TestimonialsSlider.find(".ts-nav-prev")[0],
					disabledClass: "ts-nav-arrow-disabled",
				},

				// Pagination
				pagination: {
					el: $TestimonialsSlider.find(".ts-pagination")[0],
					type: "bullets",
					modifierClass: "ts-pagination-",
					dynamicBullets: true,
					dynamicMainBullets: 1,
					clickable: true,
				}
			});

			// Auto height fix
			setTimeout(function() {
				$TestimonialsSliderSwiper.updateAutoHeight();
			}, 100);

			// Scale down animation on slider click
			if ($TestimonialsSlider.hasClass("ts-scale-down")) {
				$TestimonialsSlider.find(".swiper-wrapper").on("mousedown touchstart pointerdown", function(e) {
					if (e.which === 1) { // Affects the left mouse button only!
						gsap.to($TestimonialsSlider.find(".swiper-slide"), { duration: 0.7, scale: 0.9 });
					}
				});
				$("body").on("mouseup touchend pointerup", function() {	
					gsap.to($TestimonialsSlider.find(".swiper-slide"), { duration: 0.7, scale: 1, clearProps: "scale" });
				});
			}
		});
	}



	// ============================================================================
   // Isotope
   // More info: http://isotope.metafizzy.co
   // Note: "imagesloaded" blugin is required! https://imagesloaded.desandro.com/
   // ============================================================================

	// init Isotope
	var $container = $(".isotope-items-wrap");
	$container.imagesLoaded(function() {
		$container.isotope({
			itemSelector: ".isotope-item",
			layoutMode: "packery",
			transitionDuration: "0.7s",
			percentPosition: true
		});

		setTimeout(function() {
			$container.isotope('layout'); // Refresh Isotope
			ScrollTrigger.refresh(true); // Refresh ScrollTrigger
		}, 500);
	});

	// Filter
	$(".gr-cat-list > li > a, .gr-cat-classic-list > li > a").on("click", function() {
		var selector = $(this).attr("data-filter");
		$container.isotope({
			filter: selector
		});

		// Refresh ScrollTrigger
		setTimeout(function() {
			ScrollTrigger.refresh(true);
		}, 500);

		return false;
	});

	// Filter item active
	var filterItemActive = $(".gr-cat-list > li > a, .gr-cat-classic-list > li > a");
	filterItemActive.on("click", function(){
		var $this = $(this);
		if ( !$this.hasClass("active")) {
			filterItemActive.removeClass("active");
			$this.addClass("active");
		}
	});


	// Isotope items gaps fix (uncomment the below code if isotope items gaps do not calculate correctly.)
	// ========================

	// if ($(".isotope-items-wrap").length){
	// 	// add overflow scroll to <html> (isotope items gaps fix).
	// 	if ( document.querySelector("body").offsetHeight > window.innerHeight ) {
	// 		document.documentElement.style.overflowY = "scroll";
	// 	}
	// }



	// =====================================================
	// lightGallery (lightbox plugin)
	// Source: http://sachinchoolur.github.io/lightGallery
	// Mousewheel plugin: https://github.com/jquery/jquery-mousewheel
	// =====================================================

	$(".lightgallery").lightGallery({

		// Please read about gallery options here: http://sachinchoolur.github.io/lightGallery/docs/api.html

		// lightGallery core 
		selector: '.lg-trigger',
		mode: 'lg-fade', // Type of transition between images ('lg-fade' or 'lg-slide').
		height: '100%', // Height of the gallery (ex: '100%' or '300px').
		width: '100%', // Width of the gallery (ex: '100%' or '300px').
		iframeMaxWidth: '100%', // Set maximum width for iframe.
		loop: true, // If false, will disable the ability to loop back to the beginning of the gallery when on the last element.
		speed: 600, // Transition duration (in ms).
		closable: true, // Allows clicks on dimmer to close gallery.
		escKey: true, // Whether the LightGallery could be closed by pressing the "Esc" key.
		keyPress: true, // Enable keyboard navigation.
		hideBarsDelay: 3000, // Delay for hiding gallery controls (in ms).
		controls: true, // If false, prev/next buttons will not be displayed.
		mousewheel: true, // Chane slide on mousewheel.
		download: false, // Enable download button. By default download url will be taken from data-src/href attribute but it supports only for modern browsers. If you want you can provide another url for download via data-download-url.
		counter: true, // Whether to show total number of images and index number of currently displayed image.
		swipeThreshold: 50, // By setting the swipeThreshold (in px) you can set how far the user must swipe for the next/prev image.
		enableDrag: true, // Enables desktop mouse drag support.
		enableTouch: true, // Enables touch support.
		getCaptionFromTitleOrAlt: false, // Option to get captions from alt or title tags.

		// Thumbnail plugin
		thumbnail: false, // Enable thumbnails for the gallery.
		showThumbByDefault: false, // Show/hide thumbnails by default.
		thumbMargin: 5, // Spacing between each thumbnails.
		toogleThumb: true, // Whether to display thumbnail toggle button.
		enableThumbSwipe: true, // Enables thumbnail touch/swipe support for touch devices.
		exThumbImage: 'data-exthumbnail', // If you want to use external image for thumbnail, add the path of that image inside "data-" attribute and set value of this option to the name of your custom attribute.

		// Autoplay plugin
		autoplay: false, // Enable gallery autoplay.
		autoplayControls: true, // Show/hide autoplay controls.
		pause: 6000, // The time (in ms) between each auto transition.
		progressBar: true, // Enable autoplay progress bar.
		fourceAutoplay: false, // If false autoplay will be stopped after first user action

		// Full Screen plugin
		fullScreen: true, // Enable/Disable fullscreen mode.

		// Zoom plugin
		zoom: false, // Enable/Disable zoom option.
		scale: 0.5, // Value of zoom should be incremented/decremented.
		enableZoomAfter: 50, // Some css styles will be added to the images if zoom is enabled. So it might conflict if you add some custom styles to the images such as the initial transition while opening the gallery. So you can delay adding zoom related styles to the images by changing the value of enableZoomAfter.

		// Video options
		videoMaxWidth: '1400px', // Set limit for video maximal width.

		// Youtube video options
		loadYoutubeThumbnail: true, // You can automatically load thumbnails for youtube videos from youtube by setting loadYoutubeThumbnail true.
		youtubeThumbSize: 'default', // You can specify the thumbnail size by setting respective number: 0, 1, 2, 3, 'hqdefault', 'mqdefault', 'default', 'sddefault', 'maxresdefault'.
		youtubePlayerParams: { // Change youtube player parameters: https://developers.google.com/youtube/player_parameters
			modestbranding: 0,
			showinfo: 1,
			controls: 1
		},

		// Vimeo video options
		loadVimeoThumbnail: true, // You can automatically load thumbnails for vimeo videos from vimeo by setting loadYoutubeThumbnail true.
		vimeoThumbSize: 'thumbnail_medium', // Thumbnail size for vimeo videos: 'thumbnail_large' or 'thumbnail_medium' or 'thumbnail_small'.
		vimeoPlayerParams: { // Change vimeo player parameters: https://developer.vimeo.com/player/embedding#universal-parameters 
			byline : 1,
			portrait : 1,
			title: 1,
			color : 'CCCCCC',
			autopause: 1
		},

		// Hash plugin (unique url for each slides)
		hash: false, // Enable/Disable hash plugin.
		hgalleryId: 1, // Unique id for each gallery. It is mandatory when you use hash plugin for multiple galleries on the same page.

		// Rotate plugin
		rotate: false,

		// Share plugin
		share: false, // Enable/Disable share plugin.
			facebook: true, // Enable Facebook share.
			facebookDropdownText: 'Facebook', // Facebok dropdown text.
			twitter: true, // Enable Twitter share.
			twitterDropdownText: 'Twitter', // Twitter dropdown text.
			googlePlus: true, // Enable Google Plus share.
			googlePlusDropdownText: 'Google+', // Google Plus dropdown text.
			pinterest: true, // Enable Pinterest share.
			pinterestDropdownText: 'Pinterest' // Pinterest dropdown text.

	});



	// ================================================================
	// Page header
	// ================================================================

	// If page header image exist
	// ===========================
	if ($(".ph-image").length) {
		$("body").addClass("ph-image-on");

		// If page header image is background image
		if ($("#page-header").hasClass("ph-bg-image")) {
			$("body").addClass("ph-bg-image-on");
		}
	}


	// If page header contains project info list
	// ==========================================
	if ($("#page-header .project-info-list").length) {
		$("#page-header").addClass("project-info-list-on");
	}


	// If "made with love" exist
	// ==========================
	if ($(".edition-tag").length) {
		$("body").addClass("edition-tag-on");
	}


	// Project share 
	// ===============
	if ($(".ph-share").length) {
		$("body").addClass("ph-share-on");

		if ($(".ph-share-trigger").hasClass("ph-appear")) {
			$(".ph-share-trigger").removeClass("ph-appear");
		}
		$(".ph-share").addClass("ph-appear");

		// Project share position (move it out of page header if the window width is 1024px or smaller).
		// Expl: Since Smooth Scrollbar doesn't support element fixed position inside "scroll-container" move the "ph-share" out of it.
		function projectSharePosition() {
			if (window.matchMedia("(max-width: 768px)").matches) {
				$(".ph-share").appendTo("#body-inner");
			} else {
				$(".ph-share").appendTo("#page-header");
			}
		}
		projectSharePosition();
		$(window).resize(function() {
			projectSharePosition();
		});

		// Project share icon hover
		$(".ph-share-icon").on("mouseenter", function() {
			$(".ph-share").addClass("active");
		}).on("mouseleave", function() {
			$(".ph-share").removeClass("active");
		});

		// Prepend top close button
		$(".ph-share-content").prepend('<div class="ph-share-close-btn"><i class="fas fa-times"></i></div>');

		// Top close button hover
		$(".ph-share-close-btn").on("mouseenter", function() {
			gsap.to($ball, { duration: 0.3, scale: 0, opacity: 0 });
		}).on("mouseleave", function() {
			gsap.to($ball, { duration: 0.3, scale: $ballScale, opacity: $ballOpacity });
		});

		// Open project share content
		$(".ph-share-content").appendTo("#body-inner");

		$(".ph-share-icon").on("click", function() {
			$("body").addClass("ph-share-open");
			var tl_prshIn = gsap.timeline();
				 tl_prshIn.to(".ph-share-content", { duration: 0.4, autoAlpha: 1 });
				 tl_prshIn.from(".ph-share-appear", { duration: 0.5, y: 80, autoAlpha: 0, stagger: 0.1, ease: Power2.easeOut, clearProps:"all" }, "+=0.1");
		});

		// Close project share content
		$(".ph-share-close, .ph-share-close-btn").on("click", function() {
			$("body").removeClass("ph-share-open");
			var tl_prshOut = gsap.timeline();
				 tl_prshOut.to(".ph-share-appear", { duration: 0.5, y: -80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn });
				 tl_prshOut.to(".ph-share-content", { duration: 0.4, autoAlpha: 0, clearProps:"all" }, "+=0.2");
				 tl_prshOut.to(".ph-share-appear", { clearProps:"all" });
		});
	}


	// If page header background image is light (toggle class on scroll handled by scrollTrigger plugin below)
	// =========================================
	if ($("#page-header").is(".ph-bg-image.ph-bg-image-is-light")) {
		$("body").addClass("ph-bg-image-light-on");
	} else {
		$("body").removeClass("ph-bg-image-light-on");
	}



	// ================================================================
	// GSAP ScrollTrigger plugin
	// More info: https://greensock.com/docs/v3/Plugins/ScrollTrigger/
	// ================================================================

	// Page header elements scrolling effects:
	// =======================================
	if ($("#page-header").hasClass("ph-content-parallax")) {
		let tlPhParallax = gsap.timeline({ 
			scrollTrigger: {
				trigger: "#page-header", 
				start: 'top top', 
				end: 'bottom top', 
				scrub: true,
				markers: false
			}
		});

		// Page header caption elements scrolling effect
		if ($(".ph-categories").length) {
			$(".ph-categories").wrapInner('<div class="ph-cat-parallax"></div>');
			tlPhParallax.to(".ph-cat-parallax", { y: -80 }, 0);
		}
		if ($(".ph-caption-title").length) {
			$(".ph-caption-title").wrapInner('<div class="ph-title-parallax"></div>');
			tlPhParallax.to(".ph-title-parallax", { y: -40 }, 0);
		}
		if ($(".ph-caption-subtitle").length) {
			$(".ph-caption-subtitle").wrapInner('<div class="ph-subt-parallax"></div>');
			tlPhParallax.to(".ph-subt-parallax", { y: -10 }, 0);
		}
		if ($(".ph-caption-title-ghost").length) {
			$(".ph-caption-title-ghost").wrapInner('<div class="ph-ghost-parallax"></div>');
			tlPhParallax.to(".ph-ghost-parallax", { y: 40 }, 0);
		}

		// Page header image scrolling effect
		if ($(".ph-image").length) {
			if ($("#page-header").hasClass("ph-bg-image")) {
				tlPhParallax.to(".ph-image-inner", { yPercent: 30, scale: 1.05 }, 0);
			} else {
				tlPhParallax.to(".ph-image-inner", { yPercent: -20 }, 0);
			}
		}

		// Page header project info list scrolling effect (effect only if it in the page header!)
		if ($("#page-header .project-info-list").length) {
			$("#page-header .project-info-list > ul > li").wrapInner('<div class="ph-pil-parallax"></div>');
			if ($("#page-header:not('.ph-center')").hasClass("ph-inline")) {
				ScrollTrigger.matchMedia({
					"(min-width: 1025px)": function() {
						gsap.to(".ph-pil-parallax", { 
							y: -140,
							stagger: 0.15,
							ease: "none",
							scrollTrigger: {
								trigger: "#page-header",
								start: "top top",
								end: "bottom top",
								scrub: true,
								markers: false
							} 
						});
					},

					"(max-width: 1024px)": function() {
						gsap.to("#page-header .project-info-list", { 
							y: 20,
							ease: "none",
							scrollTrigger: {
								trigger: "#page-header",
								start: "top top",
								end: "bottom top",
								scrub: true,
								markers: false
							} 
						});
					}
				});

			} else {

				gsap.to(".ph-pil-parallax", { 
					y: 30,
					ease: "none",
					scrollTrigger: {
						trigger: "#page-header",
						start: "top top",
						end: "bottom top",
						scrub: true,
						markers: false
					} 
				});
			} 
		}

		// Page header scroll down circle
		if ($(".scroll-down-circle").length) {
			gsap.to(".scroll-down-circle", { 
				x: -100,
				autoAlpha: 0,
				ease: "none",
				scrollTrigger: {
					trigger: "#page-header",
					start: "top top",
					end: "30% top",
					scrub: true,
					markers: false
				}, 
			});
		}

		// Page header made-with-love
		if ($(".edt-inner").length) {
			gsap.to(".edt-inner", { 
				yPercent: 250,
				autoAlpha: 0,
				ease: "none",
				scrollTrigger: {
					trigger: "#page-header",
					start: "top top",
					end: "40% top",
					scrub: true,
					markers: false
				}, 
			});
		}

		// Page header projekt share
		if ($(".ph-share").length) {
			$(".ph-share-trigger").wrap('<div class="ph-share-trigger-wrap"></div>');
			ScrollTrigger.matchMedia({
				"(min-width: 769px)": function() {
					gsap.to(".ph-share-trigger-wrap", { 
						y: 50,
						autoAlpha: 0,
						ease: "none",
						scrollTrigger: {
							trigger: "#page-header",
							start: "top top",
							end: "30% top",
							scrub: true,
							markers: false
						}, 
					});
				}
			});
		}

		// If page header background image is light
		if ($("#page-header").is(".ph-bg-image.ph-bg-image-is-light")) {
			if ($("#header").hasClass("header-fixed")) {
				ScrollTrigger.create({
					trigger: "#page-header",
					start: "top bottom",
					end: "bottom 30px",
					scrub: true,
					markers: false,

					onLeave: () => phLeaveClass(),
					onEnter: () => phEnterClass(),
					onLeaveBack: () => phLeaveClass(),
					onEnterBack: () => phEnterClass(),
				});

				function phLeaveClass() {
					$("body").removeClass("ph-bg-image-light-on");
				};
				function phEnterClass() {
					$("body").addClass("ph-bg-image-light-on");
				};
			}
		}

	}


	// Portfolio grid categories filter show/hide on scroll
	// =====================================================
	if ($(".-grid-categories").length) {
		var $gCatTriggerWrap = $(".gr-cat-trigger-wrap");

		if ($gCatTriggerWrap.hasClass("gr-cat-fixed")) {
			$gCatTriggerWrap.appendTo("#body-inner");

			// Show/Hide trigger on page scroll
			ScrollTrigger.create({
				trigger: "#portfolio-grid",
				start: "top bottom",
				end: "bottom 75%",
				scrub: true,
				markers: false,

				onEnter: () => ttgCatShow(),
				onLeave: () => ttgCatHide(),
				onEnterBack: () => ttgCatShow(),
				onLeaveBack: () => ttgCatHide(),
			});

			function ttgCatShow() {
				gsap.to($gCatTriggerWrap, { duration: 0.4, autoAlpha: 1, scale: 1, ease:Power2.easeOut });
			}
			function ttgCatHide() {
				gsap.to($gCatTriggerWrap, { duration: 0.4, autoAlpha: 0, scale: 0.9, ease:Power2.easeOut });
			}

		} else {

			// Hide trigger before it reaches the top when page scroll
			gsap.to($gCatTriggerWrap, { 
				yPercent: 70,
				autoAlpha: 0,
				ease: "none",
				scrollTrigger: {
					trigger: $gCatTriggerWrap,
					start: "top 250px",
					end: "100px 250px",
					scrub: true,
					markers: false
				}, 
			});

		}
	}


	// Portfolio list item info elements scrolling effects:
	// =====================================================
	$(".pli-info").each(function() {
		var $pliTitle = $(this).find(".pli-title");
		var $pliCategory = $(this).find(".pli-categories-wrap");
		var $pliCounter = $(this).find(".pli-counter");

		let tl_plIInfo = gsap.timeline({
			scrollTrigger: {
				trigger: this,
				start: "top bottom",
				markers: false
			}
		});

		if ($($pliTitle).length) {
			tl_plIInfo.from($pliTitle, { duration: 2.5, autoAlpha: 0, y: 80, ease: Expo.easeOut, clearProps:"all" }, "+=0.5");
		}
		if ($($pliCategory).length) {
			tl_plIInfo.from($pliCategory, { duration: 2.5, autoAlpha: 0, y: 60, ease: Expo.easeOut, clearProps:"all" }, "-=2.2");
		}
		if ($($pliCounter).length) {
			tl_plIInfo.from($pliCounter, { duration: 2.5, autoAlpha: 0, y: 40, ease: Expo.easeOut, clearProps:"all" }, "-=2.2");
		}
	});


	// Image parallax
	// ===============
	$(".anim-image-parallax").each(function() {

		// Add wrap <div>.
		$(this).wrap('<div class="anim-image-parallax-wrap"><div class="anim-image-parallax-inner"></div></div>');

		// Add overflow hidden.
		$(".anim-image-parallax-wrap").css({ "overflow": "hidden" });

		var $animImageParallax = $(this);
		var $aipWrap = $animImageParallax.parents(".anim-image-parallax-wrap");
		var $aipInner = $aipWrap.find(".anim-image-parallax-inner");

		// Parallax
		gsap.to($animImageParallax, {
			yPercent: 30,
			ease: "none",
			scrollTrigger: {
				trigger: $aipWrap,
				start: "top bottom",
				end: "bottom top",
				scrub: true,
				markers: false,
			}, 
		});

		// Zoom in
		let tl_aipZoomIn = gsap.timeline({
			scrollTrigger: {
				trigger: $aipWrap,
				start: "top 90%",
				markers: false,
			}
		});
		tl_aipZoomIn.from($aipInner, { duration: 1.5, autoAlpha: 0, scale: 1.2, ease: Power2.easeOut, clearProps:"all" });

	});


	// Grid "layout-creative" parallax
	// ===================================
	ScrollTrigger.matchMedia({
		"(min-width: 768px)": function() {
			$(".-grid.gr-layout-creative-1 .-grid-item:nth-of-type(6n+2) .gr-item-inner, .-grid.gr-layout-creative-1 .-grid-item:nth-of-type(6n+4) .gr-item-inner, .-grid.gr-layout-creative-2 .-grid-item:nth-of-type(4n+2) .gr-item-inner, .-grid.gr-layout-creative-2 .-grid-item:nth-of-type(4n+3) .gr-item-inner").each(function() {
				var $this = $(this);
				gsap.to($this, {
					yPercent: -50,
					ease: "none",
					scrollTrigger: {
						trigger: $this,
						start: "top bottom",
						end: "bottom top",
						scrub: true,
						markers: false,
					}, 
				});
			});
		}
	});


	// Appear on scroll
	// =================

	// zoom in
	$(".anim-zoomin").each(function() {

		// Add wrap <div>.
		$(this).wrap('<div class="anim-zoomin-wrap"></div>');

		// Add overflow hidden.
		$(".anim-zoomin-wrap").css({ "overflow": "hidden" })

		var $this = $(this);
		var $asiWrap = $this.parents(".anim-zoomin-wrap");

		let tl_ZoomIn = gsap.timeline({
			scrollTrigger: {
				trigger: $asiWrap,
				start: "top 90%",
				markers: false,
				onEnter: () => animZoomInRefresh(),
			}
		});
		tl_ZoomIn.from($this, { duration: 1.5, autoAlpha: 0, scale: 1.2, ease: Power2.easeOut, clearProps:"all" });

		// Refresh start/end positions on enter.
		function animZoomInRefresh() {
			ScrollTrigger.refresh();
		};
	});


	// fade in-up
	$(".anim-fadeinup").each(function() {
		let tl_FadeInUp = gsap.timeline({
			scrollTrigger: {
				trigger: this,
				start: "top bottom",
				markers: false
			}
		});

		tl_FadeInUp.from(this, { duration: 2.5, autoAlpha: 0, y: 100, ease: Expo.easeOut, clearProps:"all" }, "+=0.3");
	});


	// skew in-up
	$(".anim-skewinup").each(function() {
		let tl_SkewInUp = gsap.timeline({
			scrollTrigger: {
				trigger: this,
				start: "top bottom",
				markers: false
			}
		});

		tl_SkewInUp.from(this, { duration: 2, skewY: 5, transformOrigin: "left top", autoAlpha: 0, y: 100, ease: Expo.easeOut, clearProps:"all" }, "+=0.3");
	});


	// stretch in-up
	$(".anim-stretchinup").each(function() {
		let tl_StretchInUp = gsap.timeline({
			scrollTrigger: {
				trigger: this,
				start: "top bottom",
				markers: false
			}
		});

		tl_StretchInUp.from(this, { duration: 2, autoAlpha: 0, y: 100, scaleY: 1.4, transformOrigin: "top", ease: Expo.easeOut, clearProps:"all" }, "+=0.2");
	});



	// ================================================================
	// Portfolio list
	// ================================================================

	// Play video on hover
	$(".pli-image-link").on("mouseenter", function() {
		$(this).find("video").each(function() {
			$(this).get(0).play();
		}); 
	}).on("mouseleave", function() {
		$(this).find("video").each(function() {
			$(this).get(0).pause();
		});
	});

	// Item image zoom on hover
	$(".portfolio-list-item").each(function() {
		if ($(".portfolio-list").hasClass("pli-hover")) {
			$(this).find(".pli-image img").wrap('<div class="pli-image-hover-zoom"></div>');
		}
	});



	// ================================================================
	// Portfolio interactive
	// ================================================================

	if(!isMobile) { // No effect on mobile devices!

		if ($(".portfolio-interactive").hasClass("pi-force-scroll")) {

			// Clone hover title (no effect on mobile devices!).
			$(".pi-item-hover-title").each(function() {
				var $this = $(this);
				$this.wrapInner('<span></span>');

				// Clone hover title
				var $piHoverTitle = $($this).find("span");
				for (var i = 0; i < 5; i++) {
					$piHoverTitle.clone().insertAfter($piHoverTitle);
				}
			});

		} else {

			// If the hover title is wider than the parent element.
			$(".pi-item-hover-title").each(function() {
				var $this = $(this);
				if ($this.width() > $this.parent().width()) {
					$this.wrapInner('<span></span>');
					
					// Clone hover title
					var $pnHoverTitle = $($this).find("span");
					for (var i = 0; i < 1; i++) {
						$pnHoverTitle.clone().insertAfter($pnHoverTitle);
					}
				}
			});
		}

		// Title on link hover.
		$(".portfolio-interactive-item").each(function() {
			$(this).find(".pi-item-title-link").on("mouseenter", function() {
				$(this).parent().addClass("pi-item-hover");
			}).on("mouseleave", function() {
				$(this).parent().removeClass("pi-item-hover");
			});
		});

		// Hover scrolling speed.
		$(".portfolio-interactive-item").each(function() {
			var $piHoverSpeed = $(this).data("scroll-speed");
			$(this).find(".pi-item-hover-title span").css({ 
				"animation-duration": $piHoverSpeed + "s",
			});
		});
		
	}



	// ================================================================
	// Portfolio grid
	// ================================================================

	// If "pgi-cap-inside enabled
	// ===========================
	if ($("#portfolio-grid").hasClass("pgi-cap-inside")) {

		// Move "pgi-caption" to inside "pgi-image-wrap".
		$(".portfolio-grid-item").each(function() {
			$(this).find(".pgi-caption").appendTo($(this).find(".pgi-image-wrap"));
		});

		// Remove grid item title anchor tag if exist.
		if ($(".pgi-title a").length) {
			$(".pgi-title a").contents().unwrap();
		}
	}


	// Play video on hover
	// ====================
	$(".pgi-image-wrap").on("mouseenter", function() {
		$(this).find("video").each(function() {
			$(this).get(0).play();
		}); 
	}).on("mouseleave", function() {
		$(this).find("video").each(function() {
			$(this).get(0).pause();
		});
	});


	// Portfolio grid categories filter
	// =================================
	$(".gr-cat-nav").appendTo("#body-inner");

	// On category trigger click.
	$(".gr-cat-trigger").on("click", function() {
		$("body").addClass("ttgr-cat-nav-open");
		if ($("body").hasClass("ttgr-cat-nav-open")) {

			gsap.to(".portfolio-grid-item", { duration: 0.3, scale: 0.9 });
			gsap.to(".pgi-caption, .gr-cat-trigger", { duration: 0.3, autoAlpha: 0 });

			// Make "ttgr-cat-nav" unclickable.
			$(".gr-cat-nav").off("click");

			// Catecories step in animations.
			var tl_ttgrIn = gsap.timeline({
				// Wait until the timeline is completed then make "ttgr-cat-nav" clickable again.
				onComplete: function() {  
					ttCatNavClose();
				}
			});
			tl_ttgrIn.to(".gr-cat-nav", { duration: 0.3, autoAlpha: 1 });
			tl_ttgrIn.from(".gr-cat-list > li", { duration: 0.3, y: 80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeOut, clearProps:"all" });

			// On catecory link click
			$(".gr-cat-nav a")
			.not('[target="_blank"]') // omit from selection
			.not('[href^="#"]') // omit from selection
			.not('[href^="mailto"]') // omit from selection
			.not('[href^="tel"]') // omit from selection
			.on('click', function() {
				gsap.to(".gr-cat-list > li", { duration: 0.3, y: -80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn });
			});
		}
	});

	// On close click function
	function ttCatNavClose() {
		$(".gr-cat-nav").on("click", function() {
			$("body").removeClass("ttgr-cat-nav-open");

			// Catecories step out animations
			var tl_ttgrClose = gsap.timeline();
				 tl_ttgrClose.to(".gr-cat-list > li", { duration: 0.3, y: -80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn });
				 tl_ttgrClose.to(".gr-cat-nav", { duration: 0.3, autoAlpha: 0, clearProps:"all" }, "+=0.2");
				 tl_ttgrClose.to(".portfolio-grid-item", { duration: 0.3, scale: 1, clearProps:"all" }, "-=0.4");
				 tl_ttgrClose.to(".pgi-caption, #page-header, .gr-cat-trigger", { duration: 0.3, autoAlpha: 1, clearProps:"all" }, "-=0.4");
				 tl_ttgrClose.to(".gr-cat-list > li", { clearProps:"all" }); // clearProps only
		});
	}



	// ================================================================
	// Gallery
	// ================================================================

	// Play video on hover
	$(".-gallery-video-wrap").on("mouseenter", function() {
		$(this).find("video").each(function() {
			$(this).get(0).play();
		}); 
	}).on("mouseleave", function() {
		$(this).find("video").each(function() {
			$(this).get(0).pause();
		});
	});

	// Gallery item image zoom on hover
	$(".-gallery-item").each(function() {
		if ($(".-gallery").hasClass("ttga-hover")) {
			$(this).find(".-gallery-image img").wrap('<div class="gallery-image-hover-zoom"></div>');
		}
	});



	// ================================================================
	// Accordion
	// ================================================================

	$(".accordion").each(function() {

		// If accordion content has class "is-open"
		$(this).find(".accordion-item").each(function() {
			var $this = $(this);

			if ($this.find(".accordion-content").hasClass("is-open")) {
				$this.addClass("active");
			}
		});

		// Accordion item on click
		$(this).find(".accordion-heading").on("click", function() {
			var $this = $(this);

			if ($this.parents(".accordion-item").hasClass("active")) {
				$this.parents(".accordion-item").removeClass("active");
				$this.next(".accordion-content").slideUp(350);
			} else {
				$this.parent().parent().find(".accordion-item").removeClass("active");
				$this.parent().parent().find(".accordion-content").slideUp(350);
				$this.parents(".accordion-item").toggleClass("active");
				$this.next(".accordion-content").slideToggle(350);
			}
			return false;
		});
	});

		// Scrolling button
	// =================
	if ($(".scrolling-btn").length) {
		$(".scrolling-btn").each(function() {
			var $this = $(this);
			var $scrBtnSvg = $this.find(".scr-btn-spinner");
			gsap.from($scrBtnSvg, {
				rotate: 240,
				ease: "none",
				scrollTrigger: {
					trigger: $scrBtnSvg,
					start: "-40% bottom",
					end: "120% top",
					scrub: true,
					markers: false,
				}, 
			});
		});
	}




	// =======================================================================================
	// Tabs
	// =======================================================================================

	$(".-tabs").each(function() {
		$(this).find(".-tab-btn").on("click", function() {

			// Active/deactivate tab buttons
			var $TabButton = $(this);
			var $Tabs = $TabButton.parents(".-tabs");

			$Tabs.find(".-tab-btn").removeClass("active");
			$TabButton.addClass("active");

			// Show/hide tab content
			var $TabName = $TabButton.attr("data-content-id");

			$Tabs.find(".-tab-content").removeClass("active");
			$Tabs.find(".-tab-content-wrap #" + $TabName).addClass("active");
			
		});
	});



	// ================================================================
	// Page nav
	// ================================================================

	if(!isMobile) { // No effect on mobile devices!

		if ($(".-page-nav").hasClass("pn-scroll")) {

			$(".-page-nav").find(".-pn-hover-title").each(function() {
				var $this = $(this);
				$this.wrapInner('<span></span>');

				// Clone hover title
				var $pnHoverTitle = $($this).find("span");
				for (var i = 0; i < 7; i++) {
					$pnHoverTitle.clone().insertAfter($pnHoverTitle);
				}
			});

		} else {

			// If the hover title is wider than the parent element.
			$(".-page-nav").find(".-pn-hover-title").each(function() {
				var $this = $(this);
				if ($this.width() > $this.parent().width()) {
					$this.wrapInner('<span></span>');
					
					// Clone hover title
					var $pnHoverTitle = $($this).find("span");
					for (var i = 0; i < 7; i++) {
						$pnHoverTitle.clone().insertAfter($pnHoverTitle);
					}
				}
			});
		}
		
	}



	// ==================================
	// Sidebar (classic)
	// ==================================

	// If sidebar exist.
	if ($(".-sidebar").length) {

		$("body").addClass("sidebar-on");

		// If sidebar has class "sidebar-left" add class "sidebar-left-on" to <pody>.
		if ($(".-sidebar").hasClass("sidebar-left")) {
			$("body").addClass("sidebar-left-on");
		}

		// If sidebar has class "sidebar-right" add class "sidebar-right-on" to <pody>.
		if ($(".-sidebar").hasClass("sidebar-right")) {
			$("body").addClass("sidebar-right-on");
		}

		
		// Sidebar for small screen
		// =========================

		// Wrap sidebar.
		$(".-sidebar").wrap('<div class="sidebar-holder"><div class="sidebar-wrap"></div></div>');

		// Append sidebar cover and trigger
		$(".-sidebar-wrap").append('<div class="sidebar-cover"></div> <div class="sidebar-trigger"><span class="str-icon"><i class="fas fa-align-justify"></i></span><span class="str-icon-close"><i class="fas fa-times"></i></span></div>');

		// Prepend sidebar top close button.
		$(".-sidebar").prepend('<div class="sidebar-close-btn"><i class="fas fa-times"></i></div>');

		// Move sidebar trigger into "header-tools-dynamic" if window width is 768px or smaller.
		if ($(".-header-tools-dynamic").length) {
			function ttMoveSidebarTriggerToHtd() {
				if (window.matchMedia("(max-width: 768px)").matches) {
					if ($(".to-shop-list-btn-wrap").length) {
						$(".-sidebar-trigger").insertAfter(".to-shop-list-btn-wrap");
					} else {
						$(".-sidebar-trigger").prependTo(".-header-tools-dynamic");
					}
				} else {
					$(".-sidebar-trigger").appendTo(".-sidebar-wrap");
				}
			}
			ttMoveSidebarTriggerToHtd();
			$(window).resize(function() {
				ttMoveSidebarTriggerToHtd();
			});
		}

		// Move sidebar trigger into "ph-share" if window width is 768px or smaller.
		if ($(".ph-share").length) {
			function ttMoveSidebarTriggerToPhShare() {
				if (window.matchMedia("(max-width: 768px)").matches) {
					$(".-sidebar-trigger").prependTo(".ph-share");
				} else {
					$(".-sidebar-trigger").appendTo(".-sidebar-wrap");
				}
			}
			ttMoveSidebarTriggerToPhShare();
			$(window).resize(function() {
				ttMoveSidebarTriggerToPhShare();
			});
		}

		// Append sidebar if the window width is 991px or smaller.
		function ttSidebarPosition() {
			if (window.matchMedia("(max-width: 991px)").matches) {
				$(".-sidebar-wrap").appendTo("#body-inner");
			} else {
				$(".-sidebar-wrap").prependTo(".-sidebar-holder");
			}
		}
		ttSidebarPosition();
		$(window).resize(function() {
			ttSidebarPosition();
		});

		// Open/close sidebar.
		$(".-sidebar-trigger").on("click", function() {
			$("body").toggleClass("sidebar-open");
		}); 
		$(".-sidebar-close-btn, .-sidebar-cover").on("click", function() {
			$("body").removeClass("sidebar-open");
		}); 
	}



	// ==================================
	// Sliding sidebar
	// ==================================

	// If sliding sidebar exist.
	if ($(".-sliding-sidebar-wrap").length) {

		$("body").addClass("sliding-sidebar-on, sliding-sidebar-left-on");  // left position is by default.

		// Append sliding sidebar.
		$(".-sliding-sidebar-wrap").appendTo("#body-inner");

		// Prepend top close button.
		$(".-sliding-sidebar").prepend('<div class="sliding-sidebar-close-btn"><i class="fas fa-times"></i></div>');

		// Top close button hover
		$(".-sliding-sidebar-close-btn").on("mouseenter", function() {
			gsap.to($ball, { duration: 0.3, scale: 0, opacity: 0 });
		}).on("mouseleave", function() {
			gsap.to($ball, { duration: 0.3, scale: $ballScale, opacity: $ballOpacity });
		});

		// Move sliding sidebar trigger into "header-tools-dynamic" if window width is 768px or smaller.
		if ($(".-header-tools-dynamic").length) {
			function ttMoveSlidingSidebarTriggerToHtd() {
				if (window.matchMedia("(max-width: 768px)").matches) {
					if ($(".to-shop-list-btn-wrap").length) {
						$(".-sliding-sidebar-trigger").insertAfter(".to-shop-list-btn-wrap");
					} else {
						$(".-sliding-sidebar-trigger").prependTo(".-header-tools-dynamic");
					}
				} else {
					$(".-sliding-sidebar-trigger").appendTo(".-sidebar-wrap");
				}
			}
			ttMoveSlidingSidebarTriggerToHtd();
			$(window).resize(function() {
				ttMoveSlidingSidebarTriggerToHtd();
			});
		}

		// Move sliding sidebar trigger into "ph-share" if window width is 768px or smaller.
		if ($(".ph-share").length) {
			function ttMoveSidebarTriggerToPhShare() {
				if (window.matchMedia("(max-width: 768px)").matches) {
					$(".-sliding-sidebar-trigger").prependTo(".ph-share");
				} else {
					$(".-sliding-sidebar-trigger").appendTo(".-sliding-sidebar-wrap");
				}
			}
			ttMoveSidebarTriggerToPhShare();
			$(window).resize(function() {
				ttMoveSidebarTriggerToPhShare();
			});
		}

		// Open/close sliding sidebar.
		$(".-sliding-sidebar-trigger").on("click", function() {
			$("body").toggleClass("sliding-sidebar-open");
		}); 
		$(".-sliding-sidebar-close, .-sliding-sidebar-close-btn").on("click", function() {
			$("body").removeClass("sliding-sidebar-open");
		});

		// If sliding sidebar has class "ss-right" add class "ss-right-on" to <pody>.
		if ($(".-sliding-sidebar-wrap").hasClass("ss-right")) {
			$("body").removeClass("sliding-sidebar-left-on");
			$("body").addClass("sliding-sidebar-right-on");
		}
	}



	// ==================================
	// Scrolling text
	// ==================================

	// Hover scrolling speed.
	$(".scrolling-text").each(function() {
		var $_stSpeed = $(this).data("scroll-speed");
		$(this).find(".scrolling-text-inner").css({ 
			"animation-duration": $_stSpeed + "s",
		});
	});



	// ================================================================
	// Scroll between anchors 
	// Requires "Smooth Scrollbar" (https://github.com/idiotWu/smooth-scrollbar/blob/develop/docs/api.md#scrollbarscrollintoview)
	// ================================================================

	$('a[href^="#"]')
		.not('[href$="#"]') // omit from selection
		.not('[href$="#0"]') // omit from selection
		.on("click", function() {

		var target = this.hash;

		// If fixed header position enabled.
		if ($("#header").hasClass("header-fixed")) {
			var $offset = $("#header").height();
		} else {
			var $offset = 0;
		}

		// You can use data attribute (for example: data-offset="100") to set top offset in HTML markup if needed. 
		if ($(this).data("offset") != undefined) $offset = $(this).data("offset");
		
		if(!isMobile) { // Not for mobile devices!
			if ($("body").hasClass("smooth-scroll")) {
				var topY = $(target).offset().top - $("#scroll-container > .scroll-content").offset().top - $offset;
				var $scrollbar = Scrollbar.init(document.getElementById("scroll-container"));
				gsap.to($scrollbar, { duration: 1.5, scrollTo: { y: topY, autoKill: true }, ease: Expo.easeInOut });

			} else {
				var topY = $(target).offset().top - $("body").offset().top - $offset;
				$("html,body").animate({scrollTop: topY}, 800);
			}
		} else {
			var topY = $(target).offset().top - $("body").offset().top - $offset;
			$("html,body").animate({scrollTop: topY}, 800);
		}
		return false;
	});



	// ================================================================
	// Scroll to top 
	// Requires "GSAP ScrollToPlugin" (https://greensock.com/docs/v2/Plugins/ScrollToPlugin)
	// ================================================================

	$(".scroll-to-top").on("click", function() {
		if(!isMobile) { // Not for mobile devices!
			if ($("body").hasClass("smooth-scroll")) {
				var $scrollbar = Scrollbar.init(document.getElementById("scroll-container"));
				gsap.to($scrollbar, { duration: 1.5, scrollTo: { y: 0, autoKill: true }, ease: Expo.easeInOut });
			} else {
				$("html,body").animate({scrollTop: 0}, 800);
			}
		} else {
			$("html,body").animate({scrollTop: 0}, 800);
		}
		return false;
	}); 



	// =======================================================================================
	// Defer videos (Youtube, Vimeo)
	// Note: When you have embed videos in your webpages it causes your page to load slower.
	// Deffering will allow your page to load quickly.
	// Source: https://www.feedthebot.com/pagespeed/defer-videos.html
	// =======================================================================================

	function init() {
	var vidDefer = document.getElementsByTagName("iframe");
	for (var i=0; i<vidDefer.length; i++) {
	if(vidDefer[i].getAttribute("data-src")) {
	vidDefer[i].setAttribute("src",vidDefer[i].getAttribute("data-src"));
	} } }
	window.onload = init;



	// ================================================================
	// Forms
	// ================================================================

	// Remove input placeholder on focus
	$("input,textarea").focus(function () {
		$(this).data("placeholder", $(this).attr("placeholder")).attr("placeholder", "");
	}).blur(function () {
		$(this).attr("placeholder", $(this).data("placeholder"));
	}); 

	// Form "Browse File" button info
	$(document).on("change", ":file", function() {
		var input = $(this),
		numFiles = input.get(0).files ? input.get(0).files.length : 1,
		label = input.val().replace(/\\/g, "/").replace(/.*\//, "");
		input.trigger("fileselect", [numFiles, label]);
	});
	$(":file").on("fileselect", function(event, numFiles, label) {
		var input = $(this).parents(".-form-file").find(".-file-info"),
		log = numFiles > 1 ? numFiles + " files selected" : label;

		if( input.length ) {
			input.val(log);
		} else {
			if( log ) alert(log);
		}
	});



   // ========================================
	// Universal PHP Mail Feedback Script 
	// (https://github.com/agragregra/uniMail)
	// ========================================

	// E-mail Ajax Send
	$("#contact-form").submit(function() { // Change (your contact form ID)
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", // Change (mail.php path)
			data: th.serialize()
		}).done(function() {
			alert("Thank you. Your message has been sent!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 800);
		});
		return false;
	});



	// =======================================================================================
	// Magic cursor (no effect on small screens!)
	// https://codepen.io/Sahil89/pen/MQbdNR
	// https://greensock.com/forums/topic/17490-follow-button-effect/?tab=comments#comment-81107
	// =======================================================================================
	
	if ($("body").not(".is-mobile").hasClass("magic-cursor")) {
		if ($(window).width() > 1024) {
			$(".magnetic-item").wrap('<div class="magnetic-wrap"></div>');
			
			if ($("a.magnetic-item").length) {
				$("a.magnetic-item").addClass("not-hide-cursor");
			}

			var $mouse = { x: 0, y: 0 }; // Cursor position
			var $pos = { x: 0, y: 0 }; // Cursor position
			var $ratio = 0.15; // delay follow cursor
			var $active = false;
			var $ball = $("#ball");

			var $ballWidth = 34; // Ball default width
			var $ballHeight = 34; // Ball default height
			var $ballScale = 1; // Ball default scale
			var $ballOpacity = 0.5; // Ball default opacity
			var $ballBorderWidth = 2; // Ball default border width

			gsap.set($ball, {  // scale from middle and style ball
				xPercent: -50, 
				yPercent: -50, 
				width: $ballWidth,
				height: $ballHeight,
				borderWidth: $ballBorderWidth, 
				opacity: $ballOpacity 
			});

			document.addEventListener("mousemove", mouseMove);

			function mouseMove(e) {
				$mouse.x = e.clientX;
				$mouse.y = e.clientY;
			}

			gsap.ticker.add(updatePosition);

			function updatePosition() {
				if (!$active) {
					$pos.x += ($mouse.x - $pos.x) * $ratio;
					$pos.y += ($mouse.y - $pos.y) * $ratio;

					gsap.set($ball, { x: $pos.x, y: $pos.y });
				}
			}

			$(".magnetic-wrap").mousemove(function(e) {
				parallaxCursor(e, this, 2); // magnetic ball = low number is more attractive
				callParallax(e, this);
			});

			function callParallax(e, parent) {
				parallaxIt(e, parent, parent.querySelector(".magnetic-item"), 25); // magnetic area = higher number is more attractive
			}

			function parallaxIt(e, parent, target, movement) {
				var boundingRect = parent.getBoundingClientRect();
				var relX = e.clientX - boundingRect.left;
				var relY = e.clientY - boundingRect.top;

				gsap.to(target, {
					duration: 0.3, 
					x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
					y: ((relY - boundingRect.height / 2) / boundingRect.height) * movement,
					ease: Power2.easeOut
				});
			}

			function parallaxCursor(e, parent, movement) {
				var rect = parent.getBoundingClientRect();
				var relX = e.clientX - rect.left;
				var relY = e.clientY - rect.top;
				$pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
				$pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
				gsap.to($ball, {duration: 0.3, x: $pos.x, y: $pos.y });
			}


			// Magic cursor behavior
			// ======================

			// Magnetic item hover.
			$(".magnetic-wrap").on("mouseenter", function(e) {
				gsap.to($ball, { duration: 0.3, scale: 2, borderWidth: 1, opacity: $ballOpacity });
				$active = true;
			}).on("mouseleave", function(e) {
				gsap.to($ball, { duration: 0.3, scale: $ballScale, borderWidth: $ballBorderWidth, opacity: $ballOpacity });
				gsap.to(this.querySelector(".magnetic-item"), { duration: 0.3, x: 0, y: 0, clearProps:"all" });
				$active = false;
			});

			// Alternative cursor style on hover.
			$(".cursor-alter, .-main-menu-list > li > a, .-main-menu-list > li > .-submenu-trigger > a")
			.not(".magnetic-item") // omit from selection.
			.on("mouseenter", function() {
				gsap.to($ball, {
					duration: 0.3, 
					borderWidth: 0, 
					opacity: 0.2, 
					backgroundColor: "#CCC", 
					width: "100px", 
					height: "100px", 
				});
			}).on("mouseleave", function() {
				gsap.to($ball, {
					duration: 0.3, 
					borderWidth: $ballBorderWidth, 
					opacity: $ballOpacity, 
					backgroundColor: "transparent", 
					width: $ballWidth, 
					height: $ballHeight, 
					clearProps:"backgroundColor" 
				});
			});

			// Overlay menu caret hover.
			$(".-ol-submenu-caret-wrap .magnetic-wrap").on("mouseenter", function() {
				gsap.to($ball, { duration: 0.3, scale: 1.3, borderWidth: $ballBorderWidth });
			}).on("mouseleave", function() {
				gsap.to($ball, { duration: 0.3, scale: $ballScale });
			});

			// Cursor view on hover (data attribute "data-cursor="...").
			$("[data-cursor]").each(function() {
				$(this).on("mouseenter", function() {
					$ball.append('<div class="ball-view"></div>');
					$(".ball-view").append($(this).attr("data-cursor"));
					gsap.to(ball, { duration: 0.3, yPercent: -75, width: 95, height: 95, opacity: 1, borderWidth: 0, backgroundColor: "#FFF" });
					gsap.to(".ball-view", { duration: 0.3, scale: 1, autoAlpha: 1 });
				}).on("mouseleave", function() {
					gsap.to(ball, { duration: 0.3, yPercent: -50, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity, borderWidth: $ballBorderWidth, backgroundColor: "transparent" });
					gsap.to(".ball-view", { duration: 0.3, scale: 0, autoAlpha: 0, clearProps:"all" });
					$ball.find(".ball-view").remove();
				});
				$(this).addClass("not-hide-cursor");
			});

			// Cursor drag on hover (class "cursor-drag"). For Swiper sliders.
			$(".swiper").each(function() {
				if ($(this).parent().attr("data-simulate-touch") == "true") {
					if ($(this).parent().hasClass("cursor-drag")) {
						$(this).on("mouseenter", function() {
							$ball.append('<div class="ball-drag"></div>');
							gsap.to($ball, { duration: 0.3, width: 60, height: 60, opacity: 1 });
						}).on("mouseleave", function() {
							$ball.find(".ball-drag").remove();
							gsap.to($ball, { duration: 0.3, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity });
						});
						$(this).addClass("not-hide-cursor");

						// Ignore "data-cursor" on hover.
						$(this).find("[data-cursor]").on("mouseenter mouseover", function() {
							$ball.find(".ball-drag").remove();
							return false;
						}).on("mouseleave", function() {
							$ball.append('<div class="ball-drag"></div>');
							gsap.to($ball, { duration: 0.3, width: 60, height: 60, opacity: 1 });
						});
					}
				}
			});
			
			// Cursor drag on mouse down / click and hold effect (class "cursor-drag-mouse-down"). For Swiper sliders.
			$(".swiper").each(function() {
				if ($(this).parent().attr("data-simulate-touch") == "true") {
					if ($(this).parent().hasClass("cursor-drag-mouse-down")) {
						$(this).on("mousedown pointerdown", function(e) {
							if (e.which === 1) { // Affects the left mouse button only!
								gsap.to($ball, { duration: 0.2, width: 60, height: 60, opacity: 1 });
								$ball.append('<div class="ball-drag"></div>');
							}
						}).on("mouseup pointerup", function() {
							$ball.find(".ball-drag").remove();
							if ($(this).find("[data-cursor]:hover").length) {
							} else {
								gsap.to($ball, { duration: 0.2, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity });
							}
						}).on("mouseleave", function() {
							$ball.find(".ball-drag").remove();
							gsap.to($ball, { duration: 0.2, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity });
						});

						// Ignore "data-cursor" on mousedown.
						$(this).find("[data-cursor]").on("mousedown pointerdown", function() {
							return false;
						});

						// Ignore "data-cursor" on hover.
						$(this).find("[data-cursor]").on("mouseenter mouseover", function() {
							$ball.find(".ball-drag").remove();
							return false;
						});
					}
				}
			});

			// Cursor close on hover.
			$(".cursor-close").each(function() {
				$(this).on("mouseenter", function() {
					$ball.addClass("ball-close-enabled");
					$ball.append('<div class="ball-close">Close</div>');
					gsap.to($ball, { duration: 0.3, yPercent: -75, width: 80, height: 80, opacity: 1 });
					gsap.from(".ball-close", { duration: 0.3, scale: 0, autoAlpha: 0 });
				}).on("mouseleave click", function() {
					$ball.removeClass("ball-close-enabled");
					gsap.to($ball, { duration: 0.3, yPercent: -50, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity });
					$ball.find(".ball-close").remove();
				});

				// Hover on "cursor-close" inner elements.
				$(".cursor-close a, .cursor-close button, .cursor-close .-btn, .cursor-close .hide-cursor")
				.not(".not-hide-cursor") // omit from selection (class "not-hide-cursor" is for global use).
				.on("mouseenter", function() {
					$ball.removeClass("ball-close-enabled");
				}).on("mouseleave", function() {
					$ball.addClass("ball-close-enabled");
				});
			});

			// Portfolio interactive title link hover.
			$(".portfolio-interactive-item").each(function() {
				var $piItem = $(this);
				if ($(this).find(".pi-item-image").length) {
					$piItem.find(".pi-item-title-link").on("mouseenter mouseover", function() {
						$("#magic-cursor").addClass("portfolio-interactive-hover-on");
						$piItem.find(".pi-item-image").appendTo($ball);
						gsap.to($ball, { duration: 0.3, width: "20vw", height: "20vw", opacity: 1 });
						$ball.find(".pi-item-image video").each(function() {
							$(this).get(0).play();
						}); 
					}).on("mouseleave", function() {
						$("#magic-cursor").removeClass("portfolio-interactive-hover-on");
						$ball.find(".pi-item-image").appendTo($piItem); 
						gsap.to($ball, { duration: 0.3, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity });
						$piItem.find('.pi-item-image video').each(function() {
							$(this).get(0).pause();
						}); 
					});
					$(this).find(".pi-item-title-link").addClass("not-hide-cursor");
				}
			});

			// Blog interactive title link hover.
			$(".blog-interactive-item").each(function() {
				var $biItem = $(this);
				if ($biItem.find(".bi-item-image").length) {
					$biItem.find(".bi-item-title a").on("mouseenter mouseover", function() {
						$("#magic-cursor").addClass("blog-interactive-hover-on");
						$biItem.find(".bi-item-image").appendTo($ball);
						gsap.to($ball, { duration: 0.3, width: "20vw", height: "20vw", opacity: 1 });
					}).on("mouseleave", function() {
						$("#magic-cursor").removeClass("blog-interactive-hover-on");
						$ball.find(".bi-item-image").appendTo($biItem); 
						gsap.to($ball, { duration: 0.3, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity });
					});
					$biItem.find(".bi-item-title a").addClass("not-hide-cursor");
					$biItem.addClass("bi-item-image-on");
				}
			});

			// Page nav hover.
			$(".-page-nav").each(function() {
				if ($(this).find(".-pn-image").length) {
					$(this).find(".-pn-link").on("mouseenter mouseover", function() {
						$("#magic-cursor").addClass("pn-hover-on");
						$(this).parent().find(".-pn-image").appendTo($ball);
						gsap.to($ball, { duration: 0.3, width: "20vw", height: "20vw", opacity: 1 });
						$ball.find(".-pn-image video").each(function() {
							$(this).get(0).play();
						}); 
					}).on("mouseleave", function() {
						$("#magic-cursor").removeClass("pn-hover-on");
						$ball.find(".-pn-image").appendTo(this);
						gsap.to($ball, { duration: 0.3, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity });
						
						$(this).parent().find('.-pn-image video').each(function() {
							$(this).get(0).pause();
						}); 
					});
					$(this).find(".-pn-link").addClass("not-hide-cursor");
				} else {
					$(this).find(".-pn-link").removeClass("not-hide-cursor");
				}
			});

			
			// Show/hide magic cursor
			// =======================

			// Hide on hover.
			$("a, button, .-btn, .-form-control, .-form-radio, .-form-check, .hide-cursor") // class "hide-cursor" is for global use.
			.not(".not-hide-cursor") // omit from selection (class "not-hide-cursor" is for global use).
			.not(".cursor-alter") // omit from selection
			.not(".-main-menu-list > li > a") // omit from selection
			.not(".-main-menu-list > li > .-submenu-trigger > a") // omit from selection
			.on("mouseenter", function() {
				gsap.to($ball, { duration: 0.3, scale: 0, opacity: 0 });
			}).on("mouseleave", function() {
				gsap.to($ball, { duration: 0.3, scale: $ballScale, opacity: $ballOpacity });
			});

			// Hide on click.
			$("a")
				.not('[target="_blank"]') // omit from selection.
				.not('[href^="#"]') // omit from selection.
				.not('[href^="mailto"]') // omit from selection.
				.not('[href^="tel"]') // omit from selection.
				.not(".lg-trigger") // omit from selection.
				.not(".-btn-disabled a") // omit from selection.
				.on('click', function() {
					gsap.to($ball, { duration: 0.3, scale: 1.3, autoAlpha: 0 });
			});

			// Show/hide on document leave/enter.
			$(document).on("mouseleave", function() {
				gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 0 });
			}).on("mouseenter", function() {
				gsap.to("#magic-cursor", {duration: 0.3, autoAlpha: 1 });
			});

			// Show as the mouse moves.
			$(document).mousemove(function() {
				gsap.to("#magic-cursor", {duration: 0.3, autoAlpha: 1 });
			});
		}
	}



	// ================================================================
	// Miscellaneous
	// ================================================================

	// Button disabled (prevent click)
	// ===================
	$(".-btn-disabled").find("a").on("click", function() {
		return false;
	});


	// Force page scroll position to top on refresh (do not remove!)
	// =============================================
	$(window).on("pagehide", function(){
		$(window).scrollTop(0);
	});


	// Hover fix for iOS
	// ==================
	$("*").on("touchstart",function() {
		$(this).trigger("hover");
	}).on("touchend",function() {
		$(this).trigger("hover");
	}); 

	window.addEventListener('scroll', function() {
    var header = document.getElementById('header');
    var blurredContent = document.querySelector('.blurred-content');
    var scrollPosition = window.scrollY;
    var headerOffset = header.offsetTop; // Get the offset position of the header from the top of the document
    var headerHeight = header.offsetHeight; // Get the height of the header

    // Calculate the bottom position of the header
    var headerBottom = headerOffset + headerHeight;

    if (scrollPosition > headerBottom) {
        blurredContent.classList.add('blurred');
    } else {
        blurredContent.classList.remove('blurred');
    }
});

	// ================================================================
	// Projects Expander (CodePen-style options)
	// ================================================================

	if ($(".mbm-projects-expander").length) {

		$(".mbm-projects-expander").each(function () {
			var $root = $(this);
			var $options = $root.find(".mbm-option");

			// Ensure one default active card (first if none set)
			if ($options.filter(".is-active").length === 0) {
				$options.first().addClass("is-active").attr("aria-selected", "true");
			}

			// Normalize aria-selected
			$options.not(".is-active").attr("aria-selected", "false");

			// Click behavior:
			// - Click activates
			// - Clicking an already-active item navigates if data-link is set
			$options.on("click", function (e) {
				var $btn = $(this);
				var link = $btn.data("link");

				if ($btn.hasClass("is-active") && link) {
					window.location.href = link;
					return;
				}

				$options.removeClass("is-active").attr("aria-selected", "false");
				$btn.addClass("is-active").attr("aria-selected", "true");
			});

			// Optional: keyboard arrow navigation (left/right)
			$options.on("keydown", function (e) {
				var key = e.key || e.which;
				if (key !== "ArrowLeft" && key !== "ArrowRight" && key !== 37 && key !== 39) return;

				e.preventDefault();

				var idx = $options.index(this);
				var nextIdx = (key === "ArrowRight" || key === 39) ? idx + 1 : idx - 1;

				if (nextIdx < 0) nextIdx = $options.length - 1;
				if (nextIdx >= $options.length) nextIdx = 0;

				$options.eq(nextIdx).trigger("click").trigger("focus");
			});
		});

	}

	/* ==========================================================
   MBM Service Cards – pointer tracking
   Safe to append to existing JS file
   ========================================================== */

(function () {
  // Run after DOM is ready, even if this file loads in <head>
  const initServiceCards = () => {
    const cards = document.querySelectorAll('.mbm-card');
    if (!cards.length) return; // page doesn't have cards

    const update = (event) => {
      const x = event.clientX;
      const y = event.clientY;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const rx = (x - cx) / (rect.width / 2);
        const ry = (y - cy) / (rect.height / 2);

        card.style.setProperty('--pointer-x', rx.toFixed(3));
        card.style.setProperty('--pointer-y', ry.toFixed(3));
      });
    };

    document.addEventListener('pointermove', update, { passive: true });

    document.addEventListener('pointerleave', () => {
      cards.forEach((card) => {
        card.style.setProperty('--pointer-x', -10);
        card.style.setProperty('--pointer-y', -10);
      });
    });
  };

  // DOM-ready guard (works everywhere)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServiceCards, { once: true });
  } else {
    initServiceCards();
  }
})();

// Portfolio Teaser v2: preview swap (buttons only)
(() => {
  const root = document.querySelector(".mbm-portv2");
  if (!root) return;

  const items = Array.from(root.querySelectorAll(".mbm-portv2-item"));
  const img = root.querySelector("#mbmPortPreviewImg");

  if (!items.length) {
    console.warn("[mbm-portv2] No .mbm-portv2-item elements found.");
    return;
  }
  if (!img) {
    console.warn("[mbm-portv2] #mbmPortPreviewImg not found.");
    return;
  }

  const setActive = (btn) => {
    if (!btn) return;

    items.forEach((el) => el.classList.toggle("is-active", el === btn));

    const nextSrc = btn.getAttribute("data-preview");
    if (!nextSrc) {
      console.warn("[mbm-portv2] Missing data-preview on item:", btn);
      return;
    }

    // Only update if changed
    if (img.getAttribute("src") !== nextSrc) {
      img.setAttribute("src", nextSrc);
    }
  };

  // Ensure we show something immediately on load
  const initial =
    items.find((el) => el.classList.contains("is-active")) || items[0];
  setActive(initial);

  // If the image fails to load, log it (path issues)
  img.addEventListener("error", () => {
    console.warn("[mbm-portv2] Preview image failed to load:", img.src);
  });

  // Hover (desktop) + focus (keyboard) + click (mobile)
  items.forEach((btn) => {
    btn.addEventListener("mouseenter", () => setActive(btn));
    btn.addEventListener("focus", () => setActive(btn));
    btn.addEventListener("click", () => setActive(btn));
  });
})();





})(jQuery); 

