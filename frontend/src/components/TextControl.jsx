import {FormControl, FormLabel, Input} from "@chakra-ui/react";

export default function TextControl({label, placeholder, value, setValue}) {
    return (
        <FormControl direction="column" w="full" justifyContent="center" alignItems="center" flex={1} my={2}>
            {label && <FormLabel>{label}</FormLabel>}
            <Input type="text"
                   placeholder={placeholder}
                   value={value}
                   onChange={e => {
                       setValue(e.target.value)
                   }}
            />
        </FormControl>
    );
}