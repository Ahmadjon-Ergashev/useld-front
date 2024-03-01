import { Partners } from "../../components/partners/Partners";
import { useTranslation } from "react-i18next";

import { Hero } from "../../components/hero/Hero";
import { AboutUs } from "../../components/about_us/AboutUs";
import { ContactForm } from "../../components/contact_form/ContactForm";
import { Products } from "../../components/products/Products";


export const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Hero />
      <AboutUs id={"aboutus"}/>
      <Products id={"products"}/>
      <Partners id={"partners"}/>
      <ContactForm />
    </div>
  );
};
