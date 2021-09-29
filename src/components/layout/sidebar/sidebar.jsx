import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavSection = (props) => {
  const { children } = props;
  return (
    <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        color={useColorModeValue("inherit", "gray.400")}
        role="group"
        fontWeight="bold"
        transition=".15s ease"
      >
        {children}
      </Flex>
  )
}

const NavItem = (props) => {
  const { icon, children, ...rest } = props;
  return (
    <Link to={props.to}>
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color={useColorModeValue("inherit", "gray.400")}
        _hover={{
          bg: useColorModeValue("gray.100", "gray.900"),
          color: useColorModeValue("gray.900", "gray.200"),
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            boxSize="4"
            _groupHover={{
              color: "gray.600",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const SidebarContent = () => {
  return (
    <Box
      as="nav"
      top="0"
      left="0"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      w="60"
    >
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavSection className="text-bold">SECTION</NavSection>
        <NavItem to="/" className="link">
          Coming soon, more features.
        </NavItem>
      </Flex>
    </Box>
  );
};

export default function Sidebar() {
  const sidebar = useDisclosure();

  return (
    <Box
      as="section"
      minH="100vh"
      width="250px"
      marginRight="50px"
      display="inline-flex"
    >
      <SidebarContent
        display={{ base: "none", md: "unset" }}
      />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
