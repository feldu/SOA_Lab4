import {
    FormControl,
    FormLabel,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper
} from "@chakra-ui/react";

export default function NumberControl({label, value, setValue, min}) {
    return (
        <FormControl direction="column" w="full" justifyContent="center" alignItems="center" flex={1} my={2}>
            <FormLabel>{label}</FormLabel>
            <NumberInput min={min} value={value} onChange={(val) => setValue(val)}>
                <NumberInputField/>
                <NumberInputStepper>
                    <NumberIncrementStepper/>
                    <NumberDecrementStepper/>
                </NumberInputStepper>
            </NumberInput>
        </FormControl>
    );
}