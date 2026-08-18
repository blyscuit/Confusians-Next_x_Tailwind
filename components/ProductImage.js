import { motion, useViewportScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const mod = (n, length) => ((n % length) + length) % length;

const ProductImage = (props) => {
  const [progress, setProgress] = useState(0);
  const [animationDirection, setAnimationDirection] = useState(1);
  const [height, setHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [bottomScroll, setBottomScroll] = useState(0);
  const [isAbsolute, setIsAbsolute] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  const item = props.item;
  const images = item.image && item.image.length > 0 ? item.image : [""];
  const imageCount = images.length + 1;
  const componentRef = useRef(null);
  const [componentY, setComponentY] = useState(0);

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
      setWidth(windowsHeight);
      setBottomScroll((calcHeight * (imageCount - 1)) + y);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [imageCount, componentY]);

  useEffect(() => {
    const handleScroll = () => {
      const rect = componentRef.current?.getBoundingClientRect();
      const y = rect ? rect.top + window.scrollY : componentY;
      const scrollY = window.scrollY;
      const viewportImageHeight = Math.min(height, 800 * 0.3 * 1.78);
      const startingPoint = (windowHeight - viewportImageHeight) / 2;
      const absoluteStart = y;
      const absoluteEnd = y + height * (imageCount - 1) - 40;

      if (scrollY <= absoluteStart) {
        setIsBottom(false);
        setIsAbsolute(false);
        setScrollTop((y - scrollY));
      } else if (scrollY >= absoluteEnd) {
        setIsBottom(true);
        setIsAbsolute(true);
        setScrollTop(40 - (scrollY - absoluteEnd));
      } else {
        setIsBottom(false);
        setIsAbsolute(true);
        setScrollTop(startingPoint);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [height, width, imageCount, windowHeight, componentY]);

  const { scrollY } = useViewportScroll();

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
          position: (scrollTop == 0) ? "relative" : "fixed",
          width: "100%",
          left: 0,
          top: scrollTop,
          overflow: isBottom ? "hidden" : "visible",
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
