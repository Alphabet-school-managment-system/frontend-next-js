"use client";
import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type UserDataType = {
  _id?: string;
  first_name?: string;
  last_name?: string;
  phoneNumber?: string;
  email?: string;
  role?: string;
  token?: string;
  better_auth_userId?: string;
  image?: string | null;
};

export type AppData = {
  userData: UserDataType;
};

export type UserContextType = {
  userData: UserDataType;
  setUserData: (value: Partial<UserDataType> | null) => void;
  clearUserData: () => void;
  isHydrated: boolean;
};

const USER_DATA_STORAGE_KEY = "alphabet_user_data";

const defaultUserData: UserDataType = {
  _id: undefined,
  first_name: undefined,
  last_name: undefined,
  phoneNumber: undefined,
  email: undefined,
  role: undefined,
  token: undefined,
  better_auth_userId: undefined,
  image: undefined,
};

const hasPersistableUserData = (value: UserDataType) =>
  Object.values(value).some((item) => item !== undefined && item !== null);

const readStoredUserData = (): UserDataType => {
  if (typeof window === "undefined") {
    return defaultUserData;
  }

  try {
    const storedValue = window.localStorage.getItem(USER_DATA_STORAGE_KEY);

    if (!storedValue) {
      return defaultUserData;
    }

    return {
      ...defaultUserData,
      ...JSON.parse(storedValue),
    };
  } catch {
    return defaultUserData;
  }
};

export const UserContext = createContext<UserContextType>({
  userData: defaultUserData,
  setUserData: () => {},
  clearUserData: () => {},
  isHydrated: false,
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserDataState] = useState<UserDataType>(defaultUserData);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setUserDataState(readStoredUserData());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") {
      return;
    }

    if (hasPersistableUserData(userData)) {
      window.localStorage.setItem(
        USER_DATA_STORAGE_KEY,
        JSON.stringify(userData)
      );
    } else {
      window.localStorage.removeItem(USER_DATA_STORAGE_KEY);
    }
  }, [isHydrated, userData]);

  const setUserData = (value: Partial<UserDataType> | null) => {
    setUserDataState((prev) => {
      if (value === null) {
        return defaultUserData;
      }

      return {
        ...prev,
        ...value,
      };
    });
  };

  const clearUserData = () => {
    setUserDataState(defaultUserData);
  };

  return (
    <UserContext.Provider
      value={{ userData, setUserData, clearUserData, isHydrated }}
    >
      {children}
    </UserContext.Provider>
  );
};
