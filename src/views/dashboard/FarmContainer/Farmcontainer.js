import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Button, Card, CardContent, Typography } from '@material-ui/core';
import useEarnings from '../../../hooks/useEarnings';
import useHarvest from '../../../hooks/useHarvest';

import { getDisplayBalance } from '../../../utils/formatBalance';
import useBombStats from '../../../hooks/useBombStats';
import useShareStats from '../../../hooks/usebShareStats';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useBank from '../../../hooks/useBank';
import useStatsForPool from '../../../hooks/useStatsForPool';

const Farmcontainer = () => {

    const bank = useBank('BombBtcbLPBShareRewardPool');
    const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);
    const { onReward } = useHarvest(bank);
    const bombStats = useBombStats();
    const tShareStats = useShareStats();

    const tokenName = bank.earnTokenName === 'BSHARE' ? 'BSHARE' : 'BOMB';
    const tokenStats = bank.earnTokenName === 'BSHARE' ? tShareStats : bombStats;
    const tokenPriceInDollars = useMemo(
        () => (tokenStats ? Number(tokenStats.priceInDollars).toFixed(2) : null),
        [tokenStats],
    );
    const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

    const stakedBalance = useStakedBalance(bank.contract, bank.poolId);
    let statsOnPool = useStatsForPool(bank);

    return (
        <div>
            <div class="container">
                <div class="row m-3 border border-white">
                    <div class="col text-white">
                        <div class="row">
                            <div class="h4">Bomb Farms</div>
                            <div>Stake your LP tokens in our farms to start earning $BSHARE</div>
                        </div>
                        <div class="row">
                            <div class="mt-4 h4">BOMB-BTCB</div>
                        </div>
                        <div class="row">
                            <div class="col">Daily Returns:
                                <div class="h4">2%</div>
                            </div>
                            <div class="col">Your Stake:
                                <div>{getDisplayBalance(earnings)}</div>
                                <div>{`≈ $${earnedInDollars}`}</div>
                            </div>
                            <div class="col">Earned:
                                <div>{getDisplayBalance(stakedBalance, bank.depositToken.decimal)}</div>
                                <div>{`≈ $${tokenPriceInDollars}`}</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="mt-4 h4">BSHARE-BNB</div>
                        </div>
                        <div class="row">
                            <div class="col">Daily Returns:
                                <div class="h4">2%</div>
                            </div>
                            <div class="col">Your Stake:
                                <div>{getDisplayBalance(earnings)}</div>
                                <div>{`≈ $${earnedInDollars}`}</div>
                            </div>
                            <div class="col">Earned:
                                <div>{getDisplayBalance(stakedBalance, bank.depositToken.decimal)}</div>
                                <div>{`≈ $${tokenPriceInDollars}`}</div>
                            </div>
                        </div>

                    </div>
                    <div class="col text-white">

                        <div class="row">
                            <div class="d-flex justify-content-end p-4">
                                <Button onClick={onReward}>Claim All</Button>
                            </div>

                        </div>
                        <div class="row">
                            <div class="d-flex justify-content-end">${statsOnPool?.TVL}</div>
                        </div>
                        <div class="row mt-5">
                            <div class="col d-flex justify-content-center">
                                <Button >Deposit</Button>
                            </div>
                            <div class="col d-flex justify-content-center">
                                <Button>Withdraw</Button>
                            </div>
                            <div class="col d-flex justify-content-center">
                                <Button onClick={onReward}>Claim and Withdraw</Button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="d-flex justify-content-end mt-3">${statsOnPool?.TVL}</div>
                        </div>
                        <div class="row mt-5 mb-2">
                            <div class="col d-flex justify-content-center">
                                <Button>Deposit</Button>
                            </div>
                            <div class="col d-flex justify-content-center">
                                <Button>Withdraw</Button>
                            </div>
                            <div class="col d-flex justify-content-center">
                                <Button>Claim and Withdraw</Button>
                            </div>
                        </div>

                    </div>




                </div>


            </div></div>
    )
}

export default Farmcontainer