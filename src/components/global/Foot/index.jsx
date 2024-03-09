import React from "react";
import s from "./Footer.module.css";

import insta_ic from "./../../media/ic-instagram.png";
import whatsapp_ic from "./../../media/ic-whatsapp.png";

export default function Footer() {
  return (
    <div className="container">
      <div className={s.contact_wrapper}>
        <h2 className={s.footer_title}>Contact</h2>
        <div className={s.contact_module_wrap}>
          <div className={s.phone_form}>
            <p className={s.contact_texts}>Phone</p>
            <p className={s.data_text}>+49 999 999 99 99</p>
          </div>
          <div className={s.social_form}>
            <p className={s.contact_texts}>Socials</p>
            <div className={s.icons}>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={insta_ic} alt="Instagram Icon" />
              </a>
              <a
                href="https://www.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={whatsapp_ic} alt="WhatsApp Icon" />
              </a>
            </div>
          </div>
        </div>

        <div className={s.contact_module_wrap}>
          <div className={s.contact_header}>
            <p className={s.contact_texts}>Address</p>
            <p className={s.data_text}>
              Linkstraße 2, 8 OG, 10 785, Berlin, Deutschland
            </p>
          </div>
          <div className={s.contact_work_hour}>
            <p className={s.contact_texts}>Working Hours</p>
            <p className={s.data_text}>24 hours a day</p>
          </div>
        </div>
      </div>

      <div className={s.map}>
        <iframe
          width="1360"
          height="350"
          frameBorder="0"
          scrolling="no"
          // marginheight="0"
          // marginwidth="0"
          id="gmap_canvas"
          src="https://maps.google.com/maps?width=1360&amp;height=350&amp;hl=en&amp;q=Tell-Ran.de%20Linkstra%C3%9Fe%C2%A02,%208%C2%A0OG,%20%20Deutschland%20Berlin+(Starta%20Institute)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>
        <script
          type="text/javascript"
          src="https://embedmaps.com/google-maps-authorization/script.js?id=5cc8523dabbd9cad7907fe9282ccd44115cfcb21"
        ></script>
      </div>
    </div>
  );
}
