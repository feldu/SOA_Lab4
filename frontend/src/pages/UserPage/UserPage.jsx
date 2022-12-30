import {Flex, Image} from "@chakra-ui/react";
import MainHeader from "../../components/MainHeader";
import GetOrgsForm from "./components/GetOrgsForm";
import AddUpdOrgsForm from "./components/AddUpdOrgsForm";
import DeleteOrgsForm from "./components/DeleteOrgsForm";
import AdditionalGetOrgsForm from "./components/AdditionalGetOrgsForm";
import FilteredGetOrgsForm from "./components/FilteredGetOrgsForm";
import {ResultTable} from "./components/ResultTable";

export default function UserPage() {
    return (
        <Flex direction="column">
            <MainHeader/>
            <Flex direction="column" w="full" justifyContent="center" alignItems="center" flex={1}
                  p={5} mx="auto">
                <Flex direction="row" w="100%" alignItems="stretch" mt={5}>
                    <GetOrgsForm/>
                    <AddUpdOrgsForm/>
                    <FilteredGetOrgsForm/>

                </Flex>
                <Flex direction="row" w="100%" alignItems="stretch" mt={10}>
                    <AdditionalGetOrgsForm/>
                    <Flex mx={5} py={5} px={5} borderWidth={1} borderRadius={14} boxShadow="lg"
                          h="100%" direction="column" w="full" alignItems='center' minW={500}>
                        <Image src='https://design-mate.ru/upload/images/post/post_4350.jpg?1567604594' alt='Tree'/>
                    </Flex>
                    <DeleteOrgsForm/>
                </Flex>
                <Flex direction="row" w="100%" alignItems="stretch" mt={10}>
                    <ResultTable/>
                </Flex>
            </Flex>
        </Flex>
    );
}