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

          // prueba
          console.log($form);
          console.log($name);
          console.log($surname);
          console.log($email);
          console.log($message);
          console.log($policy);
          console.log($token);

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