$(function () {

    $("#menu").css("display", "none");

    $("#menu-principal > span").on("click", function () {
        $("#menu").stop(true, true).slideToggle(300);
        console.log("menus");
    });

    $("img#cerrarMenu").on("click", function () {
        $("#menu").stop(true, true).slideToggle(300);
    });
});
$(function () {
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 0) {
            $('header').addClass('fijado');
            $('#anuncio').hide();
        } else {
            $('header').removeClass('fijado');
            $('#anuncio').show();
        }
    });
});
$(function () {
    //Mostrar siempre al cargar index
    $('#fondo-opaco, #aviso-cookies').fadeIn();

    //Aceptar cookies Cierra la ventana
    $('#aceptar-cookies').on('click', function () {
        localStorage.setItem('cookiesAceptadas', 'true');
        $('#fondo-opaco, #aviso-cookies').fadeOut();
    });

    //Rechazar cookies Cierra la ventana
    $('#rechazar-cookies').on('click', function () {
        localStorage.setItem('cookiesAceptadas', 'false');
        $('#fondo-opaco, #aviso-cookies').fadeOut();
    });

    //Cierra la ventana
    $('#cerrar-cookies').on('click', function () {
        $('#fondo-opaco, #aviso-cookies').fadeOut();
    });
});

//  Sumar productos en el carrtio
$(function () {
    // Precio fijo por producto lo uso para poder hacer el simulacro
    const precioUnitario = 56.00;
    const precioEnvio = 4.95;

    function formatearPrecio(num) {
        return num.toFixed(2).replace('.', ',') + '€';
    }

    function actualizarTotales(cantidad) {
        $('article.resumen-carrito .linea span:first-child').first().text(`Productos (${cantidad})`);

        //Calculamos el total de los productos pro l acantidad
        let precioProductos = cantidad * precioUnitario;
        $('#precioProductos').text(formatearPrecio(precioProductos));
        $('#precioSubtotal').text(formatearPrecio(precioProductos));

        //Calculamos el Total =>  subtotal + envío
        let total = precioProductos + precioEnvio;
        $('#precioTotal').text(formatearPrecio(total));
    }
    $('.producto-cantidad').on('click', '.boton-cantidad', function () {
        let valor = parseInt($(this).siblings('.cantidad-input').val());

        if ($(this).text() === '+') {
            valor += 1;
        } else if ($(this).text() === '-') {
            if (valor > 1) {
                valor -= 1;
            }
        }

        $(this).siblings('.cantidad-input').val(valor);
        //Se debe actualizar la cantidad cada vez que se añade o se quita un producto
        actualizarTotales(valor);
    });
    actualizarTotales(parseInt($('.cantidad-input').val()));
    $('.producto-cantidad').on('click', '.boton-eliminar', function () {
        //eliminar el producto para simular la basura
        $(this).closest('.producto-carrito').remove();

        const cantidad = 0;
        const precioProductos = 0;
        const subtotal = 0;
        const total = precioEnvio;

        $('article.resumen-carrito .linea span:first-child').first().text(`Productos (${cantidad})`);
        $('#precioProductos').text(formatearPrecio(precioProductos));
        $('#precioSubtotal').text(formatearPrecio(subtotal));
        $('#precioTotal').text(formatearPrecio(total));
    });
});

