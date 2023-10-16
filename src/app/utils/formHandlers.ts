import { toast } from "react-toastify";
import { FormState, FormAction } from "./formReducer";
import { isValid } from './formValidation';

type HandlersReturn = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, dispatch: React.Dispatch<FormAction>, state: FormState) => Promise<void>;
};

export const useHandlers = (initialState: FormState): HandlersReturn => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // ... any other logic specific to handleChange
    return { type: "SET_VALUE", name, value };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, dispatch: React.Dispatch<FormAction>, state: FormState) => {
    e.preventDefault();

    if (!isValid(state.values)) return;

    dispatch({ type: "SET_STATUS", status: "enviando..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.values),
      });

      if (response.ok) {
        toast.success("Mensaje Enviado!");
        dispatch({ type: "SET_STATUS", status: "enviado" });
      } else {
        const data = await response.json();
        toast.error("Error al enviar", data);
        dispatch({ type: "SET_STATUS", status: "enviar" });
      }
    } catch (error) {
      console.error("Error while sending form", error);
      toast.error("Error while sending form");
    }
  };

  return { handleChange, handleSubmit };
};
