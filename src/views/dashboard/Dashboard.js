import React, { useMemo, useState } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useBombStats from '../../hooks/useBombStats';
import useLpStats from '../../hooks/useLpStats';
import useLpStatsBTC from '../../hooks/useLpStatsBTC';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usebShareStats from '../../hooks/usebShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
// import { Bomb as bombTesting } from '../../bomb-finance/deployments/deployments.testing.json';
//import { Bomb as bombProd } from '../../bomb-finance/deployments/deployments.mainnet.json';
import { roundAndFormatNumber } from '../../0x';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';
import { Alert } from '@material-ui/lab';
import { IoCloseOutline } from 'react-icons/io5';
import { BiLoaderAlt } from 'react-icons/bi';
import { makeStyles } from '@material-ui/core/styles';
import useBombFinance from '../../hooks/useBombFinance';
//import { ReactComponent as IconTelegram } from '../../assets/img/telegram.svg';
import { Helmet } from 'react-helmet';
import BombImage from '../../assets/img/bomb.png';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import moment from 'moment';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import ProgressCountdown from './components/ProgressCountdown';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
//Second Container
import { getDisplayBalance } from '../../utils/formatBalance';
import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import useHarvestFromBoardroom from '../../hooks/useHarvestFromBoardroom';
import useClaimRewardCheck from '../../hooks/boardroom/useClaimRewardCheck';
import Farmcontainer from './FarmContainer/Farmcontainer';
import BombContainer from './BombContainer/BombContainer';
import BondsContainer from './BondsContainer';




const Dashboard = () => {
    // FIRST CONTAINER
    const TVL = useTotalValueLocked();
    const bShareStats = usebShareStats();
    const tBondStats = useBondStats();
    
    const currentEpoch = useCurrentEpoch();
    const { to } = useTreasuryAllocationTimes();
    const cashStat = useCashPriceInEstimatedTWAP();
    const bombStats = useBombStats();

    const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);

    const bombPriceInDollars = useMemo(
        () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
        [bombStats],
    );
    const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
    const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);

    const bSharePriceInDollars = useMemo(
        () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
        [bShareStats],
    );

    const bShareCirculatingSupply = useMemo(
        () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
        [bShareStats],
    );
    const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);

    const tBondPriceInDollars = useMemo(
        () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
        [tBondStats],
    );

    const tBondCirculatingSupply = useMemo(
        () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
        [tBondStats],
    );
    const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

    // SECOND CONTAINER   

    return (
        <div>
            {/* First Container*/}
            <div classname="container text-white">
                <div class='h4 text-white d-flex justify-content-center'> Bomb Finance Summary</div>
                <br></br>
                <div class="row">
                    <div class="text-white col d-flex justify-content-center border border-white">
                        <div class="container border border-white">
                            <div class="row">
                                <div class="col border border-white"></div>
                                <div class="col border border-white text-sm">Current Supply</div>
                                <div class="col border border-white">Total Supply</div>
                                <div class="col border border-white">Price</div>
                                <div class="col border border-white"></div>
                            </div>
                            <div class="row">
                                <div class="col border border-white">$BOMB</div>
                                <div class="col border border-white">{roundAndFormatNumber(bombCirculatingSupply, 2)}</div>
                                <div class="col border border-white">{roundAndFormatNumber(bombTotalSupply, 2)}</div>
                                <div class="col border border-white">${bombPriceInDollars ? roundAndFormatNumber(bombPriceInDollars, 2) : '-.--'} BOMB</div>
                                <div class="col border border-white"><img alt="metamask fox" style={{ marginTop: '10px', width: '25px' }} src={MetamaskFox} /></div>
                            </div>
                            <div class="row">
                                <div class="col border border-white">$BSHARE</div>
                                <div class="col border border-white">{roundAndFormatNumber(bShareCirculatingSupply, 2)}</div>
                                <div class="col border border-white">{roundAndFormatNumber(bShareTotalSupply, 2)}</div>
                                <div class="col border border-white">${bSharePriceInDollars ? bSharePriceInDollars : '-.--'} / BSHARE</div>
                                <div class="col border border-white"><img alt="metamask fox" style={{ marginTop: '10px', width: '25px' }} src={MetamaskFox} /></div>
                            </div>
                            <div class="row">
                                <div class="col border border-white">$BBOND</div>
                                <div class="col border border-white">{roundAndFormatNumber(tBondCirculatingSupply, 2)}</div>
                                <div class="col border border-white">{roundAndFormatNumber(tBondTotalSupply, 2)}</div>
                                <div class="col border border-white">${tBondPriceInDollars ? tBondPriceInDollars : '-.--'} / BBOND</div>
                                <div class="col border border-white"><img alt="metamask fox" style={{ marginTop: '10px', width: '25px' }} src={MetamaskFox} /></div>
                            </div>
                        </div>

                    </div>
                    <div class="text-white col d-flex justify-content-center border border-white">
                        <div class="container">
                            <div class="h5 row d-flex justify-content-center border border-white">Current Epoch</div>
                            <div class="h1 row d-flex justify-content-center border border-white">{Number(currentEpoch)}</div>
                            <div class="h1 row d-flex justify-content-center border border-white"><ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" /></div>
                            <div class="h5 row d-flex justify-content-center border border-white">Next Epoch in</div>
                            <div class="row d-flex justify-content-center border border-white">Live Twap:{scalingFactor}</div>
                            <div class="row d-flex justify-content-center border border-white">TVL:$ {TVL}</div>
                            <div class="row d-flex justify-content-center border border-white">Last Epoch TWAP:1.22</div>
                        </div>
                    </div>
                    <div class="text-white col d-flex align-items-end justify-content-center border border-white">
                        <div class="container">
                            <div class="row">
                                <div class="col border border-white">Bomb: 17%</div>
                                <div class="col border border-white">Bomb-BTCB: 17%</div>
                            </div>
                            <div class="row">
                                <div class="col border border-white">BShare: 17%</div>
                                <div class="col border border-white">BShare-BNB: 17%</div>
                            </div>
                            <div class="row">
                                <div class="col border border-white">BBond: 12%</div>
                                <div class="col border border-white">Others: 17%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            {/* Second Container */}
            <BombContainer />

            {/** Third Container */}
            <Farmcontainer />

            {/** Fourth Container */}
            <BondsContainer />

            
        </div>
    )
}

export default Dashboard
