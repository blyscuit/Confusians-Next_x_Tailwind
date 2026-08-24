"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const mod = (n, length) => ((n % length) + length) % length;

const ProductImage = (props) => {
  const [progress, setProgress] = useState(0);
  const [animationDirection, setAnimationDirection] = useState(1);
  const [height, setHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [bottomScroll, setBottomScroll] = useState(0);
  const [isAbsolute, setIsAbsolute] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  const item = props.item;
  const images = item.image && item.image.length > 0 ? item.image : [""];
  const imageCount = images.length + 1;
  const componentRef = useRef(null);
  const [componentY, setComponentY] = useState(0);
  const scrollTopRef = useRef(0);

  useEffect(() => {
    const updateDimensions = () => {
      const windowsHeight = window.innerHeight;
      const windowsWidth = window.innerWidth;
      const calcHeight = Math.max(Math.min(800,windowsWidth) * 0.3, 220) * 1.78;

      const rect = componentRef.current?.getBoundingClientRect();
      const y = rect ? rect.top + window.scrollY : 0;
      setComponentY(y);
      setWindowHeight(windowsHeight);
      setHeight(calcHeight);
      setBottomScroll(
        (calcHeight * (imageCount - 1)) + (componentY)
      );
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [imageCount, componentY]);

  useEffect(() => {
    let frame = null;

    const updatePosition = () => {
      const rect = componentRef.current?.getBoundingClientRect();
      const y = rect ? rect.top + window.scrollY : componentY;
      const scrollY = window.scrollY;

      const viewportImageHeight = Math.min(height, 800 * 0.3 * 1.78);
      const centeredTop = (windowHeight - viewportImageHeight) / 2;
      const absoluteStart = y * 0.84;
      const absoluteEnd = bottomScroll - 100;

      let nextTop;
      let nextAbsolute;
      let nextBottom;

      if (scrollY <= absoluteStart) {
        nextAbsolute = false;
        nextBottom = false;
        nextTop = y - scrollY;
      } else if (scrollY >= absoluteEnd) {
        nextAbsolute = true;
        nextBottom = true;
        nextTop = centeredTop + y - (scrollY - bottomScroll);
      } else {
        nextAbsolute = true;
        nextBottom = false;
        nextTop = centeredTop;
      }

      scrollTopRef.current = nextTop;
      setIsAbsolute(nextAbsolute);
      setIsBottom(nextBottom);
      setScrollTop(nextTop);
    };

    const handleScroll = () => {
      if (frame === null) {
        frame = requestAnimationFrame(() => {
          frame = null;
          updatePosition();
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    updatePosition();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
    };
  }, [height, windowHeight, bottomScroll, componentY]);


  useEffect(() => {
    if (!height) return;

    const handleProgressScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < componentY) {
        setProgress(0);
        return;
      }
      if (currentScrollY > bottomScroll) {
        setProgress(imageCount - 1);
        return;
      }

      const newProgress = Math.max(0, Math.ceil((currentScrollY - componentY) / height));
      const direction = newProgress >= progress ? 1 : -1;

      setAnimationDirection(direction);
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleProgressScroll);

    return () => {
      window.removeEventListener("scroll", handleProgressScroll);
    };
  }, [height, componentY, progress]);

  const centerIndex = Math.max(0, progress - 1);

  const slots = [-1, 0, 1].map((offset) => ({
    offset,
    key: centerIndex + offset,
    src: images[mod(centerIndex + offset, images.length)],
  }));

  return (
    <div ref={componentRef} className="pointer-events-none" 
      style={{
          width: "100%",
        }}
    >
      <div
        style={{
          height: height + 180,
          position: isBottom ? "absolute" : isAbsolute ? "fixed" : "relative",
          width: "100%",
          left: isAbsolute ? 0 : "auto",
          top: isBottom ? bottomScroll : isAbsolute ? scrollTopRef.current : "auto",
          overflow: isBottom || !isAbsolute ? "hidden" : "visible",
        }}
      >
        <motion.div
          className="container"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "0 auto",
            maxWidth: "800px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "visible",
            }}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {slots.map((slot) => (
                <motion.img
                  key={slot.key}
                  layout
                  alt="screenshot"
                  src={slot.src}
                  style={{
                    width: "30%",
                    minWidth: "220px",
                    flexShrink: 0,
                    borderRadius: "16px",
                    marginLeft: "2%",
                    marginRight: "2%",
                  }}
                  variants={
                    animationDirection > 0
                      ? {
                          enter: {
                            opacity: 0,
                            x: 80,
                            transition: {
                              duration: 0.3,
                              ease: "easeOut",
                            },
                          },
                          center: {
                            opacity: slot.offset === 0 ? 1 : 0.2,
                            x: 0,
                            transition: {
                              duration: 0.5,
                              ease: "easeOut",
                            },
                          },
                          exit: {
                            opacity: 0,
                            x: -80,
                            transition: {
                              duration: 0.3,
                              ease: "easeIn",
                            },
                          },
                        }
                      : {
                          enter: {
                            opacity: 0,
                            x: -80,
                            transition: {
                              duration: 0.3,
                              ease: "easeOut",
                            },
                          },
                          center: {
                            opacity: slot.offset === 0 ? 1 : 0.2,
                            x: 0,
                            transition: {
                              duration: 0.5,
                              ease: "easeOut",
                            },
                          },
                          exit: {
                            opacity: 0,
                            x: 80,
                            transition: {
                              duration: 0.2,
                              ease: "easeIn",
                            },
                          },
                        }
                  }
                  initial="enter"
                  animate="center"
                  exit="exit"
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <div style={{ height: (height * (imageCount)) + 180}} />
    </div>
  );
};

export default ProductImage;
