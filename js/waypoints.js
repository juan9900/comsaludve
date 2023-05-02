const header = $("header");

$(document).ready(() => {
  // ABOUT US TEXT
  const headingContainer = $(".heading-container");
  var waypointAbout = new Waypoint({
    element: header,
    handler: function (direction) {
      $(".section-title").addClass(
        "animate__animated animate__backInRight animate__slow"
      );
      $(".heading-subtitle").addClass(
        "animate__animated animate__fadeInLeft animate__delay-2s"
      );
    },
    offset: 0,
  });
});
