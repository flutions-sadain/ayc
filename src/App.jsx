import './index.css';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import {useRef, useState} from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact.jsx";
import Register from "./components/Register.jsx";
import logo from '../public/images/logo.svg';
import logoExplain from '../public/images/logoe.svg';
import Apps from "./components/platform/Apps.jsx";
import Assessment from "./components/platform/Assessment.jsx";
import Dashboard from "./components/platform/Dashboard.jsx";
import NewResumeUpload from './components/Dashboard/ResumeUpload';
import ProfileForm from "./components/Dashboard/ProfileForm";
import AssessmentScreen from "./components/Dashboard/Assessment";
import AssessmentScore from "./components/Dashboard/AssessmentScore";
import NewDashboard from "./components/Dashboard/Dashboard";
import CourseDetailsContent from "./components/Dashboard/CourseDetails";
import {UserIcon} from "./components/icons/UserIcon.jsx";
import {AIIcon} from "./components/icons/AIIcon.jsx";
import {CloudComputingIcon} from "./components/icons/CloudComputingIcon.jsx";
import { GridPattern } from './components/GridPattern'
import { Button} from "@nextui-org/react";
import Login from './components/Login.jsx';
import {BlockchainIcon} from "./components/icons/BlockchainIcon.jsx";
import {QuantumIcon} from "./components/icons/QuantumIcon.jsx";
import {QCIcon} from "./components/icons/QCIcon.jsx";
import {ARIcon} from "./components/icons/ARIcon.jsx";
import {CybersecurityIcon} from "./components/icons/CybersecurityIcon.jsx";
import {DatascienceIcon} from "./components/icons/DatascienceIcon.jsx";
import {LeadershipIcon} from "./components/icons/LeadershipIcon.jsx";
import HeaderHome from './components/HeaderHome.jsx';

