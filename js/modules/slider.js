function slider({container, slide, nextArrow, prevArrow, totalCounter, currnetCounter, wrapper, field}) {
    // Slider

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num
        }
    }

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          current = document.querySelector(currnetCounter),
          buttonPrev = document.querySelector(prevArrow),
          buttonNext = document.querySelector(nextArrow),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    let cur = 0,
        offset = 0;
    total.textContent = `${getZero(slides.length)}`
    current.textContent = `${getZero(cur + 1)}`;

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    })

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    buttonNext.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width)
        }

        cur = current.textContent - 1;
        cur += 1;
        if (cur > slides.length - 1) cur = 0;
        if (cur < 0) cur = slides.length - 1;
        current.textContent = `${getZero(cur + 1)}`;

        slidesField.style.transform = `translateX(-${offset}px)`;

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[cur].style.opacity = '1';
    })

    buttonPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width)
        }

        cur = current.textContent - 1;
        cur -= 1;
        if (cur > slides.length - 1) cur = 0;
        if (cur < 0) cur = slides.length - 1;
        current.textContent = `${getZero(cur + 1)}`;

        slidesField.style.transform = `translateX(-${offset}px)`;

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[cur].style.opacity = '1';
    })

    // hideSlide = function(slide) {
    //     slide.classList.remove('show');
    //     slide.classList.add('hide');
    // }

    // showSlide = function(slide) {
    //     slide.classList.remove('hide');
    //     slide.classList.add('show');
    // }

    // const firstView = function() {
    //     let cur = 0;
    //     current.textContent = `${getZero(cur+1)}`;
    //     slides.forEach((slide) => {
    //         slide.classList.add('hide');
    //     })
    //     showSlide(slides[cur]);
    // }

    // firstView();

    // console.log(current.textContent);

    // const swapSlide = function(side) {
    //     let cur = current.textContent - 1;
    //     hideSlide(slides[cur])
    //     cur+=side;
    //     if (cur>3) cur = 0;
    //     if (cur<0) cur = 3;
    //     current.textContent = `${getZero(cur + 1)}`;
    //     showSlide(slides[cur]);
    // }

    // buttonPrev.addEventListener('click', () => swapSlide(-1));
    // buttonNext.addEventListener('click', () => swapSlide(1));

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            cur = slideTo - 1;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (cur > slides.length - 1) cur = 0;
            if (cur < 0) cur = slides.length - 1;
            current.textContent = `${getZero(cur + 1)}`;

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[cur].style.opacity = '1';
        })
    })
}

export default slider;