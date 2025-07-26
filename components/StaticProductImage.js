const StaticProductImage = (props) => {
  return (
    <div className="w-10/12">
      {props.image && Array.isArray(props.image) && props.image.map((imgSrc, idx) => (
        <img
          key={idx}
          src={imgSrc}
          alt={`Product image ${idx + 1}`}
          className="w-full h-auto mb-2"
        />
      ))}
    </div>
  );
};

export default StaticProductImage;
