import { IconButton } from "@mui/material";
import Switch from "@mui/material/Switch";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { useRecoilState } from "recoil";
import { userRoleState } from "@/store/atom";

const Topbar = () => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [role, updateRole] = useRecoilState(userRoleState);

  return (
    <div className="fixed top-0 left-0 z-50 flex gap-6 items-center justify-end p-4 w-full bg-background">
      <label>
        <span>admin</span>
        <Switch
          {...label}
          checked={role === "user"}
          onChange={() => updateRole(role === "user" ? "admin" : "user")}
        />
        <span>user</span>
      </label>
      <IconButton>
        <LogoutOutlinedIcon />
      </IconButton>
    </div>
  );
};

export default Topbar;
