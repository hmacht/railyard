import React from "react";
import { Flex, Button } from "@radix-ui/themes";
import { TargetIcon, PlayIcon } from "@radix-ui/react-icons";
import { invoke } from "@tauri-apps/api/tauri";

export interface HeaderBarProps {
  onSettingsClick: () => void;
  code: string;
  setOutput: (output: string) => void;
  projectPath: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ onSettingsClick, code, setOutput, projectPath }) => {
  const handleRun = async () => {
    try {
      const result = await invoke<string>("run_code", { code, path: projectPath });
      const formattedOutput = JSON.stringify(result, null, 2);
      setOutput(formattedOutput);
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

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
        <Button variant="solid" color="green" size="1" onClick={handleRun}>
          <PlayIcon width={16} height={16} />
          Run
        </Button>
      </Flex>
    </Flex>
  );
};

export default HeaderBar;