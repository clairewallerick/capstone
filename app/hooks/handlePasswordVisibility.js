import { useState } from "react";

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("checkbox-blank-outline");

  // This changes the icon for the password visibility when clicked
  const handlePasswordVisibility = () => {
    if (rightIcon === "checkbox-marked-outline") {
      setRightIcon("checkbox-blank-outline");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "checkbox-blank-outline") {
      setRightIcon("checkbox-marked-outline");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
  };
};
