import  { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import '../style/Slider1.css'; // Update with your CSS file path

const DraggableSlider = () => {
  const carouselRef = useRef(null);
  const firstImgRef = useRef(null);
  const arrowIconsRef = useRef([]);

  useEffect(() => {
    const carousel = carouselRef.current;
    const firstImg = firstImgRef.current;
    const arrowIcons = arrowIconsRef.current;

    let isDragStart = false,
      isDragging = false,
      prevPageX,
      prevScrollLeft,
      positionDiff;

    const showHideIcons = () => {
      // showing and hiding prev/next icon according to carousel scroll left value
      let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
      arrowIcons[0].style.display =
        carousel.scrollLeft === 0 ? 'none' : 'block';
      arrowIcons[1].style.display =
        carousel.scrollLeft === scrollWidth ? 'none' : 'block';
    };

    arrowIcons.forEach((icon) => {
      icon.addEventListener('click', () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        carousel.scrollLeft +=
          icon.id === 'left' ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
      });
    });

    const autoSlide = () => {
      if (
        carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) >
          -1 ||
        carousel.scrollLeft <= 0
      )
        return;

      positionDiff = Math.abs(positionDiff);
      let firstImgWidth = firstImg.clientWidth + 14;
      let valDifference = firstImgWidth - positionDiff;

      if (carousel.scrollLeft > prevScrollLeft) {
        return (carousel.scrollLeft +=
          positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
      }

      carousel.scrollLeft -=
        positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    };

    const dragStart = (e) => {
      isDragStart = true;
      prevPageX = e.pageX || e.touches[0].pageX;
      prevScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
      if (!isDragStart) return;
      e.preventDefault();
      isDragging = true;
      carousel.classList.add('dragging');
      positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
      carousel.scrollLeft = prevScrollLeft - positionDiff;
      showHideIcons();
    };

    const dragStop = () => {
      isDragStart = false;
      carousel.classList.remove('dragging');

      if (!isDragging) return;
      isDragging = false;
      autoSlide();
    };

    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('touchstart', dragStart);

    document.addEventListener('mousemove', dragging);
    carousel.addEventListener('touchmove', dragging);

    document.addEventListener('mouseup', dragStop);
    carousel.addEventListener('touchend', dragStop);

    return () => {
      carousel.removeEventListener('mousedown', dragStart);
      carousel.removeEventListener('touchstart', dragStart);

      document.removeEventListener('mousemove', dragging);
      carousel.removeEventListener('touchmove', dragging);

      document.removeEventListener('mouseup', dragStop);
      carousel.removeEventListener('touchend', dragStop);
    };
  }, []);

  return (
    <div className="wrapper">
      <i
        id="left"
        className="fa-solid fa-angle-left"
        ref={(icon) => (arrowIconsRef.current[0] = icon)}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </i>
      <div className="carousel" ref={carouselRef}>
        <img
          src="angular-logo-icon-png-svg 1.png"
          alt="img"
          draggable="false"
          ref={firstImgRef}
        />
        <img src="../../src/assets/React_logo_wordmark 2.png" alt="img" draggable="false" />
        <img src="../../src/assets/angular-logo-icon-png-svg 1.png" alt="img" draggable="false" />
        <img src="../../src/assets/React_logo_wordmark 2.png" alt="img" draggable="false" />
        <img src="../../src/assets/angular-logo-icon-png-svg 1.png" alt="img" draggable="false" />
        <img src="../../src/assets/React_logo_wordmark 2.png" alt="img" draggable="false" />
        <img src="../../src/assets/angular-logo-icon-png-svg 1.png" alt="img" draggable="false" />
        <img src="../../src/assets/React_logo_wordmark 2.png" alt="img" draggable="false" />
        <img src="../../src/assets/angular-logo-icon-png-svg 1.png" alt="img" draggable="false" />
        <img src="../../src/assets/React_logo_wordmark 2.png" alt="img" draggable="false" />
      </div>
      <i
        id="right"
        className="fa-solid fa-angle-right"
        ref={(icon) => (arrowIconsRef.current[1] = icon)}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </i>
    </div>
  );
};

export default DraggableSlider;
