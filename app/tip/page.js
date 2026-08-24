import Layout from "../../components/MyLayout.js";

export const metadata = {
  title: "Confusians | Tip",
  description: "Tip jar",
};

export default function TipRoute() {
  return (
    <Layout footer={false}>
      <div className="hidden">
        <h1 href="https://confusians.com">Confusians Tip Jar</h1>
      </div>

      <div className="flex flex-col items-center pb-10 dark:text-white">
        <div id="address" className="flex flex-col px-6 pt-96 pb-80">
          <h5 className="text-2xl text-center font-light ">{"Any Chain"}</h5>
          <textarea readOnly className="text-3xl pb-4 text-center py-6 cursor-pointer bg-transparent">
            {"0x150AAA0950537a99c1Ce1E5f258F00774011602B"}
          </textarea>
        </div>
      </div>
    </Layout>
  );
}
