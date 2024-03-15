import React, { useEffect, useState } from "react";
import image from "../../media/discount_img.png";
import { useForm } from "react-hook-form";
import s from "./DiscountForm.module.css";

export default function DiscountForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues, isSubmitSuccessful, isSubmitting },
    reset,
  } = useForm();

  const handleDiscountSubmit = (data) => {
    console.log(data);
    reset();
  };

  //added
  useEffect(() => {
    let timeoutId;
    if (isSubmitSuccessful) {
      timeoutId = setTimeout(() => {
        reset();
      }, 1.5 * 5000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isSubmitSuccessful, reset]);

  const buttonClassName = isSubmitSuccessful
    ? `${s.button} ${s.added}`
    : s.button;

  return (
    <div className="container">
      <div className={s.container}>
        <h2 className={s.h2}>5% off on the first order</h2>

        <div className={s.discount_wrapper}>
          <img src={image} alt="discount" />
          <div className={s.wrapper__form}>
            <form
              className={s.form}
              onSubmit={handleSubmit(handleDiscountSubmit)}
            >
              <label htmlFor="name">
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={undefined}
                  {...register("name", {
                    required: true,
                    minLength: {
                      value: 2,
                      message: "Name is too short...min length: 2",
                    },
                    maxLength: {
                      value: 20,
                      message: "Name is too long...max length: 20",
                    },
                  })}
                  autoComplete="name"
                />
                {errors.name && (
                  <span className={s.error__message}>
                    {errors.name.message}
                  </span>
                )}
              </label>
              <label htmlFor="phone">
                <input
                  id="phone"
                  type="tel"
                  placeholder="Phone number"
                  value={undefined}
                  {...register("phone", {
                    required: "The field is required",
                    pattern: {
                      value: /\(?\+\(?49\)?[ ()]?([- ()]?\d[- ()]?){10}/g,
                      message:
                        "Phone number must be with the country code Germany ",
                    },
                  })}
                  autoComplete="tel"
                />

                <p className={s.error__message}>{errors.phone?.message}</p>
              </label>

              <label htmlFor="email">
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={undefined}
                  {...register("email", {
                    required: "The field is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: "Invalid email address",
                    },
                  })}
                  autoComplete="email"
                />
                <p className={s.error__message}>{errors.email?.message}</p>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className={buttonClassName}
              >
                {isSubmitSuccessful ? "Request Submitted" : "Get a discount"}
              </button>
            </form>
          </div>
        </div>
        <div className={s.background__image}>
          <img src={image} alt="discount" />
        </div>
      </div>
    </div>
  );
}
