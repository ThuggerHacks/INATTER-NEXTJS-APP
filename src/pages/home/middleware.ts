import Router from "next/router";
import { adminList } from "../../utils/admin";

export const adminMiddleware = (email: any) => {
  let isAdmin: any = false;
  adminList.map((resp: any) => {
    if (resp == email) {
      isAdmin = true;
    }
  });

  if (isAdmin == false) {
    return Router.push("/");
  }
};
