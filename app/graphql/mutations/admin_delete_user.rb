module Mutations
  class AdminDeleteUser < BaseMutation
    field :user, Types::UserType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      user = context[:user]
      return if user.nil? # TODO: 管理者権限の確認

      target_user = User.find(id)
      target_user.destroy!
      {
        user: target_user
      }
    end
  end
end
