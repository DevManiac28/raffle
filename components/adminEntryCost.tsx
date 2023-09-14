import { Web3Button, useContract, useContractRead } from "@thirdweb-dev/react";
import { RAFFLE_CONTRACT_ADDRESS } from "../const/addresses";
import { Stack, Box, Text, Input } from '@chakra-ui/react';
import { useState } from "react";
import { ethers } from 'ethers';
import { parse } from "path";

export default function AdminEntryCost() {
    const {
        contract
    } = useContract(RAFFLE_CONTRACT_ADDRESS);

    const {
        data: entryCost,
        isLoading: isLoadingEntryCost
    } = useContractRead(contract, "entryCost");

    const {
        data: raffleStatus
    } = useContractRead(contract, "raffleStatus");

    const [entryCostValue, setEntryCostValue] = useState(0);

    function resetEntryCost() {
        setEntryCostValue(0);
    }

    return (
        <Stack spacing={4}>
            <Box>
              <Text fontSize={"1xl"} fontWeight={"bold"}>Entry Cost: </Text>
              {!isLoadingEntryCost && (
                <Text>{ethers.utils.formatEther(entryCost)} MATIC</Text>
              )}
            </Box>
            <Input 
                type="number"
                value={entryCostValue}
                onChange={(e) => setEntryCostValue(parseInt(e.target.value))}
            />
            <Web3Button
                contractAddress={RAFFLE_CONTRACT_ADDRESS}
                action={(contract) => contract.call(
                    "changeEntryCost",
                    [
                        ethers.utils.parseEther(entryCostValue.toString())
                    ]
                )}
                isDisabled={!raffleStatus}
            >Update Entry Cost</Web3Button>
        </Stack>
    )
}