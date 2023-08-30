import  { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import '../Style/Slider.css';

library.add(faAngleLeft, faAngleRight);

const CardSlider = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlay] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);

  const wrapperRef = useRef(null);
  const carouselRef = useRef(null);



  const handleArrowClick = (btnId) => {
    const carousel = carouselRef.current;
    const firstCardWidth = carousel.querySelector('.card').offsetWidth;
    carousel.scrollLeft += btnId === "left" ? -firstCardWidth : firstCardWidth;
  };
  const cardData = [
    {
      imgSrc: '../../src/assets/angular-logo-icon-png-svg 1.png',
      name: 'Blanche Pearson',
      role: 'Sales Manager'
    },
    {
      imgSrc: '../../src/assets/React_logo_wordmark 2.png',
      name: 'Joenas Brauers',
      role: 'Web Developer'
    },
    {
      imgSrc: '../../src/assets/angular-logo-icon-png-svg 1.png',
      name: 'Blanche Pearson',
      role: 'Sales Manager'
    },
    {
      imgSrc: '../../src/assets/React_logo_wordmark 2.png',
      name: 'Joenas Brauers',
      role: 'Web Developer'
    },
    {
      imgSrc: '../../src/assets/angular-logo-icon-png-svg 1.png',
      name: 'Blanche Pearson',
      role: 'Sales Manager'
    },
    {
      imgSrc: '../../src/assets/React_logo_wordmark 2.png',
      name: 'Joenas Brauers',
      role: 'Web Developer'
    }
  ];

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const carousel = carouselRef.current;


    const carouselChildrens = [...carousel.children];

    const firstCardWidth = carousel.querySelector('.card').offsetWidth;
    const cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

   

    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    carouselChildrens.slice(0, cardPerView).forEach(card => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    const arrowBtns = document.querySelectorAll(".wrapper i");

   

    arrowBtns.forEach((btn) => {
      btn.addEventListener("click", () => handleArrowClick(btn.id));
    });

    const handleDragStart = (e) => {
      setIsDragging(true);
      carousel.classList.add("dragging");
      setStartX(e.pageX);
      setStartScrollLeft(carousel.scrollLeft);
    };

    const handleDragging = (e) => {
      if (!isDragging) return;
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    const handleDragStop = () => {
      setIsDragging(false);
      carousel.classList.remove("dragging");
    };

    const handleInfiniteScroll = () => {
      if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
      } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
      }

      clearTimeout(timeoutId);
      if (!wrapper.matches(":hover")) autoPlay();
    };

    const autoPlay = () => {
      if (window.innerWidth < 800 || !isAutoPlay) return;
    // if (window.innerWidth < 800) return;
      const newTimeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
      setTimeoutId(newTimeoutId);
    };
    autoPlay();

    carousel.addEventListener("mousedown", handleDragStart);
    carousel.addEventListener("mousemove", handleDragging);
    document.addEventListener("mouseup", handleDragStop);
    carousel.addEventListener("scroll", handleInfiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));

    return () => {
      carousel.removeEventListener("mousedown", handleDragStart);
      carousel.removeEventListener("mousemove", handleDragging);
      document.removeEventListener("mouseup", handleDragStop);
      carousel.removeEventListener("scroll", handleInfiniteScroll);
      wrapper.removeEventListener("mouseenter", () => clearTimeout(timeoutId));
    };
  }, [isDragging, isAutoPlay, startX, startScrollLeft, timeoutId]);

  return (
    <div className="wrapper" ref={wrapperRef}>
      <i id="left" className="fa-solid" onClick={() => handleArrowClick("left")}>
      <FontAwesomeIcon icon="angle-left" />
      </i>
      <ul className="carousel" ref={carouselRef}>
        {cardData.map((card, index) => (
          <li key={index} className="card">
            <div className="img">
              <img src={card.imgSrc} alt="img" draggable="false" />
            </div>
            <h2>{card.name}</h2>
            <span>{card.role}</span>
          </li>
        ))}
      </ul>
      <i id="right" className="fa-solid" onClick={() => handleArrowClick("right")}>
        <FontAwesomeIcon icon="angle-right" />
      </i>
      
    </div>
  );
};

export default CardSlider;

