export default function HeroArea() {
  return (
    <>
      <section id="home" className="main-hero-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hero-content wow fadeInUp text-center delay-0-2s">
                <h2>Ashmit Tyagi</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 pt-30">
              <div className="hero-content wow fadeInUp delay-0-2s">
                <div className="clienti-reviews">
                  <ul className="clienti-profile">
                    <li>
                      <img
                        className="img-fluid"
                        src="assets/images/ajay.jpeg"
                        alt="Ajay Kumar"
                      />
                    </li>
                    <li>
                      <img
                        className="img-fluid"
                        src="assets/images/shantanu.jpg"
                        alt="Shantanu Gaurav"
                      />
                    </li>
                    <li>
                      <img
                        className="img-fluid"
                        src="assets/images/gurdeep.jpg"
                        alt="Gurdeep Singh"
                      />
                    </li>
                  </ul>
                  <div className="reviews">
                    <h3 style={{color : '#000'}}>What People Say</h3>
                    <p>
                      Over the course of my journey, I’ve had the privilege of
                      working with talented professionals across various
                      projects — their words reflect the impact of our
                      collaboration and the trust we've built.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <img src="assets/images/ashmit.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-3 pt-30">
              <div className="hero-content wow fadeInUp delay-0-4s">
                <p>
                  Hi, I’m Ashmit, a passionate Software Developer dedicated to
                  develop user-friendly digital experiences.
                </p>
                <a className="theme-btn" target="_blank" href="/resume.pdf">
                  Get In touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
