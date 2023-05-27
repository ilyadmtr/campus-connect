import {Box, Input, SimpleGrid} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useUsers} from "../../hooks/users";
import User from "./User";


export default function Users() {
    const {users, isLoading} = useUsers();
    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);

    useEffect(()=>{
        if(value.length > 0) {
            setResult(users?.filter(user =>
                user.username.toLowerCase().includes(value.toLowerCase())
            ))
        }
        else{
            setResult([]);
        }
    }, [value])

    if (isLoading) return "Loading...";
    return (
        <>
            <Box maxW="800px" mx="auto" py="10">
                <form>
                    <Input
                        resize="none"
                        mt="5"
                        placeholder="Search users..."
                        onChange={(e) => {setValue(e.target.value)}}
                    />
                </form>
            </Box>
            <SimpleGrid columns={[2, 3, 4]} spacing={[2, 3]} px="10px" py="6">
                {result.length === 0
                    ? users?.map((user) => (
                    <User key={user.id} user={user} />
                ))
                    : result?.map((user) => (
                    <User key={user.id} user={user} />
                ))}
            </SimpleGrid>
        </>
    );
}