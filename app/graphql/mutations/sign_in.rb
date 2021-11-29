module Mutations
  class SignIn < BaseMutation
    field :user, Types::UserType, null: true

    argument :name,     String, required: true
    argument :password, String, required: true

    def resolve(name:, password:)
      user = User.search(name, password)
      sign_in(user)
      {
        user: user
      }
    end
  end
end
