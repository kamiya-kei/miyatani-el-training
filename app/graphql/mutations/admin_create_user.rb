module Mutations
  class AdminCreateUser < BaseMutation
    field :user, Types::UserType, null: false

    argument :name,                  String, required: true
    argument :password,              String, required: true
    argument :password_confirmation, String, required: true
    argument :role_id,               ID,     required: true

    def resolve(**args)
      authenticate_admin!
      user = User.create!(args)
      {
        user: user
      }
    end
  end
end
