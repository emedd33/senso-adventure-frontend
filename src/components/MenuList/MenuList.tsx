import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { dispatchLogout } from '../../store/admin/adminCreator';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        paper: {
            marginRight: theme.spacing(2),
        },
    }),
);

export default function MenuListComposition() {
    const authUser = useSelector((state: RootReducerProp) => state.admin.authUser)
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const dispatch = useDispatch()

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };
    const handleLogout = (event: React.MouseEvent<EventTarget>) => {
        handleClose(event)
        return dispatch(dispatchLogout())
    }
    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    if (!authUser) {
        return (

            <div style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "4rem" }}>
                <AiIcons.AiFillCaretDown onClick={() => console.log("hei")} />
                <Link to="/login" style={{ textDecoration: 'none', color: "black", textTransform: "none" }}>
                    <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p style={{ margin: "0", paddingLeft: "1rem", fontFamily: "italianno, cursive" }}>Login</p>
                    </span>
                </Link>
            </div>
        )
    }
    return (
        <div style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "4rem" }}>
            <div className={classes.root}>
                <div>
                    <Button
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        style={{ fontFamily: "italianno, cursive", fontSize: "1.5rem" }}
                    >
                        {authUser.username}
                        < AiIcons.AiFillCaretDown style={{ marginLeft: "1rem" }} />
                    </Button>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} >
                                            <MenuItem onClick={handleLogout} style={{ fontFamily: "italianno, cursive", fontSize: "1.5rem" }}>Logout</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </div>
        </div >
    );
}