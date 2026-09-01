import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const SIGNUP_ENDPOINT = "/auth/signup";
const ME_ENDPOINT = "/auth/me";
const REFRESH_ENDPOINT = "/auth/refresh";

export async function signup(signupData) {
  const response = await axios.post(
    `${API_BASE_URL}${SIGNUP_ENDPOINT}`,
    signupData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function getCurrentUser() {
  try {
    const response = await axios.get(`${API_BASE_URL}${ME_ENDPOINT}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (error.response?.status !== 401) {
      throw error;
    }

    await axios.post(
      `${API_BASE_URL}${REFRESH_ENDPOINT}`,
      {},
      { withCredentials: true }
    );

    const response = await axios.get(`${API_BASE_URL}${ME_ENDPOINT}`, {
      withCredentials: true,
    });

    return response.data;
  }
}
