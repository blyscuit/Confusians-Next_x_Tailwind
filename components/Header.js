import Link from 'next/link'

const Header = props => {
  var logoImage = "/logofull.png",
    headerTextClass = " font-light grey-text text-lighten-5",
    seperatorTextClass = " font-light grey-text text-lighten-1"
  if (props.backdrop == "light") {
    logoImage = "/logodark.png"
    headerTextClass = "font-light grey-text text-darken-1"
    seperatorTextClass = "font-light grey-text text-darken-1"
  }
  return (
    <div class="group flex flex-col items-center pt-20">
      <div class="flex flex-col items-center" id="index-banner-logo-section">
        <div class="" id="index-banner-logo" style={{ paddingLeft: 13 }}>
          <Link href="/">
            <a id="logo-container" class="">
              <img id="logoImage" class="w-32" src={logoImage} align="middle"></img>
            </a>
          </Link>
        </div>

        <div class="pt-4 transition duration-300 ease-out sm:opacity-100 md:opacity-0 group-hover:opacity-100" id="link-section">
          <Link href="/">
            <a><span class={headerTextClass}>Work</span></a>
          </Link>
          <span class={seperatorTextClass}> | </span>
          <Link href="/blog">
            <a><span class={headerTextClass}>Blog</span></a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;