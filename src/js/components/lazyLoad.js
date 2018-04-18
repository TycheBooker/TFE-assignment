class LazyLoad {
    static get OPTIONS() {
        return {
            imgParams: ['f_auto', 'q_auto'].join(),
            className: '.js-lazy-img',
            handledClass: 'loaded',
            accountId: 'dynmhzn7t'
        };
    }

    static get URL() {
        return `https://res.cloudinary.com/${LazyLoad.OPTIONS.accountId}/image/upload`;
    }

    static get SUPPORTS_INTERSECTION() {
        return 'IntersectionObserver' in window;
    }

    constructor() {
        this.options = LazyLoad.OPTIONS;

        this.onIntersection = this.onIntersection.bind(this);

        this.getImages();
    }

    getImages() {
        this.images = [...document.querySelectorAll(this.options.className)];

        if (!LazyLoad.SUPPORTS_INTERSECTION) {
            this.loadAll(this.images);
            return;
        }

        this.initObserver();
    }

    initObserver() {
        if (this.observer) {
            this.observer.disconnect();
        }

        const intersectionConfig = {
            threshold: 0.01
        };

        this.observer = new IntersectionObserver(
            this.onIntersection,
            intersectionConfig
        );

        this.observeImages();
    }

    observeImages() {
        this.count = this.images.length;
        this.images.forEach(image => {
            if (image.classList.contains(this.options.handledClass)) {
                return;
            }

            this.observer.observe(image);
        });
    }

    onIntersection(entries) {
        entries.forEach(entry => {
            if (entry.intersectionRatio <= 0) {
                return;
            }

            this.count--;
            this.observer.unobserve(entry.target);
            this.loadImage(entry.target);
        });

        if (this.count === 0) {
            this.observer.disconnect();
        }
    }

    loadAll(images) {
        images.forEach(image => this.loadImage(image));
    }

    loadImage(image) {
        const id = image.dataset.src;

        if (!id) {
            return;
        }

        const imageParams = [
            image.dataset.width && 'w_' + image.dataset.width,
            image.dataset.height && 'h_' + image.dataset.height,
            image.dataset.ratio && 'ar_' + image.dataset.ratio,
            this.imgParams,
            window.devicePixelRatio > 1.5 && 'dpr_2.0'
        ]
            .filter(Boolean)
            .join(',');

        const url = `${LazyLoad.URL}/${imageParams}/${id}`;

        this.preloadImage(url)
            .then(() => {
                image.removeAttribute('srcset');
                image.setAttribute('src', url);
                image.classList.add(this.options.handledClass);
            })
            /*jshint -W024 */
            .catch(() => console.error(`Image ${url} is broken`));
    }

    preloadImage(url) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;
            image.onload = () => resolve(image);
            image.onerror = () =>
                reject(new Error('Could not load image at ' + url));
        });
    }
}

module.exports = LazyLoad;
