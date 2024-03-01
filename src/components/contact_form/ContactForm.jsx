import React from "react";
import { useTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import PI from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


const PhoneInput = PI.default ? PI.default : PI;

export const ContactForm = () => {
  
  const { t } = useTranslation();
  const sendEmail = (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.append('name', e.target.name.value);
    postData.append('email', e.target.email.value);
    postData.append('phone', e.target.phone.value);
    postData.append('message', e.target.message.value);

    fetch("https://api.useldservice.com/send-info/", {
      method: "POST",
      body: postData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Your message successfully sent");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="bg-white mb-10">
      <h1 id="contactus" className="mb-24">&nbsp;</h1>
      <div className="container mx-auto xl:w-[50%] md:w-[60%] flex justify-between lg:flex-row max-md:flex-col gap-5">
        <Slide
          direction="left"
          className="md:w-1/2 text-right max-md:text-center"
        >
          <div>
            <h2 className="text-5xl font-bold text-[#0B2A5A] my-5 max-md:hidden"> &nbsp;</h2>
            <p className="text-secondary_color text-2xl max-md:text-lg">
              {t("form.description")}
            </p>
          </div>
        </Slide>
        <Slide className="w-1/2 max-md:w-full" direction="right">
          <div className="">
            <form onSubmit={sendEmail} className="container h-[full] my-3 ">
              <div className="mx-auto w-[95%] ">
                <h2
                  className="text-5xl font-bold text-[#0B2A5A] my-5"
                >
                  {t("Header.ContactUs")}
                </h2>
                <label className="">
                  <input
                    type="text"
                    required
                    name="name"
                    className="required px-3 py-2  my-5 bg-[#FFF] border shadow-sm border-[#082A58] placeholder-[#082A58] focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder={t("contact.name")}
                  />
                </label>

                <label className="block">
                  <PhoneInput
                    country={'us'}
                    inputProps={{
                      name: 'phone',
                      required: true,
                    }}
                    containerClass="w-full"
                    inputClass=" px-3 py-2 !border-[#082A58] !border shadow-sm  bg-[#FFF] border placeholder-[#082A58] focus:outline-none focus:border-sky-500 focus:ring-sky-500 block !w-full rounded-md sm:text-sm focus:ring-1"
                  />
                </label>
                <label className="block ">
                  <input
                    type="email"
                    required
                    name="email"
                    className="  my-5 px-3 py-2 bg-[#FFF]   border shadow-sm border-[#082A58] placeholder-[#082A58] focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder={t("contact.email")}
                  />
                </label>

                <label className="block ">
                  <textarea
                    minLength={20}
                    cols="30"
                    required
                    rows="10"
                    name="message"
                    className="  mt-1 px-3 py-2 bg-[#FFF]   border shadow-sm border-[#082A58]  placeholder-[#082A58] focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder={t("contact.message")}
                  ></textarea>
                </label>

                <button
                  type="submit"
                  value="send"
                  className="rounded bg-primary  px-10 py-3 text-white my-5 text-xs font-medium uppercase leading-tight text-white-500 bg-[#EEAD0F] shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg   focus:border-sky-500 focus:ring-sky-500 active:bg-primary-800 active:shadow-lg"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  {t("contact.send")}
                </button>
              </div>
            </form>
          </div>
        </Slide>
      </div>
    </div>
  );
};
