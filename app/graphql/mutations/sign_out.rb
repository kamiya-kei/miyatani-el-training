module Mutations
  class SignOut < BaseMutation
    field :user, Types::UserType, null: true

    def resolve
      sign_out
      {
        user: nil
      }
    end
  end
end
