export function parseItemBid(bid: any): ItemBid {
    return {
        uuid: bid.uuid,
        end: new Date(bid.end),
        item: {
            name: bid.itemName
        },
        highestBid: bid.highestBid,
        highestOwn: bid.highestOwn
    } as ItemBid
}

export function parseAuction(auction: any): Auction {
    return {
        uuid: auction.uuid,
        end: new Date(auction.end),
        item: {
            name: auction.itemName
        },
        highestBid: auction.highestBid
    } as Auction
}

export function parsePlayerDetails(playerDetails: any): PlayerDetails {
    return {
        bids: playerDetails.bids.map(bid => {
            return {
                uuid: bid.uuid,
                highestOwn: bid.highestOwn,
                end: new Date(bid.end),
                highestBid: bid.highestBid,
                item: {
                    name: bid.itemName
                }
            } as ItemBid
        }),
        auctions: playerDetails.auctions.map(auction => {
            return {
                uuid: auction.auctionId,
                highestBid: auction.highestBid,
                end: new Date(auction.end),
                item: {
                    name: auction.itemName
                }
            } as Auction
        })
    } as PlayerDetails
}

export function parseItemPriceData(priceData: any): ItemPriceData {
    return {
        end: new Date(priceData.end),
        price: priceData.price
    } as ItemPriceData;
}

export function parseItem(item: any): Item {
    return {
        name: item.Name,
        category: item.Category,
        iconUrl: item.IconUrl || '/barrier.png',
        tier: item.Tier,
        description: item.Description
    }
}

export function parsePlayer(player: any): Player {
    return {
        name: player[0],
        uuid: player[1],
        iconUrl: "https://crafatar.com/avatars/" + player[1]
    }
}

export function parseEnchantment(enchantment: any, id: number): Enchantment {

    function formatEnchantmentName(enchantment: string): string {
        let formatted: string = enchantment.replace("_", " ");
        formatted = capitalizeWords(formatted);
        return formatted;
    }

    function capitalizeWords(text: string): string {
        return text.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    return {
        id: id,
        name: formatEnchantmentName(enchantment)
    }
}