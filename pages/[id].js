import Layout from '../components/MyLayout';
import fetch from 'isomorphic-unfetch';
import catalog from '../db/catalog.json'
import { Helmet } from 'react-helmet';

const Post = props => {
  var item = catalog[props.id] || {}
  return (
    <div class={item.backgroundColor}>
      <Layout backdrop={item.textColor.includes("lighten") ? "dark" : "light"}>

        <Helmet>
          <title>{item.name} | Confusians</title>
          <body class={item.backgroundColor}></body>
        </Helmet>

        <div class={"flex flex-col items-center  pb-10"}>

          <div class="flex flex-col px-6 py-16">
            <h1 class={"text-6xl text-center " + item.textColor} style={{ "font-family": item.font }}>{item.name}</h1>
            <h5 class={"text-2xl text-center font-light " + item.textColor}>{item.about}</h5>
          </div>

          <div class="w-2/3 md:w-1/4 lg:w-1/4">
            <div>
              <img class="w-auto" src={item.image[0]}></img>
            </div>
          </div>

          <div class="w-2/3 md:w-1/4 lg:w-1/4 pb-4 pt-2 px-2">
            <div class="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-between pt-4 items-stretch">

              {item.adr != "" ? (
                <div class={"flex-1 flex items-center flex-col"}>
                  <div class="">
                    <a href={item.adr}>
                      <img alt="Android app on Google Play"
                        src="https://play.google.com/intl/en_us/badges/images/apps/en-play-badge-border.png" style={{ width: '122px', height: '44px', marginTop: -1 }} />
                    </a>
                  </div>
                </div>
              ) : null}

              {item.ios != "" ? (
                <div class="flex-1 flex items-center flex-col pt-4 sm:pt-4 md:pt-4 lg:pt-0">
                  <div class="pt-px ">
                    <a href={item.ios} style={{ display: 'inline-block', overflow: 'hidden', background: 'url("http://linkmaker.itunes.apple.com/images/badges/en-us/badge_appstore-lrg.svg")', backgroundRepeat: 'no-repeat', width: '135px', height: '40px' }}></a>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

      </Layout>
    </div>
  );
}

Post.getInitialProps = async function (context) {

  return context.query;
};

export default Post;