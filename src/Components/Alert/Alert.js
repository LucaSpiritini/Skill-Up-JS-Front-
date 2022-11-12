import Swal from "sweetalert2";

export default function Alert(title, text, type) {
  if (type !== "question") {
    Swal.fire({
      background:
        "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
      color: "white",
      title: title,
      text: text,
      icon: type, //warning, error, success, info, question
    });
  } else {
    Swal.fire({
      background:
        "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
      color: "white",
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        // dispatch();

        Swal.fire({
          background:
            "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
          color: "white",
          title: "",
          text: "",
          icon: "success",
        });
        // navigateTo("/");
      }
    });
  }
}
