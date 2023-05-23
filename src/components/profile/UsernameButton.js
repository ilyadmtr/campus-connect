import React from 'react';
import {Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {PROTECTED} from "../../lib/routes";

const UsernameButton = ({user} ) => {
    return (
        <Button as={Link} to={`${PROTECTED}/profile/${user.id}`} colorScheme="teal" variant="link">
            {user.username}
        </Button>
    );
};

export default UsernameButton;