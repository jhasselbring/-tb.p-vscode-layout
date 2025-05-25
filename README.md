# @tb.p/vscode-layout

A flexible and customizable layout component inspired by VS Code's interface, built with React, styled-components, and react-resizable-panels.

## Installation

```bash
npm install @tb.p/vscode-layout
# or
yarn add @tb.p/vscode-layout
```

## Features

-   **VS Code-like Interface**: Provides a familiar and intuitive layout structure.
-   **Resizable Panels**: Easily resize different sections of the layout (Navigation, Editor, Console) using `react-resizable-panels`.
-   **Customizable Sections**: Pass your own React components to be rendered in the Header, Footer, Navigation, Editor, and Console sections.
-   **Dynamic Component Rendering**: Leverages `React.lazy` and `Suspense` for optimized loading of custom components.
-   **Persistent Layout**: Saves and restores panel sizes to/from local storage.
-   **Styled with styled-components**: Easily themeable and customizable using `styled-components`.

## Usage

```jsx
import React from 'react';
import Layout from '@tb.p/vscode-layout';

// Optional: Define custom components for different layout areas
const MyHeader = () => <div>Custom Header</div>;
const MyFooter = () => <div>Custom Footer</div>;
const MyNav = () => <div>Custom Navigation</div>;
const MyEditor = () => <div>Custom Editor Area</div>;
const MyConsole = () => <div>Custom Console Area</div>;

const App = () => {
  const layoutConfig = {
    header: MyHeader,
    footer: MyFooter,
    nav: MyNav,
    editor: MyEditor,
    console: MyConsole,
    // You can also pass paths for React.lazy, e.g.:
    // editor: React.lazy(() => import('./MyEditorComponent')),
  };

  return (
    <div style={{ height: '100vh' }}>
      <Layout layoutConfig={layoutConfig} />
    </div>
  );
};

export default App;
```

## Layout Structure

The `Layout` component is divided into the following main sections:

-   **Header**: Topmost section, typically for branding or global actions.
-   **Main Content Area**: Contains the resizable panels.
    -   **Navigation Panel**: Left-hand side panel, resizable.
    -   **Editor/Console Split Panel**: Vertically split and resizable area.
        -   **Editor Panel**: Upper panel in the split, for main content.
        -   **Console Panel**: Lower panel in the split, often for logs or secondary information.
-   **Footer**: Bottommost section, typically for status information or links.

## Props

| Prop           | Type   | Default                                  | Description                                                                                                                               |
| -------------- | ------ | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `layoutConfig` | object | `{}`                                     | An object where keys are section names (`header`, `footer`, `nav`, `editor`, `console`) and values are the React components to render. |
| `storageKey`   | string | `'react-resizable-panels:layout-sizes'`  | The key used to save and load panel sizes from local storage.                                                                             |

### `layoutConfig` Object

The `layoutConfig` prop allows you to specify custom components for each section of the layout. You can pass either a direct component reference or a component loaded via `React.lazy`.

-   `header`: Component for the header section.
-   `footer`: Component for the footer section.
-   `nav`: Component for the navigation panel.
-   `editor`: Component for the editor panel.
-   `console`: Component for the console panel.

## Peer Dependencies

Make sure you have these packages installed in your project:

-   `react: ^18.2.0`
-   `react-dom: ^18.2.0`
-   `react-router-dom: ^6.22.3`
-   `styled-components: ^6.1.8`
-   `react-resizable-panels: ^2.0.16`

## Keywords

-   react
-   layout
-   vscode
-   resizable
-   panels
-   ui-component

## Author

JHasselbring

## License

ISC