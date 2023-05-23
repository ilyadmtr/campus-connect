import React from 'react';
import {Box, Button, Heading, HStack, Textarea} from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";
import {useForm} from "react-hook-form";
import useAddPost, {usePosts} from "../../hooks/posts";
import {useAuth} from "../../hooks/auth";
import PostsList from "../post/PostsList";

function NewPostForm(){
    const {register, handleSubmit, reset} = useForm();
    const {addPost, isLoading: addingPost} = useAddPost();
    const {user, isLoading: authLoading} = useAuth();

    async function handleAddPost(data){
        await addPost({
            uid: user.id,
            text: data.text
        });
        reset();
    }

    return (
        <Box maxW="600px" mx="auto" py="10">
            <form onSubmit={handleSubmit(handleAddPost)}>
                <HStack justify="space-between">
                    <Heading size="lg">New Post</Heading>
                    <Button
                        colorScheme="teal"
                        type="submit"
                        isLoading={addingPost || authLoading}
                        loadingText="Loading"
                    >Post</Button>
                </HStack>
                <Textarea
                    as={TextareaAutosize}
                    resize="none"
                    mt="5"
                    placeholder="Create a new post..."
                    minRows={3}
                    {...register("text", {required: true})}
                />
            </form>
        </Box>
    );
}

const Dashboard = () => {
    const {posts, isLoading} = usePosts();
    if (isLoading) return "Loading";
    return (<>
        <NewPostForm/>
        <PostsList posts={posts}/>
    </>);
};

export default Dashboard;