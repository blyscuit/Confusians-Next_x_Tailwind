import Layout from "../components/MyLayout.js";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import catalog from "../db/catalog.json";
import HomeCard from "../components/HomeCard";
import Head from "next/head";

export const metadata = {
  title: "Confusians",
  description: "Creates independent Games and Apps.",
};

const Index = (props) => (
  <Layout footer={true}>
    <Head>
      <title>Confusians</title>
      <meta name="description" content="Creates independent Games and Apps." />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={"Confusians"} />
      <meta property="og:url" content={"https://confusians.com/"} />
      <meta property="og:site_name" content="Confusians" />
      <meta
        property="og:image"
        content={"https://confusians.com/logofull.png"}
      />
      <meta
        property="og:image:secure_url"
        content={"https://confusians.com/logofull.png"}
      />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="720" />
      <meta name="twitter:card" content="app" />
      <meta name="twitter:title" content={"Confusians"} />
      <meta
        name="twitter:image"
        content={"https://confusians.com/logofull.png"}
      />
    </Head>

    <div className="hidden">
      <h1 href="https://confusians.com">Confusians</h1>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 py-10 px-6 gap-2">
      {((props.catalog || {}).index || []).map((item) => {
        var detail = props.catalog[item.id] || {};
        return (
          <div key={item.id} className="w-full">
            <Link href={{ pathname: "/[id]", query: {} }} as={`/${item.id}`}>
              <HomeCard
                backgroundColor={detail.backgroundColor}
                name={detail.name}
                textColor={item.textColor ? item.textColor : detail.textColor}
                image={item.image}
                font={detail.font}
                appIcon={item.appIcon}
                textLogo={item.textLogo}
              ></HomeCard>
            </Link>
          </div>
        );
      })}
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 pt-64 pb-16 px-6 gap-2">
      <p
            className={
              "text-lg rounded-lg text-left py-2 transition duration-500 ease-out transform "
            }
          >
            Older Works:
          </p>
      {((props.catalog || {}).older || []).map((item) => {
        var detail = props.catalog[item.id] || {};
        return (
          <div key={item.id} className="w-full">
            <Link href={{ pathname: "/[id]", query: {} }} as={`/${item.id}`}>
              <HomeCard
                backgroundColor={detail.backgroundColor}
                name={detail.name}
                textColor={detail.textColor}
                image={item.image}
                font={detail.font}
                is_small={true}
              ></HomeCard>
            </Link>
          </div>
        );
      })}
    </div>
  </Layout>
);

export async function getStaticProps(context) {
  return { props: { catalog: catalog } };
}

export default Index;
