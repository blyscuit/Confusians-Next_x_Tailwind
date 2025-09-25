import Link from "next/link";

const Header = (props) => {
  var logoImage = "/logofull.png",
    headerTextClass = " font-light grey-text text-lighten-5",
    seperatorTextClass = " font-light grey-text text-lighten-1";
  if (props.backdrop == "light") {
    logoImage = "/logodark.png";
    headerTextClass = "font-light grey-text text-darken-1";
    seperatorTextClass = "font-light grey-text text-darken-1";
  }
  return (
    <div className="group flex flex-col items-center pt-8">
      <div
        className="flex flex-col items-center"
        id="index-banner-logo-section"
      >
        <div className="" id="index-banner-logo" 
        // style={{ paddingLeft: 13 }}
        >
          <Link href="/">
            <div id="logo-container" className="">
              <img
                id="logoImage"
                alt="Confusians logo"
                className="w-32 md:w-44"
                src={logoImage}
                align="middle"
              ></img>
            </div>
          </Link>
        </div>

        <div
          className="pt-4 transition duration-300 ease-out sm:opacity-100 md:opacity-0 group-hover:opacity-100"
          id="link-section"
        >
          <Link href="/">
            <span className={headerTextClass}>Work</span>
          </Link>
          <span className={seperatorTextClass}> | </span>
          <Link href="/blog">
            <span className={headerTextClass}>Blog</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
