class Backgrounds {
    constructor(offsets, backgroundsList) {
        this.getCurrentSlideIndex = () => {
            const reversedOffsets = [...this.offsets.slice().reverse()];
            const lastIndexOffset = reversedOffsets.findIndex((offset, index) => {
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
    document.addEventListener('scroll', () => {
        backgrounds.run();
    });
});
