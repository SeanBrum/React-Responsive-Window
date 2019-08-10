# react-responsive-window
React component that provides globaly accessable window breakpoint information.

This componet can be wrapped around all or just specific react components giving all child componets access to the responsive context. This context includes boolean breakpoints that are set via the window resize event both when the window first loads and everytime the window resize event is triggered. This is perfect if you would like to set so global window size breakpoints and access them conditionally relative to the window size anywhere in your app.

The are 10 default breakpoints:

```
desktopLg: 1400
desktopMd: 1300
desktopSm: 1200
tabletLg: 1040
tabletMd: 991
tabletSm: 840
mobileXl: 800
mobileLg: 650
mobileMd: 540
mobileSm: 400

```

Everytime the window resize event is called, the componet updates state variables tied to the context by comparing the window size to each break point (breakpoints can be overridden via props). The window resize event is also 'debounced' with an adjustable delay.

For example if the window size is 1250 the variables accessable via the context would be

```
desktopLg: true
desktopMd: true
desktopSm: false
tabletLg: false
tabletMd: false
tabletSm: false
mobileXl: false
mobileLg: false
mobileMd: false
mobileSm: false
```

## Install

```
npm install react-responsive-window
yarn add react-responsive-window

```

## Usage

Global usage
Class usage - tablet example
component switch usage

Overides - show overides
Debug and debounce

This component is super easy to use. To inlcude just import the component from the package and wrap around the components that require access to the responsive context.

```jsx
import React from 'react';
import Responsive from 'react-responsive-window';
import SomeComponent from './SomeComponent';

function App() {
  return (
    <Responsive>
        <SomeComponent/>
    </Responsive>
  );
}

export default App;
```

## Using responsive context in child components

Just 2 lines of code are required to give a child componet access to the responsive context.

```jsx
import {ResponsiveContext} from 'react-responsive-window';
```

&

```jsx

const [responsiveObj] = useContext(ResponsiveContext);

```

In the following example the above lines have been added and the mobile medium breakpoint has been referneced in a conditional that sets the class of the div. If the window size is less than the mobile medium break point, responsiveObj.mobileMd will update causing a state update that changes the class of the div element.

```jsx
import React from 'react'
import {ResponsiveContext} from 'react-responsive-window';

export default function SomeComponent() {

    const [responsiveObj] = useContext(ResponsiveContext);

    return (
        <div className={(responsiveObj.mobileMd ? "someMobileClass" : "someDesktopClass")}>
            
        </div>
    )
}
```

or another example of how this may be used to switch in different componets dependant of the window size.

```jsx
export default function SomeComponent() {

    const [responsiveObj] = useContext(ResponsiveContext);

    let main;

    if (responsiveObj.mobileXl) {
        main = <MobileComponent/>
    } else {
        main = <DesktopComponet/>
    }

    return (
        <React-Fragment>
            {main}
        </React-Fragment>
    )
}
```

## Overriding breakpoint

Breakpoints are set by default to the values shown in the introduction. These breakpoints can be overridden by inlcuded values in the component props. In the example below you can see how the breakpoints for desktop and mobile have all been increased by 1.

```jsx 
import React from 'react';
import Responsive from 'react-responsive-window';
import SomeComponent from './SomeComponent';

function App() {
  return (
    <Responsive
      desktopLg= { 1401 }
      desktopMd= { 1301 }
      desktopSm= { 1201 }
      mobileXl= { 801 }
      mobileLg= { 651 }
      mobileMd= { 541 }
      mobileSm= { 401 }
    >
      <SomeComponent/>
    </Responsive>
  );
}

export default App;

```

## Setting debounce and using state update indicator

The default debounce delay set to the window resize event listener call back is 20ms. This can be overided in the props of the component.

```jsx
function App() {
  return (
    <Responsive
      debounce={50}
    >
      <SomeComponent/>
    </Responsive>
  );
}
```
Additionally, it is sometimes usefull to keep track of state updates and visually access how the debounce is impacting the application as the window size is adjusted. You can toggle devMode in the props to console.log the a state update counter every time the event listener callback is executed. 

```jsx
function App() {
  return (
    <Responsive
      debounce={50}
      devMode={true}
    >
      <SomeComponent/>
    </Responsive>
  );
}
```

## Responsive Component Props

```
desktopLg: Number - Default: 1400
desktopMd: Number - Default: 1300
desktopSm: Number - Default: 1200
tabletLg: Number - Default: 1040
tabletMd: Number - Default: 991
tabletSm: Number - Default: 840
mobileXl: Number - Default: 800
mobileLg: Number - Default: 650
mobileMd: Number - Default: 540
mobileSm: Number - Default: 400
debounce: Number - Default: 20
devMode: Boolean - Default: false
```
## Responsive Context State Variables

```
responsiveObj.desktopLg : Boolean
responsiveObj.desktopMd : Boolean
responsiveObj.desktopSm : Boolean
responsiveObj.tabletLg : Boolean
responsiveObj.tabletMd : Boolean
responsiveObj.tabletSm : Boolean
responsiveObj.mobileXl : Boolean
responsiveObj.mobileLg : Boolean
responsiveObj.mobileMd : Boolean
responsiveObj.mobileSm : Boolean
```

## License 
Released under [MIT](https://opensource.org/licenses/MIT) license.

&copy; 2019 Sean Gynane.