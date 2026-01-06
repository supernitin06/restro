import Swal from 'sweetalert2';

export const showSuccessAlert = (message) => {
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
        confirmButtonText: 'OK',
        confirmButtonColor: '#10B981',
    });
};

export const showErrorAlert = (message) => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonText: 'OK',
        confirmButtonColor: '#EF4444',
    });
};

export const showInfoAlert = (message) => {
    Swal.fire({
        icon: 'info',
        title: 'Info',
        text: message,
        confirmButtonText: 'OK',
        confirmButtonColor: '#3B82F6',
    });
};

export const showWarningAlert = (message) => {
    Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: message,
        confirmButtonText: 'OK',
        confirmButtonColor: '#F59E0B',
    });
};

export const showConfirmAlert = (message, confirmText = 'Yes', cancelText = 'No') => {
    return Swal.fire({
        icon: 'question',
        title: 'Confirm',
        text: message,
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        confirmButtonColor: '#10B981',
        cancelButtonColor: '#6B7280',
    });
};