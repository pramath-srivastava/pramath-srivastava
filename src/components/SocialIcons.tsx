import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import "./styles/SocialIcons.css";
import HoverLinks from "./HoverLinks";

const profile = "https://www.linkedin.com/in/pramath-srivastava-b77aba375/";
const github = "https://github.com/pramath-srivastava";
const instagram = "https://www.instagram.com/pram.x.20/";

const SocialIcons = () => (
  <div className="icons-section">
    <div className="social-icons" data-cursor="icons" id="social">
      <span><a href={github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a></span>
      <span><a href={profile} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a></span>
      <span><a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a></span>
    </div>
    <a className="resume-button" href={profile} target="_blank" rel="noreferrer">
      <HoverLinks text="LINKEDIN" />
      <span><FaLinkedinIn /></span>
    </a>
  </div>
);

export default SocialIcons;