//Slider index
$(function () {

    var SliderModule = (function () {
        var pb = {};
        pb.elslider = $('#slider');

        pb.items = {
            panels: pb.elslider.find('.slider-wrapper > li'),
        };

        var SliderInterval,
            currentSlider = 0,
            nextSlider = 1,
            lengthSlider = pb.items.panels.length;

        pb.init = function (settings) {
            var loscontroles = '';
            this.settings = settings || { duration: 3000 };
            SliderInit();

            for (var i = 0; i < lengthSlider; i++) {
                loscontroles += (i == 0) ? '<li class="active"></li>' : '<li></li>';
            }

            $('#control-buttons').html(loscontroles);

            $('#control-buttons li').on("click", function () {
                if (currentSlider !== $(this).index()) {
                    cambiarPanel($(this).index());
                }
            });

            pb.items.panels.on('mouseenter', function () {
                clearInterval(SliderInterval);
            });

            pb.items.panels.on('mouseleave', function () {
                SliderInit();
            });

            $('#slider-prev').on('click', function () {
                var nueva = currentSlider - 1;
                if (nueva < 0) nueva = lengthSlider - 1;
                cambiarPanel(nueva);
            });

            $('#slider-next').on('click', function () {
                var nueva = currentSlider + 1;
                if (nueva >= lengthSlider) nueva = 0;
                cambiarPanel(nueva);
            });

            // Mostrar la miniatura previa cuando el ratón entra en el control
            $("#control-buttons li").on("mouseenter", function () {
                var index = $(this).index();
                var imgSrc = pb.items.panels.eq(index).find("img").attr("src");
                $("#containerImgPrev > img").attr("src", imgSrc);
                $("#containerImgPrev").show();
            });

            // Ocultar la miniatura cuando el ratón sale del control
            $("#control-buttons li").on("mouseleave", function () {
                $("#containerImgPrev").hide();
            });
        };

        var SliderInit = function () {
            SliderInterval = setInterval(pb.startSlider, pb.settings.duration); // Usamos la duración definida en settings
        };

        pb.startSlider = function () {
            var paneles = pb.items.panels;
            var controles = $('#control-buttons li');

            if (nextSlider >= lengthSlider) {
                nextSlider = 0;
                currentSlider = lengthSlider - 1;
            }

            controles.removeClass('active');
            controles.eq(nextSlider).addClass('active');
            paneles.eq(currentSlider).fadeOut('slow');
            paneles.eq(nextSlider).fadeIn('slow');

            currentSlider = nextSlider;
            nextSlider += 1;
        };

        var cambiarPanel = function (indice) {
            clearInterval(SliderInterval);

            var paneles = pb.items.panels;
            var controles = $('#control-buttons li');

            if (indice >= lengthSlider) {
                indice = 0;
            } else if (indice < 0) {
                indice = lengthSlider - 1;
            }

            controles.removeClass('active');
            controles.eq(indice).addClass('active');
            paneles.eq(currentSlider).fadeOut('slow');
            paneles.eq(indice).fadeIn('slow');

            currentSlider = indice;
            nextSlider = indice + 1;

            SliderInit();
        };

        return pb;
    }());

    SliderModule.init({ duration: 10000 });
});

$(function () {
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    function mostrarError($campo, mensaje) {
        let yaExiste = false;
        $campo.nextAll('.error-msg').each(function () {
            if ($(this).text() === mensaje) yaExiste = true;
        });
        if (!yaExiste) {
            $campo.after('<div class="error-msg" style="color:red; font-size:0.9em; margin-top:2px;">' + mensaje + '</div>');
        }
    }

    function eliminarError($campo, mensaje) {
        $campo.nextAll('.error-msg').each(function () {
            if ($(this).text() === mensaje) $(this).remove();
        });
    }

    $('input[required], textarea[required]').on('blur', function () {
        const $campo = $(this);
        const valor = $campo.val().trim();
        const mensajeVacio = "Este campo es obligatorio y no puede estar vacío.";

        if (valor.length === 0) {
            mostrarError($campo, mensajeVacio);
        } else {
            eliminarError($campo, mensajeVacio);
        }
    });

    // Validación nombre con regex
    $('#nombre').on('blur', function () {
        const $campo = $(this);
        const valor = $campo.val().trim();
        const mensajeValido = "Solo se permiten letras y espacios (tildes permitidas).";

        if (valor.length > 0 && !regexNombre.test(valor)) {
            mostrarError($campo, mensajeValido);
        } else {
            eliminarError($campo, mensajeValido);
        }
    });

    // Validación email con regex
    $('#email').on('blur', function () {
        const $campo = $(this);
        const valor = $campo.val().trim();
        const mensajeEmail = "El formato de correo electrónico no es válido. Ejemplo: ejemplo@dominio.com";

        if (valor.length > 0 && !regexEmail.test(valor)) {
            mostrarError($campo, mensajeEmail);
        } else {
            eliminarError($campo, mensajeEmail);
        }
    });

    // Control del textarea mensaje: límite 100 caracteres, mostrar contador
    $('#mensaje').attr('maxlength', 100); // Limitar caracteres

    // Añadir un contenedor para mostrar los caracteres restantes
    $('#mensaje').after('<div id="contador-mensaje" style="font-size:0.9em; color:var(--gris); margin-top:4px;"></div>');

    $('#mensaje').on('input', function () {
        const max = 100;
        const escrito = $(this).val().length;
        const restantes = max - escrito;
        // Mostrar mensaje de caracteres restantes o escritos
        if (restantes > 0) {
            $('#contador-mensaje').text(`Dispone de ${restantes} caracteres.`);
        } else {
            $('#contador-mensaje').text(`Ha escrito ${escrito} caracteres de ${max}.`);
        }
    });

});

$(function () {
    $('#slider-prev, #slider-next').on('mouseenter', function () {
        $(this).css('filter', 'brightness(1.5)');
    }).on('mouseleave', function () {
        $(this).css('filter', 'brightness(0) invert(1)');
    });
});

