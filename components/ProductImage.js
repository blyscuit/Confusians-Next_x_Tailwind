import { motion, useViewportScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const mod = (n, length) => ((n % length) + length) % length;

const ProductImage = (props) => {
  const [progress, setProgress] = useState(0);
  const [animationDirection, setAnimationDirection] = useState(1);
  const [height, setHeight] = useState(0);
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
      const calcHeight = Math.max(windowsWidth * 0.3, 220) * 1.78;

      const rect = componentRef.current?.getBoundingClientRect();
      const y = rect ? rect.top + window.scrollY : 0;
      setComponentY(y);

      setHeight(calcHeight);
      setWidth(windowsWidth);
      setBottomScroll(
        (calcHeight * imageCount) + (componentY / 2)
      );
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

      const startingPoint = height / 4 + y;
      const scrollY = window.scrollY;
      const absoluteStart = y * 0.9;

      console.log(scrollY);
      console.log(absoluteStart);
      console.log(bottomScroll);
      console.log(componentY);
      console.log("bottomScroll");
      if (scrollY <= absoluteStart) {
        setIsBottom(false);
        setIsAbsolute(false);
        setScrollTop(startingPoint);
      } else if (scrollY >= bottomScroll) {
        setIsAbsolute(true);
        setIsBottom(true);
        setScrollTop(startingPoint - (scrollY - bottomScroll));
      } else {
        setIsBottom(false);
        setIsAbsolute(true);
        setScrollTop(startingPoint - y);
      }
    };

    const handleWheel = (event) => {
      const absoluteStart = height / 2;
      const scrollY = window.scrollY;

      if (event.deltaY > 0 && scrollY < absoluteStart && scrollY + event.deltaY > absoluteStart) {
        event.preventDefault();
        window.scrollTo({
          top: absoluteStart,
          behavior: "auto",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [height, width, bottomScroll, componentY]);

  const { scrollY } = useViewportScroll();

  useEffect(() => {
    if (!height) return;

    let lastScrollY = window.scrollY;
    let accumulatedScroll = 0;
    const scrollThreshold = height;

    const handleProgressScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (delta === 0 || window.scrollY < componentY) return;

      accumulatedScroll += delta;

      if (Math.abs(accumulatedScroll) >= scrollThreshold) {
        const direction = accumulatedScroll > 0 ? 1 : -1;
        setAnimationDirection(direction);
        setProgress((current) => Math.max(0, current + direction));
        accumulatedScroll = 0;
      }
    };

    window.addEventListener("scroll", handleProgressScroll);

    return () => {
      window.removeEventListener("scroll", handleProgressScroll);
    };
  }, [height]);

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
          height: "100vh",
          position: isBottom ? "absolute" : isAbsolute ? "fixed" : "relative",
          width: "100%",
          left: isAbsolute ? 0 : "auto",
          top: isBottom ? (height * imageCount) + (componentY / 2) : isAbsolute ? scrollTop : "auto",
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
            <AnimatePresence initial={false} mode="sync">
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
                              duration: 0.3,
                              ease: "easeIn",
                            },
                          },
                        }
                      : {
                          // enter: {
                          //   opacity: 0,
                          //   // x: 80,
                          //   transition: {
                          //     duration: 0.3,
                          //     ease: "easeOut",
                          //   },
                          // },
                          center: {
                            opacity: slot.offset === 0 ? 1 : 0.2,
                            // x: 0,
                            transition: {
                              duration: 0.5,
                              ease: "easeOut",
                            },
                          },
                          // exit: {
                          //   opacity: 0,
                          //   x: -80,
                          //   transition: {
                          //     duration: 0.3,
                          //     ease: "easeIn",
                          //   },
                          // },
                        }
                  }
                  // initial="enter"
                  animate="center"
                  // exit="exit"
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <div style={{ height: (height * (imageCount)) + (componentY / 2)}} />
    </div>
  );
};

export default ProductImage;
