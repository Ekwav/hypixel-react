import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import api from '../../api/ApiHelper';
import './RecentAuctions.css';
import { numberWithThousandsSeperators } from '../../utils/Formatter';
import moment from 'moment';
import { Link } from 'react-router-dom';
interface Props {
    item: Item,
    fetchspan: number,
    itemFilter?: ItemFilter
}

// Boolean if the component is mounted. Set to false in useEffect cleanup function
let mounted = true;

function RecentAuctions(props: Props) {

    let [recentAuctions, setRecentAuctions] = useState<RecentAuction[]>([]);

    useEffect(() => {
        mounted = true;
    })
    let redirect = () => {
        window.location.href = "https://sky.coflnet.com" + window.location.pathname;
    }

    useEffect(() => {
        api.getRecentAuctions(props.item.tag, props.fetchspan, props.itemFilter).then(recentAuctions => {

            if (!mounted) {
                return;
            }

            let requests: Promise<string>[] = [];
            recentAuctions.forEach(auction => {
                requests.push(api.getPlayerName(auction.seller.uuid));
            })
            Promise.all(requests).then(results => {
                recentAuctions.forEach((auction, i) => {
                    auction.seller.name = results[i];
                });
                setRecentAuctions(recentAuctions);
            });
        })

        return () => {
            mounted = false;
        };
    }, [props.item, props.fetchspan, props.itemFilter]);

    let recentAuctionList = recentAuctions.map((recentAuction) => {
        return (
            <div className="cardWrapper" key={recentAuction.uuid}>
                <Link to={`/auction/${recentAuction.uuid}`}>
                    <Card className="card">
                        <Card.Header style={{ padding: "10px" }}>
                            <div style={{ float: "left" }}>
                                <img crossOrigin="anonymous" src={props.item.iconUrl} width="32" height="32" alt="" style={{ marginRight: "5px" }} loading="lazy"/>
                            </div>
                            <div>
                                {numberWithThousandsSeperators(recentAuction.price)} Coins
                        </div>
                        </Card.Header>
                        <Card.Body style={{ padding: "10px" }}>
                            <img style={{ marginRight: "15px" }} crossOrigin="anonymous" src={recentAuction.seller.iconUrl} alt="" height="24" width="24" loading="lazy"/>
                            <span>{recentAuction.seller.name}</span>
                            <hr />
                            <p>{'ended ' + moment(recentAuction.end).fromNow()}</p>
                        </Card.Body>
                    </Card>
                </Link>
            </div>
        )
    });

    return (
        <div className="recent-auctions">
            <h3>Recent auctions</h3>
            <button onClick={redirect}>Click to see on new auction history page</button>
        </div >
    );
}

export default RecentAuctions;