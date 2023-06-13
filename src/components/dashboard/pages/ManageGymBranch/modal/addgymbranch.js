import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Modal} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import MapPicker from 'react-google-map-picker';
import FadeIn from 'react-fade-in';
import {FiDownload} from 'react-icons/fi';
import {saveGym, createGymId, deleteGymById} from "../../../../../fiebaseImp/js/gym";
import {getGymInfo, getGymsOption} from "../../../../../fiebaseImp/js/gym_main";
import {exportComponentAsPNG} from 'react-component-export-image';
import Geocode from "react-geocode";
import CustomQRCode from "../../item/CustomQRCode";
import CustomSelect from "../../item/CustomSelect";
import CustomLoading from "../../../../items/loadingBar";

const Container = styled('div')`
  width: 828px;
  height: 100%;
  border-radius: 20px;
  background: black;
  display: flex;
  flex-direction: row;
  overflow: hidden;

  .modal-backdrop {
    opacity: 0.2 !important;
  }

  .panel {
    width: 50%;
    display: flex;
    position: relative;
    flex-direction: column;
  }

  .error {
    border-color: red !important;
  }

  .title {
    font-weight: bold;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    color: #F2F2F2;
    padding: 20px 25px;
  }

  .setting {
    display: flex;
    flex-direction: column;
    padding: 25px 30px;

    .cost-panel {
      display: flex;
      justify-content: space-between;

      .cost-item {
        width: 45%;
        display: flex;
        position: relative;
        flex-direction: column;
      }
    }

    .label {
      font-size: 14px;
      line-height: 100%;
      letter-spacing: 0.01em;
      color: #888888;
      margin-bottom: 8px;
      margin-top: 10px;
    }

    .input {
      color: #888888;
      background: #1C1A1D;
      border-radius: 12px;
      border: 1px solid #888888;
      height: 50px;
      padding-left: 10px;
    }

    .qr-button {
      font-size: 18px;
      line-height: 22px;
      color: #F2F2F2;
      height: 130px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1C1A1D;
      border: 1px solid #888888;
      border-radius: 12px;
      margin-top: 36px;
    }

    .qr-button.disable {
      display: none;
    }

    .qr-generated.disable {
      display: none;
    }

    .qr-generated {
      font-size: 18px;
      line-height: 22px;
      color: #F2F2F2;
      height: 130px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #1C1A1D;
      border: 1px solid #888888;
      border-radius: 12px;
      margin-top: 36px;

      .content-layout {
        display: flex;
        flex-direction: row;
        align-items: center;

        .qr-image {
          width: 30px;
          height: 30px;
          margin-right: 4px;
          color: #888888;
        }

        .text {
          font-size: 18px;
          line-height: 140%;
          letter-spacing: 0.01em;
          color: #888888;
        }
      }

      .button-group {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 14px;
        line-height: 160%;
        letter-spacing: 0.01em;
        color: #F2F2F2;
        margin-top: 30px;

        .download {
          display: flex;
          flex-direction: row;
          margin-right: 25px;

          .icon {
            font-size: 18px;
            color: #F2F2F2;
            margin-right: 6px;
          }
        }

        .delete {
          margin-left: 25px;
          color: #F03F3F;
        }
      }
    }

    .button {
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

    .button.active {
      text-transform: uppercase;
      color: #000000;
      background: #FECA00;
      border: none;
    }

    .button-group {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      margin-top: 68px;
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
  }

  .gmnoprint {
    display: none;
  }

  .map-title {
    position: absolute;
    left: 19px;
    top: 27px;
    font-size: 18px;
    line-height: 22px;
    color: #F2F2F2;
    z-index: 10;
  }

  .title-mobile {
    display: none;
  }

  @media (max-width: 1180px) {
    width: 600px;
  }
  @media (max-width: 768px) {
    width: 360px;
    border-radius: 0px;
    height: unset;
    flex-direction: column-reverse;
    .panel {
      width: unset;
      height: 360px;

      .title {
        display: none;
      }

      .button {
        margin-left: 0px;
      }

      .button-group {
        margin-top: 30px;
        justify-content: space-between;
      }
    }

    .title-mobile {
      padding: 18px 20px;
      display: unset;
      font-size: 18px;
      line-height: 22px;
      letter-spacing: 0.01em;
      text-transform: uppercase;
      color: #F2F2F2;
    }
  }

`;

const DEFAULT_LOCATION = {lat: 25.2048, lng: 55.2708};
const DEFAULT_ZOOM = 9;

