import {Box, Button, Flex, Heading, Text} from "@chakra-ui/react";
import NumberControl from "../../../components/NumberControl";
import TextControl from "../../../components/TextControl";
import {useState} from "react";
import {orgsState} from "../../../globalState/orgs";
import {validateAddUpdOrgsInput} from "../../../utils/validateInput";
import AlertMessage from "../../../components/AlertMessage";


export default function AddUpdOrgsForm() {
    const [id, setId] = useState("");
    const [name, setName] = useState("test");
    const [employeesCount, setEmployeesCount] = useState("14");
    const [coordinatesX, setCoordinatesX] = useState("8");
    const [coordinatesY, setCoordinatesY] = useState("8");
    const [creationDate, setCreationDate] = useState("2011-12-03T10:15:30+01:00");
    const [annualTurnover, setAnnualTurnover] = useState("22");
    const [type, setType] = useState("GOVERNMENT");
    const [officialAddressZipCode, setOfficialAddressZipCode] = useState("yyy");
    const [officialAddressTownX, setOfficialAddressTownX] = useState("14");
    const [officialAddressTownY, setOfficialAddressTownY] = useState("8");
    const [officialAddressTownName, setOfficialAddressTownName] = useState("VU");
    const [error, setError] = useState({isError: false, message: ""})

    const addSubmitHandler = e => {
        e.preventDefault();
        const validation = validateAddUpdOrgsInput({
                id,
                name,
                employeesCount,
                coordinatesX,
                coordinatesY,
                creationDate,
                annualTurnover,
                type,
                officialAddressZipCode,
                officialAddressTownX,
                officialAddressTownY,
                officialAddressTownName
            }
        );
        setError({isError: !validation.isValid, message: validation.message})
        if (validation.isValid)
            orgsState.addOrgs({
                isUpd: false,
                id,
                name,
                employeesCount,
                coordinates: {
                    x: coordinatesX,
                    y: coordinatesY
                },
                creationDate,
                annualTurnover,
                type,
                officialAddress: {
                    zipCode: officialAddressZipCode,
                    town: {
                        x: officialAddressTownX,
                        y: officialAddressTownY,
                        name: officialAddressTownName
                    }
                }
            });
    };

    const updSubmitHandler = e => {
        e.preventDefault();
        const validation = validateAddUpdOrgsInput({
                isUpd: true,
                id,
                name,
                employeesCount,
                coordinatesX,
                coordinatesY,
                creationDate,
                annualTurnover,
                type,
                officialAddressZipCode,
                officialAddressTownX,
                officialAddressTownY,
                officialAddressTownName
            }
        );
        setError({isError: !validation.isValid, message: validation.message})
        if (validation.isValid)
            orgsState.updateOrgs({
                id,
                name,
                employeesCount,
                coordinates: {
                    x: coordinatesX,
                    y: coordinatesY
                },
                creationDate,
                annualTurnover,
                type,
                officialAddress: {
                    zipCode: officialAddressZipCode,
                    town: {
                        x: officialAddressTownX,
                        y: officialAddressTownY,
                        name: officialAddressTownName
                    }
                }
            });
    };

    return (
        <Box mx={5} py={5} px={5} borderWidth={1} borderRadius={14} boxShadow="lg"
             h="100%" w="full" minW={500}>
            <form>
                <Heading align="center" as="h4" size="md" letterSpacing={"tighter"} mx={10} mb={5}>
                    <Text>Добавить/Обновить организацию</Text>
                </Heading>
                <Flex w="full" justifyContent="space-around">
                    <Box mx={3}>
                        <NumberControl label={"Id:"} min={1} value={id} setValue={setId}/>
                        <TextControl label={"Name:"} value={name} setValue={setName}/>
                        <NumberControl label={"Employees count:"} min={0} value={employeesCount}
                                       setValue={setEmployeesCount}/>
                        <NumberControl label={"Coordinate X:"} value={coordinatesX} setValue={setCoordinatesX}/>
                        <NumberControl label={"Coordinate Y:"} value={coordinatesY} setValue={setCoordinatesY}/>
                        <TextControl label={"Creation date:"} value={creationDate} setValue={setCreationDate}
                                     placeholder={"Not required for add"}/>
                    </Box>
                    <Box mx={3}>
                        <NumberControl label={"Annual Turnover:"} min={0} value={annualTurnover}
                                       setValue={setAnnualTurnover}/>
                        <TextControl label={"Type:"} placeholder={"PUBLIC, GOVERNMENT, TRUST"} value={type}
                                     setValue={setType}/>
                        <TextControl label={"Official address zip code:"} value={officialAddressZipCode}
                                     setValue={setOfficialAddressZipCode}/>
                        <NumberControl label={"Official address town X:"} value={officialAddressTownX}
                                       setValue={setOfficialAddressTownX}/>
                        <NumberControl label={"Official address town Y:"} value={officialAddressTownY}
                                       setValue={setOfficialAddressTownY}/>
                        <TextControl label={"Official address town name:"} value={officialAddressTownName}
                                     setValue={setOfficialAddressTownName}/>
                    </Box>
                </Flex>
                <Flex mt={5} mx={8} justifyContent="space-between">
                    <Button colorScheme='green' onClick={addSubmitHandler}>Добавить</Button>
                    <Button colorScheme='yellow' onClick={updSubmitHandler}>Обновить</Button>
                </Flex>
                {error.isError && <AlertMessage status={"error"} title={"Ошибка валидации"} message={error.message}/>}
            </form>
        </Box>
    );
}