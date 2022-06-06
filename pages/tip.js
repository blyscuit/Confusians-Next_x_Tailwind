import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import { Helmet } from 'react-helmet';
import Head from 'next/head'
import { useEffect } from "react";
import { useDarkMode, modeBackdrop, modeBackgroundTrueBlack } from '../js/useDarkMode';  

const Tip = props => {
  
  const [colorTheme, setTheme] = useDarkMode();

  const copy = (e) => {
    e.target.select();
    navigator.clipboard.writeText("0x8F24bDF60c4989Eac7d35B5701590B9Bf130A276")
  }

  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
  };
  
  useEffect(() => {
    document.getElementById("address").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }, []);

  return(
    <Layout backdrop={modeBackdrop(colorTheme)} footer={false}>
    <Helmet>
      <title>Confusians | Tip</title>
      <body class={modeBackgroundTrueBlack(colorTheme)}></body>
    </Helmet>
    
    <Head>
      <title>Confusians | Tip</title>
      <meta name="description" content="Tip jar" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={"Confusians | Tip"} />
      <meta property="og:url" content={"https://confusians.com/tip"} />
      <meta property="og:site_name" content="Confusians" />
      <meta property="og:image" content={"https://confusians.com/logofull.png"} />
      <meta property="og:image:secure_url" content={"https://confusians.com/logofull.png"} />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="720" />
      <meta name="twitter:card" content="app" />
      <meta name="twitter:title" content={"Confusians | Tip"} />
      <meta name="twitter:image" content={"https://confusians.com/logofull.png"} />
    </Head>

    <div className="hidden">
      <h1 href="https://confusians.com">Confusians Tip Jar</h1>
    </div>

    <div class={"flex flex-col items-center  pb-10 dark:text-white"}>

        <div id="address" class="flex flex-col px-6 pt-96 pb-80">
          <h5 class={"text-2xl text-center font-light " + ""}>{"Any Chain"}</h5>
          <textarea readOnly onClick={copy} class={"text-3xl pb-4 text-center py-6 cursor-pointer	bg-transparent	" + ""}>{"0x8F24bDF60c4989Eac7d35B5701590B9Bf130A276"}</textarea>
        </div>

      </div>
  </Layout>
)
  }

export async function getStaticProps(context) {
  return {props: {}}
}

export default Tip
