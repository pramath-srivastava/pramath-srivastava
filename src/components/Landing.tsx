import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => (
  <div className="landing-section" id="landingDiv">
    <div className="landing-container">
      <div className="landing-intro">
        <h2>Hello! I'm</h2>
        <h1>PRAMATH<br /><span>SRIVASTAVA</span></h1>
      </div>
      <div className="landing-info">
        <h3>Biotechnology Student</h3>
        <h2 className="landing-info-h2">
          <div className="landing-h2-1">Bioinformatics</div>
          <div className="landing-h2-2">Data &amp; Technology</div>
        </h2>
        <h2>
          <div className="landing-h2-info">Curious about life sciences</div>
          <div className="landing-h2-info-1">Building practical skills</div>
        </h2>
      </div>
    </div>
    {children}
  </div>
);

export default Landing;
