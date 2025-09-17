"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getData, postData } from "@/services/api";

export const useApiQuery = <T>(
  key: string[],
  url: string,
  enabled: boolean = true
) =>
  useQuery<T>({
    queryKey: key,
    queryFn: () => getData<T>(url),
    enabled,
  });

export const useApiMutation = <T>(
  keyToInvalidate: string[],
  url: string,
  method: "POST" | "PUT" | "DELETE" = "POST"
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: unknown | any) =>
      postData<T>(url, { ...body, _method: method }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyToInvalidate });
    },
  });
};
