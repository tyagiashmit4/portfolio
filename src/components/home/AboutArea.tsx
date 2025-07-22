 
import Count from '../common/Count'

const counter_data = [
  {
    id: 1,
    title: 'Years Of Experience',
    count: 1,
    cls: "plus",
  },
  {
    id: 2,
    title: 'Completed Projects',
    count: 10,
    cls: "plus",
  },
  // {
  //   id: 3,
  //   title: 'Client Satisfactions',
  //   count: 90,
  //   cls: "percent",
  // },
]

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
                <p>I am Ashmit Tyagi, a Software Developer with over 1+ years of experience in developing intuitive and engaging digital experiences. My journey began with a background in Web Development , where I discovered my passion for understanding user behavior and translating it into seamless interactions.</p>
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
  )
}
