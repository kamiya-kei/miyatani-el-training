module Mutations
  class DeleteUser < BaseMutation
    field :user, Types::UserType, null: true

    def resolve
      user = context[:session][:user]
      user.destroy!
      context[:session][:user] = nil
      {
        user: nil
      }
    end
  end
end
