import React, { useState, useEffect } from 'react';
import ReactImageUploading from 'react-images-uploading';
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { MdDelete, MdChangeCircle } from 'react-icons/md';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import memberShipImage from '../../../../assets/images/dasbhboard/memberShipImage.jpg';
import CustomLoading from "../../../items/loadingBar";

import { saveGymInfo, createGymId, getGymInfo, updateMemberShipCard, getMainGymIDByUser } from '../../../../fiebaseImp/js/gym_main';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

toast.configure();


const Container = styled('div')`
    display: flex;
    width: 100%;
    flex-direction: column;
    .content {
        padding: 20px;
        display: flex;
        flex-direction: row;
    }
    .btn{
        width: 150px;
        height: 45px; 
        display: flex;
        justify-content: center;
        align-items: center;
        color: #F2F2F2;
        font-size: 18px;
        line-height: 22px;
        border-radius: 10px;
        border: 1px solid #888888;
        margin:auto;
    }
    .btn.active{
        text-transform: uppercase;
        color: #000000;
        background: #FECA00;
        border: none;
    }
    .image-content {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px 30px;
        gap: 30px 0px;
        background: black;
        border-radius: 25px;
        margin-right: 20px;
        .image {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 1px solid #F2F2F2;
            object-fit: cover;
        }
        .button{
            width: 100px;
            height: 40px; 
            display: flex;
            justify-content: center;
            align-items: center;
            color: #F2F2F1;
            font-size: 18px;
            line-height: 22px;
            border-radius: 10px;
            border: 1px solid #888888;
        }
        .button.active{
            text-transform: uppercase;
            color: #000000;
            background: #FECA00;
            border: none;
        }
        .image-item__btn-wrapper{
            width: 150px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 0px 20px;
            font-size: 24px;
            .update-btn {
                color: white;
            }
            .delete-btn {
                color: red;
            }
        }
    }
    .information {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        border-radius: 25px;
        padding: 20px;
        background: black;
        .header {
            display: flex;
            flex-direction: row;
            justify-content: center;
            color: #F2F2F2;
            font-size: 24px;
        }
        .details {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px 0px;
        }
        .detail {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0px 10px;
        }
        .membership-content {
            display: flex;
            flex-direction: column;
            color: #F2F2F2;
            font-size: 14px;
            padding-left: 16px;
        }
        .label{
            font-size: 14px;
            line-height: 100%;
            letter-spacing: 0.01em;
            color: #888888;
        }
        .text {
            font-size: 18px;
            color: #F2F2F2;
            line-height: 100%;
        }
        .input {
            background: #1C1A1D;
            border: 1px solid #888888;
            border-radius: 12px;
            margin-bottom: 20px;
            height: 35px;
            color:#888888;
            padding-left: 10px;
            min-width:150px;
            margin:auto;
            flex-grow:1;
        }
    }
    .membershipCardImage{
        width: 40%;
        display: flex;
        flex-direction: column;
        border-radius: 25px;
        padding: 20px;
        background: black;
        margin-left:10px;
        .header {
            display: flex;
            flex-direction: row;
            justify-content: center;
            color: #F2F2F2;
            font-size: 24px;
        }
        .imageContent{
            width: 100%;
            height: 200px;
            border-radius: 10px;
            border: 2px solid #F2F2F2;
            object-fit: cover;
        }
    }
    .w-60{
        width:60% !important;
    }
    .gym-image{
        width: 260px !important;
        height: 350px !important;
        border-radius: 10px !important;
        border: 2px solid #F2F2F2 !important;
    }
    .bar-container{
        background-color: #888888;
        width: 150px;
        height: 15px;
        border-radius: 10px;
        text-align: center;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .bar-completed {
        background-color: lightblue;
        width: 150px;
        height: 15px; 
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .bar-label{
        line-height: 100%;
        font-size: 12px;
        color: #F2F2F2;
    }
    .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: #F2F2F2;
    }
    .error {
        border-color: red !important;
    }
    .membershipImage{
        background-size:100% !important;
        width:100%;
        border-radius:10px;
        height:auto;
        border:solid;
        .userCard{
            float: right;
            margin: 15px;
            border-radius: 10px;
            border: solid white 4px;
            padding: 2px;
            position:absolute;
            top:10px;
            right:10px;
            .userImage{
                width: 150px;
                height: 150px;
                border-radius: 10px;
                border: solid white 2px;
            }
        }
    }
    .userInfo{
        display: flex;
        flex-direction: column;
        white-space: nowrap;
        color:white !important;
        position:absolute;
        top:15px;
        left:15px;
    }
`;

