import { useEffect, useState } from "react";

const HomeOldCard = (props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // runs only in the browser
  }, []);

  const style = isClient ? { fontFamily: props.font } : {};

  return (
    <div
      className={"relative group flex flex-col h-24 " + props.backgroundColor}
    >
      <div
        className={
          "absolute w-full group flex flex-col items-center h-full justify-center  "
        }
      >
        <div
          className={
            "absolute z-10 flex flex-col items-center h-full justify-center transition duration-500 ease-out transform group-hover:opacity-0 "
          }
        >
          <p
            className={
              "text-2xl w-48 rounded-lg text-center py-2 " +
              (props.image.length > 0 ? " " : " ") +
              props.textColor +
              " " +
              ""
            }
            style={style}
          >
            {props.name}
          </p>
        </div>

        <div
          className={
            "absolute w-full h-full duration-300 ease-out opacity-50 md:opacity-100 group-hover:opacity-0 "
          }
          style={{
            backdropFilter: "blur( 6px )",
            WebkitBackdropFilter: "blur( 6px )",
            borderRadius: "10px",
          }}
        ></div>
        <div
          className={
            "absolute w-full h-full duration-300 ease-out opacity-50 group-hover:opacity-0 " +
            props.backgroundColor
          }
        ></div>
      </div>
      <img
        {...(props.image ? { alt: props.name } : {})}
        className={"object-cover w-full h-full"}
        src={props.image}
      />
    </div>
  );
};

export default HomeOldCard;
