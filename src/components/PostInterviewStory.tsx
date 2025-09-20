'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Extend window type
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    Splitting: any;
  }
}

interface PostInterviewStoryProps {
  candidateName?: string;
}

export default function PostInterviewStory({ candidateName }: PostInterviewStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load GSAP and ScrollTrigger
    const loadGSAP = async () => {
      // Check if scripts are already loaded
      if (window.gsap && window.ScrollTrigger && window.Splitting) {
        initializeAnimation();
        return;
      }

      // Add GSAP scripts
      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      gsapScript.crossOrigin = 'anonymous';
      document.head.appendChild(gsapScript);

      const scrollTriggerScript = document.createElement('script');
      scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      scrollTriggerScript.crossOrigin = 'anonymous';
      document.head.appendChild(scrollTriggerScript);

      const splittingScript = document.createElement('script');
      splittingScript.src = 'https://unpkg.com/splitting/dist/splitting.min.js';
      splittingScript.crossOrigin = 'anonymous';
      document.head.appendChild(splittingScript);

      const splittingCSS = document.createElement('link');
      splittingCSS.rel = 'stylesheet';
      splittingCSS.href = 'https://unpkg.com/splitting/dist/splitting.css';
      splittingCSS.crossOrigin = 'anonymous';
      document.head.appendChild(splittingCSS);

      // Wait for scripts to load
      await new Promise((resolve) => {
        let loaded = 0;
        const checkLoaded = () => {
          loaded++;
          console.log(`Loaded ${loaded}/3 scripts`);
          if (loaded === 3) {
            setTimeout(() => resolve(true), 100); // Small delay to ensure scripts are ready
          }
        };
        gsapScript.onload = checkLoaded;
        scrollTriggerScript.onload = checkLoaded;
        splittingScript.onload = checkLoaded;

        // Error handling
        gsapScript.onerror = () => console.error('Failed to load GSAP');
        scrollTriggerScript.onerror = () => console.error('Failed to load ScrollTrigger');
        splittingScript.onerror = () => console.error('Failed to load Splitting');
      });

      // Initialize animation
      initializeAnimation();
    };

    const initializeAnimation = () => {
      console.log('Initializing animation...');
      const { gsap, ScrollTrigger, Splitting } = window as any;

      if (!gsap || !ScrollTrigger || !Splitting) {
        console.error('Required libraries not loaded:', { gsap: !!gsap, ScrollTrigger: !!ScrollTrigger, Splitting: !!Splitting });
        return;
      }

      console.log('All libraries loaded, starting animation setup...');

      try {
        Splitting();
        gsap.set('.blurb', { visibility: 'visible' });
        gsap.registerPlugin(ScrollTrigger);

        // Force scroll to top
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

      const NOSE = document.querySelector('.marionette__nose');
      const CONTAINER = document.querySelector('.marionette__container');
      const MOUTH = document.querySelector('.marionette__mouth');

      gsap.set(CONTAINER, { transformOrigin: '90% 50%', scale: 0 });
      gsap.set(MOUTH, { transformOrigin: '50% 50%', scale: 0.2 });
      gsap.set('.marionette__pupil', { transformOrigin: '50% 50%', scale: 0.75 });

      const INC = 100;
      const PADDING = 200;

      const BLURB_ONE = [...document.querySelectorAll('.blurb--one .word')];
      const BLURB_TWO = [...document.querySelectorAll('.blurb--two .word')];
      const BLURB_THREE = [...document.querySelectorAll('.blurb--three .word')];
      const BLURB_FOUR = [...document.querySelectorAll('.blurb--four .word')];

      const BUFF_ONE = PADDING;
      // Once upon a time
      BLURB_ONE.forEach((word: any, index: number) => {
        gsap.to(word, {
          scrollTrigger: {
            scrub: true,
            start: () => BUFF_ONE + index * INC,
            end: () => BUFF_ONE + index * INC + INC,
          },
          opacity: 0,
        });
      });

      // There was a lad
      const BUFF_TWO = BLURB_ONE.length * INC + INC + PADDING;
      BLURB_TWO.forEach((word: any, index: number) => {
        gsap.to(word, {
          scrollTrigger: {
            scrub: true,
            start: () => BUFF_TWO + index * INC,
            end: () => BUFF_TWO + index * INC + INC,
          },
          opacity: 1,
        });
      });

      // Show the character
      gsap.to(CONTAINER, {
        scale: 1,
        scrollTrigger: {
          scrub: true,
          start: () => BUFF_TWO,
          end: () => BUFF_TWO + BLURB_TWO.length * INC + INC,
        },
      });

      // Hide the character text
      const BUFF_THREE = BUFF_TWO + BLURB_TWO.length * INC + INC + PADDING;
      BLURB_TWO.forEach((word: any, index: number) => {
        gsap.to(word, {
          scrollTrigger: {
            scrub: true,
            start: () => BUFF_THREE + index * INC,
            end: () => BUFF_THREE + index * INC + INC,
          },
          opacity: 0,
        });
      });

      // And they lied
      const BUFF_FOUR = BUFF_THREE + BLURB_TWO.length * INC + INC;
      BLURB_THREE.forEach((word: any, index: number) => {
        gsap.to(word, {
          scrollTrigger: {
            scrub: true,
            start: () => BUFF_FOUR + index * INC,
            end: () => BUFF_FOUR + index * INC + INC,
          },
          opacity: 1,
        });
      });

      const BUFF_FIVE = BUFF_FOUR + BLURB_THREE.length * INC + INC + PADDING;
      gsap.to(NOSE, {
        width: '75vmin',
        scrollTrigger: {
          scrub: true,
          start: () => BUFF_FOUR,
          end: () => BUFF_FIVE + BLURB_FOUR.length * INC + INC,
        },
      });

      gsap.to(MOUTH, {
        scale: 1,
        scrollTrigger: {
          scrub: true,
          start: () => BUFF_FOUR,
          end: () => BUFF_FIVE + BLURB_FOUR.length * INC + INC,
        },
      });

      BLURB_FOUR.forEach((word: any, index: number) => {
        gsap.to(word, {
          opacity: 1,
          scrollTrigger: {
            scrub: true,
            start: () => BUFF_FIVE + index * INC,
            end: () => BUFF_FIVE + index * INC + INC,
          },
        });
      });

      // Blinking animation
      const blink = (EYES: any) => {
        gsap.set(EYES, { scaleY: 1 });
        if (EYES.BLINK_TL) EYES.BLINK_TL.kill();
        EYES.BLINK_TL = new gsap.timeline({
          delay: Math.floor(Math.random() * 4) + 1,
          onComplete: () => blink(EYES),
        });
        EYES.BLINK_TL.to(EYES, {
          duration: 0.05,
          transformOrigin: '50% 50%',
          scaleY: 0,
          yoyo: true,
          repeat: 1,
        });
      };

      const EYES = document.querySelectorAll('.marionette__eye');
      blink(EYES);

      document.body.style.height = `${BUFF_FIVE + BLURB_FOUR.length * INC + INC + PADDING + window.innerHeight}px`;

        console.log('Animation setup complete!');
      } catch (error) {
        console.error('Error setting up animations:', error);
      }
    };

    loadGSAP();

    return () => {
      // Cleanup
      if (window.ScrollTrigger) {
        window.ScrollTrigger.killAll();
      }
      // Reset body height
      document.body.style.height = 'auto';
    };
  }, []);

  const displayName = candidateName || 'lad';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full"
    >
      {/* Scroll indicator */}
      <div className="text-center py-12 bg-gradient-to-b from-background to-muted/20">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-4"
        >
          <p className="text-muted-foreground mb-4">Scroll down to discover more...</p>
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full mx-auto relative">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-muted-foreground rounded-full absolute left-1/2 top-2 transform -translate-x-1/2"
            />
          </div>
        </motion.div>
      </div>

      <div className="marionette__container">
        <svg className="marionette" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 306.4384 100.049">
          <g transform="translate(168.1994 -94.4993)">
            <g className="marionette__body" transform="matrix(-1 0 0 1 186.7716 -32.291)">
              <rect width="7.9375" height="3.2128" x="109.7359" y="206.8494" ry="1.6064" />
              <rect ry="1.6064" y="-69.7607" x="224.027" height="3.2128" width="7.9375" transform="rotate(78.712)" />
              <rect width="7.9375" height="3.2128" x="28.5502" y="231.9518" ry="1.6064" transform="rotate(-20.815)" />
              <rect ry="1.6064" y="146.0649" x="183.4736" height="3.2128" width="7.9375" transform="rotate(23.396)" />
            </g>
            <g className="marionette__body" transform="translate(-.7692 -30.7543)">
              <rect ry="1.6064" y="206.8494" x="109.7359" height="3.2128" width="7.9375" />
              <rect transform="rotate(78.712)" width="7.9375" height="3.2128" x="224.027" y="-69.7607" ry="1.6064" />
              <rect transform="rotate(-20.815)" ry="1.6064" y="231.9518" x="28.5502" height="3.2128" width="7.9375" />
              <rect transform="rotate(23.396)" width="7.9375" height="3.2128" x="183.4736" y="146.0649" ry="1.6064" />
            </g>
            <path className="marionette__body" d="M104.0763 158.8212l-4.71 3.0476 7.4174 16.4625 4.71-3.0475zM80.3662 158.058l4.71 3.0475-7.4174 16.4626-4.71-3.0476z" />
            <path className="marionette__shirt-two" d="M81.7845 151.0708l9.2606 5.8584-8.2874 13.1003-9.2606-5.8583z" />
            <path className="marionette__short-one" d="M89.038 169.2584l-11.8608 3.8613 2.8665 8.8051s6.7645-4.0506 10.312-3.3564c2.5056.4904 5.8524 4.9413 5.8524 4.9413l5.813-5.1785-8.2677-6.9804-3.1274 2.7864z" />
            <ellipse className="marionette__short-two" transform="matrix(.95521 -.29592 .3112 .95035 0 0)" ry="4.6121" rx="1.5358" cy="192.7823" cx="19.5399" />
            <path className="marionette__body" d="M79.5594 175.535l-2.7357.9902-4.3403 1.572 1.3513 3.7315 4.3992-1.5932 2.4257-.8785a4.6122 1.5356 71.7541 00-.0263-.2268 4.6122 1.5356 71.7541 00-.0651-.414 4.6122 1.5356 71.7541 00-.0848-.4273 4.6122 1.5356 71.7541 00-.1028-.4356 4.6122 1.5356 71.7541 00-.1199-.4403 4.6122 1.5356 71.7541 00-.136-.4398 4.6122 1.5356 71.7541 00-.1048-.309 4.6122 1.5356 71.7541 00-.1602-.4295 4.6122 1.5356 71.7541 00-.172-.4175 4.6122 1.5356 71.7541 00-.1282-.2822z" />
            <path className="marionette__shoe" d="M58.101 179.9147c1.5445 5.9953 3.974 10.6174 8.9232 9.7408 4.9493-.8766 11.0168-5.3135 9.4723-11.3089-1.5445-5.9953-8.8876-10.9953-13.8369-10.1187-4.9492.8766-6.103 5.6915-4.5585 11.6868z" />
            <ellipse className="marionette__sole" cx="-25.5503" cy="188.628" rx="7.5983" ry="11.1004" transform="scale(-1 1) rotate(12.0575)" />
            <path className="marionette__shirt-one" d="M85.259 152.2735l-3.4743 19.159c.9365.1459 1.5516 3.1172 3.0117 3.826 2.621 1.2726 6.2625 1.5319 8.741 0 .0711-.0439.0744-.1507.1122-.2242 0 0 .1307-.2424.1974-.3571a8.2155 8.2155 0 01.202-.3302c.068-.1051.1362-.205.2047-.2992a5.3143 5.3143 0 01.2051-.2651 4.0588 4.0588 0 01.2036-.229 2.9838 2.9838 0 01.2-.1906 2.0826 2.0826 0 01.1943-.1494 1.416 1.416 0 01.1871-.1075.9566.9566 0 01.1772-.0646.6682.6682 0 01.167-.0206.5307.5307 0 01.2537.0666.5974.5974 0 01.1282.0982.815.815 0 01.1116.14 1.202 1.202 0 01.094.1814c.0282.067.0532.1405.075.2202.0218.0799.0405.166.0558.2578a3.57 3.57 0 01.0361.2915c.0086.1028.0138.2107.0155.3235.0016.1126 0 .23-.0051.3514a7.6091 7.6091 0 01-.0207.307l3.7221-.378-3.5298-23.4871c-4.8026 6.0587-5.2385.943-11.2654.88z" />
            <g className="marionette__logo" fill="none" strokeWidth="2.1167" strokeLinecap="round" strokeLinejoin="round">
              <path d="M88.9034 166.5829l3.0926-1.7855v-3.5709l-3.0926-1.7854-3.0925 1.7854v3.571z" strokeWidth=".755852403" />
              <path d="M85.811 164.7974l3.0924-1.7854 3.0926 1.7854-3.0926 1.7855v-3.571l3.0926-1.7854-3.0926-1.7854-3.0925 1.7854 3.0925 1.7855M88.9034 159.441v3.571" strokeWidth=".755852403" />
            </g>
            <path className="marionette__shirt-two" d="M103.3032 151.449l-9.7946 4.9137 6.9512 13.8558 9.7946-4.9138z" />
            <g transform="rotate(12.0572 76.9171 -61.6913) scale(1.1222)">
              <ellipse className="marionette__shoe" ry="11.1004" rx="7.5983" cy="152.3086" cx="134.8652" />
              <ellipse className="marionette__sole" cx="136.0782" cy="152.8694" rx="7.5983" ry="11.1004" />
            </g>
          </g>
          <g transform="translate(168.1994 -94.4993)">
            <ellipse className="marionette__body" cx="122.5346" cy="105.4087" rx="23.4087" ry="27.8344" transform="rotate(12.7347) skewX(.1607)" />
            <g className="marionette__eye">
              <g transform="translate(171.6012 -106.5893)">
                <circle r="5.2917" cy="228.9643" cx="-83.5327" />
                <circle className="marionette__pupil" r="1.8899" cy="227.8304" cx="-85.4226" />
              </g>
            </g>
            <g className="marionette__eye">
              <g transform="translate(187.0982 -102.8095)">
                <circle cx="-83.5327" cy="228.9643" r="5.2917" />
                <circle className="marionette__pupil" cx="-85.4226" cy="227.8304" r="1.8899" />
              </g>
            </g>
            <path className="marionette__cheek" d="M76.7292 127.6666a6.8036 6.8036 0 00-3.3874.9131 23.4586 29.6733 8.8137 00-.3421 4.5253 23.4084 27.8347 12.1858 001.2795 7.7045 6.8036 6.8036 0 002.45.464 6.8036 6.8036 0 006.8037-6.8032 6.8036 6.8036 0 00-6.8037-6.8037z" />
            <circle className="marionette__cheek" r="6.8036" cy="140.5178" cx="105.0774" />
            <ellipse className="marionette__mouth" cx="-16.5862" cy="170.7461" rx="3.2128" ry="4.5357" transform="rotate(-37.101)" />
            <ellipse className="marionette__body" cx="139.6026" cy="110.7116" rx="3.7084" ry="5.6795" transform="rotate(9.433)" />
            <path className="marionette__hair" d="M98.6632 102.2434a23.4084 27.8347 12.1858 00-16.0114 6.5587l36.11 9.8563a23.4084 27.8347 12.1858 00-16.1293-15.9334 23.4084 27.8347 12.1858 00-3.9693-.4816z" />
          </g>
          <g transform="translate(168.1994 -94.4993)">
            <path className="cap__accent" d="M120.1756 113.836c.0863.3307.2041.6883.2687 1.0087.1522.7547.2419 1.4962.2574 2.295.0155.7987-.0431 1.655-.187 2.6406-.144.9855-.3734 2.0998-.6998 3.4148 5.498.265 16.5349 2.5925 18.3896-.7912.6125-2.2416-6.9815-5.8505-18.0289-8.568zM84.9649 110.4343l17.6302 4.9355-.7385 2.638-17.6302-4.9354z" />
            <path className="cap" d="M100.6853 94.665c-4.0217.075-8.5087.1886-11.8075 2.4903-4.4836 3.1283-7.996 7.6063-9.2444 14.952l6.6952 1.8475c.3415-.9966 1.2214-3.2373 2.4065-3.7367 3.1919-1.345 7.9428-.3392 10.1209 2.3538.8818 1.0904.4782 3.7134.2356 4.9046l20.7233 5.7186c1.3055-5.2599 2.8492-10.8349 1.5839-15.489-.615-2.262-2.3562-4.111-3.993-5.7888-1.718-1.761-3.7853-3.2074-5.9692-4.3398-1.9722-1.0227-4.1568-1.5995-6.3097-2.1477-1.456-.3707-2.9395-.7928-4.4416-.7648z" />
            <ellipse className="cap__accent" cx="120.4369" cy="73.2447" rx="1.4366" ry=".6682" transform="rotate(11.183)" />
          </g>
          <div className="marionette__nose"></div>
        </svg>
      </div>

      <div className="story">
        <div className="story__content story__content--top">
          <h1 className="blurb blurb--one" data-splitting="">Once upon a time,</h1>
          <h1 className="blurb blurb--three" data-splitting="">And they lied</h1>
        </div>
        <div className="story__content story__content--bottom">
          <h1 className="blurb blurb--two" data-splitting="">{`There was a ${displayName}.`}</h1>
          <h1 className="blurb blurb--four" data-splitting="">and lied, and lied, and lied, and lied.</h1>
        </div>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .marionette__container {
          --size: 90;
          --ar: calc(194.8 / 596.69);
          --coeff: 1vmin;
          --width: calc(var(--size) * var(--coeff));
          --height: calc((var(--size) * var(--ar)) * var(--coeff));
          width: var(--width);
          position: fixed;
          height: var(--height);
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(0);
          transform-origin: 90% 50%;
        }

        .marionette {
          height: 100%;
          width: 100%;
        }

        .cap {
          fill: hsl(0, 0%, 20%);
        }

        .cap__accent {
          fill: hsl(58, 91%, 51%);
        }

        .marionette__shoe {
          fill: hsl(0, 0%, 5%);
        }

        .marionette__sole {
          fill: hsl(22, 21%, 52%);
        }

        .marionette__shirt-one {
          fill: hsl(0, 0%, 29%);
        }

        .marionette__shirt-two {
          fill: hsl(0, 0%, 17%);
        }

        .marionette__short-one {
          fill: hsl(4, 80%, 39%);
        }

        .marionette__short-two {
          fill: hsl(4, 80%, 32%);
        }

        .marionette__cheek {
          fill: hsla(4, 57%, 74%, 0.5);
        }

        .marionette__mouth,
        .marionette__eye circle:nth-of-type(1) {
          fill: hsl(0, 0%, 10%);
        }

        .marionette__pupil {
          fill: hsl(0, 0%, 95%);
        }

        .marionette__hair {
          fill: hsl(32, 25%, 45%);
        }

        .marionette__logo {
          stroke: white;
        }

        .marionette__body {
          fill: hsl(33, 74%, 74%);
        }

        .marionette__nose {
          position: absolute;
          top: 36%;
          right: 15.5%;
          width: 0;
          height: 2.5vmin;
          background: hsl(12, 71%, 74%);
        }

        .marionette__nose:after,
        .marionette__nose:before {
          content: '';
          position: absolute;
          height: 2.5vmin;
          width: 2.5vmin;
          border-radius: 50%;
          background: hsl(12, 71%, 74%);
        }

        .marionette__nose:after {
          left: 0;
          transform: translate(-50%, 0);
        }

        .marionette__nose:before {
          transform: translate(50%, 0);
          right: 0;
        }

        .story {
          height: 100vh;
          width: 100vw;
          position: fixed;
          overflow: hidden;
          pointer-events: none;
        }

        .story__content {
          position: absolute;
          width: var(--width);
          left: 50%;
          transform: translate(-50%, var(--y));
        }

        .story__content--bottom {
          top: 50%;
          --y: calc(0% + (var(--height) / 2));
        }

        .story__content--top {
          bottom: 50%;
          --y: calc(0% - (var(--height) / 2));
        }

        .story__content--bottom .blurb {
          top: 0;
        }

        .story__content--top .blurb {
          bottom: 0;
        }

        .blurb {
          position: absolute;
          visibility: hidden;
          font-size: 2rem;
          font-weight: 800;
          color: white;
          text-align: center;
        }

        .blurb--two .word,
        .blurb--three .word,
        .blurb--four .word {
          opacity: 0;
        }

        @media (max-width: 768px) {
          .blurb {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .blurb {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </motion.div>
  );
}