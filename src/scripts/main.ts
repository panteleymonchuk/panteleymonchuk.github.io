class Backgrounds {
  offsets: number[];
  backgroundsList: string[];

  constructor(offsets: number[], backgroundsList: string[]) {
    this.offsets = offsets;
    this.backgroundsList = backgroundsList;
  }

  private getCurrentSlideIndex = () => {
    const reversedOffsets = [...this.offsets.slice().reverse()];
    const lastIndexOffset = reversedOffsets.findIndex((offset) => {
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

class FirstSlide {
  private showText = (selector: string, message: string, cb: () => void = () => {}, timeout = 0) => {
    const selectorNode = document.querySelector(selector);
    let counter = 0;
    const interval = setInterval(() => {
      selectorNode.innerHTML = selectorNode.textContent + message[counter];
      counter++;
      if (counter >= message.length) {
        clearInterval(interval);
        cb();
      }
    }, timeout);
  };

  public runFirstAnimation = () => {
    const templateTitle = 'Hello. My name is Eugene_';
    const templateSubtitle = 'I am full-stack developer with focus on problem which your product solve.';
    setTimeout(() => {
      this.showText('.about-me__text-wrap h1', templateTitle, () => {
        this.showText('.about-me__text-wrap h2', templateSubtitle, () => {}, 20);
      }, 30);
    }, 500);
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

  const firstSlide = new FirstSlide();
  firstSlide.runFirstAnimation();

  document.addEventListener('scroll', () => {
    backgrounds.run();
  });
});
