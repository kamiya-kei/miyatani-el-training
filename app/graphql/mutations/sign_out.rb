module Mutations
  class SignOut < BaseMutation
    field :user, Types::UserType, null: true

    def resolve
      context[:session][:user_id] = nil
      {
        user: nil
      }
    end
  end
end
