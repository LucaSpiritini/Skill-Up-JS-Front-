import Swal from "sweetalert2";

export default function Alert(title, text, type, actionText, cb) {
  const bgColor = "#707B7C ";
  const bcColor = "#9ca3af";
  // "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )";
  if (type !== "question") {
    Swal.fire({
      background: bgColor,
      color: "white",
      title: title,
      text: text,
      icon: type, //warning, error, success, info, question
      confirmButtonColor: bcColor,
    });
  } else {
    Swal.fire({
      background: bgColor,
      color: "white",
      title: title,
      text: text,
      icon: type,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor: "#881337",
      cancelButtonColor: bcColor,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        Swal.fire({
          background: bgColor,
          color: "white",
          title: "Success",
          text: actionText,
          icon: "success",
          confirmButtonColor: bcColor,
        });
        cb();
      }
    });
  }
}
