module Mutations
  class DeleteUser < BaseMutation
    field :user, Types::UserType, null: true

    def resolve
      user = User.find(context[:session][:user]['id'])
      user.destroy!
      context[:session][:user] = nil
      {
        user: nil
      }
    end
  end
end
