$(function () {
    // Menú Toggle (Mostrar/Ocultar)
    $("#menu").css("display", "none");

    $("#menu-principal > span").on("click", function () {
        $("#menu").stop(true, true).slideToggle(300); // Usamos stop(true, true) para evitar acumulación de animaciones
        console.log("menus");
    });

    // Cerrar el menú
    $("img#cerrarMenu").on("click", function () {
        $("#menu").stop(true, true).slideToggle(300); // Usamos stop(true, true) aquí también
    });
});

$(function () {
    // Slider Module
    var SliderModule = (function () {
        var pb = {};
        pb.elslider = $('#slider');

        pb.items = {
            panels: pb.elslider.find('.slider-wrapper > li'), // Seleccionamos todos los elementos li
        };

        var SliderInterval,
            currentSlider = 0,
            nextSlider = 1,
            lengthSlider = pb.items.panels.length;

        pb.init = function (settings) {
            var loscontroles = '';
            this.settings = settings || { duration: 3000 }; // Duración predeterminada 3000ms
            SliderInit();

            // Crear controles del slider
            for (var i = 0; i < lengthSlider; i++) {
                loscontroles += (i == 0) ? '<li class="active"></li>' : '<li></li>';
            }

            $('#control-buttons').html(loscontroles);

            // Evento para cambiar el panel al hacer clic en los controles
            $('#control-buttons li').on("click", function () {
                if (currentSlider !== $(this).index()) {
                    cambiarPanel($(this).index());
                }
            });

            // Detener el slider cuando el ratón entra en la imagen
            pb.items.panels.on('mouseenter', function () {
                clearInterval(SliderInterval);
            });

            // Reiniciar el slider cuando el ratón sale de la imagen
            pb.items.panels.on('mouseleave', function () {
                SliderInit();
            });

            // Botones de flecha del slider
            $('#slider-prev').on('click', function () {
                var nueva = currentSlider - 1;
                if (nueva < 0) nueva = lengthSlider - 1; // Retroceder a la última imagen si estamos en la primera
                cambiarPanel(nueva);
            });

            $('#slider-next').on('click', function () {
                var nueva = currentSlider + 1;
                if (nueva >= lengthSlider) nueva = 0; // Avanzar a la primera imagen si estamos en la última
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

            SliderInit(); // Reiniciamos el intervalo al cambiar de panel
        };

        return pb;
    }());

    SliderModule.init({ duration: 10000 }); // Duración de 10000ms
});

$(function () {
    // Efecto de brillo para los botones de flecha del slider
    $('#slider-prev, #slider-next').on('mouseenter', function () {
        $(this).css('filter', 'brightness(1.5)'); // Aumentar el brillo
    }).on('mouseleave', function () {
        $(this).css('filter', 'brightness(0) invert(1)'); // Restaurar el brillo original
    });
});

/*Al posicionarse el ratón sobre un articulo este se opaca y aparece el titulo*/
$(function () {
    // Al inicio, ocultamos los enlaces
    $("article.item > a").css("display", "none");
  
    // Cuando el ratón entra en el artículo
    $('article.item').on('mouseenter', function () {
      $(this).css("opacity", "0.6"); // Disminuimos la opacidad del artículo
      $(this).find('a.producto').css("display", "block"); // Mostramos el enlace
    });
  
    // Cuando el ratón sale del artículo
    $('article.item').on('mouseleave', function () {
      $(this).css("opacity", "1"); // Restauramos la opacidad del artículo
      $(this).find('a.producto').css("display", "none"); // Ocultamos el enlace
    });
  });

$(function() {
    $("button#btn-subscrib")
        .on('mouseenter', function() {
            $(this).css({
                "background-color": "#ffffff",
                "color": "#9AE5F6"
            });
        })
        .on('mouseleave', function() {
            $(this).css({
                "background-color": "var(--azul)", 
                "color": "var(--blanco)"
            });
        });
});
$(function() {

$("span.error-newsletter").css('display', 'none');
$("span.error-newsletter").on("change", function() {
            /*aqui hay que implementar una logica 
            para que el span se muestre cuando el mail esta*/     
    });
});
/*boton que camboa de ventana*/
$(function() {
  $("#btn-comprar").on("click", function() {
    window.location.href = "tramitacion.html";
  });
});
$(function() {
  $("#btn-pagar").on("click", function() {
    window.location.href = "pago.html";
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
