module Mutations
  class CreateUser < BaseMutation
    field :user,   Types::UserType, null: false

    argument :name,                  String, required: true
    argument :password,              String, required: true
    argument :password_confirmation, String, required: true

    def resolve(**args)
      user = User.create!(args)
      context[:session][:user_id] = user.id
      {
        user: user
      }
    end
  end
end
