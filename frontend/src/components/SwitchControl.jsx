import {FormControl, FormLabel, Switch} from "@chakra-ui/react";

export default function SwitchControl({label, value, setValue}) {
    return (
        <FormControl display='flex' w="full" justifyContent="space-between" alignItems="center" flex={1} my={2} px={8}>
            <FormLabel htmlFor='switch' mb='0'>{label}</FormLabel>
            <Switch id='switch' onChange={() => setValue(!value)}/>
        </FormControl>
    );
}