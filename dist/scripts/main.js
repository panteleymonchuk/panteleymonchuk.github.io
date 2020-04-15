class Backgrounds {
    constructor(offsets) {
        this.getCurrentSlideIndex = () => {
            return this.offsets.findIndex((offset, index) => {
                console.log(' --- offset --- ', offset);
                return window.scrollY >= offset && window.scrollY < this.offsets[index + 1];
            });
        };
        this.run = () => {
            const currentSlideIndex = this.getCurrentSlideIndex();
            console.log(' --- asdfasdf --- ', currentSlideIndex);
        };
        this.offsets = offsets;
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
    const backgroundParams = ['65,122,186', '255,105,0', '255,169,0', '242,242,242'];
    const sections = [...document.querySelectorAll('section')];
    const sectionsOffsets = sections.map((el) => {
        const rect = el.getBoundingClientRect(), scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return rect.top + scrollTop;
    });
    const backgrounds = new Backgrounds(sectionsOffsets);
    document.addEventListener('scroll', () => {
        backgrounds.run();
    });
    console.log(' --- sectionsOffsets --- ', sectionsOffsets);
});
