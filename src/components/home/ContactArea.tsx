import axios from "axios";
import { useState } from "react";

export default function ContactArea() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);
    // alert(`Message sent successfully, ${name } ${email} ${subject} ${message}!`);

    if (!name || !email || !message) {
      setError(true);
      return;
    }

    try {
      const response = await axios.post("https://portfolio-server-eta-beige.vercel.app/mail", {
        name,
        email,
        subject,
        message,
      },{ headers : { "Content-Type": "application/json" } });

      if (response.status === 200) {
        setSuccess(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        alert("Message sent successfully!");
      } else {
        setError(true);
        alert("Failed to send the message. Please try again.");
      }
      
    } catch (error) {
      
    }
  };

  return (
    <section id="contact" className="contact-area">
      <div className="container">
        {/* Title */}
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="section-title section-black-title wow fadeInUp delay-0-2s">
              <h2>Contact Me</h2>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Contact Info */}
          <div className="col-lg-4">
            <div className="contact-content-part wow fadeInUp delay-0-2s">
              <div className="single-contact wow fadeInUp" data-wow-delay=".2s">
                <span className="circle-btn">
                  <i className="ri-map-pin-line"></i>
                </span>
                <h2>My Location:</h2>
                <p>Greater Noida, Uttar Pradesh</p>
              </div>

              <div className="single-contact wow fadeInUp" data-wow-delay=".4s">
                <span className="circle-btn">
                  <i className="ri-headphone-line"></i>
                </span>
                <h2>Contact Number:</h2>
                <p>+91 7827787077</p>
              </div>

              <div className="single-contact wow fadeInUp" data-wow-delay=".6s">
                <span className="circle-btn">
                  <i className="ri-mail-line"></i>
                </span>
                <h2>Email Me:</h2>
                <p>tyagiashmit4@gmail.com</p>
              </div>

              <div className="single-contact wow fadeInUp" data-wow-delay=".6s">
                <h2>Socials</h2>
                <div className="about-social">
                  <ul>
                    <li>
                      <a
                        target="_blank"
                        href="https://www.linkedin.com/in/tyagiashmit4/"
                        rel="noopener noreferrer"
                      >
                        <i className="ri-linkedin-fill"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://github.com/tyagiashmit4"
                        rel="noopener noreferrer"
                      >
                        <i className="ri-github-line"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="contact-form contact-form-area wow fadeInUp delay-0-4s">
              <form
                id="contactForm"
                className="contact-form"
                onSubmit={handleSubmit}
              >
                <div className="row">
                  {/* Name */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your Name"
                        required
                      />
                      <label htmlFor="name" className="for-icon">
                        <i className="far fa-user"></i>
                      </label>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email"
                        required
                      />
                      <label htmlFor="email" className="for-icon">
                        <i className="far fa-envelope"></i>
                      </label>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        className="form-control"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Your Subject"
                        required
                      />
                      <label htmlFor="subject" className="for-icon">
                        <i className="far fa-user"></i>
                      </label>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="message">Your Message</label>
                      <textarea
                        name="message"
                        id="message"
                        className="form-control"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write Your message"
                        required
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="col-md-12">
                    <div className="form-group mb-0">
                      <button type="submit" className="theme-btn">
                        Send Me Message <i className="ri-mail-line"></i>
                      </button>
                    </div>
                  </div>

                  {/* Status Messages */}
                  <div className="col-md-12 text-center mt-3">
                    {success && (
                      <p className="input-success">
                        I have received your mail, I will get back to you soon!
                      </p>
                    )}
                    {error && (
                      <p className="input-error">
                        Sorry, Message could not be sent! Please try again.
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
