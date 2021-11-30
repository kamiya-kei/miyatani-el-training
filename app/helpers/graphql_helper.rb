module GraphqlHelper
  def authenticate_user!
    return if current_user.present?

    raise Application::AuthorizationError
  end

  def authenticate_admin!
    authenticate_user!
    return if current_user.role.id == Role::ADMIN

    raise Application::AdminAuthorizationError
  end

  def target_user_id!(user_id)
    if user_id.present?
      authenticate_admin!
      user_id
    else
      authenticate_user!
      current_user.id
    end
  end

  def current_user
    User.find_by(id: context[:session][:user_id])
  end

  def sign_in(user)
    context[:session][:user_id] = user.id
  end

  def sign_out
    context[:session][:user_id] = nil
  end
end
