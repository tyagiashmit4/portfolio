import Count from "../common/Count";

const counter_data = [
  {
    id: 1,
    title: "Years Of Experience",
    count: 2,
    cls: "plus",
  },
  {
    id: 2,
    title: "Completed Projects",
    count: 20,
    cls: "plus",
  },
  {
    id: 3,
    title: "Certification",
    count: 8,
    cls: "plus",
  },
];

export default function AboutArea() {
  return (
    <>
      <section id="about" className="about-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-3">
              <h2 className="about-pre-title">About Me</h2>
            </div>
            <div className="col-lg-9 col-sm-9">
              <div className="about-content-part wow fadeInUp delay-0-2s">
                <p>
                I’m Ashmit Tyagi, a Software Developer with 2+ years of experience building scalable web and mobile applications. I specialize in full-stack development using modern frontend technologies, Node.js, and Java (Spring Boot). I focus on creating intuitive user experiences backed by robust, secure, and high-performance backend systems. Passionate about clean code and scalable architecture, I strive to deliver impactful digital solutions.
                </p>
              </div>
              <div className="hero-counter-area d-flex justify-content-between wow fadeInUp delay-0-4s">
                {counter_data.map((item, i) => (
                  <div key={i} className="counter-item counter-text-wrap">
                    <span className={`count-text ${item.cls}`}>
                      <Count number={item.count} />
                    </span>
                    <span className="counter-title">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
