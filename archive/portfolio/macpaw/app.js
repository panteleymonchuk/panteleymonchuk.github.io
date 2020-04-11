'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// (!!callback) ? callback() : null


var controlButtons = {
    buttonsWrap: document.getElementById('buttons'),
    controlText: document.querySelector('.buttons__count-slides'),
    btnNext: document.querySelector('.buttons__next-btn')
};

var duration = {
    lazy: 1,
    normal: 0.5,
    fast: 0.2
};

var slides = {
    slide1: document.getElementById('slide-1'),
    slide2: document.getElementById('slide-2'),
    slide3: document.getElementById('slide-3'),
    slide4: document.getElementById('slide-4'),
    slide5: document.getElementById('slide-5')
};

var slide1 = {

    slide: slides.slide1,

    show: function show(callback) {

        this.slide.classList.remove('slide-disabled');

        var egg = this.slide.querySelector('.slide-1__eggs'),
            eggPosition = 0,
            limit = egg.offsetWidth * 78;

        var animateEggs = setInterval(function () {

            if (eggPosition < -limit) {
                clearTimeout(animateEggs);
                eggPosition += egg.offsetWidth;
                TweenLite.to(egg, 0, {
                    backgroundPositionX: eggPosition,
                    onComplete: function onComplete() {
                        !!callback ? callback() : null;
                    }
                });
            } else {
                eggPosition -= egg.offsetWidth;
                TweenLite.set(egg, {
                    backgroundPositionX: eggPosition
                });
            }
        }, 50);
    },
    hide: function hide(callback) {
        var self = this;
        TweenLite.to(this.slide, duration.normal, {
            x: '-100%',
            onComplete: function onComplete() {
                self.slide.classList.add('slide-disabled');
                !!callback ? callback() : null;
            }
        });
    }
};

var slide2 = {

    slide: slides.slide2,
    get textBlock() {
        return this.slide.querySelector('.slide__text-block');
    },
    get imgShadow() {
        return this.slide.getElementsByClassName('slide-2__shadow');
    },

    show: function show(callback) {

        this.init();

        this.slide.classList.remove('slide-disabled');

        TweenLite.to(this.slide, duration.lazy, {
            x: '0%'
        });

        TweenLite.to(this.textBlock, duration.lazy * 1.5, {
            x: '0'
        });

        for (var i = 0; i < this.imgShadow.length; i++) {
            TweenLite.to(this.imgShadow[i], duration.lazy, {
                delay: 0.3,
                bottom: -((i + 1) * 5) + 'px'
            });
        }

        !!callback ? callback() : null;
    },
    hide: function hide(callback) {
        var self = this;
        var img = this.slide.querySelector('.slide__images'),
            header = this.slide.querySelector('.slide__text-header');

        TweenLite.to(header, duration.normal, {
            opacity: 0,
            onComplete: function onComplete() {
                header.innerHTML = "Now, It Even...";
            }
        });
        TweenLite.to(header, duration.normal, {
            delay: duration.normal,
            opacity: 1
        });
        TweenLite.to(img, duration.lazy, {
            delay: duration.normal,
            y: "-150%"
        });
        for (var i = 0; i < this.imgShadow.length; i++) {
            TweenLite.to(this.imgShadow[i], duration.normal, {
                delay: duration.normal,
                bottom: -((i + 1) * 3 * 5) + 'px'
            });
        }
        TweenLite.to(this.slide, duration.lazy, {
            delay: 1,
            opacity: 0,
            onComplete: function onComplete() {
                self.slide.classList.add('slide-disabled');
                !!callback ? callback() : null;
            }
        });
    },
    init: function init() {

        TweenLite.set(this.slide, {
            x: '100%'
        });

        TweenLite.set(this.textBlock, {
            x: '200px'
        });
    }
};

var slide3 = {

    slide: slides.slide3,
    get textBlock() {
        return this.slide.querySelector('.slide__text-block');
    },
    get images() {
        return this.slide.getElementsByClassName('slide__image-item');
    },

    show: function show(callback) {

        this.init();

        this.slide.classList.remove('slide-disabled');

        TweenLite.to(this.textBlock, duration.lazy, {
            y: "0px",
            opacity: 1
        });

        TweenLite.to(this.images[0], duration.lazy, {
            left: "60px",
            rotation: -10
        });
        TweenLite.to(this.images[1], duration.lazy, {
            left: "50%",
            rotation: 10
        });
        TweenLite.to(this.images[2], duration.lazy, {
            left: "auto",
            right: "60px",
            rotation: -10
        });
        TweenLite.to(this.images, duration.lazy, {
            y: '0px'
        });

        !!callback ? callback() : null;
    },
    hide: function hide(callback) {
        var self = this;
        TweenLite.to([this.images[0], this.images[1], this.images[2]], duration.lazy, {
            left: "-100%",
            right: "auto",
            rotation: -90
        });
        TweenLite.to(this.textBlock, duration.lazy, {
            x: "-100%",
            onComplete: function onComplete() {
                self.slide.classList.add('slide-disabled');
                !!callback ? callback() : null;
            }
        });
    },
    init: function init() {
        TweenLite.set(this.textBlock, {
            y: "-=50px",
            opacity: 0
        });

        TweenLite.set([this.images[0], this.images[1], this.images[2]], {
            y: '-200px'
        });
    }
};

