import {
  TelegramIcon,
  InstagramIcon,
  YouTubeIcon,
  Global,
  FacebookIcon,
  TwitterIcon,
  PhoneIcon,
  Email,
  Support,
} from "../../assets/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      <footer className={` bg-[#063F58] w-full `}>
        <div className="container mx-auto w-[90%] my-[20px] ">
          <div className="container flex justify-between">
            <div className="text-center">
              <Link to="/" className="my-4 block  ">
                <div className="flex items-center ">
                  <img src={logo} alt="Main logo" width={"20%"}/>
                </div>
              </Link>
            </div>
            <div className=" lg:block hidden ">
              <div
                className={` mx-auto my-12  flex items-center justify-end text-white font-bold xl:text-base `}
              >
                <a href="#aboutus">
                  <span className="mx-3">{t("Header.about")}</span>{" "}
                </a>
                <a href="#products">
                  <span className="mx-3">{t("Header.product")}</span>{" "}
                </a>

                <a href="#partners">
                  <span className="mx-3">{t("Header.partners")}</span>
                </a>
                <a href="#contactus">
                  <span className="mx-3">{t("Header.ContactUs")}</span>
                </a>
              </div>
            </div>
          </div>
          <hr />

          <div className="flex gap-4    items-end justify-between ">
            <div className="lg:flex lg:flex-col flex-row-reverse   max-md:flex-col max-md:gap-10 ">
              <div className="flex items-center gap-2 my-3">
                <PhoneIcon />
                <a className="text-white" href="tel:+19292276727">+1 929 227 6727</a>
              </div>
              <div className="flex items-center gap-2 my-3">
                <Email />
                <a className="text-white" href="mailto:useldservice@gmail.com">useldservice@gmail.com</a>
              </div>

              <div className="flex items-center gap-2 my-3">
                <Global />
                <a
                  href="http://useldservice.com/"
                  target="_blank"
                  className="text-white"
                >
                  {" "}
                  useldservice.com
                </a>
              </div>

              <div className="flex lg:gap-4 gap-10">
                <a href="https://t.me/tommy_useld"><TelegramIcon color="white" /></a>
                
                {/* <InstagramIcon color="white" /> */}
                {/* <FacebookIcon color="white" /> */}
                {/* <YouTubeIcon color="white" /> */}
                {/* <TwitterIcon color="white" /> */}
                <a href="https://t.me/useld_support"><Support color="white" /></a>
              </div>
            </div>
            <div
              className="text-[#F2F2F2] my-[55px] lg:block hidden w-[70%]"
              dangerouslySetInnerHTML={{
                __html: t("about.title"),
              }}
            ></div>
          </div>
        </div>
      </footer>
    </>
  );
};
