

class Backgrounds {
  offsets: number[];

  constructor(offsets: number[]) {
    this.offsets = offsets;
  }

  private getCurrentSlideIndex = () => {
    return this.offsets.findIndex((offset, index) => {
      console.log(' --- offset --- ', offset);
      return window.scrollY >= offset && window.scrollY < this.offsets[index + 1];
    });
  };

  run = () => {
    const currentSlideIndex = this.getCurrentSlideIndex();
    console.log(' --- asdfasdf --- ', currentSlideIndex);

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
  const backgrounds = new Backgrounds(sectionsOffsets);

  document.addEventListener('scroll', () => {
    backgrounds.run();
  });
  console.log(' --- sectionsOffsets --- ', sectionsOffsets);
});