var slide4 = {

    slide: slides.slide4,
    get itunes() {
        return this.slide.querySelector('.slide-4__image-right');
    },
    get photo() {
        return this.slide.querySelector('.slide-4__image-left');
    },
    get textBlock() {
        return this.slide.querySelector('.slide__text-block');
    },

    show: function show(callback) {

        this.init();
        document.querySelector('.b-slider').classList.add('b-slider--white');
        this.slide.classList.remove('slide-disabled');

        TweenLite.to(this.slide, duration.lazy, {
            x: "0%"
        });

        TweenLite.fromTo(this.itunes, duration.lazy, {
            rotation: -45
        }, {
            rotation: -360
        });

        !!callback ? callback() : null;
    },
    hide: function hide(callback) {
        var self = this;
        TweenLite.fromTo(this.itunes, duration.lazy, {
            rotation: 0
        }, {
            rotation: -180,
            scale: 0.5,
            x: -50,
            y: -50,
            opacity: 0
        });

        TweenLite.to(this.photo, duration.lazy, {
            scale: 0.5,
            x: 50,
            y: -50,
            opacity: 0
        });

        TweenLite.to(this.textBlock, duration.lazy, {
            y: '-=50px',
            opacity: 0,
            onComplete: function onComplete() {
                self.slide.classList.add('slide-disabled');
                !!callback ? callback() : null;
            }
        });
    },
    init: function init() {
        TweenLite.set(this.slide, {
            x: "+=120%"
        });
    }
};

var slide5 = {

    slide: slides.slide5,
    get imgFiles() {
        return this.slide.querySelector('.slide-5__files');
    },
    get imgSelect() {
        return this.slide.querySelector('.slide-5__autoselect');
    },

    show: function show(callback) {

        this.init();

        this.slide.classList.remove('slide-disabled');

        document.querySelector('.b-slider').classList.add('b-slider--white');

        TweenLite.fromTo(this.imgFiles, duration.lazy, {
            scale: 0.5,
            opacity: 0
        }, {
            delay: 0.5,
            scale: 1,
            opacity: 1
        });
        TweenLite.fromTo(this.imgSelect, duration.lazy, {
            scale: 0.5,
            y: "-=100px",
            opacity: 0
        }, {
            scale: 1,
            y: "+=100px",
            opacity: 1
        });
    },
    hide: function hide(callback) {
        TweenLite.to(this.imgFiles, duration.lazy, {
            scale: 0.5,
            opacity: 0
        });
        TweenLite.fromTo(this.imgSelect, duration.lazy, {
            scale: 0.5,
            opacity: 0,
            onComplete: function onComplete() {
                self.slide.classList.add('slide-disabled');
                !!callback ? callback() : null;
            }
        });
    },
    init: function init() {}
};

var Slider = function () {
    function Slider() {
        var _this = this;

        _classCallCheck(this, Slider);

        this.currentSlideNumber = 0;
        this.controlButtons = controlButtons;
        this.slides = [slide1, slide2, slide3, slide4, slide5];

        //init first slide
        this.setBtnNextDisabled();
        this.slides[this.currentSlideNumber].show(function () {
            _this.setBtnNextEnabled();
        });
        this.setTextNumber();
        this.controlButtons.btnNext.addEventListener('click', function () {
            _this.getNextSlide();
        });
    }

    _createClass(Slider, [{
        key: 'setBtnNextDisabled',
        value: function setBtnNextDisabled() {
            return this.controlButtons.btnNext.classList.add('is-disabled');
        }
    }, {
        key: 'setBtnNextEnabled',
        value: function setBtnNextEnabled() {
            return this.controlButtons.btnNext.classList.remove('is-disabled');
        }
    }, {
        key: 'setTextNumber',
        value: function setTextNumber() {
            var controlText = this.controlButtons.controlText,
                currentSlideNumber = this.currentSlideNumber;
            return controlText.innerHTML = ++currentSlideNumber + ' of ' + this.slides.length;
        }
    }, {
        key: 'getNextSlide',
        value: function getNextSlide() {
            var _this2 = this;

            if (this.currentSlideNumber >= this.slides.length - 1) {
                this.setBtnNextDisabled();
                return false;
            }

            var currentSlide = this.slides[this.currentSlideNumber];

            this.setBtnNextDisabled();
            currentSlide.hide(function () {
                _this2.slides[++_this2.currentSlideNumber].show();
                _this2.setBtnNextEnabled();
                _this2.setTextNumber();
            });
        }
    }]);

    return Slider;
}();

var slider = new Slider();