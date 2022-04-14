import instance from "../axios.config";

const user = () => {
  async function updateUser(body: { name?: string; email?: string }) {
    return instance.put(`/user/update`, body);
  }
  async function getAccount() {
    return instance.get("/user/my-account");
  }
  return { updateUser, getAccount };
};

export default user;
