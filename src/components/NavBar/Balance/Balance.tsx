import React from "react";
import { observer } from "mobx-react";

import { useAppStore } from "../../../stores/appStore";
import { transformBalance } from "../../../utils";


export const Balance: React.FC = observer(() => {
    const { balance } = useAppStore();

    return (
        <div>
            { transformBalance(balance) }
        </div>
    );
});