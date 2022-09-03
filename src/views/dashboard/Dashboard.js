import React, { useMemo, useState } from 'react';
import useBombStats from '../../hooks/useBombStats';
import useBondStats from '../../hooks/useBondStats';
import usebShareStats from '../../hooks/usebShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
// import { Bomb as bombTesting } from '../../bomb-finance/deployments/deployments.testing.json';
//import { Bomb as bombProd } from '../../bomb-finance/deployments/deployments.mainnet.json';
import { roundAndFormatNumber } from '../../0x';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
//import { ReactComponent as IconTelegram } from '../../assets/img/telegram.svg';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import moment from 'moment';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import ProgressCountdown from './components/ProgressCountdown';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
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
        <div className="container">
                
                    {/* First Container*/}
                    <div classname="container text-white">
                        <div class='h4 text-white d-flex justify-content-center'> Bomb Finance Summary</div>
                        <br></br>
                        <div class="row justify-content-space-around border border-white">
                            <div class="text-white col d-flex justify-content-center">
                                <div class="container">
                                    <div class="row">
                                        <div class="col"></div>
                                        <div class="col text-sm">Current Supply</div>
                                        <div class="col">Total Supply</div>
                                        <div class="col">Price</div>
                                        <div class="col"></div>
                                    </div>
                                    <div class="row">
                                        <div class="col">$BOMB</div>
                                        <div class="col">{roundAndFormatNumber(bombCirculatingSupply, 2)}</div>
                                        <div class="col">{roundAndFormatNumber(bombTotalSupply, 2)}</div>
                                        <div class="col">${bombPriceInDollars ? roundAndFormatNumber(bombPriceInDollars, 2) : '-.--'} BOMB</div>
                                        <div class="col"><img alt="metamask fox" style={{ marginTop: '10px', width: '25px' }} src={MetamaskFox} /></div>
                                    </div>
                                    <div class="row">
                                        <div class="col">$BSHARE</div>
                                        <div class="col">{roundAndFormatNumber(bShareCirculatingSupply, 2)}</div>
                                        <div class="col">{roundAndFormatNumber(bShareTotalSupply, 2)}</div>
                                        <div class="col">${bSharePriceInDollars ? bSharePriceInDollars : '-.--'} / BSHARE</div>
                                        <div class="col"><img alt="metamask fox" style={{ marginTop: '10px', width: '25px' }} src={MetamaskFox} /></div>
                                    </div>
                                    <div class="row">
                                        <div class="col">$BBOND</div>
                                        <div class="col">{roundAndFormatNumber(tBondCirculatingSupply, 2)}</div>
                                        <div class="col">{roundAndFormatNumber(tBondTotalSupply, 2)}</div>
                                        <div class="col">${tBondPriceInDollars ? tBondPriceInDollars : '-.--'} / BBOND</div>
                                        <div class="col"><img alt="metamask fox" style={{ marginTop: '10px', width: '25px' }} src={MetamaskFox} /></div>
                                    </div>
                                </div>

                            </div>
                            <div class="text-white col d-flex justify-content-center">
                                <div class="container">
                                    <div class="h5 row d-flex justify-content-center">Current Epoch</div>
                                    <div class="h1 row d-flex justify-content-center">{Number(currentEpoch)}</div>
                                    <div class="h1 row d-flex justify-content-center"><ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" /></div>
                                    <div class="h5 row d-flex justify-content-center">Next Epoch in</div>
                                    <div class="row d-flex justify-content-center">Live Twap:{scalingFactor}</div>
                                    <div class="row d-flex justify-content-center">TVL:$ {TVL}</div>
                                    <div class="row d-flex justify-content-center">Last Epoch TWAP:1.22</div>
                                </div>
                            </div>
                            <div class="text-white col d-flex align-items-end justify-content-center">
                                <div class="container">
                                    <div class="row">
                                        <div class="col">Bomb: 17%</div>
                                        <div class="col">Bomb-BTCB: 17%</div>
                                    </div>
                                    <div class="row">
                                        <div class="col">BShare: 17%</div>
                                        <div class="col">BShare-BNB: 17%</div>
                                    </div>
                                    <div class="row">
                                        <div class="col">BBond: 12%</div>
                                        <div class="col">Others: 17%</div>
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
