import {Box, Button, Flex, FormLabel, Heading, Text} from "@chakra-ui/react";
import TextControl from "../../../components/TextControl";
import {useState} from "react";
import {orgsState} from "../../../globalState/orgs";
import AlertMessage from "../../../components/AlertMessage";
import {validateGetByTypeInput} from "../../../utils/validateInput";


export default function AdditionalGetOrgsForm() {
    const [type, setType] = useState("");
    const [error, setError] = useState({isError: false, message: ""})

    const groupByAddressSubmitHandler = e => {
        e.preventDefault();
        orgsState.getOrgsGroupCntByAddress();
    };

    const getByTypeSubmitHandler = e => {
        e.preventDefault();
        const validation = validateGetByTypeInput({type});
        setError({isError: !validation.isValid, message: validation.message})
        if (validation.isValid)
            orgsState.getOrgsWhereTypeGreaterThanGiven({type});
    };

    return (
        <Box mx={5} py={5} px={5} borderWidth={1} borderRadius={14} boxShadow="lg"
             h="100%" w="full" minW={300}>
            <Heading align="center" as="h4" size="md" letterSpacing={"tighter"} mx={10} mb={5}>
                <Text>Получить дополнительную информацию</Text>
            </Heading>
            <form>
                <FormLabel>Сгруппировать объекты по значению поля officialAddress, вернуть количество элементов в каждой
                    группе</FormLabel>
                <Flex my={5} justifyContent="center">
                    <Button colorScheme='blue' onClick={groupByAddressSubmitHandler}>Выполнить</Button>
                </Flex>
            </form>
            <form>
                <FormLabel>Вернуть массив объектов, значение поля type которых больше заданного</FormLabel>
                <TextControl label={"Type: "} value={type} setValue={setType}
                             placeholder={"PUBLIC, GOVERNMENT, TRUST"}/>
                <Flex mt={5} justifyContent="center">
                    <Button colorScheme='blue' onClick={getByTypeSubmitHandler}>Выполнить</Button>
                </Flex>
            </form>
            {error.isError && <AlertMessage status={"error"} title={"Ошибка валидации"} message={error.message}/>}
        </Box>
    );
}