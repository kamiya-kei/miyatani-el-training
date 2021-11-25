module Mutations
  class DeleteUser < BaseMutation
    field :user, Types::UserType, null: true

    def resolve
      user = context[:user]
      user.destroy!
      context[:session][:user_id] = nil
      {
        user: nil
      }
    end
  end
end
