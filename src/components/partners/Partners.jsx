import { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import apiClient from "../../utils/apiClient";
import { useTranslation } from "react-i18next";
export const Partners = ({id}) => {
  const { t } = useTranslation();
  const [partners, setPartners] = useState({
    data: [],
    isLoading: true,
    error: null,
  });

  const getData = async () => {
    const res = await apiClient.get("platforms/");
    const data = await res.json();
    if (res.status === 200) {
      setPartners({
        data: data,
        isLoading: false,
        error: "",
      });
    } else {
      setPartners({ data: [], isLoading: false, error: "Nimadir xato" });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (partners.data.length < 3)
    partners.data = [...partners.data, ...partners.data, ...partners.data];

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    delay: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-[120px] mb-[60px]" id={id}>
      <h1
        className={`text-secondary_color text-4xl font-bold text-center my-10`}
      >
        {t("Header.OurPartners")}
      </h1>
      <div className=" flex justify-center items-center ">
        <div className="container w-[100%] mx-auto">
          <Slider {...settings}>
            {partners.data.map((image, id) => (
              <div className="py-4 h-40 w-72 rounded-xl cursor-pointer px-10">
                <a
                  href={image?.url}
                  target="_blank"
                  className="flex items-center justify-center"
                >
                  <img
                    className="h-40 w-56 object-contain text-center"
                    src={image?.image}
                    alt={image?.title}
                    title={image?.title}
                  />
                  <h1 className="text-2xl font-bold text-secondary_color max-md:text-xl m-5 max-sm:hidden">{image?.title}</h1>
                </a>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
