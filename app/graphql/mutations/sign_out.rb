module Mutations
  class SignOut < BaseMutation
    field :user, Types::UserType, null: true

    def resolve
      context[:session][:user] = nil
      {
        user: nil
      }
    end
  end
end
