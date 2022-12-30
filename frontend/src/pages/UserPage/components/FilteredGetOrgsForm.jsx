import {Box, Button, Flex, FormLabel, Heading, Text} from "@chakra-ui/react";
import NumberControl from "../../../components/NumberControl";
import {useState} from "react";
import {orgsState} from "../../../globalState/orgs";
import {validateFilterByAnalInput, validateFilterByEmployeesInput} from "../../../utils/validateInput";
import AlertMessage from "../../../components/AlertMessage";


export default function FilteredGetOrgsForm() {
    const [minAnnualTurnover, setMinAnnualTurnover] = useState("");
    const [maxAnnualTurnover, setMaxAnnualTurnover] = useState("");
    const [minEmployeesCount, setMinEmployeesCount] = useState("");
    const [maxEmployeesCount, setMaxEmployeesCount] = useState("");
    const [error, setError] = useState({isError: false, message: ""})

    const getFilteredByAnalSubmitHandler = e => {
        e.preventDefault();
        const validation = validateFilterByAnalInput({minAnnualTurnover, maxAnnualTurnover})
        setError({isError: !validation.isValid, message: validation.message})
        if (validation.isValid)
            orgsState.getFilteredOrgsByAnal(minAnnualTurnover, maxAnnualTurnover);
    };

    const getFilteredByEmployeesSubmitHandler = e => {
        e.preventDefault();
        const validation = validateFilterByEmployeesInput({minEmployeesCount, maxEmployeesCount})
        setError({isError: !validation.isValid, message: validation.message})
        if (validation.isValid)
            orgsState.getFilteredOrgsByEmployees(minEmployeesCount, maxEmployeesCount);
    };

    return (
        <Box mx={5} py={5} px={5} borderWidth={1} borderRadius={14} boxShadow="lg"
             h="100%" w="full" minW={300}>
            <Heading align="center" as="h4" size="md" letterSpacing={"tighter"} mx={10} mb={5}>
                <Text>Получить организации по фильтрам</Text>
            </Heading>
            <form>
                <FormLabel>Отфильтровать организации по годовому обороту</FormLabel>
                <NumberControl label={"Min anal turnover:"} min={0} value={minAnnualTurnover}
                               setValue={setMinAnnualTurnover}/>
                <NumberControl label={"Max anal turnover:"} min={0} value={maxAnnualTurnover}
                               setValue={setMaxAnnualTurnover}/>
                <Flex my={5} justifyContent="center">
                    <Button colorScheme='blue' onClick={getFilteredByAnalSubmitHandler}>Выполнить</Button>
                </Flex>
            </form>
            <form>
                <FormLabel>Отфильтровать организации по количеству сотрудников</FormLabel>
                <NumberControl label={"Min employees count:"} min={0} value={minEmployeesCount}
                               setValue={setMinEmployeesCount}/>
                <NumberControl label={"Max employees count:"} min={0} value={maxEmployeesCount}
                               setValue={setMaxEmployeesCount}/>
                <Flex mt={5} justifyContent="center">
                    <Button colorScheme='blue' onClick={getFilteredByEmployeesSubmitHandler}>Выполнить</Button>
                </Flex>
            </form>
            {error.isError && <AlertMessage status={"error"} title={"Ошибка валидации"} message={error.message}/>}
        </Box>
    );
}