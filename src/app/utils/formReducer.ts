export type FormState = {
  values: {
    fname: string;
    lname: string;
    email: string;
    phone: string;
    service: string;
    message: string;
  };
  status: "enviar" | "enviando..." | "enviado";
  messageLength: number;
};

export type FormAction =
  | { type: "SET_VALUE"; name: string; value: string }
  | { type: "SET_STATUS"; status: FormState["status"] };

export const formReducer = (
  state: FormState,
  action: FormAction
): FormState => {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        values: {
          ...state.values,
          [action.name]: action.value,
        },
      };
    case "SET_STATUS":
      return {
        ...state,
        status: action.status,
      };
    default:
      return state;
  }
};

export const initialState: FormState = {
  values: {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  },
  status: "enviar",
  messageLength: 0,
};