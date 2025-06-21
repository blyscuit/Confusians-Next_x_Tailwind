import { motion, useViewportScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const ProductImage = props => {

    const [progress, setProgress] = useState(0)
    const [height, setHeight] = useState(0);
    const [isAbsolute, setIsAbsolute] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);

    const updateDimensions = () => {
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        updateDimensions()
        window.addEventListener("resize", updateDimensions);
        const handleScroll = () => {
            const windowsHeight = window.innerHeight;
            const windowsWidth = window.innerWidth;
            const startingPoint = (windowsHeight / 4) - (windowsWidth / 30)
            const scrollY = window.scrollY;
            if (scrollY <= windowsHeight/2) { 
                setIsAbsolute(false);
                setScrollTop(startingPoint);
            } else if (scrollY > (windowsHeight * (imageCount - 0.1)) - (windowsWidth / 30)) {
                setIsAbsolute(true);
                setScrollTop((windowsHeight * (imageCount - 0.1)) - scrollY + startingPoint - (windowsWidth / 30));
            } else if (scrollY > windowsHeight/2) {
                setIsAbsolute(true);
                setScrollTop(startingPoint);
            } else {
                setIsAbsolute(false);
                setScrollTop(startingPoint);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener("resize", updateDimensions);
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

  const item = props.item

  const imageCount = (item.image || []).length + 1

  const { scrollY } = useViewportScroll();
  const scale = useTransform(scrollY, [0, 200], [1.8, 1]);
  const page = useTransform(scrollY, value => {
      return Math.floor((value / height))
  })
  const imageOpacity = useTransform(scrollY, value => {
      let scroll = (value / height)
    if (scroll <= 1.5) { return 1.0 }
    if (scroll > (imageCount-0.5)) { return 1.0 }
    let rem = scroll % 1.0
    if (rem > 0.90) { return Math.max(0.5, (1-rem) / 0.05) }
    else if (rem < 0.1) { return Math.max(0.5, (rem) / 0.05) }
    return 1.0
  })
  page.onChange(setProgress)

  return (
        <div className="w-6/12 md:w-1/4 lg:w-1/4">
            <div style={{"height":"100vh", "position": isAbsolute ? "fixed" : "relative", "width": isAbsolute ? "25%" : "100%", "top": isAbsolute ? scrollTop : "auto"}}>
                <motion.div
                    className="container"
                    style={{
                        scale, originY: "0%",
                        // y: y,
                    }}
                >
                    { item.noFrame != true ?
                        <img alt="device frame" className="w-auto absolute" src="/frame.png"></img>
                        : null
                    }

                <motion.div
                    className="container"
                    style={{
                        opacity: imageOpacity,
                    }}
                    >
                    <img alt="screenshot" className="left-1/2 absolute " style={{"width": "89%", "borderRadius": item.noFrame != true ? "24px" : "0", "transform": "translate(-50%,2.5%)"}} src={(item.image || [""])[Math.min((item.image || []).length - 1, Math.max(0, progress - 1))]}></img>

                    </motion.div>
                    </motion.div>

                </div>
            <div style={{"height": height*(imageCount)}}>
            </div>
            </div>
  );
}

export default ProductImage;
