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

class Portfolio {
  modalPortfolio: HTMLElement;
  modalContent: HTMLElement;

  constructor() {
    const portfolioItems = document.querySelectorAll('.portfolio__item');
    this.modalPortfolio = document.querySelector('.modal-portfolio-details');
    this.modalContent = this.modalPortfolio.querySelector('.modal-portfolio-details__content');

    const modalClose = document.querySelector('.modal-portfolio-details__close-btn');

    portfolioItems.forEach((item) => {
      item.addEventListener('click', () => {
        this.clickItemHandler(item);
      });
    });

    modalClose.addEventListener('click', () => {
      this.modalPortfolio.classList.add('modal-portfolio-details--hide');
      setTimeout(() => {this.modalContent.innerHTML = "";}, 500);
      document.body.style.overflow = 'visible';
    });
  }

  clickItemHandler = (element) => {
    this.modalPortfolio.classList.remove('modal-portfolio-details--hide');
    // this.modalPortfolio.style.transform = 'translateY(0)';
    this.modalContent.innerHTML = this.getHtmlFromTemplate();
    document.body.style.overflow = 'hidden';
    this.initCarousel();
  };

  getHtmlFromTemplate = () => {
    // const imaages = imageUrls, title, description, technologies

    return `
      <div class="modal-portfolio-details__slider-wrapper">
        <div class="my-slider">
          <div style="outline: 1px solid red;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" alt=""></div>
          <div style="outline: 1px solid red;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" alt=""></div>
          <div style="outline: 1px solid red;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" alt=""></div>
          <div style="outline: 1px solid red;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" alt=""></div>
          <div style="outline: 1px solid red;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" alt=""></div>
          <div style="outline: 1px solid red;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" alt=""></div>
          <div style="outline: 1px solid red;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" alt=""></div>
        </div>
      </div>
      <h3 class="modal-portfolio-details__title">test title</h3>
      <h4 class="modal-portfolio-details__subtitle">Descriotion</h4>
      <p class="modal-portfolio-details__description">Desasdfasfdasdfasdfcriotion</p>
      <h4 class="modal-portfolio-details__subtitle">Technologies used</h4>
      <ul class="modal-portfolio-details__tech-list">
          <li>react</li>
      </ul>
    `;
  };

  initCarousel = () => {
    // @ts-ignore
    window.tns({
      container: '.my-slider',
      mode: 'carousel',
      items: 1,
      slideBy: 'page',
      controls: false,
      mouseDrag: true,
      nav: false,
    });
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
  const sections = [...document.querySelectorAll('.section')];
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

  new Portfolio();

  document.addEventListener('scroll', () => {
    backgrounds.run();
  });
});
