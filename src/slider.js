var OSSlider = function ($elem) {
    const self = this;

    self.$elem = $elem;
    self.$slides = Array.from(self.$elem.querySelectorAll('.slider-images-item'))
    self.$bullets = Array.from(self.$elem.querySelectorAll('.slider-bullets-item'))

    self.timeout = null;
    self.nextSlideTimeout = 4000;

    self.currentIndex = null;

    self.init = function () {
        self.showNextSlide();

        self.$bullets.forEach(function (elem, index) {
            elem.addEventListener('click', function (e) {
                e.preventDefault();

                self.showSlide(index)
            })
        })
    };

    self.showNextSlide = function () {
        var index;

        if(self.currentIndex === null) {
            index = 0;
        } else if (self.currentIndex === (self.$slides.length - 1)) {
            index = 0;
        } else {
            index = self.currentIndex + 1
        }

        self.showSlide(index)
    };

    self.showPrevSlide = function () {
        var index;

        if(self.currentIndex === null) {
            index = 0;
        } else if (self.currentIndex === 0) {
            index = self.$slides.length - 1;
        } else {
            index = self.currentIndex - 1
        }

        self.showSlide(index)
    };

    self.showSlide = function (index) {
        self.currentIndex = index;

        clearTimeout(self.timeout);

        console.log("next slide", self.currentIndex)

        self.onBeforeShowSlide();

        self.$slides[self.currentIndex].classList.add('active')
        self.$bullets[self.currentIndex].classList.add('active')

        self.timeout = setTimeout(function() {
            self.showNextSlide();
        }, self.nextSlideTimeout);
    }

    self.onBeforeShowSlide = function () {
        self.$slides.forEach(function (elem) {
            elem.classList.remove('active');
        })
        self.$bullets.forEach(function (elem) {
            elem.classList.remove('active');
        })
    }

    self.init();
};


new OSSlider(
    document.getElementById('os-slider')
)