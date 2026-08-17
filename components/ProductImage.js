import { motion, useViewportScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const mod = (n, length) => ((n % length) + length) % length;

const ProductImage = (props) => {
  const [progress, setProgress] = useState(0);
  const [previousProgress, setPreviousProgress] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [bottomScroll, setBottomScroll] = useState(0);
  const [isAbsolute, setIsAbsolute] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  const item = props.item;
  const images = item.image && item.image.length > 0 ? item.image : [""];
  const imageCount = images.length + 1;

  useEffect(() => {
    const updateDimensions = () => {
      const windowsHeight = window.innerHeight;
      const windowsWidth = window.innerWidth;

      setHeight(windowsHeight);
      setWidth(windowsWidth);
      setBottomScroll(
        windowsHeight * (imageCount - 0.2) - windowsWidth / 30
      );
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [imageCount]);

  useEffect(() => {
    const handleScroll = () => {
      const startingPoint = height / 4 - width / 30;
      const scrollY = window.scrollY;

      if (scrollY <= height / 2) {
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
        setScrollTop(startingPoint);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [height, width, bottomScroll]);

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

      // Only advance progress when scrolling down.
      if (delta <= 0) return;

      accumulatedScroll += delta;

      if (accumulatedScroll >= scrollThreshold) {
        setPreviousProgress(progress);
        setProgress((current) => current + 1);
        accumulatedScroll = 0;
      }
    };

    window.addEventListener("scroll", handleProgressScroll);

    return () => {
      window.removeEventListener("scroll", handleProgressScroll);
    };
  }, [height, progress]);

  const direction = 1;
  const centerIndex = Math.max(0, progress - 1);

  const slots = [-1, 0, 1].map((offset) => ({
    offset,
    key: centerIndex + offset,
    src: images[mod(centerIndex + offset, images.length)],
  }));

  return (
    <div className="pointer-events-none">
      <div
        style={{
          height: "100vh",
          position: isBottom ? "absolute" : isAbsolute ? "fixed" : "relative",
          width: "100%",
          left: isAbsolute ? 0 : "auto",
          top: isBottom ? height * imageCount : isAbsolute ? scrollTop : "auto",
          overflow: "visible",
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
            <AnimatePresence initial={false} mode="sync" custom={direction}>
              {slots.map((slot) => (
                <motion.img
                  key={slot.key}
                  layout
                  custom={direction}
                  alt="screenshot"
                  src={slot.src}
                  style={{
                    width: "30%",
                    flexShrink: 0,
                    borderRadius: "16px",
                    marginLeft: "2%",
                    marginRight: "2%",
                  }}
                  variants={{
                    enter: (direction) => ({
                      opacity: 0,
                      x: direction > 0 ? 80 : -80,
                      transition: {
                        duration: 0.3,
                        ease: "easeOut",
                      },
                    }),
                    center: (direction) => ({
                      opacity: slot.offset === 0 ? 1 : 0.2,
                      x: 0,
                      transition: {
                        duration: 0.5,
                        ease: "easeOut",
                      },
                    }),
                    exit: (direction) => ({
                      opacity: 0,
                      x: direction > 0 ? -80 : 80,
                      transition: {
                        duration: 0.3,
                        ease: "easeIn",
                      },
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <div style={{ height: height * imageCount - 1 }} />
    </div>
  );
};

export default ProductImage;
