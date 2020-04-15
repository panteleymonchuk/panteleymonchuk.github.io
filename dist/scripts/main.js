class Backgrounds {
    constructor(offsets, backgroundsList) {
        this.getCurrentSlideIndex = () => {
            const reversedOffsets = [...this.offsets.slice().reverse()];
            const lastIndexOffset = reversedOffsets.findIndex((offset) => {
                return window.scrollY >= offset;
            });
            return (reversedOffsets.length - 1) - lastIndexOffset;
        };
        this.setBackground = (rgb) => {
            document.body.style.backgroundColor = `rgb(${rgb})`;
        };
        this.run = () => {
            const currentSlideIndex = this.getCurrentSlideIndex();
            const currentBackground = this.backgroundsList[currentSlideIndex];
            this.setBackground(currentBackground);
        };
        this.offsets = offsets;
        this.backgroundsList = backgroundsList;
    }
}
class FirstSlide {
    constructor() {
        this.showText = (selector, message, cb = () => { }) => {
            const selectorNode = document.querySelector(selector);
            let counter = 0;
            const interval = setInterval(() => {
                // title.textContent;
                selectorNode.innerHTML = selectorNode.textContent + message[counter];
                counter++;
                if (counter >= message.length) {
                    clearInterval(interval);
                    cb();
                }
            }, 50);
        };
        this.runFirstAnimation = () => {
            const templateTitle = 'Hello. My name is Eugene_';
            const templateSubtitle = 'I am full-stack developer with focus on problem which your product solve.';
            setTimeout(() => {
                this.showText('.about-me__text-wrap h1', templateTitle, () => {
                    this.showText('.about-me__text-wrap h2', templateSubtitle);
                });
            }, 500);
        };
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
    const backgroundParams = ['65,122,186', '255,105,0', '255,169,0', '242,242,242'];
    const sections = [...document.querySelectorAll('section')];
    const sectionsOffsets = sections.map((el) => {
        const rect = el.getBoundingClientRect(), scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return rect.top + scrollTop;
    });
    const backgrounds = new Backgrounds(sectionsOffsets, backgroundParams);
    backgrounds.run();
    document.body.style.opacity = '1';
    const firstSlide = new FirstSlide();
    firstSlide.runFirstAnimation();
    document.addEventListener('scroll', () => {
        backgrounds.run();
    });
});
