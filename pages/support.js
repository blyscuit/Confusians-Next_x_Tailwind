
import Layout from "../components/MyLayout.js";
import Head from "next/head";
import IconView from "../components/IconView";

const Support = () => (
  <Layout footer={true}>
    <Head>
      <title>Support | Confusians</title>
      <meta name="description" content="Support page for Confusians" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={"Support | Confusians"} />
      <meta property="og:url" content={"https://confusians.com/support"} />
      <meta property="og:site_name" content="Confusians" />
      <meta property="og:image" content={"https://confusians.com/logofull.png"} />
      <meta property="og:image:secure_url" content={"https://confusians.com/logofull.png"} />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="720" />
      <meta name="twitter:card" content="app" />
      <meta name="twitter:title" content={"Support | Confusians"} />
      <meta name="twitter:image" content={"https://confusians.com/logofull.png"} />
    </Head>

    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-4xl font-bold mb-8 text-center">Support</h1>
      <p className="text-lg mb-8 text-center">If you need help, please contact us:</p>
      <a
        href="mailto:support@confusians.com"
        className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded shadow text-lg font-semibold"
        style={{ textDecoration: "none" }}
      >
  <IconView icon="IoMailOpenOutline" size={28} color="text-white" />
  <span style={{ paddingLeft: 12 }}>support@confusians.com</span>
      </a>
    </div>
  </Layout>
);

export default Support;
