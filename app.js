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

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#bg_city",
      start: "top top",
      end: "+=1200",
      scrub: 1,
      pin: true,
    },
  });

  tl.to("#bg_city svg", { scale: 1.8, duration: 1, ease: "power2.inOut" }, 0)
    .to("#full_city", { opacity: 0, x: -100, duration: 0.8, ease: "power2.in" }, 0)
    .to(
      ["#building_top", "#interior_wall_top"],
      { y: -250, x: 50, opacity: 0, duration: 0.8, ease: "power2.in" },
      0.3
    )
    .to(
      ["#wall_side", "#interior_wall_side"],
      { x: -250, y: 30, opacity: 0, duration: 0.8, ease: "power2.in" },
      0.3
    )
    .to(
      "#wall_front",
      { x: 250, y: 250, opacity: 0, duration: 0.8, ease: "power2.in" },
      0.3
    )
    .to(
      ["#interior_wall_side_2", "#interior_wall_front"],
      { opacity: 0, scale: 0.9, duration: 0.6, ease: "power2.in" },
      0.8
    )
    .fromTo(
      ".business-card",
      { opacity: 0, y: 80, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.2)" },
      1
    );
}

function animateSocialLinks() {
  // Animation disabled - links show immediately
  // gsap.utils.toArray(".social-links li").forEach((el, index) => {
  //   gsap.fromTo(
  //     el,
  //     { opacity: 0, y: 30, x: -20 },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       x: 0,
  //       duration: 0.8,
  //       delay: index * 0.15,
  //       ease: "back.out(1.5)",
  //       scrollTrigger: {
  //         trigger: ".social-links",
  //         start: "top 85%",
  //         toggleActions: "play none none none",
  //       },
  //     }
  //   );
  // });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadSVG);
} else {
  loadSVG();
}
