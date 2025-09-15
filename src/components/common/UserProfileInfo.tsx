import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Icon } from "@iconify-icon/react";
import Link from "next/link";

const UserProfileInfo = ({
  first_name,
  last_name,
  photoUrl,
  phone,
  email,
  link,
  avatarSize = 40,
  nameStyle,
}: {
  first_name: string;
  last_name: string;
  photoUrl: string;
  phone?: string;
  email?: string;
  link?: string;
  avatarSize?: number;
  nameStyle?: string;
}) => {
  return link ? (
    <Link className="flex items-center !text-black" href={link}>
      {photoUrl ? (
        <Avatar src={photoUrl} size={avatarSize} style={{ marginRight: 8 }} />
      ) : (
        <Avatar
          icon={<UserOutlined />}
          size={avatarSize}
          style={{ marginRight: 8 }}
        />
      )}
      <span
        className={`ml-3 font-light text-nowrap hover:underline hover:cursor-pointer`}
      >{`${first_name} ${last_name}`}</span>
    </Link>
  ) : (
    <span className="flex items-center !text-black">
      {photoUrl ? (
        <Avatar src={photoUrl} size={avatarSize} style={{ marginRight: 8 }} />
      ) : (
        <Avatar
          icon={<UserOutlined />}
          size={avatarSize}
          style={{ marginRight: 8 }}
        />
      )}
      <span className="flex flex-col gap-1">
        <span className={` ${nameStyle}`}>{`${first_name} ${last_name}`}</span>
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
    </span>
  );
};

export default UserProfileInfo;
