import Layout from "../components/MyLayout";
import fetch from "isomorphic-unfetch";
import catalog from "../db/catalog.json";
import IconView from "../components/IconView";
import Head from "next/head";
import ProductImage from "../components/ProductImage";
import StaticProductImage from "../components/StaticProductImage";
import SmartAppBanner from "../components/SmartAppBanner";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

const Post = (props) => {
  const [isClient, setIsClient] = useState(false);
  const [isMd, setIsMd] = useState(false);
  const item = props;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateBreakpoint = () => setIsMd(mediaQuery.matches);

    updateBreakpoint();
    mediaQuery.addEventListener("change", updateBreakpoint);

    return () => mediaQuery.removeEventListener("change", updateBreakpoint);
  }, []);

  const router = useRouter();
  const { id } = router.query;

  const style = isClient ? { fontFamily: props.font } : {};

  let linkSection = (
    <div className="w-full flex justify-center px-4 pt-10">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-10">

        {/* iOS FIRST */}
        {item.ios && (
          <a
            href={item.ios}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center"
          >
            <img
              src="/Store=App Store, Language=English.svg"
              alt="Download on the App Store"
              className="h-full w-auto" style={{height: "40px"}} 
            />
          </a>
        )}

        {(!item.ios || item.ios === "") && item.macos && (
          <a
            href={item.macos}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center"
          >
            <img
              src="/Store=App Store, Language=English.svg"
              alt="Download on the App Store"
              className="h-full w-auto" style={{height: "40px"}} 
            />
          </a>
        )}

        {/* Android (compensate transparent padding) */}
        {item.adr && (
          <a
            href={item.adr}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center"
          >
            <img
              src="/Store=Google Play, Language=English.svg"
              alt="Get it on Google Play"
              className="h-full w-auto" style={{height: "40px"}} 
            />
          </a>
        )}
      </div>
    </div>
  );

  let steamSection = (
    item.steam != null && item.steam !== "" ? (
            <div className="pt-4 w-full px-10 md:px-0 md:max-w-lg mx-auto">
            <iframe
              src={`https://store.steampowered.com/widget/${item.steam}/`}
              width='100%'
              height="190"
            ></iframe>
            </div>
          ) : null
  );

  return (
    <div>
      <Layout
        item={item}
        backdrop={(item.textColor || "").includes("lighten") ? "dark" : "light"}
      >
        <Head>
          <title>{item.name || ""} | Confusians</title>
          <meta name="description" content={item.name + " " + item.about + " " + item.markdownText} />
          <meta
            name="robots"
            content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={item.name} />
          <meta property="og:description" content={item.about} />
          <meta
            property="og:url"
            content={"https://confusians.com/" + item.name}
          />
          <meta property="og:site_name" content="Confusians" />
          <meta
            property="og:image"
            content={"https://confusians.com/" + (item.image || [""])[0]}
          />
          <meta
            property="og:image:secure_url"
            content={"https://confusians.com/" + (item.image || [""])[0]}
          />
          <meta property="og:image:width" content="1280" />
          <meta property="og:image:height" content="720" />
          <meta name="twitter:card" content="app" />
          <meta name="twitter:description" content={item.about} />
          <meta name="twitter:title" content={item.name} />
          <meta
            name="twitter:image"
            content={"https://confusians.com/" + (item.image || [""])[0]}
          />
          {item.adr && <link rel="manifest" href={`/manifests/${id}_manifest.json`} />}
          {item.ios_banner && <meta name="apple-itunes-app" content={`app-id=${item.ios_banner}`}></meta>}
        </Head>

        <div className={"flex flex-col items-center  pb-10"}>
          <SmartAppBanner item={item}></SmartAppBanner>
          <div className="flex flex-col px-6 py-16">
            <h1
              className={"text-6xl pb-4 text-center " + item.textColor}
              style={style}
            >
              {item.name}
            </h1>

            {item.video ? (
            <div className="sm:pl-10 sm:pr-10 pt-20 w-full sm:w-full md:max-w-3xl mx-auto">
                <video
                  width='100%'
                  max-width='100vw'
                  height="315"
                  controls autoPlay loop muted playsInline
                >
                  <source src={item.video}/>
                </video>

                {linkSection}

                {steamSection}
              </div>
            ) : null}

            <h5 className={"px-10 pt-10 md:px-20 text-2xl text-center font-light " + item.textColor}>
                {item.about && (<ReactMarkdown>{item.about}</ReactMarkdown>)}
            </h5>

            <h5 className={"px-10 md:px-20 text-xl text-center font-light " + item.textColor}>
              {item.markdownText && (
                <ReactMarkdown
                  components={{
                    a: ({node, ...props}) => (
                      <a {...props} style={{ textDecoration: "underline" }} />
                    ),
                  }}
                >
                  {item.markdownText}
                </ReactMarkdown>
              )}
            </h5>
          </div>

          {item.noScaleAnimation ? (
            <StaticProductImage image={item.image} />
          ) : (
            <ProductImage item={item}></ProductImage>
          )}

          {linkSection}

          {steamSection}

          {item.youtube ? (
          <div className="pt-10 sm:pl-10 sm:pr-10 w-full sm:w-full md:max-w-2xl mx-auto">
              <iframe
                width='100%'
                max-width='100vw'
                height="315"
                src={item.youtube}
                allowFullScreen
              ></iframe>
            </div>
          ) : null}

          <div className="grid-container"></div>
          <div
            className={
              "self-stretch grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-2 mx-6 gap-x-4 " +
              item.textColor
            }
          >
            {(item.description ?? []).map(function (des) {
              return (
                <div
                  key={des.text}
                  className={`flex ${!isMd ? "flex-row" : "flex-col"} ${!isMd ? "items-top" : "items-center"} pt-${!isMd ? "4" : "6"}`}
                >
                  <div
                    className={!isMd ? "mt-0.5" : ""}
                  >
                  <IconView
                    icon={des.icon}
                    size={!isMd ? 20 : 40}
                    color={item.textColor}
                  />
                  </div>
                  <div className={`${!isMd ? "pl-4" : "pt-3 md:pt-4"} ${!isMd ? "text-left" : "text-center"}`}>
                    {des.text}
                  </div>
                </div>
              );
            })}
          </div>

          {item.presskit == true ? (
          <div className="flex flex-col items-center py-16">
            <a
              href={id ? `/press-kit/${id}` : "/"}
              className={"underline text-xl font-semibold " + item.textColor}
            >
              Press Kit!
            </a>
          </div>
          ) : null}

          {(item.description ?? []).length > 0 ? linkSection : null}
        </div>
      </Layout>
    </div>
  );
};

export async function getStaticPaths() {
  const paths = catalog.index.map((index) => {
    return {
      params: {
        id: index.id,
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  var { id } = context.params;
  id = id || "";
  var item = catalog[id.toLowerCase()];

  if (!item) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: item };
}

export default Post;
