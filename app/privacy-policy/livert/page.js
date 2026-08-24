import Layout from "../../../components/MyLayout.js";

export const metadata = {
  title: "Privacy Policy | Livert",
  description: "Privacy policy for Livert",
};

export default function PrivacyPolicyPage() {
  return (
    <Layout footer={true}>
      <div className="container mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">Last updated: July 27, 2026</p>
        <p>
          This Privacy Policy explains how Confusians handles information for Livert and related services.
        </p>
      </div>
    </Layout>
  );
}
