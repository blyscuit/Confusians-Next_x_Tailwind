import Layout from "../../components/MyLayout";
import fetch from "isomorphic-unfetch";
import catalog from "../../db/catalog.json";
import IconView from "../../components/IconView";
import ProductImage from "../../components/ProductImage";
import StaticProductImage from "../../components/StaticProductImage";
import ReactMarkdown from "react-markdown";

const ProductRoute = ({ params }) => {
  const { id } = params;
  const item = catalog[id?.toLowerCase()];

  if (!item) {
    return null;
  }


  let linkSection = (
    <div className="w-full flex justify-center px-4 pt-10">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-10">

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

        <div className={"flex flex-col items-center  pb-10"}>
          <div className="flex flex-col px-6 py-16">
            <h1
              className={"text-6xl pb-4 text-center " + item.textColor}
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
              "self-stretch grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-2 mx-6 " +
              item.textColor
            }
          >
            {(item.description ?? []).map(function (des) {
              return (
                <div
                  key={des.text}
                  className="flex flex-col items-center pt-16"
                >
                  <IconView
                    icon={des.icon}
                    size={40}
                    color={item.textColor}
                  />
                  <div className="pt-3 md:pt-4 text-center">
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

export async function generateStaticParams() {
  return catalog.index.map((index) => ({
    id: index.id,
  }));
}

export async function generateMetadata({ params }) {
  const item = catalog[params?.id?.toLowerCase()];

  if (!item) {
    return {};
  }

  const image = (item.image || [""])[0];

  return {
    title: `${item.name || ""} | Confusians`,
    description: `${item.name || ""} ${item.about || ""} ${item.markdownText || ""}`,
    robots: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
    openGraph: {
      locale: "en_US",
      type: "website",
      title: item.name,
      description: item.about,
      url: `https://confusians.com/${item.name}`,
      siteName: "Confusians",
      images: image ? [`https://confusians.com/${image}`] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: item.name,
      description: item.about,
      images: image ? [`https://confusians.com/${image}`] : [],
    },
  };
}

export default ProductRoute;
