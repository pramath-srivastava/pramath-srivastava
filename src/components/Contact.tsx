import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => (
  <div className="contact-section section-container" id="contact">
    <div className="contact-container">
      <h3>Get in touch</h3>
      <div className="contact-flex">
        <div className="contact-box">
          <h4>Email</h4>
          <p><a href="mailto:srivastavpramath09@gmail.com" data-cursor="disable">srivastavpramath09@gmail.com</a></p>
          <h4>Phone</h4>
          <p><a href="tel:+917307489852" data-cursor="disable">+91 73074 89852</a></p>
        </div>
        <div className="contact-box">
          <h4>Professional profile</h4>
          <a href="https://github.com/pramath-srivastava" target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">
            GitHub <MdArrowOutward />
          </a>
          <a href="https://www.linkedin.com/in/pramath-srivastava-b77aba375/" target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">
            LinkedIn <MdArrowOutward />
          </a>
          <a href="https://www.instagram.com/pram.x.20/" target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">
            Instagram <MdArrowOutward />
          </a>
        </div>
        <div className="contact-box">
          <h2>Pramath <span>Srivastava</span></h2>
          <p>B.Tech Biotechnology student · Galgotias University</p>
          <h5><MdCopyright /> 2026</h5>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
