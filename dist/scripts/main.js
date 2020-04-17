class Backgrounds {
    constructor(offsets, backgroundsList) {
        this.getCurrentSlideIndex = () => {
            const reversedOffsets = [...this.offsets.slice().reverse()];
            const lastIndexOffset = reversedOffsets.findIndex((offset) => {
                return window.scrollY >= offset - window.innerHeight / 2;
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
class Portfolio {
    constructor(details) {
        this.clickItemHandler = (element) => {
            const id = element.getAttribute('id');
            const { title, imageUrls, description, technologies } = this.details[id];
            this.modalPortfolio.classList.remove('modal-portfolio-details--hide');
            this.modalContent.innerHTML = this.getHtmlFromTemplate(title, description, technologies, imageUrls);
            document.body.style.overflow = 'hidden';
            this.initCarousel();
        };
        this.getHtmlFromTemplate = (title, description, technologies, imageUrls) => {
            const technologiesForPast = technologies.split(',').reduce((acc, curr) => {
                return acc + `<li>${curr}</li>`;
            }, '');
            const imagesForPast = imageUrls.split(',').reduce((acc, curr) => {
                return acc + `<div><img src="./dist/images/${curr}" alt=""></div>`;
            }, '');
            return `
      <div class="modal-portfolio-details__slider-wrapper">
        <div class="my-slider">${imagesForPast}</div>
      </div>
      <h3 class="modal-portfolio-details__title">${title}</h3>
      <h4 class="modal-portfolio-details__subtitle">Descriotion</h4>
      <p class="modal-portfolio-details__description">${description}</p>
      <h4 class="modal-portfolio-details__subtitle">Technologies used</h4>
      <ul class="modal-portfolio-details__tech-list">${technologiesForPast}</ul>
    `;
        };
        this.initCarousel = () => {
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
        this.details = details;
        const portfolioItems = document.querySelectorAll('.portfolio__item');
        this.modalPortfolio = document.querySelector('.modal-portfolio-details');
        this.modalContent = this.modalPortfolio.querySelector('.modal-portfolio-details__content');
        const modalClose = document.querySelector('.modal-portfolio-details__close-btn');
        portfolioItems.forEach((item) => {
            item.querySelector('.portfolio__item-snow-more').addEventListener('click', () => {
                this.clickItemHandler(item);
            });
        });
        modalClose.addEventListener('click', () => {
            this.modalPortfolio.classList.add('modal-portfolio-details--hide');
            setTimeout(() => { this.modalContent.innerHTML = ""; }, 500);
            document.body.style.overflow = 'visible';
        });
    }
}
class FirstSlide {
    constructor() {
        this.showText = (selector, message, cb = () => { }, timeout = 0) => {
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
        this.runFirstAnimation = () => {
            const templateTitle = 'Hello. My name is Eugene_';
            const templateSubtitle = 'I am full-stack developer with focus on problem which your product solve.';
            setTimeout(() => {
                this.showText('.about-me__text-wrap h1', templateTitle, () => {
                    this.showText('.about-me__text-wrap h2', templateSubtitle, () => { }, 20);
                }, 30);
            }, 500);
        };
    }
}
function loadJson(path, callback) {
    const req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open("GET", path, true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            const response = JSON.parse(req.responseText);
            callback(response);
        }
    };
    req.send(null);
}
function getSectionsOffset() {
    const sections = [...document.querySelectorAll('.section')];
    return sections.map((el) => {
        const rect = el.getBoundingClientRect(), scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return rect.top + scrollTop;
    });
}
// const backgroundParams = ['54,57,60', '33,64,104', '88,82,199', '19,28,57'];
const backgroundParams = ['247,171,0', '126,174,209', '33,64,104', '19,28,57'];
window.addEventListener('DOMContentLoaded', (event) => {
    const sectionsOffsets = getSectionsOffset();
    const backgrounds = new Backgrounds(sectionsOffsets, backgroundParams);
    backgrounds.run();
    document.body.style.opacity = '1';
    const firstSlide = new FirstSlide();
    firstSlide.runFirstAnimation();
    loadJson('./dist/scripts/portfolio.json', (jsonData) => {
        new Portfolio(jsonData);
    });
    document.addEventListener('scroll', () => {
        backgrounds.run();
    });
});
window.onresize = () => {
    const sectionsOffsets = getSectionsOffset();
    const backgrounds = new Backgrounds(sectionsOffsets, backgroundParams);
    backgrounds.run();
    document.addEventListener('scroll', () => {
        backgrounds.run();
    });
};
