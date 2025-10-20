import React from "react";
import { Flex, Heading, Text, Box, IconButton, TextField } from "@radix-ui/themes";
import { open } from '@tauri-apps/api/dialog';
import { FolderIcon } from "@phosphor-icons/react";

interface ConnectionProps {
  projectPath: string;
  setProjectPath: (path: string) => void;
}

const Connection: React.FC<ConnectionProps> = ({ projectPath, setProjectPath }) => {
  
  const selectFolder = async () => {
    const path = await open({
      directory: true,
      title: 'Select Rails Project'
    });
    
    if (path && typeof path === 'string') {
      setProjectPath(path);
    }
  };

  return (
    <Box p="4" style={{ width: '100%', maxWidth: '800px' }}>
      <Flex direction="column" gap="4">
        <Heading size="4">Connection</Heading>
        <Text color="gray">Select your Rails project folder</Text>
        
        <Flex gap="2" align="center" mt="2">
          <TextField.Root
            value={projectPath}
            onChange={(e) => setProjectPath(e.target.value)}
            placeholder="Project path..."
            style={{ flex: 1 }}
          />
          <IconButton onClick={selectFolder} size="3">
            <FolderIcon size={18} />
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Connection;