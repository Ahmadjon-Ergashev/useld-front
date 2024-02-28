import React from "react";
import { Slide } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";

import "./AboutUs.css";

export const AboutUs = ({id}) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between gap-10 container mx-auto w-[90%] mb-20 max-md:flex-col">
      <Slide className="w-1/2 max-md:w-full" direction="left">
        <div className="">
          <h1 id={id} className="mb-24">&nbsp;</h1>
          <h1 className="text-secondary_color text-4xl font-bold mb-10 max-md:mb-4 max-md:text-xl">
          {t("Header.about")}
          </h1>
          <p className="text-secondary_color text-2xl max-md:text-lg">
          {t("about.title")}
          </p>
        </div>
      </Slide>
    </div>
  );
};
