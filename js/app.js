// Ocultar boton al hacer scrooll
function hideButton() {
  if (document.body.scrollTop > 575 || document.documentElement.scrollTop > 575) {
    $('#telegram').slideDown(100);
    document.getElementById("telegram").removeAttribute("style");
    document.getElementById("telegram").setAttribute("style", "display: flex");
    document.getElementById("telegram").classList.add("entrar-derecha", "duracion-1s");

    $('#whatsapp').slideDown(100);
    document.getElementById("whatsapp").removeAttribute("style");
    document.getElementById("whatsapp").setAttribute("style", "display: flex");
    document.getElementById("whatsapp").classList.add("entrar-derecha", "duracion-2s");

    $('#subir').slideDown(100);
    document.getElementById("subir").removeAttribute("style");
    document.getElementById("subir").setAttribute("style", "display: flex");
    document.getElementById("subir").classList.add("entrar-derecha", "duracion-3s");
  } else {
    $('#telegram').slideUp(100);
    $('#whatsapp').slideUp(100);
    $('#subir').slideUp(100);
  }
}

window.onscroll = function () {
  hideButton();
  animar();
};


// Animando imagenes al hacer scroll
function datosAnimar(id, altura, clase1, clase2, clase3) {
  let elemento = document.getElementById(id);
  let alturaElemento = elemento.getBoundingClientRect().top;
  if (alturaElemento < altura) {
    elemento.classList.add(clase1, clase2, clase3);
  }
}

function animar() {
  datosAnimar("sobre-mi__img", 600, "entrar-derecha", "duracion-1s");
  datosAnimar("hechos-al-azar__img", 575, "entrar-izquierda", "duracion-1s");
  datosAnimar("mis-habilidades__content", 550, "entrar-izquierda", "duracion-1s");
  datosAnimar("portafolio__content", 525, "entrar-abajo", "duracion-1s");
  datosAnimar("form-content", 500, "entrar-derecha", "duracion-1s");
  datosAnimar("footer", 475, "entrar-abajo", "duracion-1s");
}

// Agregar desplazamiento suave a todos los links dependiendo del navegador
$("a").on('click', function (event) {
  if (window.navigator.vendor == 'Apple Computer, Inc.') {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {

        window.location.hash = hash;
      });
    }
  } else {
    $('html').css('scroll-behavior', 'smooth');
  }
});

// CHART
// Variables
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'bar',

  // The data for our dataset
  data: {
    labels: ['HTML/CSS', 'JavaScript', 'Bootstrap', 'TypeScript', 'Angular'],
    datasets: [{
      label: '',
      data: [75, 70, 80, 60, 55],
      backgroundColor: [
        'rgba(255, 80, 0, 0.7)',
        'rgba(255, 221, 0, 0.7)',
        'rgba(67, 0, 152, 0.7)',
        'rgba(0, 129, 201, 0.7)',
        'rgba(246, 50, 62, 0.7)',
      ]
    }]
  },

  // Configuration options go here
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    }
  }
});

// Código que genera el token a partir de la llave publica
grecaptcha.ready(function () {
  grecaptcha.execute('6LdKOfUUAAAAANfq7RUMmCjszDDO5Rf6dXHyt3eR', {
    action: 'homepage'
  }).then(function (token) {
    $('#google-response-token').val(token);
  });
});

// Código de validación de bootstrap con modificaciones para comunicar con server.php
(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();

        var $form = '';
        var $name = '';
        var $surname = '';
        var $email = '';
        var $message = ''
        var $policy = '';
        var $token = '';

        if (form.checkValidity() === false) {
          event.stopPropagation();
        } else {
          $form = document.getElementById('form');
          $name = document.getElementById('name').value;
          $surname = document.getElementById('surname').value;
          $email = document.getElementById('email').value;
          $message = document.getElementById('message').value;
          $policy = document.getElementById('policy').value;
          $token = document.getElementById('google-response-token').value;

          $.post("php/server.php", {
              name: $name,
              surname: $surname,
              email: $email,
              message: $message,
              policy: $policy,
              token: $token
            },
            function (data, textStatus, jqXHR) {
              let $res = jqXHR.responseText;

              if ($res == 'success') {
                $('#alert').prepend('<strong>¡Excelente</strong>, el mensaje se envió correctamente!').addClass('alert-success').addClass('show');
                $('button[type=submit]').prop('disabled', true);
              } else {
                $('#alert').prepend('<strong>¡Ups!</strong> ha ocurrido un error.').addClass('alert-warning').addClass('show');
                $('button[type=submit]').prop('disabled', true);
              }
            },
            "html"
          ).done(function () {
            // code...
          }).fail(function () {
            //code...
          }).always(function () {
            // code...
          });
        } // Fin del else
        form.classList.add('was-validated');
      }, false);
    });

    // Funcion que limpia el formulario
    $('.close').click(function () {
      form.classList.remove('was-validated')
      form.reset();
      location.reload();
    });

  }, false);
})();

// Opacity cards
let cards = document.getElementById("cards");

for (let i = 0; i < cards.children.length; i++) {
  cards.children[i].addEventListener("mouseover", function () {
    switch (i) {
      case 0:
        cards.children[0].firstElementChild.classList.remove("card__opacity");
        cards.children[1].firstElementChild.classList.add("card__opacity");
        cards.children[2].firstElementChild.classList.add("card__opacity");
        break;
      case 1:
        cards.children[1].firstElementChild.classList.remove("card__opacity");
        cards.children[0].firstElementChild.classList.add("card__opacity");
        cards.children[2].firstElementChild.classList.add("card__opacity");
        break;
      case 2:
        cards.children[2].firstElementChild.classList.remove("card__opacity");
        cards.children[0].firstElementChild.classList.add("card__opacity");
        cards.children[1].firstElementChild.classList.add("card__opacity");
        break;
      default:
        cards.children[0].firstElementChild.classList.remove("card__opacity");
        cards.children[1].firstElementChild.classList.remove("card__opacity");
        cards.children[2].firstElementChild.classList.remove("card__opacity");
        break;
    }
  });

  cards.children[i].addEventListener("mouseout", function () {
    cards.children[0].firstElementChild.classList.remove("card__opacity");
    cards.children[1].firstElementChild.classList.remove("card__opacity");
    cards.children[2].firstElementChild.classList.remove("card__opacity");
  });

  cards.children[i].addEventListener("focusin", function () {
    switch (i) {
      case 0:
        cards.children[0].firstElementChild.classList.remove("card__opacity");
        cards.children[1].firstElementChild.classList.add("card__opacity");
        cards.children[2].firstElementChild.classList.add("card__opacity");
        break;
      case 1:
        cards.children[1].firstElementChild.classList.remove("card__opacity");
        cards.children[0].firstElementChild.classList.add("card__opacity");
        cards.children[2].firstElementChild.classList.add("card__opacity");
        break;
      case 2:
        cards.children[2].firstElementChild.classList.remove("card__opacity");
        cards.children[0].firstElementChild.classList.add("card__opacity");
        cards.children[1].firstElementChild.classList.add("card__opacity");
        break;
      default:
        cards.children[0].firstElementChild.classList.remove("card__opacity");
        cards.children[1].firstElementChild.classList.remove("card__opacity");
        cards.children[2].firstElementChild.classList.remove("card__opacity");
        break;
    }
  });

  cards.children[i].addEventListener("focusout", function () {
    cards.children[0].firstElementChild.classList.remove("card__opacity");
    cards.children[1].firstElementChild.classList.remove("card__opacity");
    cards.children[2].firstElementChild.classList.remove("card__opacity");
  });
}