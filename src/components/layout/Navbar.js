import React from 'react';
import {Button, Flex, Link} from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom";
import {DASHBOARD} from "../../lib/routes";
import {useLogout} from "../../hooks/auth";

const Navbar = () => {
    const {logout, isLoading} = useLogout();
    return (
        <Flex
            shadow="sm"
            pos="fixed"
            width="full"
            borderTop="6px solid"
            height="16"
            zIndex="3"
            justify="center"
            background="white"
        >
            <Flex px="4" w="full" align="center" maxW="1200px">
                <Link color={"teal"}
                      as={RouterLink}
                      to={DASHBOARD}
                      fontWeight="bold">
                    Home
                </Link>
                <Button
                ml="auto"
                colorScheme="teal"
                size="sm"
                onClick={logout}
                isLoading={isLoading}>
                    Log out
                </Button>
            </Flex>
        </Flex>
    );
};

export default Navbar;