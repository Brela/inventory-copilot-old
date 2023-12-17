import React, { useState, useRef } from "react";
import InventoryContent from "../components/Inventory/Inventory.jsx";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Stats from "../components/Inventory/Stats.jsx";
import NavigationBar from "../components/NavigationBar.jsx";

function InventoryPage() {
  const inventoryListScrollRef = useRef(null);
  const ordersListScrollRef = useRef(null);
  const [rowHeightState, setRowHeightState] = useState(null);

  return (
    <div className=" max-w-screen-xl mx-auto ">
      <div className="max-w-screen-xl mx-2 md:mx-4 my-2 md:my-3 px-2 md:px-6 flex gap-3 md:gap-6 flex-col rounded-3xl">
        <Header />

        <div className="bg-zinc-50 rounded-2xl p-2 md:p-4 overflow-x-auto min-h-[85vh]">
          <NavigationBar />
          {/*     <InventoryContent
            inventoryListScrollRef={inventoryListScrollRef}
            ordersListScrollRef={ordersListScrollRef}
            rowHeightState={rowHeightState}
          /> */}
        </div>
        {/* <Stats /> */}
        <div className=" flex justify-center  mb-4">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default InventoryPage;
