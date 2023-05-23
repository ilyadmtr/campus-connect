import React from 'react';
import {Flex, IconButton} from "@chakra-ui/react";
import {FaComment, FaHeart, FaRegComment, FaRegHeart, FaTrash} from "react-icons/fa";
import {useAuth} from "../../hooks/auth";
import {useDeletePost, useToggleLike} from "../../hooks/posts";
import {Link} from "react-router-dom";
import {PROTECTED} from "../../lib/routes";
import {useComments} from "../../hooks/comments";

const Actions = ({post}) => {
    const {likes, id, uid} = post;
    const {user, isLoading: userLoading} = useAuth();
    const isLiked = likes.includes(user?.id);
    const {toggleLike, isLoading: likeLoading} = useToggleLike({id, isLiked, uid: user?.id});
    const {deletePost, isLoading: deleteLoading} = useDeletePost(id);
    const {comments, isLoading: commentsLoading} = useComments(id);

    return (
        <Flex p="2">
            <Flex alignItems="center">
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
            </Flex>
            <Flex alignItems="center">
                <IconButton
                    as={Link}
                    to={`${PROTECTED}/comments/${id}`}
                    // isLoading={likeLoading || userLoading}
                    size="md"
                    colorScheme="teal"
                    variant="ghost"
                    icon={comments?.length === 0 ? <FaRegComment/> : <FaComment/>}
                    isRound
                />
                {comments?.length}
            </Flex>
            {!userLoading && user.id === uid && (
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
            )}

        </Flex>
    );
};

export default Actions;