//Al posicionarse el ratón sobre un articulo este se opaca y aparece el titulo solo en v.escritorio 
$(function () {

    function aplicarEventos() {
        $("article.item > a").css("display", "none");

        $('article.item').on('mouseenter', function () {
            $(this).css("opacity", "0.6");
            $(this).find('a.producto').css("display", "block");
        });

        $('article.item').on('mouseleave', function () {
            $(this).css("opacity", "1");
            $(this).find('a.producto').css("display", "none");
        });
    }

    if (window.matchMedia("(min-width: 1024px)").matches) {
        aplicarEventos();
    }

    //Si esta version escritorio o no?
    window.matchMedia("(min-width: 1024px)").addEventListener("change", function (e) {
        if (e.matches) {
            aplicarEventos();
        } else {

            $('article.item').off('mouseenter mouseleave');
            $("article.item > a").css("display", "");
            $("article.item").css("opacity", "1");
        }
    });
});

/*Al posicionarse el ratón sobre un articulo este se opaca y aparece el titulo
$(function () {
    $("article.item > a").css("display", "none");

    $('article.item').on('mouseenter', function () {
      $(this).css("opacity", "0.6");
      $(this).find('a.producto').css("display", "block");
    });
  
    $('article.item').on('mouseleave', function () {
      $(this).css("opacity", "1");
      $(this).find('a.producto').css("display", "none");
    });
  });
*/

//Efecto boton azul
$(function () {
    $("button.btn-azul")
        .on('mouseenter', function () {
            $(this).css({
                "background-color": "#ffffff",
                "color": "var(--azul)"
            });
        })
        .on('mouseleave', function () {
            $(this).css({
                "background-color": "var(--azul)",
                "color": "var(--blanco)"
            });
        });
});
//Gestionamos el boton añadir producto
$(function () {
    let contadorCarrito = 0;
    //cambio color
    $("button.btn-azulPq")
        .on('mouseenter', function () {
            $(this).css({
                "background-color": "#ffffff",
                "color": "#9AE5F6",
            });
        })
        .on('mouseleave', function () {
            $(this).css({
                "background-color": "var(--azul)",
                "color": "var(--blanco)"
            });
        })
        //notificacion banner añadido a carrito
        .on('click', function () {
            var $noti = $('div.notificacion');
            var $boton = $(this);

            $noti.css({
                display: 'block',
                left: '100%'
            }).animate({ left: '50%' }, 1000);

            setTimeout(function () {
                $noti.animate({ left: '50%' }, 500, function () {
                    $noti.hide();
                });
            }, 5000);

            // Actualiza el carrito
            contadorCarrito++;
            setTimeout(function () {
                $("#contador").text(`( ${contadorCarrito} )`);

                $boton.css({
                    "background-color": "var(--azul)",
                    "color": "var(--blanco)"
                });
            }, 1000);
        });
});

//Animar anuncio
$(function () {
    function animarAnuncio() {
        $('#anuncio a').css({ left: $('#anuncio').width() });
        $('#anuncio a').animate({ left: '-50%' }, 30000, animarAnuncio).finish;
    }
    animarAnuncio();
    //parar con el raton
    $('#anuncio a').hover(
        function () { $(this).stop(); },
        function () { animarAnuncio(); }
    );
});

$(function () {
    $("button.btn-rosa")
        .on('mouseenter', function () {
            $(this).css({
                "background-color": "#ffffff",
                "color": "var(--rosa)",

            });
        })
        .on('mouseleave', function () {
            $(this).css({
                "background-color": "var(--rosa)",
                "color": "var(--blanco)"
            });
        });
});

//Cuando selecciona un color se marca el borde
$(function () {
    $('.vista-colores img').on('click', function () {
        $('.vista-colores img').removeClass('seleccionado');
        $(this).addClass('seleccionado');
    });
});


/*boton que camboa de ventana*/
$(function () {
    $("#btn-comprar").on("click", function () {
        window.location.href = "tramitacion.html";
    });
});
$(function () {
    $("#btn-pagar").on("click", function () {
        window.location.href = "pago.html";
    });
});
$(function () {
    $('form.formulario').on('submit', function (e) {
        e.preventDefault();
        console.log('Submit formulario contacto');
        //Validar formulario que se clicko submit
        const $form = $(this);

        $form.find('input[required], textarea[required]').each(function () {
            $(this).removeClass('input-error');
            $(this).next('.error-msg').remove().finish();
        });
        $('#success-message').hide();
        $('#error-message').hide();

        let isValid = true;
        $form.find('input[required], textarea[required]').each(function () {
            if ($(this).val().trim() === '') {
                isValid = false;
                $(this).addClass('input-error');
                if ($(this).next('.error-msg').length === 0) {
                    $(this).after('<div class="error-msg" style="color:red; font-size: 0.9em;">Este campo es obligatorio y no puede estar vacío.</div>');
                }
            }
        });

        if (isValid) {
            $('#success-message').show();
        } else {
            $('#success-message').show();
            setTimeout(function () {
                $('#success-message').hide();
            }, 200);
        }

        $form[0].reset();
    });
});

