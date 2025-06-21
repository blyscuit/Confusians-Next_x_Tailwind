import Link from 'next/link'
import { useEffect, useState } from 'react';

const HomeCard = props => {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // runs only in the browser
  }, []);

  const style = isClient ? { fontFamily: props.font } : {};

  return (
    <div className={"relative group flex flex-col h-64 " + props.backgroundColor}>
        <div className={"absolute w-full group flex flex-col items-center h-64 justify-center  "}>

            {/* this used to be the border slide up style, removed by the fading style to match blur background */}
            {/* <div className={"absolute overflow-hidden z-10 flex flex-col items-center h-64 justify-center"}>
                <p className={"text-xl w-48 rounded-lg border-2 text-center py-2 transition duration-500 ease-in-out transform group-hover:-translate-y-40 " + props.textColor + " " + ""} style={{ "fontFamily": props.font, "border": "2px solid currentColor" }}>{props.name}</p>
            </div> */}
            
            <div className={"absolute overflow-hidden z-10 flex flex-col items-center h-64 justify-center"}>
                <p className={"text-3xl w-48 rounded-lg text-center py-2 transition duration-500 ease-out transform " + (props.image.length > 0 ? " group-hover:opacity-0 " : " ") + props.textColor + " " + ""} style={style}>{props.name}</p>
            </div>

            <div className={"absolute w-full h-full duration-300 ease-out opacity-50 md:opacity-100 group-hover:opacity-0 "} style={{"backdropFilter": "blur( 6px )","WebkitBackdropFilter": "blur( 6px )","borderRadius": "10px"}} ></div>
            <div className={"absolute w-full h-full duration-300 ease-out opacity-50 group-hover:opacity-0 " + props.backgroundColor} ></div>
        </div>
        <img alt={props.name} className={"object-cover w-full h-full"} src={props.image}></img>
    </div>
  );
}

export default HomeCard;
