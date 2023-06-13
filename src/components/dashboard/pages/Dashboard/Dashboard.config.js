import styled from "styled-components";

export const Container = styled('div')`
    background: '#1C1A1D';
    width: calc(100% - 310px);
    border-left: 2px solid #1C1A1D;
    .header {
        height: 30px; 
        padding: 20px 39px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: black;
        border-bottom: 1px solid #1C1A1D;
        .title {
            font-weight: bold;
            font-size: 24px;
            line-height: 29px;
            letter-spacing: 0.01em;
            text-transform: uppercase;
            color: #F2F2F2;
        }
        .duration {
            font-weight: normal;
            font-size: 18px;
            line-height: 22px;
            letter-spacing: 0.01em;
            color: #888888;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .split {
                margin: 0px 20px;
            }
            .group{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .date{
                    margin-left: 13px;
                }
            }
        }
    } 
    .chart {
        width: 100%;
        height: 340px;
        background-color: black;
        color:#F2F2F2;
    }
    .content {
        padding: 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .item-group {
            width: 380px;
            display: flex;
            flex-direction: column;
            & > * {
                margin-bottom: 20px;
            }
        }
        .item{
            padding: 20px;
            border-radius: 15px;
            background: black;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            .icon {
                display: flex;
                justify-content: center;
                align-items: center;
                min-width: 40px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 16px;
                font-size: 20px;
                .dumbbell {
                    color: #2F80ED;
                    border-radius: 0.8px;
                    transform: rotate(-30deg);
                }
                .trainer {
                    color: #e50f0f;
                }
                .person {
                    color: #18c36c;
                }
            }
            .text {
                width: 150px;
                font-size: 24px;
                line-height: 29px;
                letter-spacing: 0.01em;
                text-transform: uppercase;
                color: #888888;
                text-align: left;
            }
            .number {
                font-weight: bold;
                font-size: 64px;
                line-height: 100%;
                letter-spacing: 0.01em;
                text-transform: uppercase;
                word-wrap: break-word;
                color: #F2F2F2;
            }
            .number.dumbbell {
                color: #2F80ED;
            }
            .number.trainer {
                color: #e50f0f;
            }
            .number.person {
                color: #18c36c;
            }
        }
        .table-layout{
            border-radius: 15px;
            background-color: black;
            width: 100%;
            margin-left: 24px;
            padding: 20px;
            .table-header {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 10px 0px 20px;
                border-bottom: 1px solid #1C1A1D;
                .title {
                    font-size: 18px;
                    line-height: 22px;
                    color: #F2F2F2;
                }
                .button {
                    cursor: pointer;
                    text-align: right;
                    letter-spacing: 0.01em;
                    text-transform: uppercase;
                    text-align: right;
                    letter-spacing: 0.01em;
                    text-transform: uppercase;
                    color: #888888;
                }
            }
            .table-content {
                display: flex;
                flex-direction: column;
                .table-item {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #1C1A1D;
                    padding: 5px 0;
                    font-size: 18px;
                    line-height: 22px;
                    letter-spacing: 0.01em;
                    color: #F2F2F2;
                    .user {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        .user-image {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            background-color: #1C1A1D;
                            margin-right: 16px;
                        }
                        .user-name {
                            position: relative;
                            width: 140px;
                            height: 22px;
                            overflow: hidden;
                            &:before{
                                position: absolute;
                                content: '';
                                width: 100%;
                                left: 0;
                                height: 100%;
                                top: 0;
                                background: linear-gradient(90deg, transparent, 
                                    transparent 60%,black);
                            }
                        }
                        .user-info {
                            display: none;
                            flex-direction: column;
                        }
                    }
                    .customers {
                        display: flex;
                        flex-direction: row;
                        align-items:center;
                        .label{
                            margin-left: 5px;
                            font-size: 14px;
                            line-height: 160%;
                            color: #969696;
                        }
                    }
                }
            }
        }
    }
    @media (max-width: 1180px){
        width: 100%;
        .item-group{
            .item{
                .text {
                    font-size: 20px;
                    width: 100px;
                }
                .number {
                    font-size: 36px;
                }
            }
        }
    }
    @media (max-width: 768px) {
        .header {
            flex-direction: column;
            align-items: flex-start;
            height: unset;
            .title {
                font-size: 18px;
                margin-bottom: 22px;
            }
            .duration {
                font-size: 14px;
            }   
        }
        .content {
            padding: 10px;
            flex-direction: column;
            .item-group {
                flex-direction: row;
                width: unset;
                justify-content: space-around;
                .item{
                    padding: 10px;
                    max-width: 110px;
                    flex-direction: column;
                    & > * {
                        margin-bottom: 5px;
                    }
                    .text {
                        width: 80px;
                        font-size: 14px;
                        line-height: normal;
                        color: #F2F2F2;
                        font-weight: normal;
                    }
                }
            }
            .table-layout {
                margin-left: 0px;
                width: unset;
                .table-content {
                    .table-item {
                        font-size: 14px;
                        .user{
                            .user-info {
                                display: flex;
                                .user-name {
                                    font-size: 14px;
                                }
                                .customers {
                                    font-size: 14px;
                                }
                            }
                            .user-name.desktop {
                                display: none;
                            }
                        }
                        .customers.desktop {
                            display: none;
                        }
                    }
                }
               
            }
            
        }
    }
`;


export const Months = [
    {
        name: 'Jan',
        price: 13000,
    },
    {
        name: 'Feb',
        price: 10000,
    },
    {
        name: 'Mar',
        price: 5000,
    },
    {
        name: 'Apr',
        price: 14000,
    },
    {
        name: 'May',
        price: 6000,
    },
    {
        name: 'Jun',
        price: 20000,
    },
    {
        name: 'Jul',
        price: 23000,
    },
    {
        name: 'Aug',
        price: 20000,
    },
    {
        name: 'Sep',
        price: 21000,
    },
    {
        name:'Oct',
        price: 23000,
    },
    {
        name: 'Nov',
        price: 26000,
    },
    {
        name: 'Dec',
        price: 30000,
    }
];
