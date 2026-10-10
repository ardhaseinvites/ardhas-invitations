import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Helmet } from "react-helmet";
import Home from "./pages/Home";
const Customizer = lazy(() => import("./pages/Customizer"));
const Preview = lazy(() => import("./pages/Preview"));
const Housewarming = lazy(() => import("./pages/Housewarming"));
export default function App() {
  const location = useLocation();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }
    let frame;
    const deadline = performance.now() + 3000;
    const scrollToSection = () => {
      const target = document.getElementById(location.hash.slice(1));
      if (target)
        target.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
      else if (performance.now() < deadline)
        frame = requestAnimationFrame(scrollToSection);
    };
    scrollToSection();
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash, reduced]);
  return (
    <>
      <Helmet>
        <title>Ardhas — Invitations, beautifully reimagined</title>
        <meta
          name="description"
          content="Explore 80 dedicated invitation designs for 16 celebrations. Personalize every detail, photo, and location with Ardhas."
        />
      </Helmet>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: reduced ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: reduced ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Suspense
            fallback={
              <div className="page-loader" role="status">
                <span className="brand">
                  Ardhas<span>✧</span>
                </span>
                <p>A beautiful beginning is loading…</p>
              </div>
            }
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/customizer" element={<Customizer />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/housewarming" element={<Housewarming />} />
              <Route
                path="*"
                element={
                  <main className="not-found">
                    <h1>A little off the guest list.</h1>
                    <p>Let's find your way back to a beautiful beginning.</p>
                    <Link className="button primary" to="/">
                      Back to Ardhas
                    </Link>
                  </main>
                }
              />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
