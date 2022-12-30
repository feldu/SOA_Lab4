import {Box, Heading, Table, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {useTable} from "react-table";
import {orgsState} from "../../../globalState/orgs"
import {useMemo} from "react";
import {observer} from "mobx-react";
import AlertMessage from "../../../components/AlertMessage";

export const ResultTable = observer(() => {

    const columns = useMemo(() => [
        {Header: 'id', accessor: 'id'},
        {Header: 'Name', accessor: 'name'},
        {Header: 'Employees count', accessor: 'employeesCount'},
        {
            Header: 'Coordinates', columns: [
                {Header: 'X', accessor: 'coordinatesX'},
                {Header: 'Y', accessor: 'coordinatesY'},
            ]
        },
        {Header: 'Creation Date', accessor: 'creationDate'},
        {Header: 'Annual turnover', accessor: 'annualTurnover'},
        {Header: 'Type', accessor: 'type'},
        {
            Header: 'Official address', columns: [
                {Header: 'Zip code', accessor: 'officialAddressZipCode'},
                {
                    Header: 'Town', columns: [
                        {Header: 'X', accessor: 'officialAddressTownX'},
                        {Header: 'Y', accessor: 'officialAddressTownY'},
                        {Header: 'Name', accessor: 'officialAddressTownName'},
                    ]
                },
            ]
        },

    ], []);
    const data = useMemo(() =>
        orgsState.orgs?.map(o => ({
            id: o.id,
            name: o.name,
            employeesCount: o.employeesCount,
            coordinatesX: o.coordinates.x,
            coordinatesY: o.coordinates.y,
            creationDate: o.creationDate,
            annualTurnover: o.annualTurnover,
            type: o.type,
            officialAddressZipCode: o.officialAddress.zipCode,
            officialAddressTown: o.officialAddress.town,
            officialAddressTownX: o.officialAddress.town.x,
            officialAddressTownY: o.officialAddress.town.y,
            officialAddressTownName: o.officialAddress.town.name,
        })), [orgsState.orgs]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({columns, data});

    return (
        <Box mx={5} py={5} px={5} borderWidth={1} borderRadius={14} boxShadow="lg"
             h="100%" w="full" minW={300}>
            <Heading align="center" as="h4" size="md" letterSpacing={"tighter"} mx={10} mb={5}>
                <Text>Результат запроса</Text>
            </Heading>
            {
                orgsState.response.isError !== null &&
                <Box textAlign="center" mx="40%">
                    <AlertMessage status={orgsState.response.isError ? "error" : "success"}
                                  message={orgsState.response.message}
                                  title={orgsState.response.isError ? "Error" : "Success"}/>
                </Box>
            }
            {orgsState.orgs.length !== 0 &&
                <Table {...getTableProps()}>
                    <Thead>
                        {headerGroups.map(headerGroup => (
                            <Tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row)
                            return (
                                <Tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                                    })}
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            }
        </Box>
    );
});