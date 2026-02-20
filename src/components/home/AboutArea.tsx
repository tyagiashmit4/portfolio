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
                  I’m Ashmit Tyagi, a Software Developer with over 2+ years of
                  experience designing and building scalable web and mobile
                  applications. With a strong foundation in web development, I
                  specialize in full-stack engineering using modern frontend
                  technologies along with backend development in Node.js and
                  Java (Spring Boot).
                </p>
                <p>
                  I have experience building robust REST APIs, optimizing
                  application performance, and developing secure, scalable
                  systems that support real-world business requirements.
                  Passionate about clean code,and user-centric development, 
                  I aim to create digital solutions that are both
                  technically sound and impactful.
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
