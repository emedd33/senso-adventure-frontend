import React, { FunctionComponent, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";


import useOwner from "../../store/hooks/useOwner"

import {
    Breadcrumbs,
    Button,
    createStyles,
    makeStyles,
    Theme,
} from "@material-ui/core";


import useWindowSize from "../../store/hooks/useWindowSize";


type NavbarHeaderBreadCrumbsProps = {};
const NavbarHeaderBreadCrumbs: FunctionComponent<NavbarHeaderBreadCrumbsProps> = () => {
    const size = useWindowSize();

    const location = useLocation()
    const [breadCrumbs, setBreadCrumbs] = useState<string[]>([])
    const owner = useOwner()
    useMemo(() => {
        let locationArray = location.pathname.split("/")
        if (locationArray.length > 2) {
            locationArray.splice(0, 3)
            setBreadCrumbs(locationArray)
        } else (
            setBreadCrumbs([])
        )
    }, [location])
    return (
        <>

            <Breadcrumbs aria-label="breadcrumb" style={{ textDecoration: "none" }}>

                {breadCrumbs && size.width && size.width! > 769 ? breadCrumbs.map((crumb: string, index: number) => {
                    let path = `/user/${owner}`
                    for (let i = 0; i <= index; i++) {
                        path += `/${breadCrumbs[i]}`
                    }
                    return (
                        <Link to={path} style={{ textDecoration: "none" }}>
                            <Button style={{ textTransform: "none", padding: 0 }} disabled={index === breadCrumbs.length - 1} >{crumb}</Button>
                        </Link>
                    )
                }

                ) : null}

            </Breadcrumbs>

        </>
    );
};

export default NavbarHeaderBreadCrumbs;
