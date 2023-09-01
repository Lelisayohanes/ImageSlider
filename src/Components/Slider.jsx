// Import necessary dependencies and styles
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import '../Style/Slider.css';

// Add Font Awesome icons to the library
library.add(faAngleLeft, faAngleRight);

// Define the CardSlider component
const CardSlider = () => {
  // Define state variables using the useState hook
  const [isDragging, setIsDragging] = useState(false); // Track if carousel is being dragged
  const [isAutoPlay] = useState(false); // Control autoplay (constant, set to false)
  const [startX, setStartX] = useState(0); // Initial X-coordinate when dragging starts
  const [startScrollLeft, setStartScrollLeft] = useState(0); // Initial scroll position when dragging starts
  const [timeoutId, setTimeoutId] = useState(null); // Timeout ID for autoplay

  // Create refs for DOM elements
  const wrapperRef = useRef(null); // Ref for the wrapper div
  const carouselRef = useRef(null); // Ref for the carousel ul

  // Function to handle left and right arrow button clicks
  const handleArrowClick = (btnId) => {
    const carousel = carouselRef.current;
    const firstCardWidth = carousel.querySelector('.card').offsetWidth;
    carousel.scrollLeft += btnId === "left" ? -firstCardWidth : firstCardWidth;
  };

  // Data for individual cards in the carousel
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

  // useEffect hook to set up event listeners and perform initialization
  useEffect(() => {
    const wrapper = wrapperRef.current; // Reference to the wrapper div
    const carousel = carouselRef.current; // Reference to the carousel ul

    const carouselChildrens = [...carousel.children]; // List of carousel items

    const firstCardWidth = carousel.querySelector('.card').offsetWidth; // Width of the first card
    const cardPerView = Math.round(carousel.offsetWidth / firstCardWidth); // Number of cards visible per view

    // Clone the carousel items for infinite scrolling
    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    carouselChildrens.slice(0, cardPerView).forEach(card => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Disable transition during initialization
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    // Select arrow buttons and add event listeners
    const arrowBtns = document.querySelectorAll(".wrapper i");

    arrowBtns.forEach((btn) => {
      btn.addEventListener("click", () => handleArrowClick(btn.id));
    });

    // Event handlers for dragging functionality
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

    // Handle infinite scrolling
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

    // Implement autoplay functionality
    const autoPlay = () => {
      if (window.innerWidth < 800 || !isAutoPlay) return;
      const newTimeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
      setTimeoutId(newTimeoutId);
    };
    autoPlay();

    // Add event listeners
    carousel.addEventListener("mousedown", handleDragStart);
    carousel.addEventListener("mousemove", handleDragging);
    document.addEventListener("mouseup", handleDragStop);
    carousel.addEventListener("scroll", handleInfiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));

    // Clean up event listeners when the component unmounts
    return () => {
      carousel.removeEventListener("mousedown", handleDragStart);
      carousel.removeEventListener("mousemove", handleDragging);
      document.removeEventListener("mouseup", handleDragStop);
      carousel.removeEventListener("scroll", handleInfiniteScroll);
      wrapper.removeEventListener("mouseenter", () => clearTimeout(timeoutId));
    };
  }, [isDragging, isAutoPlay, startX, startScrollLeft, timeoutId]);

  // Render the component with JSX
  return (
    <div className='whole-slider-container'>
      <div className='slider-text'>
        <p>Specialized</p>
        <h1>Technologies</h1>
      </div>
      <div className="wrapper" ref={wrapperRef}>
        <i
          id="left"
          className="fa-solid"
          onClick={() => handleArrowClick("left")}
        >
          <FontAwesomeIcon icon="angle-left" />
        </i>
        <ul className="carousel" ref={carouselRef}>
          {cardData.map((card, index) => (
            <li key={index} className="card">
              <div className="img">
                <img src={card.imgSrc} alt="img" draggable="false" />
              </div>
              {/* <h2>{card.name}</h2> */}
              {/* <span>{card.role}</span> */}
            </li>
          ))}
        </ul>
        <i
          id="right"
          className="fa-solid"
          onClick={() => handleArrowClick("right")}
        >
          <FontAwesomeIcon icon="angle-right" />
        </i>
      </div>
    </div>
  );
};

// Export the CardSlider component
export default CardSlider;
