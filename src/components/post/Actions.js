import React from 'react';
import {Box, Flex, IconButton, Spacer} from "@chakra-ui/react";
import {FaComment, FaEdit, FaHeart, FaRegComment, FaRegHeart, FaTrash} from "react-icons/fa";
import {useAuth} from "../../hooks/auth";
import {useDeletePost, useEditPost, useToggleLike} from "../../hooks/posts";
import {Link} from "react-router-dom";
import {PROTECTED} from "../../lib/routes";
import {useComments} from "../../hooks/comments";
import PopoverForm from "./popoverForm";


const Actions = ({post}) => {
    const {likes, id, uid, text} = post;
    const {user, isLoading: userLoading} = useAuth();
    const isLiked = likes.includes(user?.id);
    const {toggleLike, isLoading: likeLoading} = useToggleLike({id, isLiked, uid: user?.id});
    const {deletePost, isLoading: deleteLoading} = useDeletePost(id);
    const {comments, isLoading: commentsLoading} = useComments(id);
    const {editPost, isLoading: editingLoading} = useEditPost({id});

    const handleSave = (text)=>{
        editPost(text);
    }

    return (
        <Flex p="2">
            <Box>
                <IconButton
                    onClick={toggleLike}
                    isLoading={likeLoading || userLoading}
                    size="md"
                    colorScheme="red"
                    variant="ghost"
                    icon={isLiked ? <FaHeart/> : <FaRegHeart/>}
                    isRound
                />
                {likes.length}
                <IconButton
                    as={Link}
                    to={`${PROTECTED}/comments/${id}`}
                    isLoading={commentsLoading || userLoading}
                    size="md"
                    colorScheme="teal"
                    variant="ghost"
                    icon={comments?.length === 0 ? <FaRegComment/> : <FaComment/>}
                    isRound
                />
                {comments?.length}
            </Box>

            <Spacer/>
            {!userLoading && user.id === uid && (
                <Box>
                    <PopoverForm
                        onSave={handleSave}
                        editingLoading={editingLoading}
                        userLoading={userLoading}
                        textPost={text}/>
                    <IconButton
                        ml="auto"
                        onClick={deletePost}
                        isLoading={deleteLoading || userLoading}
                        size="md"
                        colorScheme="red"
                        variant="ghost"
                        icon={<FaTrash/>}
                        isRound
                    />
                </Box>
            )}

        </Flex>
    );
};

export default Actions;