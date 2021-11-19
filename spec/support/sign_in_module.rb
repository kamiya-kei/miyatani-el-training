module SignInModule
  def sign_in_as(user)
    visit '/users/sign_in'
    fill_in 'name', with: user.name
    fill_in 'password', with: user.password
    click_button 'ログイン'
    page
  end
end