$(function () {
    // Para el formulario de newsletter, que tiene clase footer-form
    $('form.footer-form').on('submit', function (e) {
        e.preventDefault();
        console.log('Submit formulario suscripcion');
        const $form = $(this);
        const $input = $form.find('input[name="newsletter"]');
        const value = $input.val().trim();

        let isValid = value !== '';
        if (isValid) {
            $('.subscrito-newsletter').show().finish();
        } else {
            $('.subscrito-newsletter').show().finish();
            setTimeout(function () {
                $('.subscrito-newsletter').hide();
            }, 200);
        }

        $form[0].reset();
    });
});
/*JS PARA REPRODUCTOR DE VIDEO*/
var video = document.getElementById('video');
var barraTiempo = document.getElementById('barraTiempo');
var tiempo = document.getElementById('tiempoActual');
var tiempoTotal = document.getElementById('tiempoTotal');
var btnPlay = document.getElementById('btnPlay');
var reproducir = document.getElementById('reproducir');
var parar = document.getElementById('parar');
var restart = document.getElementById('restart');
var volume = document.getElementById('volume');
var mute = document.getElementById('mute');
var btnMute = document.getElementById('btnMute');

var atras = document.getElementById('atras');
var adelante = document.getElementById('adelante');

var lento = document.getElementById('lento');
var rapido = document.getElementById('rapido');

var fullscreen = document.getElementById('fullscreen');
var isPaused = true;


var fullscreen = document.getElementById('fullscreen');
var isPaused = true;

function calcularTiempo(time) {
    var segundos = time;
    var minutos = Math.floor(segundos / 60);
    segundos -= minutos * 60;

    segundos = Math.round(segundos);
    segundos = segundos < 10 ? "0" + segundos : segundos;

    return minutos + ":" + segundos;
}

function reproducirPausar() {
    if (video.currentTime === video.duration)
        video.currentTime = 0;

    tiempo.innerHTML = "0:00/" + calcularTiempo(video.duration);
    if (isPaused) {
        video.play();
        btnPlay.classList.remove("fa-play");
        btnPlay.classList.add("fa-pause");
    } else {
        video.pause();
        btnPlay.classList.remove("fa-pause");
        btnPlay.classList.add("fa-play");
    }

    isPaused = !isPaused;
}

video.ontimeupdate = function (ev) {
    if (video.currentTime === video.duration) {
        btnPlay.classList.remove("fa-pause");
        btnPlay.classList.add("fa-play");
        isPaused = true;
    } else {

        tiempo.innerHTML = calcularTiempo(video.currentTime);
        barraTiempo.value = video.currentTime / video.duration * 100;
        tiempoTotal.innerHTML = calcularTiempo(video.duration - video.currentTime)
    }
};

video.onclick = function (ev) {
    reproducirPausar();
};

barraTiempo.onchange = function (ev) {
    video.currentTime = barraTiempo.value * video.duration / 100;
};

reproducir.onclick = function (ev) {
    reproducirPausar();
};

parar.onclick = function (ev) {
    video.pause();
    video.currentTime = 0;
    btnPlay.classList.remove("fa-pause");
    btnPlay.classList.add("fa-play");
    isPaused = true;
};

restart.onclick = function (ev) {
    video.currentTime = 0;
    video.play();
    btnPlay.classList.remove("fa-play");
    btnPlay.classList.add("fa-pause");
    isPaused = false;
};

volume.onchange = function (ev) {
    video.volume = volume.value;
};

mute.onclick = function (ev) {
    if (video.muted) {
        video.muted = false;
        btnMute.classList.remove("fa-volume-off");
        btnMute.classList.add("fa-deaf");
    } else {
        video.muted = true;
        btnMute.classList.remove("fa-deaf");
        btnMute.classList.add("fa-volume-off");
    }
};


atras.onclick = function (ev) {
    video.currentTime -= 5;
};

adelante.onclick = function (ev) {
    video.currentTime += 5;
};

lento.onclick = function (ev) {
    if (video.playbackRate > 0.5)
        video.playbackRate -= 0.1;
};

rapido.onclick = function (ev) {
    if (video.playbackRate < 2)
        video.playbackRate += 0.1;
};


fullscreen.onclick = function (ev) {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
};
