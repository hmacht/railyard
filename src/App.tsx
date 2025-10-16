import { useState } from "react";
import { Theme, Flex } from "@radix-ui/themes";
import "./App.css";
import SideMenu from "./components/SideMenu.tsx";
import CodeEditor from "./pages/CodeEditor.tsx";
import Settings from "./pages/Settings.tsx";
import HeaderBar from "./components/HeaderBar.tsx";

function App() {
  const [page, setPage] = useState<'code' | 'settings'>('code');
  const [themeAppearance, setThemeAppearance] = useState<'light' | 'dark'>('light');
  const [code, setCode] = useState('// Write your code here...');
  const [output, setOutput] = useState('');
  const [projectPath, setProjectPath] = useState('/Users/fangjunlu/railyard');

  return (
    <Theme
      appearance={themeAppearance}
      accentColor="mint"
      grayColor="gray"
      panelBackground="solid"
      scaling="100%"
      radius="large"
    >
      <Flex direction="column" style={{ height: '100vh', width: '100vw' }}>
        <HeaderBar 
          onSettingsClick={() => setPage('settings')}
          code={code}
          setOutput={setOutput}
          projectPath={projectPath}
        />
        <Flex direction="row" style={{ flex: 1, width: '100%', height: '100%' }}>
          <SideMenu selected={page} onSelect={setPage} />
          {page === 'code' ? (
            <CodeEditor 
              code={code}
              setCode={setCode}
              output={output}
            />
          ) : (
            <Settings 
              themeAppearance={themeAppearance} 
              setThemeAppearance={setThemeAppearance} 
            />
          )}
        </Flex>
      </Flex>
    </Theme>
  );
}

export default App;