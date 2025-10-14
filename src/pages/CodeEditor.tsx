import React, { useState } from "react";
import { Flex, TextArea, Text, Separator, Box } from "@radix-ui/themes";

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState('// Write your code here...');
  
  return (
    <Flex direction="row" style={{ flex: 1, width: '100%', height: '100%' }}>
      <Box p="3" style={{ flex: 1 }}>
        <TextArea
          size="3"
          variant="surface"
          style={{ 
            fontFamily: 'monospace', 
            height: '100%',
            width: '100%',
            border: 'none',
            background: 'transparent',
            boxShadow: 'none',
            outline: 'none'
          }}
          value={code}
          onChange={e => setCode(e.target.value)}
        />
      </Box>
      
      <Separator 
        orientation="vertical" 
        style={{ height: '100%' }} 
      />
      
      <Box p="3" style={{ flex: 1, backgroundColor: 'var(--gray-2)' }}>
        <Text style={{ fontFamily: 'monospace'}}>
          This is a test of the output.
        </Text>
      </Box>
    </Flex>
  );
};

export default CodeEditor;