import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-form';
import { Alert, message } from 'antd';
import { FC } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/context/auth.context';
import { isAxiosError } from '@/libs/request';
import { getMeFn, useLoginMutation } from '@/services/auth';
import { LoginParams } from '@/services/form';
import { ErrorResponse } from '@/services/types';

import styles from './index.module.less';

const LoginMessage: FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: FC = () => {
  // const [userLoginState, setUserLoginState] = useState<LoginResult>({});
  const intl = useIntl();

  const location = useLocation();
  const navigate = useNavigate();
  const from = ((location.state as any)?.from.pathname as string) || '/';

  const authContext = useAuthContext();
  const { mutateAsync: login } = useLoginMutation();

  const handleSubmit = async (values: LoginParams) => {
    try {
      const { token } = await login({ ...values });
      const user = await getMeFn(token);
      authContext.dispatch({ type: 'SET_USER', payload: user });
      const defaultLoginSuccessMessage = intl.formatMessage({
        id: 'pages.login.success',
        defaultMessage: 'Login Successfull! ',
      });
      message.success(defaultLoginSuccessMessage);
      return navigate(from);
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        return message.error(error.response?.data.message);
      }
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: 'Login Failed!',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <LoginFormPage
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        title="Backoffice"
        subTitle={intl.formatMessage({
          id: 'pages.layouts.userLayout.title',
        })}
        initialValues={{
          autoLogin: true,
        }}
        onFinish={async (values) => {
          await handleSubmit(values as LoginParams);
        }}
        submitter={{
          searchConfig: {
            submitText: intl.formatMessage({ id: 'pages.login.submit' }),
          },
        }}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
          }}
          placeholder={intl.formatMessage({
            id: 'pages.login.username.placeholder',
          })}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="pages.login.username.required" />,
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={styles.prefixIcon} />,
          }}
          placeholder={intl.formatMessage({
            id: 'pages.login.password.placeholder',
          })}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="pages.login.password.required" />,
            },
          ]}
        />
        {status === 'error' && <LoginMessage content="Opps, something went wrong" />}
      </LoginFormPage>
    </div>
  );
};

export default Login;
