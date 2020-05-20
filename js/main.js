window.addEventListener("DOMContentLoaded", (event) => {
  let menuItemContainers = document.querySelectorAll(".share-menu-item");

  let startAngle = 90;
  let angleIncrement = 180 / (menuItemContainers.length - 1);
  let distance = 100;
  let animSpeed = 1200;
  let angle;

  function setup() {
    menuItemContainers.forEach((item, index) => {
      angle = startAngle + index * angleIncrement;

      item.style.transform = "rotate(" + angle + "deg)";

      item.querySelector(".menu-link").style.transform =
        "rotate(-" + angle + "deg)";

      // item.querySelector('.menu-wrapper').style.transform = 'translateY(' + distance + 'px)';
    });

    eventListeners();
  }

  function eventListeners() {
    let menuItems = document.querySelectorAll(".menu-item");
    let toggle = document.querySelector('.toggle-wrapper');
    let toggleState = false;

    let spreadTl = gsap.timeline({ paused: true });
    let shrinkTl = gsap.timeline({ paused: true });
    let toggleTl = gsap.timeline({ paused: true });

    spreadTl.to(menuItems, {
      duration: animSpeed / 1000,
      y: distance,
      ease: "back.out(1.7)",
      stagger: 0.1,
    });

    shrinkTl.to(menuItems, {
      duration: animSpeed / 1000,
      y: 0,
      ease: "elastic.out(1, 0.9)",
      stagger: 0.1,
    });

    toggleTl.to(toggle, {
      duration: (animSpeed / 1000) / 2,
      rotate: '45deg',
      ease: 'power3.inOut'
    });

    document.querySelector(".toggle-link").addEventListener("click", (e) => {
      e.preventDefault();

      if (toggleState) {
        shrinkTl.invalidate();
        shrinkTl.restart();

        toggleTl.reverse();
      } else {
        spreadTl.invalidate();
        spreadTl.restart();

        toggleTl.restart();
      }

      toggleState = !toggleState;
    });
  }

  setup();
});
