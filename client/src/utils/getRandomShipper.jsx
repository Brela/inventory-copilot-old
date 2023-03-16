import React from "react";


export default function getRandomShipper() {
    const shipperList = [
        'UPS',
        'FedEx',
        'DHL',
        'USPS',
        'Amazon Logistics',
        'OnTrac',
        'LaserShip',
        'Eastern Connection',
        'Estes Express Lines',
        'XPO Logistics',
    ]
    const randomIndex = () => {
        return Math.floor(Math.random(shipperList.length))
    }
    console.log(randomIndex)

    return shipperList[randomIndex]
}