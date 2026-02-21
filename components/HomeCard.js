import { useEffect, useState } from "react";

const HomeCard = (props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // runs only in the browser
  }, []);

  const style = isClient ? { fontFamily: props.font } : {};

  return (
    <div
      className={"relative group flex flex-col " +  (props.is_small ? "h-24 " : "h-80 ") + props.backgroundColor}
    >
      <div
        className={
          "absolute w-full group flex flex-col items-center h-full justify-center  "
        }
      >
        {/* this used to be the border slide up style, removed by the fading style to match blur background */}
        {/* <div className={"absolute overflow-hidden z-10 flex flex-col items-center h-80 justify-center"}>
                <p className={"text-xl w-48 rounded-lg border-2 text-center py-2 transition duration-500 ease-in-out transform group-hover:-translate-y-40 " + props.textColor + " " + ""} style={{ "fontFamily": props.font, "border": "2px solid currentColor" }}>{props.name}</p>
            </div> */}

        <div
          className="absolute z-10 flex flex-col items-center h-full justify-center opacity-0 transition duration-300 ease-out transform group-hover:opacity-100"
        >
          {props.textLogo ? (
            /* Show text logo only */
            <img
              src={props.textLogo}
              alt={props.name}
              className="w-48 object-contain"
            />
          ) : (
            <>
              {/* Show app icon if it exists */}
              {props.appIcon && (
                <img
                  src={props.appIcon}
                  alt={props.name}
                  className="w-16 mb-3"
                />
              )}

              {/* Always show text when no textLogo */}
              <p
                className={
                  "text-3xl rounded-lg text-center py-2 px-2 " +
                  props.textColor + " "
                }
                style={style}
              >
                {props.name}
              </p>
            </>
          )}
        </div>

        <div
          className={
            "absolute w-full h-full ease-out opacity-0 duration-300 group-hover:opacity-100 "
          }
          style={{
            backdropFilter: "blur( 6px )",
            WebkitBackdropFilter: "blur( 6px )",
            borderRadius: "10px",
          }}
        ></div>
        {/* <div
          className={
            "absolute w-full h-full duration-300 ease-out opacity-0 group-hover:opacity-0 " +
            props.backgroundColor
          }
        ></div> */}
      </div>
      <img
        {...(props.image ? { alt: props.name } : {})}
        className={"object-top object-cover w-full h-full"}
        src={props.image}
      /> 

      {props.image.length <= 0 ? (
            <div className={"absolute h-full w-full flex flex-col items-center justify-center "}>
              <p
                className={
                  "text-3xl rounded-lg text-center " +
                  props.textColor
                }
                style={style}
              >
                {props.name}
              </p>
            </div>
        ) 
        : null}
    </div>
  );
};

export default HomeCard;
