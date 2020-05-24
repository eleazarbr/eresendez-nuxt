export default ({ store, redirect }) => {
  if (!store.getters['auth/user'].is_admin) {
    return redirect('/home')
  }
}
