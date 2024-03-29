import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filter, InventoryView, Search } from "../parts/Shop";
import ViewSelector from "../parts/Shop/ViewSelector";

interface Props {}

const ShopLayout = (props: Props) => {
  const state = useSelector(
    (state: RStore) => state.inventory.filters.condition
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!state) {
      dispatch({
        type: "ADD_FILTER",
        payload: { condition: ["new", "used", "salvaged"] },
      });
    }
  }, []);

  const getStateName = () => {
    if ((!!state && state.length > 1) || !state) {
      return "All";
    }

    return state[0];
  };

  return (
    <div className="shop">
      <title>Shop {getStateName()} Vehicles - Auto Dealer</title>
      <div className="shop__header">
        {state && <h1>{getStateName()} Vehicles</h1>}
        <ViewSelector />
      </div>
      <Search className="shop__search" />
      <div className="shop__main">
        <Filter />
        <div>
          <InventoryView />
        </div>
      </div>
    </div>
  );
};

export default ShopLayout;
