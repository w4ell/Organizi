import React, { useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import axios from "axios";
import { server } from "../server";
const Contact = () => {
  return (
    <div>
      <Header activeHeading={4} />
      <ContactForm />
      <Footer />
    </div>
  );
};

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, message);
    try {
      const response = await axios.post(`${server}/user/contact`, {
        name,
        email,
        message,
      });
      setMsg(response.message);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };
  return (
    <div className={`${styles.section} my-8`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Contactez nous</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label>Nom</label>
          <input
            type="text"
            name="name"
            value={name}
            required
            className="border border-gray-300 rounded-md p-2"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            required
            className="border border-gray-300 rounded-md p-2"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Message</label>
          <textarea
            name="message"
            value={message}
            className="border border-gray-300 h-[400px] rounded-md p-2"
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-blue-500 text-white font-bold py-4 px-4 rounded disabled:opacity-50"
          type="submit"
          disabled={name === "" || email === "" || message === ""}
        >
          Envoyer
        </button>
        {msg && <p className="text-green-500">{msg}</p>}
      </form>
    </div>
  );
};

export default Contact;