function App() {

  function ResourceIcon({ icon: Icon }) {
    return (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400">
          <Icon className="h-8 w-8 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-primary-400 dark:group-hover:fill-emerald-300/10 dark:group-hover:stroke-emerald-400" />
        </div>
    )
  }

  const resources = [
    {
      href: '/courses',
      name: 'AI & Machine Learning',
      description:
          "Personalized Learning Adapt AI to cater to  unique learning curves, ensuring knowledge retention and application.",
      description2: "AI & Human Assist: Combine human intuition with AI efficiency to enable enhanced decision-making and problem-solving Industry Guideline Keep up with best practices, ensuring that AI integrates seamlessly and ethically into your enterprise.",
      icon: AIIcon,
      pattern: {
        y: 16,
        squares: [
          [0, 1],
          [1, 3],
        ],
      },
    },
    {
      href: '/courses',
      name: 'Could & Edge Computing',
      description:
          "Real-Time Solutions, Learn how cloud and edge\n" +
          "                            computing work together to deliver real-time data processing and\n" +
          "                            analytics.",
      description2: "Industry Guidelines: Adhere to best practices ensuring\n" +
          "                            optimal, secure, and cost-effective cloud solutions for your enterprise.",
      icon: CloudComputingIcon,
      pattern: {
        y: 16,
        squares: [
          [0, 1],
          [1, 3],
        ],
      },
    },
    {
      href: '/courses',
      name: 'Blockchain',
      description:
          "Trust & Transparency Understand how\n" +
          "                            decentralization is building trust in business processes, particularly in finance and supply\n" +
          "                            chain.",
      description2: "Industry Guideline: Navigate the complex world of blockchain\n" +
          "                            with up-to-date standards and applications relevant to your\n" +
          "                            industry",
      icon: BlockchainIcon,
      pattern: {
        y: 16,
        squares: [
          [0, 1],
          [1, 3],
        ],
      },
    },
    {
      href: '/courses',
      name: 'Quantum Computing',
      description:
          "Beyond traditional computing grasp how\n" +
          "                            quantum mechanics is setting the stage for a new era of computing, potentially\n" +
          "                            revolutionizing fields like cryptography",
      description2: "Personalized learning Tailor\n" +
          "                            your quantum learning journey to match your goals and\n" +
          "                            background.",
      icon: QCIcon,
      pattern: {
        y: 16,
        squares: [
          [0, 1],
          [1, 3],
        ],
      },
    },
    {
      href: '/courses',
      name: 'Augmented-Virtual Reality',
      description:
          "Future of Things Delve into an AR/VR course that equips participants with the skills to create engaging virtual environments, understand user interaction",
      description2: "Everything from 3D modeling and simulation to practical deployment strategies for interactive media and gaming.",
      icon: ARIcon,
      pattern: {
        y: 16,
        squares: [
          [0, 1],
          [1, 3],
        ],
      },
    },
    {
      href: '/courses',
      name: 'Cyber Security',
      description:
          "In-Depth exploration Principles and practices Tailored for both aspiring and current professionals as well as students.",
      description2: "Gain essential Cyber Security It aims to equip participants with the skills needed to protect computer systems, networks, and data from threats and attacks.",
      icon: CybersecurityIcon,
      pattern: {
        y: 16,
        squares: [
          [0, 1],
          [1, 3],
        ],
      },
    },
    {
      href: '/courses',
      name: 'Data Science & Analytics',
      description:
          "Harnessing insights from the digital universe to drive innovation, optimize decisions, and transform industries.",
      description2: "Unleashing the power of analytics to solve complex challenges and ignite business growth.",
      icon: DatascienceIcon,
      pattern: {
        y: 16,
        squares: [
          [0, 1],
          [1, 3],
        ],
      },
    },
    {
      href: '/courses',
      name: 'Leadership & Management',
      description:
          "Lead with Confidence, Manage with Skill: Elevate Your Leadership and Management Capabilities. Transform Challenges into Opportunities through Strategic Decision-Making. Inspire Teams, Drive Success, and Cultivate a Legacy of Excellence.",
      description2: "Navigate Change with Vision and Strategy, Guiding Your Organization to New Heights. Elevate Your Impact with Proven Leadership Techniques.",
      icon: LeadershipIcon,
      pattern: {
        y: 16,
        squares: [
          [0, 1],
          [1, 3],
        ],
      },
    }
    ]

  function ResourcePattern({ mouseX, mouseY, ...gridProps }) {
    let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
    let style = { maskImage, WebkitMaskImage: maskImage }

    return (
        <div className="pointer-events-none">
          <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
            <GridPattern
                width={72}
                height={56}
                x="50%"
                className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5"
                {...gridProps}
            />
          </div>
          <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#202D2E] dark:to-[#303428]"
              style={style}
          />
          <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
              style={style}
          >
            <GridPattern
                width={72}
                height={56}
                x="50%"
                className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10"
                {...gridProps}
            />
          </motion.div>
        </div>
    )
  }

  function Resource({ resource }) {
    let mouseX = useMotionValue(0)
    let mouseY = useMotionValue(0)

    function onMouseMove({ currentTarget, clientX, clientY }) {
      let { left, top } = currentTarget.getBoundingClientRect()
      mouseX.set(clientX - left)
      mouseY.set(clientY - top)
    }

    return (
        <div
            key={resource.href}
            onMouseMove={onMouseMove}
            className="group relative flex flex-col h-full rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5"
        >
          <ResourcePattern {...resource.pattern} mouseX={mouseX} mouseY={mouseY} />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/7.5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
          <div className="relative rounded-2xl px-4 mb-8 pt-16">
            <ResourceIcon icon={resource.icon}/>
            <h2 className="mt-4 mb-4 text-xl"></h2>
            <h4 className="mt-4 mb-4 text-sm text-highlight text-black"><strong>{resource.name}</strong></h4>
            <div className="relative flex flex-col min-h-64">
              <p className="mt-1 text-sm text-padding-large text-zinc-600 dark:text-zinc-400">
                {resource.description}
              </p>
              <br></br>
              <p className="mt-1 text-sm text-padding-large text-zinc-600 dark:text-zinc-400">
                {resource.description2}
              </p>
            </div>
            <div className="button-group mt-4 ml-0">
              <Button size="sm" className="button bg-primary">Enroll Now</Button>
            </div>
          </div>
        </div>
    )
  }



  const featureSectionRef = useRef(null);
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (

      <>
        <Routes>
          <Route path="/aboutus" element={<AboutUs/>}/>
        </Routes>
        <Routes>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
        <Routes>
          <Route path="/register" element={<Register/>}/>
        </Routes>
        <Routes>
          <Route  path="/login" element={<Login/>}/>
        </Routes>
        <Routes>
          <Route path="/register" element={<Apps/>}/>
        </Routes>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
        <Routes>
          <Route path="/newResume" element={<NewResumeUpload/>}/>
        </Routes>
        <Routes>
          <Route path="/profileForm" element={<ProfileForm/>}/>
        </Routes>
        <Routes>
          <Route path="/assessment" element={<Assessment/>}/>
        </Routes>
        <Routes>
          <Route path="/assessmentScore" element={<AssessmentScore/>}/>
        </Routes>
        <Routes>
          <Route path="/newDashboard" element={<NewDashboard/>}/>
        </Routes>
        <Routes>
          <Route path="/courseDetailsContent" element={<CourseDetailsContent/>}/>
        </Routes>

        <HeaderHome />

        {/* <div className="navigation-main">
          <nav className="navigation-wrap">

            <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease"
                 data-easing2="ease" role="banner" className="navigation w-nav">
              <div className="navigation-container">
                <Link to="/">
                  <img src={logo} alt={"Advance Your Career"} className="brand logo-image"></img>
                </Link>
                <div className="navigation-left"></div>

                <nav role="navigation" className="nav-menu w-nav-menu">
                  <Link to="/" className="navbar-link w-nav-link">Home</Link>
                  <a href="#" onClick={() => scrollToSection(featureSectionRef)}
                     className="navbar-link w-nav-link">Features</a>
                  <Link to="/apps" className="navbar-link w-nav-link">Platform</Link>
                  <Link to="/aboutus" className="navbar-link w-nav-link">Solutions</Link>
                  <Link to="/aboutus" className="navbar-link w-nav-link">Careers</Link>
                  <Link to="/contact" className="navbar-link w-nav-link">Events</Link>
                  <Link to="/contact" className="navbar-link w-nav-link">Pricing</Link>
                  <Link to="/contact" className="navbar-link w-nav-link">Resources</Link>
                  <Link to="/aboutus" className="navbar-link w-nav-link">About us</Link>
                  <Link to="/contact" className="navbar-link w-nav-link">Contact</Link>
                </nav>

                <div className="navigation-right">
                  <Link to="/register" className="button w-button">Register</Link>
                </div>
              </div>
            </div>

            <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease-out" data-easing2="ease-out" role="banner" className="navigation-mob w-nav" style={{overflow: 'visible'}}>
              <div className="navigation-container-mob">
                <a href="#" className="brand w-nav-brand">
                  <img src={logo} alt={"Advance Your Career"} className="brand logo-2" style={{minWidth:"100px", marginLeft:0, paddingLeft:0}}></img>
                </a>
                <div className="nav-mobile-button-wrap">
                <div className="menu-mob w-nav-button" onClick={toggleMenu}>
                    <div className="w-icon-nav-menu"></div>
                  </div>
                </div>
                {isOpen && (
                <nav role="navigation" className="nav-menu" style={{ overflow: 'visible',display:"block", justifyContent: "space-around", position:"absolute", float:"right", left: 0, width: "100%",top: "100%", cursor: "pointer" }}>
                  <div className="nav-menu-inner" style={{overflow: 'visible'}}>
                    <Link to="/" className="navbar-link w-nav-link">Home</Link>
                    <a href="#" onClick={() => scrollToSection(featureSectionRef)}
                       className="navbar-link w-nav-link">Features</a>
                    <Link to="/apps" className="navbar-link w-nav-link">Platform</Link>
                    <Link to="/aboutus" className="navbar-link w-nav-link">Solutions</Link>
                    <Link to="/aboutus" className="navbar-link w-nav-link">Careers</Link>
                    <Link to="/contact" className="navbar-link w-nav-link">Events</Link>
                    <Link to="/contact" className="navbar-link w-nav-link">Pricing</Link>
                    <Link to="/contact" className="navbar-link w-nav-link">Resources</Link>
                    <Link to="/aboutus" className="navbar-link w-nav-link">About us</Link>
                    <Link to="/contact" className="navbar-link w-nav-link">Contact</Link>
                  </div>
                </nav>
                )}
              </div>
            </div>

          </nav>
        </div> */}
        <motion.section whileInView={{opacity: 1, y: 0}} // Target animation
                        initial={{opacity: 0, y: 50}} // Initial state before animation
                        transition={{duration: 0.5, ease: "easeInOut"}} // Animation timing
                        viewport={{once: true}} // Ensures animation runs only once
                        className="section-hero home">
          <figure className="padding-global hero">
            <div className="container-large">
              <div className="padding-section-small">
                <div className="w-layout-grid hero-grid">
                  <div className="layout-content">
                    <div className="margin-bottom">
                      <div className="text-highlight" style={{textTransform: "capitalize"}}>AI Powered Career
                        Advancement Platform
                      </div>
                    </div>
                    <div className="margin-bottom">
                      <h1 className="heading"> Prepare for tomorrow by mastering future technologies now</h1>
                    </div>
                    <p className="text-size-medium" style={{lineHeight: '1.5'}}>Supercharge your ambition: Blending AI
                      innovation with human
                      creativity to your career journey</p>
                    <div className="margin-top margin-medium">
                      <div className="button-group">
                        <Link to="/contact" className="button w-button">Join Our Waitlist</Link>
                      </div>
                    </div>
                  </div>
                  <div className="layout-wrapper-image"><img className="graphic-image" src="/images/Graphic-hero-xl.png"
                                                             width="813" alt=""
                                                             sizes="(max-width: 479px) 90vw, (max-width: 991px) 81vw, 51vw"
                                                             data-w-id="4c7cd897-4a59-aa91-60bc-09a2abf4fb54"
                                                             loading="lazy"
                                                             srcSet="/images/Graphic-hero-xl.png 500w, /images/Graphic-hero-xl.png 800w, /images/Graphic-hero-xl.png 1080w, /images/Graphic-hero-xl.png 1408w"/>
                  </div>

                </div>
              </div>
            </div>
          </figure>
        </motion.section>

        <section id="course-catalog" className="course-catalog section-hero padding-section-large">
          <div className="container-large padding-section-large">
            <div className="margin-top-2 margin-large">
              <div className="margin-bottom-7 margin-medium">
                <div className="align-center">
                  <div data-w-id="229ba167-8e34-3063-a11f-cb92af281397"
                       className="text-highlight" style={{textTransform: "capitalize"}}>Course Catalog
                  </div>
                </div>
              </div>
              <div className="margin-bottom">
                <h1 className="heading white center">Advance your career to meet industry demand</h1>
              </div>
              <div className="margin-bottom">
                <h2 data-w-id="c0e399a0-5a1e-b64c-ed34-d14f562366d2"
                    className="center text-size-medium pd10">Exclusive Offer! Enroll in the next 48 hours and receive a
                  20% discount on any course. Plus, gain complimentary access to our monthly webinars featuring industry
                  experts. The future is nearer than You think start your transformative journey with nearer growth
                  learning today.<br/></h2>
              </div>
            </div>
            {/* <div data-delay="4000" data-animation="slide" className="slider_component padding-section-large w-slider"
                 data-autoplay="false" data-easing="ease-in" data-hide-arrows="true" data-disable-swipe="false"
                 data-autoplay-limit="0" data-nav-spacing="3" data-duration="500" data-infinite="false">
              <div className="card_mask w-slider-mask">
                <div className="card w-slide">
                  <div data-w-id="5c34272f-e25d-1019-a768-f71255dc0643"
                       className="box _1 layout-card-gray">
                    <div className="div_1">
                      <div className="div_1-2"><img width="Auto" alt="" src="images/cyborg.svg" loading="lazy"
                                                    className="icon-4 ic1"/>
                        <div className="text-wrapper">
                          <h2 className="text-weight-bold"><strong>AI &amp; Machine Learning</strong></h2>
                          <p className="text-size-medium"><strong>Personalized Learning</strong> Adapt AI to cater to
                            unique learning curves, ensuring knowledge retention and
                            application.<br/><br/><strong>AI &amp; Human Assist:</strong> Combine human intuition with
                            AI efficiency to enable enhanced decision-making and problem-solving.<br/><br/><strong>Industry
                              Guideline</strong> Keep up with best practices, ensuring that AI integrates seamlessly and
                            ethically into your enterprise.<br/>‍<br/>‍</p>
                        </div>
                        <div className="button-group">
                          <a href="#" className="button w-button">Enroll Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card w-slide">
                  <div data-w-id="191b6ee5-018a-828a-32e9-563cb13d4bab"
                       className="box _1 layout-card-gray">
                    <div className="div_1">
                      <div className="div_1-2"><img alt="" loading="lazy" src="images/cloud-computing.svg"
                                                    className="icon-4 ic2"/>
                        <div className="text-wrapper">
                          <h2 className="text-weight-bold"><strong>Cloud &amp; Edge Computing</strong></h2>
                          <p className="text-size-medium"><strong>Real-time Solutions</strong> Learn how cloud and edge
                            computing work together to deliver real-time data processing and
                            analytics.<br/><br/><strong>Industry Guideline</strong> Adhere to best practices ensuring
                            optimal, secure, and cost-effective cloud solutions for your enterprise.<br/><br/><br/><br/><br/><br/>‍<br/>‍
                          </p>
                        </div>
                        <div className="button-group">
                          <a href="#" className="button w-button">Enroll Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card w-slide">
                  <div data-w-id="c61baf1c-242a-b0da-f426-ab73a6459fb9"
                       className="box _1 layout-card-gray">
                    <div className="div_1">
                      <div className="div_1-2"><img alt="" loading="lazy" src="images/blockchain.svg"
                                                    className="icon-4 ic3"/>
                        <div className="text-wrapper">
                          <h2 className="text-weight-bold"><strong>Blockchain</strong></h2>
                          <p className="text-size-medium"><strong>Trust &amp; Transparency </strong>Understand how
                            decentralization is building trust in business processes, particularly in finance and supply
                            chain.<strong><br/><br/>Industry Guideline </strong>Navigate the complex world of blockchain
                            with up-to-date standards and applications relevant to your
                            industry<br/><br/><br/><br/><br/>‍</p>
                        </div>
                        <div className="button-group">
                          <a href="#" className="button w-button">Enroll Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card w-slide">
                  <div data-w-id="8770342c-aad9-f1f6-985b-59c41ec7860c"
                       className="box _1 layout-card-gray">
                    <div className="div_1">
                      <div className="div_1-2"><img alt="" loading="lazy" src="images/quantum.svg"
                                                    className="icon-4 ic4"/>
                        <div className="text-wrapper">
                          <h2 className="text-weight-bold"><strong>Quantum Computing</strong></h2>
                          <p className="text-size-medium"><strong>Beyond Traditional Computing </strong>Grasp how
                            quantum mechanics is setting the stage for a new era of computing, potentially
                            revolutionizing fields like cryptography.<strong><br/><br/>Personalized Learning </strong>Tailor
                            your quantum learning journey to match your goals and
                            background.<br/><br/><br/><br/><br/><br/>‍</p>
                        </div>
                        <div className="button-group">
                          <a href="#" className="button w-button">Enroll Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card w-slide">
                  <div data-w-id="8770342c-aad9-f1f6-985b-59c41ec7860c"
                       className="box _1 layout-card-gray">
                    <div className="div_1">
                      <div className="div_1-2"><img alt="" loading="lazy" src="images/virtual-reality.png"
                                                    className="icon-4 ic4"/>
                        <div className="text-wrapper">
                          <h2 className="text-weight-bold"><strong>AR-VR</strong></h2>
                          <p className="text-size-medium"><strong>Future of Things</strong> Delve into an AR/VR course that equips participants with the skills to create engaging virtual environments, understand user interaction<strong><br/>
                            <br/>3D Modeling Nuances </strong> Everything from 3D modeling and simulation to practical deployment strategies for interactive media and gaming.<br/><br/><br/><br/><br/><br/>‍</p>
                        </div>
                        <div className="button-group">
                          <a href="#" className="button w-button">Enroll Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card w-slide">
                  <div data-w-id="8770342c-aad9-f1f6-985b-59c41ec7860c"
                       className="box _1 layout-card-gray">
                    <div className="div_1">
                      <div className="div_1-2"><img alt="" loading="lazy" src="images/security.png"
                                                    className="icon-4 ic4"/>
                        <div className="text-wrapper">
                          <h2 className="text-weight-bold"><strong>Cyber Security</strong></h2>
                          <p className="text-size-medium"><strong>In-Depth exploration </strong>Principles and practices Tailored for both aspiring and current professionals as well as students.<strong><br/>
                            <br/>Gain essential Cyber Security </strong>It aims to equip participants with the skills needed to protect computer systems, networks, and data from threats and attacks.<br/><br/><br/><br/><br/><br/>‍</p>
                        </div>
                        <div className="button-group">
                          <a href="#" className="button w-button">Enroll Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slide68_arrow left w-slider-arrow-left"><img src="images/left-arrow.svg" loading="lazy"
                                                                           alt="" className="arrow"/></div>
              <div className="slide68_arrow w-slider-arrow-right"><img src="images/arrow-right.svg" loading="lazy"
                                                                       alt="" className="arrow"/></div>
              <div className="blog68_slide-nav w-slider-nav w-round"></div>
            </div>*/}

            <div className="my-16 xl:max-w-none">
              <div
                  className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-4 dark:border-white/5">
                {resources.map((resource) => (
                    <Resource key={resource.href} resource={resource}/>
                ))}
              </div>
            </div>
          </div>
        </section>
        <motion.section whileInView={{opacity: 1, y: 0}} // Target animation
                        initial={{opacity: 0, y: 50}} // Initial state before animation
                        transition={{duration: 1.0, ease: "easeInOut"}} // Animation timing
                        viewport={{once: true}} // Ensures animation runs only once
                        ref={featureSectionRef} className="section-features">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <div className="margin-bottom">
                  <div className="align-center">
                    <div data-w-id="d44de844-0ea8-9efd-4483-5c9b677cc1c1" className="text-highlight" style={{textTransform: "capitalize"}}>Features</div>
                  </div>
                </div>
                <div className="margin-bottom">
                  <h2 data-w-id="d44de844-0ea8-9efd-4483-5c9b677cc1c4"
                      className="heading-style-h2 text-align-center max-width-large">Loaded with robust features to
                    streamline your career development effortlessly</h2>
                </div>
                <motion.div whileInView={{opacity: 1, y: 0}}
                            initial={{opacity: 0, y: 50}}
                            transition={{duration: 1.0, ease: "easeInOut"}}
                            viewport={{once: true}} data-w-id="d44de844-0ea8-9efd-4483-5c9b677cc1c6"
                            className="w-layout-grid layout-component-dark">
                  <div className="layout-card">
                    <div className="layout-card-content-left">
                      <div className="layout-card-content-top">
                        <div className="margin-bottom">
                          <h3 className="heading-style-h3 white">Personalized Guidance</h3>
                        </div>
                        <div className="margin-bottom">
                          <p className="text-size-medium light-white" style={{lineHeight: '1.5'}}>Leverage AI to map out personalized career paths
                            based on user profiles, skill sets, and career aspirations. Users receive tailored
                            recommendations for roles and industries where you are likely to excel</p>
                        </div>
                      </div>
                    </div>
                    <div className="layout-image-wrapper"><img src="images/pg.png" loading="lazy"
                                                               sizes="(max-width: 479px) 80vw, (max-width: 767px) 83vw, (max-width: 991px) 640px, 44vw"
                                                               alt="" width="306"
                                                               srcSet="images/pg.png 500w, images/pg.png 888w"
                                                               className="feature-image"/></div>
                  </div>
                </motion.div>

                <div className="w-layout-grid _2-column-grid">

                  <motion.div whileInView={{opacity: 1, y: 0}}
                              initial={{opacity: 0, y: 50}}
                              transition={{duration: 1.0, ease: "easeInOut"}}
                              viewport={{once: true}} id="w-node-d44de844-0ea8-9efd-4483-5c9b677cc1d3-677cc1bb"
                              data-w-id="d44de844-0ea8-9efd-4483-5c9b677cc1d3" className="layout-card-gray">
                    <div className="layout-card-content-top">
                      <div className="margin-bottom">
                        <h3 className="heading-style-h3">Skill Gap Analysis</h3>
                      </div>
                      <div className="margin-bottom">
                        <p className="text-size-medium" style={{lineHeight: '1.5'}}>Our cutting-edge AI analyzes your current skillset against
                          market demands, identifying gaps and recommending targeted learning to bridge them
                          efficiently.</p>
                      </div>
                    </div>
                    <div className="graphic-layout-content"><img src="/images/sg.png" loading="lazy" width="442"
                                                                 sizes="(max-width: 767px) 80vw, 442px" alt=""
                                                                 srcSet="/images/sg.png 500w, /images/sg.png 1016w"/>
                    </div>
                  </motion.div>

                  <motion.div whileInView={{opacity: 1, y: 0}}
                              initial={{opacity: 0, y: 50}}
                              transition={{duration: 1.0, ease: "easeInOut"}}
                              viewport={{once: true}} id="w-node-d44de844-0ea8-9efd-4483-5c9b677cc1dd-677cc1bb"
                              data-w-id="d44de844-0ea8-9efd-4483-5c9b677cc1dd" className="layout-card-blue">
                    <div className="layout-card-content-top">
                      <div className="margin-bottom">
                        <h3 className="heading-style-h3 white">Real-World Interview Simulation</h3>
                      </div>
                      <div className="margin-bottom">
                        <p className="text-size-medium text-color-white" style={{lineHeight: '1.5'}}>Whether it&#x27;s a technical interview, a
                          behavioral interview, or a case study, choose your interview type and customize your
                          practice sessions according to the job role you target. Get instant feedback on your
                          responses, body language, and presentation skills.</p>
                      </div>
                    </div>
                    <div className="graphic-layout-content"><img src="images/interview.png" loading="lazy" width="442"
                                                                 sizes="(max-width: 767px) 80vw, 442px" alt=""
                                                                 srcSet="images/interview.png 500w, images/interview.png 934w"/>
                    </div>
                  </motion.div>
                </div>

                <div data-w-id="d44de844-0ea8-9efd-4483-5c9b677cc1e7"
                     className="w-layout-grid layout-component-ful-width bottom-shape-right">

                  <motion.div whileInView={{opacity: 1, y: 0}}
                              initial={{opacity: 0, y: 50}}
                              transition={{duration: 0.5, ease: "easeInOut"}}
                              viewport={{once: true}} data-w-id="d44de844-0ea8-9efd-4483-5c9b677cc1e8"
                              className="layout-card-gray-horizontal">
                    <div className="layout-card-content">
                      <div className="layout-card-content-top margin-small">
                        <div className="margin-bottom">
                          <h3 className="heading-style-h3">Smart Resume Optimization</h3>
                        </div>
                        <div className="margin-bottom">
                          <p className="text-size-medium" style={{lineHeight: '1.5'}}>Our platform suggests optimizations based on the job
                            you&#x27;re applying for, ensuring your resume stands out to recruiters. Access a
                            variety of templates that are optimized for different industries, ensuring your resume
                            matches the expectations and norms of your desired field.</p>
                        </div>
                      </div>
                    </div>
                    <div className="layout-image-wrapper"><img src="images/Graphic4.png" loading="lazy"
                                                               srcSet="images/Graphic4-p-500.png 500w, images/Graphic4-p-800.png 800w, images/Graphic4.png 1354w"
                                                               alt="" sizes="(max-width: 991px) 90vw, 48vw"
                                                               className="feature-image integrations"/></div>
                  </motion.div>
                </div>


                <div className="w-layout-grid _2-column-grid">

                  <motion.div whileInView={{opacity: 1, y: 0}}
                              initial={{opacity: 0, y: 50}}
                              transition={{duration: 0.5, ease: "easeInOut"}}
                              viewport={{once: true}} id="w-node-d44de844-0ea8-9efd-4483-5c9b677cc1f4-677cc1bb"
                              data-w-id="d44de844-0ea8-9efd-4483-5c9b677cc1f4" className="layout-card-dark">
                    <div className="layout-card-content-top">
                      <div className="margin-bottom">
                        <h3 className="heading-style-h3 white">Curated Learning Paths</h3>
                      </div>
                      <div className="margin-bottom">
                        <p className="text-size-medium light-white" style={{lineHeight: '1.5'}}>Explore courses designed to advance your career.
                          Engage with interactive content, including simulations, projects, and quizzes, to reinforce
                          learning and apply skills in real-world scenarios</p>
                      </div>
                    </div>
                    <div className="graphic-layout-content"><img src="images/learning.png" loading="lazy" alt=""
                                                                 srcSet="images/learning.png 500w, images/learning.png 993w"
                                                                 sizes="(max-width: 479px) 80vw, (max-width: 767px) 83vw, (max-width: 991px) 85vw, (max-width: 1256px) 79vw, 993px"/>
                    </div>
                  </motion.div>


                  <motion.div
                      whileInView={{opacity: 1, y: 0}}
                      initial={{opacity: 0, x: '-5vw', y: '-5vh'}} // Start from top-left off-screen
                      animate={{x: 0, y: 0}} // End at the div's natural position
                      transition={{duration: 1, ease: "easeInOut"}} // Customize the animation timing
                      id="w-node-d44de844-0ea8-9efd-4483-5c9b677cc1fe-677cc1bb"
                      data-w-id="d44de844-0ea8-9efd-4483-5c9b677cc1fe" className="layout-card-gray">

                    <div className="layout-card-content-top">
                      <div className="margin-bottom">
                        <h3 className="heading-style-h3">Comprehensive Career Overview</h3>
                      </div>
                      <div className="margin-bottom">
                        <p className="text-size-medium" style={{lineHeight: '1.5'}}>Get a bird&#x27;s eye view of your career development journey.
                          Track your progress, set goals, and review personalized recommendations all from a single
                          dashboard.</p>
                      </div>
                    </div>
                    <div className="graphic-layout-content"><img src="images/career.png" loading="lazy" alt=""
                                                                 srcSet="images/career0.png 500w, images/career.png 1016w"
                                                                 sizes="(max-width: 479px) 80vw, (max-width: 767px) 83vw, (max-width: 991px) 85vw, (max-width: 1270px) 80vw, 1016px"/>
                    </div>
                  </motion.div>


                </div>
              </div>
            </div>
          </div>
        </motion.section>
        <motion.section whileInView={{opacity: 1, y: 0}}
                        initial={{opacity: 0, y: 50}}
                        transition={{duration: 0.5}} className="section-services">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <div className="margin-bottom">
                  <div className="align-center">
                    <div data-w-id="aec0b6d2-398a-fb3c-88c4-d4173188ea1f" className="text-highlight" style={{textTransform: "capitalize"}}>Thoughtfulness
                      innovation together
                    </div>
                  </div>
                </div>
                <div className="margin-bottom margin-large">
                  <h2 data-w-id="aec0b6d2-398a-fb3c-88c4-d4173188ea22"
                      className="heading-style-h2 text-align-center text-color-white">Let us be part of your career
                    growth</h2>
                </div>
                <div className="w-layout-grid core-features-grid">
                  <div id="w-node-aec0b6d2-398a-fb3c-88c4-d4173188ea25-3188ea19"
                       data-w-id="aec0b6d2-398a-fb3c-88c4-d4173188ea25" className="resource-item">
                    <div className="margin-bottom"><img src="images/Icon1.svg" loading="lazy" width="48" alt=""/>
                    </div>
                    <div className="margin-bottom">
                      <h5 className="heading-style-h5 text-color-white">Real-time Market Insights</h5>
                    </div>
                    <div className="margin-bottom">
                      <p className="text-size-medium text-color-gray">Stay informed with up-to-date market trends, job
                        opportunities, and industry demands, enabling you to make well-informed career decisions.</p>
                    </div>
                  </div>
                  <div data-w-id="aec0b6d2-398a-fb3c-88c4-d4173188ea2e" className="resource-item">
                    <div className="margin-bottom"><img src="images/Icon2.svg" loading="lazy" width="48" alt=""/>
                    </div>
                    <div className="margin-bottom">
                      <h5 className="heading-style-h5 text-color-white">Networking Opportunities</h5>
                    </div>
                    <div className="margin-bottom">
                      <p className="text-size-medium text-color-gray">Connect with professionals, mentors, and peers
                        within the AYC community, expanding your network and unlocking new career opportunities.</p>
                    </div>
                  </div>
                  <div id="w-node-aec0b6d2-398a-fb3c-88c4-d4173188ea37-3188ea19"
                       data-w-id="aec0b6d2-398a-fb3c-88c4-d4173188ea37" className="resource-item">
                    <div className="margin-bottom"><img src="images/Icon3.svg" loading="lazy" width="48" alt=""/>
                    </div>
                    <div className="margin-bottom">
                      <h5 className="heading-style-h5 text-color-white">Motivational Milestones</h5>
                    </div>
                    <div className="margin-bottom">
                      <p className="text-size-medium text-color-gray">Set and achieve milestones with the AYC
                        platform, receiving recognition and rewards that keep you motivated throughout your career
                        development journey.</p>
                    </div>
                  </div>
                  <div data-w-id="aec0b6d2-398a-fb3c-88c4-d4173188ea40" className="resource-item">
                    <div className="margin-bottom"><img src="images/Icon4.svg" loading="lazy" width="48" alt=""/>
                    </div>
                    <div className="margin-bottom">
                      <h5 className="heading-style-h5 text-color-white">Flexible Learning Paths</h5>
                    </div>
                    <div className="margin-bottom">
                      <p className="text-size-medium text-color-gray">Engage in learning at your own pace, with
                        flexible courses and resources that fit into your schedule, making skill development
                        compatible with your lifestyle.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        <motion.section whileInView={{opacity: 1, y: 0}}
                        initial={{opacity: 0, y: 50}}
                        transition={{duration: 0.5}} className="section-cta">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-small">
                <div className="w-layout-grid grid ">
                  <div id="w-node-ee172e5d-ad0e-331c-51dd-00304570e1b7-4570e1b2" className="content-info">
                    <h2 className="heading-style-h2">Ready to empower your career with AYC ? </h2>
                    <a href="#" className="button w-button">Join Our Waitlist</a>
                  </div>
                  <div id="w-node-ee172e5d-ad0e-331c-51dd-00304570e1be-4570e1b2" className="image-wrapper cta"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        <div className="footer-component">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-vertical padding-xxlarge">
                <div className="padding-bottom padding-xxlarge">
                  <div className="w-layout-grid footer-top-wrapper">
                    <div className="footer-left-wrapper text-color-white">
                      <div className="margin-bottom margin-medium">
                        <a href="/" className="footer3-logo-link w-nav-brand">
                          <img src={logoExplain} alt={"Accelerate Your Career"} className="brand logo-2"
                               style={{minWidth: "50px", minHeight: "50px"}}></img>
                        </a>

                      </div>
                      <div className="margin-bottom margin-medium">
                      <div className="footer3-details-wrapper">
                          <div className="text-size-small-2">‍<span className="text-weight-semibold">Address</span>
                            <a href="#" className="link-2"><br/>P.O Box 2345, Bedford Dr, Kingston<br/>New York 12401</a>
                          </div>
                        </div>
                      </div>
                      <div className="margin-bottom margin-medium">
                        <div className="footer3-details-wrapper">
                          <div className="text-size-small-2">‍<span className="text-weight-semibold">Contact:</span>
                            <a href="#" className="link-2"><br/>business@aycyourself.com</a>
                          </div>
                        </div>
                      </div>
                      <div className="w-layout-grid footer-social-list">
                        <a href="#" className="footer-social-link w-inline-block">
                          <div className="social-icon w-embed">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M16.5 6H13.5C12.9477 6 12.5 6.44772 12.5 7V10H16.5C16.6137 9.99748 16.7216 10.0504 16.7892 10.1419C16.8568 10.2334 16.8758 10.352 16.84 10.46L16.1 12.66C16.0318 12.8619 15.8431 12.9984 15.63 13H12.5V20.5C12.5 20.7761 12.2761 21 12 21H9.5C9.22386 21 9 20.7761 9 20.5V13H7.5C7.22386 13 7 12.7761 7 12.5V10.5C7 10.2239 7.22386 10 7.5 10H9V7C9 4.79086 10.7909 3 13 3H16.5C16.7761 3 17 3.22386 17 3.5V5.5C17 5.77614 16.7761 6 16.5 6Z"
                                  fill="CurrentColor"></path>
                            </svg>
                          </div>
                        </a>
                        <a href="#" className="footer-social-link w-inline-block">
                          <div className="social-icon w-embed">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd"
                                    d="M16 3H8C5.23858 3 3 5.23858 3 8V16C3 18.7614 5.23858 21 8 21H16C18.7614 21 21 18.7614 21 16V8C21 5.23858 18.7614 3 16 3ZM19.25 16C19.2445 17.7926 17.7926 19.2445 16 19.25H8C6.20735 19.2445 4.75549 17.7926 4.75 16V8C4.75549 6.20735 6.20735 4.75549 8 4.75H16C17.7926 4.75549 19.2445 6.20735 19.25 8V16ZM16.75 8.25C17.3023 8.25 17.75 7.80228 17.75 7.25C17.75 6.69772 17.3023 6.25 16.75 6.25C16.1977 6.25 15.75 6.69772 15.75 7.25C15.75 7.80228 16.1977 8.25 16.75 8.25ZM12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5027 10.8057 16.0294 9.65957 15.1849 8.81508C14.3404 7.97059 13.1943 7.49734 12 7.5ZM9.25 12C9.25 13.5188 10.4812 14.75 12 14.75C13.5188 14.75 14.75 13.5188 14.75 12C14.75 10.4812 13.5188 9.25 12 9.25C10.4812 9.25 9.25 10.4812 9.25 12Z"
                                    fill="CurrentColor"></path>
                            </svg>
                          </div>
                        </a>
                        <a href="#" className="footer-social-link w-inline-block">
                          <div className="social-icon w-embed">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M20.9728 6.7174C20.5084 7.33692 19.947 7.87733 19.3103 8.31776C19.3103 8.47959 19.3103 8.64142 19.3103 8.81225C19.3154 11.7511 18.1415 14.5691 16.0518 16.6345C13.962 18.6999 11.1312 19.8399 8.19405 19.7989C6.49599 19.8046 4.81967 19.4169 3.29642 18.6661C3.21428 18.6302 3.16131 18.549 3.16162 18.4593V18.3604C3.16162 18.2313 3.26623 18.1267 3.39527 18.1267C5.06442 18.0716 6.67402 17.4929 7.99634 16.4724C6.48553 16.4419 5.12619 15.5469 4.5006 14.1707C4.46901 14.0956 4.47884 14.0093 4.52657 13.9432C4.57429 13.8771 4.653 13.8407 4.73425 13.8471C5.19342 13.8932 5.65718 13.8505 6.1002 13.7212C4.43239 13.375 3.17921 11.9904 2.99986 10.2957C2.99349 10.2144 3.02992 10.1357 3.096 10.0879C3.16207 10.0402 3.24824 10.0303 3.32338 10.062C3.77094 10.2595 4.25409 10.3635 4.74324 10.3676C3.28184 9.40846 2.65061 7.58405 3.20655 5.92622C3.26394 5.76513 3.40181 5.64612 3.5695 5.61294C3.73718 5.57975 3.90996 5.63728 4.02432 5.76439C5.99639 7.86325 8.70604 9.11396 11.5819 9.25279C11.5083 8.95885 11.4721 8.65676 11.4741 8.35372C11.501 6.76472 12.4842 5.34921 13.9634 4.76987C15.4425 4.19054 17.1249 4.56203 18.223 5.71044C18.9714 5.56785 19.695 5.31645 20.3707 4.96421C20.4202 4.93331 20.483 4.93331 20.5325 4.96421C20.5634 5.01373 20.5634 5.07652 20.5325 5.12604C20.2052 5.87552 19.6523 6.50412 18.9509 6.92419C19.5651 6.85296 20.1685 6.70807 20.7482 6.49264C20.797 6.45942 20.8611 6.45942 20.9099 6.49264C20.9508 6.51134 20.9814 6.54711 20.9935 6.59042C21.0056 6.63373 20.998 6.68018 20.9728 6.7174Z"
                                  fill="CurrentColor"></path>
                            </svg>
                          </div>
                        </a>
                        <a href="#" className="footer-social-link w-inline-block">
                          <div className="social-icon w-embed">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd"
                                    d="M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3ZM8 18C8.27614 18 8.5 17.7761 8.5 17.5V10.5C8.5 10.2239 8.27614 10 8 10H6.5C6.22386 10 6 10.2239 6 10.5V17.5C6 17.7761 6.22386 18 6.5 18H8ZM7.25 9C6.42157 9 5.75 8.32843 5.75 7.5C5.75 6.67157 6.42157 6 7.25 6C8.07843 6 8.75 6.67157 8.75 7.5C8.75 8.32843 8.07843 9 7.25 9ZM17.5 18C17.7761 18 18 17.7761 18 17.5V12.9C18.0325 11.3108 16.8576 9.95452 15.28 9.76C14.177 9.65925 13.1083 10.1744 12.5 11.1V10.5C12.5 10.2239 12.2761 10 12 10H10.5C10.2239 10 10 10.2239 10 10.5V17.5C10 17.7761 10.2239 18 10.5 18H12C12.2761 18 12.5 17.7761 12.5 17.5V13.75C12.5 12.9216 13.1716 12.25 14 12.25C14.8284 12.25 15.5 12.9216 15.5 13.75V17.5C15.5 17.7761 15.7239 18 16 18H17.5Z"
                                    fill="CurrentColor"></path>
                            </svg>
                          </div>
                        </a>
                        <a href="#" className="footer-social-link w-inline-block">
                          <div className="social-icon w-embed">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd"
                                    d="M18.5399 4.33992L19.9999 4.48992C21.7284 4.68529 23.0264 6.16064 22.9999 7.89992V16.0999C23.0264 17.8392 21.7284 19.3146 19.9999 19.5099L18.5999 19.6599C14.2315 20.1099 9.82835 20.1099 5.45991 19.6599L3.99991 19.5099C2.27143 19.3146 0.973464 17.8392 0.999909 16.0999V7.89992C0.973464 6.16064 2.27143 4.68529 3.99991 4.48992L5.39991 4.33992C9.76835 3.88995 14.1715 3.88995 18.5399 4.33992ZM11.1099 15.2199L14.9999 12.6199H15.0599C15.2695 12.4833 15.3959 12.2501 15.3959 11.9999C15.3959 11.7497 15.2695 11.5165 15.0599 11.3799L11.1699 8.77992C10.9402 8.62469 10.6437 8.60879 10.3987 8.73859C10.1538 8.86839 10.0004 9.12271 9.99991 9.39992V14.5999C10.0128 14.858 10.1576 15.0913 10.3832 15.2173C10.6088 15.3433 10.8834 15.3443 11.1099 15.2199Z"
                                    fill="currentColor"></path>
                            </svg>
                          </div>
                        </a>
                        <a href="http://flames.design/designup" target="_blank"
                           className="footer-social-link w-inline-block">
                          <div className="social-icon w-embed">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M10.8169 2.07759C10.7417 2.13362 10.6886 2.28017 10.5913 2.68966C10.5205 2.98707 10.3922 3.43103 10.3038 3.68103C10.2153 3.93103 10.0251 4.36638 9.88352 4.65086C9.73754 4.93534 9.48539 5.35345 9.32171 5.57759C9.15361 5.80172 8.80414 6.2069 8.53429 6.47414C8.26445 6.74569 7.68937 7.26293 7.25142 7.62069C6.81347 7.97845 6.28705 8.42672 6.08356 8.61638C5.88007 8.80603 5.59696 9.10776 5.44655 9.28448C5.30057 9.46121 5.11477 9.71121 5.03515 9.8319C4.9511 9.9569 4.81838 10.1897 4.73433 10.3491C4.65471 10.5129 4.522 10.819 4.44679 11.0302C4.36717 11.2414 4.25657 11.6509 4.19907 11.9353C4.14156 12.2198 4.07078 12.6767 4.04866 12.9483C4.02212 13.2198 4 13.7112 4 14.0345C4 14.3621 4.02212 14.819 4.04866 15.0474C4.07078 15.2802 4.14598 15.694 4.20791 15.9655C4.26985 16.2371 4.38044 16.625 4.45122 16.8276C4.522 17.0302 4.67683 17.3879 4.79627 17.625C4.91128 17.8621 5.12804 18.2328 5.2696 18.444C5.41558 18.6552 5.64119 18.9569 5.7739 19.1121C5.90219 19.2672 6.14992 19.5259 6.32244 19.6897C6.49054 19.8534 6.76039 20.0905 6.91964 20.2112C7.0789 20.3319 7.35759 20.5302 7.53896 20.6466C7.72033 20.7672 8.02114 20.944 8.20252 21.0388C8.38389 21.1336 8.76433 21.3017 9.04302 21.4095C9.32171 21.5172 9.74197 21.6595 9.972 21.7198C10.202 21.7802 10.6621 21.8664 10.9894 21.9138C11.3168 21.9612 11.8034 22 12.0733 22C12.3431 22 12.7987 21.9698 13.0907 21.931C13.3827 21.8922 13.8118 21.8147 14.0418 21.7586C14.2718 21.7026 14.6523 21.5862 14.8823 21.5C15.1123 21.4181 15.5105 21.2414 15.767 21.1078C16.0236 20.9784 16.3598 20.7802 16.5191 20.6724C16.6783 20.5647 16.9438 20.3664 17.1163 20.2284C17.2888 20.0948 17.625 19.7845 17.8683 19.5345C18.1116 19.2888 18.4434 18.9052 18.6071 18.681C18.7707 18.4569 19.0229 18.0388 19.1689 17.7543C19.3149 17.4698 19.4962 17.0517 19.5714 16.8276C19.6511 16.6034 19.7616 16.194 19.8192 15.9224C19.8767 15.6509 19.943 15.1552 19.974 14.8233C20.0094 14.3707 20.0094 14.069 19.9696 13.6164C19.943 13.2845 19.8811 12.8103 19.8369 12.5603C19.7882 12.3103 19.6997 11.931 19.6378 11.7198C19.5714 11.5086 19.452 11.1466 19.3635 10.9224C19.275 10.6983 19.1158 10.3362 19.0052 10.125C18.899 9.91379 18.7177 9.59914 18.6071 9.43535C18.5009 9.27155 18.3107 9.01724 18.1912 8.875C18.0674 8.73276 17.9391 8.60345 17.9081 8.5819C17.8727 8.56466 17.771 8.55603 17.6825 8.56034C17.5321 8.57328 17.4967 8.59914 17.3817 8.78448C17.3109 8.89655 17.9363 9.51812 17.1974 11.0805C16.8893 11.5476 16.7867 11.7816 16.4621 12.1611C16.1375 12.5406 15.7818 12.9195 15.3099 12.9195C14.8381 12.9195 15.3099 11.5402 15.4132 10.3319C15.4353 10.0388 15.4574 9.56466 15.4574 9.27155C15.4574 8.98276 15.4264 8.49569 15.391 8.18535C15.3556 7.875 15.276 7.43103 15.2185 7.19397C15.161 6.9569 15.0371 6.56897 14.9487 6.3319C14.8558 6.09483 14.6965 5.73707 14.5948 5.53448C14.4886 5.3319 14.2851 4.99569 14.1435 4.78017C13.9976 4.56466 13.7321 4.21983 13.5463 4.00431C13.365 3.78879 13.0553 3.47414 12.8651 3.29741C12.6749 3.125 12.3564 2.86207 12.1617 2.71121C11.9671 2.56466 11.6574 2.34052 11.4761 2.21983C11.2814 2.09052 11.0956 2 11.0293 2C10.9629 2 10.87 2.03448 10.8169 2.07328V2.07759Z"
                                  fill="currentColor"></path>
                            </svg>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="w-layout-grid footer-menu-wrapper text-color-white">
                      <div className="footer-link-list">
                        <div className="text-size-medium-4" style={{paddingBottom: "20px", minWidth: "250px"}}>‍<span
                            className="text-weight-semibold">Featured Services</span>
                        </div>
                        <a href="aboutus" className="footer-link">Blockchain</a>
                        <a href="aboutus" className="footer-link">Cyber Security</a>
                        <a href="aboutus" className="footer-link">AR-VR</a>
                        <a href="aboutus" className="footer-link">AI & Machine Learning</a>
                        <a href="aboutus" className="footer-link">Quantum Computing</a>
                        <a href="aboutus" className="footer-link">Cloud & Edge Computing</a>
                      </div>
                      <div className="footer-link-list">
                        <div className="text-size-medium-4 padding-bottom" style={{paddingBottom: "20px"}}>‍<span
                            className="text-weight-semibold">Site Links</span>
                        </div>
                        <a href="aboutus" className="footer-link">Platform</a>
                        <a href="aboutus" className="footer-link">Solutions</a>
                        <a href="aboutus" className="footer-link">Career</a>
                        <a href="aboutus" className="footer-link">Events</a>
                        <a href="aboutus" className="footer-link">Pricing</a>
                        <a href="aboutus" className="footer-link">Resources</a>
                        <a href="aboutus" className="footer-link">About Us</a>
                        <a href="contact-us.html" className="footer-link">Contact</a>
                        <a href="company/features.html" className="footer-link">Features</a>
                        <a href="account/sign-up.html" className="footer-link">Sign Up</a>
                      </div>
                      <div className="footer-link-list"></div>
                    </div>
                  </div>
                </div>
                <div className="line-divider"></div>
                <div className="padding-top padding-medium text-color-white">
                  <div className="footer-bottom-wrapper">
                    <div className="footer-credit-text">© 2024 Advancing Your Career. All Rights Reserved.<br/></div>
                    <div className="w-layout-grid footer3-legal-list">
                      <a href="#" className="footer-legal-link">Privacy Policy</a>
                      <a href="#" className="footer-legal-link">Terms of Service</a>
                      <a href="#" className="footer-legal-link">Cookies Settings</a>
                      <a href="http://flames.design/designup" className="footer-legal-link legal">DesignUp</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="extras-cta">
          <div className="hire-us">
            <div className="hire-us-wrapper">
              <div className="hire-us-text">Hire us to build a website using this template. Get unlimited
                design &amp; dev.
              </div>
              <div className="hire-us-buttons">
                <a href="http://designup.net" target="_blank" className="hire-us-button w-inline-block">
                  <div className="hire-us-button-text">View pricing</div>
                </a>
              </div>
              <div data-w-id="3e1d66bb-f76c-c42f-076a-789b7baa5b0f" className="hire-us-close-icon"><img
                  src="/images/X.svg" loading="lazy" alt="" className="image-7"/></div>
            </div>
          </div>
          <a href="https://webflow.com/templates/html/offdata-saas-website-template" target="_blank"
             className="buy-template w-inline-block"><img src="/images/Webflow-Logo.svg" loading="lazy" alt=""
                                                          className="dup-icon"/>
            <div className="buy-template-label">Buy this Template</div>
          </a>
          <a href="https://webflow.com/templates/designers/designup" target="_blank"
             className="all-templates w-inline-block"><img src="/images/DesignUp.svg" loading="lazy" alt=""
                                                           className="dup-icon"/>
            <div className="all-templates-label">All Templates</div>
          </a>
        </div>
      </>
  )
}


export default App
