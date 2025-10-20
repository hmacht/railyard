import React from "react";
import { Flex, IconButton, Tooltip } from "@radix-ui/themes";
import { CodeSandboxLogoIcon, GearIcon } from "@radix-ui/react-icons";
import { TerminalIcon, PlugsConnectedIcon} from "@phosphor-icons/react";

interface SideMenuProps {
  selected: "code" | "connection" | "settings";
  onSelect: (page: "code" | "connection" | "settings") => void;
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
        <TerminalIcon />
      </IconButton>
    </Tooltip>
    <Tooltip content="Connection">
      <IconButton
        variant={selected === "connection" ? "solid" : "soft"}
        color="plum"
        onClick={() => onSelect("connection")}
        aria-label="Connection"
        size="3"
      >
        <PlugsConnectedIcon />
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
