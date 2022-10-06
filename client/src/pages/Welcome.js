import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/appContext';

const Welcome = () => {
  const { user } = useAppContext();
  return (
    <p
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
      }}
    >
      Hi {user.name},<p>Welcome to Natours, we're glad to have you 🎉🙏</p>
      <p>
        We're all a big familiy here, so make sure to upload your user photo so we get to know you a bit
        better!
      </p>
      <table className='btn btn-primary' role='presentation' border='0' cellpadding='0' cellspacing='0'>
        <tbody>
          <tr>
            <td align='left'>
              <table role='presentation' border='0' cellpadding='0' cellspacing='0'>
                <tbody>
                  <tr>
                    <td>
                      <Link to='/me' target='_blank'>
                        Upload user photo
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <p>If you need any help with booking your next tour, please don't hesitate to contact me!</p>
      <p>- Jonas Schmedtmann, CEO</p>
    </p>
  );
};

export default Welcome;
