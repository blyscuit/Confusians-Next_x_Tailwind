import Link from 'next/link'

const HomeCard = props => {
    // console.log(props)
  return (
    <div class={"relative group flex flex-col h-64 " + props.backgroundColor}>
        <div class={"absolute w-full group flex flex-col items-center h-64 justify-center  "}>

            {/* this used to be the border slide up style, removed by the fading style to match blur background */}
            {/* <div class={"absolute overflow-hidden z-10 flex flex-col items-center h-64 justify-center"}>
                <p class={"text-xl w-48 rounded-lg border-2 text-center py-2 transition duration-500 ease-in-out transform group-hover:-translate-y-40 " + props.textColor + " " + ""} style={{ "fontFamily": props.font, "border": "2px solid currentColor" }}>{props.name}</p>
            </div> */}
            
            <div class={"absolute overflow-hidden z-10 flex flex-col items-center h-64 justify-center"}>
                <p class={"text-3xl w-48 rounded-lg text-center py-2 transition duration-500 ease-out transform " + (props.image.length > 0 ? " group-hover:opacity-0 " : " ") + props.textColor + " " + ""} style={{ "fontFamily": props.font}}>{props.name}</p>
            </div>

            <div class={"absolute w-full h-full duration-300 ease-out opacity-50 md:opacity-100 group-hover:opacity-0 "} style={{"backdrop-filter": "blur( 6px )","-webkit-backdrop-filter": "blur( 6px )","border-radius": "10px"}} ></div>
            <div class={"absolute w-full h-full duration-300 ease-out opacity-50 group-hover:opacity-0 " + props.backgroundColor} ></div>
        </div>
        <img class={"object-cover w-full h-full"} src={props.image}></img>
    </div>
  );
}

export default HomeCard;