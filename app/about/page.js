import Layout from "../../components/MyLayout.js";

export const metadata = {
  title: "About - Confusians",
  description: "About the solo developer behind Confusians.",
};

export default function AboutRoute() {
  return (
    <Layout footer={true}>
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
            Confusians has been my side project since 2015. Ten years in, I'm working to make it sustainable.
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
}
