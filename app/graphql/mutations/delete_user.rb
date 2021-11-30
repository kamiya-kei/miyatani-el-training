module Mutations
  class DeleteUser < BaseMutation
    field :user, Types::UserType, null: true

    def resolve
      current_user.destroy!
      sign_out
      {
        user: nil
      }
    end
  end
end
