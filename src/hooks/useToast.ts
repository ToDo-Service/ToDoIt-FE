import Swal from "sweetalert2";

export const useToast = (message: string, isSucess: boolean) => {
  console.log(message);

  const ToastMessage = Swal.mixin({
    toast: true,
    position: "center-end",
    showCancelButton: false,
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
    width: "320px",
  });

  if (isSucess) {
    return ToastMessage.fire({
      icon: "success",
      title: `${message}`,
    });
  } else {
    return ToastMessage.fire({
      icon: "warning",
      title: `실패하였습니다.`,
    });
  }
};
