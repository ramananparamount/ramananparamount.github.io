
(function($, window, document) {
    'use strict';
    var defaults = {
        maxWidth: 1100,
        transition: 'cubeV',
        customTransitions: [],
        fallback3d: 'sliceV',
        perspective: 1000,
        useThumbs: false,
        useArrows: true,
        thumbMargin: 3,
        autoPlay: false,
        delay: 5000,
        transitionDuration: 800,
        startSlide: 0,
        keyNav: true,
        captionWidth: 50,
        arrowTemplate: '<div class="rs-arrows"><a href="#" class="rs-prev">&lsaquo;</a><a href="#" class="rs-next">&rsaquo;</a></div>',
        onInit: function() {},
        onChange: function() {},
        afterChange: function() {}
    };

    function RS(elem, settings) {
        this.$slider = $(elem).addClass('rs-slider');
        this.settings = $.extend({}, defaults, settings);
        this.$slides = this.$slider.find('> li');
        this.totalSlides = this.$slides.length;
        this.cssTransitions = testBrowser.cssTransitions();
        this.cssTransforms3d = testBrowser.cssTransforms3d();
        this.currentPlace = this.settings.startSlide;
        this.$currentSlide = this.$slides.eq(this.currentPlace);
        this.inProgress = false;
        this.$sliderWrap = this.$slider.wrap('<div class="rs-wrap" />').parent();
        this.$sliderBG = this.$slider.wrap('<div class="rs-slide-bg" />').parent();
        this.settings.slider = this;
        this.init();
    }
    RS.prototype = {
        cycling: null,
        $slideImages: null,
        init: function() {
            this.settings.onInit();
            this.captions();
            if (this.settings.transition === 'custom') {
                this.nextAnimIndex = -1;
            }
            if (this.settings.useArrows) {
                this.setArrows();
            }
            if (this.settings.keyNav) {
                this.setKeys();
            }
            for (var i = 0; i < this.totalSlides; i++) {
                this.$slides.eq(i).addClass('rs-slide-' + i);
            }
            if (this.settings.autoPlay) {
                this.setAutoPlay();
                this.$slider.on({
                    mouseenter: $.proxy(function() {
                        if (this.cycling !== null) {
                            clearTimeout(this.cycling);
                        }
                    }, this),
                    mouseleave: $.proxy(this.setAutoPlay, this)
                });
            }
            this.$slideImages = this.$slides.find('img:eq(0)').addClass('rs-slide-image');
            this.setup();
        },
        setup: function() {
            this.$sliderWrap.css('width', this.settings.maxWidth);
            if (this.settings.useThumbs) {
                this.setThumbs();
            }
            this.$currentSlide.css({
                'opacity': 1,
                'z-index': 2
            });
        },
        setArrows: function() {
            var that = this;
            this.$sliderWrap.append(this.settings.arrowTemplate);
            $('.rs-next', this.$sliderWrap).on('click', function(e) {
                e.preventDefault();
                that.next();
            });
            $('.rs-prev', this.$sliderWrap).on('click', function(e) {
                e.preventDefault();
                that.prev();
            });
        },
        next: function() {
            if (this.settings.transition === 'custom') {
                this.nextAnimIndex++;
            }
            if (this.currentPlace === this.totalSlides - 1) {
                this.transition(0, true);
            } else {
                this.transition(this.currentPlace + 1, true);
            }
        },
        prev: function() {
            if (this.settings.transition === 'custom') {
                this.nextAnimIndex--;
            }
            if (this.currentPlace == 0) {
                this.transition(this.totalSlides - 1, false);
            } else {
                this.transition(this.currentPlace - 1, false);
            }
        },
        setKeys: function() {
            var that = this;
            $(document).on('keydown', function(e) {
                if (e.keyCode === 39) {
                    that.next();
                } else if (e.keyCode === 37) {
                    that.prev();
                }
            });
        },
        setAutoPlay: function() {
            var that = this;
            this.cycling = setTimeout(function() {
                that.next();
            }, this.settings.delay);
        },
        setThumbs: function() {
            var that = this,
                width = (100 - ((this.totalSlides - 1) * this.settings.thumbMargin)) / this.totalSlides + '%';
            this.$thumbWrap = $('<div class="rs-thumb-wrap" />').appendTo(this.$sliderWrap);
            for (var i = 0; i < this.totalSlides; i++) {
                var $thumb = $('<a />').css({
                    width: width,
                    marginLeft: this.settings.thumbMargin + '%'
                }).attr('href', '#').data('rs-num', i);
                this.$slideImages.eq(i).clone().removeAttr('style').appendTo(this.$thumbWrap).wrap($thumb);
            }
            this.$thumbWrapLinks = this.$thumbWrap.find('a');
            this.$thumbWrap.children().last().css('margin-right', -10);
            this.$thumbWrapLinks.eq(this.settings.startSlide).addClass('active');
            this.$thumbWrap.on('click', 'a', function(e) {
                e.preventDefault();
                that.transition(parseInt($(this).data('rs-num')));
            });
        },
        captions: function() {
            var that = this,
                $captions = this.$slides.find('.rs-caption');
            $captions.css({
                width: that.settings.captionWidth + '%',
                opacity: 0
            });
            this.$currentSlide.find('.rs-caption').css('opacity', 1);
            $captions.each(function() {
                $(this).css({
                    transition: 'opacity ' + that.settings.transitionDuration + 'ms linear',
                    backfaceVisibility: 'hidden'
                });
            });
        },
        transition: function(slideNum, forward) {
            if (!this.inProgress) {
                if (slideNum !== this.currentPlace) {
                    if (typeof forward === 'undefined') {
                        forward = slideNum > this.currentPlace ? true : false;
                    }
                    if (this.settings.useThumbs) {
                        this.$thumbWrapLinks.eq(this.currentPlace).removeClass('active');
                        this.$thumbWrapLinks.eq(slideNum).addClass('active');
                    }
                    this.$nextSlide = this.$slides.eq(slideNum);
                    this.currentPlace = slideNum;
                    this.settings.onChange();
                    new Transition(this, this.settings.transition, forward);
                }
            }
        }
    };

    function Transition(RS, transition, forward) {
        this.RS = RS;
        this.RS.inProgress = true;
        this.forward = forward;
        this.transition = transition;
        if (this.transition === 'custom') {
            this.customAnims = this.RS.settings.customTransitions;
            this.isCustomTransition = true;
        }
        if (this.transition === 'custom') {
            var that = this;
            $.each(this.customAnims, function(i, obj) {
                if ($.inArray(obj, that.anims) === -1) {
                    that.customAnims.splice(i, 1);
                }
            });
        }
        this.fallback3d = this.RS.settings.fallback3d;
        this.init();
    }
    Transition.prototype = {
        fallback: 'fade',
        anims: ['cubeH', 'cubeV', 'fade', 'sliceH', 'sliceV', 'slideH', 'slideV', 'scale', 'blockScale', 'kaleidoscope', 'fan', 'blindH', 'blindV'],
        customAnims: [],
        init: function() {
            this[this.transition]();
        },
        before: function(callback) {
            var that = this;
            this.RS.$currentSlide.css('z-index', 2);
            this.RS.$nextSlide.css({
                'opacity': 1,
                'z-index': 1
            });
            if (this.RS.cssTransitions) {
                this.RS.$currentSlide.find('.rs-caption').css('opacity', 0);
                this.RS.$nextSlide.find('.rs-caption').css('opacity', 1);
            } else {
                this.RS.$currentSlide.find('.rs-caption').animate({
                    'opacity': 0
                }, that.RS.settings.transitionDuration);
                this.RS.$nextSlide.find('.rs-caption').animate({
                    'opacity': 1
                }, that.RS.settings.transitionDuration);
            }
            if (typeof this.setup === 'function') {
                var transition = this.setup();
                setTimeout(function() {
                    callback(transition);
                }, 20);
            } else {
                this.execute();
            }
            if (this.RS.cssTransitions) {
                $(this.listenTo).one('webkitTransitionEnd transitionend otransitionend oTransitionEnd mstransitionend', $.proxy(this.after, this));
            }
        },
        after: function() {
            this.RS.$sliderBG.removeAttr('style');
            this.RS.$slider.removeAttr('style');
            this.RS.$currentSlide.removeAttr('style');
            this.RS.$nextSlide.removeAttr('style');
            this.RS.$currentSlide.css({
                zIndex: 1,
                opacity: 0
            });
            this.RS.$nextSlide.css({
                zIndex: 2,
                opacity: 1
            });
            if (typeof this.reset === 'function') {
                this.reset();
            }
            if (this.RS.settings.autoPlay) {
                clearTimeout(this.RS.cycling);
                this.RS.setAutoPlay();
            }
            this.RS.$currentSlide = this.RS.$nextSlide;
            this.RS.inProgress = false;
            this.RS.settings.afterChange();
        },
        fade: function() {
            var that = this;
            if (this.RS.cssTransitions) {
                this.setup = function() {
                    that.listenTo = that.RS.$currentSlide;
                    that.RS.$currentSlide.css('transition', 'opacity ' + that.RS.settings.transitionDuration + 'ms linear');
                };
                this.execute = function() {
                    that.RS.$currentSlide.css('opacity', 0);
                }
            } else {
                this.execute = function() {
                    that.RS.$currentSlide.animate({
                        'opacity': 0
                    }, that.RS.settings.transitionDuration, function() {
                        that.after();
                    });
                }
            }
            this.before($.proxy(this.execute, this));
        },
        cube: function(tz, ntx, nty, nrx, nry, wrx, wry) {
            if (!this.RS.cssTransitions || !this.RS.cssTransforms3d) {
                return this[this['fallback3d']]();
            }
            var that = this;
            this.setup = function() {
                that.listenTo = that.RS.$slider;
                this.RS.$sliderBG.css('perspective', 1000);
                that.RS.$currentSlide.css({
                    transform: 'translateZ(' + tz + 'px)',
                    backfaceVisibility: 'hidden'
                });
                that.RS.$nextSlide.css({
                    opacity: 1,
                    backfaceVisibility: 'hidden',
                    transform: 'translateY(' + nty + 'px) translateX(' + ntx + 'px) rotateY(' + nry + 'deg) rotateX(' + nrx + 'deg)'
                });
                that.RS.$slider.css({
                    transform: 'translateZ(-' + tz + 'px)',
                    transformStyle: 'preserve-3d'
                });
            };
            this.execute = function() {
                that.RS.$slider.css({
                    transition: 'all ' + that.RS.settings.transitionDuration + 'ms ease-in-out',
                    transform: 'translateZ(-' + tz + 'px) rotateX(' + wrx + 'deg) rotateY(' + wry + 'deg)'
                });
            };
            this.before($.proxy(this.execute, this));
        },
        cubeH: function() {
            var dimension = $(this.RS.$slides).width() / 2;
            if (this.forward) {
                this.cube(dimension, dimension, 0, 0, 90, 0, -90);
            } else {
                this.cube(dimension, -dimension, 0, 0, -90, 0, 90);
            }
        },
        cubeV: function() {
            var dimension = $(this.RS.$slides).height() / 2;
            if (this.forward) {
                this.cube(dimension, 0, -dimension, 90, 0, -90, 0);
            } else {
                this.cube(dimension, 0, dimension, -90, 0, 90, 0);
            }
        },
        grid: function(cols, rows, ro, tx, ty, sc, op) {
            if (!this.RS.cssTransitions) {
                return this[this['fallback']]();
            }
            var that = this;
            this.setup = function() {
                var count = (that.RS.settings.transitionDuration) / (cols + rows);

                function gridlet(width, height, top, left, src, imgWidth, imgHeight, c, r) {
                    var delay = (c + r) * count;
                    return $('<div class="rs-gridlet" />').css({
                        width: width,
                        height: height,
                        top: top,
                        left: left,
                        backgroundImage: 'url(' + src + ')',
                        backgroundPosition: '-' + left + 'px -' + top + 'px',
                        backgroundSize: imgWidth + 'px ' + imgHeight + 'px',
                        transition: 'all ' + that.RS.settings.transitionDuration + 'ms ease-in-out ' + delay + 'ms',
                        transform: 'none'
                    });
                }
                that.$img = that.RS.$currentSlide.find('img.rs-slide-image');
                that.$grid = $('<div />').addClass('rs-grid');
                that.RS.$currentSlide.prepend(that.$grid);
                var imgWidth = that.$img.width(),
                    imgHeight = that.$img.height(),
                    imgSrc = that.$img.attr('src'),
                    colWidth = Math.floor(imgWidth / cols),
                    rowHeight = Math.floor(imgHeight / rows),
                    colRemainder = imgWidth - (cols * colWidth),
                    colAdd = Math.ceil(colRemainder / cols),
                    rowRemainder = imgHeight - (rows * rowHeight),
                    rowAdd = Math.ceil(rowRemainder / rows),
                    leftDist = 0;
                tx = tx === 'auto' ? imgWidth : tx;
                tx = tx === 'min-auto' ? -imgWidth : tx;
                ty = ty === 'auto' ? imgHeight : ty;
                ty = ty === 'min-auto' ? -imgHeight : ty;
                for (var i = 0; i < cols; i++) {
                    var topDist = 0,
                        newColWidth = colWidth;
                    if (colRemainder > 0) {
                        var add = colRemainder >= colAdd ? colAdd : colRemainder;
                        newColWidth += add;
                        colRemainder -= add;
                    }
                    for (var j = 0; j < rows; j++) {
                        var newRowHeight = rowHeight,
                            newRowRemainder = rowRemainder;
                        if (newRowRemainder > 0) {
                            add = newRowRemainder >= rowAdd ? rowAdd : rowRemainder;
                            newRowHeight += add;
                            newRowRemainder -= add;
                        }
                        that.$grid.append(gridlet(newColWidth, newRowHeight, topDist, leftDist, imgSrc, imgWidth, imgHeight, i, j));
                        topDist += newRowHeight;
                    }
                    leftDist += newColWidth;
                }
                that.listenTo = that.$grid.children().last();
                that.$grid.show();
                that.$img.css('opacity', 0);
                that.$grid.children().first().addClass('rs-top-left');
                that.$grid.children().last().addClass('rs-bottom-right');
                that.$grid.children().eq(rows - 1).addClass('rs-bottom-left');
                that.$grid.children().eq(-rows).addClass('rs-top-right');
            };
            this.execute = function() {
                that.$grid.children().css({
                    opacity: op,
                    transform: 'rotate(' + ro + 'deg) translateX(' + tx + 'px) translateY(' + ty + 'px) scale(' + sc + ')'
                });
            };
            this.before($.proxy(this.execute, this));
            this.reset = function() {
                that.$img.css('opacity', 1);
                that.$grid.remove();
            }
        },
        sliceH: function() {
            this.grid(1, 8, 0, 'min-auto', 0, 1, 0);
        },
        sliceV: function() {
            this.grid(10, 1, 0, 0, 'auto', 1, 0);
        },
        slideV: function() {
            var dir = this.forward ? 'min-auto' : 'auto';
            this.grid(1, 1, 0, 0, dir, 1, 1);
        },
        slideH: function() {
            var dir = this.forward ? 'min-auto' : 'auto';
            this.grid(1, 1, 0, dir, 0, 1, 1);
        },
        scale: function() {
            this.grid(1, 1, 0, 0, 0, 1.5, 0);
        },
        blockScale: function() {
            this.grid(8, 6, 0, 0, 0, .6, 0);
        },
        kaleidoscope: function() {
            this.grid(10, 8, 0, 0, 0, 1, 0);
        },
        fan: function() {
            this.grid(1, 10, 45, 100, 0, 1, 0);
        },
        blindV: function() {
            this.grid(1, 8, 0, 0, 0, .7, 0);
        },
        blindH: function() {
            this.grid(10, 1, 0, 0, 0, .7, 0);
        },
        random: function() {
            this[this.anims[Math.floor(Math.random() * this.anims.length)]]();
        },
        custom: function() {
            if (this.RS.nextAnimIndex < 0) {
                this.RS.nextAnimIndex = this.customAnims.length - 1;
            }
            if (this.RS.nextAnimIndex === this.customAnims.length) {
                this.RS.nextAnimIndex = 0;
            }
            this[this.customAnims[this.RS.nextAnimIndex]]();
        }
    };
    var testBrowser = {
        browserVendors: ['', '-webkit-', '-moz-', '-ms-', '-o-', '-khtml-'],
        domPrefixes: ['', 'Webkit', 'Moz', 'ms', 'O', 'Khtml'],
        testDom: function(prop) {
            var i = this.domPrefixes.length;
            while (i--) {
                if (typeof document.body.style[this.domPrefixes[i] + prop] !== 'undefined') {
                    return true;
                }
            }
            return false;
        },
        cssTransitions: function() {
            if (typeof window.Modernizr !== 'undefined' && Modernizr.csstransitions !== 'undefined') {
                return Modernizr.csstransitions;
            }
            return this.testDom('Transition');
        },
        cssTransforms3d: function() {
            if (typeof window.Modernizr !== 'undefined' && Modernizr.csstransforms3d !== 'undefined') {
                return Modernizr.csstransforms3d;
            }
            if (typeof document.body.style['perspectiveProperty'] !== 'undefined') {
                return true;
            }
            return this.testDom('Perspective');
        }
    };
    $.fn['refineSlide'] = function(settings) {
        return this.each(function() {
            if (!$.data(this, 'refineSlide')) {
                $.data(this, 'refineSlide', new RS(this, settings));
            }
        });
    }
})(window.jQuery, window, window.document);