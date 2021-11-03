import { setUser } from 'core/actions/login';
import { User } from 'core/reducers/login';
import { connect } from 'react-redux';
import { utils } from 'Utils/Utils';
import Login, { LoginProps } from '../components/Login';
import { State } from '../core/reducers';

const mapStateToProps = (state: State, props: LoginProps) => ({
  //user: state.login.user,
  getUser: async (email: string): Promise<User> => {
    const user: User = await utils.getUser(email);
    return user;
  },
});

const mapDispatchToProps = (dispatch: any) => ({
  setUser: async (user: User): Promise<void> => {
    await utils.setUser(user);
    dispatch(setUser(user))
  }
});

const connector: any = connect(mapStateToProps, mapDispatchToProps);
export default connector(Login);