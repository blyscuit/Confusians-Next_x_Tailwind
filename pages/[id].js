import Layout from "../components/MyLayout";
import fetch from "isomorphic-unfetch";
import catalog from "../db/catalog.json";
import IconView from "../components/IconView";
import Head from "next/head";
import ProductImage from "../components/ProductImage";
import StaticProductImage from "../components/StaticProductImage";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const Post = (props) => {
  const [isClient, setIsClient] = useState(false);

  const item = props;

  const style = isClient ? { fontFamily: props.font } : {};

  let linkSection = (
    <div className="w-2/3 md:w-1/4 lg:w-1/4 pb-4 pt-2 px-2">
      <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-between pt-4 items-stretch">
        {item.adr != null && item.adr != "" ? (
          <div className={"flex-1 flex items-center flex-col"}>
            <div className="">
              <a href={item.adr}>
                <img
                  alt="Android app on Google Play"
                  src="https://play.google.com/intl/en_us/badges/images/apps/en-play-badge-border.png"
                  style={{ width: "122px", height: "44px", marginTop: -1 }}
                />
              </a>
            </div>
          </div>
        ) : null}

        {item.ios != null && item.ios != "" ? (
          <div className="flex-1 flex items-center flex-col pt-4 sm:pt-4 md:pt-4 lg:pt-0">
            <div className="pt-px ">
              <a
                href={item.ios}
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  background:
                    'url("https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg")',
                  backgroundRepeat: "no-repeat",
                  width: "120px",
                  height: "40px",
                }}
              ></a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <div className={item.backgroundColor}>
      <Layout
        backdrop={(item.textColor || "").includes("lighten") ? "dark" : "light"}
      >
        <Head>
          <title>{item.name || ""} | Confusians</title>
          <meta name="description" content={item.name + " | " + item.about} />
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
        </Head>

        <div className={"flex flex-col items-center  pb-10"}>
          <div className="flex flex-col px-6 py-16">
            <h1
              className={"text-6xl pb-4 text-center " + item.textColor}
              style={style}
            >
              {item.name}
            </h1>

            {item.video ? (
            <div className="sm:pl-10 sm:pr-10 py-40 w-full sm:w-full md:max-w-3xl mx-auto">
                <video
                  width='100%'
                  max-width='100vw'
                  height="315"
                  controls autoPlay loop muted playsInline
                >
                  <source src={item.video}/>
                </video>
              </div>
            ) : null}

            <h5 className={"px-10 md:px-20 text-2xl text-center font-light " + item.textColor}>
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

          {item.steam != null && item.steam !== "" ? (
            <div className="pt-10 w-full px-10 md:px-0 md:max-w-lg mx-auto">
            <iframe
              src={`https://store.steampowered.com/widget/${item.steam}/`}
              width='100%'
              height="190"
            ></iframe>
            </div>
          ) : null}

          {item.youtube ? (
          <div className="sm:pl-10 sm:pr-10 pt-10 w-full sm:w-full md:max-w-2xl mx-auto">
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
              "self-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2 mx-6 " +
              item.textColor
            }
          >
            {(item.description ?? []).map(function (des) {
              return (
                <div
                  key={des.text}
                  className="flex flex-col items-center pt-16"
                >
                  <IconView icon={des.icon} size={60} color={item.textColor} />
                  <div className={"pt-4 "}>{des.text}</div>
                </div>
              );
            })}
          </div>

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
