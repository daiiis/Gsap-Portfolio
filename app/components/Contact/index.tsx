import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import emailjs from "emailjs-com";
import React, { useState, useEffect } from "react";

interface ContactSectionProps {
  contactZnx?: number;
}

const ContactSection = ({ contactZnx = 10 }: ContactSectionProps) => {
  useEffect(() => {
    console.log("Updated z-index:", contactZnx);
  }, [contactZnx]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setErrors({ email: "Invalid email address " });
      return;
    }

    if (
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    ) {
      console.log("Sending email. ");
      console.log(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
      console.log(process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
      console.log(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          e.target as HTMLFormElement,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        )
        .then(
          (result) => {
            console.log(result.text);
            alert("Message sent successfully!");
          },
          (error) => {
            console.log("zamla bdat ");
            console.log(error.text);
            alert("Failed to send message, please try again later.");
          },
        );
    } else {
      alert("EmailJS configuration is missing.");
    }

    setFormData({
      name: "",
      email: "",
      message: "",
    });
    setErrors({ email: "" });
  };

  return (
    <section
      className={`-section absolute top-0 h-screen w-full ${contactZnx === 60 ? "z-50" : "z-10"}`}
    >
      <div className="contact-section absolute top-0 flex h-full w-full flex-col items-center justify-center text-white">
        <div className="absolute inset-0 -z-10">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/background-vedio.mp4"
            autoPlay
            loop
            muted
          />
          <div className="absolute inset-0 bg-black bg-opacity-80" />
        </div>

        <h2 className="mb-8 text-4xl font-bold md:text-6xl">
          Let&apos;s Work Together
        </h2>
        <form
          className="w-full max-w-lg rounded-lg bg-opacity-50 p-6"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="name">
              Name
            </label>
            <input
              className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="email">
              Email
            </label>
            <input
              className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-center">
            <button
              className="rounded-lg bg-cyan-500 px-4 py-2 font-bold text-white transition hover:bg-cyan-600"
              type="submit"
            >
              Send Message
            </button>
          </div>
        </form>
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faEnvelope} size="2x" />
            <span>S4idmazouz@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faPhone} size="2x" />
            <span>+212 674402833</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
