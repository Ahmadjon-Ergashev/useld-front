import { Accordion, Spinner } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import apiClient from "../../utils/apiClient";

export const Accardion = () => {
  const { t } = useTranslation();
  const [faqs, setFaqs] = useState({ data: [], isLoading: false, error: null });

  const getData = async () => {
    const res = await apiClient.get("xalqaro_aloqa/all");
    if (res.status === 200) {
      setFaqs({
        data: res.data.filter((item) => item.category === "a"),
        isLoading: false,
        error: "",
      });
      console.log(res.data.filter((item) => item.category === "a"));
    } else {
      setFaqs({ data: [], isLoading: false, error: "Nimadir xato" });
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container w-[90%] mx-auto mb-20">
      <h1 className="text-secondary_color text-4xl font-bold mb-10 text-center">
        {t("Header.Questions")}
      </h1>

      {faqs.isLoading ? (
        <Spinner
          color="info"
          aria-label="Extra large spinner example"
          size="xl"
        />
      ) : faqs.error ? (
        <h1 className="text-center text-2xl">{faqs.error}</h1>
      ) : (
        <Accordion>
          {faqs.data.map((item) => (
            <Accordion.Panel key={item._id}>
              <Accordion.Title>
                {t("faq.title", {
                  faq_content_title: `${item?.[`title_${i18next.language}`]}`,
                })}
              </Accordion.Title>
              <Accordion.Content>
                <Fade>
                  <div
                    className="mb-2 text-gray-500 dark:text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html: t("faq.desc", {
                        faq_content_body: `${
                          item?.[`body_${i18next.language}`]
                        }`,
                      }),
                    }}
                  />
                  {/* {item.body_uz}
                  </div> */}
                </Fade>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
      )}
    </div>
  );
};
