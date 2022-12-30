import {Avatar, Box, Flex, Heading, Text} from "@chakra-ui/react";

export default function MainHeader() {
    return (
        <Flex direction="row" as="nav" align="center" justify="space-between" wrap="wrap"
              padding={2} bg="teal.300" color="white">
            <Flex direction="row" as="nav" align="center" justify="justify-content" wrap="wrap" mx={5}>
                <Avatar name='The last gauleiter' src='https://i.ytimg.com/vi/GfLizdWKAWQ/maxresdefault.jpg' my={2}
                        mr={3}/>
                <Box>
                    <Text>Выполнил: Остряков Егор Александрович</Text>
                    <Text>Группа: P34111</Text>
                </Box>
            </Flex>

            <Heading as="h1" size="lg" letterSpacing={"tighter"} mx={10}>
                <Text>Лабораторная работа по СОА</Text>
            </Heading>


        </Flex>
    );
}