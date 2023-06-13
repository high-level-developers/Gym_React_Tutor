import React, {useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import CustomSelect from "../item/CustomSelect";
import UserTypes from "../../../../const/userType";
import { emailValidator } from "../../../../helpers/emailValidator";
import CustomLoading from "../../../items/loadingBar";
import {signUpWithEmailAndPassword} from "../../../../fiebaseImp/js/firebaseAuth";
import PhoneInput from 'react-phone-input-2'


const Container = styled('div')`
    width: 498px;
    height: 600px;
    background-color: black;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    padding: 30px 40px;
    .header {
        font-weight: bold;
        font-size: 24px;
        line-height: 29px;
        text-transform: uppercase;
        color: #F2F2F2;
    }
    .content {
        display:flex;
        flex-direction: column;
        margin-top: 25px;
    }
    .label{
        font-size: 14px;
        line-height: 100%;
        letter-spacing: 0.01em;
        color: #888888;
        margin-bottom: 8px;
    }
    .input {
        color: #888888;
        background: #1C1A1D;
        border-radius: 12px;
        border: 1px solid #888888;
        height: 50px;
        padding-left: 10px;
        margin-bottom: 20px;
    }
    .button{
        cursor: pointer;
        width: 110px;
        height: 50px; 
        display: flex;
        justify-content: center;
        align-items: center;
        color: #F2F2F2;
        font-size: 18px;
        line-height: 22px;
        border-radius: 10px;
        border: 1px solid #888888;
        margin-left: 16px;
    }
    .button.active{
        text-transform: uppercase;
        color: #000000;
        background: #FECA00;
        border: none;
    }
    .button-group{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        margin-top: 30px;
    }
    .input-select {
        margin-bottom: 20px;
    }
    .error {
        border-color: red !important;
    }
    .message {
        display: flex;
        align-items: center;
        margin-top: 10px;
        height: 20px;
    }
    .error-msg {
        font-size: 14px;
        line-height: 100%;
        letter-spacing: 0.01em;
        color: red;
    }
    .success-msg {
        font-size: 14px;
        line-height: 100%;
        letter-spacing: 0.01em;
        color: #F2F2F2;
    }
    @media (max-width: 768px) {
        width: 300px;
        height: unset;
        .header {
            margin-bottom: 20px;
        }
        
        .button {
            margin-right: 0px;
        }
        .button-group {
            justify-content: space-between;
            margin-top: 50px;
        }
    }
  .phone-input{
    background-color: #1C1A1D;
    color: #888888;
    width: 100%;
    border: none;
    border-radius: 12px;
    height: 48px;
  }
  .phone-container{
    color: #888888;
    background: #1C1A1D;
    border-radius: 12px;
    border: 1px solid #888888;
    height: 50px;
    padding-left: 10px;
    margin-bottom: 20px;
  }
  .phone-button{
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    background: #1C1A1D;
    border: none;

    &:hover, &:active, &:focus{
      background: #1C1A1D;
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
    }
  }
  .phone-button.open{
    background: #1C1A1D;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  .react-tel-input .flag-dropdown.open{
    background: #1C1A1D;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  .react-tel-input .selected-flag:hover, .react-tel-input .selected-flag:focus {
    background: #1C1A1D;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  .react-tel-input .flag-dropdown.open .selected-flag
  {
    background: #1C1A1D;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  .phone-dropdown{
    background: #1C1A1D;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background-color: #888888;
      border-radius: 100px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 100px;
      background-color: #FFCC00;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.8);
    }
  }
  .react-tel-input .country-list .country:hover {
    background-color: #302d2d;
  }
  .react-tel-input .country-list .country.highlight {
    background-color: #424141;
  }
  
`;
const BranchUserTypes = [
    {
        value: 1,
        label: 'Trainer',
    },
    {
        value: 6,
        label: 'Gym Manager',
    }
]

const AddUser = (props) => {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [type, setType] = useState([]);
    const [membership, setMembership] = useState('');

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [mobileError, setMobileError] = useState(false);
    const [typeError, setTypeError] = useState(false);
    const [membershipError, setMembershipError] = useState(false);

    const [createSuccess, setCreateSuccess] = useState(false);
    const [createError, setCreateError] =  useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [disable, setDisable] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setIsOpen(props.isOpen);
    }, [props]);

    const resetStates = ()=>{
        setName('');
        setEmail('');
        setMobile('');
        setType([]);
        setMembership('');
        setNameError(false);
        setEmailError(false);
        setMobileError(false);
        setTypeError(false);
        setMembershipError(false);
        setDisable(false);
    }
    const hideModal = () => {
        resetStates();
        setIsOpen(false);
        emptyMessage();
        props.close();
    }

    const emptyMessage = () => {
        setCreateSuccess(false);
        setCreateError(false);
    }

    const onSelectType = (data) => {
        setTypeError(false);
        emptyMessage();
        let temp = [];
        data.forEach(element => {
            temp.push(element.value);
        });
        console.log("roles :", temp);
        setType(temp);
    }

    const onSelectMembership = (data) => {
        setMembershipError(false);
        emptyMessage();
        if(!props.role.includes(3) && props.role.includes(4)){
            setMembership(data.value);
        }
    }

    const onSave = async () => {
        if (disable)
            return;
        setLoading(true);
        if (
            name === '' ||
            mobile === '' ||
            emailValidator(email) ||
            type.length === 0
        ) {
            setNameError(name === '')
            setEmailError(emailValidator(email))
            setMobileError(mobile === '')
            setTypeError(type.length === 0)
            setMembershipError(membership === '')
            setLoading(false);
            return;
        }
        if (type.includes(5)) {
            if (membership === '') {
                setMembershipError(membership === '')
            }
        }

        setDisable(true);
        let user = {
            sure_name: name,
            username: email,
            phone: mobile,
            role:type
        }
        if(props.gymID !== undefined) {
            user = {...user, gym_id: props.gymID};
        }


        await signUpWithEmailAndPassword(user, "123456").then((data) => {
            if (data.error) {
                setCreateError(true);
                setDisable(false);
                setErrorMessage(data.error)
            } else {
                setCreateSuccess(true);
                setDisable(false);
                resetStates();
                props.refresh();
                setIsOpen(false);
                emptyMessage();
                props.close();
            }
            setLoading(false);

        }).catch(e => {
            setCreateError(true);
        });

    }
    return (
        <Modal
        show={isOpen}
        onHide={hideModal}
        centered
        dialogClassName="login-modal"
        >
            <CustomLoading isStart={loading}/>

            <Container>
                <div className="header">
                    {t('Add user')}
                </div>
                <div className="content">
                    <span className="label">
                        {t('Name')}
                    </span>
                    <input className={nameError? "input error" : "input"}
                        value={name}
                        onChange={e => {
                            emptyMessage();
                            setNameError(false);
                            setName(e.target.value);
                        }}/>
                    <span className="label">
                        {t('Email')}
                    </span>
                    <input className={emailError? "input error": "input"}
                        type="email" value={email}
                        onChange={e=>{
                            setEmailError(false);
                            emptyMessage();
                            setEmail(e.target.value);
                        }}/>
                    <span className="label">
                        {t('Mobile')}
                    </span>
                    <PhoneInput
                        country={'ae'}
                        value={mobile}
                        containerClass={mobileError? "input error": "phone-container"}
                        inputClass="phone-input"
                        buttonClass="phone-button"
                        dropdownClass="phone-dropdown"
                        onChange={phone =>{
                            setMobile(phone);
                            setMobileError(false);
                        }}
                    />
                    <span className="label">
                        {t('Type')}
                    </span>
                    <CustomSelect options={props.role.includes(4) ? UserTypes : BranchUserTypes} placeholder={''}
                        className={typeError? "input-select error" : "input-select"}
                        isMulti={true} onChange={onSelectType}/>

                    {type.includes(5)  && (
                        <React.Fragment>
                            <span className="label">{t('Membership')}</span>
                            <CustomSelect
                                options={props.memberships}
                                placeholder={''}
                                className={
                                membershipError ? 'input-select error' : 'input-select'
                                }
                                onChange={onSelectMembership}
                            />
                        </React.Fragment>
                    )}
                </div>
                <div className="message">
                    {
                        createError &&
                        <span className="error-msg">
                            {t('Cannot create a new user')}, {errorMessage}
                        </span>

                    }
                    {
                        createSuccess &&
                        <span className="success-msg">
                            {t('New User is created successfully.')}
                        </span>
                    }
                </div>
                <div className="button-group">
                    <span className="button" onClick={hideModal}>
                        {t('Cancel')}
                    </span>
                    <span className="button active" onClick={onSave}>
                        {t('Save')}
                    </span>
                </div>
            </Container>
        </Modal>
    );
}

export default AddUser;
