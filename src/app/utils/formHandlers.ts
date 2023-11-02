import { toast } from "react-toastify";
import { FormState, FormAction } from "./formReducer";
import { isValid } from "./formValidation";

type HandlersReturn = {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    dispatch: React.Dispatch<FormAction>,
    state: FormState
  ) => Promise<void>;
};

export const useHandlers = (
  initialState: FormState,
  dispatch: React.Dispatch<FormAction>
): HandlersReturn => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;
    // ... any other logic specific to handleChange
    dispatch({ type: "SET_VALUE", name, value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    dispatch: React.Dispatch<FormAction>,
    state: FormState
  ) => {
    e.preventDefault();

    if (!isValid(state.values)) return;

    dispatch({ type: "SET_STATUS", status: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.values),
      });

      if (response.ok) {
        toast.success("Message Sent!");
        dispatch({ type: "SET_STATUS", status: "sent" });
      } else {
        const data = await response.json();
        toast.error("Error While Sending :(", data);
        dispatch({ type: "SET_STATUS", status: "send" });
      }
    } catch (error) {
      console.error("Error while sending form", error);
      toast.error("Error while sending form");
    }
  };

  return { handleChange, handleSubmit };
};
