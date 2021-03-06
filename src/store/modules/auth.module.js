import AuthService from '@/modules/authentication/services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

const getters = {
    user: state => {
        return state.user;
    },
    isLoggedIn: state => {
        return state.status.loggedIn;
    }
};

const actions = {
    login: ({ commit }, user) => {
        return AuthService.login(user).then(
            user => {
                commit('loginSuccess', user);
                return Promise.resolve(user);
            },
            error => {
                commit('loginFailure');
                return Promise.reject(error);
            }
        );
    },
    renew: ({ commit, getters }) => {
        let curUser = getters.user;
        if (!curUser) {
            curUser = JSON.parse(localStorage.getItem('user'));
        }

        if (Date.parse(curUser.validTo) < Date.now()) {
            AuthService.renew({
                accessToken: curUser.accessToken,
                email: curUser.email,
                id: curUser.id,
                login: curUser.login,
                roles: curUser.roles,
                validTo: curUser.validTo
            }).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        } else {
            return Promise.resolve(curUser);
        }
    },
    logout: ({ commit }) => {
        AuthService.logout();
        commit('logout');
    },
    register: ({ commit }, user) => {
        return AuthService.register(user).then(
            response => {
                commit('registerSuccess');
                return Promise.resolve(response.data);
            },
            error => {
                commit('registerFailure');
                return Promise.reject(error);
            }
        );
    }
};

const mutations = {
    loginSuccess(state, user) {
        state.status.loggedIn = true;
        state.user = user;
    },
    loginFailure(state) {
        state.status.loggedIn = false;
        state.user = null;
    },
    logout(state) {
        state.status.loggedIn = false;
        state.user = null;
    },
    registerSuccess(state) {
        state.status.loggedIn = false;
    },
    registerFailure(state) {
        state.status.loggedIn = false;
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
};
