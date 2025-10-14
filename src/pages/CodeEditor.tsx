import React from "react";
import { Flex, TextArea, Text, Separator, Box } from "@radix-ui/themes";

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  output: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode, output }) => {
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
      
      <Box p="3" style={{ flex: 1, backgroundColor: 'var(--gray-2)', overflow: 'auto' }}>
        <Text style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
          {output || 'Output will appear here...'}
        </Text>
      </Box>
    </Flex>
  );
};

export default CodeEditor;