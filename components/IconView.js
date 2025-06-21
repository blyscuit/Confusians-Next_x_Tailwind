import * as Icons from "react-icons/io5";

const IconView = (props) => {
  switch (props.icon) {
    case "cloud":
      return (
        <Icons.IoCloudOutline className={"" + props.color} size={props.size} />
      );
    case "IoMoonSharp":
      return (
        <Icons.IoMoonSharp className={"" + props.color} size={props.size} />
      );
    case "IoStorefrontSharp":
      return (
        <Icons.IoStorefrontSharp
          className={"" + props.color}
          size={props.size}
        />
      );
    case "IoTabletLandscapeOutline":
      return (
        <Icons.IoTabletLandscapeOutline
          className={"" + props.color}
          size={props.size}
        />
      );
    case "IoSquareOutline":
      return (
        <Icons.IoSquareOutline className={"" + props.color} size={props.size} />
      );
    case "IoWatchOutline":
      return (
        <Icons.IoWatchOutline className={"" + props.color} size={props.size} />
      );
    case "IoLogoEuro":
      return (
        <Icons.IoLogoEuro className={"" + props.color} size={props.size} />
      );
    case "IoLockClosedOutline":
      return (
        <Icons.IoLockClosedOutline
          className={"" + props.color}
          size={props.size}
        />
      );
    case "IoNotificationsOutline":
      return (
        <Icons.IoNotificationsOutline
          className={"" + props.color}
          size={props.size}
        />
      );
    case "IoLogoBitcoin":
      return (
        <Icons.IoLogoBitcoin className={"" + props.color} size={props.size} />
      );
    case "IoApps":
      return <Icons.IoApps className={"" + props.color} size={props.size} />;
    default:
      return <div />;
  }
};

export default IconView;
