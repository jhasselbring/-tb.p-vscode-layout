import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
} from 'react-resizable-panels';

const headerHeight = 56;
const footerHeight = 31;
const navWidth = 56;
const mainHeight = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`;
const appBackgroundColor = '#252a38';
const appSectionBackgroundColor = '#171b26';

const StyledHeader = styled.header`
  background-color: #252a38;
  color: white;
  height: ${headerHeight}px;
`;

const StyledFooter = styled.footer`
  background-color: #353b4b;
  color: white;
  height: ${footerHeight}px;
`;

const StyledMain = styled.main`
  height: ${mainHeight};
  width: 100%;
  display: flex;
`;

const StyledNav = styled.nav`
  background-color: ${appBackgroundColor};
  color: white;
  width: ${navWidth}px;
`;

const PanelWrapper = styled.div`
  height: 100%;
  background-color: inherit;
  overflow: auto;
  border-radius: 4px;
`;

const LeftDrawer = styled(PanelWrapper)`
  background-color: ${appSectionBackgroundColor};
`;

const EditorArea = styled(PanelWrapper)`
  background-color: #171b26;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
`;

const EditorPanel = styled.div`
  background-color: ${appSectionBackgroundColor};
  padding: 1rem;
  color: white;
  height: 100%;
`;

const ConsolePanel = styled.div`
  background-color: #111;
  padding: 1rem;
  color: white;
  height: 100%;
`;

const RightDrawer = styled(PanelWrapper)`
  background-color: ${appSectionBackgroundColor};
`;

const ResizeHandle = styled(PanelResizeHandle)`
  background-color: #252a38;
  cursor: col-resize;
  width: 4px;
  &:hover {
    background-color: #666;
  }
`;

const VerticalResizeHandle = styled(PanelResizeHandle)`
  height: 4px;
  background-color: #252a38;
  cursor: row-resize;
  &:hover {
    background-color: #666;
  }
`;

function Layout({ layoutConfig = {} }) {
  const [defaultLayout, setDefaultLayout] = useState(undefined);
  const storageKey = 'editor-panel-layout';

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setDefaultLayout(JSON.parse(saved));
      } catch {
        // fallback to default layout
      }
    }
  }, []);

  const handleSaveLayout = (sizes) => {
    localStorage.setItem(storageKey, JSON.stringify(sizes));
  };

  return (
    <div>
      <StyledHeader>
        {layoutConfig?.components?.Header ? (
          <layoutConfig.components.Header />
        ) : (
          <div style={{ color: 'white', padding: '1rem' }}>
            Please provide <code>components.Header</code> to customize this component to the Layout component.
          </div>
        )}
      </StyledHeader>

      <StyledMain>
        <StyledNav>
          {layoutConfig?.components?.Nav ? (
            <layoutConfig.components.Nav />
          ) : (
            <div style={{ color: 'white', padding: '1rem' }}>
              Please provide <code>components.Nav</code> to customize this component to the Layout component.
            </div>
          )}
        </StyledNav>
        <PanelGroup
          direction="horizontal"
          autoSaveId="main-panels"
          onLayout={handleSaveLayout}
        >
          <Panel minSize={1} defaultSize={15}>
            <LeftDrawer>
              <Outlet />
            </LeftDrawer>
          </Panel>

          <ResizeHandle />

          <Panel minSize={1}>
            <EditorArea>
              <PanelGroup direction="vertical">
                <Panel minSize={20}>
                  <EditorPanel id="editors">
                    {layoutConfig?.components?.Editor ? (
                      <layoutConfig.components.Editor />
                    ) : (
                      <div style={{ color: 'white', padding: '1rem' }}>
                        Please provide <code>components.Editor</code> to customize this component to the Layout component.
                      </div>
                    )}
                  </EditorPanel>
                </Panel>
                <VerticalResizeHandle />
                <Panel minSize={10}>
                  <ConsolePanel id="console" className="console-area">Console Area</ConsolePanel>
                </Panel>
              </PanelGroup>
            </EditorArea>
          </Panel>

          <ResizeHandle />

          <Panel minSize={1} defaultSize={15}>
            <RightDrawer>Right Aside</RightDrawer>
          </Panel>
        </PanelGroup>
      </StyledMain>

      <StyledFooter>Footer Content</StyledFooter>
    </div>
  );
}

export default Layout;
