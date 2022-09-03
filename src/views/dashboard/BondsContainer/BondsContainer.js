import React, {useCallback, useMemo} from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import useBondStats from '../../../hooks/useBondStats';
//import useBombStats from '../../hooks/useBombStats';
import useBombFinance from '../../../hooks/useBombFinance';
import useCashPriceInLastTWAP from '../../../hooks/useCashPriceInLastTWAP';
import {useTransactionAdder} from '../../../state/transactions/hooks';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useBondsPurchasable from '../../../hooks/useBondsPurchasable';
import { Button } from '@material-ui/core';



const BondsContainer = () => {
    
    const {path} = useRouteMatch();
    const bombFinance = useBombFinance();
    const addTransaction = useTransactionAdder();
    const bondStat = useBondStats();
    //const bombStat = useBombStats();
    const cashPrice = useCashPriceInLastTWAP();
  
    const bondsPurchasable = useBondsPurchasable();
  
    const bondBalance = useTokenBalance(bombFinance?.BBOND);
    const handleBuyBonds = useCallback(
        async (amount) => {
          const tx = await bombFinance.buyBonds(amount);
          addTransaction(tx, {
            summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BOMB`,
          });
        },
        [bombFinance, addTransaction],
      );
        
      const handleRedeemBonds = useCallback(
        async (amount) => {
          const tx = await bombFinance.redeemBonds(amount);
          addTransaction(tx, {summary: `Redeem ${amount} BBOND`});
        },
        [bombFinance, addTransaction],
      );
  
    return (
    <div>
      <div>
        <div classname="container ">
                <div class="row m-1 text-white border border-white">
                    <div class="h3">Bonds</div>
                    <div>BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1</div>
                    <div class="col">
                        <div>Current Price: (Bomb)^2</div>
                        <div class="h3">BBond = {Number(bondStat?.tokenInFtm).toFixed(4) || '-'}</div>
                    </div>
                    <div class="col">
                        <div>Available to redeem: </div>
                        <div class="h3">456</div>
                    </div>
                    <div class="col">
                        <div>Purchase BBond</div>
                        <div>Bomb is over peg</div>
                        <br></br>
                        <div>Redeem Bomb</div>

                    </div>
                    <div class="col">
                         <Button onClick={handleBuyBonds}> Purchase </Button>
                        <br></br>
                        <Button onClick={handleRedeemBonds}> Redeem </Button>
                    </div>

                </div>
        </div>       


      </div>

    </div>
  )
}

export default BondsContainer