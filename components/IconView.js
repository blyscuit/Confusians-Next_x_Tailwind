import * as Icons from 'react-icons/io5';

const IconView = props => {

    switch (props.icon) {
        case "cloud":
            return (<Icons.IoCloudOutline class={"" + props.color} size={props.size} />)
        case "IoMoonSharp":
            return (<Icons.IoMoonSharp class={"" + props.color} size={props.size} />)
        case "IoStorefrontSharp":
            return (<Icons.IoStorefrontSharp class={"" + props.color} size={props.size} />)
        case "IoTabletLandscapeOutline":
            return (<Icons.IoTabletLandscapeOutline class={"" + props.color} size={props.size} />)
        case "IoSquareOutline":
            return (<Icons.IoSquareOutline class={"" + props.color} size={props.size} />)
        case "IoWatchOutline":
            return (<Icons.IoWatchOutline class={"" + props.color} size={props.size} />)
        case "IoLogoEuro": return (<Icons.IoLogoEuro class={"" + props.color} size={props.size} />)
        case "IoLockClosedOutline": return (<Icons.IoLockClosedOutline class={"" + props.color} size={props.size} />)
        default:
            return (<div />)
    }
}

export default IconView;