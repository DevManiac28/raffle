import { RAFFLE_CONTRACT_ADDRESS } from "../const/addresses";
import {  ThirdwebNftMedia, Web3Button, useContract, useContractMetadata, useContractRead, useNFT } from '@thirdweb-dev/react';
import { Box, Flex, Text } from '@chakra-ui/react';

 type Props = {
    nftContractAddress: string;
    tokenId: string
 };

 export default function AdminTransferNFT({nftContractAddress, tokenId}: Props) {
    const {
        contract: raffleContract
    } = useContract(RAFFLE_CONTRACT_ADDRESS );
    const {
        data: raffleStatus
    } = useContractRead(raffleContract, "raffleStatus");

    const {
        contract: prizeNFTContract
    } = useContract(nftContractAddress, "nft-drop");

    const {
        data: prizeNFTContractMetadata,
    } = useContractMetadata(prizeNFTContract);
    const {
        data: nft,
        isLoading: isLoadingNFT
    } = useNFT(prizeNFTContract, tokenId)
    return (
        <Box>
            <Flex flexDirection={"row"} my={10} alignItems={"center"}>
                {!isLoadingNFT && (
                    <ThirdwebNftMedia
                        metadata={nft?.metadata!}
                        height="100%"
                        width="100%"
                    />
                )}
                <Box ml={4}>
                    <Text fontSize={"xl"} fontWeight={"bold"}>{prizeNFTContractMetadata?.name}</Text>
                    <Text fontWeight={"bold"}>{nft?.metadata.name}</Text>
                </Box>
            </Flex>
            <Web3Button
                contractAddress={RAFFLE_CONTRACT_ADDRESS}
                action={async () => {
                    await prizeNFTContract?.setApprovalForToken(
                        RAFFLE_CONTRACT_ADDRESS,
                        tokenId
                    );
                    await raffleContract?.call("selectWiner");
                }}
                isDisabled={!raffleStatus}
            >Select Winner</Web3Button>
        </Box>
    )
 }