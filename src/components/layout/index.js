import {useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {LOGIN} from "../../lib/routes";
import {useAuth} from "../../hooks/auth";
import Navbar from "./Navbar";
import {Box, Flex} from "@chakra-ui/react";
import Sidebar from "./Sidebar";

const Layout = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const {user, isLoading} = useAuth();

    useEffect(() => {
        if (!isLoading && pathname.startsWith('/protected') && !user) {
            navigate(LOGIN)
        }
    }, [pathname, user])

    if (isLoading) return "Loading...";
    return (
        <>
            <Navbar/>
            <Flex pt="16" pb="12" mx="auto" w="full" maxW="1200px">
                <Box w="900px">
                <Outlet/>
                </Box>
                <Sidebar/>
            </Flex>
        </>
    );
};

export default Layout;