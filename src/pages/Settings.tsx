import React from "react";
import { Flex, Heading, Switch, Text } from "@radix-ui/themes";

interface SettingsProps {
  themeAppearance: 'light' | 'dark';
  setThemeAppearance: (appearance: 'light' | 'dark') => void;
}

const Settings: React.FC<SettingsProps> = ({ themeAppearance, setThemeAppearance }) => (
  <Flex direction="column" gap="4">
    <Heading size="4">Settings</Heading>
    <Flex align="center" gap="2">
      <Text>Dark Mode</Text>
      <Switch
        checked={themeAppearance === 'dark'}
        onCheckedChange={(checked) => setThemeAppearance(checked ? 'dark' : 'light')}
      />
    </Flex>
  </Flex>
);

export default Settings;
