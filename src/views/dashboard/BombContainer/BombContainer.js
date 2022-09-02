import React, { useMemo, useState } from 'react';
import { Button } from '@material-ui/core';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useBombStats from '../../../hooks/useBombStats';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useHarvestFromBoardroom from '../../../hooks/useHarvestFromBoardroom';
import useClaimRewardCheck from '../../../hooks/boardroom/useClaimRewardCheck';
import useBombFinance from '../../../hooks/useBombFinance';

const BombContainer = () => {

    const bombFinance = useBombFinance();
    const bombStats = useBombStats();
    const earnings = useEarningsOnBoardroom();
    const tokenPriceInDollars = useMemo(
        () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
        [bombStats],
    );

    const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

    const stakedBalance = useStakedBalanceOnBoardroom();
    const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('BSHARE', bombFinance.BSHARE);
    const tokenPriceInDollars1 = useMemo(
        () =>
            stakedTokenPriceInDollars
                ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
                : null,
        [stakedTokenPriceInDollars, stakedBalance],
    );
    const { onReward } = useHarvestFromBoardroom();
    const canClaimReward = useClaimRewardCheck();
  return (
    <div><div classname="container text-white boder border-white">
    <div class="row m-3">
        <div class="col-8 text-white border border-white">
            <div class="d-flex justify-content-end ">Read Investment Strategy</div>
            <div class="m-2 p-2 d-flex justify-content-center border border-white">Invest Now</div>
            <div class="row">
                <div class="m-2 p-2 d-flex justify-content-center col border border-white">Chat On Discord</div>
                <div class="m-2 p-2 d-flex justify-content-center col border border-white">Read docs</div>
            </div>
            <div classname="container">
                <div class="row m-1">
                    <div class="col-7 border border-white">
                        <div class="row border border-white">Boardroom   Recommended</div>
                        <div class="row border border-white">Stake BSHARE and earn BOMB every epoch</div>
                        <div class="row border border-white">
                            <div class="col">Daily Returns:
                                <div class="h4">2%</div>
                            </div>
                            <div class="col">Your Stake:
                                <div>{getDisplayBalance(earnings)}</div>
                                <div>{`≈ $${earnedInDollars}`}</div>
                            </div>
                            <div class="col">Earned:
                                <div>{getDisplayBalance(stakedBalance)}</div>
                                <div>{`≈ $${tokenPriceInDollars1}`}</div>
                            </div>
                        </div>

                    </div>
                    <div class="col border border-white">

                        <div class="p-6 border border-white">TVl:$1,008,430</div>
                        <div class="border border-white">Total Staked: 7232</div>
                        <div class="row">
                            <div class="col d-flex justify-content-center border border-white">
                                <Button>Deposit</Button>
                            </div>
                            <div class="col d-flex justify-content-center border border-white"><Button>Withdraw</Button></div>

                        </div>
                        <div class="d-flex justify-content-center border border-white">
                            <Button onClick={onReward}
                                className={earnings.eq(0) || !canClaimReward ? 'shinyButtonDisabled' : 'shinyButton'}
                                disabled={earnings.eq(0) || !canClaimReward}>Claim Rewards</Button>
                        </div>


                    </div>

                </div>

            </div>
        </div>
        <div class="m-3 p-1 col text-white border border-white">Latest News</div>
    </div>
</div></div>
  )
}

export default BombContainer