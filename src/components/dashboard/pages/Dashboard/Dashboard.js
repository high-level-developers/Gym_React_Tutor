import React, { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {BsCalendarWeekFill} from 'react-icons/bs';
import {AreaChart, XAxis, YAxis,CartesianGrid, Tooltip, Area, ResponsiveContainer} from 'recharts';
import {BiDumbbell} from 'react-icons/bi';
import {IoPerson} from 'react-icons/io5';
import {FaUserTie} from 'react-icons/fa';
import {Container, Months} from './Dashboard.config';






const  CustomTooltip = ({ payload, label, active }) => {
    if (active) {
        return (
            <div style={{width: '100px'}}>
                <p className="label">{`${label} : AED ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
}

const TableItem = () => {
    const {t} = useTranslation();
    return(
        <div className="table-item">
            <div className="user">
                <div className="user-image"></div>
                <span className="user-name desktop">
                    Biffco Enterprises Ltd.
                </span>
                <div className="user-info">
                    <span className="user-name">
                        Biffco Enterprises Ltd.
                    </span>
                    <div className="customers">
                        <span>
                            60
                        </span>
                        <span className="label">
                            {t('customers')}
                        </span>
                    </div>
                </div>
            </div>
            <div className="customers desktop">
                <span>
                    60
                </span>
                <span className="label">
                    {t('customers')}
                </span>
            </div>
            <span>
                {'AED ' + (2456.00).toFixed(2).toLocaleString('en-US')}
            </span>
        </div>
    );
}

const Dashboard = () => {
    const {t} = useTranslation();
    const [gymNum, setGymNum] = useState(150);
    const [trainerNum, setTrainerNum] = useState(52);
    const [customerNum, setCustomerNum] = useState(1500);

    const renderCustomAxisYTick = ({ x, y, payload }) => {

        let text ='AED ' +
            (payload.value % 1000? (payload.value / 1000).toFixed(1) :
                payload.value/1000)  + 'k';
        return (
            <text orientation="left"
                  type="number" x={x} y={y} stroke="none" fill="#F2F2F2"
                  className="recharts-text recharts-cartesian-axis-tick-value"
                  textAnchor="end">
                <tspan x={x} dy="0.355em">
                    {text}
                </tspan>
            </text>
        );
    };
    const renderCustomAxisXTick = ({ x, y, payload }) => {
        return (
            <text orientation="bottom"
                  type="number" x={x} y={y} stroke="none" fill="#F2F2F2"
                  className="recharts-text recharts-cartesian-axis-tick-value"
                  textAnchor="middle">
                <tspan x={x} dy="0.71em">
                    {payload.value}
                </tspan>
            </text>
        );
    };

    return(
        <Container>
            <div className="header">
                <span className="title">
                    {t('Dashboard')}
                </span>
                <div className="duration">
                    <div className="group">
                        <BsCalendarWeekFill/>
                        <span className="date"> September 9, 2022 </span>
                    </div>
                    <span className="split">
                        {t('to')}
                    </span>
                    <div className="group">
                        <BsCalendarWeekFill/>
                        <span className="date"> November 7, 2022 </span>
                    </div>
                </div>
            </div>
            <div className="chart">
                <ResponsiveContainer width="100%" height={340}>
                    <AreaChart data={Months}
                               margin={{ top: 60, right: 30, left: 30, bottom: 15 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="30%" stopColor="#FFE402" stopOpacity={0.27}/>
                                <stop offset="95%" stopColor="#1C1A1D" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tickLine={false} axisLine={false} fill='#F2F2F2'
                               tick={renderCustomAxisXTick} />
                        <YAxis axisLine={false} tickLine={false} tick={renderCustomAxisYTick} fill='#F2F2F2'/>
                        <CartesianGrid vertical={false} stroke='#1C1A1D' />
                        <Tooltip content={<CustomTooltip/>}/>
                        <Area type="monotone" dataKey="price" stroke="#D9D9D9" fillOpacity={2} fill="url(#colorUv)"
                              dot={{ stroke: '#D9D9D9', strokeWidth: 2 }} strokeWidth={2} />

                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="content">
                <div className="item-group">
                    <div className="item">
                        <div className="icon"
                             style={{backgroundColor: '#13335F'}}>
                            <BiDumbbell className="dumbbell"/>
                        </div>
                        <span className="text">
                            {t('Total GYM’s')}
                        </span>
                        <span className="number dumbbell">
                            {gymNum}
                        </span>
                    </div>
                    <div className="item">
                        <div className="icon"
                             style={{backgroundColor: '#5E2323'}}>
                            <FaUserTie className="trainer" />
                        </div>
                        <span className="text">
                            {t('Total Trainer')}
                        </span>
                        <span className="number trainer">
                            {trainerNum}
                        </span>
                    </div>
                    <div className="item">
                        <div className="icon"
                             style={{backgroundColor: '#104626'}}>
                            <IoPerson className="person"/>
                        </div>
                        <span className="text">
                            {t('Total Customer')}
                        </span>
                        <span className="number person">
                            {customerNum}
                        </span>
                    </div>
                </div>
                <div className="table-layout">
                    <div className="table-header">
                        <span className="title">
                            {t('Top  GYM’s')}
                        </span>
                        <span className="button">
                            {t('view all')}
                        </span>
                    </div>
                    <div className="table-content">
                        <TableItem/>
                        <TableItem/>
                        <TableItem/>
                        <TableItem/>
                        <TableItem/>
                        <TableItem/>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Dashboard;
