const StaticProductImage = (props) => {
  return (
    <div className="w-10/12 items-center content-center">
      {props.image && Array.isArray(props.image) && props.image.map((imgSrc, idx) => {
        const isGif = /\.gif(\?|$)/i.test(String(imgSrc));
        const style = isGif
          ? "w-full h-auto mb-2"
          : "w-full h-auto mb-2";

        return (
          <img
            key={idx}
            src={imgSrc}
            alt={`Product image ${idx + 1}`}
            className={style}
            loading="lazy"
          />
        );
      })}
    </div>
  );
};

export default StaticProductImage;
