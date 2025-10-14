import React from "react";
import { Flex, Button } from "@radix-ui/themes";
import { TargetIcon, PlayIcon } from "@radix-ui/react-icons";

interface HeaderBarProps {
  onSettingsClick: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ onSettingsClick }) => {
  return (
    <Flex align="center" justify="between" px="4" py="2"
      style={{ borderBottom: "1px solid var(--gray-6)" }}>
      <Flex align="center" gap="2">
        <Button
          variant="outline"
          color="gray"
          size="1"
          onClick={onSettingsClick}
        >
          <TargetIcon width={16} height={16} />
          /Users/henrymacht/Dev/railyard
        </Button>
        <Button variant="solid" color="green" size="1">
          <PlayIcon width={16} height={16} />
          Run
        </Button>
      </Flex>
    </Flex>
  );
};

export default HeaderBar;