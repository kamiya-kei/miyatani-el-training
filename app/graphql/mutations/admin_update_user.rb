module Mutations
  class AdminUpdateUser < BaseMutation
    field :user, Types::UserType, null: true
    # field :errors, [ErrorType], null: true

    argument :id, ID, required: true
    argument :name,                  String, required: false
    argument :password,              String, required: false
    argument :password_confirmation, String, required: false
    argument :role_id,               ID,     required: false

    def resolve(id:, **args)
      user = context[:user]
      unless user.role.id == Role::ADMIN
        raise GraphqlController::AdminAuthorizationError
      end

      target_user = User.find(id)
      target_user.update!(args)
      {
        user: target_user
      }
    end
  end
end
