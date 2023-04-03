import axios from "axios";
import { expenseActions } from "./expense-slice";
import { modalActions } from "./modal-slice";

export const getData = () => {
  return async (dispatch) => {
    let email = localStorage.getItem("email");
    if (email) {
      email = email.replace("@", "").replace(".", "");
      let URL = `https://expense-tracker-2ef4f-default-rtdb.firebaseio.com/expense/${email}.json`;

      try {
        const res = await axios(URL);

        if (res.data) {
          dispatch(expenseActions.replaceExpense(res.data));
        }
      } catch (error) {
        dispatch(
          modalActions.popUpAlertHandler({
            message: "Fetching data failed!",
            severity: "error",
          })
        );
      }
    }
  };
};

export const putData = (expenses) => {
  return async (dispatch) => {
    let email = localStorage.getItem("email");

    if (email) {
      email = email.replace("@", "").replace(".", "");
      let URL = `https://expense-tracker-2ef4f-default-rtdb.firebaseio.com/expense/${email}.json`;

      try {
        await axios.put(URL, expenses);
        dispatch(
          modalActions.popUpAlertHandler({
            message: "Request sent successfully",
            severity: "success",
          })
        );
      } catch (error) {
        dispatch(
          modalActions.popUpAlertHandler({
            message: "Request sent failed!",
            severity: "error",
          })
        );
      }
    }
  };
};
