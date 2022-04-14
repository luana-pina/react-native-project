import { IBodyLogin, IBodyRegister } from "../../interfaces/";
import instance from "../axios.config";

const auth = () => {
  async function changePassword(token: string, body: { password: string }) {
    return instance.post(`/reset/${token}`, body);
  }
  async function login(body: IBodyLogin) {
    return instance.post("/login", body);
  }
  async function registerUser(body: IBodyRegister) {
    return instance.post("/user/create", body);
  }
  async function resetPassword(body: { email: string }) {
    return instance.post("/reset", body);
  }
  return { changePassword, login, registerUser, resetPassword };
};

export default auth;
