var disabledButtons = document.getElementsByClassName("header-botones-texto");
disabledButtons[0].className = "header-botones-texto-activo";

var enabledButton = document.getElementsByClassName("header-botones-texto-activo");

function headerdisabledButtonsetActive(enableButton) {
    enabledButton[0].className = "header-botones-texto";
    enableButton.className = "header-botones-texto-activo";
}
var mMFixer = document.getElementById("fixer");
var mobileMenu = document.getElementById("mobile-menu");
var mobileMenuEnabled = false;
function enableAndroidMenu() {
    if (!mobileMenuEnabled) {
        mobileMenu.style.visibility = "visible";
        mMFixer.style.visibility = "visible";
        mobileMenuEnabled = true;
    }
    else {
        mobileMenu.style.visibility = "hidden";
        mMFixer.style.visibility = "hidden"; 
        mobileMenuEnabled = false;
    }
}

var habilidadesScroll = document.querySelectorAll('.habilidad-cuadro-exterior');
var proyectosScroll = document.querySelectorAll('.project-container')
var certificadoScroll = document.querySelectorAll('.certificado-container')
ScrollReveal().reveal(habilidadesScroll);
ScrollReveal().reveal(proyectosScroll);
ScrollReveal().reveal(certificadoScroll);
ScrollReveal().reveal('.habilidades-image');
ScrollReveal().reveal('.section-title')
