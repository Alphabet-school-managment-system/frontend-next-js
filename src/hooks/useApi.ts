"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getData, postData } from "@/services/api";
import toast from "react-hot-toast";

export const useApiQuery = <T>(
  key: string[],
  url: string,
  enabled: boolean = true
) =>
  useQuery<T>({
    queryKey: key,
    queryFn: ({ signal }) => getData<T>(url, signal),
    enabled,
    meta: {
      onError: (error: unknown) => {
        toast.error(
          error instanceof Error ? error.message : "An error occurred"
        );
      },
    },
  });

export const useApiMutation = <T>(
  keyToInvalidate: string[],
  url: string,
  method: "POST" | "PUT" | "DELETE" = "POST"
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      body,
      signal,
    }: {
      body: unknown | any;
      signal?: AbortSignal;
    }) => postData<T>(url, { ...body }, method, signal),
    onSuccess: (result: any) => {
      queryClient.invalidateQueries({ queryKey: keyToInvalidate });
      toast.success(
        result?.message ??
          (method === "DELETE"
            ? "Data deleted successfully."
            : "Data saved successfully.")
      );
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    },
  });
};
