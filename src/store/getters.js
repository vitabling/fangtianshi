const getters = {
  userName: (state) => state.userName,
  userId: (state) => state.userId,
  isSignin: (state) => state.isSignin,
  userRole: (state) => state.userRole,
  isAdmin(state) {
    return typeof state.userRole != 'undefined' && state.userRole != null && state.userRole.indexOf("ROLE_ADMIN") >=0
  },
  isUser(state) {
    return typeof state.userRole != 'undefined' && state.userRole != null && state.userRole.indexOf("ROLE_USER") >=0
  }
}