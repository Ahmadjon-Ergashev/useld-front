import { useEffect } from "react";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Spinner } from "flowbite-react";
import { Fade } from "react-awesome-reveal";
import Slider from "react-slick";
import i18next from "i18next";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";

import { LeftChevron, RigthChevron } from "../../assets/icons";
import apiClient from "../../utils/apiClient";

import "./Products.css";


function SampleNextArrow(props) {
  const { t } = useTranslation();
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{
        ...style,
        background: "#EEAD0F",
        width: "40px",
        height: "40px",
        padding: "5px",
        borderRadius: "10px",
        boxSizing: "border-box",
      }}
      onClick={onClick}
    >
      <RigthChevron />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{
        ...style,
        background: "#EEAD0F",
        width: "40px",
        height: "40px",
        padding: "5px",
        borderRadius: "10px",
        boxSizing: "border-box",
      }}
      onClick={onClick}
    >
      <LeftChevron />
    </div>
  );
}

const settings = {
  infinite: true,
  slidesToShow: 4,
  speed: 500,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
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

export const Products = ({ id }) => {
  const { t } = useTranslation();
  const [products, setProducts] = useState({
    data: [],
    isLoading: true,
    error: null,
  });

  const getData = async () => {
    const res = await apiClient.get("getting-starters/");
    const data = await res.json();
    if (res.status === 200) {
      setProducts({
        data: data,
        isLoading: false,
        error: "",
      });
    } else {
      setProducts({ data: [], isLoading: false, error: "Nimadir xato" });
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-[#F0F0F0] py-10 mb-20" id={id}>
      <div className="container mx-auto w-[90%] mb-10 ">
        {products.isLoading ? (
          <Spinner
            color="info"
            aria-label="Extra large spinner example"
            size="xl"
          />
        ) : (
          <Slider {...settings}>
            {products.data.map((item) => (
              <Fade key={item.id} className="px-3">
                <div className="relative">
                  <LazyLoadImage
                    key={item.id}
                    src={`${item?.image}`}
                    effect={"opacity"}
                    className="w-full h-full object-fill img-lazy rounded mb-4 z-0"
                    width={"100%"}
                    height={"100%"}
                  />
                  <div className="product-card absolute bottom-5 left-0 w-[100%] h-[50%] flex items-end p-3">
                    <p className="text-center w-full p-3 text-2xl text-white sm:text-base md:text-lg lg:text-xl xl:text-2xl max-sm:text-sm max-[600px]:text-base max-[480px]:text-xl">
                      {t("Starter.desc", {
                        starter_content_body: `${
                          item?.translations[`${i18next.language}`].body
                        }`,
                      })}
                    </p>
                  </div>
                </div>
              </Fade>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};
