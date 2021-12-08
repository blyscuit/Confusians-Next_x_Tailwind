import { motion, useViewportScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const ProductImage = props => {

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
    // else if (value < 300) { return 0 - (value / 5.0) }
    // else if (value < 400) { return 200 - (value / 2.0) }
    else if (value[0] > ((imageCount - 0.3) * height)) { return ((imageCount - 0.3) * height) - 400 } 
    return value[0] - 400
  })

  return (
        <div class="w-6/12 md:w-1/4 lg:w-1/4">
            <div style={{"height":"100vh"}}>
                <motion.div
                    className="container"
                    style={{
                    scale, originY: "0%",
                    y: y
                    }}

                    // initial={{ opacity: 0.0, y: 400.0 }}
                    // whileInView={{ opacity: 1, y: 220.0 }}
                    // transition={{ duration: 1.1 }}
                    // viewport={{ once: true }}
                >
                    <img class="w-auto" src={(item.image || [""])[0]}></img>
                </motion.div>
                </div>
            <div style={{"height": 100*(imageCount-1) + "vh"}}>
            </div>
            </div>
  );
}

export default ProductImage;