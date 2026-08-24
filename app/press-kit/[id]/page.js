import Layout from "../../../components/MyLayout";
import catalog from "../../../db/catalog.json";
import steamPresskit from "../../../db/steam_presskit.json";

export default function PressKitRoute({ params }) {
  const id = params?.id;
  const entry = id ? catalog[id] : null;
  const presskit = id ? steamPresskit[id] : null;

  if (!entry) {
    return null;
  }

  return (
    <Layout backdrop={(entry.textColor || "").includes("lighten") ? "dark" : "light"}>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className={"text-center text-4xl md:text-6xl " + entry.textColor}>{entry.name}</h1>
        <div className="pt-8 text-center text-xl font-light">Press Kit</div>

        <div className="mt-10 rounded-xl border border-white/20 p-6 backdrop-blur-sm bg-white/5">
          <h2 className="text-2xl mb-4">Developer</h2>
          <p className="whitespace-pre-line">{presskit?.developer || "Confusians"}</p>
        </div>

        {presskit?.pitch ? (
          <div className="mt-8 rounded-xl border border-white/20 p-6 backdrop-blur-sm bg-white/5">
            <h2 className="text-2xl mb-4">Pitch</h2>
            <p className="whitespace-pre-line">{presskit.pitch}</p>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
