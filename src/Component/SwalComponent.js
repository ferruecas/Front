import Swal from 'sweetalert2'

const showMessage = (title, text, severity) => {
    Swal.fire({
        title: title,
        text: text,
        icon: severity,        
        allowOutsideClick: false,
        confirmButtonColor: '#0d6efd',
        confirmButtonText: '<i class="fas fa-check-circle"></i> Aceptar',
    });
};

export { 

    showMessage
}