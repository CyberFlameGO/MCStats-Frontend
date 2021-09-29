import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

function ToggleModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      onClick={toggleColorMode}
      margin="2"
      variant="ghost"
      aria-label="Theme"
      icon={colorMode === "Dark" ? <SunIcon /> : <MoonIcon />}
    />
  );
}

export default ToggleModeButton;
