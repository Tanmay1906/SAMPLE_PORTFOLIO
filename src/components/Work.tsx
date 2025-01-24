import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;
    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        pinType: !ScrollTrigger.isTouch ? "transform" : "fixed",
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      duration: 40,
      delay: 0.2,
    });
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
            {[
            { title: "Created Url - Shortener", category: "Web Development", tools: "JavaScript, React, CSS", image: "../../public/images/Project1.jpeg" },
            { title: "Shoe Company", category: "Landing Page", tools: "HTML and Tailwind CSS", image: "../../public/images/Project2.png" },
            { title: "Zidio Develoment Company Website", category: "Full Stack", tools: "MERN", video: "../../public/images/Project3.mp4" },
            ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info"> 
              <div className="work-title">
                <h3>0{index + 1}</h3>
                <div>
                <h4>{project.title}</h4>
                <p>{project.category}</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>{project.tools}</p>
              </div>
              {project.image ? (
              <WorkImage image={project.image} alt={project.title} />
              ) : (
              <video controls>
                <source src={project.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              )}
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
