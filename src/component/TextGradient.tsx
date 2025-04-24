import { JSX, useEffect, useRef } from "react";
import styles from "./TextGradient.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const phrase =
   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, alias neque. Modi ad rerum, perferendis delectus, dolores quaerat accusantium placeat, alias quam officia hic. Molestias inventore sint natus tempora soluta. Dignissimos praesentium sint temporibus in? Vel repudiandae commodi, doloremque, quas mollitia ipsam doloribus deserunt ullam laudantium placeat nostrum omnis quaerat error possimus, magni voluptatem quia.";

const TextGradient = () => {
   const refs = useRef<(HTMLSpanElement | null)[]>([]);
   const container = useRef(null);

   const splitWord = (phrase: string) => {
      const body: JSX.Element[] = [];
      phrase.split(" ").forEach((word, i) => {
         const letters = splitLetters(word);
         body.push(<p key={word + "_" + i}>{letters}</p>);
      });

      return body;
   };

   const splitLetters = (word: string) => {
      const letters: JSX.Element[] = [];
      word.split("").forEach((letter, i) => {
         letters.push(
            <span
               key={letter + "_" + i}
               ref={(el) => {
                  refs.current.push(el);
               }}
            >
               {letter}
            </span>
         );
      });

      return letters;
   };

   useEffect(() => {
      gsap.registerPlugin(ScrollTrigger);

      createAnimation();
   }, []);

   const createAnimation = () => {
      gsap.to(refs.current, {
         scrollTrigger: {
            trigger: container.current,

            scrub: true,

            start: `top`,

            end: `+=${window.innerHeight / 1.5}`,
         },

         opacity: 1,

         ease: "none",

         stagger: 0.1,
      });
   };

   return (
      <main ref={container} className={styles.main}>
         <div className={styles.body}>{splitWord(phrase)}</div>
      </main>
   );
};
export default TextGradient;