const Addgymbranch = (props) => {

    const {t} = useTranslation();
    const user = JSON.parse(localStorage.getItem('profile'));
    const qrRef = useRef();
    const GOOGLE_MAP_API_KEY = 'AIzaSyDQ4WBaFAr6HqsjFOiAc_8jXxBUgLel-TM';
    Geocode.setApiKey(GOOGLE_MAP_API_KEY);
    Geocode.setLanguage('en');

    //Form attributes
    const [name, setName] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [visitCost, setVisitCost] = useState(0);
    const [attendanceCost, setAttendanceCost] = useState(0);
    const [location, setLocation] = useState(DEFAULT_LOCATION);
    const [mainBranchID, setMainBranchID] = useState('');
    const [gender, setGender] = useState('');

    // Input Error/Success Messages
    const [nameError, setNameError] = useState(false);
    const [qrCodeError, setQrCodeError] = useState(false);
    const [genderError, setGenderError] = useState(false);
    const [visitCostError, setVisitCostError] = useState(false);
    const [attendanceCostError, setAttendanceCostError] = useState(false);
    const [mainBranchIDError, setMainBranchIDError] = useState(false);
    const [createError, setCreateError] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [memError, setMemError] = useState(false);

    // Utilities
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [isCreated, setIsCreated] = useState(false);
    const [disable, setDisable] = useState(false);
    const genderOptions = [{label: "Male", value: "Male"}, {label: "Female", value: "Female"}];
    const [loading, setLoading] = useState(false);
    const [gymsOptions, setGymsOptions] = useState();


    const gymOptions = async () => {
        let options = await getGymsOption();
        return (options);
    };

    useEffect(() => {
        setIsOpen(props.isOpen);
        gymOptions().then((options) => {
            setGymsOptions(options);
            console.log(gymsOptions);
        })


    }, [props]);

    const resetStates = () => {
        if (qrCode !== '') {
            deleteGymById(qrCode);
        }
        setIsOpen(false);
        setNameError('');
        setName('');
        setQrCode('');
        setQrCodeError('');
        setLocation(DEFAULT_LOCATION);
        setStep(1);
        setCreateError(false);
        setCreateSuccess(false);
        setIsCreated(false);
        setDisable(false);
    }

    const hideModal = () => {
        resetStates();
        if (isCreated) {
            props.refresh();
        }
        props.close();
    }

    const onCreateQRCode = () => {
        setCreateError(false);
        setQrCodeError(false);
        setCreateSuccess(false);
        if (qrCode !== '') {
            deleteGymById(qrCode);
        }
        createGymId()
            .then((data) => {
                setQrCode(data.id);
                setStep(2);
            })
    }

    const onDeleteQRCode = () => {
        if (qrCode !== '') {
            deleteGymById(qrCode);
        }
        setStep(1);
    }

    const handleChangeLocation = (lat, lng) => {
        setLocation({lat: lat, lng: lng});
    }


    const onCreate = async () => {
        let userID = user.id;
        if (disable)
            return;
        setLoading(true);
        if (name === '' || qrCode === '' || gender === '' || attendanceCost <= 0 || visitCost <= 0) {
            setNameError(name === '');
            setQrCodeError(qrCode === '');
            setLoading(false);
            setGenderError(gender === '');
            setAttendanceCostError(attendanceCost <= 0);
            setVisitCostError(visitCost <= 0);
            return;
        }
        setDisable(true);
        if (user.role.includes(4)) {
            if (mainBranchID === '') {
                setMainBranchIDError(mainBranchID === '');
                setLoading(false);
                setDisable(false);
                return;
            }
            await getGymInfo(mainBranchID).then((mainBranch) => {
                console.log("Found Main Branch :", mainBranch);
                userID = mainBranch.owner;

            });
        }

        Geocode.fromLatLng(location.lat, location.lng)
            .then((response) => {
                const address = response.results[0].formatted_address;
                setLoading(false);

                return saveGym(qrCode, name, address, location, userID, visitCost, attendanceCost, mainBranchID);
            })
            .then(data => {
                if (data.success === 'success') {
                    setQrCode('');
                    setStep(1);
                    setCreateSuccess(true);
                    setIsCreated(true);
                    setName('');
                    setDisable(false);

                    props.refresh();
                    props.close();
                    setCreateError(false);
                    setCreateSuccess(false);
                    setIsOpen(false);
                    setLoading(false);
                } else {
                    setLoading(false);
                    setCreateError(true);
                }
            })
            .catch(error => {
                console.log(error);
            });

    }

    const onDownload = () => {
        exportComponentAsPNG(qrRef, {fileName: 'QR CODE'});
    }

    const onInputName = (e) => {
        setCreateError(false);
        setCreateSuccess(false);
        setNameError(false);
        setName(e.target.value);
    }

    const onInputVisit = (e) => {
        setCreateError(false);
        setCreateSuccess(false);
        setVisitCostError(false);
        setVisitCost(e.target.value);
    }

    const onInputAttendance = (e) => {
        setCreateError(false);
        setCreateSuccess(false);
        setAttendanceCostError(false);
        setAttendanceCost(e.target.value);
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
                <div className="panel">
                    <span className="title">
                        {t('Add GYM')}
                    </span>
                    <div className="setting">
                        <span className="label">
                            {t('GYM name')}
                        </span>
                        <input className={nameError ? "input error" : "input"}
                               value={name}
                               onChange={e => onInputName(e)}/>
                        <div className="cost-panel">
                            <div className="cost-item">
                                <span className="label">
                                    {t('VISIT cost')}
                                </span>
                                <input className={visitCostError ? "input error" : "input"}
                                       value={visitCost}
                                       type="number" pattern="[+-]?\d+(?:[.,]\d+)?"
                                       onChange={e => onInputVisit(e) }/>
                            </div>
                            <div className="cost-item">
                                <span className="label">
                                    {t('ATTENDANCE cost')}
                                </span>
                                <input className={attendanceCostError ? "input error" : "input"}
                                       value={attendanceCost}
                                       type="number" pattern="[+-]?\d+(?:[.,]\d+)?"
                                       onChange={e => onInputAttendance(e)}/>
                            </div>
                        </div>
                        <div className={step === 1 ? (qrCodeError ? "qr-button error" : "qr-button")
                            : "qr-button disable"}
                             onClick={onCreateQRCode}>
                            {t('Generate QR code')}
                        </div>
                        <FadeIn delay={100}
                                className={step === 2 ? "qr-generated" : "qr-generated disable"}
                                transitionDuration={300} visible={step === 2}>
                            <div className="content-layout">
                                <CustomQRCode containerClass="qr-image" size={30}
                                              qrCode={qrCode} ref={qrRef}/>
                                <span className="text">
                                    {t('QR code was generated !')}
                                </span>
                            </div>
                            <div className="button-group">
                                <div className="download" onClick={onDownload}>
                                    <FiDownload className="icon"/>
                                    {t('Download')}
                                </div>
                                <span onClick={onCreateQRCode}>
                                    {t('Generate New')}
                                </span>
                                <span className="delete" onClick={onDeleteQRCode}>
                                    {t('Delete')}
                                </span>
                            </div>
                        </FadeIn>
                        <br/>
                        <CustomSelect
                            options={genderOptions}
                            className={genderError ? "input-select error" : "input-select"}
                            placeholder={'Gender'}
                            onChange={(e) => {
                                setGenderError(false);
                                setGender(e.value)
                            }}
                        />
                        <br/>
                        {user.role.includes(4) &&
                        <CustomSelect
                            className={mainBranchIDError ? "input-select error" : "input-select"}
                            isSearch={true}
                            options={gymsOptions}
                            placeholder="Select Main Branch"
                            onChange={(e) => {
                                setMainBranchIDError(false);
                                setMainBranchID(e.value)
                            }}
                        />}

                        <br/>
                        <div className="message">
                            {createError &&
                            <span className="error-msg">
                                    {t('Cannot create a new gym. Try again.')}
                                </span>
                            }
                            {
                                createSuccess &&
                                <span className="success-msg">
                                    {t('New Gym is created successfully.')}
                                </span>
                            }
                        </div>


                        <div className="button-group">
                            <span className="button" onClick={hideModal}>
                                {t('Cancel')}
                            </span>
                            <span className="button active" onClick={onCreate}>
                                {t('Create')}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="panel">
                    <span className="map-title">
                        {t('Location')}
                    </span>
                    <MapPicker
                        defaultLocation={DEFAULT_LOCATION}
                        zoom={DEFAULT_ZOOM}
                        mapTypeId="roadmap"
                        onChangeLocation={handleChangeLocation}
                        apiKey={GOOGLE_MAP_API_KEY}
                        className="map-board"
                        style={{height: '100%'}}/>
                </div>
                <span className="title-mobile">
                    {t('Add GYM')}
                </span>

            </Container>
        </Modal>
    )
}

export default Addgymbranch;
