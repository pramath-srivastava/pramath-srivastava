import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const highlights = [
  {
    title: "Biotechnology",
    category: "Education",
    detail: "B.Tech student at Galgotias University, building a foundation in life sciences.",
    focus: "Molecular & cellular biology · Engineering mathematics",
  },
  {
    title: "Bioinformatics",
    category: "Learning interests",
    detail: "Interested in connecting biological knowledge with programming and data.",
    focus: "Python · Microsoft Excel · AI in healthcare",
  },
  {
    title: "Gorakhpur Web Studio",
    category: "Entrepreneurship",
    detail: "Co-founded a local studio offering web design and SEO support to businesses.",
    focus: "Web design · SEO · Startup leadership",
  },
  {
    title: "Student Outreach",
    category: "Community",
    detail: "Campus ambassador with Paytm and E-Cell IIT Bombay; publicity member at IEEE GU.",
    focus: "Communication · Teamwork · Coordination",
  },
];

const Work = () => {
  useGSAP(() => {
    const box = document.querySelector<HTMLElement>(".work-box");
    const container = document.querySelector<HTMLElement>(".work-container");
    if (!box || !container || window.innerWidth <= 1025) return;
    const padding = parseInt(window.getComputedStyle(box).padding) / 2;
    const distance = Math.max(0, box.offsetWidth * highlights.length - container.clientWidth + padding);
    const timeline = gsap.timeline({
      scrollTrigger: { trigger: ".work-section", start: "top top", end: `+=${distance}`, scrub: true, pin: true, id: "work" },
    });
    timeline.to(".work-flex", { x: -distance, ease: "none" });
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>Areas of <span>Focus</span></h2>
        <div className="work-flex">
          {highlights.map((item, index) => (
            <article className="work-box focus-card" key={item.title}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div><h4>{item.title}</h4><p>{item.category}</p></div>
                </div>
                <p className="focus-detail">{item.detail}</p>
                <h4>Related skills &amp; interests</h4>
                <p>{item.focus}</p>
              </div>
              <div className="focus-card-mark" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
