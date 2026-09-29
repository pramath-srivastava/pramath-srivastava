import "./styles/Career.css";

const roles = [
  {
    role: "Co-Founder",
    organization: "Gorakhpur Web Studio",
    dates: "Jul 2026 – Present",
    description:
      "Co-founded a local web studio focused on web design and SEO support for local businesses. Based in Gorakhpur; hybrid.",
  },
  {
    role: "Campus Ambassador",
    organization: "Paytm",
    dates: "Jul 2026 – Present",
    description:
      "Representing Paytm on campus and supporting student outreach and engagement remotely.",
  },
  {
    role: "Campus Ambassador",
    organization: "E-Cell, IIT Bombay",
    dates: "Jun 2026 – Present",
    description:
      "Supporting entrepreneurship-related outreach and campus engagement remotely.",
  },
  {
    role: "Publicity Member",
    organization: "IEEE GU",
    dates: "May 2026 – Present",
    description:
      "Contributing to publicity and communication for student technical initiatives at Galgotias University.",
  },
];

const Career = () => (
  <div className="career-section section-container">
    <div className="career-container">
      <h2>Experience <span>&amp;</span><br />Leadership</h2>
      <div className="career-info">
        <div className="career-timeline"><div className="career-dot" /></div>
        {roles.map((item) => (
          <div className="career-info-box" key={item.organization}>
            <div className="career-info-in">
              <div className="career-role">
                <h4>{item.role}</h4>
                <h5>{item.organization}</h5>
              </div>
              <h3>{item.dates}</h3>
            </div>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <p className="education-note">
        <strong>Education</strong> · B.Tech Biotechnology, Galgotias University ·
        September 2025 – September 2029 · Greater Noida, Uttar Pradesh
      </p>
    </div>
  </div>
);

export default Career;
