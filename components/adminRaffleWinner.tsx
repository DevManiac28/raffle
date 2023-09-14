import { useContract, useContractRead } from "@thirdweb-dev/react";
import { RAFFLE_CONTRACT_ADDRESS } from "../const/addresses";
import { Card, Text, Box } from '@chakra-ui/react';
import AdminTransferNFT from "./adminTransferNFT";

export default function AdminRaffleWinner() {
    const {
        contract: raffleContract
    } = useContract(RAFFLE_CONTRACT_ADDRESS);

    const {
        data: prizedNFTContractAddress
    } = useContractRead(raffleContract, "nftAddress");
    const {
        data:prizeNFTTokenId
    } = useContractRead(raffleContract, "nftId");

    return (
        <Card>
            <Text fontSize={'1xl'} fontWeight={"bold"}>Raffle Winner</Text>
            {prizedNFTContractAddress == "0x000000000000000000000" ? (
                <Box>
                    <Text>No prize NFT set</Text>
                    <Text>Please start a new raffle and select the NFT will be raffle</Text>
                </Box>
            ): (
                <AdminTransferNFT
                    nftContractAddress={prizedNFTContractAddress}
                    tokenId={prizeNFTTokenId}
                />
            )}
        </Card>

    )
}