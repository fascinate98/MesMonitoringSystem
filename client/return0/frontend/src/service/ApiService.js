import axios from "axios";
import { API_BASE_URL } from "../app-config"; //  서버 설정할 때 하면 될 듯
import Swal from "sweetalert2";

const ACCESS_TOKEN = "ACCESS_TOKEN";
export function call(api, request, method) {
  // 로컬 스토리지에서 ACCESS TOKEN 가져오기
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  let header = null;
  if (accessToken && accessToken !== null) {
    header = {
      headers: {
        Authorization: accessToken,
      },
    };
  }

  let options = {
    headers: header,
    url: api,
  };

  if (request) {
    // GET method
    options.body = request;
    // options.body = JSON.stringify(request);
  }

  if (method === 1) {
    //  post
    return axios
      .post(options.url, options.body, options.headers)
      .then((response) => {
        if (!response.data) {
          // response.ok가 true이면 정상적인 리스폰스를 받은것, 아니면 에러 리스폰스를 받은것.
          return Promise.reject(response);
        }
        return response;
      })
      .catch((error) => {
        console.log(error.status);
        // if (error.status === 403) {
        //     navigate('/', { replace: true });
        // }
        return Promise.reject(error);
      });
  } else {
    //  get
    return axios
      .get(options.url, options.headers)
      .then((response) => {
        if (!response.data) {
          // response.ok가 true이면 정상적인 리스폰스를 받은것, 아니면 에러 리스폰스를 받은것.
          return Promise.reject(response);
        }
        return response;
      })
      .catch((error) => {
        console.log(error.status);
        // if (error.status === 403) {
        //     navigate('/', { replace: true });
        // }
        return Promise.reject(error);
      });
  }
}

export async function singin(userDTO /*, setLoginName*/) {
  try {
    const response = await call("/auth/signin", userDTO, 1);
    if (response.data.result == "fail") {
      Swal.fire({
        title: "Error!",
        text: "Check your ID or Password.",
        icon: "error",
        confirmButtonText: "OK",
      });
      //   alert("아이디 혹은 비밀번호를 확인하세요");
      return false;
    } else {
      if (response.data.token) {
        sessionStorage.setItem(ACCESS_TOKEN, response.data.token);
      }
    //   Swal.fire({
    //     title: "Success!",
    //     text: "Login Success.",
    //     icon: "success",
    //     confirmButtonText: "Cool",
    //   });
      sessionStorage.setItem("user", response.data.userName);
      sessionStorage.setItem("id", response.data.userId);
      return response.data.userName;
    }
  } catch (error) {
    console.error(error);
  }
}