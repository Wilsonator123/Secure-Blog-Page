//key bitches
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser, logout } from '@/hooks/user';
import { useUserStore } from '@/context/UserContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useForm } from 'react-hook-form';
import axios from 'axios';

//forms + visual
import { checkPasswordStrength } from '@/helper/password';
import { Button } from "@/components/ui/button";
import ChangeForm from '@/components/ui/changeForm';
import PasswordField from '@/components/ui/passwordField';
import EmailField from '@/components/ui/emailField';
import NameField from '@/components/ui/nameField';
import UserPFP from '@/components/ui/user-pfp';

//svgs
import Mail from '@/assets/mail.svg';
import PasswordPin from '@/assets/passwordpin.svg';
import DeleteAccount from '@/assets/deleteaccount.svg';
import Placeholder from '@/assets/placeholder.svg';
import Close from '@/assets/close.svg';
import Logout from '@/assets/logout.svg';
import Return from '@/assets/return.svg';

export default function SettingsPage({ user, toggle }) {
  const [activeSetting, setActiveSetting] = useState('');
  const router = useRouter();
  const currentUser = useUserStore(state => state.user);


  const { register, handleSubmit, reset, setError: setFormError, clearErrors, formState: { errors }, getValues } = useForm();
  const [showPassword, setShowPassword] = useState("password");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [passwordStrength, setPasswordStrength] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);

  const handleSignOut = async () => {
    try {
      await logout();
      router.push('/login');
      toggle();
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  const resetToMainSettings = () => {
    setActiveSetting('');
    setIsChecked(false);
    reset(); // Reset form
  };

  const handleUpdateUser = async (updates) => {
    if (!isChecked) {
      setError('Please confirm the changes by checking the checkbox.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/account/updateUser', {
        currentPassword: getValues('password'),
        updates
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        await logout();
        router.push('/login');
        alert('Your account has been updated. Please log in again.');
      }

    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("There was a problem with the server.");
      }
    }
  };

  const validatePassword = async (value) => {
    const result = await checkPasswordStrength(value);
    if (result.success) {
      setPasswordMessage(null);
      setPasswordStrength(result.score);
      return true;
    } else {
      setPasswordMessage(result.warning);
      setPasswordStrength(result.score ?? 0);
      return result.warning;
    }
  };

  const newPasswordCheck = (value) => {
    if (value === password) {
      return "Your new password cannot be the same as your old password.";
    } else {
      return true;
    }
  };

  useEffect(() => {
    async function fetchUser() {
      await updateUser();
    }
    fetchUser();
  }, []);

  const renderSettingForm = () => {
    const formConfigs = {
      email: {
        title: 'Change Email',
        subtitle: 'Change the Email attached to your account.',
        children: (
          <>
            <PasswordField label="Password" showPassword={showPassword} setShowPassword={setShowPassword} name="password" register={register} errors={errors} />
            <EmailField label="New E-mail" name="newEmail" register={register} errors={errors} />
          </>
        ),
        onSubmit: () => handleUpdateUser({ email: getValues('newEmail') }),
      },
      password: {
        title: 'Change Password',
        subtitle: 'Change the Password attached to your account.',
        children: (
          <>
            <EmailField label="Email" name="email" register={register} errors={errors} />
            <PasswordField label="Password" showPassword={showPassword} setShowPassword={setShowPassword} name="password" register={register} errors={errors} />
            <PasswordField label="New Password" showPassword={showPassword} setShowPassword={setShowPassword} name="newPassword" register={register} errors={errors} validate={(value) => validatePassword(value)} />
            <PasswordField label="Confirm New Password" showPassword={showPassword} setShowPassword={setShowPassword} name="confirmPassword" register={register} errors={errors} validate={(value) => newPasswordCheck(value)} />
          </>
        ),
        onSubmit: () => handleUpdateUser({ password: getValues('newPassword') }),
      },
      accountInfo: {
        title: 'Change Account Information',
        subtitle: 'Change your account names. This does not change your username.',
        children: (
          <>
            <PasswordField label="Password" showPassword={showPassword} setShowPassword={setShowPassword} name="password" register={register} errors={errors} />
            <NameField label="First Name" value={fName} onChange={(e) => setFName(e.target.value)} placeholder="Joe" name="fname" register={register} errors={errors} />
            <NameField label="Last Name" value={lName} onChange={(e) => setLName(e.target.value)} placeholder="Bloggs" name="lname" register={register} errors={errors} />
          </>
        ),
        onSubmit: () => {
          handleUpdateUser({ fname: getValues('fname') });
          handleUpdateUser({ lname: getValues('lname') });
        },
      },
      deleteAccount: {
        title: 'Account Deletion',
        subtitle: 'Delete your account off the website here',
        children: (
          <PasswordField label="Password" showPassword={showPassword} setShowPassword={setShowPassword} name="password" register={register} errors={errors} />
        ),
        onSubmit: () => handleUpdateUser({ password: getValues('password') }),
      },
      twoFA: {
        title: 'Update 2FA Settings',
        subtitle: 'Manage your account 2FA here.',
        children: (
          <PasswordField label="Password" showPassword={showPassword} setShowPassword={setShowPassword} name="password" register={register} errors={errors} />
        ),
        onSubmit: () => handleUpdateUser({ password: getValues('password') }),
      },
    };

    const config = formConfigs[activeSetting];

    if (!config) return null;

    return (
      <ChangeForm
        title={config.title}
        subtitle={config.subtitle}
        onSubmit={handleSubmit(config.onSubmit)}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        error={error}
      >
        {config.children}
      </ChangeForm>
    );
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-opacity-0">
      <Card className="bg-primary border-accent mt-8 min-w-[700px]">
        <CardHeader className="relative flex items-center justify-center w-full p-4">
          {activeSetting ? (
            <Button variant="outline" onClick={resetToMainSettings} className="absolute left-14 top-11 bg-primary border-secondary rounded-full p-0.5">
              <Return fill="#ffff" width={30} height={30} />
            </Button>
          ) : (
            <span className="absolute left-4 w-6 h-6 opacity-0">
              <Return fill="transparent" width={30} height={30} />
            </span>
          )}

          <CardTitle className="text-4xl text-white pt-5">Settings</CardTitle>

          <Button variant="outline" onClick={toggle} className="absolute right-14 top-10 bg-primary border-secondary rounded-full p-0.5">
            <Close fill="#ffff" width={30} height={30} />
          </Button>
        </CardHeader>

        <div className="w-4/5 mx-auto border-t border-grey-700 m-5"></div>

        <CardContent className="flex flex-col items-center w-full px-20 py-10">
          {!activeSetting && (
            <div className="grid grid-cols-3 gap-16">
              <div className="flex flex-col items-center space-y-6">
                <UserPFP containerClassName="mid-avatar" identiconClassName="scale-up" />
                <h1 className="text-3xl text-text mb-2">{user?.fname}</h1>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <Mail className="w-24 h-24" fill={'#ffff'} />
                <Button variant='secondary' onClick={() => setActiveSetting('email')} className="bg-secondary text-text text-xl border border-transparent hover:border hover:border-accent">
                  Change Email
                </Button>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <PasswordPin className="w-24 h-24" fill={'#ffff'} />
                <Button variant='secondary' onClick={() => setActiveSetting('password')} className="bg-secondary text-text text-xl border border-transparent hover:border hover:border-accent">
                  Change Password
                </Button>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <Placeholder className="w-24 h-24" fill={'#ffff'} />
                <Button variant='secondary' onClick={() => setActiveSetting('accountInfo')} className="bg-secondary text-text text-xl border border-transparent hover:border hover:border-accent">
                  Change Account Info
                </Button>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <Placeholder className="w-24 h-24" fill={'#ffff'} />
                <Button variant='secondary' onClick={() => setActiveSetting('twoFA')} className="bg-secondary text-text text-xl border border-transparent hover:border hover:border-accent">
                  Change 2FA Settings
                </Button>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <DeleteAccount className="w-24 h-24" fill={'#ffff'} />
                <Button variant='secondary' onClick={() => setActiveSetting('deleteAccount')} className="bg-secondary text-text text-xl border border-transparent hover:border hover:border-accent">
                  Delete Account
                </Button>
              </div>
            </div>
          )}

          {activeSetting && renderSettingForm()}
        </CardContent>

        <div className="w-4/5 mx-auto border-t border-grey-700 m-5"></div>

        <CardFooter className="flex flex-col items-center space-y-4 mb-10">
          {activeSetting ? (
            <Button variant='secondary' className="h-12 text-text text-xl w-full max-w-sm mt-10 border-transparent hover:border hover:border-accent" type="submit"
              onClick={handleSubmit(renderSettingForm().props.onSubmit)}
              disabled={!isChecked}>
              Submit
            </Button>
          ) : (
            <Button variant='destructive' onClick={handleSignOut} className="h-12 text-text text-xl w-full max-w-sm mt-10 border-transparent hover:border hover:border-accent">
              <Logout fill={'#ffff'} />Sign Out
            </Button>
          )}
        </CardFooter>
      </Card>
    </main>
  );
}