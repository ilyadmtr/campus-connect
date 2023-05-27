import React from "react";
import {
    Button,
    ButtonGroup, FocusLock,
    FormControl,
    FormLabel, IconButton,
    Input,
    Popover, PopoverArrow, PopoverCloseButton, PopoverContent,
    PopoverTrigger,
    Stack,
    useDisclosure
} from "@chakra-ui/react";
import {FaEdit} from "react-icons/fa";

const TextInput = React.forwardRef((props, ref) => {
    return (
        <FormControl>
            <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
            <Input ref={ref} id={props.id} {...props} />
        </FormControl>
    )
})

const Form = ({ firstFieldRef, onCancel, onSave, textPost}) => {
    return (
        <Stack spacing={4}>
            <TextInput
                label='Enter new content...'
                id='new-text'
                ref={firstFieldRef}
                defaultValue={textPost}
            />
            <ButtonGroup display='flex' justifyContent='flex-end'>
                <Button variant='outline' onClick={onCancel}>
                    Cancel
                </Button>
                <Button onClick={()=>onSave(firstFieldRef.current.value)} colorScheme='teal'>
                    Save
                </Button>
            </ButtonGroup>
        </Stack>
    )
}

const PopoverForm = ({onSave, editingLoading, userLoading, textPost}) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const firstFieldRef = React.useRef(null)
    return (
        <>
            <Popover
                isOpen={isOpen}
                initialFocusRef={firstFieldRef}
                onOpen={onOpen}
                onClose={onClose}
                placement='right'
                closeOnBlur={false}
            >
                <PopoverTrigger>
                    <IconButton
                        ml="auto"
                        onClick={()=><PopoverForm/>}
                        isLoading={editingLoading || userLoading}
                        size="md"
                        colorScheme="blue"
                        variant="ghost"
                        icon={<FaEdit/>}
                        isRound
                    />
                </PopoverTrigger>
                <PopoverContent p={5}>
                    <FocusLock returnFocus persistentFocus={false}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <Form firstFieldRef={firstFieldRef} onCancel={onClose} onSave={onSave} textPost={textPost}/>
                    </FocusLock>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default PopoverForm;