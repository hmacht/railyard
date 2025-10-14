import React from "react";
import { Flex, IconButton, Tooltip } from "@radix-ui/themes";
import { CodeSandboxLogoIcon, GearIcon } from "@radix-ui/react-icons";

interface SideMenuProps {
  selected: "code" | "settings";
  onSelect: (page: "code" | "settings") => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ selected, onSelect }) => (
  <Flex
    direction="column"
    align="center"
    gap="4"
    pt="3"
    pl="3"
    pr="3"
    height="100vh"
    style={{ borderRight: "1px solid var(--gray-6)" }}
  >
    <Tooltip content="Code Editor">
      <IconButton
        variant={selected === "code" ? "solid" : "soft"}
        color="plum"
        onClick={() => onSelect("code")}
        aria-label="Code Editor"
        size="3"
      >
        <CodeSandboxLogoIcon width="24" height="24" />
      </IconButton>
    </Tooltip>
    <Tooltip content="Settings">
      <IconButton
        variant={selected === "settings" ? "solid" : "soft"}
        color="plum"
        onClick={() => onSelect("settings")}
        aria-label="Settings"
        size="3"
      >
        <GearIcon width="24" height="24" />
      </IconButton>
    </Tooltip>
  </Flex>
);

export default SideMenu;
