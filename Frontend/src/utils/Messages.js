import { message } from "antd";

const succesPost = () => {
    message.success('POST 200: (Success Request)');
};

const succesLogin = (username) => {
    message.success(`Sign In with username: ${username}`);
};

const succesPut = () => {
    message.success('PUT 200: (Success Request)');
};

const succesDelete = () => {
    message.success('DELETE 200: (Success Request)');
};

const error = (err) => {
    message.error(err);
};

const loginError = () => {
    message.error("Incorrect Username or Password!!!");
};
const signUpError = () => {
    message.error("Something is wrong");
};

const cancel = (err) => {
    message.info("Cancel");
};

export { succesPost, succesLogin, succesPut, succesDelete, error, cancel , loginError , signUpError };