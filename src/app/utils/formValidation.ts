import { toast } from "react-toastify";

type FormValues = {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  message: string;
};

export const isValid = (values: FormValues): boolean => {
  // Validate First Name & Last Name
  if (values.fname.length < 2 || values.lname.length < 2) {
    toast.error("Nombre y Apellido deben tener más de 1 letra");
    return false;
  }

  // Validate Email
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(values.email)) {
    toast.error("Por favor ingresa un correo valido");
    return false;
  }

  // Validate message
  if (values.message.length < 10) {
    toast.error("El mensaje debe de tener más de 10 letras");
    return false;
  }

  // Add more validations as needed...

  return true;
};
