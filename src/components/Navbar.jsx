import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { navLinks } from "../../constants";

const Navbar = () => {
    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: "nav",
                start: "bottom top", //nav position, view port position
            },
        });
        navTween.fromTo('nav', {
          backgroundColor: 'transparent'
        }, {
          backgroundColor: '#00000050', 
          backdropFilter: 'blur(10px)',
          duration: 1,
          ease: 'power1.inOut'
        })
    });
    return (
        <nav>
            <div>
                <a className="flex items-center gap-2" href="#home">
                    <img src="/images/logo.png" alt="logo" />
                    <p>Mundi Cocktail</p>
                </a>
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
