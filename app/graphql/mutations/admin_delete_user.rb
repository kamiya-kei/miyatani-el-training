module Mutations
  class AdminDeleteUser < BaseMutation
    field :user, Types::UserType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      authenticate_admin!

      target_user = User.find(id)
      target_user.destroy!
      if id == current_user.id
        sign_out # 自分ならアカウント削除後サインアウト
      end
      {
        user: target_user
      }
    end
  end
end
