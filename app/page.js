import Layout from "../components/MyLayout.js";
import Link from "next/link";
import catalog from "../db/catalog.json";
import HomeCard from "../components/HomeCard";

export const metadata = {
  title: "Confusians",
  description: "Creates independent Games and Apps.",
};

export default function Page() {
  return (
    <Layout footer={true}>
      <div className="hidden">
        <h1 href="https://confusians.com">Confusians</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 py-10 px-6 gap-2">
        {(catalog.index || []).map((item) => {
          const detail = catalog[item.id] || {};
          return (
            <div key={item.id} className="w-full">
              <Link href={`/${item.id}`} scroll={false} >
                <HomeCard
                  backgroundColor={detail.backgroundColor}
                  name={detail.name}
                  textColor={item.textColor ? item.textColor : detail.textColor}
                  image={item.image}
                  font={detail.font}
                  appIcon={item.appIcon}
                  textLogo={item.textLogo}
                  ios={detail.ios}
                  adr={detail.adr}
                  steam={detail.steam}
                  macos={detail.macos}
                />
              </Link>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 pt-64 pb-16 px-6 gap-2">
        <p className="text-lg rounded-lg text-left py-2 transition duration-500 ease-out transform ">
          Older Works:
        </p>
        {(catalog.older || []).map((item) => {
          const detail = catalog[item.id] || {};
          return (
            <div key={item.id} className="w-full">
              <Link href={`/${item.id}`} scroll={false}>
                <HomeCard
                  backgroundColor={detail.backgroundColor}
                  name={detail.name}
                  textColor={detail.textColor}
                  image={item.image}
                  font={detail.font}
                  is_small={true}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
