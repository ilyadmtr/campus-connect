import React from 'react';
import {Box, Button, Flex, Input} from "@chakra-ui/react";
import {useAuth} from "../../hooks/auth";
import Avatar from "../profile/Avatar";
import {useForm} from "react-hook-form";
import {useAddComment} from "../../hooks/comments";

export default function NewComment({ post }) {
    const { id: postID } = post;
    const { user, isLoading: authLoading } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const { addComment, isLoading: commentLoading } = useAddComment({
        postID,
        uid: user?.id,
    });

    function handleAddComment(data) {
        addComment(data.text);
        reset();
    }

    if (authLoading) return "Loading...";

    return (
        <Box maxW="600px" mx="auto" py="6">
            <Flex padding="4">
                <Avatar user={user} size="sm" />
                <Box flex="1" ml="4">
                    <form onSubmit={handleSubmit(handleAddComment)}>
                        <Box>
                            <Input
                                size="sm"
                                variant="flushed"
                                placeholder="Write comment..."
                                autoComplete="off"
                                {...register("text", { required: true })}
                            />
                        </Box>
                        <Flex pt="2">
                            <Button
                                isLoading={commentLoading || authLoading}
                                type="submit"
                                colorScheme="teal"
                                size="xs"
                                ml="auto"
                            >
                                Add Comment
                            </Button>
                        </Flex>
                    </form>
                </Box>
            </Flex>
        </Box>
    );
}