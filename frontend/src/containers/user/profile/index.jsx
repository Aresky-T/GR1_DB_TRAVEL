import { useCallback, useEffect, useState } from "react";
import { ROUTE } from "../../../constant/route";
import { useProfile } from "../../../redux/selector";
import defaultAvatar from "../../../assets/image/avatar.jpg";
import { FaRegUser } from "react-icons/fa6";
import { FaOpencart } from "react-icons/fa";
import AccountInfo from "../../../components/user/profile2/account_info";
import BookedTourInfo from "../../../components/user/profile2/booked_tour";

const menu = [
  {
    name: "account",
    label: "Tài khoản",
    icon: FaRegUser,
    path: ROUTE.PROFILE_ACCOUNT_INFO,
    element: AccountInfo,
  },
  {
    name: "bookedTour",
    label: "Tour đã đặt",
    icon: FaOpencart,
    path: ROUTE.PROFILE_BOOKED_TOUR,
    element: BookedTourInfo,
  },
];

const ProfileContainer = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState();
  const profile = useProfile();

  const handleSelectMenuItem = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const getProfileField = useCallback(
    (key) => {
      return profile[key];
    },
    [profile]
  );

  const renderMenuItems = () => {
    return menu.map((item) => {
      const active = selectedMenuItem?.name === item.name ? "active" : "";
      return (
        <div className={`menu-item ${item.name} ${active}`} key={item.name}>
          <button onClick={() => handleSelectMenuItem(item)}>
            <span>
              <item.icon />
            </span>
            <span>{item.label}</span>
          </button>
        </div>
      );
    });
  };

  useEffect(() => {
    setSelectedMenuItem(menu[0]);
  }, []);

  return (
    <div className="profile-container main-session">
      <div className="profile-container__title">Hồ sơ</div>
      <div className="profile-container__menu">
        <div className="profile-container__menu__header">
          <div>
            <img src={getProfileField("avatarUrl") || defaultAvatar} alt="" />
          </div>
          <div>
            <p>
              <b>{getProfileField("fullName") ?? "Không xác định"}</b>
            </p>
            <p>{profile.account?.email ?? "Không xác định"}</p>
          </div>
        </div>
        <div className="profile-container__menu__main">{renderMenuItems()}</div>
      </div>
      <div className="profile-container__main">
        {selectedMenuItem && <selectedMenuItem.element />}
      </div>
    </div>
  );
};

export default ProfileContainer;
