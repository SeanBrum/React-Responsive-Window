import React, {useState, useEffect} from 'react'

//Useing lodash for debouncing on window resize event
import _ from 'lodash/wrapperLodash';
import mixin from 'lodash/mixin';
import debounce from 'lodash/debounce';

mixin(_, {
    debounce: debounce
});

//Use false instead of null to prevent de-optimisation by V8 engine
export const ResponsiveContext = React.createContext({
    desktopLg: false,
    desktopMd: false,
    desktopSm: false,
    tabletLg: false,
    tabletMd: false,
    tabletSm: false,
    mobileXl: false,
    mobileLg: false,
    mobileMd: false,
    mobileSm: false
});

//For counting renders in dev mode (useful for setting debounce)
let responsiveRenderCount = 0;

export default function Responsive(props) {

    //make this so people can orveride the breakpoints

    if (props.devMode) {
        //For counting renders in dev mode (useful for setting debounce)
        responsiveRenderCount++;
        console.log('responsive render: ' + responsiveRenderCount);
    }

    const [responsiveObj, setResponsiveObj] = useState({
        desktopLg: false,
        desktopMd: false,
        desktopSm: false,
        tabletLg: false,
        tabletMd: false,
        tabletSm: false,
        mobileXl: false,
        mobileLg: false,
        mobileMd: false,
        mobileSm: false
    });

    const [firstRun, setFirstRun] = useState(true);

    //Used instead of setTimeout for throttling
    let delayedCallback = _.debounce(() => {return updateDimensions()}, (props.debounce ? props.debounce : 20));

    const setWindowVars = (desktopLg, desktopMd, desktopSm, tabletLg, tabletMd, tabletSm, mobileXl, mobileLg, mobileMd, mobileSm) => {
        const newResponsive = {...responsiveObj}
        newResponsive.desktopLg = desktopLg;
        newResponsive.desktopMd = desktopMd;
        newResponsive.desktopSm = desktopSm;
        newResponsive.tabletLg = tabletLg;
        newResponsive.tabletMd = tabletMd;
        newResponsive.tabletSm = tabletSm;
        newResponsive.mobileXl = mobileXl;
        newResponsive.mobileLg = mobileLg;
        newResponsive.mobileMd = mobileMd;
        newResponsive.mobileSm = mobileSm;
        setResponsiveObj(newResponsive);
    }

    const updateDimensions = () => {

        let desktopLg = false;
        let desktopMd = false;
        let desktopSm = false;
        let tabletLg = false;
        let tabletMd = false;
        let tabletSm = false;
        let mobileXl = false;
        let mobileLg = false;
        let mobileMd = false;
        let mobileSm = false;

        //Perhaps a more elegant way around this e.g a state machine?
        if(window.innerWidth < (props.desktopLg ? props.desktopLg : breakpoints.desktopLg)){
            desktopLg = true;
        }
        if(window.innerWidth < (props.desktopMd ? props.desktopMd : breakpoints.desktopMd)){
            desktopMd = true;
        }
        if(window.innerWidth < (props.desktopSm ? props.desktopSm : breakpoints.desktopSm)){
            desktopSm = true;
        }
        if(window.innerWidth < (props.tabletLg ? props.tabletLg : breakpoints.tabletLg)){
            tabletLg = true;
        }
        if(window.innerWidth < (props.tabletMd ? props.tabletMd : breakpoints.tabletMd)){
            tabletMd = true;
        }
        if(window.innerWidth < (props.tabletSm ? props.tabletSm : breakpoints.tabletSm)){
            tabletSm = true;
        }
        if(window.innerWidth < (props.mobileXl ? props.mobileXl : breakpoints.mobileXl) || window.innerHeight < (props.mobileHeight ? props.mobileHeight : 567)){
            mobileXl = true;
        }
        if(window.innerWidth < (props.mobileLg ? props.mobileLg : breakpoints.mobileLg)){
            mobileLg = true;
        }
        if(window.innerWidth < (props.mobileMd ? props.mobileMd : breakpoints.mobileMd)){
            mobileMd = true;
        }
        if(window.innerWidth < (props.mobileSm ? props.mobileSm : breakpoints.mobileSm)){
            mobileSm = true;
        }

        setWindowVars(desktopLg, desktopMd, desktopSm, tabletLg, tabletMd, tabletSm, mobileXl, mobileLg, mobileMd, mobileSm);
    }

    //Update dimensions before render
    if (firstRun) {
        setFirstRun(false);
        updateDimensions();
    }

    useEffect(() => {
        //Manually check dimensions first run
        updateDimensions();

        //Add
        window.addEventListener("resize", delayedCallback);
        
        //Remove
        return () => {
            window.removeEventListener("resize", delayedCallback);
        };
    }, []);


    return (
        <ResponsiveContext.Provider value={[responsiveObj]}>
            {props.children}
        </ResponsiveContext.Provider>
    )
}

const breakpoints = {
    desktopLg: 1400,
    desktopMd: 1300,
    desktopSm: 1200,
    tabletLg: 1040,
    tabletMd: 991,
    tabletSm: 840,
    mobileXl: 800,
    mobileLg: 650,
    mobileMd: 540,
    mobileSm: 400
}; 
