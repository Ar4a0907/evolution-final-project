import React from "react";
import {observer} from "mobx-react";
import {useAppStore} from "../../../stores/appStore";

export const Balance: React.FC = observer(function Balance() {
    const { balance } = useAppStore();

    const transformBalance = (balance: number) => {
        const transformedBalance = balance.toFixed(2);

        return `$ ${transformedBalance}`;
    }

    return(
      <div>
          {transformBalance(balance)}
      </div>
    );
});