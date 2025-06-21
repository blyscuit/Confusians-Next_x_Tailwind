import Link from "next/link";

const Footer = (props) => {
  var since = 2015;
  var now = 2025;
  var brandColor = " text-lighten-4",
    yearColor = " text-lighten-3";
  if (props.backdrop == "light") {
    brandColor = "text-darken-4";
    yearColor = "text-darken-3";
  }
  return (
    <div className="group flex flex-col items-center pt-4 pb-10">
      <p className={"text-sm grey-text " + brandColor}>Confusians</p>
      <p className={"text-xs grey-text pt-2 " + yearColor}>
        © {since} - {now}
      </p>
    </div>
  );
};

export default Footer;
