import Layout from "../../components/MyLayout.js";
import IconView from "../../components/IconView";

export const metadata = {
  title: "Support | Confusians",
  description: "Support page for Confusians",
};

export default function SupportRoute() {
  return (
    <Layout footer={true}>
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
}
