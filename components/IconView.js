import * as Icons from 'react-icons/io5';

const IconView = props => {

    switch(props.icon) {
        case "cloud":
            return ( <Icons.IoCloudOutline class={"" + props.color} size={props.size} /> )
        case "IoMoonSharp":
            return ( <Icons.IoMoonSharp class={"" + props.color} size={props.size} /> )
        case "IoStorefrontSharp":
            return ( <Icons.IoStorefrontSharp class={"" + props.color} size={props.size} /> )
        case "IoTabletLandscapeOutline":
            return ( <Icons.IoTabletLandscapeOutline class={"" + props.color} size={props.size} /> )
        default:
            return ( <div /> )
      }
}

export default IconView;