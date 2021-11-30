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
      authenticate_admin!

      user = User.find(id)
      user.update!(args)
      {
        user: user
      }
    end
  end
end
