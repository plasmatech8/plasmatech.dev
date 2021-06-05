import React, { useState } from "react";
import DummyContent from "./DummyContent";
import "../styles/App.css";
import "bootstrap/dist/js/bootstrap.min.js";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container mt-5 p-4">
      <div className="row section-row">
        <div className="col-md-6">
          <header>
            <h1 className="">Mark Connelly</h1>
            <p className="h6 text-muted text-center mb-5">
              Data Science | Software Engineering | Web Development
            </p>
            <p>🚀 Welcome to my website!</p>
          </header>
        </div>
      </div>

      <div className="row section-row">
        <div className="text-center">
          <span className="typewriter">I like to make stuff</span>
        </div>
      </div>

      {/* How I built this site */}
      <div className="row section-row">
        <div className="col-md-6 col-lg-5">
          <section>
            <p className="mt-1">I built this website using: </p>

            <div className="mb-2">
              <img
                src="static/assets/logos/django.png"
                alt="Django Logo"
                width="30"
                height="30"
              />
              <span className="ms-2">Django (backend framework)</span>
            </div>

            <div className="mb-2">
              <img
                src="static/assets/logos/react.png"
                alt="React Logo"
                width="30"
                height="30"
              />
              <span className="ms-2">React JS (interface library)</span>
            </div>

            <div className="mb-2">
              <img
                src="static/assets/logos/three.png"
                alt="Three Logo"
                width="30"
                height="30"
              />
              <span className="ms-2">Three JS (3D graphics)</span>
            </div>

            <div className="mb-2">
              <img
                src="static/assets/logos/bootstrap.svg"
                alt="Bootstrap Logo"
                width="30"
                height="30"
              />
              <span className="ms-2">Bootstrap (CSS framework)</span>
            </div>

            <div className="mb-2">
              <img
                src="static/assets/logos/docker.png"
                alt="Docker Logo"
                width="30"
                height="30"
              />
              <span className="ms-2">Docker (containerisation)</span>
            </div>

            <div className="mb-2">
              <img
                src="static/assets/logos/kubernetes.png"
                alt="Kubernetes Logo"
                width="30"
                height="30"
              />
              <span className="ms-2">Kubernetes (orchestration)</span>
            </div>

            <div className="mb-2">
              <img
                src="static/assets/logos/linode.png"
                alt="Linode Logo"
                width="30"
                height="30"
              />
              <span className="ms-2">Linode (cloud platform)</span>
            </div>

            <p className="mt-4">GitHub Repository:</p>

            <div className="my-3">
              <a
                className="link-secondary"
                href="https://github.com/plasmatech8/plasmatech.dev"
              >
                <img
                  src="static/assets/logos/github.png"
                  alt="GitHub Link"
                  height="30"
                  width="30"
                />
                <span className="ms-3">plasmatech8 / plasmatech.dev</span>
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* About Me */}
      <div className="row section-row">
        <div className="col-md-7 col-lg-5 offset-md-6">
          <section>
            <h2>About Me</h2>
            <p>I am passionate about technology.</p>
            <p>
              I graduated with a HD average with a
              <b> Bachelor of Computer Science (Prof)</b> with a major in
              <b> Data Science</b> at Swinburne University.
            </p>
            <p>
              I like things such as: Data Science, Web
              Development, FOSS, Blockchain, 3D Printing, and much more.
            </p>
          </section>
        </div>
      </div>

      {/* My Works */}
      <div className="row section-row">
        <div className="col-lg-10 col-xl-8">
          <section>
            <h2>My Works</h2>

            {/* 3D Printed Things */}
            <div className="mb-3" style={{ maxWidth: "540px" }}>
              <div className="row no-gutters">
                <div className="col-sm-4">
                  <img
                    src="static/assets/works/matt.png"
                    className="card-img"
                    alt="A depiction of my Brother"
                  />
                </div>
                <div className="col-sm-8">
                  <div className="card-body">
                    <h5 className="card-title">3D-Printed Things</h5>
                    <p className="card-text">
                      I 3D modelled and printed things like this.
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        (A depiction of my brother)
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chess Exercise */}
            <div className="mb-3">
              <div className="row no-gutters">
                <div className="col-sm-4">
                  <img
                    src="static/assets/works/knightandqueenpuzzle.png"
                    className="card-img"
                    alt="Knight and Queen Chess Exercise"
                  />
                </div>
                <div className="col-sm-8">
                  <div className="card-body">
                    <h5 className="card-title">A Chess Exercise</h5>
                    <p className="card-text bg-color-">
                      I created a Knight-And-Queen puzzle using{' '}
                      <a href="https://svelte.dev/">Svelte JS</a>.
                    </p>
                    <p className="card-text">
                      You can try it out{" "}
                      <a href="https://plasmatech8.github.io/KnightAndQueenPuzzle/">
                        here
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CDT Website */}
            <div className="mb-3">
              <div className="row no-gutters">
                <div className="col-sm-6">
                  {/* Carousel */}
                  <div
                    id="carouselExampleSlidesOnly"
                    className="carousel slide card-img"
                    data-bs-ride="carousel"
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active" data-bs-interval="3000">
                        <img
                          src="static/assets/works/cdtweb-homepage.png"
                          className="d-block w-100  "
                          alt="CDT Website"
                          style={{ minHeight: "100%" }}
                        />
                      </div>
                      <div className="carousel-item" data-bs-interval="3000">
                        <img
                          src="static/assets/works/cdtweb-dashboard.png"
                          className="d-block w-100  "
                          alt="CDT Website"
                          style={{ minHeight: "100%" }}
                        />
                      </div>
                      <div className="carousel-item" data-bs-interval="3000">
                        <img
                          src="static/assets/works/cdtweb-caseresults.png"
                          className="d-block w-100"
                          alt="CDT Website"
                          />
                      </div>
                      <div className="carousel-item" data-bs-interval="3000">
                        <img
                          src="static/assets/works/cdtweb-financialassessment.png"
                          className="d-block w-100"
                          alt="CDT Website"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card-body">
                    <h5 className="card-title">Cloud Decision Tool Site</h5>
                    <div className="card-text">
                      <p>
                      I worked in a student team for our Software-Engineering project
                      at University.
                      </p>
                      <p>
                      This involved creating a website using React/Firebase and implementing a
                      Case Based Reasoning (CBR) algorithm defined by a
                      PHD student.
                      </p>
                      <p className="card-text">
                      You can check it out{" "}
                      <a href="https://sep-cdt.web.app/">
                        here
                      </a>
                      .
                    </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </section>
        </div>
      </div>

      <div className="row section-row">
        <div className="col-md-6 col-lg-5 offset-md-7">
          <section>
            <h2>Work History</h2>
            <ul>
              <li>National Australia Bank - Intern, Data Scientist
              <ul>
                <li>Developed a Machine Learning model</li>
                <li>Worked on the new cloud Data Science platform (NDC)</li>
                <li>Explored Natural Language Processing (NLP)</li>
              </ul>
              </li>
              <li>Burgess Brian Partners - Work Experience</li>
            </ul>
          </section>
        </div>
      </div>

      <div className="row section-row"></div>

      {/* Thanks for Visiting */}
      <div className="row section-row">
        <div className="text-center">
          <span className="typewriter">Thanks for Visiting!</span>
        </div>
      </div>

    </div>
  );
}

export default App;
