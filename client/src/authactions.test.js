import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { signin, signup } from "./redux/actions/userAction";

const mock = new MockAdapter(axios);

describe("Auth API Tests", () => {
  const baseURL = process.env.REACT_APP_BACKEND_URL;

  it("should register a user successfully", async () => {
    const testUserData = { name: "Test User", email: "testuser@example.com", password: "Test@123" };
    mock.onPost(`${baseURL}/api/users/register`).reply(200, { message: "Account created Successfully" });

    const dispatch = jest.fn();
    const result = await signup(testUserData)(dispatch);
    expect(result).toBe(true);
    expect(dispatch).toHaveBeenCalledWith({
      type: "SUCCESS_DATA",
      payload: "Account created Successfully",
    });
  });

  it("should fail to register a user", async () => {
    mock.onPost(`${baseURL}/api/users/register`).reply(400, { message: "Error" });

    const dispatch = jest.fn();
    const result = await signup({ email: "invalid" })(dispatch);
    expect(result).toBe(false);
    expect(dispatch).toHaveBeenCalledWith({
      type: "SET_ALERT",
      payload: { message: { message: "Error" } },
    });
  });

  it("should login a user successfully", async () => {
    const loginData = { email: "testuser@example.com", password: "Test@123" };
    mock.onPost(`${baseURL}/api/users/login`).reply(200, {
      token: "test-token",
      role: "employee",
      _id: "12345",
    });

    const dispatch = jest.fn();
    const result = await signin(loginData)(dispatch);
    expect(result).toBe(true);
    expect(localStorage.getItem("auth_token")).toBe("test-token");
    expect(dispatch).toHaveBeenCalledWith({
      type: "SUCCESS_DATA",
      payload: "Login Success",
    });
  });

  it("should fail to login a user", async () => {
    mock.onPost(`${baseURL}/api/users/login`).reply(401, { message: "Invalid credentials" });

    const dispatch = jest.fn();
    const result = await signin({ email: "testuser@example.com", password: "wrong" })(dispatch);
    expect(result).toBe(false);
    expect(dispatch).toHaveBeenCalledWith({
      type: "SET_ALERT",
      payload: { message: { message: "Invalid credentials" } },
    });
  });
});
