import { setUser } from 'core/actions/login';
import { User } from 'core/reducers/login';
import { connect } from 'react-redux';
import { utils } from 'Utils/Utils';
import Login, { LoginProps } from '../components/Login';
import { State } from '../core/reducers';

const mapDispatchToProps = (dispatch: any) => ({
  setUser: (user: User): void => dispatch(setUser(user)),
});

const connector: any = connect(mapDispatchToProps);
export default connector(Login);