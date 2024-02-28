import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Spinner } from "flowbite-react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { Slide } from "react-awesome-reveal";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-lazy-load-image-component/src/effects/blur.css";

import { HeroIcon } from "../../assets/icons";
import apiClient from "../../utils/apiClient";

export const Hero = () => {
  const { t } = useTranslation();
  const [banner, setBanner] = useState({
    data: [],
    isLoading: true,
    error: null,
  });

  const [motto, setMotto] = useState({
    data: [],
    isLoading: true,
    error: null,
  });

  const getData = async (url) => {
    const res = await apiClient.get(url);
    const data = await res.json();
    if (res.status === 200) {
      url === "responsibilities/"
        ? setMotto({
          data: data,
          isLoading: false,
          error: "",
        })
        : setBanner({ data: data, isLoading: false, error: "" });
    } else {
      url === "responsibilities/"
        ? setMotto({
          data: [],
          isLoading: false,
          error: "Nimadir xato",
        })
        : setBanner({ data: [], isLoading: false, error: "Nimadir xato" });
    }
  };
  useEffect(() => {
    getData("banners/");
    getData("responsibilities/");
  }, []);

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="">
      <Slider
        {...settings}
        autoplay={true}
        cssEase="linear"
        autoplaySpeed={4000}
        // fade={true}
        pauseOnHover={false}
      >
        {banner.isLoading ? (
          <Spinner
            color="info"
            aria-label="Extra large spinner example"
            size="xl"
            className="ml-20"
          />
        ) : banner.error ? (
          <h1 className="text-center text-2xl p-56 bg-black text-white">
            Xatolik
          </h1>
        ) : (
          banner.data.map((item) => (
            <div
              className="w-full h-[700px] max-md:h-[350px] relative -z-30 bg-black"
              key={item.id}
            >
              <div className="absolute md:top-1/3 left-1/2 md:-translate-x-1/2 z-50 max-md:bottom-20 max-md:left-0 max-md:px-4">
                <h1 className="text-5xl font-bold text-white text-center shadow-md max-md:text-3xl">
                  <span className="text-primary_color">
                    {t("Banner.title", {
                      banner_content_title: `${item?.translations[`${i18next.language}`].title
                        }`,
                    })}
                  </span>
                </h1>
                <p className="text-xl text-white text-center mt-10  max-[550px]:text-base">
                  {t("Banner.desc", {
                    banner_content_body: `${item?.translations[`${i18next.language}`].body
                      }`,
                  })}
                </p>
              </div>
              <LazyLoadImage
                style={{
                  opacity: "0.5",
                }}
                src={item.image}
                alt={`${item?.translations[i18next.language].title}`}
                className="w-full h-full object-cover"
                effect={"blur"}
                placeholder={
                  <Spinner
                    color="info"
                    aria-label="Extra large spinner example"
                    size="xl"
                  />
                }
                width={"100%"}
                height={"100%"}
              />
            </div>
          ))
        )}
      </Slider>
      <div className="flex max-md:flex-col max-md:gap-10 justify-between bg-white rounded-3xl md:py-10 md:px-20 px-4 md:shadow-2xl md:w-[90%] md:-mt-32 mx-auto relative container">
        {motto.isLoading ? (
          <div className="w-[30%]">
            <HeroIcon />
            <h2 className="text-2xl text-secondary_color  font-bold my-4">
              <Spinner
                color="info"
                aria-label="Extra large spinner example"
                size="xl"
              />
            </h2>
            <p className="text-secondary_color text-xl">
              <Spinner
                color="info"
                aria-label="Extra large spinner example"
                size="xl"
              />
            </p>
          </div>
        ) : (
          motto?.data?.slice(0, 3).map((item) => (
            <div
              key={item._id}
              className="md:w-[30%] max-md:bg-slate-50 max-md:rounded-3xl max-md:shadow-md max-md:py-10 max-md:px-2"
            >
              {/* <HeroIcon /> */}
              <h2 className="text-2xl text-secondary_color  font-bold my-4">
                {t("Motto.title", {
                  motto_content_title: `${item?.translations[`${i18next.language}`].title
                    }`,
                })}
              </h2>
              <p className="text-secondary_color text-xl">
                {t("Motto.desc", {
                  motto_content_body: `${item?.translations[`${i18next.language}`].body
                    }`,
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
