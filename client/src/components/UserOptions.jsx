import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom"
import { useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import profile from "../assets/profile.png";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SignUpActions } from "../store/SignUpSlice"
import "./UserOptions.css"

const UserOptions = ({ className }) => {

    const user = useSelector(state => state.signUp);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const profileNav = () => {
        if (user.isLogin)
            navigate("/Account");
        else
            navigate("/Login");
    };

    const logout = () => {
        dispatch(SignUpActions.logOutUser())
        navigate("/Home")
    }
    const orders = () => navigate("/orders");
    const dashboard = () => navigate("/dashboard");

    const actions = [
        { icon: <PersonIcon />, name: 'Profile', func: profileNav },
        { icon: <ExitToAppIcon />, name: 'Log Out', func: logout },
        { icon: <ListAltIcon />, name: 'Orders', func: orders },
    ];

    if (user.isLogin && user.user.role === "admin") {
        actions.unshift({
            icon: <DashboardIcon />,
            name: 'Dash Board',
            func: dashboard
        });
    }

    return (
        <SpeedDial
            className={className ? className : 'fixed right-3 mmd:right-6 top-8 mmd:top-7'}
            ariaLabel="SpeedDial tooltip example"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            direction='down'
            icon={
                <img
                    className={`w-full h-full rounded-[50%] ${isSmallScreen ? 'w-8 h-8' : ''}`}
                    src={user.isLogin ? user.user.avatar : profile}
                    alt='Speed Dial'
                    title={user.user.avatar}
                />
            }
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.func}
                />
            ))}
        </SpeedDial>
    );
};

export default UserOptions;