const GymDetailComponent = () => {
    const location = useLocation()
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const [GymImage, setGymImages] = useState([]);
    const [saveGymImage, setGymSaveImage] = useState('');

    const [MembershipImage, setMembershipImages] = useState([]);

    const [gymInfo, setGymInfo] = useState('')

    const [tradeLicenseNumber, setTradeLicenseNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [tradeLicenseNumberError, setTradeLicenseNumberError] = useState(false);
    const [companyNameError, setCompanyNameError] = useState(false);
    const [gymID, setGymID] = useState(0);
    useEffect(() => {
        setGymID(location.state.id);
        getGymInfoAndSetData()
    }, []);

    const onChange = (setTempImage, imageList, addUpdateIndex) => {
        setTempImage(imageList);
    };


    const uploadGymImage = () => {
        const imageFile = GymImage[0].file;
        const storage = getStorage();
        const userRef = ref(storage, `/gym/${tradeLicenseNumber}`);
        const uploadTask = uploadBytesResumable(userRef, imageFile);

        uploadTask.on('state_changed',
            (snapshot) => {
                setLoading(true);
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                setGymImages([]);
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setGymSaveImage(downloadURL);
                    getGymInfoAndSetData()
                });

            }
        );

    }

    const uploadMemberImage = () => {
        const imageFile = MembershipImage[0].file;
        const storage = getStorage();
        const userRef = ref(storage, `/users/${new Date().valueOf().toString()}`);
        const uploadTask = uploadBytesResumable(userRef, imageFile);

        uploadTask.on('state_changed',
            (snapshot) => {
                setLoading(true);
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                setLoading(false);

                setMembershipImages([]);
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    updateMemberShipCard(gymInfo.id, downloadURL);
                    getGymInfoAndSetData()
                });

            }
        );

    }

    const onSubmits = async () => {
        // alert('I dont know')
        if (tradeLicenseNumber === '' || companyName === '') {
            setCompanyNameError(companyName === '');
            setTradeLicenseNumberError(tradeLicenseNumber === '');
            return;
        }
        if (saveGymImage === '') {
            toast.info('First, please upload image', 'Infomation', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
            return;
        }
        setLoading(true);
        const id = await createGymId();
        saveGymInfo(
            id.id,
            companyName,
            tradeLicenseNumber,
            saveGymImage
        ).then((data) => {
            console.log(data);
            if (data.success === 'success') {
                toast.success('Submit Success', 'Success', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
                getGymInfoAndSetData();
            } else {
                toast.error('Something Wrong', 'Error', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
                setLoading(false);
            }
        });
    }

    const getGymInfoAndSetData = async () => {
        setLoading(true);

        const state = JSON.parse(localStorage.getItem('profile'));
        const id = await getMainGymIDByUser(state.id)
        if (id === '') {
            setLoading(false);
            return 0;
        }
        console.log(id);
        getGymInfo(id).then(data => {
            setGymInfo(data);
            if (data.tradeLicenseFilePath)
                setGymSaveImage(data.tradeLicenseFilePath);
            setLoading(false);
        })
    }

    return (
        <Container>
            <CustomLoading isStart={loading} isFull={true} />
            <div className='content'>
                <div className='information w-60'>
                    <div className='header'>
                        {t('Gyms Information')}
                    </div>
                    <div className='details' style={{ flexDirection: 'row', marginTop: gymInfo ? "30px" : '0px' }}>
                        <span className='w-60' style={{ marginTop: gymInfo ? '80px' : '60px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                                <span className='label'> {'Trade license numbers '} &nbsp;</span>
                                {!gymInfo.name ?
                                    <input className={tradeLicenseNumberError ? "input error" : "input"}
                                        value={tradeLicenseNumber}
                                        onChange={e => {
                                            setTradeLicenseNumber(e.target.value);
                                        }}
                                    />
                                    :
                                    <span className='text'>{gymInfo.tradeLicenseNumber}</span>
                                }
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                                <span className='label'> {'Company Name '} &nbsp;</span>
                                {!gymInfo.name ?
                                    <input className={companyNameError ? "input error" : "input"}
                                        value={companyName}
                                        onChange={e => {
                                            setCompanyName(e.target.value);
                                        }}
                                    /> :
                                    <span className='text'>{gymInfo.name}</span>
                                }
                            </div>
                            {!gymInfo.name && <button
                                className='btn active'
                                onClick={() => { onSubmits() }}
                                style={{ marginTop: '270px' }}
                            >
                                Submits
                            </button>}
                        </span>
                        <ReactImageUploading
                            value={GymImage}
                            onChange={
                                (imageList, addUpdateIndex) =>
                                    onChange(
                                        setGymImages,
                                        imageList,
                                        addUpdateIndex
                                    )
                            }
                            dataURLKey="data_url"
                        >

                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps
                            }) => {
                                return (
                                    <div className='image-content' style={{ padding: 10, flex: '1', margin: 0 }} {...dragProps}>
                                        <div style={{ fontSize: '20px', color: 'white' }}>
                                            Your Trade License
                                        </div>
                                        {GymImage.length === 0 &&
                                            (saveGymImage ?
                                                <img src={saveGymImage} alt="" className='gym-image' /> :
                                                <div className='gym-image'></div>
                                            )}
                                        {GymImage.map((image, index) => (
                                            <React.Fragment key={index}>
                                                <img src={image.data_url} alt="" className='gym-image' />

                                                <div className="image-item__btn-wrapper">
                                                    <div className='update-btn' onClick={() => onImageUpdate(index)}>
                                                        <MdChangeCircle />
                                                    </div>
                                                    <div className='delete-btn' onClick={() => onImageRemove(index)}>
                                                        <MdDelete />
                                                    </div>
                                                </div>

                                            </React.Fragment>
                                        ))}

                                        {
                                            (GymImage.length === 0 && !gymInfo.name) &&

                                            <button className='button active' onClick={onImageUpload}>
                                                {t('Select')}
                                            </button>
                                        }

                                        {
                                            GymImage.length !== 0 &&

                                            <button
                                                className='button active'
                                                onClick={() =>
                                                    uploadGymImage()
                                                }
                                            >
                                                {t('Upload')}
                                            </button>
                                        }
                                    </div>

                                );
                            }}
                        </ReactImageUploading>
                    </div>
                </div>
                <div className='membershipCardImage'>
                    <div className='header'>
                        {t('MemberShip Card')}
                    </div>
                    <div className='details'>
                        <ReactImageUploading
                            value={MembershipImage}
                            onChange={
                                (imageList, addUpdateIndex) =>
                                    onChange(
                                        setMembershipImages,
                                        imageList,
                                        addUpdateIndex
                                    )
                            }
                            dataURLKey="data_url"
                        >

                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps
                            }) => {
                                return (
                                    <div className='image-content' style={{ padding: 10, flex: '1', margin: 0 }} {...dragProps}>
                                        {MembershipImage.length === 0 &&
                                            <div style={{ height: !gymInfo.membershipCardPath && '300px' }} className='membershipImage' >
                                                <img src={gymInfo.membershipCardPath} width={'100%'} />
                                                <div className='userCard'>
                                                    <img src={memberShipImage} alt="" className='userImage' />
                                                </div>
                                                <div className='userInfo'>
                                                    <span>Customer Name {/*: </b>{state.sure_name}*/}</span>
                                                    <span>Customer UserName {/*: </b>{state.username}*/}</span>
                                                </div>
                                            </div>
                                        }
                                        {MembershipImage.map((image, index) => (
                                            <React.Fragment key={index}>
                                                <div style={{ height: !gymInfo && '300px' }} className='membershipImage' >
                                                    <img src={image.data_url} width={'100%'} />
                                                    <div className='userCard'>
                                                        <img src={memberShipImage} alt="" className='userImage' />
                                                    </div>
                                                    <div className='userInfo'>
                                                        <span>Customer Name {/*: </b>{state.sure_name}*/}</span>
                                                        <span>Customer UserName {/*: </b>{state.username}*/}</span>
                                                    </div>
                                                </div>
                                                <div className="image-item__btn-wrapper">
                                                    <div className='update-btn' onClick={() => onImageUpdate(index)}>
                                                        <MdChangeCircle />
                                                    </div>
                                                    <div className='delete-btn' onClick={() => onImageRemove(index)}>
                                                        <MdDelete />
                                                    </div>
                                                </div>

                                            </React.Fragment>
                                        ))}

                                        {MembershipImage.length === 0 &&
                                            <button className='button active' onClick={onImageUpload}>
                                                {t('Select')}
                                            </button>
                                        }


                                        {
                                            MembershipImage.length !== 0 &&

                                            <button
                                                className='button active'
                                                onClick={() =>
                                                    uploadMemberImage()
                                                }
                                            >
                                                {t('Upload')}
                                            </button>
                                        }
                                    </div>

                                );
                            }}
                        </ReactImageUploading>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default GymDetailComponent;
