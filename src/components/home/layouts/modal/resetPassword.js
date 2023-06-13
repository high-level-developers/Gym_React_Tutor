import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import img_login from '../../../../assets/images/home/LogInFormBG.png';
import img_login_modal from '../../../../assets/images/home/LogInFormBGMobile.png';
import {AiOutlineCloseCircle, AiFillEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import { t } from "i18next";
import {FaFacebook, FaApple, FaGoogle, FaMobileAlt} from 'react-icons/fa';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import StyledButton from "../../../items/StyledButton";
import FadeIn from 'react-fade-in';
import { resetPassword, logInWithEmailAndPassword, loginwithGoogleAccount, loginWithApple } from "../../../../fiebaseImp/js/firebaseAuth";
import { emailValidator } from "../../../../helpers/emailValidator";
import { useNavigate } from "react-router-dom";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoading from "../../../items/loadingBar";
toast.configure()

const Container = styled('div')`
    width: 980px;
    height: 600px; 
    background: #040404;
    border-radius: 24px;
    background-image: url(${img_login});
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: row;
    padding: 44px;
    .social {
        width: 480px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .text{
            font-size: 24px;
            line-height: 29px;
            color: #F2F2F2;
        }

        .button{
            cursor: pointer;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(254, 202, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            .icon{
                font-size: 20px;
                color: #FECA00;
            }
        }
    }
    .social-group {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
   
    .close {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 14px;
        line-height: 17px;
        color: #F2F2F2;
        cursor: pointer;

        .icon {
            font-size: 24px;
            margin-right: 12px;
        }
    }
    .setting {
        padding: 42px 50px 18px 50px ;
        margin: 40px 40px 40px 60px;
        border-radius: 20px;
        background: #1C1A1D;
        border: 1px solid #3A3A3A;
        width: 300px;

        .title{
            text-align: center;
            font-size: 48px;
            line-height: 48px;
            letter-spacing: 0.01em;
            color: #F2F2F2;
            margin-bottom: 38px;
            .colored{
                color:#FECA00;
                font-style: italic;
            }
        }
        .label {
            font-size: 14px;
            line-height: 100%;
            letter-spacing: 0.01em;
            color: #888888;
            margin-bottom: 4px;
        }
        .label-desc {
            font-size: 24px;
            line-height: 120%;
            margin-top: 100px;
        }
        #reset {
            margin-top: 100px;
        }
        .label-layout {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        .password-input{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            position: relative;
            margin-bottom: 15px;
            .icon {
                position: absolute;
                right: 18px;
                color:#888888;
                font-size: 18px;
            }
            .input{
                margin-bottom: 0px;
            }
        }
        .input{
            background: #1C1A1D;
            border: 1px solid #888888;
            box-sizing: border-box;
            border-radius: 12px;
            width: 300px;
            height: 50px;
            padding-left: 18px;
            color: #888888; 
            margin-bottom: 29px;
        }
       
        .button-layout {
            display: flex;
            align-items: center;
            flex-direction: column;
        }
        .splitter {
            background: #888888;
            height: 1px;
            width: 100%;
            margin-top: 20px;
            margin-bottom: 18px;
        }
        .signup-btn{
            font-size: 24px;
            line-height: 29px;
            letter-spacing: 0.01em;
            color: #F2F2F2;
        }
        .arrow {
            font-size: 18px;
            margin-right: 18px;
        }
        .button{
            margin-right: 0px;
        }

    }
    .login-img{
        background-image: url(${img_login_modal});
        background-size: cover;
        background-repeat: no-repeat;
        display: none;
    }
    .button-layout-mobile{
        display: none;
    }
    .error-msg {
        margin-top: 16px;
        color: red;
        font-size: 14px;
        line-height: 100%;
        padding: 0px 6px;
        visibility: hidden;
        height: 18px;
        margin-bottom: 20px;
        word-wrap: break-word;
    }
    .error-msg.active {
        visibility: visible;
    }
    @media (max-width: 1280px) {
        width: 800px;
    }
    @media (max-width: 1000px) {
        width: 700px;
    }
    @media (max-width: 768px) {
        flex-direction: column;
        background: none;
        width: 340px;
        height: auto;
        .social{
            display: none;
        }
        .login-img {
            display: flex;
            height: 230px;
            padding: 29px;
            justify-content: flex-end;
            align-items: flex-start;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
        }
        .setting{
            margin:0px;
            border-radius: 0px;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
            padding: 19px;
            .title{
                font-size: 36px;
                line-height: 44px;
            }
            .input{
                width: 100%;
            }
            .button-layout{
                display: none;
            }
            .label-desc {
                margin-top: 0px;
            }   
            #reset {
                margin-top: 0px;
            }
        }
        .button-layout-mobile{
            display: flex;
            flex-direction: column;

            .button-group{
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;

                .signup-btn{
                    font-size: 18px;
                    line-height: 22px;
                    .arrow{
                        font-size: 12px;
                        margin-right: 12px;
                    }
                }
                .signup-btn{
                    font-size: 14px;
                    line-height: 17px;
                    padding: 16px 38px;
                    min-width: auto;
                }
            }
            .splitter{
                margin-top: 30px;
                margin-bottom: 12px;
            }
            .button{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: rgba(254, 202, 0, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 10px;
                .icon{
                    font-size: 20px;
                    color: #FECA00;
                }
            }
            .social-btn-group{
                display: flex;
                flex-direction: column;
                align-items: center;
                .text{
                    font-size: 18px;
                    line-height: 22px;
                    color: #F2F2F2;
                }
            }
        }
    }
    @media (max-width: 576px){

    }

`;

const ResetPassword = (props)=>{
    const [isOpen, setIsOpen] = useState(props.isOpen);
    const [loading, setLoading] = useState(false);
    const [isSentEmail, setIsSentEmail] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            document.getElementById("reset").click();
        }
    }

    useEffect(()=>{
        setIsOpen(props.isOpen);
    }, [props])

    const resetStates = () =>{
			setEmail('');
			setError('');
    }

    const hideModal = () => {
        setIsOpen(false);
        resetStates();
        props.close();
    }

    const onResetPassword = ()=>{
        if (!isSentEmail) {
            const emailError = emailValidator(email);
            if(emailError) {
                setLoading(false);
                setError(emailError);
                return;
            }
    
            resetPassword(email)
            .then(() => {
                setIsSentEmail(true);
            });
        } else {
            setIsSentEmail(false);
            hideModal();
        }
    }
    const onGoogle = () =>{
        setLoading(true);
        loginwithGoogleAccount()
        .then(data=>{
            if(data.error === ''){
                toast.success('Login Success','Infomation', { position: toast.POSITION.TOP_RIGHT, autoClose:5000})
                localStorage.setItem('profile', JSON.stringify(data.profile));
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('gender', JSON.stringify([{label: "man", value: "Male"},{label: "woman", value: "Female"}]) );
                hideModal();
                setLoading(false);
                navigate('/dashboard');
            }
        })
    }
    const onFacebook = () => {

    }
    const onApple = () => {
        setLoading(true);
        loginWithApple()
        .then(data => {
            if(data.error === ''){
                toast.success('Login Success','Infomation', { position: toast.POSITION.TOP_RIGHT, autoClose:5000})
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('profile', JSON.stringify(data.profile));
                localStorage.setItem('gender', JSON.stringify([{label: "man", value: "Male"},{label: "woman", value: "Female"}]) );
                hideModal();
                setLoading(false);
                navigate('/dashboard');
            }
        })
    }
    const onMobile = () => {

    }
    return(
        <Modal
            show={isOpen}
            onHide={hideModal}
            centered
            dialogClassName="resetpassword-modal"
            >
                <CustomLoading isStart={loading}/>

                <Container>

                    <div className="social">
                        <div className="close" onClick={hideModal}>
                            <AiOutlineCloseCircle className="icon"/>
                            {t('Close')}
                        </div>
                        <div>
                            <p className="text">
                                {t('Sign in with')}
                            </p>
                            <div className="social-group">
                                <div className="button" onClick={onFacebook}>
                                    <FaFacebook className="icon"/>
                                </div>
                                <div className="button" onClick={onApple}>
                                    <FaApple className="icon"/>
                                </div>
                                <div className="button" onClick={onGoogle}>
                                    <FaGoogle className="icon"/>
                                </div>
                                <div className="button" onClick={onMobile}>
                                    <FaMobileAlt className="icon"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="login-img">
                        <div className="close" onClick={hideModal}>
                            <AiOutlineCloseCircle className="icon"/>
                            {t('Close')}
                        </div>
                    </div>
                    <FadeIn delay={100}
                        className="setting"
                        transitionDuration={300}
                    >
                            
                        <div className="title">
                            <span>
                                {t(`${!isSentEmail ? 'Reset' : 'E-Mail'}`)}
                            </span>
                            <span className="colored">
                                &nbsp;{t(`${!isSentEmail ? 'Password' : 'Sent'}`)}
                            </span>
                        </div>
                        {!isSentEmail ? (
                            <>
                                <span className="label">
                                    {t('e-mail')}
                                </span>
                                <input 
                                    className="input" 
                                    value={email} 
                                    onKeyPress={handleKeyPress}
                                    onChange={e => {
                                        setError('');
                                        setEmail(e.target.value);
                                    }}
                                />
                            </>
                        ) : (
                            <div className="label label-desc">
                                {t('A reset password email has been sent to your email address.!')}
                            </div>
                        )}
                        <div className={error? "error-msg active": "error-msg"}>
                            {error}
                        </div>
                        <div className="button-layout">
                            <StyledButton 
                                active={true} 
                                id="reset"
                                className="button"
                                onClick={onResetPassword}
                            >
                                {t(`${!isSentEmail ? 'Send E-Mail' : 'Close'}`)}
                            </StyledButton>
                        </div>
                        <div className="button-layout-mobile">
                            <div className="button-group">
                                <StyledButton 
                                    active={true} 
                                    className="signup-btn"
                                    onClick={onResetPassword}
                                >
                                    {t(`${!isSentEmail ? 'Send E-Mail' : 'Close'}`)}
                                </StyledButton>
                            </div>
                            <div className="splitter"/>
                            <div className="social-btn-group">
                                <p className="text">
                                    {t('Sign in with')}
                                </p>
                                <div className="social-group">
                                    <div className="button" style={{cursor:"pointer"}} >
                                        <FaFacebook className="icon" onClick={onFacebook}/>
                                    </div>
                                    <div className="button" style={{cursor:"pointer"}} >
                                        <FaApple className="icon" onClick={onApple}/>
                                    </div>
                                    <div className="button" style={{cursor:"pointer"}} >
                                        <FaGoogle className="icon" onClick={onGoogle}/>
                                    </div>
                                    <div className="button" style={{cursor:"pointer"}} >
                                        <FaMobileAlt className="icon" onClick={onMobile}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </Container>
        </Modal>
    );
}

export default ResetPassword;
