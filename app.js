async function loadSVG() {
  try {
    const response = await fetch("city.svg");
    if (!response.ok) throw new Error("Failed to load SVG");

    const svgText = await response.text();
    const container = document.getElementById("bg_city");

    if (!container) throw new Error("SVG container element not found");
    container.innerHTML = svgText;

    const svgElem = container.querySelector("svg");
    if (!svgElem) throw new Error("SVG element not found");

    svgElem.setAttribute("preserveAspectRatio", "xMidYMid slice");

    // Apply GPU acceleration hints
    const animatedEls = [
      svgElem,
      document.getElementById("full_city"),
      document.getElementById("building_top"),
      document.getElementById("interior_wall_top"),
      document.getElementById("wall_side"),
      document.getElementById("interior_wall_side"),
      document.getElementById("wall_front"),
      document.getElementById("interior_wall_side_2"),
      document.getElementById("interior_wall_front"),
      document.querySelector(".business-card"),
    ];

    animatedEls.forEach((el) => {
      if (el) el.style.willChange = "transform, opacity";
    });

    // Once SVG is ready, apply scroll-based animations
    setAnimationScroll();
    animateSocialLinks();
  } catch (err) {
    console.error("SVG load error:", err);
  }
}

function setAnimationScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const duration = 1;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#bg_city",
      start: "top top",
      end: "+=1500",
      scrub: true,
      pin: true,
    },
  });

  tl.to("#bg_city svg", { scale: 1.5, duration, ease: "power1.out" }, 0)
    .to("#full_city", { opacity: 0, duration, ease: "power1.out" }, 0)
    .to(
      ["#building_top", "#interior_wall_top"],
      { y: -200, opacity: 0, duration, ease: "power1.out" },
      duration * 0.5
    )
    .to(
      ["#wall_side", "#interior_wall_side"],
      { x: -200, opacity: 0, duration, ease: "power1.out" },
      duration * 0.5
    )
    .to(
      "#wall_front",
      { x: 200, y: 200, opacity: 0, duration, ease: "power1.out" },
      duration * 0.5
    )
    .to(
      ["#interior_wall_side_2", "#interior_wall_front"],
      { opacity: 0, duration, ease: "power1.out" },
      duration * 1.5
    )
    .fromTo(
      ".business-card",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power1.out" },
      duration * 1.2
    );
}

function animateSocialLinks() {
  gsap.utils.toArray(".social-links li").forEach((el, index) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  });
}

// Initialize everything
loadSVG();
