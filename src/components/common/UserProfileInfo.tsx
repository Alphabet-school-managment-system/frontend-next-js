import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";

const UserProfileInfo = ({
  full_name,
  short_name,
  photoUrl,
  phone,
  email,
  link,
  avatarSize = 40,
  nameStyle,
  subTitle,
  sex = "male",
  onClick,
}: {
  full_name: string;
  short_name?: string;
  photoUrl: string;
  phone?: string;
  email?: string;
  link?: string;
  avatarSize?: number;
  nameStyle?: string;
  subTitle?: string;
  sex?: "male" | "female" | undefined | null;
  onClick?: () => void;
}) => {
  return link ? (
    <Link className="flex items-center text-black!" href={link}>
      {photoUrl ? (
        <Avatar src={photoUrl} size={avatarSize} style={{ marginRight: 8 }} />
      ) : (
        <Avatar
          icon={
            sex === "male" ? (
              <Icon icon={"et:profile-male"} size={24} color="black" />
            ) : (
              <Icon icon={"et:profile-female"} size={24} color="black" />
            )
          }
          size={avatarSize}
          style={{ marginRight: 8 }}
        />
      )}
      <div className="flex flex-col gap-1">
        <span
          className={`ml-3 font-light text-nowrap hover:underline hover:cursor-pointer`}
        >{`${short_name ?? full_name}`}</span>
        {subTitle && (
          <span className="block text-sm text-gray-500">{subTitle}</span>
        )}
      </div>
    </Link>
  ) : (
    <span
      className={`flex items-center text-black! ${onClick ? "hover:underline hover:cursor-pointer" : ""}`}
      onClick={onClick}
    >
      {photoUrl ? (
        <Avatar src={photoUrl} size={avatarSize} style={{ marginRight: 8 }} />
      ) : (
        <Avatar
          icon={
            sex === "male" ? (
              <Icon icon={"et:profile-male"} size={24} color="black" />
            ) : (
              <Icon icon={"et:profile-female"} size={24} color="black" />
            )
          }
          size={avatarSize}
          style={{ marginRight: 8 }}
        />
      )}
      <div className="flex flex-col gap-1">
        <span className="flex flex-col gap-1">
          <span
            className={` ${nameStyle}`}
          >{`${short_name ?? full_name}`}</span>
          {subTitle && (
            <span className="block text-sm text-gray-500">{subTitle}</span>
          )}
          {phone && (
            <span className="ml-3 flex items-center gap-2">
              <Icon
                icon="mdi:phone-outline"
                width={20}
                height={20}
                className="text-gray-700"
              />
              <span className="text-sm">{phone}</span>
            </span>
          )}
          {email && (
            <span className="ml-3 flex items-center gap-2">
              <Icon
                icon="mdi:email-outline"
                width={20}
                height={20}
                className="text-gray-700"
              />
              <span className="text-sm">{email}</span>
            </span>
          )}
        </span>
      </div>
    </span>
  );
};

export default UserProfileInfo;
