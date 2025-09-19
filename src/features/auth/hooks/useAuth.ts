// ==============================
// 📁 src/hooks/useAuth.ts (adjusted for custom request)
// ==============================
import { useMutation } from "@tanstack/react-query";
import { request } from "../../../core/libs/api/config";
import { API_ENDPOINT, CONFIG_APP } from "../../../core/configs/app";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "../../../core/libs/api/types";

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return await request.post<ApiResponse<{ token: string }>>(
        API_ENDPOINT.auth.login
      )(
        {
          email,
          password,
        },
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (res) => {
      toast.success(res.message);
      localStorage.setItem(CONFIG_APP.TOKEN_KEY, res?.data?.token ?? "");
      navigate("/chats");
    },
  });
};
