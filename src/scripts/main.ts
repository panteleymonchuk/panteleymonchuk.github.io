class Backgrounds {
  offsets: number[];
  backgroundsList: string[];

  constructor(offsets: number[], backgroundsList: string[]) {
    this.offsets = offsets;
    this.backgroundsList = backgroundsList;
  }

  private getCurrentSlideIndex = () => {
    const reversedOffsets = [...this.offsets.slice().reverse()];
    const lastIndexOffset = reversedOffsets.findIndex((offset, index) => {
      return window.scrollY >= offset;
    });
    return (reversedOffsets.length - 1) - lastIndexOffset;
  };

  private setBackground = (rgb: string) => {
    document.body.style.backgroundColor = `rgb(${rgb})`
  };

  run = () => {
    const currentSlideIndex = this.getCurrentSlideIndex();
    const currentBackground = this.backgroundsList[currentSlideIndex];
    this.setBackground(currentBackground);
  };
}

window.addEventListener('DOMContentLoaded', (event) => {
  const backgroundParams = ['65,122,186', '255,105,0', '255,169,0', '242,242,242'];
  const sections = [...document.querySelectorAll('section')];
  const sectionsOffsets: number[] = sections.map((el) => {
    const rect = el.getBoundingClientRect(),
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop;
  });
  const backgrounds = new Backgrounds(sectionsOffsets, backgroundParams);
  backgrounds.run();
  document.body.style.opacity = '1';

  document.addEventListener('scroll', () => {
    backgrounds.run();
  });
});
