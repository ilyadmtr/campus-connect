import React from 'react';
import {Avatar as ChakraAvatar} from "@chakra-ui/react";
import {PROTECTED} from "../../lib/routes";
import {Link} from "react-router-dom";
const Avatar = ({user, size="xl", overrideAvatar=null}) => {
    if (!user) return "Loading...";
    return (
        <ChakraAvatar
            name={user?.name}
            size="xl"
            src={overrideAvatar || user?.avatar}
            as={Link}
            size={size}
            to={`${PROTECTED}/profile/${user?.id}`}
            _hover={{cursor: "pointer", opacity: "0.8"}}
        />
    );
};

export default Avatar;