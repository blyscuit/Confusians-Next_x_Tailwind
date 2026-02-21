import Layout from "../components/MyLayout.js";
import Head from "next/head";

const About = () => (
  <Layout footer={true}>
    <Head>
      <title>About - Confusians</title>
      <meta name="description" content="About the solo developer behind Confusians." />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="About - Confusians" />
      <meta property="og:url" content="https://confusians.com/about" />
      <meta property="og:site_name" content="Confusians" />
    </Head>

    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-slate-900">
        Hi,
      </h1>

      <div className="prose prose-lg max-w-none text-md text-slate-700 space-y-6">
        <p>
          I'm Bliss — a solo developer.
          <br />
          I build games and apps that are simple, thoughtful, and enjoyable to use.
        </p>

        <p>
          Confusians has been my side project since 2015. Ten years in, I'm now working to make it full-time.
        </p>

        <p>
          If you're a returning visitor, thank you, and expect more real soon.
        </p>

        <p className="text-sm">
          Confusians
          <br />
          82 Petchkasem
          <br />
          73000
          <br />
          THAILAND
        </p>
      </div>
    </div>
  </Layout>
);

export default About;
