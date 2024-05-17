$(document).ready(function () {
  const currentYear = new Date().getFullYear();
  $("#footer-year").text(currentYear);

  /* Navigation scroll */
  $(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html,body").animate(
            {
              scrollTop: target.offset().top - 50,
            },
            600
          );
          return false;
        }
      }
    });
  });
  $("#plan-1").on("click", function () {
    $("#modal-plan-1").modal("show");
  });
  $("#plan-2").on("click", function () {
    $("#modal-plan-2").modal("show");
  });
  $("#plan-3").on("click", function () {
    $("#modal-plan-3").modal("show");
  });
  $("#plan-4").on("click", function () {
    $("#modal-plan-4").modal("show");
  });
  $("#plan-5").on("click", function () {
    $("#modal-plan-5").modal("show");
  });
  $("#plan-6").on("click", function () {
    $("#modal-plan-6").modal("show");
  });

  function checkName(e) {
    var c = this.selectionStart,
      r = /[^a-z ]/gi,
      v = $(this).val();
    if (r.test(v)) {
      $(this).val(v.replace(r, ""));
      c--;
    }
    this.setSelectionRange(c, c);
    console.log(e.which);
  }

  function checkPhone(e) {
    var c = this.selectionStart,
      r = /[^+0-9 -]/gi,
      v = $(this).val();
    if (r.test(v)) {
      $(this).val(v.replace(r, ""));
      c--;
    }
    this.setSelectionRange(c, c);
    console.log(e.which);
  }

  function checkEmail(e) {
    var c = this.selectionStart,
      r = /[^a-z0-9.@_]/gi,
      v = $(this).val();
    if (r.test(v)) {
      $(this).val(v.replace(r, ""));
      c--;
    }
    this.setSelectionRange(c, c);
    console.log(e.which);
  }

  $("#firstName").on("input", checkName);

  $("#lastName").on("input", checkName);

  $("#phoneNumber").on("input", checkPhone);

  $("#email").on("input", checkEmail);
});
//Eventos personalizados del pixel de meta para el boton de mas informacion de cada plan
document.addEventListener("click", function (e) {
  if (e.target && e.target.getAttribute("data-event")) {
    var eventName = e.target.getAttribute("data-event");
    fbq("trackCustom", eventName);
  }
});
const alertPlaceholder = $("#liveAlertPlaceholder");
var timerCloseAlert;
// Enviar suscripcion a cotizacion
$("#quotation-form").on("submit", (e) => {
  console.log("hola");
  firstName = $("#firstName").val();
  lastName = $("#lastName").val();
  email = $("#email").val();
  phoneNumber = $("#phoneNumber").val();
  e.preventDefault();

  if (
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    phoneNumber === ""
  ) {
    alert(["Todos los campos son obligatorios"], "danger");
    timer = setTimeout(() => {
      $("#liveAlertPlaceholder").fadeOut(500, function () {
        $(this).empty().show();
      });
    }, 4000);
    return;
  }

  $.ajax({
    type: "POST",
    url: "https://hook.eu1.make.com/72rgi7pqorobhi0e1u5xe8lx8jfj271p",
    data: {
      userData: {
        firstName,
        lastName,
        email,
        phoneNumber,
      },
    },
    dataType: "json",
    success: (response) => {
      if (response.ok === true) {
        $(".register-form-container").addClass("d-none");
        $(".user-registered-container").removeClass("d-none");
        fbq("track", "CompleteRegistration");
        console.log("registered");
        return;
      } else {
        console.log(response.errors);
        alert(response.errors.toString(), "danger");
        timer = setTimeout(() => {
          $("#liveAlertPlaceholder").fadeOut(500, function () {
            $(this).empty().show();
          });
        }, 400000);
      }
    },
    error: (error) => {
      console.log("error: ", error);
    },
  });
});

const alert = (message, type) => {
  let icon;
  switch (type) {
    case "danger":
      icon = `<i class="fa-solid fa-xmark pe-2"></i>`;
      break;
    case "success":
      icon = `<i class="fa-solid fa-check pe-2"></i>`;
      break;
  }

  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type}  mb-2" role="alert" id="alert">`,
    `   <div class="m-auto w-100">${message}</div>`,

    "</div>",
  ].join("");

  // const wrapper =
  // `<div class="alert alert-${type} alert-dismissible mb-0" role="alert" id="alert">
  //     <div>${icon}
  //         <div>
  //             ${message.forEach(msg => {
  //                 return message
  //             })}
  //         </div>
  //     </div>
  //     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  // </div>`

  if ($("#liveAlertPlaceholder").is(":empty")) {
    alertPlaceholder.append(wrapper);
  } else {
    //If the event have been saved in less than 3 seconds, then the previous setTimeout will be deleted
    //so the new alert has its own 3 seconds.
    clearTimeout(timer);
    $("#liveAlertPlaceholder").empty();
    alertPlaceholder.append(wrapper);
  }
};
