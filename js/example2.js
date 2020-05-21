window.addEventListener("DOMContentLoaded", (event) => {
  let dripItemContainers = document.querySelectorAll(".drip-item-container");
  let dripItems = document.querySelectorAll(".drip-item");

  let spreadTl = gsap.timeline({ paused: true });
  let wobbleTl = gsap.timeline({ paused: true });
  let finalBlurTl = gsap.timeline({paused: true});

  let spreadDistance = 100;

  let circlingDur = 8;

  spreadTl
    .to(dripItems, {
      delay: 0.3,
      duration: 0.5,
      y: -spreadDistance,
      ease: "back.out(1.7)",
      stagger: 0.2,
    })
    .to(
      dripItemContainers,
      {
        duration: circlingDur,
        rotate: 360 * 5,
        ease: "power1.inOut",
        stagger: 0.3,
      },
      "-=2"
    )
    .to(
      dripItems,
      {
        duration: 0.5,
        y: 0,
        ease: "power3.in",
        stagger: 0.3,
        onComplete: () => {
          toggleTl.reverse();
        },
      },
      "-=2.5"
    );

  wobbleTl.to(dripItems, {
    delay: 0.5,
    duration: circlingDur / 3,
    scaleX: 0.8,
    scaleY: 1.2,
    ease: "power3.in",
  })
  .to(dripItems, {
    duration: circlingDur / 3,
    scaleX: 0.8,
    scaleY: 0.7,
    ease: "power3.in",
  })
  .to(dripItems, {
    duration: circlingDur / 3,
    scaleX: 1.2,
    scaleY: 1.4,
    ease: "power3.in",
  })
  .to(dripItems, {
    duration: 0.5,
    scale: 1.0,
    ease: "power3.in",
  });

  let toggleTl = gsap.timeline({ paused: true });

  toggleTl.to(document.querySelector(".toggle-link"), {
    duration: 0.3,
    scale: 0,
    ease: "back.in(1.7)",
  });

  let toggle = document
    .querySelector(".toggle-link")
    .addEventListener("click", (e) => {
      e.preventDefault();

      toggleTl.restart();
      wobbleTl.restart();
      spreadTl.restart();
    });
});
