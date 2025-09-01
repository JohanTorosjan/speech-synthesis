import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { later, cancel } from '@ember/runloop';

export default class ScreenshotCarousel extends Component {
  @tracked currentIndex = 0;
  autoplayTimer = null;

  constructor(owner, args) {
    super(owner, args);
    this.startAutoplay();
  }

  willDestroy() {
    this.stopAutoplay();
    super.willDestroy();
  }

  get screenshots() {
    return this.args.screenshots || [
      {
        src: '/assets/1.png',
        alt: 'Screenshot 1 de l\'application',
        title: 'Ouvrez l’application sur votre navigateur. '
      },
      {
        src: '/assets/2.png',
        alt: 'Screenshot 2 de l\'application',
        title: 'Échangez librement avec un·e habitant·e.'
      },
      {
        src: '/assets/3.png',
        alt: 'Screenshot 3 de l\'application',
        title: 'Partagez en quelques secondes un résumé clair'
      },
            {
        src: '/assets/4.png',
        alt: 'Screenshot 3 de l\'application',
        title: 'Plateforme administrateur'
      }
    ];
  }

  get currentScreenshot() {
    return this.screenshots[this.currentIndex];
  }

  get totalScreenshots() {
    return this.screenshots.length;
  }

  @action
  nextSlide() {
    this.stopAutoplay();
    this.currentIndex = (this.currentIndex + 1) % this.totalScreenshots;
    this.startAutoplay();
  }

  @action
  prevSlide() {
    this.stopAutoplay();
    this.currentIndex = this.currentIndex === 0 
      ? this.totalScreenshots - 1 
      : this.currentIndex - 1;
    this.startAutoplay();
  }

  @action
  goToSlide(index) {
    this.stopAutoplay();
    this.currentIndex = index;
    this.startAutoplay();
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayTimer = later(() => {
      this.currentIndex = (this.currentIndex + 1) % this.totalScreenshots;
      this.startAutoplay();
    }, 3000);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      cancel(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  @action
  onMouseEnter() {
    this.stopAutoplay();
  }

  @action
  onMouseLeave() {
    this.startAutoplay();
  }


}
