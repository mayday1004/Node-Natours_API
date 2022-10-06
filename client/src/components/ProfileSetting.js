import React, { useState } from 'react';
import { FormRow } from '.';
import { useAppContext } from '../contexts/appContext';

const ProfileSetting = () => {
  const { isLoading, user, updateUser } = useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [file, setFile] = useState();
  const [fileUrl, setFileUrl] = useState({ img: '' });

  const onSubmitACSetting = e => {
    e.preventDefault();
    const currentUser = new FormData();
    currentUser.append('name', name);
    currentUser.append('email', email);
    currentUser.append('photo', file);
    updateUser({ currentUser, endPoint: 'updateMe', alertText: 'Account setting Success!' });
  };

  const onSubmitPasswordChange = e => {
    e.preventDefault();
    const currentUser = { passwordCurrent, newPassword, newPasswordConfirm };
    updateUser({ currentUser, endPoint: 'updateMyPassword', alertText: 'Password change Success!' });
    setPasswordCurrent('');
    setNewPassword('');
    setNewPasswordConfirm('');
  };

  const onFileUpload = e => {
    setFile(e.target.files[0]);
    const uploadFile = e.target.files.item(0); // 取得選中檔案們的一個檔案
    const fileReader = new FileReader(); // FileReader為瀏覽器內建類別，用途為讀取瀏覽器選中的檔案
    fileReader.addEventListener('load', e => {
      setFileUrl({
        img: e.target.result, // 讀取到DataURL後，儲存在result裡面，指定為img
      });
    });
    fileReader.readAsDataURL(uploadFile); // 讀取完檔案後，變成URL:BASE64
  };
  return (
    <>
      <div className='user-view__form-container'>
        <h2 className='heading-secondary ma-bt-md'>Your account settings</h2>
        <form className='form form-user-data' onSubmit={onSubmitACSetting}>
          <FormRow
            name='name'
            type='text'
            required='required'
            text='Your name'
            value={name}
            handleChange={e => setName(e.target.value)}
          />
          <FormRow
            className='ma-bt-md'
            name='email'
            type='email'
            placeholder='you@example.io'
            text='Email address'
            value={email}
            handleChange={e => setEmail(e.target.value)}
          />
          <div className='form__group form__photo-upload'>
            {file?.name ? (
              <img className='form__user-photo' src={fileUrl.img} alt='User' />
            ) : (
              <img className='form__user-photo' src={`images/users/${user?.photo}`} alt='User' />
            )}

            <input
              className='form__upload'
              type='file'
              accept='image/*'
              id='photo'
              name='photo'
              onChange={onFileUpload}
            />
            <label htmlFor='photo'>Choose new photo</label>
          </div>
          <div className='form__group right'>
            <button className='btn btn--small btn--green' disabled={isLoading}>
              {isLoading ? 'Please Wait...' : 'Save settings'}
            </button>
          </div>
        </form>
      </div>
      <div className='line'>&nbsp;</div>
      <div className='user-view__form-container'>
        <h2 className='heading-secondary ma-bt-md'>Password change</h2>
        <form className='form form-user-password' onSubmit={onSubmitPasswordChange}>
          <FormRow
            name='passwordCurrent'
            type='password'
            placeholder='••••••••'
            text='Current password'
            minlength='8'
            value={passwordCurrent}
            handleChange={e => setPasswordCurrent(e.target.value)}
          />
          <FormRow
            name='newPassword'
            type='password'
            placeholder='••••••••'
            text='New password'
            minlength='8'
            value={newPassword}
            handleChange={e => setNewPassword(e.target.value)}
          />
          <FormRow
            className='ma-bt-lg'
            name='newPasswordConfirm'
            type='password'
            placeholder='••••••••'
            text='Confirm password'
            minlength='8'
            value={newPasswordConfirm}
            handleChange={e => setNewPasswordConfirm(e.target.value)}
          />
          <div className='form__group right'>
            <button className='btn btn--small btn--green btn--save-password' disabled={isLoading}>
              {isLoading ? 'Please Wait...' : 'Save password'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileSetting;
