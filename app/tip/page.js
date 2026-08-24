"use client";
import Layout from "../../components/MyLayout.js";
import Link from "next/link";
import { useEffect } from "react";
import {
  useDarkMode,
  modeBackdrop,
  modeBackgroundTrueBlack,
} from "../../js/useDarkMode";

const TipRoute = (props) => {
  const [colorTheme, setTheme] = useDarkMode();

  const copy = (e) => {
    e.target.select();
    navigator.clipboard.writeText("0x150AAA0950537a99c1Ce1E5f258F00774011602B");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    document
      .getElementById("address")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }, []);

  return (
    <Layout backdrop={modeBackdrop(colorTheme)} footer={false}>
      <div className="hidden">
        <h1 href="https://confusians.com">Confusians Tip Jar</h1>
      </div>

      <div className={"flex flex-col items-center  pb-10 dark:text-white"}>
        <div id="address" className="flex flex-col px-6 pt-96 pb-80">
          <h5 className={"text-2xl text-center font-light " + ""}>
            {"Any Chain"}
          </h5>
          <textarea
            readOnly
            onClick={copy}
            className={
              "text-3xl pb-4 text-center py-6 cursor-pointer	bg-transparent	" + ""
            }
          >
            {"0x150AAA0950537a99c1Ce1E5f258F00774011602B"}
          </textarea>
        </div>
      </div>
    </Layout>
  );
};

export default TipRoute;
