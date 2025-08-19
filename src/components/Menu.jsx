"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState, useRef } from "react";
import { allCocktails } from "../../constants";


const Menu = () => {
    const contentRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);
    useGSAP(()=> {
        gsap.fromTo('#title', {opacity: 0}, {opacity: 1, duration: 1})
        gsap.fromTo('.cocktail img', {opacity: 0, xPercent: -100}, {opacity: 1, xPercent: 0, duration: 1, ease: 'power1.inOut'})
        gsap.fromTo('.details h2', {opacity: 0, yPercent: 100}, {opacity: 1, yPercent: 0, ease: 'power1.inOut', duration: 1})
        gsap.fromTo('.details p', {opacity: 0, yPercent: 100}, {opacity: 1, yPercent: 0, ease: 'power1.inOut', duration: 1})

    }, [currentIndex])

    const totalCocktails = allCocktails.length;
    const goToSlide = (index) => {
        const newIndex = (index + totalCocktails) % totalCocktails;
        setCurrentIndex(newIndex);
    };
    const getCocktailAt = (indexOffSet) => {
        return allCocktails[
            (currentIndex + indexOffSet + totalCocktails) % totalCocktails
        ];
    };
    const currentCocktail = getCocktailAt(0);
    const prevCocktail = getCocktailAt(-1);
    const nextCocktail = getCocktailAt(1);
    return (
        <section id="menu" aria-labelledby="menu-heading">
            <img
                src="/images/slider-left-leaf.png"
                alt="slider left leaf"
                id="m-left-leaf"
            />
            <img
                src="/images/slider-right-leaf.png"
                alt="slider right leaf"
                id="m-right-leaf"
            />
            <h2 id="menu-heading" className="sr-only">
                Cocktail menu
            </h2>
            <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
                {allCocktails.map((cocktail, index) => {
                    const isSctive = index === currentIndex;
                    return (
                        <button
                            key={cocktail.id}
                            className={`
                        ${
                            isSctive
                                ? "text-white border-white"
                                : "text-white/50 border-white"
                        }`}
                            onClick={() => goToSlide(index)}
                        >
                            {cocktail.name}
                        </button>
                    );
                })}
            </nav>
            <div className="content">
                <div className="arrows">
                    <button
                        className="text-right"
                        onClick={() => goToSlide(currentIndex - 1)}
                    >
                        <span>{prevCocktail.name}</span>
                        <img
                            src="/images/right-arrow.png"
                            alt="right arrow"
                            aria-hidden="true"
                        />
                    </button>
                    <button
                        className="text-right"
                        onClick={() => goToSlide(currentIndex + 1)}
                    >
                        <span>{nextCocktail.name}</span>
                        <img
                            src="/images/left-arrow.png"
                            alt="left arrow"
                            aria-hidden="true"
                        />
                    </button>
                </div>
                <div className="cocktail">
                    <img
                        src={currentCocktail.image}
                        className="object-contain"
                        alt="current image"
                    />
                </div>
                <div className="recipe">
                    <div ref={contentRef} className="info">
                        <p>Recepe for:</p>
                        <p id="title">{currentCocktail.name}</p>
                    </div>
                    <div className="details">
                        <h2>{currentCocktail.title}</h2>
                        <p>{currentCocktail.detail}</p>
                        <p>{currentCocktail.description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Menu;
