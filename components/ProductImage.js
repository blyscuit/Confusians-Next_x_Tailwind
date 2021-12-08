import { motion, useViewportScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const ProductImage = props => {

    const [progress, setProgress] = useState(0)
    const [height, setHeight] = useState(0);
    const updateDimensions = () => {
        setHeight(window.innerHeight);
    }
    useEffect(() => {
        updateDimensions()
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

  const item = props.item

  const imageCount = item.image.length + 1

  const { scrollY, scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollY, [0, 200], [1.8, 1]);
  const y = useTransform([scrollY, scrollYProgress], value => {
    if (value[0] <= 400) { return 0 }
    else if (value[0] > ((imageCount - 0.3) * height)) { return ((imageCount - 0.3) * height) - 400 } 
    return value[0] - 400
  })
  const page = useTransform(scrollY, value => {
      return Math.floor((value / height))
  })
  const imageOpacity = useTransform(scrollY, value => {
      let scroll = (value / height)
    if (scroll <= 1.5) { return 1.0 }
    if (scroll > (imageCount-0.5)) { return 1.0 }
    let rem = scroll % 1.0
    if (rem > 0.95) { return (1-rem) / 0.025 }
    else if (rem < 0.05) { return (rem) / 0.025 }
    return 1.0
  })
  page.onChange(setProgress)

  return (
        <div class="w-6/12 md:w-1/4 lg:w-1/4">
            <div style={{"height":"100vh"}}>
                <motion.div
                    className="container"
                    style={{
                    scale, originY: "0%",
                    y: y,
                    opacity: imageOpacity
                    }}
                >
                    <img class="w-auto" src={(item.image || [""])[Math.min(item.image.length - 1, Math.max(0, progress - 1))]}></img>
                </motion.div>
                </div>
            <div style={{"height": 100*(imageCount-1) + "vh"}}>
            </div>
            </div>
  );
}

export default ProductImage;