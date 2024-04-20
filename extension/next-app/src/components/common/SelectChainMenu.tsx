import {
  Button,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  chakra,
} from "@chakra-ui/react";
import { useAcc } from "../../stores/useAcc";
import { Chain } from "viem";
import { chains } from "../../constants/web3";
import { LuChevronDown } from "react-icons/lu";

const NetworkBadge = ({ network }: { network: Chain & { icon: string } }) => {
  return (
    <HStack>
      <Image src={network.icon} boxSize="13px" />
      <Text>
        {network.name} <chakra.span fontSize="xs">({network.id})</chakra.span>
      </Text>
    </HStack>
  );
};

export const SelectChainMenu = () => {
  const acc = useAcc();

  return (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        rightIcon={<Icon as={LuChevronDown} />}
        leftIcon={
          <Image src={(acc.connectedNetwork as any).icon} boxSize="13px" />
        }
      >
        {acc.connectedNetwork.name}
      </MenuButton>
      <MenuList>
        {chains.map((c) => (
          <MenuItem
            key={c.id}
            onClick={() => acc.switchNetwork(c)}
            isDisabled={c.isDisabled}
          >
            <NetworkBadge network={c} />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
